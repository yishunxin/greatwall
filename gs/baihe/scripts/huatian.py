import json

import requests
from gs.sve import app_baihe
from gs.common import cdb

cdb.init_flaskdb_baihe(app_baihe)
from gs.baihe.service import MemberSvc
from gs.conf import redis
from gs.model.baihe import MemberId

redis.PORT = 6380
from gs.common.credis import get_redis

r = get_redis()


def spider():
    has_more = True
    page_token = '-6560831538367002430'
    while has_more:
        print page_token
        headers = {'Host': 'love.163.com',
                   'Connection': 'keep-alive',
                   'Accept': '*/*',
                   'Origin': 'https://love.163.com',
                   'X-Requested-With': 'XMLHttpRequest',
                   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
                   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                   'Referer': 'https://love.163.com/home',
                   'Accept-Encoding': 'gzip, deflate, br',
                   'Accept-Language': 'zh-CN,zh;q=0.9',
                   'Cookie': 'usertrack=ezq0plr7lhu0MvX4M2bRAg==; user-from=https://www.baidu.com/link?url=nAlfm9DNZy9312YVhSgTbVnVcZakm4HebIA-9nD6QSu&wd=&eqid=f2bf5a0200004788; from-page=https://www.baidu.com/link?url=nAlfm9DNZy9312YVhSgTbVnVcZakm4HebIA-9nD6QSu&wd=&eqid=f2bf5a0200004788000000065afbf38d; _ntes_nnid=09d80eb8d576893e6984fe27e5a38e06,1526461327190; _ntes_nuid=09d80eb8d576893e6984fe27e5a38e06; __f_=1526461359672; NTES_SESS=PKg9IxuZlxLYPV2mA0LbbZK28uUNkx0muiMKOou39W2MM6xQ.MSx83E0qtDoCCT8bgx1xurpujpySMBB79HLFlT0ChC3C1ipUV26HzOAlf5HKy_3LnIk4OsqFQ2mWh8u_nYgp_wJujEIyM2AltUDo1R3iyGt3iVw9ZKFFktfUbkTo5CQ3NvvIYBa5; S_INFO=1526461431|0|3&20##|shekinah365; P_INFO=shekinah365@163.com|1526461431|0|ht|00&99|null&null&null#bej&null#10#0#0|&0||shekinah365@163.com; NETEASE_WDA_UID=3802623081509641077%23%7C%231526461550513; toolBar=unfold|shake|0; homeFilterExpand=true; mp_MA-94A1-BB29DC5DA865_hubble=%7B%22deviceUdid%22%3A%20%22179edb72-1825-4132-aab5-457aab63babf%22%2C%22updatedTime%22%3A%201526461748315%2C%22sessionStartTime%22%3A%201526461339291%2C%22sessionReferrer%22%3A%20%22https%3A%2F%2Flove.163.com%2Fhome%22%2C%22sessionUuid%22%3A%20%2274882ccc-8b1d-4959-9616-9000bc26e650%22%2C%22initial_referrer%22%3A%20%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DnAlfm9DNZy9312YVhSgTbVnVcZakm4HebIA-9nD6QSu%26wd%3D%26eqid%3Df2bf5a0200004788000000065afbf38d%22%2C%22initial_referring_domain%22%3A%20%22www.baidu.com%22%2C%22persistedTime%22%3A%201526461327093%2C%22LASTEVENT%22%3A%20%7B%22eventId%22%3A%20%22view_homepage%22%2C%22time%22%3A%201526461748315%7D%2C%22user_id%22%3A%20%223802623081509641077%22%7D'}
        url = 'https://love.163.com/feed/list'
        params = {'province': '0',
                  'city': '0',
                  'age': '18-0',
                  'height': '0-0',
                  'education': '1-1',
                  'salaryRequire': '0-0',
                  'pageToken': page_token}
        res = requests.post(url=url, params=params, headers=headers)
        if res.status_code == 200:
            res = json.loads(res.content)
            user_list = res['list']
            memberid_list = list()
            for item in user_list:
                user = item['user']
                user_id = int(user['url'])
                r.set(name=user_id, value=user)
                memberid = MemberId()
                memberid.member_id = user_id
                memberid_list.append(memberid)
            if memberid_list:
                MemberSvc().memberid_batchsave(memberid_list)
            page = res['page']
            page_token = page['pageToken']
            page_method = page['pageMethod']
            if page_method == 'more':
                has_more = True
            else:
                has_more = False
        else:
            print res.content


if __name__ == '__main__':
    spider()
