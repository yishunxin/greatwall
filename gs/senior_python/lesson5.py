# -*-coding:utf8-*-
import ctypes


def fibonacci(n):
	ll = ctypes.cdll.LoadLibrary
	lib_fibonacci = ll("./fibonacci.so")
	print("fibonacci n-rd value:%d" % lib_fibonacci.value_n(n))


if __name__ == '__main__':
	fibonacci(6)
