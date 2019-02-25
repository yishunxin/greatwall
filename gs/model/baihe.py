# -*- coding:utf-8 -*-
from gs.common.cdb import db_baihe as db
from gs.util import mytime


class Member(db.Model):
    __tablename__ = 'member'
    memberID = db.Column(db.Integer, primary_key=True)
    validateIDCard = db.Column(db.String)
    isFollowing = db.Column(db.String)
    heightString = db.Column(db.String)
    workCityString = db.Column(db.String)
    liveAudienceCount = db.Column(db.String)
    objectChildrenString = db.Column(db.String)
    lastLoginTimeString = db.Column(db.String)
    liveType = db.Column(db.String)
    objectWorkCityString = db.Column(db.String)
    isInBlackList = db.Column(db.String)
    validateFace = db.Column(db.String)
    objectMarriageString = db.Column(db.String)
    basicInfo = db.Column(db.String)
    nickname = db.Column(db.String)
    validateEducation = db.Column(db.String)
    isActive = db.Column(db.String)
    showValidateIDCardFlag = db.Column(db.String)
    objectSalaryString = db.Column(db.String)
    avatarPhotoID = db.Column(db.String)
    introduceContent = db.Column(db.String)
    avatarURL = db.Column(db.String)
    isZhenaiMail = db.Column(db.String)
    detailInfo = db.Column(db.String)
    age = db.Column(db.String)
    genderString = db.Column(db.String)
    isStar = db.Column(db.String)
    onlive = db.Column(db.String)
    objectEducationString = db.Column(db.String)
    videoCount = db.Column(db.String)
    objectWantChildrenString = db.Column(db.String)
    gender = db.Column(db.String)
    objectHeightString = db.Column(db.String)
    objectAgeString = db.Column(db.String)
    objectInfo = db.Column(db.String)
    avatarPraiseCount = db.Column(db.String)
    objectBodyString = db.Column(db.String)
    salaryString = db.Column(db.String)

class MemberId(db.Model):
    __tablename__ = 'member_id'
    pk = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer)

class Photo(db.Model):
    __tablename__ = 'photo'
    photoID = db.Column(db.Integer, primary_key=True)
    isAvatar = db.Column(db.String)
    photoType = db.Column(db.String)
    photoURL = db.Column(db.String)
    praiseCount = db.Column(db.String)
    verified = db.Column(db.String)
    createTime = db.Column(db.String)
