import json
import logging
from cresponse import common_json_response
from flask import Flask, render_template, jsonify, request
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

    def save_item(self,item):
        item_id = item.item_id
        try:
            if not item_id:
                db.session.add(item)
            else:
                t_dict = model2dbdict(item)
                t_dict.pop('item_id')
                db.session.query(Item).filter(Item.item_id == item_id).update(t_dict)
            db.session.commit()
            return True
        except Exception as e:
            logging.exception(e)
            db.session.rollback()
            return False

    def save_shoppinglist(self,shoppinglist):
        list_id =  shoppinglist.list_id
        try:
            if not list_id:
                db.session.add(shoppinglist)
            else:
                t_dict = model2dbdict(shoppinglist)
                t_dict.pop('list_id')
                db.session.query(ShoppingList).filter(ShoppingList.list_id==list_id).update(t_dict)
            db.session.commit()
            return True
        except Exception as e:
            logging.exception(e)
            db.session.rollback()
            return False


@app.route('/')
def index():
    try:
        shoppinglists = Svc().all_item()
        return render_template("index.html", shoppinglists=shoppinglists)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')


@app.route('/shoppinglists', methods=['GET'])
def shoppinglists():
    try:
        result = Svc().all_item()
        return common_json_response(result=result)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')


@app.route('/item/save', methods=['POST'])
def item_save():
    try:
        data = json.loads(request.data)
        if not data.get('item_id'):
            item = dict2model(data, Item)
            db.session.add(item)
        else:
            item_id = data.get('item_id')
            data.pop('item_id')
            db.session.query(Item).filter(Item.item_id == item_id).update(data)
        db.session.commit()
        return common_json_response(code=0)
    except Exception as e:
        logging.exception(e)
        db.session.rollback()
        return render_template('error.html')


@app.route('/item/delete', methods=['GET'])
def item_delete():
    try:
        item_id = request.args.get("item_id")
        db.session.query(Item).filter(Item.item_id == item_id).delete()
        db.session.commit()
    except Exception as e:
        logging.exception(e)
        db.session.rollback()
        return render_template('error.html')


@app.route('/shoppinglist/save', methods=['POST'])
def shoppinglist_save():
    try:
        data = json.loads(request.data)
        items = data.get('items')
        list_id = data.get('list_id')
        if not list_id:

        return common_json_response()
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')


def dict2model(t_dict, model):
    for k, v in t_dict:
        if hasattr(model,k):
            setattr(model, k, v)
    return model

def model2dbdict(model):
    t_dict = {}
    for k in dir(model):
        if k.startswith('_'):
            continue
        t_dict[k] = getattr(model,k)
    return t_dict