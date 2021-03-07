import json
import logging

from cresponse import common_json_response
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from sqlalchemy.orm.attributes import InstrumentedAttribute

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://shekinah:247365@114.55.33.127:3306/miniblog?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app, session_options={'autoflush': False})


class ShoppingList(db.Model):
    __tablename__ = 'shopping_list'
    list_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer)
    desc = db.Column(db.String)
    images = db.Column(db.String)


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
            if shoppinglist.images:
                images = shoppinglist.images.split(',')
                shoppinglist.imagelist = [{'name':item,'url':'/images/{}'.format(item)} for item in images]
            shoppinglist.items = item_map.get(shoppinglist.list_id)
        return shoppinglists

    def item_list(self,list_id):
        return db.session.query(Item).filter(Item.list_id==list_id).all()

    def save_item(self, item):
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

    def save_shoppinglist(self, shoppinglist):
        list_id = shoppinglist.list_id
        try:
            if not list_id:
                db.session.add(shoppinglist)
            else:
                t_dict = model2dbdict(shoppinglist)
                logging.info(t_dict)
                t_dict.pop('list_id')
                db.session.query(ShoppingList).filter(ShoppingList.list_id == list_id).update(t_dict)
            db.session.commit()
            return True
        except Exception as e:
            logging.exception(e)
            db.session.rollback()
            return False
    def shoppinglist_get(self,list_id):
        return db.session.query(ShoppingList).get(list_id)
    def item_delete(self, item_id=None, list_id=None):
        try:
            q = db.session.query(Item)
            if item_id is not None:
                q = q.filter(Item.item_id == item_id)
            if list_id is not None:
                q = q.filter(Item.list_id == list_id)
            q.delete()
            db.session.commit()
            return True
        except Exception as e:
            logging.exception(e)
            db.session.rollback()
            return False

    def shopplist_delete(self, list_id):
        try:
            db.session.query(ShoppingList).filter(ShoppingList.list_id == list_id).delete()
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
        item = dict2model(data, Item)
        if not Svc().save_item(item):
            return render_template('error.html')
        return common_json_response(code=0)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')

@app.route('/item/list', methods=['GET'])
def item_list():
    try:
        list_id = request.args.get('list_id')
        result = Svc().item_list(list_id)
        return common_json_response(result=result)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')

@app.route('/item/delete', methods=['GET'])
def item_delete():
    try:
        item_id = request.args.get("item_id")
        if not Svc().item_delete(item_id):
            return render_template('error.html')
        return common_json_response(code=0)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')


@app.route('/shoppinglist/save', methods=['POST'])
def shoppinglist_save():
    try:
        data = json.loads(request.data)
        items = data.get('items')
        imagelist = data.get('imagelist',[])
        if items:
            for i in items:
                item = dict2model(i, Item)
                if not Svc().save_item(item):
                    return render_template('error.html')
            data.pop('items')
        shoppinglist = dict2model(data, ShoppingList)
        shoppinglist.images = ','.join([item['name'] for item in imagelist])
        if not Svc().save_shoppinglist(shoppinglist):
            return render_template('error.html')
        return common_json_response(code=0)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')


@app.route('/shoppinglist/delete', methods=['GET'])
def shoppinglist_delete():
    try:
        list_id = request.args.get("list_id")
        if not Svc().shopplist_delete(list_id):
            return render_template('error.html')
        return common_json_response(code=0)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')

@app.route('/image/upload', methods=['POST'])
def image_save():
    try:
        t_file = request.files['file']
        t_file.save('images/{}'.format(t_file.filename))
        return common_json_response(code=0)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')

@app.route('/shoppinglist/copy', methods=['GET'])
def shoppinglist_copy():
    try:
        list_id = request.args.get("list_id")
        shoppinglist = Svc().shoppinglist_get(list_id)
        newshoppinglist = ShoppingList()
        for key in inspect(ShoppingList).c.keys():
            if key=='list_id':
                continue
            setattr(newshoppinglist,key,getattr(shoppinglist,key))

            pass
        if not Svc().shopplist_delete(list_id):
            return render_template('error.html')
        return common_json_response(code=0)
    except Exception as e:
        logging.exception(e)
        return render_template('error.html')


def dict2model(t_dict, model_class):
    model = model_class()
    for k, v in t_dict.items():
        if hasattr(model, k):
            setattr(model, k, v)
    return model


def model2dbdict(item):
    item_dict = dict()
    for k in inspect(item.__class__).c.keys():
        item_dict[k] = getattr(item,k)
    return item_dict
