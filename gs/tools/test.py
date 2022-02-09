# -*-coding:utf8-*-
import logging


def test():
	try:
		int('')
		1/0

	except Exception as e:

		print ('ZeroDivisionError')
	print(333)


try:
	test()
except Exception as e:
	logging.exception(e)
