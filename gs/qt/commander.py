# -*-coding:utf-8-*-
import Tkinter as tk
import json
import os


def enter():
	see_end = True
	cur_index = 0
	with open('commander.json', 'r') as f:
		cmd_info = json.load(f)
	window = tk.Tk()
	window.geometry('800x500')
	window.title(u'指令集')
	lb = tk.Listbox(window, height=13, width=24, font=u'Consolas 16')
	lb.place(x=30, y=30, anchor='nw')
	for item in cmd_info:
		lb.insert(tk.END, item[0])

	entry1 = tk.Entry(window)
	entry1.place(x=30, y=380, anchor='nw', width=200, height=30)

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

	btn_add = tk.Button(window, text=u'插入', command=insert)
	btn_del = tk.Button(window, text=u'删除', command=delete)
	btn_add.place(x=236, y=380, anchor='nw')
	btn_del.place(x=286, y=380, anchor='nw')

	comp_text = tk.Text(window, bg='#F7F7F7', relief='ridge',state=tk.DISABLED,
						font=u'Consolas 11')
	comp_text.place(width=380, height=430, x=380, y=30)
	text_scroll = tk.Scrollbar(comp_text)
	text_scroll.pack(side=tk.RIGHT,fill=tk.Y)
	text_scroll.config(command=comp_text.yview)
	comp_text.config(yscrollcommand=text_scroll.set)
	def clear_output():
		comp_text['state'] = tk.NORMAL
		comp_text.delete('1.0',tk.END)
		comp_text['state'] = tk.DISABLED
	btn_clear = tk.Button(window,text=u'清空',command=clear_output)
	btn_clear.place(x=725, y=0, anchor='nw')



	def run_cmd(e):
		index = e.widget.curselection()[0]
		comp_text['state'] = tk.NORMAL
		comp_text.insert(tk.END, '>>>'+cmd_info[index][0]+'\n')
		if see_end:
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED
		cmd_output = os.popen(cmd_info[index][0].encode('utf8'))
		comp_text['state'] = tk.NORMAL
		comp_text.insert(tk.END, cmd_output.read()+'\n')
		if see_end:
			comp_text.see(tk.END)
		comp_text['state'] = tk.DISABLED

	lb.bind('<Double-Button-1>', run_cmd)
	window.mainloop()
	with open('commander.json', 'w') as f:
		json.dump(cmd_info, f)
	pass


if __name__ == '__main__':
	enter()
