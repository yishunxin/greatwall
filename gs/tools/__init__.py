
a=[1,2,3,3,2,1,4,3,2,1,6,7,1,2,4]
b=[4,3,2,1]
# print sorted(a,key=lambda x:b.index(x))
print sorted(a,cmp=lambda x,y:x>y)



[].reverse()