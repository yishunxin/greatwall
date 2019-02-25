import urllib2
import urllib
import cookielib
import StringIO
import gzip

def gz_decode(data):
    compressedstream = StringIO.StringIO(data)  
    gziper = gzip.GzipFile(fileobj=compressedstream)    
    data = gziper.read() 
    return data

#login_email:18801902527
#login_password: ijsi&NBI1207

def login():
    data={'login_email':'18801902527','login_password':'ijsi&NBI1207'} 
    post_data=urllib.urlencode(data)
    print post_data
    cj=cookielib.CookieJar()  
    opener=urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
    headers = {'Host':'passport.jiayuan.com',\
                'User-Agent':'Mozilla/5.0 (Windows NT 6.3; rv:35.0) Gecko/20100101 Firefox/35.0',\
                'Accept':'*/*',\
                'Accept-Language':'zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3',\
                'Accept-Encoding':'gzip, deflate'}
    website = 'https://passport.jiayuan.com/dologin.php?pre_url=http://www.jiayuan.com/usercp'
    req=urllib2.Request(website,post_data,headers)
    response=opener.open(req)
    print response.geturl()
    print response.info()
    content = response.read()
    print gz_decode(content)
    
if __name__ == '__main__':
    login()
