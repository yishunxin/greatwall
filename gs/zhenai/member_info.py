# -*- coding:utf-8 -*-
import json
import os
import urllib2

from gs.sve import app_zhenai
from gs.common import cdb
from gs.util import mytime

cdb.init_flaskdb_zhenai(app_zhenai)
from gs.model.zhenai import Member
from gs.zhenai.service import MemberSvc


def userinfo_spider(currentpage):
    search_condition = {
        'sex': 1,
        'agebegin': 18,
        'ageend': 24,
        'workcityprovince': -1,
        'workcitycity': -1,
        'h1': -1,
        'h2': -1,
        'salaryBegin': -1,
        'salaryEnd': -1,
        'occupation': -1,
        'h': -1,
        'c': -1,
        'workcityprovince1': -1,
        'workcitycity1': -1,
        'constellation': -1,
        'animals': -1,
        'stock': -1,
        'belief': -1,
        'condition': 66,
        'orderby': 'hpf',
        'hotIndex': 0,
        'online': '',
        'currentpage': currentpage,
        'topSearch': True
    }
    url = 'http://search.zhenai.com/v2/search/getPinterestData.do?' \
          'sex=-1&agebegin=-1&ageend=-1&workcityprovince=-1' \
          '&workcitycity=-1&h1=-1&h2=-1&salaryBegin=-1' \
          '&salaryEnd=-1&occupation=-1&h=-1&c=-1&workcityprovince1=-1' \
          '&workcitycity1=-1&constellation=-1&animals=-1&stock=-1&belief=-1' \
          '&condition={condition}&orderby=hpf&hotIndex=0&online=&' \
          'currentpage={currentpage}&topSearch=true'.format(
        currentpage=search_condition['currentpage'], condition=search_condition['condition'])
    send_headers = {
        'Host': 'search.zhenai.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Referer': 'http://search.zhenai.com/v2/search/pinterest.do',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'sid=PJCbXUZ63p4XztFs6U5T; ipCityCode=10102008; ipOfflineCityCode=10102008; Hm_lvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525657308; p=%5E%7Eworkcity%3D10102013%5E%7Elh%3D110454388%5E%7Esex%3D0%5E%7Enickname%3D%E4%BC%9A%E5%91%98110454388%5E%7Emt%3D1%5E%7Eage%3D23%5E%7Edby%3D4c7d97cf146d2aa%5E%7E; isSignOut=%5E%7ElastLoginActionTime%3D1525658898272%5E%7E; mid=%5E%7Emid%3D110454388%5E%7E; loginactiontime=%5E%7Eloginactiontime%3D1525658898272%5E%7E; logininfo=%5E%7Elogininfo%3D17611160302%5E%7E; live800=%5E%7EisOfflineCity%3Dtrue%5E%7EinfoValue%3DuserId%253D110454388%2526name%253D110454388%2526memo%253D%5E%7E; preLG_110454388=2018-05-07+09%3A39%3A03; login_health=5068e81137be33016b482d4acab7161edbb4ce53f2bfb805b8b9e32eb32fb6308a85d92866944685f26b52f9f900d34ffe0adf212cca09660f194f41f2a999e3; dgpw=0; JSESSIONID=abcGo0OAhWAHh_4Pex4mw; __xsptplusUT_14=1; Hm_lpvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525658985; __xsptplus14=14.1.1525658963.1525658984.2%234%7C%7C%7C%7C%7C%23%233IAES04piSScXV_nBflhnpCEFEJXjV6c%23'
    }
    req = urllib2.Request(url=url, headers=send_headers, origin_req_host=None)
    res = urllib2.urlopen(req)
    res = res.read()
    res = json.loads(res, encoding='gbk')
    if 'code' in res and res['code'] == 1:
        data = res['data']
        print len(data)
        print json.dumps(data,ensure_ascii=False,indent=2)
        exit()
        member_list = list()
        for item in data:
            member = Member()
            member.zx_hide_flag = item['ZXHideFlag']
            member.age = item['age']
            member.h = item['h']
            member.height = item['height']
            member.height_edu = item['heightEdu']
            member.height_salary = item['heightSalary']
            if 'introduceContent' in item:
                member.introduce_content = item['introduceContent']
            member.ismailhot = item['isMailHot']
            member.isstar = item['isStar']
            member.marriage = item['marriage']
            member.member_id = item['memberId']
            member.nickname = item['nickName']
            member.not_open_privacy = item['notOpenPrivacy']
            member.obj_is_vip = item['objIsVip']
            member.photopath = item['photopath']
            member.v = item['v']
            member.vip_hide_flag = item['vipHideFlag']
            member.workcity = item['workCity']
            member.zhenxin = item['zhenxin']
            member.zhenxintrial = item['zhenxintrial']
            member.create_time = mytime.get_now_datetime()
            member_list.append(member)
        bo = MemberSvc().member_batchsave(member_list)
        if bo:
            print 'sucess,'


if __name__ == '__main__':
    userinfo_spider(2)
