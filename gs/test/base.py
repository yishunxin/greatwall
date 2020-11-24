class A:
	def __init__(self):
		self.a = 1
	def diaoc(self):
		pass

class B(A):
	def __init__(self):
		A.__init__(self)
		self.master = A

	def do(self):

		pass


class C(A):
	def __init__(self):
		A.__init__(self)
		self.master = A


while raw_input() != 'q':

	print 1
