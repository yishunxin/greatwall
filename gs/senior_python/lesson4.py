# -*-coding:utf8-*-
class Meta(type):
	def __new__(cls, name, bases, attrs):
		for base in bases:
			for k, v in base.__dict__.iteritems():
				if k in attrs and type(v) == type(attrs[k]):
					old_v = attrs[k]
					if isinstance(v, list):
						for item in v:
							if item not in old_v:
								old_v.append(item)
					elif isinstance(v, dict):
						for item in v:
							if item not in old_v:
								old_v[item] = v[item]
					elif isinstance(v, tuple):
						new_v = list(old_v)
						for item in v:
							if item not in new_v:
								new_v.append(item)
						attrs[k] = tuple(new_v)
					elif isinstance(v, set):
						attrs[k] = old_v.union(v)
		cls = type.__new__(cls, name, bases, attrs)
		return cls

	pass


class A(object):
	__metaclass__ = Meta
	PARAMS = ("a1", "a2")


class B(A):
	PARAMS = ("b1",)


if __name__ == '__main__':
	b = B()
	print (b.PARAMS)
