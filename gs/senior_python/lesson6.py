"""
pysnooper的调用就是通过装饰器的方式，eg：
"""
import pysnooper


@pysnooper.snoop()
def fibonacci(n):
	t1, t2, t3 = 0, 1, 0
	if n <= 0:
		print(t1)
		return t1
	elif n == 1:
		print(t2)
		return t2
	else:
		for i in range(2, n + 1):
			t3 = t1 + t2
			t1, t2 = t2, t3
		print(t3)
		return t3


fibonacci(3)


def deco(param):
	print(param)
	def warp(func):
		print('func is ', func.__name__)
		def warp2(*args, **kwargs):
			print(args, kwargs)
			return func(*args, **kwargs)
		return warp2
	return warp

# @deco(param=1)
# def text(a, b, c=3, d=4):
# 	return a, b, c, d

