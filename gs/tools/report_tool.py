import json
import os
import datetime
import shutil

import openpyxl
import logging

from openpyxl.styles import Font, Alignment, PatternFill, Border, Side

logger = logging.getLogger(__name__)
logger.setLevel(level=logging.INFO)
handler = logging.FileHandler('./data/tools.log.%s' % datetime.datetime.now().year, mode='a+')
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - line:%(lineno)d - %(levelname)s: %(message)s')
handler.setFormatter(formatter)

console = logging.StreamHandler()
console.setLevel(logging.INFO)

logger.addHandler(handler)
logger.addHandler(console)

logger.info("====开始运行")


def load_config():
	with open('./data/config.txt', 'r', encoding='utf8') as f:
		data = f.readlines()
		data = [item.strip() for item in data if item]
		config = {}
		config['date'] = data[1].split('-')
		group = []
		mids = []
		small_count = 0
		for item in data[3:]:
			if not item:
				continue
			mid, small, name = item.split('-')
			if mid not in mids:
				group.append({'name': mid, 'child': []})
				mids.append(mid)
			child = group[-1]['child']
			child.append({'name': small, 'ch': name})
			small_count += 1
		config['group'] = group
		return config, small_count


def new_run():
	config, small_count = load_config()
	logger.info('====加载config配置\n{}'.format(config))
	date = config.get('date')
	group = config.get('group')
	flist = os.listdir('./')
	for fname in flist:
		if fname.startswith('统计表-') and fname.endswith('.xlsx'):
			old_name = fname
			break
	logger.info('====旧统计表：%s' % old_name)
	export_name = '统计表-{}-{}-{}.xlsx'.format(date[0], date[1], date[2])
	folder = './{}-{}'.format(date[0], date[1])
	small_excels = os.listdir(folder)
	logger.info('===={}文件夹下的报表列表：\n{}'.format(folder,small_excels))
	small_excels_file_dict = {item: item.split('.')[0].split('-') for item in small_excels}
	# load 统计表
	wb_total = openpyxl.load_workbook(old_name)
	sheet_total = wb_total.worksheets[0]
	start_index = index = sheet_total.max_row + 1

	# style define
	font_bold = Font('微软雅黑', size=10, bold=True)
	align = Alignment(horizontal='center', vertical='center', wrap_text=False)
	font_normal = Font('微软雅黑', size=11, bold=False)
	fill_blue = PatternFill(fill_type='solid', start_color='00FDFF')
	side = Side(border_style='thin', color='000000')
	border = Border(left=side, right=side, top=side, bottom=side)
	head_fill_dict = {}
	for i in range(1, 18):
		head_fill_dict[i] = PatternFill(fill_type='solid', start_color='00FDFF')
	head_fill_dict[18] = PatternFill(fill_type='solid', start_color='FF99CC')
	head_fill_dict[19] = PatternFill(fill_type='solid', start_color='FF00FF')
	head_fill_dict[20] = PatternFill(fill_type='solid', start_color='FF8080')
	head_fill_dict[21] = PatternFill(fill_type='solid', start_color='FF0000')
	head_fill_dict[22] = PatternFill(fill_type='solid', start_color='FF99CC')
	head_fill_dict[23] = PatternFill(fill_type='solid', start_color='FF00FF')
	head_fill_dict[24] = PatternFill(fill_type='solid', start_color='FF8080')
	head_fill_dict[25] = PatternFill(fill_type='solid', start_color='FF0000')
	head_fill_dict[26] = PatternFill(fill_type='solid', start_color='FF9900')
	# format
	titles = ['Sunday', 'Large', 'Medium', 'Small', 'SF', 'L3+', 'L2', 'L1', 'L0', 'Adults', 'Children', 'Attendance',
			  'Newcomers', 'Absence', 'Care', 'Lost Sheep', 'Cover', 'Absen 1', 'Absen 2', 'Absen 3', 'Absen 4',
			  'Absen 1', 'Absen 2', 'Absen 3', 'Absen 4', 'Abs Ttl']
	sheet_total.append(titles)
	for i in range(1, 5):
		sheet_total.cell(index, i).font = font_bold
		sheet_total.cell(index, i).alignment = align
	for i in range(5, 27):
		sheet_total.cell(index, i).font = font_normal
		sheet_total.cell(index, i).alignment = align
	for i in range(1, 27):
		sheet_total.cell(index, i).border = border
		sheet_total.cell(index, i).fill = head_fill_dict[i]

	sum_list = []
	xiao_zong_index=[]
	for i in range(len(group)):
		mid_list = []
		for j in range(len(group[i]['child'])):
			index += 1
			data = group[i]['child'][j]
			row_data = [None, None, None, data['ch']]
			small_excel_path = None
			for key, value in small_excels_file_dict.items():
				if data['name'] == value[0] and list(map(int, date)) == list(map(int, value[3:6])):
					small_excel_path = os.path.join(folder, key)
					break
			if not small_excel_path:
				logger.warning('！！没有找到对应的小家报表，小家名：{}'.format(data['name']))
				row_data.append(0)
				# color
				sheet_total.append(row_data)
				# font,align,border
				for a in range(1, 27):
					sheet_total.cell(index, a).font = font_normal
					sheet_total.cell(index, a).alignment = align
					sheet_total.cell(index, a).border = border
				mid_list.append(row_data)
				continue
			else:
				row_data.append(1)
				ws_small = openpyxl.load_workbook(small_excel_path, read_only=True, data_only=True).worksheets[0]
				for a in range(1, ws_small.max_row):
					if ws_small.cell(a, 1).value == '人数统计' and ws_small.cell(a + 1, 1).value == '类别' and ws_small.cell(
							a + 2, 1).value == '颜色定义':
						index_small = a
						break
				adult_ab_list = []
				child_ab_list = []
				for a in range(7, 11):
					adult_ab_list.append(int(ws_small.cell(index_small + 3, a).value))
					child_ab_list.append(int(ws_small.cell(index_small + 4, a).value))
				attence_list = []
				for a in range(2, 14):
					attence_list.append(int(ws_small.cell(index_small + 9, a).value))
				row_data.extend(attence_list)
				row_data.extend(adult_ab_list)
				row_data.extend(child_ab_list)
				row_data.append(sum(child_ab_list) + sum(adult_ab_list))
				mid_list.append(row_data)
				sheet_total.append(row_data)
				# font,align,border
				for a in range(1, 27):
					sheet_total.cell(index, a).font = font_normal
					sheet_total.cell(index, a).alignment = align
					sheet_total.cell(index, a).border = border
				# color
				for a in range(18, 26):
					if sheet_total.cell(index, a).value:
						sheet_total.cell(index, a).fill = head_fill_dict[a]
						sheet_total.cell(index, 4).fill = head_fill_dict[a]

		mid_data = [None, None, group[i]['name'], '小总']
		for a in range(4, 26):
			sums = 0
			for item in mid_list:
				if len(item) <= a:
					continue
				sums += item[a]
			mid_data.append(sums)
		index += 1
		xiao_zong_index.append(index)
		# merge_cell
		sheet_total.merge_cells(start_row=index - len(mid_list), start_column=3, end_row=index, end_column=3)
		sheet_total.cell(index - len(mid_list), 3, mid_data[2])
		sheet_total.cell(index,4,mid_data[3])
		col_list=['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
		for col in col_list:
			sheet_total['{}{}'.format(col,index)].value = '=SUM({}{}:{}{})'.format(col,index-len(mid_list),col,index-1)
		# font,align,border
		for a in range(1, 27):
			sheet_total.cell(index, a).font = font_normal
			sheet_total.cell(index, a).alignment = align
			sheet_total.cell(index, a).border = border
		for a in range(4, 27):
			sheet_total.cell(index, a).fill = fill_blue
		sum_list.append(mid_data)
	sum_data = ["{}月{}日".format(date[1], date[2]), 'HOD', "HOD", 'Total']
	for a in range(4, 26):
		sums = 0
		for item in sum_list:
			sums += item[a]
		sum_data.append(sums)
	index += 1
	# merge_cell·
	sheet_total.merge_cells(start_row=start_index + 1, start_column=1, end_row=index, end_column=1)
	sheet_total.merge_cells(start_row=start_index + 1, start_column=2, end_row=index, end_column=2)
	sheet_total.cell(start_index + 1, 1, sum_data[0])
	sheet_total.cell(start_index + 1, 2, sum_data[1])
	sheet_total.cell(index,3,sum_data[2])
	sheet_total.cell(index,4,sum_data[3])
	col_list = ['E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
				'Z']
	for col in col_list:
		sheet_total['{}{}'.format(col,index)].value = '='+'+'.join([col+str(t_index) for t_index in xiao_zong_index])
	# font,align,border
	for a in range(1, 27):
		sheet_total.cell(index, a).font = font_normal
		sheet_total.cell(index, a).alignment = align
		sheet_total.cell(index, a).border = border
	for a in range(4, 27):
		sheet_total.cell(index, a).fill = PatternFill(fill_type='solid', start_color='FFFF00')
	shutil.copyfile(old_name, './data/backup.xlsx')
	wb_total.save(export_name)
	logger.info('====恭喜，生成报表成功！报表名：{}\n\n'.format(export_name))


if __name__ == '__main__':
	try:
		new_run()
	except Exception as e:
		logger.exception(e)
		logger.error('！！！！出错了，请查看上面错误日志或者联系开发人员')
	input('请按任意键结束：')
