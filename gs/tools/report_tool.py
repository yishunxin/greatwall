import os
import datetime
import shutil

import openpyxl
import logging
logging.basicConfig(filename='./data/tools.log.%s' % datetime.datetime.now().year,format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')
def load_config():
    with open('./data/config.txt', 'r',encoding='utf8') as f:
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
            mid,small,name = item.split('-')
            if mid not in mids:
                group.append({'name':mid,'child':[]})
                mids.append(mid)
            child = group[-1]['child']
            child.append({'name':small,'ch':name})
            small_count+=1
        config['group'] = group
        return config,small_count


def run():
    config,small_count = load_config()
    date = config.get('date')
    format_date = datetime.datetime(*map(int,date))
    group = config.get('group')
    export_name = u'统计表-{}-{}-{}.xlsx'.format(date[0],date[1],date[2])
    folder = './{}-{}'.format(date[0],date[1])
    small_excels = os.listdir(folder)
    small_excels_file_dict = {item:item.split('.')[0].split('-') for item in small_excels}



    # load 统计表
    wb_total = openpyxl.load_workbook(export_name)
    print (wb_total.worksheets)
    sheet_total = wb_total.worksheets[0]
    # format
    index = 4
    for i in range(4,sheet_total.max_row+1):
        if sheet_total.cell(i,1).value is None:
            if not isinstance(sheet_total.cell(i,1),openpyxl.cell.cell.MergedCell):
                index=i
                break
    add_title = False
    insert_count = small_count + 1 + len(group)
    if sheet_total.cell(index-1,1).value.strip() not in  [u'Sunday','Sunday']:
        add_title = True
        insert_count +=1
    for i in range(insert_count):
        sheet_total.insert_rows(index,1)
    wb_total.save('1'+export_name)
    exit()
    sheet_total.insert_rows(index,insert_count)
    merged_cell_ranges = sheet_total.merged_cell_ranges
    for item in merged_cell_ranges:
        min_row,max_row,min_col,max_col = item.min_row,item.max_row,item.min_col,item.max_col



    if add_title:
        small_count+=1
        sheet_total.insert_rows(index,1)
        titles = ['Sunday','Large','Medium','Small','SF','L3+','L2','L1','L0','Adults','Children','Attendance','Newcomers','Absence','Care','Lost Sheep','Cover','Absen 1','Absen 2','Absen 3','Absen 4','Absen 1','Absen 2','Absen 3','Absen 4','Abs Ttl']
        for i in range(len(titles)):
            sheet_total.cell(index,i+1,titles[i])
        index+=1
    sheet_total.insert_rows(index, 1)
    sheet_total.cell(index,1,format_date.date())
    sheet_total.cell(index,2,'HOD')

    mid_sums = [0 for ll in range(50)]
    for i in range(len(group)):
        mid = group[i]['name']
        sheet_total.cell(index,3,mid)
        sums = [0 for ll in range(50)]
        for j in range(len(group[i]['child'])):
            data = group[i]['child'][j]
            sheet_total.cell(index,4,data['ch'])
            for key,value in small_excels_file_dict.items():
                if data['name'] == value[0] and map(int,date) == map(int,value[3:6]):
                    small_excel_path = os.path.join(folder,key)
                    break
            ws_small = openpyxl.load_workbook(small_excel_path,read_only=True,data_only=True).worksheets[0]
            for a in range(1,ws_small.max_row):
                if ws_small.cell(a,1).value == u'人数统计' and ws_small.cell(a+1,1).value == u'类别' and ws_small.cell(a+2,1).value == u'颜色定义':
                    index_small = a
                    break
            adult_ab_list = []
            child_ab_list = []
            for a in range(7,11):
                adult_ab_list.append(int(ws_small.cell(index_small+3,a).value))
                child_ab_list.append(int(ws_small.cell(index_small+4,a).value))
            attence_list = []
            for a in range(2,14):
                attence_list.append(int(ws_small.cell(index_small+9,a).value))
            sheet_total.cell(index,5,1)
            sums[5]+=1
            for a in range(len(attence_list)):
                sums[6+a]+=attence_list[a]
                sheet_total.cell(index,6+a,attence_list[a])
            for a in range(4):
                sums[18+a]+=adult_ab_list[a]
                sheet_total.cell(index,18+a,adult_ab_list[a])
            for a in range(4):
                sums[22+a]+=child_ab_list[a]
                sheet_total.cell(index,22+a,child_ab_list[a])
            t = sum(child_ab_list)+sum(adult_ab_list)
            sheet_total.cell(index,26,t)
            sums[26]+=t
            index+=1
            sheet_total.insert_rows(index, 1)
        sheet_total.cell(index,4,u'小总')
        for a in range(5,len(sums)):
            mid_sums[a]+=sums[a]
            sheet_total.cell(index,a,sums[a])
        index+=1
        sheet_total.insert_rows(index,1)
        sheet_total.cell(index,3,'HOD')
        sheet_total.cell(index,4,'Total')
        for a in range(5,len(mid_sums)):
            sheet_total.cell(index,a,mid_sums[a])

    wb_total.save(export_name)

def new_run():
    config,small_count = load_config()
    date = config.get('date')
    format_date = datetime.datetime(*map(int,date))
    group = config.get('group')
    flist = os.listdir('./')
    for fname in flist:
        if fname.startswith('统计表-') and fname.endswith('.xlsx'):
            old_name = fname
            break
    export_name = '统计表-{}-{}-{}.xlsx'.format(date[0],date[1],date[2])
    folder = './{}-{}'.format(date[0],date[1])
    small_excels = os.listdir(folder)
    small_excels_file_dict = {item:item.split('.')[0].split('-') for item in small_excels}



    # load 统计表
    wb_total = openpyxl.load_workbook(old_name)
    print (wb_total.worksheets)
    sheet_total = wb_total.worksheets[0]
    # format
    titles = ['Sunday', 'Large', 'Medium', 'Small', 'SF', 'L3+', 'L2', 'L1', 'L0', 'Adults', 'Children', 'Attendance',
              'Newcomers', 'Absence', 'Care', 'Lost Sheep', 'Cover', 'Absen 1', 'Absen 2', 'Absen 3', 'Absen 4',
              'Absen 1', 'Absen 2', 'Absen 3', 'Absen 4', 'Abs Ttl']
    sheet_total.append(titles)

    sum_list = []
    for i in range(len(group)):
        mid_list = []
        for j in range(len(group[i]['child'])):
            data = group[i]['child'][j]
            row_data=[None, None, None, data['ch']]
            small_excel_path = None
            for key,value in small_excels_file_dict.items():
                if data['name'] == value[0] and list(map(int,date)) == list(map(int,value[3:6])):
                    small_excel_path = os.path.join(folder,key)
                    break
            if not small_excel_path:
                row_data.append(0)
                sheet_total.append(row_data)
                mid_list.append(row_data)
                break
            row_data.append(1)
            ws_small = openpyxl.load_workbook(small_excel_path,read_only=True,data_only=True).worksheets[0]
            for a in range(1,ws_small.max_row):
                if ws_small.cell(a,1).value == '人数统计' and ws_small.cell(a+1,1).value == '类别' and ws_small.cell(a+2,1).value == '颜色定义':
                    index_small = a
                    break
            adult_ab_list = []
            child_ab_list = []
            for a in range(7,11):
                adult_ab_list.append(int(ws_small.cell(index_small+3,a).value))
                child_ab_list.append(int(ws_small.cell(index_small+4,a).value))
            attence_list = []
            for a in range(2,14):
                attence_list.append(int(ws_small.cell(index_small+9,a).value))
            row_data.extend(attence_list)
            row_data.extend(adult_ab_list)
            row_data.extend(child_ab_list)
            row_data.append(sum(child_ab_list)+sum(adult_ab_list))
            mid_list.append(row_data)
            sheet_total.append(row_data)

        mid_data = [None,None,group[i]['name'],'小总']
        for a in range(4,26):
            sums = 0
            for item in mid_list:
                if len(item)<=a:
                    continue
                sums+=item[a]
            mid_data.append(sums)
        sheet_total.append(mid_data)
        sum_list.append(mid_data)
    sum_data = [format_date.date(),'HOD',"HOD",'Total']
    for a in range(4,26):
        sums = 0
        for item in sum_list:
            sums += item[a]
        sum_data.append(sums)
    sheet_total.append(sum_data)
    shutil.copyfile(old_name,'./data/backup.xlsx')
    wb_total.save(export_name)

if __name__ == '__main__':
    new_run()
