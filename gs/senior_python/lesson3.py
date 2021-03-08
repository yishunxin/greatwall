# -*-coding:utf8-*-
def check_param_types(*type_args):
	def warpper(func):
		def deco(*args):
			tmp_types = set([type(i) for i in args])
			if tmp_types - set(type_args):
				raise TypeError('参数必须为 {}'.format(type_args))
			else:
				return func(*args)

		return deco

	return warpper


@check_param_types(str, int)
def add(a, b):
	return a + str(b)

class Solution:
	def __init__(self,lenth):
		self.res = []
		self.lenth = lenth
	def consumer(self):
		while True:
			if self.res:
				yield self.res.pop(0)
			else:
				yield u'空了'
	def productor(self):
		while True:
			a = yield
			print u'生产 ' + str(a)
			if len(self.res)<self.lenth:
				self.res.append(a)
			else:
				print u'满了'





if __name__ == '__main__':
	# 练习1 生产者-消费者模型
	# 感觉自己没太明白题目要求，就这么写了
	a = Solution(5)
	c = a.consumer()
	p = a.productor()
	p.next()

	p.send(1)
	p.send(2)
	print u'消费',c.next()
	print u'消费',c.next()
	print u'消费',c.next()

	#练习2 装饰器
	print(add("answer is :", 2))
	print(add("answer is :", 2.0))


