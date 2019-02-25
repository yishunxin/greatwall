# -*- coding:utf-8 -*-
import json
import threading
import urllib2
import uuid

import requests
from joblib import Parallel
from joblib import delayed
from tqdm import trange

from gs.sve import app_zhenai
from gs.common import cdb
from gs.util import mytime

cdb.init_flaskdb_zhenai(app_zhenai)
from gs.model.zhenai import Member, MemberId
from gs.zhenai.service import MemberSvc


def userinfo_spider(currentpage):
    # search_condition = {
    #     'sex': -1,  # 性别
    #     'agebegin': -1,  # 开始年龄
    #     'ageend': -1,  # 结束年龄
    #     'workcityprovince': -1,  # 工作省份
    #     'workcitycity': -1,  # 工作城市
    #     'marriage': '',  # 婚姻状况
    #     'h1': -1,  # 身高
    #     'h2': -1,  # 身高
    #     'salaryBegin': -1,  # 月收入
    #     'salaryEnd': -1,  # 月收入
    #     'occupation': -1,  # 职业
    #     'h': -1,  # 学历
    #     'c': -1,  # 小孩
    #     'workcityprovince1': -1,  # 工作省份
    #     'workcitycity1': -1,  # 工作城市
    #     'constellation': -1,  # 星座
    #     'animals': -1,  # 生肖
    #     'stock': -1,  # 民族
    #     'belief': -1,  # 信仰
    #     'condition': 66,
    #     'orderby': 'hpf',  # 排序
    #     'hotIndex': 0,  # 标签
    #     'online': '',
    #     'currentpage': currentpage,
    #     'topSearch': True
    # }
    url = 'http://search.zhenai.com/v2/search/getPinterestData.do?' \
          'sex=-1&agebegin=-1&ageend=-1&workcityprovince=-1' \
          '&workcitycity=-1&h1=-1&h2=-1&salaryBegin=-1' \
          '&salaryEnd=-1&occupation=-1&h=-1&c=-1&workcityprovince1=-1' \
          '&workcitycity1=-1&constellation=-1&animals=-1&stock=-1&belief=-1' \
          '&condition=66&orderby=hpf&hotIndex=0&online=&' \
          'currentpage={currentpage}&topSearch=true'.format(currentpage=currentpage)
    send_headers = {
        'Host': 'search.zhenai.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Referer': 'http://search.zhenai.com/v2/search/pinterest.do',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'sid=mzqFBQkLs6avafIcGeOd; CHANNEL=^~refererHost=^~channelId=903404^~subid=2^~; p=%5E%7Eworkcity%3D10102013%5E%7Elh%3D110454388%5E%7Esex%3D0%5E%7Enickname%3D%E4%BC%9A%E5%91%98110454388%5E%7Emt%3D1%5E%7Eage%3D23%5E%7Edby%3D4c7d97cf146d2aa%5E%7E; isSignOut=%5E%7ElastLoginActionTime%3D1525742352361%5E%7E; mid=%5E%7Emid%3D110454388%5E%7E; loginactiontime=%5E%7Eloginactiontime%3D1525742352361%5E%7E; logininfo=%5E%7Elogininfo%3D17611160302%5E%7E; live800=%5E%7EisOfflineCity%3Dtrue%5E%7EinfoValue%3DuserId%253D110454388%2526name%253D110454388%2526memo%253D%5E%7E; preLG_110454388=2018-05-08+09%3A14%3A49; login_health=5068e81137be33016b482d4acab7161edbb4ce53f2bfb805b8b9e32eb32fb6308a85d92866944685f26b52f9f900d34ffe0adf212cca09660f194f41f2a999e3; dgpw=0; JSESSIONID=abce_UEHT83mmgaXvv9mw; Hm_lvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525742327; Hm_lpvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525742395; __xsptplusUT_14=1; __xsptplus14=14.1.1525742395.1525742395.1%234%7C%7C%7C%7C%7C%23%23ZraghGhIOaiR76jQ5eE7qkfmVu2orWGS%23'
    }

    try:
        req = urllib2.Request(url=url, headers=send_headers)
        res = urllib2.urlopen(req)
        res = res.read()
        res = json.loads(res, encoding='gbk')
        if 'code' in res and res['code'] == 1:
            data = res['data']
            print data
            exit()
            memberid_list = list()
            for item in data:
                memberid = MemberId()
                memberid.member_id = item['memberId']
                memberid_list.append(memberid)
            if memberid_list:
                bo = MemberSvc().memberid_batchsave(memberid_list)
                if bo:
                    print 'sucess,page=%s' % currentpage
        else:
            print 'http wrong,page=%s' % currentpage
    except Exception as e:
        print e
        print 'http wrong,page=%s' % currentpage


def get_task():
    return range(200000, 300000)



def mythreads():
    nub = 1000
    threads = []
    for i in range(nub):
        t = threading.Thread(target=test, args=[str(i),])
        threads.append(t)
    for t in threads:
        t.start()


if __name__ == '__main__':

    userinfo_spider(300000)
    exit()
    page_list = get_task()
    Parallel(n_jobs=-1)(delayed(userinfo_spider)(page_list[i]) for i in trange(len(page_list)))
