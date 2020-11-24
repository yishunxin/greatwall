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
		self.minsize(800, 500)
		# 两栏，满填充

		self.rowconfigure(0, weight=1)
		self.grid_columnconfigure(0, weight=1, minsize=400)
		self.grid_columnconfigure(1, weight=1, minsize=400)
		self.right_frame = RightFrame(master=self)
		self.left_frame = LeftFrame(master=self)

	def destroy(self):
		print 'quit'
		with open('commander.json', 'w') as f:
			json.dump(self.left_frame.cmd_info, f)
		with open('commander.log', 'a') as f:
			f.writelines(self.left_frame.log_cache)
		tk.Tk.destroy(self)


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
		self.log_cache = []

	def create_widget(self):
		self.btn_add = tk.Button(self, text=u'添加', command=self.insert)
		# todo 按钮会占用地方，想办法怎么解决
		self.btn_add.grid(row=0, column=0, sticky='e')

		self.lb = tk.Listbox(self, font=u'Consolas 10', width=1)
		self.lb.grid(row=1, column=0, sticky='wens')
		self.lb.bind('<Double-Button-1>', self.run_cmd)
		self.lb.bind('<Button-1>', self.update_desc)
		with open('commander.json', 'r') as f:
			self.cmd_info = json.load(f)
		for item in self.cmd_info:
			self.lb.insert(tk.END, item['name'])

		self.label_desc = tk.Label(self, width=1)
		self.label_desc.grid(row=2, column=0, sticky='wens')

	def update_desc(self,e):
		print 'self.lb.curselection()',self.lb.curselection()
		index = self.lb.curselection()[0]
		self.label_desc.config(text=self.cmd_info[index]['value'])
	def insert(self):
		FloatWindow(callback=self.finish_insert)

	def finish_insert(self,form_data):
		self.cmd_info.append(form_data)
		self.lb.insert(tk.END,form_data['name'])

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
		print 'run_cmd',index
		return
		comp_text = self.master.right_frame.comp_text
		see_end = self.master.right_frame.see_end
		comp_text['state'] = tk.NORMAL
		comp_text.insert(tk.END, '>>>' + self.cmd_info[index]['value'] + '\n')
		self.log_cache.append('>>>' + self.cmd_info[index]['value'] + '\n')
		if see_end.get():
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED
		cmd_output = os.popen(self.cmd_info[index]['value'].encode('utf8'))
		comp_text['state'] = tk.NORMAL
		output = cmd_output.read()
		comp_text.insert(tk.END, output + '\n')
		self.log_cache.append(output + '\n')
		if see_end.get():
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED


class RightFrame(Frame):
	def do_init(self):
		self.config(bg='blue')
		# 满填充
		self.grid(sticky=tk.N + tk.S + tk.E + tk.W)
		self.grid(row=0, column=1)
		self.see_end = tk.IntVar(value=0)
		# 设置自身的网格布局
		self.grid_rowconfigure(0, weight=0)
		self.grid_rowconfigure(1, weight=50)
		self.grid_columnconfigure(0, weight=50)
		self.grid_columnconfigure(1, weight=1)
		self.create_widget()

	def create_widget(self):
		btn_clear = tk.Button(self, text=u'清空', command=self.clear_output)
		btn_clear.grid(row=0, column=1, sticky='e')
		self.comp_text = tk.Text(self, bg='#F7F7F7', relief='ridge', state=tk.DISABLED,
								 font=u'Consolas 11', width=1)
		self.comp_text.grid(row=1, column=0, sticky='nesw', columnspan=2)
		text_scroll = tk.Scrollbar(self.comp_text)
		text_scroll.pack(side=tk.RIGHT, fill=tk.Y)
		text_scroll.config(command=self.comp_text.yview)
		self.comp_text.config(yscrollcommand=text_scroll.set)

		cbtn_refresh = tk.Checkbutton(self, text=u'自动刷新', variable=self.see_end, onvalue=1, offvalue=0)
		cbtn_refresh.grid(row=0, column=0, sticky='e')

	def clear_output(self):
		self.comp_text['state'] = tk.NORMAL
		self.comp_text.delete('1.0', tk.END)
		self.comp_text['state'] = tk.DISABLED


class FloatWindow(tk.Tk):
	def __init__(self, screenName=None, baseName=None, className='Tk',
				 useTk=1, sync=0, use=None, master=None, callback=None):
		tk.Tk.__init__(self, screenName=screenName, baseName=baseName, className=className,
					   useTk=useTk, sync=sync, use=use)
		self.callback = callback
		self.form = {}
		self.do_init()

	def do_init(self):
		self.create_widget()
		pass

	def create_widget(self):
		label_1 = tk.Label(self, text=u'脚本名称')
		label_1.grid(row=0, column=0)
		self.input_1 = tk.Entry(self)
		self.input_1.grid(row=0, column=1)
		label_2 = tk.Label(self, text=u'脚本内容')
		label_2.grid(row=1, column=0)
		self.input_2 = tk.Entry(self)
		self.input_2.grid(row=1, column=1)
		btn_queding = tk.Button(self, text=u'确定',command=self.queding)
		btn_queding.grid(row=2, column=0, columnspan=2)

	def queding(self):
		self.form['name'] = self.input_1.get()
		self.form['value'] = self.input_2.get()
		self.callback(self.form)
		self.destroy()
		pass


if __name__ == '__main__':
	mw = MainWindow()

	mw.mainloop()
