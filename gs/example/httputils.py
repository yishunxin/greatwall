import StringIO
import gzip
import urllib
import ssl
import socket
import re
import logutils
from string import Template

T_HTTPS_DATA = Template('''POST $relative_path HTTP/1.1
Accept: text/html, application/xhtml+xml, */*
X-HttpWatch-RID: 44415-10046
Referer: http://login.jiayuan.com/err.php?err_type=2&pre_url=http://www.jiayuan.com/usercp
Accept-Language: zh-Hans-CN,zh-Hans;q=0.5
User-Agent: Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
Host: $host
Content-Length: $content_length
DNT: 1
Connection: Keep-Alive
Cache-Control: no-cache

$post_content''')
MAX_LENGTH = 8192
httputilslogger = logutils.logger('httputils').get_logger()

def gz_decode(data):
    try:
        compressedstream = StringIO.StringIO(data)  
        gziper = gzip.GzipFile(fileobj=compressedstream)    
        data = gziper.read() 
        return data
    except Exception,e:
        httputilslogger.error('gz decode failed %s' % str(e))
        return None

def encode_post_data(post_data):
    for key,val in post_data.iteritems():
        if val == '0':
            post_data[key] = ''
    return urllib.urlencode(post_data)

def split_header(data):
    start_pos = data.find('\r\n\r\n')
    if start_pos < 0 or start_pos >= len(data):
        return (None, None)
    else:
        return (data[:start_pos], data[start_pos + 4:])

def chunk_decode(message):
    chunk_segment = message.split('\r\n')
    try:
        i = 0;
        result = ''
        while True:
            length = int(chunk_segment[i], 16)
            if length == 0:
                if len(chunk_segment[i+1]) == 0 and len(chunk_segment[i+2]) == 0:
                    httputilslogger.info('decode chunk success')
                    return result
                else:
                    httputilslogger.info('decode chunk failed')
                    return None
            else:
                if len(chunk_segment[i+1]) == length:
                    result = result + chunk_segment[i+1]
                else:
                    httputilslogger.info('decode chunk failed')
                    return None
            i = i + 2
    except Exception,e:
        httputilslogger.error('chunk_decode failed %s' % str(e))
        return None

def get_host(url):
    pattern = re.compile(r'http[s]{0,1}://(\S+?)/')
    s = pattern.match(url)
    if s is None:
        return ''
    else:
        return s.group(1)

def http_decode(data):
    if data is None:
        httputilslogger.info('http_decode data is None')
        return None
    header, message = split_header(data)
    if header is None or message is None:
        httputilslogger.info('data is ilegal')
        return None
    if data.count('Transfer-Encoding: chunked'):
        message = chunk_decode(message)
    if message is None:
        httputilslogger.info('message is None')
        return None
    if data.count('Content-Encoding: gzip'):
        message = gz_decode(message)
    httputilslogger.info('http decode success')
    return (header, message)

def https_post(passport_url, login_data):
    httputilslogger.debug('url: %s' % passport_url)
    httputilslogger.debug('login_data: %s' % str(login_data))
    host = get_host(passport_url)
    if len(host) == 0:
        return None
    relative_path = passport_url[passport_url.find(host) + len(host):]

    post_content = encode_post_data(login_data)
    https_data = T_HTTPS_DATA.substitute({'host':host,'post_content':post_content, 'content_length':len(post_content), 'relative_path':relative_path})
    try:
        sock = ssl.wrap_socket(socket.socket()) 
        sock.connect((host,443))
        sock.sendall(https_data)
        recv_data = sock.recv(MAX_LENGTH)
        sock.close()
        httputilslogger.info('http post success')
        return http_decode(recv_data)
    except Exception,e:
        httputilslogger.error('https post failed %s' % str(e))
        return None

if __name__ == '__main__':
    passport_url = r'https://passport.jiayuan.com/dologin.php?pre_url=http://www.jiayuan.com/usercp'
    login_data = {u'remem_pass': u'on',
                  u'name':u'18801902527',
                  u'_s_x_id': u'f70226410b7a5fae41f675197177ef68',
                  u'm_p_l': u'1', u'ljg_login': u'1',
                  u'position': u'0',
                  u'password': u'ijsi&NBI1207',
                  u'channel': u'0'}
    header,message = https_post(passport_url,login_data)
    print header
    print message
