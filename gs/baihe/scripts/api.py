# -*- coding:utf-8 -*-
import json
import random

import requests
import time


from gs.sve import app_zhenai
from gs.common import cdb

cdb.init_flaskdb_zhenai(app_zhenai)
from gs.zhenai.service import MemberSvc


def get_uuid():
    e = 16
    result = ''
    for i in "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx":
        if i == 'x' or i == 'y':
            n = int(random.random() * e)
            o = n if "x" == i else 3
            o = o & n | 8
            result = result + hex(o)[2:]
        else:
            result = result + i
    return result


def gettoken(e, t):
    n = e + t
    o = 5381
    if n:
        a = len(n)
        for r in range(0, a):
            o += (o << 5) + ord(n[r])
    return 2147483647 & o


def getparam(e=None, t=None):
    # location_href = 'https://i.zhenai.com/m/portal/member.html?id=1118194794'
    # n = location_href
    return ''


def getua(token):
    token = '110454388.1525944436046.de387b405996c3e4e399243e864a5cae'
    t = token
    n = "1.0.0"
    o = '2'
    r = get_uuid()
    a = gettoken(t, n + o + r)
    i = "/".join(["h5", n, o, '0', '0', '0', '0', '0', "", '0', '0', r, '0', '0', str(a)])
    return i


def member_info(member_ids):
    send_headers = {
        'Host': 'api.zhenai.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json',
        'Origin': 'https://i.zhenai.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Referer': 'https://i.zhenai.com/m/portal/member.html?id=1114049613',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'sid=ce5e0df8-3fb7-4250-a3ed-cd8f59bc0daa; token=110454388.1525944436046.de387b405996c3e4e399243e864a5cae; gr_user_id=b2b92e4b-3e59-44ce-974e-90c43009469d; JSESSIONID=sid=ce5e0df8-3fb7-4250-a3ed-cd8f59bc0daa; token=110454388.1525944436046.de387b405996c3e4e399243e864a5cae; gr_user_id=b2b92e4b-3e59-44ce-974e-90c43009469d; JSESSIONID=B3C272EA5B5F13BB2DB908D98C561A0D'
    }
    member_list = list()
    photo_list = list()
    for member_id in member_ids:
        res = requests.get(
            url='https://api.zhenai.com/profile/getObjectProfile.do?objectID={member_id}&ua={ua}&format=json&inCharset=utf-8&outCharset=utf-8&platform=2&_={timestamp}'.format(
                ua=getua(0), timestamp=int(round(time.time() * 1000)),member_id=member_id),
            headers=send_headers, verify=False)
        print (res.headers)
        res = json.loads(res.content)

        print (res)
        exit()
        data = res['data']
        data['basicInfo'] = ','.join(data['basicInfo'])
        data['detailInfo'] = ','.join(data['detailInfo'])
        data['objectInfo'] = ','.join(data['objectInfo'])
        photos = data['photos']
        member_list.append(data)
        photo_list.extend(photos)
        print (res)
    MemberSvc().member_batchsave(member_list)
    MemberSvc().photo_batchsave(photo_list)

if __name__ == '__main__':
    member_info(member_ids=[30181083])

