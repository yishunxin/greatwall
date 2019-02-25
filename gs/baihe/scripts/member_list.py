# -*- coding:utf-8 -*-
import json
import random
import time
import urllib
import urllib2
from multiprocessing import Pool

import requests
from tornado import httpclient, gen, ioloop, queues
from gs.sve import app_baihe
from gs.common import cdb

cdb.init_flaskdb_baihe(app_baihe)
from gs.common.credis import get_redis
from gs.model.baihe import MemberId
from gs.baihe.service import MemberSvc

r = get_redis()
send_headers = {
    'Host': 'search.jiayuan.com',
    'Connection': 'keep-alive',
    'Content-Length': '86',
    'Accept': '*/*',
    'Origin': 'http://search.jiayuan.com',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Referer': 'http://search.jiayuan.com/v2/index.php?key=&sex=f&stc=&sn=default&sv=1&p=1&pt=41885&ft=off&f=select&mt=d',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cookie': 'guider_quick_search=on; is_searchv2=1; stadate1=176621434; myloc=11%7C1121; myage=23; PROFILE=177621434%3Ayishunxin%3Am%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_m.jpg%3A1%3A1%3A50%3A10; mysex=m; myuid=176621434; myincome=40; wap_u=17611160302; wap_p=oJvKxwCFi2Dn7OgNx%252ADphNbPA0cNa%252AusPSIz5fv5utjb7kP0%252AAF6SAU6mX8r; wap_p_code=4cd4c2fceb8d98ebaede702b5e2bb959; SESSION_HASH=a6aa2291f761af94648dedbeb5066a686815f0cf; REG_REF_URL=; user_access=1; PHPSESSID=21bf39eeaa4ba93911fded47fc85c891'
}


class AsySpider(object):
    """A simple class of asynchronous spider."""

    def __init__(self, ids, concurrency):
        self.ids = ids
        self.concurrency = concurrency
        self._q = queues.Queue()
        self._fetching = set()
        self._fetched = set()

    def handle_page(self, member_id, res):
        try:
            res = json.loads(res[11:-13])
            userinfo = res['userInfo'][1:]
            memberid_list = list()
            for item in userinfo:
                memberid = MemberId()
                memberid.member_id = item['uid']
                memberid_list.append(memberid)
            if memberid_list:
                MemberSvc().memberid_batchsave(memberid_list)
        except Exception as e:
            print 'id=%s' % id
            print e
            print 'http wrong,page=%s' % member_id

    @gen.coroutine
    def get_page(self, id):
        try:
            url = 'http://search.jiayuan.com/v2/search_v2.php'
            body = 'sex=f&key=&stc=&sn=default&sv=1&p={}&f=select&listStyle=bigPhoto&pri_uid=0&jsversion=v5'.format(
                id)
            response = yield httpclient.AsyncHTTPClient().fetch(url, headers=send_headers, method='POST', body=body)
        except Exception as e:
            print 'id=%s' % id
            print e
            raise gen.Return('')
        raise gen.Return(response.body)

    @gen.coroutine
    def _run(self):

        @gen.coroutine
        def fetch_url():
            current_id = yield self._q.get()
            try:
                self._fetching.add(current_id)
                res = yield self.get_page(current_id)
                self._fetched.add(current_id)
                if res:
                    self.handle_page(current_id, res)

                for i in range(self.concurrency):
                    if self.ids:
                        yield self._q.put(self.ids.pop())

            finally:
                self._q.task_done()

        @gen.coroutine
        def worker():
            while True:
                yield fetch_url()

        self._q.put(self.ids.pop())

        # Start workers, then wait for the work queue to be empty.
        for _ in range(self.concurrency):
            worker()
        yield self._q.join()
        assert self._fetching == self._fetched

    def run(self):
        io_loop = ioloop.IOLoop.current()
        io_loop.run_sync(self._run)


def run_spider(ids):
    s = AsySpider(ids, 10)
    s.run()


def main():
    _st = time.time()
    p = Pool()
    all_num = 58007
    num = 4  # number of cpu cores
    per_num, left = divmod(all_num, num)
    s = range(1, all_num, per_num)
    res = []
    for i in range(len(s) - 1):
        res.append((s[i], s[i + 1]))
    res.append((s[len(s) - 1], all_num))
    for i in res:
        args = range(i[0], i[1])
        p.apply_async(run_spider, args=(args,))
    p.close()
    p.join()

    print time.time() - _st


# def handle_page(page, res):
#     try:
#         res = json.loads(res[11:-13])
#         userinfo = res['userInfo'][1:]
#         memberid_list = list()
#         for item in userinfo:
#             memberid = MemberId()
#             memberid.member_id = item['uid']
#             memberid_list.append(memberid)
#         if memberid_list:
#             MemberSvc().memberid_batchsave(memberid_list)
#     except Exception as e:
#         print 'id=%s' % id
#         print e
#         print 'http wrong,page=%s' % page

if __name__ == '__main__':
    send_headers = {
        'Host': 'search.jiayuan.com',
        'Content-Length': '89',
        'Accept': '*/*',
        'Origin': 'http://search.jiayuan.com',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'http://search.jiayuan.com/v2/index.php?key=&sex=f&stc=&sn=default&sv=1&p=1000&pt=42019&ft=off&f=select&mt=d',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cookie': 'guider_quick_search=on; is_searchv2=1; myuid=176621434; SESSION_HASH=a6aa2291f761af94648dedbeb5066a686815f0cf; PHPSESSID=21bf39eeaa4ba93911fded47fc85c891; save_jy_login_name=17611160302; main_search:177621434=%7C%7C%7C00; REG_REF_URL=http://login.jiayuan.com/logout2.php; user_access=1'
    }

    for i in range(1000, 2000):
        send_headers[
            'Referer'] = 'http://search.jiayuan.com/v2/index.php?key=&sex=f&stc=&sn=default&sv=1&p={}&pt=42019&ft=off&f=select&mt=d'.format(
            i)
        send_headers['Content-Length'] = str(len(send_headers['Referer']))
        res = requests.post(url='http://search.jiayuan.com/v2/search_v2.php',
                            data='sex=f&key=&stc=&sn=default&sv=1&p={}&f=select&listStyle=bigPhoto&pri_uid=0&jsversion=v5'.format(
                                str(i)), headers=send_headers)
        res = json.loads(res.content[11:-13])
        userinfo = res['userInfo']
        memberid_list = list()
        for item in userinfo:
            memberid = MemberId()
            memberid.member_id = item['uid']
            memberid_list.append(memberid)
        if memberid_list:
            MemberSvc().memberid_batchsave(memberid_list)
        time.sleep(5)
    exit()
    main()
