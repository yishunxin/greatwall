# -*- coding:utf-8 -*-
import json
import random
import time
from multiprocessing import Pool
from datetime import timedelta
from tornado import httpclient, gen, ioloop, queues

from gs.common.credis import get_redis

r = get_redis()
send_headers = {
    'Host': 'api.zhenai.com',
    'Connection': 'keep-alive',
    'Accept': 'application/json',
    'Origin': 'https://i.zhenai.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
    'Referer': 'https://i.zhenai.com/m/portal/member.html?id=1114049613',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cookie': 'sid=20e2bc98-1495-449f-9ee7-232017f03955; token=110454388.1526013136464.cd904fe5164699cc097eb42fa8d37c5f; gr_user_id=2a024226-2b1c-4798-8aae-256287b34c92; gr_cs1_bd393a95-c26d-481a-bb0e-46dca1e94d67=memberId%3A110454388; gr_session_id_ad9ebca2e114729a=bd393a95-c26d-481a-bb0e-46dca1e94d67_true; JSESSIONID=F8A88F0D4A71A092CEC35F7C190F1EB7'
}


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
    token = '110454388.1526013136464.cd904fe5164699cc097eb42fa8d37c5f'
    t = token
    n = "1.0.0"
    o = '2'
    r = get_uuid()
    a = gettoken(t, n + o + r)
    i = "/".join(["h5", n, o, '0', '0', '0', '0', '0', "", '0', '0', r, '0', '0', str(a)])
    return i


class AsySpider(object):
    """A simple class of asynchronous spider."""

    def __init__(self, ids, concurrency):
        self.ids = ids
        self.concurrency = concurrency
        self._q = queues.Queue()
        self._fetching = set()
        self._fetched = set()

    def handle_page(self, id, res):
        if res:
            print res
            res = json.loads(res)
            is_error = res['isError']
            if not is_error:
                data = res['data']
                r.set(name=id, value=data)
    @gen.coroutine
    def get_page(self, id):
        try:
            url = 'https://api.zhenai.com/profile/getObjectProfile.do?objectID={member_id}&ua={ua}&format=json&inCharset=utf-8&outCharset=utf-8&platform=2&_={timestamp}'.format(
                ua=getua(0), timestamp=int(round(time.time() * 1000)), member_id=id)
            response = yield httpclient.AsyncHTTPClient().fetch(url, headers=send_headers)
        except Exception as e:
            print e
            raise gen.Return('')
        raise gen.Return(response)

    @gen.coroutine
    def _run(self):

        @gen.coroutine
        def fetch_url():
            current_id = yield self._q.get()
            try:
                self._fetching.add(current_id)
                res = yield self.get_page(current_id)
                self._fetched.add(current_id)
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
        yield self._q.join(timeout=timedelta(seconds=300))
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
    all_num = 1
    num = 1  # number of cpu cores
    per_num, left = divmod(all_num, num)
    s = range(0, all_num, per_num)
    res = []
    for i in range(len(s) - 1):
        res.append((s[i], s[i + 1]))
    res.append((s[len(s) - 1], all_num))
    for i in res:
        args = [30181083]
        p.apply_async(run_spider, args=(args,))
    p.close()
    p.join()

    print time.time() - _st


if __name__ == '__main__':
    main()
