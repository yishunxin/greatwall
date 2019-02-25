# -*- coding:utf-8 -*-
import itertools

if __name__ == '__main__':
    v = 'one two three four five six'
    for i in itertools.islice(v.split(),4,None):
        print i
