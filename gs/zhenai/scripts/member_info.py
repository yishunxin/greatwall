# -*- coding:utf-8 -*-
import StringIO
import gzip
import urllib2

import sys

import requests
from bs4 import BeautifulSoup


def memberinfo_spider(member_id):
    url = 'http://album.zhenai.com/u/{member_id}?flag=s'.format(member_id=str(member_id))
    send_headers = {
        'Host': 'album.zhenai.com',
        'Connection': 'keep-alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Referer': 'http://search.zhenai.com/v2/search/pinterest.do',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'sid=mzqFBQkLs6avafIcGeOd; CHANNEL=^~refererHost=^~channelId=903404^~subid=2^~; p=%5E%7Eworkcity%3D10102013%5E%7Elh%3D110454388%5E%7Esex%3D0%5E%7Enickname%3D%E4%BC%9A%E5%91%98110454388%5E%7Emt%3D1%5E%7Eage%3D23%5E%7Edby%3D4c7d97cf146d2aa%5E%7E; isSignOut=%5E%7ElastLoginActionTime%3D1525742352361%5E%7E; mid=%5E%7Emid%3D110454388%5E%7E; loginactiontime=%5E%7Eloginactiontime%3D1525742352361%5E%7E; logininfo=%5E%7Elogininfo%3D17611160302%5E%7E; live800=%5E%7EisOfflineCity%3Dtrue%5E%7EinfoValue%3DuserId%253D110454388%2526name%253D110454388%2526memo%253D%5E%7E; preLG_110454388=2018-05-08+09%3A14%3A49; login_health=5068e81137be33016b482d4acab7161edbb4ce53f2bfb805b8b9e32eb32fb6308a85d92866944685f26b52f9f900d34ffe0adf212cca09660f194f41f2a999e3; dgpw=0; JSESSIONID=abce_UEHT83mmgaXvv9mw; Hm_lvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525742327; Hm_lpvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525742395; __xsptplusUT_14=1; __xsptplus14=14.1.1525742395.1525742395.1%234%7C%7C%7C%7C%7C%23%23ZraghGhIOaiR76jQ5eE7qkfmVu2orWGS%23'
    }
    res = requests.get(url=url, headers=send_headers)
    soup = BeautifulSoup(res.content,'lxml')
    print soup


if __name__ == '__main__':
    memberinfo_spider(member_id=1179223817)
