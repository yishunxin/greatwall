#-*- encoding:UTF-8 -*-
import requests
import urllib
import json
import re
import time
import threading

import logutils
from httputils import *

extend_header_homepage = {'Host':'www.jiayuan.com'}
thread_lock = threading.RLock()
httplogger = logutils.logger('http').get_logger()

class httpmgr:
    def __init__(self):
        self.session = requests.Session()
        self.basic_header = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; rv:35.0) Gecko/20100101 Firefox/35.0',
           'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
           'Accept-Language':'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
           'Accept-Encoding':'gzip, deflate',
           'Connection':'keep-alive'}
        self.login_url = 'http://login.jiayuan.com/'
        self.search_url = 'http://search.jiayuan.com/v2/search_v2.php'
        self.max_page = 0
        self.__is_login = False

    def __get_login_data(self, login_page):
        #填写自己的用户名和密码
        login_data = {u'name':u'***********',
                      u'password':u'*********',
                      u'remem_pass':u'on'}
        pattern = re.compile(r'<input type="hidden" name="(\w+)" value="(\w+)"\s*/>', re.U)
        login_info = pattern.findall(login_page)
        for item in login_info:
            key, val = item
            login_data[key] = val
        return login_data

    def __get_passpart_url(self, login_page):
        pattern = re.compile(r'action="(\S+?)"', re.U)
        s = pattern.findall(login_page)
        if len(s) > 0:
            return s[0]
        else:
            return None

    def __get_redirect_url(self, page):
        pattern = re.compile(r"top\.location\.href='(\S+?)';")
        s = pattern.findall(page)
        if len(s) > 0:
            return s[0]
        else:
            return None

    def __set_session_cookies(self, response_header):
        header_list = response_header.split('\r\n')
        for line in header_list:
            if line.count('Set-Cookie:'):
                content = line[11:]
                items = content.split(';')
                cookie_name = ''
                cookie_value = ''
                cookie_expires = 0
                cookie_domin = 'passport.jiayuan.com'
                cookie_path = ''

                if len(items) < 1:
                    continue
                for item in items:
                    tmp = item.split('=')
                    if len(tmp) != 2:
                        break
                    if tmp[0].strip() == 'expires':
                        cookie_expires = int(time.mktime(time.strptime(tmp[1].strip(), '%a, %d-%b-%Y %H:%M:%S %Z')))
                    elif tmp[0].strip() == 'path':
                        cookie_path = tmp[1].strip()
                    elif tmp[0].strip() == 'domain':
                        if tmp[1].strip() == 'jiayuan.com':
                            cookie_domin = '.jiayuan.com'
                    else:
                        cookie_value = urllib.unquote(tmp[1].strip())
                        cookie_name = tmp[0].strip()
                if len(cookie_name) == 0:
                    continue
                #if cookie_name == '
                #print cookie_name,cookie_value,cookie_expires,cookie_domin,cookie_path
             
                if cookie_expires != 0:
                    self.session.cookies.set(cookie_name, cookie_value, domain = cookie_domin, expires = cookie_expires, path = cookie_path)
                else:
                    self.session.cookies.set(cookie_name, cookie_value, domain = cookie_domin, path = cookie_path)
                                              

    def __add_header_host(self, header, url):
        host = get_host(url)
        if len(host) > 0:
            header['Host'] = host

    def set_login_status(self, status):
        thread_lock.acquire()
        self.__is_login = status
        thread_lock.release()

    def is_login(self):
        status = False
        thread_lock.acquire()
        status = self.__is_login
        thread_lock.release()
        return status
            
    def login(self):
        try:
            httplogger.info('login start')
            self.session.headers.clear()
            self.session.headers.update(self.basic_header)
            self.session.cookies.clear()
            
            extend_header_login = {'Cache-Control':'max-age=0'}
            self.__add_header_host(extend_header_login, self.login_url)
            s = self.session.get(self.login_url, headers = extend_header_login)
            if not s.ok:
                httplogger.error('get %s failed' % self.login_url)
                return False
            
            passport_url = self.__get_passpart_url(s.text)
            login_data = self.__get_login_data(s.text)
            if passport_url is None:
                httplogger.error('no passport url')
                return False

            header,message = https_post(passport_url, login_data)
            redirect_url = self.__get_redirect_url(message)

            global extend_header_homepage
            extend_header_homepage['Referer'] = redirect_url
            self.__set_session_cookies(header)

            self.session.cookies.set('user_access','1',domain = '.jiayuan.com')
            self.session.cookies.set('IZ_bind129323645','0',domain='.jiayuan.com')
            self.session.cookies.set('pclog','{"129323645":"1430482342732|1|0"}',domain='.jiayuan.com')

            httplogger.info(redirect_url)
            host = get_host(redirect_url)
            extend_header_redict = {'Referer':redirect_url}
            if len(host) > 0:
                extend_header_redict['Host'] = host
            time.sleep(4)
            s = self.session.get(redirect_url, headers = extend_header_redict)
            if not s.ok:
                httplogger.error('get %s failed' % redirect_url)
                return False
            #print s.request.headers
            #print s.text
            

            #homepage_url = 'http://www.jiayuan.com/usercp?from=login'
            #extend_header_homepage = {'Referer':redirect_url}
            #extend_header_homepage['Host'] = 'www.jiayuan.com'
            #s = self.session.get(homepage_url, headers = extend_header_homepage)
            #print s.request.headers
            #with open('c.html','w') as f:
            #    f.write(s.text.encode('UTF-8'))
            #print s.history

            #<title>登录成功</title>
            if s.text.count(u'<title>\u767b\u5f55\u6210\u529f</title>'):
                self.session.headers.clear()
                self.set_login_status(True)
                httplogger.info('login sucess')
                return True
            httplogger.info('login failed')
            return False          
        except Exception,e:
            httplogger.error('login failed %s' % str(e))
            return False

    def search(self, page_number, id_list):
        httplogger.info('search %d start' % page_number)
        if page_number < 0:
            return False
        if self.max_page > 0 and page_number > self.max_page:
            return False
        search_header = {'Host':'search.jiayuan.com',
                         'User-Agent':'Mozilla/5.0 (Windows NT 6.3; rv:35.0) Gecko/20100101 Firefox/35.0',
                         'Accept':'*/*',
                         'Accept-Language':'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
                         'Accept-Encoding':'gzip, deflate',
                         'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                         'X-Requested-With':'XMLHttpRequest',
                         'Connection':'keep-alive',
                         'Pragma':'no-cache',
                         'Cache-Control':'no-cache',
                         'Referer':'http://search.jiayuan.com/v2/index.php?key=&sex=f&stc=2:20.30,23:1&sn=default&sv=1&p=1&pt=2008&ft=off&f=select&mt=d'}
        #self.session.headers.clear()
        #self.session.headers.update(search_header)
        post_data_map = {'f':'select',
                     'jsversion':'v5',
                     'key':'',
                     'listStyle':'bigPhoto',
                     'pri_uid':'0',
                     'sex':'f',
                     'sn':'default',
                     'stc':'',
                     'sv':'1'}
        post_data_map['p'] = str(page_number)
        try:           
            s = self.session.post(self.search_url, data = post_data_map, headers = search_header)
            if not s.ok:
                httplogger.info('post %s failed' % self.search_url)
                return False
            result = json.loads(s.text[11:-13])
            #with open('a.txt','w') as f:
            #    f.write(s.text.encode('UTF-8'))
            # if not result['isLogin']:
            #     self.set_login_status(False)
            #     httplogger.info('login status: false')
            #     return False
            self.max_page = result['pageTotal']
            for item in result['userInfo']:
                id_list.append(item['realUid'])
            #print id_list
            httplogger.info('search success, id:%s' % str(id_list))
            return id_list
        except Exception,e:
            httplogger.error('search failed %s' % str(e))
            return False

    def get_user_page(self, uid):
        httplogger.info('get user id:%d page start' % uid)
        user_url = 'http://www.jiayuan.com/%s?fxly=search_v2_index' % str(uid)

        user_header = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; rv:35.0) Gecko/20100101 Firefox/35.0',
                       'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                       'Accept-Language':'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',
                       'Accept-Encoding':'gzip, deflate',
                       'Connection':'keep-alive',
                       'Cache-Control':'max-age=0',
                       'Host':'www.jiayuan.com',
                       'Referer':'http://search.jiayuan.com/v2/'}
        try:
            s = self.session.get(user_url, headers = user_header)
            if not s.ok:
                httplogger.info('get %s failed' % user_url)
                return None
            if s.text.count(u'登录后可见'):
                httplogger.info('login status: false')
                self.set_login_status(False)
                return None
            httplogger.info('get_user_page id:%d success' % uid)
            return s.text
        except Exception,e:
            httplogger.error('get_user_page failed %s' % str(e))
            return None
 
if __name__ == '__main__':
    mgr = httpmgr()
    # mgr.login()

    for p in range(1000,1005):
        id_list = []
        id_list = mgr.search(p, id_list)
        print id_list
        #print id_list

    # test_uid = 137463425
    # page = mgr.get_user_page(test_uid)
    # with open('%s.html' % str(test_uid), 'w') as f:
    #     f.write(page.encode('UTF-8'))
    

    
