# -*- coding:utf-8 -*-
from gs.common.cdb import db_jdjgq as db


class Music(db.Model):
    __tablename__ = 'music'
    m_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    author = db.Column(db.String)
    album = db.Column(db.String)
    item_id = db.Column(db.Integer)
    music_url = db.Column(db.String)
    lrc_url = db.Column(db.String)
    label = db.Column(db.String)

