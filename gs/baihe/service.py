# -*- coding:utf-8 -*-
import logging

from gs.common.cdb import db_baihe as db
from gs.model.baihe import Member, MemberId, Photo
from gs.util import mymodel

logger = logging.getLogger('baihe_svc')


class MemberSvc(object):
    def member_get(self, member_id):
        return db.session.query(Member).get(member_id)

    def member_save(self, member):
        if not self.member_get(member.member_id):
            try:
                db.session.add(member)
                db.session.commit()
                return True
            except Exception as e:
                logger.exception(e)
                db.session.rollback()
                return False

    def __before_save(self, member_ids):
        q = db.session.query(Member.member_id).filter(Member.member_id.in_(member_ids)).all()
        return [item[0] for item in q]

    def member_batchsave(self, model_list):
        # member_ids = [member.member_id for member in member_list]
        # exist_member_ids = self.__before_save(member_ids)
        # member_list = [member for member in member_list if member.member_id not in exist_member_ids]
        # model_list = list()
        # for member in member_list:
        #     model_list.append(mymodel.model_todbdict(member))
        try:
            db.session.execute(Member.__table__.insert(), model_list)
            db.session.commit()
            return True
        except Exception as e:
            logger.exception(e)
            db.session.rollback()
            return False

    def memberid_batchsave(self, memberids):
        model_list = list()
        for memberid in memberids:
            model_list.append(mymodel.model_todbdict(memberid))
        try:
            db.session.execute(MemberId.__table__.insert(), model_list)
            db.session.commit()
            return True
        except Exception as e:
            logger.exception(e)
            db.session.rollback()
            return False

    def photo_batchsave(self,model_list):
        try:
            db.session.execute(Photo.__table__.insert(), model_list)
            db.session.commit()
            return True
        except Exception as e:
            logger.exception(e)
            db.session.rollback()
            return False
