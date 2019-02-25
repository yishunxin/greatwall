# -*- coding:utf-8 -*-
from flask_sqlalchemy import SQLAlchemy

from gs.conf import db_zhenai as dbconf
from gs.conf import db_baihe as dbconf_baihe
from gs.conf import db_jdjgq as dbconf_jdjgq

db_zhenai = None
db_baihe = None
db_jdjgq = None

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


def init_flaskdb_baihe(app, force_create=False):
    global db_baihe
    if db_baihe is None or force_create:
        db_conn_str = "mysql://%s:%s@%s:%d/%s?charset=%s" % (dbconf_baihe.USER, dbconf_baihe.PASSWD,
                                                             dbconf_baihe.HOST, dbconf_baihe.PORT, dbconf_baihe.DB,
                                                             dbconf_baihe.CHARSET)
        app.config['SQLALCHEMY_DATABASE_URI'] = db_conn_str
        app.config['SQLALCHEMY_ECHO'] = dbconf_baihe.SQLALCHEMY_ECHO
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = dbconf_baihe.SQLALCHEMY_TRACK_MODIFICATIONS
        app.config['SQLALCHEMY_POOL_RECYCLE'] = dbconf_baihe.SQLALCHEMY_POOL_RECYCLE
        db_baihe = SQLAlchemy(app, session_options={'autoflush': False})

def init_flaskdb_jdjgq(app, force_create=False):
    global db_jdjgq
    if db_jdjgq is None or force_create:
        db_conn_str = "mysql://%s:%s@%s:%d/%s?charset=%s" % (dbconf_jdjgq.USER, dbconf_jdjgq.PASSWD,
                                                             dbconf_jdjgq.HOST, dbconf_jdjgq.PORT, dbconf_jdjgq.DB,
                                                             dbconf_jdjgq.CHARSET)
        app.config['SQLALCHEMY_DATABASE_URI'] = db_conn_str
        app.config['SQLALCHEMY_ECHO'] = dbconf_jdjgq.SQLALCHEMY_ECHO
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = dbconf_jdjgq.SQLALCHEMY_TRACK_MODIFICATIONS
        app.config['SQLALCHEMY_POOL_RECYCLE'] = dbconf_jdjgq.SQLALCHEMY_POOL_RECYCLE
        db_jdjgq = SQLAlchemy(app, session_options={'autoflush': False})

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
