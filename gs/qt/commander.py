# -*-coding:utf-8-*-
import Tkinter as tk
import json
import os


def enter():
	cur_index = 0
	log_cache = []
	with open('commander.json', 'r') as f:
		cmd_info = json.load(f)
	window = tk.Tk()
	window.geometry('800x500')
	window.title(u'指令集')
	lb = tk.Listbox(window, height=21, width=41, font=u'Consolas 10')
	lb.place(x=30, y=30, anchor='nw')
	for item in cmd_info:
		lb.insert(tk.END, item[0])

	entry1 = tk.Entry(window)
	entry1.place(x=30, y=380, anchor='nw', width=200, height=30)
	see_end = tk.IntVar(value=0)

	def insert():
		cmd = entry1.get()
		cmd_info.append([cmd])
		lb.insert(tk.END, cmd)

	def delete():
		index = lb.curselection()[0]
		lb.delete(index)
		cmd_info.pop(index)
		if index > 0:
			lb.select_set(index - 1)
		else:
			lb.select_set(0)

	btn_add = tk.Button(window, text=u'添加', command=insert)
	btn_del = tk.Button(window, text=u'删除', command=delete)
	btn_add.place(x=236, y=380, anchor='nw')
	btn_del.place(x=286, y=380, anchor='nw')

	comp_text = tk.Text(window, bg='#F7F7F7', relief='ridge', state=tk.DISABLED,
						font=u'Consolas 11')
	comp_text.place(width=380, height=430, x=380, y=30)
	text_scroll = tk.Scrollbar(comp_text)
	text_scroll.pack(side=tk.RIGHT, fill=tk.Y)
	text_scroll.config(command=comp_text.yview)
	comp_text.config(yscrollcommand=text_scroll.set)

	def clear_output():
		comp_text['state'] = tk.NORMAL
		comp_text.delete('1.0', tk.END)
		comp_text['state'] = tk.DISABLED

	btn_clear = tk.Button(window, text=u'清空', command=clear_output)
	btn_clear.place(x=725, y=0, anchor='nw')

	def run_cmd(e):
		index = e.widget.curselection()[0]
		comp_text['state'] = tk.NORMAL
		comp_text.insert(tk.END, '>>>' + cmd_info[index][0] + '\n')
		log_cache.append('>>>' + cmd_info[index][0] + '\n')
		if see_end.get():
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED
		cmd_output = os.popen(cmd_info[index][0].encode('utf8'))
		comp_text['state'] = tk.NORMAL
		output = cmd_output.read()
		comp_text.insert(tk.END, output + '\n')
		log_cache.append(output + '\n')
		if see_end.get():
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED

	def func1(e):
		print e
		pass

	lb.bind('<Double-Button-1>', run_cmd)
	# lb.bind('<Enter>', func1)
	# lb_xscrollbar = tk.Scrollbar(lb,command=lb.xview,orient=tk.HORIZONTAL)
	# lb_xscrollbar.pack(side=tk.BOTTOM,fill=tk.X,anchor=tk.S)
	# lb.config(xscrollcommand=lb_xscrollbar.set)

	cbtn_refresh = tk.Checkbutton(window, text=u'自动刷新', variable=see_end, onvalue=1, offvalue=0)
	cbtn_refresh.place(x=600, y=0)
	window.mainloop()
	with open('commander.json', 'w') as f:
		json.dump(cmd_info, f)
	with open('commander.log', 'a') as f:
		f.writelines(log_cache)
	pass



class MainWindow(tk.Tk):
	def __init__(self, screenName=None, baseName=None, className='Tk',
				 useTk=1, sync=0, use=None):
		tk.Tk.__init__(self, screenName=screenName, baseName=baseName, className=className,
					   useTk=useTk, sync=sync, use=use)
		self.do_init()

	def do_init(self):
		self.geometry('800x500')
		# 两栏，满填充

		self.rowconfigure(0, weight=1)
		self.grid_columnconfigure(0, weight=1)
		self.grid_columnconfigure(1, weight=1)
		left_frame = LeftFrame(master=self)
		right_frame = RightFrame(master=self)

		mv = self


class Frame(tk.Frame):
	def __init__(self, master=None):
		self.master = master
		tk.Frame.__init__(self, master)
		self.do_init()
		self.create_widget()

	def do_init(self):
		pass

	def create_widget(self):
		pass


class LeftFrame(Frame):
	def do_init(self):
		# 满填充
		self.grid(sticky=tk.N + tk.S + tk.E + tk.W)
		self.config(bg='red')
		self.grid(row=0, column=0)

		# 设置自身的网格布局
		self.grid_columnconfigure(0, weight=1)
		self.rowconfigure(1, weight=20)
		self.rowconfigure(0, weight=0)
		self.rowconfigure(2, weight=1)

		self.cmd_info = []

	def create_widget(self):
		self.btn_add = tk.Button(self, text=u'添加', command=self.insert)
		# todo 按钮会占用地方
		self.btn_add.grid(row=0, column=0, sticky='e')

		self.lb = tk.Listbox(self, font=u'Consolas 10', width=1)
		self.lb.grid(row=1, column=0, sticky='wens')
		with open('commander.json', 'r') as f:
			self.cmd_info = json.load(f)
		for item in self.cmd_info:
			self.lb.insert(tk.END, item[0])

		self.label_desc = tk.Label(self, width=1)
		self.label_desc.grid(row=2, column=0, sticky='wens')

	def insert(self):
		cmd = self.entry1.get()
		self.cmd_info.append([cmd])
		self.lb.insert(tk.END, cmd)

	def delete(self):
		index = self.lb.curselection()[0]
		self.lb.delete(index)
		self.cmd_info.pop(index)
		if index > 0:
			self.lb.select_set(index - 1)
		else:
			self.lb.select_set(0)

	def run_cmd(self, e):
		index = e.widget.curselection()[0]
		comp_text['state'] = tk.NORMAL
		comp_text.insert(tk.END, '>>>' + self.cmd_info[index][0] + '\n')
		log_cache.append('>>>' + self.cmd_info[index][0] + '\n')
		if see_end.get():
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED
		cmd_output = os.popen(cmd_info[index][0].encode('utf8'))
		comp_text['state'] = tk.NORMAL
		output = cmd_output.read()
		comp_text.insert(tk.END, output + '\n')
		log_cache.append(output + '\n')
		if see_end.get():
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED

class RightFrame(Frame):
	def do_init(self):
		self.config(bg='blue')
		# 满填充
		self.grid(sticky=tk.N + tk.S + tk.E + tk.W)
		self.grid(row=0, column=1)

		# 设置自身的网格布局
		self.grid_columnconfigure(0, weight=50)

	def create_widget(self):
		self.comp_text = tk.Text(self, bg='#F7F7F7', relief='ridge', state=tk.DISABLED,
								 font=u'Consolas 11', width=1)
		self.comp_text.grid(row=0, column=0, sticky='nesw')


if __name__ == '__main__':
	mw = MainWindow()

	mw.mainloop()
