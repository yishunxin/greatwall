# -*- coding:utf-8 -*-
import logging
import requests
from bs4 import BeautifulSoup
import json
import random
import time
from multiprocessing import Pool
from datetime import timedelta
from tornado import httpclient, gen, ioloop, queues

from gs.common.credis import get_redis
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
            member = dict()
            member_hobby = dict()
            member_object = dict()
            member['member_id'] = member_id
            member_hobby['member_id'] = member_id
            member_object['member_id'] = member_id
            soup = BeautifulSoup(res, 'lxml')
            script = soup.select('script')[-2].text
            member_info = script.split('\n')[21]
            member_info = json.loads(member_info[member_info.index('{'):member_info.index('}') + 1])
            member['isvip'] = member_info['isVip']
            member['avatar'] = member_info['photo']
            member['zhenxintype'] = member_info['zhenXinType']
            member['nickname'] = member_info['nickName']
            member['iszhenxin'] = member_info['isZhenXin']
            member['infopercent'] = member_info['infoPercent']
            member['isstar'] = member_info['isStar']
            member['fullname'] = member_info['fullName']
            brief_info = soup.select_one('.mod-brief-info')
            if brief_info.select_one('#praisePhoto'):
                photo_ids = brief_info.select_one('#praisePhoto').select('li')
                photo_ids = [int(item.attrs['data-photo-id']) for item in photo_ids]
                photos = brief_info.select_one('#AblumsThumbsListID').select('p')
                photos = [item.select_one('img').attrs['data-big-img'] for item in photos]
            else:
                photo_ids = list()
            member['credit_score'] = brief_info.select_one('.credit-js').attrs['data-score']
            member['honest_score'] = brief_info.select_one('.brief-item').span.text
            brief_table = brief_info.select_one('.brief-table').select('td')
            brief = [item.text.split(u'：')[1] for item in brief_table]
            member['age'] = brief[0]
            member['height'] = brief[1]
            member['salary'] = brief[2]
            member['marriage'] = brief[3]
            member['education'] = brief[4]
            member['workcity'] = brief[5]
            member['job'] = brief[6]
            member['horoscope'] = brief[7]
            member['birth_city'] = brief[8]
            detail_info = soup.select_one('.mod-person-area')
            member['inner_info'] = detail_info.select_one('.info-inner').p.text
            member['describe_info'] = detail_info.select_one('.info-describe').p.text
            detail_span_list = detail_info.select_one('.floor-table').select('span')
            member['sex'] = detail_span_list[1].text
            member['animal'] = detail_span_list[3].text
            member['weight'] = detail_span_list[9].text
            member['blood'] = detail_span_list[11].text
            member['body_style'] = detail_span_list[13].text
            member['nationality'] = detail_span_list[17].text
            member['company'] = detail_span_list[19].text
            member['belief'] = detail_span_list[21].text
            life_span_list = detail_info.select_one('.floor-life').select('span')
            member_hobby['house'] = life_span_list[1].text
            member_hobby['want_marriage'] = life_span_list[3].text
            member_hobby['with_parents'] = life_span_list[7].text
            member_hobby['smoke'] = life_span_list[9].text
            member_hobby['with_object_parents'] = life_span_list[11].text
            member_hobby['drink'] = life_span_list[13].text
            member_hobby['luxury'] = life_span_list[15].text
            member_hobby['cook'] = life_span_list[17].text
            member_hobby['dating'] = life_span_list[19].text
            member_hobby['housework'] = life_span_list[21].text
            hobby_span_list = detail_info.select_one('.floor-hobby').select('span')
            member_hobby['activity'] = hobby_span_list[1].text
            member_hobby['food'] = hobby_span_list[3].text
            member_hobby['sports'] = hobby_span_list[5].text
            member_hobby['place'] = hobby_span_list[7].text
            member_hobby['music'] = hobby_span_list[9].text
            member_hobby['pet'] = hobby_span_list[11].text
            member_hobby['movie'] = hobby_span_list[13].text
            object_span_list = detail_info.select_one('.floor-term').select('span')
            member_object['object_sex'] = object_span_list[1]
            member_object['object_body_style'] = object_span_list[3]
            member_object['object_age'] = object_span_list[5]
            member_object['object_job'] = object_span_list[7]
            member_object['object_height'] = object_span_list[9]
            member_object['object_smoke'] = object_span_list[11]
            member_object['object_education'] = object_span_list[13]
            member_object['object_drink'] = object_span_list[15]
            member_object['object_salary'] = object_span_list[17]
            member_object['object_children'] = object_span_list[19]
            member_object['object_marriage'] = object_span_list[21]
            member_object['object_want_child'] = object_span_list[23]
            member_object['object_workcity'] = object_span_list[25]
            member_object['object_hasphoto'] = object_span_list[27]
            for i in range(len(photo_ids)):
                photo = dict()
                photo['photo_id'] = photo_ids[i]
                photo['url'] = photos[i]
                photo['member_id'] = member_id
                r.hset(name='photo', key=photo_ids[i], value=photo)
            r.hset(name='member', key=member_id, value=member)
            r.hset(name='member_hobby', key=member_id, value=member_hobby)
            r.hset(name='member_object', key=member_id, value=member_object)
        except Exception as e:
            logging.exception(e)
            logging.warn(member_id)
            pass
    @gen.coroutine
    def get_page(self, id):
        try:
            url = 'http://album.zhenai.com/u/{member_id}?flag=s'.format(member_id=str(id))
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
    all_num = 10000000
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



















# def memberinfo_spider(member_id):
#     url = 'http://album.zhenai.com/u/{member_id}?flag=s'.format(member_id=str(member_id))
#     send_headers = {
#         'Host': 'album.zhenai.com',
#         'Connection': 'keep-alive',
#         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
#         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
#         'Referer': 'http://search.zhenai.com/v2/search/pinterest.do',
#         'Accept-Encoding': 'gzip, deflate',
#         'Accept-Language': 'zh-CN,zh;q=0.9',
#         'Cookie': 'SEOReferrer=http://profile.zhenai.com/v2/personal/home.do; SEARCHWORD=3101890; sid=gZUS0l8W01AKrjse7C5o; CHANNEL=^~refererHost=www.baidu.com^~channelId=900122^~subid=^~; Hm_lvt_2c8ad67df9e787ad29dbd54ee608f5d2=1526021257; p=%5E%7Eworkcity%3D10102013%5E%7Elh%3D110454388%5E%7Esex%3D0%5E%7Enickname%3Dlkwc%5E%7Emt%3D1%5E%7Eage%3D23%5E%7Edby%3D4c7d97cf146d2aa%5E%7E; isSignOut=%5E%7ElastLoginActionTime%3D1526021280361%5E%7E; mid=%5E%7Emid%3D110454388%5E%7E; loginactiontime=%5E%7Eloginactiontime%3D1526021280361%5E%7E; logininfo=%5E%7Elogininfo%3D17611160302%5E%7E; live800=%5E%7EisOfflineCity%3Dtrue%5E%7EinfoValue%3DuserId%253D110454388%2526name%253D110454388%2526memo%253D%5E%7E; preLG_110454388=2018-05-11+12%3A32%3A18; login_health=5068e81137be33016b482d4acab7161edbb4ce53f2bfb805b8b9e32eb32fb6308a85d92866944685f26b52f9f900d34ffe0adf212cca09660f194f41f2a999e3; dgpw=0; JSESSIONID=abc_qldn2ajhz_ZJn9nnw; Hm_lpvt_2c8ad67df9e787ad29dbd54ee608f5d2=1526021446'
#     }
#     res = requests.get(url=url, headers=send_headers)
#     if res.status_code == 200:
#         member = dict()
#         photo_list = list()
#         member_hobby = dict()
#         member_object = dict()
#         member['member_id'] = member_id
#         member_hobby['member_id'] = member_id
#         member_object['member_id'] = member_id
#         soup = BeautifulSoup(res.content, 'lxml')
#         script = soup.select('script')[-2].text
#         member_info = script.split('\n')[21]
#         member_info = json.loads(member_info[member_info.index('{'):member_info.index('}') + 1])
#         member['isvip'] = member_info['isVip']
#         member['avatar'] = member_info['photo']
#         member['zhenxintype'] = member_info['zhenXinType']
#         member['nickname'] = member_info['nickName']
#         member['iszhenxin'] = member_info['isZhenXin']
#         member['infopercent'] = member_info['infoPercent']
#         member['isstar'] = member_info['isStar']
#         member['fullname'] = member_info['fullName']
#         brief_info = soup.select_one('.mod-brief-info')
#         photo_ids = brief_info.select_one('#praisePhoto').select('li')
#         photo_ids = [int(item.attrs['data-photo-id']) for item in photo_ids]
#         photos = brief_info.select_one('#AblumsThumbsListID').select('p')
#         photos = [item.select_one('img').attrs['data-big-img'] for item in photos]
#         for i in range(len(photo_ids)):
#             photo = dict()
#             photo['photo_id'] = photo_ids[i]
#             photo['url'] = photos[i]
#             photo['member_id'] = member_id
#             photo_list.append(photo)
#         member['credit_score'] = brief_info.select_one('.flag-credit').attrs['data-score']
#         member['honest_score'] = brief_info.select_one('.brief-item').span.text
#         brief_table = brief_info.select_one('.brief-table').select('td')
#         brief = [item.text.split(u'：')[1] for item in brief_table]
#         member['age'] = brief[0]
#         member['height'] = brief[1]
#         member['salary'] = brief[2]
#         member['marriage'] = brief[3]
#         member['education'] = brief[4]
#         member['workcity'] = brief[5]
#         member['job'] = brief[6]
#         member['horoscope'] = brief[7]
#         member['birth_city'] = brief[8]
#         detail_info = soup.select_one('.mod-person-area')
#         member['inner_info'] = detail_info.select_one('.info-inner').p.text
#         member['describe_info'] = detail_info.select_one('.info-describe').p.text
#         detail_span_list = detail_info.select_one('.floor-table').select('span')
#         member['sex'] = detail_span_list[1].text
#         member['animal'] = detail_span_list[3].text
#         member['weight'] = detail_span_list[9].text
#         member['blood'] = detail_span_list[11].text
#         member['body_style'] = detail_span_list[13].text
#         member['nationality'] = detail_span_list[17].text
#         member['company'] = detail_span_list[19].text
#         member['belief'] = detail_span_list[21].text
#         life_span_list = detail_info.select_one('.floor-life').select('span')
#         member_hobby['house'] = life_span_list[1].text
#         member_hobby['want_marriage'] = life_span_list[3].text
#         member_hobby['with_parents'] = life_span_list[7].text
#         member_hobby['smoke'] = life_span_list[9].text
#         member_hobby['with_object_parents'] = life_span_list[11].text
#         member_hobby['drink'] = life_span_list[13].text
#         member_hobby['luxury'] = life_span_list[15].text
#         member_hobby['cook'] = life_span_list[17].text
#         member_hobby['dating'] = life_span_list[19].text
#         member_hobby['housework'] = life_span_list[21].text
#         hobby_span_list = detail_info.select_one('.floor-hobby').select('span')
#         member_hobby['activity'] = hobby_span_list[1].text
#         member_hobby['food'] = hobby_span_list[3].text
#         member_hobby['sports'] = hobby_span_list[5].text
#         member_hobby['place'] = hobby_span_list[7].text
#         member_hobby['music'] = hobby_span_list[9].text
#         member_hobby['pet'] = hobby_span_list[11].text
#         member_hobby['movie'] = hobby_span_list[13].text
#         object_span_list = detail_info.select_one('.floor-term').select('span')
#         member_object['object_sex'] = object_span_list[1]
#         member_object['object_body_style'] = object_span_list[3]
#         member_object['object_age'] = object_span_list[5]
#         member_object['object_job'] = object_span_list[7]
#         member_object['object_height'] = object_span_list[9]
#         member_object['object_smoke'] = object_span_list[11]
#         member_object['object_education'] = object_span_list[13]
#         member_object['object_drink'] = object_span_list[15]
#         member_object['object_salary'] = object_span_list[17]
#         member_object['object_children'] = object_span_list[19]
#         member_object['object_marriage'] = object_span_list[21]
#         member_object['object_want_child'] = object_span_list[23]
#         member_object['object_workcity'] = object_span_list[25]
#         member_object['object_hasphoto'] = object_span_list[27]
#
#
# if __name__ == '__main__':
#     memberinfo_spider(member_id=55)
