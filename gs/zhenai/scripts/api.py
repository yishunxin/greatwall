# -*- coding:utf-8 -*-
import random
import urllib2

import requests
import ssl

import time


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
    n = e+t
    o=5381
    if n:
        a = len(n)
        for r in range(0,a):
            o += (o << 5) + ord(n[r])
    return 2147483647 & o

def getparam(e=None,t=None):
    # location_href = 'https://i.zhenai.com/m/portal/member.html?id=1118194794'
    # n = location_href
    return ''

def getua(token):
    token = '110454388.1525785563551.59275f7d2a1d69381a0efc0764d22109'
    t = token
    n = "1.0.0"
    o = '2'
    r = get_uuid()
    a = gettoken(t, n + o + r)
    i = "/".join(["h5", n, o, '0', '0', '0', '0','0', "", '0', '0', r, '0', '0', str(a)])
    return i

if __name__ == '__main__':
    send_headers = {
        'Host': 'api.zhenai.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json',
        'Origin': 'https://i.zhenai.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Referer': 'https://i.zhenai.com/m/portal/member.html?id=1114049613',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'sid=6b608731-e6a3-4554-bd38-22ac6def6638; token=110454388.1525785563551.59275f7d2a1d69381a0efc0764d22109; gr_user_id=d0689713-b4a0-4cee-893b-a98229a9d9bd; gr_cs1_4669ffc7-3dfd-4a8c-8787-8359b6c8e970=memberId%3A110454388; gr_session_id_ad9ebca2e114729a=4669ffc7-3dfd-4a8c-8787-8359b6c8e970_true; JSESSIONID=43296288BDDE558178C715BF2D44165B'
    }
    res = requests.get(
        url='https://api.zhenai.com/profile/getObjectProfile.do?objectID=1179223817&ua={ua}&format=json&inCharset=utf-8&outCharset=utf-8&platform=2&_={timestamp}'.format(ua=getua(0),timestamp=int(round(time.time() * 1000))),
        headers=send_headers, verify=False)
    print(res.content)
