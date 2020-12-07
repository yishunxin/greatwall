# -*-coding:utf8-*-
import threading
import time

import queue

def a():
    print 1
    time.sleep(5)
    print 2

p = threading.Thread(target=a)
p.start()
p.