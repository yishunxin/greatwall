# -*-coding:utf-8-*-
import Tkinter as tk
import json


def enter():
	with open('commander.json', 'r') as f:
		cmd_info = json.load(f)
	window = tk.Tk()
	window.title(u'指令集')
	str_val = tk.StringVar()
	# cmds = (item[0] for item in cmd_info)
	lb = tk.Listbox(window, listvariable = str_val)
	lb.pack()

	entry1 = tk.Entry(window)
	entry1.pack()

	window.mainloop()
	pass


if __name__ == '__main__':
	with open('commander.json','w') as f:
		json.dump([['ls'],['ls']],f)
	enter()
