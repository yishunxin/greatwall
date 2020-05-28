import json
import logging
from cresponse import common_json_response
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://shekinah:247365@114.55.33.127:3306/miniblog?charset=utf8mb4'
db = SQLAlchemy(app, session_options={'autoflush': False})


class ShoppingList(db.Model):
    __tablename__ = 'shopping_list'
    list_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer)


class Item(db.Model):
    __tablename__ = 'item'
    item_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    image = db.Column(db.String)
    url = db.Column(db.String)
    desc = db.Column(db.String)
    list_id = db.Column(db.String)


class Svc(object):
    def all_item(self):
        shoppinglists = db.session.query(ShoppingList).all()
        items = db.session.query(Item).all()
        item_map = {}
        for item in items:
            if item.list_id not in item_map:
                item_map[item.list_id] = [item]
            else:
                item_map[item.list_id].append(item)
        for shoppinglist in shoppinglists:
            shoppinglist.items = item_map.get(shoppinglist.list_id)
        return shoppinglists


@app.route('/')
def index():
    try:
        shoppinglists = Svc().all_item()
        return render_template("index.html",shoppinglists=shoppinglists)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')

@app.route('/shoppinglists',methods=['GET'])
def shoppinglists():
    try:
        result = Svc().all_item()
        return common_json_response(result=result)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')
