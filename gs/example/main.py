import httpmgr
import parsemgr
import dbmgr
import threading
import time
import Queue

import logutils

spider = httpmgr.httpmgr()
uid_queue = Queue.Queue()
db = dbmgr.dbmgr(r'E:\jiayuan.db')

mainlog = logutils.logger('main').get_logger()

class search_thread(threading.Thread):
    def __init__(self, start_page = 1):
        threading.Thread.__init__(self)
        self.name = 'Search'
        self.start_page = start_page
        
    def run(self):
        mainlog.info('search start at %d' % self.start_page)
        page = self.start_page
        while True:
            if not spider.is_login():
                mainlog.info('login status false, will sleep 20s')
                time.sleep(5)
                spider.login()
            else:
                #if uid_queue.qsize() > 30:
                #    break
                #    time.sleep(100)
                id_list = []
                result = spider.search(page, id_list)
                if not result or len(id_list) == 0:
                    time.sleep(10)
                    continue
                #for uid in id_list:
                #    uid_queue.put(uid)
                #print id_list
                mainlog.debug('current page: %d, total page: %d' % (page, spider.max_page))
                mainlog.debug('id list: %s' % str(id_list))
                db.insert_status(id_list)
                page = page + 1
                time.sleep(5)

class user_thread(threading.Thread):
    def __init__(self, name):
        threading.Thread.__init__(self)
        self.name = name

    def run(self):
        while True:
            if not spider.is_login():
                mainlog.info('login status false, will sleep 20s')
                time.sleep(20)
                #spider.login()
            else:
                if uid_queue.qsize() < 50:
                    id_list = []
                    db.select_undownload(100, id_list)
                    for uid in id_list:
                        uid_queue.put(uid)
                uid = uid_queue.get()
                mainlog.debug('uid: %s' % str(uid))
                page = spider.get_user_page(uid)
                if page is None:
                    mainlog.info('download page failed, will sleep 10s')
                    time.sleep(10)
                    db.delete_status(uid)
                    continue
                #with open(r'no_login\%s.html' % str(uid), 'w') as f:
                #    f.write(page.encode('UTF-8'))
                    
                parse = parsemgr.parsemgr(page)
                parse.get_all_info()
                db.do_insert(parse)
                db.change_status(uid, True)
                time.sleep(2)

class thread_pool:
    def __init__(self, num):
        self.pool = []
        for i in range(num):
            t = user_thread('user %d' % (i+1))
            self.pool.append(t)
        s = search_thread(1)
        self.pool.append(s)

    def start(self):
        for t in self.pool:
            t.start()

    def join(self):
        for t in self.pool:
            t.join

if __name__ == '__main__':
    pool = thread_pool(3)
    pool.start()
    pool.join()

    
    
