import os
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog, messagebox
import sys

filenames = []


def select_files():
    global filenames
    files = filedialog.askopenfiles()
    filenames = [item.name for item in files]
    print(filenames)
    if filenames:
        file_lb.config(text='\n'.join(filenames))


def run():
    if comboxlist.get() == '分离音频':
        result = []
        for video in filenames:
            filename = os.path.join(os.path.dirname(video), '.'.join(
                os.path.basename(video).split('.')[:-1]) + '.mp3')
            os.system('chdir')
            cmd = 'cd tools & ffmpeg.exe -i "{}" -y -vn "{}"'.format(video, filename)
            print(os.system(cmd))
            result.append(filename)
        messagebox.showinfo('提示', '转换成功', )
        os.system('C:\Windows\explorer.exe /select,{}'.format(os.path.realpath(result[0])))
    pass


window = tk.Tk()
window.title('脚本执行器')
window.geometry('500x300')

file_btn = tk.Button(window, text='选择文件', command=select_files)
file_btn.pack()
file_lb = tk.Label(window, text='')
file_lb.pack()
comboxlist = ttk.Combobox(window)
comboxlist['values'] = ['分离音频']
comboxlist.current(0)
# comboxlist.bind("<<ComboboxSelected>>", go)
comboxlist.pack()
run_btn = tk.Button(window, text='执行', command=run)
run_btn.pack()
window.mainloop()
