# -*-coding:utf8-*-
import os
import subprocess
import sys
import threading
import time

import queue

import io
def t1():
	cmd = 'D: && chdir D:\work\g58\programer/release/20200914\client && start x64Client\client.exe && exit'
	cmd = 'ping www.baidu.com'
	with open('ttt.txt','w+') as f:
		p = subprocess.Popen(cmd,  stdout=f,
							 shell=True)
		while subprocess.Popen.poll(p) != 0:
			print f.tell()
		print 1

def t2():
	cmd = 'D: && chdir D:\work\g58\programer/release/20200914\client && start x64Client\client.exe && exit'
	p = subprocess.Popen(cmd, stdout=subprocess.PIPE,shell=True)
	a= p.stdout
	print p.poll()

if __name__ == '__main__':
    t2()