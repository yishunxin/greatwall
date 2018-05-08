# -*- coding:utf-8 -*-
import urllib2

import requests
import ssl

if __name__ == '__main__':
    send_headers = {
        'Host': 'api.zhenai.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json',
        'Origin':'https://i.zhenai.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Referer': 'https://i.zhenai.com/m/portal/member.html?id=1114049613',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'p=%5E%7Eworkcity%3D10102013%5E%7Elh%3D110454388%5E%7Esex%3D0%5E%7Enickname%3D%E4%BC%9A%E5%91%98110454388%5E%7Emt%3D1%5E%7Eage%3D23%5E%7Edby%3D4c7d97cf146d2aa%5E%7E; preLG_110454388=2018-05-07+09%3A39%3A03; login_health=5068e81137be33016b482d4acab7161edbb4ce53f2bfb805b8b9e32eb32fb6308a85d92866944685f26b52f9f900d34ffe0adf212cca09660f194f41f2a999e3; dgpw=0; sid=AaTsrEule9GiUAFXnV06; Hm_lvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525657308,1525742086,1525747568; isSignOut=%5E%7ElastLoginActionTime%3D1525747569204%5E%7E; CHANNEL=^~channelId=902759^~subid=0^~; __xsptplus14=14.6.1525759417.1525759417.1%234%7C%7C%7C%7C%7C%23%23YOsGTuXrzWRPB-xJo9LDH41nWrKxCf2c%23; Hm_lpvt_2c8ad67df9e787ad29dbd54ee608f5d2=1525760998; gr_user_id=1e445f97-cf77-4e30-b3b5-0a8e9fe7ec2b; token=110454388.1525767162472.44d7505b54a9a2cd6725a46e72101d92; gr_session_id_ad9ebca2e114729a=625afc70-d8be-4505-911d-5375950b86be_true; JSESSIONID=78E8B1906E29BCC66BE89DE3F00E7A2C'
    }
    res = requests.get(url='https://api.zhenai.com/profile/getObjectProfile.do?objectID=1114049613&ua=h5%2F1.0.0%2F2%2F0%2F0%2F0%2F0%2F0%2F%2F0%2F0%2F22edf67f-ba5b-4ccb-bee5-c2e0aa3bc426%2F0%2F0%2F1126437620&format=json&inCharset=utf-8&outCharset=utf-8&platform=2&_=1525772563389',headers=send_headers,verify=False)
    print(res.content)
