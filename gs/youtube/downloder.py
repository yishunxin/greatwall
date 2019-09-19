# -*- coding:utf-8 -*-
import urllib

from pytube import YouTube,Playlist
from pprint import pprint

from requests import request

proxy_addr = 'http://127.0.0.1:1080'
proxy = urllib.request.ProxyHandler({'https':proxy_addr})
opener = urllib.request.build_opener(proxy,urllib.request.ProxyHandler)
urllib.request.install_opener(opener)

pl = Playlist("https://www.youtube.com/watch?v=DMfzJsjZ9Ow&list=RDDMfzJsjZ9Ow")
pl.download_all()