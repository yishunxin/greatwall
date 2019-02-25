# -*- coding:utf-8 -*-
import json
import time
from multiprocessing import Pool
from tornado import httpclient, gen, ioloop, queues
from gs.sve import app_zhenai
from gs.common import cdb

cdb.init_flaskdb_zhenai(app_zhenai)
from gs.common.credis import get_redis
from gs.model.zhenai import MemberId
from gs.zhenai.service import MemberSvc

r = get_redis()
send_headers = {
    'Host': 'album.zhenai.com',
    'Connection': 'keep-alive',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
    'Referer': 'http://search.zhenai.com/v2/search/pinterest.do',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cookie': 'SEOReferrer=http://profile.zhenai.com/v2/personal/home.do; SEARCHWORD=3101890; sid=gZUS0l8W01AKrjse7C5o; CHANNEL=^~refererHost=www.baidu.com^~channelId=900122^~subid=^~; Hm_lvt_2c8ad67df9e787ad29dbd54ee608f5d2=1526021257; p=%5E%7Eworkcity%3D10102013%5E%7Elh%3D110454388%5E%7Esex%3D0%5E%7Enickname%3Dlkwc%5E%7Emt%3D1%5E%7Eage%3D23%5E%7Edby%3D4c7d97cf146d2aa%5E%7E; isSignOut=%5E%7ElastLoginActionTime%3D1526021280361%5E%7E; mid=%5E%7Emid%3D110454388%5E%7E; loginactiontime=%5E%7Eloginactiontime%3D1526021280361%5E%7E; logininfo=%5E%7Elogininfo%3D17611160302%5E%7E; live800=%5E%7EisOfflineCity%3Dtrue%5E%7EinfoValue%3DuserId%253D110454388%2526name%253D110454388%2526memo%253D%5E%7E; preLG_110454388=2018-05-11+12%3A32%3A18; login_health=5068e81137be33016b482d4acab7161edbb4ce53f2bfb805b8b9e32eb32fb6308a85d92866944685f26b52f9f900d34ffe0adf212cca09660f194f41f2a999e3; dgpw=0; JSESSIONID=abc_qldn2ajhz_ZJn9nnw; Hm_lpvt_2c8ad67df9e787ad29dbd54ee608f5d2=1526021446'
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
            res = json.loads(res, encoding='gbk')
            if 'code' in res and res['code'] == 1:
                data = res['data']
                memberid_list = list()
                for item in data:
                    memberid = MemberId()
                    memberid.member_id = item['memberId']
                    memberid_list.append(memberid)
                if memberid_list:
                    MemberSvc().memberid_batchsave(memberid_list)
        except Exception as e:
            print e
            print 'http wrong,page=%s' % member_id
    @gen.coroutine
    def get_page(self, id):
        try:
            url = 'http://search.zhenai.com/v2/search/getPinterestData.do?' \
                  'sex=-1&agebegin=-1&ageend=-1&workcityprovince=-1' \
                  '&workcitycity=-1&h1=-1&h2=-1&salaryBegin=-1' \
                  '&salaryEnd=-1&occupation=-1&h=-1&c=-1&workcityprovince1=-1' \
                  '&workcitycity1=-1&constellation=-1&animals=-1&stock=-1&belief=-1' \
                  '&condition=66&orderby=hpf&hotIndex=0&online=&' \
                  'currentpage={currentpage}&topSearch=true'.format(currentpage=id)
            response = yield httpclient.AsyncHTTPClient().fetch(url, headers=send_headers)
        except Exception as e:
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
    all_num = 100000000
    num = 12  # number of cpu cores
    per_num, left = divmod(all_num, num)
    s = range(0, all_num, per_num)
    res = []
    for i in range(len(s) - 1):
        res.append((s[i], s[i + 1]))
    res.append((s[len(s) - 1], all_num))
    print res
    for i in res:
        args = range(i[0], i[1])
        p.apply_async(run_spider, args=(args,))
    p.close()
    p.join()

    print time.time() - _st


if __name__ == '__main__':
    main()
