# -*-coding:utf8-*-
import queue

q = queue.Queue()
q.put('1')
q.put('2')
while True:
    print 'start'
    a = q.get(block=True)
    q.put
    print a
    t= raw_input()
    if t=='q':
        q.put('2')