# -*- coding:utf-8 -*-
from gs.common.cdb import db_zhenai as db
from gs.util import mytime


class Member(db.Model):
    __tablename__ = 'member'
    member_id = db.Column(db.Integer, primary_key=True)
    zx_hide_flag = db.Column(db.String)
    age = db.Column(db.String)
    h = db.Column(db.String)
    height = db.Column(db.String)
    height_edu = db.Column(db.String)
    height_salary = db.Column(db.String)
    introduce_content = db.Column(db.String)
    ismailhot = db.Column(db.String)
    isstar = db.Column(db.String)
    marriage = db.Column(db.String)
    nickname = db.Column(db.String)
    not_open_privacy = db.Column(db.String)
    obj_is_vip = db.Column(db.String)
    photopath = db.Column(db.String)
    v = db.Column(db.String)
    vip_hide_flag = db.Column(db.String)
    workcity = db.Column(db.String)
    zhenxin = db.Column(db.String)
    zhenxintrial = db.Column(db.String)
    create_time = db.Column(db.DateTime, default=mytime.get_now_datetime)
