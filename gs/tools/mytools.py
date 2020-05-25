# -*-coding:utf8-*-
def pingping():
    from matplotlib import pyplot as plt
    from matplotlib import animation
    plt.figure()
    x = range(100)
    y = x
    plt.plot(x,y)
    point_ani,_ = plt.plot(x[0],y[0],'ro')
    def update_points(num):
        point_ani.set_data(x[num], y[num])
        return point_ani,
    ani  = animation.FuncAnimation(fig,update_points,np.arange(0,100),interval=100,blit=True)
    plt.show()


    pass
def print_word(word):
    pass
if __name__ == '__main__':
    pingping()
    import numpy as np
    from PIL import Image,ImageDraw,ImageFont
    word = 'i love you'
    im = Image.fromarray(np.zeros([100,100],dtype=int),mode='1')
    font = ImageFont.truetype(font='msyh.ttf')
    draw = ImageDraw.Draw(im)
    draw.text([0,0],word,fill=255)
    im.show()