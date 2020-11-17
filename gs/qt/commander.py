# -*-coding:utf-8-*-
import Tkinter as tk
import json
import os


def enter():
	with open('commander.json', 'r') as f:
		cmd_info = json.load(f)
	window = tk.Tk()
	window.geometry('800x500')
	window.title(u'指令集')
	lb = tk.Listbox(window,height=12,width=24,font=u'微软雅黑 15')
	lb.place(x=30, y=30, anchor='nw')
	for item in cmd_info:
		lb.insert(tk.END, item[0])

	entry1 = tk.Entry(window)
	entry1.place(x=30, y=370, anchor='nw')

	def insert():
		cmd = entry1.get()
		cmd_info.append([cmd])
		lb.insert(tk.END, cmd)

	def delete():
		index = lb.curselection()[0]
		lb.delete(index)
		cmd_info.pop(index)

	btn_add = tk.Button(window, text=u'插入', command=insert)
	btn_del = tk.Button(window, text=u'删除', command=delete)
	btn_add.place(x=236, y=370, anchor='nw')
	btn_del.place(x=286, y=370, anchor='nw')

	cmd_output = ''

	def run_cmd(cmd):
		global cmd_output
		cmd_output = os.popen(cmd)

	lb.bind('<Double-Button-1>', run_cmd)
	window.mainloop()
	with open('commander.json', 'w') as f:
		json.dump(cmd_info, f)
	pass


if __name__ == '__main__':
	enter()
