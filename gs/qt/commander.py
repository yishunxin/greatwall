# -*-coding:utf-8-*-
import Tkinter as tk
import json
import os
import tkFont


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
		# 设置minsize解决buttun占位问题
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


class Button(tk.Button):
	def __init__(self, master=None, cnf={}, **kw):
		if 'font' not in kw:
			font = tkFont.Font(size=10)
			kw['font'] = font
		tk.Button.__init__(self, master=master, cnf=cnf, **kw)


class Checkbutton(tk.Checkbutton):
	def __init__(self, master=None, cnf={}, **kw):
		if 'font' not in kw:
			font = tkFont.Font(size=10)
			kw['font'] = font
		tk.Checkbutton.__init__(self, master=master, cnf=cnf, **kw)


class LeftFrame(Frame):
	def do_init(self):
		# 满填充
		self.grid(sticky=tk.N + tk.S + tk.E + tk.W)
		self.grid(row=0, column=0)
		self.config(padx=10, pady=10)
		# 设置自身的网格布局
		self.grid_columnconfigure(0, weight=1)
		self.rowconfigure(0, weight=0)
		self.rowconfigure(1, weight=10)
		self.rowconfigure(2, weight=3)

		self.cmd_info = []
		self.log_cache = []

	def create_widget(self):
		self.btn_add = Button(self, text=u'添加', command=self.insert)
		self.btn_add.grid(row=0, column=0, sticky='e')

		self.lb = tk.Listbox(self, font=u'Consolas 10', width=1)
		self.lb.grid(row=1, column=0, sticky='wens')
		self.lb.bind('<Double-Button-1>', self.run_cmd)
		self.lb.bind('<Button-1>', self.update_desc)
		self.lb.bind('<KeyRelease-Delete>', self.delete_cmd)
		self.lb.bind('<KeyRelease-Return>', self.run_cmd)
		self.lb.bind('<KeyRelease-space>', self.insert)
		if not os.path.exists('commander.json'):
			with open('commander.json', 'w') as f:
				json.dump([], f)
		with open('commander.json', 'r') as f:
			self.cmd_info = json.load(f)
		for item in self.cmd_info:
			self.lb.insert(tk.END, item['name'])
		self.lb.selection_set(0)
		self.label_desc = tk.Label(self, font=u'Consolas 11', anchor='nw', width=1,
								   text=self.cmd_info[0].get('value') if self.cmd_info else None, justify=tk.LEFT)
		self.label_desc.grid(row=2, column=0, sticky='wens')
		self.label_desc.bind('<Configure>', self.update_label_desc_wraplength)

	def update_label_desc_wraplength(self, e):
		self.label_desc.config(wraplength=self.label_desc.winfo_width())

	def update_desc(self, e):
		select = self.lb.curselection()
		if not select:
			return
		index = select[0]
		self.label_desc.config(text=self.cmd_info[index]['value'])

	def insert(self, e=None):
		if e:
			select = self.lb.curselection()
			if not select:
				return
			index = select[0]
			form = self.cmd_info[index]
		else:
			form = {}
			index = None
		FloatWindow(callback=self.finish_insert, master=self.winfo_toplevel(), form=form, index=index)

	def finish_insert(self, form_data, **kwargs):
		if kwargs['index'] is not None:
			self.cmd_info[kwargs['index']] = form_data
			self.update_lb()
		else:
			self.cmd_info.append(form_data)
			self.lb.insert(tk.END, form_data['name'])

	def update_lb(self):
		self.lb.delete(0, tk.END)
		for item in self.cmd_info:
			self.lb.insert(tk.END, item['name'])

	def delete_cmd(self, e):
		select = self.lb.curselection()
		if not select:
			return
		index = select[0]
		self.lb.delete(index)
		self.cmd_info.pop(index)
		if index > 0:
			self.lb.select_set(index - 1)
		else:
			self.lb.select_set(0)

	def run_cmd(self, e):
		select = e.widget.curselection()
		if not select:
			return
		index = select[0]
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
		# 满填充
		self.config(padx=10, pady=10)
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
		btn_clear = Button(self, text=u'清空', command=self.clear_output)
		btn_clear.grid(row=0, column=1, sticky='e')
		self.comp_text = tk.Text(self, bg='#F7F7F7', relief='ridge', state=tk.DISABLED,
								 font=u'Consolas 11', width=1)
		self.comp_text.grid(row=1, column=0, sticky='nesw', columnspan=2)
		text_scroll = tk.Scrollbar(self.comp_text)
		text_scroll.pack(side=tk.RIGHT, fill=tk.Y)
		text_scroll.config(command=self.comp_text.yview)
		self.comp_text.config(yscrollcommand=text_scroll.set)

		cbtn_refresh = Checkbutton(self, text=u'自动刷新', variable=self.see_end, onvalue=1, offvalue=0)
		cbtn_refresh.grid(row=0, column=0, sticky='e')

	def clear_output(self):
		self.comp_text['state'] = tk.NORMAL
		self.comp_text.delete('1.0', tk.END)
		self.comp_text['state'] = tk.DISABLED


class FloatWindow(tk.Tk):
	def __init__(self, screenName=None, baseName=None, className='Tk',
				 useTk=1, sync=0, use=None, master=None, callback=None, form={}, **cbkwargs):
		tk.Tk.__init__(self, screenName=screenName, baseName=baseName, className=className,
					   useTk=useTk, sync=sync, use=use)
		self.geometry('300x100+{}+{}'.format(master.winfo_x() + 250, master.winfo_y() + 200))
		self.callback = callback
		self.form = form
		self.cbkwargs = cbkwargs
		self.do_init()

	def do_init(self):
		self.create_widget()
		self.columnconfigure(0, weight=1)
		self.columnconfigure(1, weight=5)
		self.configure(pady=10, padx=10)
		pass

	def create_widget(self):
		label_1 = tk.Label(self, text=u'脚本名称')
		label_1.grid(row=0, column=0)
		self.input_1 = tk.Entry(self)
		self.input_1.grid(row=0, column=1, sticky='we')
		label_2 = tk.Label(self, text=u'脚本内容')
		label_2.grid(row=1, column=0)
		self.input_2 = tk.Entry(self)
		self.input_2.grid(row=1, column=1, sticky='we')
		btn_queding = tk.Button(self, text=u'确定', command=self.queding)
		btn_queding.grid(row=2, column=0, columnspan=2, pady=10)
		if self.form:
			self.input_1.insert(0, self.form.get('name', ''))
			self.input_2.insert(0, self.form.get('value', ''))

	def queding(self):
		self.form['name'] = self.input_1.get()
		self.form['value'] = self.input_2.get()
		self.callback(self.form, **self.cbkwargs)
		self.destroy()
		pass


if __name__ == '__main__':
	mw = MainWindow()

	mw.mainloop()
