a = 1
def myfunc():
    global a
    a = 2
    print a
myfunc()
print a