from abc import abstractmethod, ABCMeta


class A(metaclass=ABCMeta):
    def __init__(self, name):
        self.name = name
        pass

    def a(self):
        print(self.name)

    @abstractmethod
    def c(self, info):
        print(info)


class B(A):
    def c(self, info):
        super().c(info)
        print(999)

    pass


b = B('sdf')
b.a()
b.c('123')
