# coding=utf8

def update():
    def new_fun(self, m, n):
        import math
        global math # 正常情况下我觉得这个写不好，应该更新A的pow函数，函数里面加上import math
        self.pow(m, n)
    demo.A.__dict__['fun'].__code__ = new_fun.__code__
    return

if __name__ == "__main__":
    import demo
    a = demo.A()
    update()
    a.fun(2, 3)
