# -*- coding:utf-8 -*-
from flask_sqlalchemy import SQLAlchemy

from gs.conf import db_zhenai as dbconf

db_zhenai = None


def init_flaskdb_zhenai(app, force_create=False):
    global db_zhenai
    if db_zhenai is None or force_create:
        db_conn_str = "mysql://%s:%s@%s:%d/%s?charset=%s" % (dbconf.USER, dbconf.PASSWD,
                                                             dbconf.HOST, dbconf.PORT, dbconf.DB, dbconf.CHARSET)
        app.config['SQLALCHEMY_DATABASE_URI'] = db_conn_str
        app.config['SQLALCHEMY_ECHO'] = dbconf.SQLALCHEMY_ECHO
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = dbconf.SQLALCHEMY_TRACK_MODIFICATIONS
        app.config['SQLALCHEMY_POOL_RECYCLE'] = dbconf.SQLALCHEMY_POOL_RECYCLE
        db_zhenai = SQLAlchemy(app, session_options={'autoflush': False})


def rollback(db):
    try:
        db.session.rollback()
    except:
        pass


def close(db):
    try:
        db.session.close()
    except:
        pass
