# encoding: utf-8
import logging

from gs.conf import logger as loggerconf
loggerconf.LOGNAME = 'downloaddata_main'

import os
import shutil

import xlrd
import xlwt

from gs.common import cdb
from gs.conf import data
from gs.sve import app_mi,app_dcm4chee
cdb.init_flaskdb_mi(app_mi)
cdb.init_flaskdb_dcm4chee(app_dcm4chee)
from gs.common.cdb import db_mi as db
from gs.common.cdb import db_dcm4chee as db_dcm
from gs.model.mi import Study, Series
from gs.model.dcm4chee import Study as Study_dcm
from gs.common import cdcm
from gs.service import dcm

studys = set()
source_folders = set()

aimstrs = ['肺气肿', '占位', '淋巴结增大', '骨质异常', '骨质破坏']

aimstrs_zhanwei = ['右肺门占位', '左肺上叶占位', '两肺门区占位', '左肺上叶前段占位', '右前纵隔区占位',
                   '前上纵隔占位', '右下肺门占位', '右肺上叶占位', '左肺下叶肺门旁占位', '右肺门恶性占位',
                   '右肺尖及周围软组织巨大占位', '右肺尖脊柱旁占位', '左肺上叶巨大占位', '右肺中叶占位']

kind_accs = dict()
kind_accs.setdefault('k1', [])
kind_accs.setdefault('k2', [])
kind_accs.setdefault('k3', [])
kind_accs.setdefault('k4', [])
kind_accs.setdefault('k5', [])

f_kind_accs = dict()
f_kind_accs.setdefault('k1', [])
f_kind_accs.setdefault('k2', [])
f_kind_accs.setdefault('k3', [])
f_kind_accs.setdefault('k4', [])
f_kind_accs.setdefault('k5', [])

acc_datas = dict()

wrong_accs = []
outdir = '/data2/download0305'
if not os.path.exists(outdir):
    os.makedirs(outdir)

logger = logging.getLogger('download')
def download_data():
    dcm_obj = dcm.DcmSvc()

    for k, v in kind_accs.iteritems():
        source_folders.clear()
        for num in v:
            if len(f_kind_accs[k]) == 200:
                break
            study = db_dcm.session.query(Study_dcm).filter(Study_dcm.accession_no == num).first()
            if not study:
                print '-----no study, continue --', num
                continue
                cdcm.move_study_accession_number(num)
                cdb.close(db_dcm)
                study = db_dcm.session.query(Study_dcm).filter(Study_dcm.accession_no == num).first()
                if not study:
                    logger.error('------fetchq error--------%s', num)
                    continue
                studys.add(study)
            l = dcm_obj.get_location(study_id=study.study_iuid)
            source_folders.add(l.storage_path[:19])
            f_kind_accs[k].append(num)
            logger.error('{}, {}'.format(k, len(f_kind_accs[k])))

        for x in source_folders:
            try:
                shutil.copytree(os.path.join(data.RAW_DIR, x), os.path.join(outdir, x))
            except:
                pass

def searchAccessionNo(route):
    #     col[2]: 影像学诊断
    #     col[3]: 病人编号
    #     col[4]: 放射编号
    #     col[5]: 病人姓名
    #     col[6]: 性别
    #     col[14]: 病人类型（体检等）
    #     col[23]: 年龄
    #     col[31]: 影像学表现

    kind_accs['k1'] = []
    kind_accs['k2'] = []
    kind_accs['k3'] = []
    kind_accs['k4'] = []
    kind_accs['k5'] = []

    pathDir = os.listdir(route)
    pathDir.sort(reverse=True)
    # pathDir = ['12']
    for allDir in pathDir:
            # if allDir not in ['10', '11', '12']:
            #     continue
            child = os.path.join(route, allDir)
            pathDir_child = os.listdir(child)
            for allDir_child in pathDir_child:
                child_child = os.path.join(child, allDir_child)
                logger.error(child_child)
                excelFile = xlrd.open_workbook(child_child)
                sheet = excelFile.sheet_by_index(0)

                for i in range(1, sheet.nrows):
                    accession_number = sheet.cell(i, 4).value
                    # 肺气肿
                    if '肺气肿' in sheet.cell(i, 2).value.encode('utf-8'):
                        kind_accs['k1'].append(accession_number)
                        acc_datas[accession_number] = []
                        for j in range(sheet.ncols):
                            acc_datas[accession_number].append(sheet.cell(i, j).value)
                    # 占位
                    for aimstr in aimstrs_zhanwei:
                        if aimstr in sheet.cell(i, 2).value.encode('utf-8'):
                            kind_accs['k2'].append(accession_number)
                            acc_datas[accession_number] = []
                            for j in range(sheet.ncols):
                                acc_datas[accession_number].append(sheet.cell(i, j).value)
                            break
                    # 淋巴结增大
                    if '淋巴结增大' in sheet.cell(i, 2).value.encode('utf-8'):
                        kind_accs['k3'].append(accession_number)
                        acc_datas[accession_number] = []
                        for j in range(sheet.ncols):
                            acc_datas[accession_number].append(sheet.cell(i, j).value)
                    # 骨质异常
                    if '骨质异常' in sheet.cell(i, 2).value.encode('utf-8'):
                        kind_accs['k4'].append(accession_number)
                        acc_datas[accession_number] = []
                        for j in range(sheet.ncols):
                            acc_datas[accession_number].append(sheet.cell(i, j).value)
                    # 骨质破坏
                    if '骨质破坏' in sheet.cell(i, 2).value.encode('utf-8'):
                        kind_accs['k5'].append(accession_number)
                        acc_datas[accession_number] = []
                        for j in range(sheet.ncols):
                            acc_datas[accession_number].append(sheet.cell(i, j).value)

    for k, v in kind_accs.iteritems():
        logger.error('{}, {}'.format(k, len(v)))



def del_data():
    cdcm.del_study(studys)


def mmm():
    # q = db_dcm.session.query(Study_dcm).filter(Study_dcm.created_time > '2018-03-05 18:30:00', Study_dcm.study_date.like('2017%'))
    # print q.count()
    # cdcm.del_study(q.all())
    routes = [r'/home/work/slx/2017', r'/home/work/slx/2016', r'/home/work/slx/2015', r'/home/work/slx/2014']
    routes = [r'/home/work/slx/2017', r'/home/work/slx/2016']
    for route in routes:
        searchAccessionNo(route)
        download_data()
        if len(f_kind_accs['k1']) == 200 \
                and len(f_kind_accs['k2']) == 200 \
                and len(f_kind_accs['k3']) == 200 \
                and len(f_kind_accs['k4']) == 200 \
                and len(f_kind_accs['k5']) == 200:
            break

    print 'wrong_accs --- '
    print wrong_accs

    wbk = xlwt.Workbook(encoding='utf-8')
    sheet1 = wbk.add_sheet('肺气肿')
    sheet2 = wbk.add_sheet('占位')
    sheet3 = wbk.add_sheet('淋巴结增大')
    sheet4 = wbk.add_sheet('骨质异常')
    sheet5 = wbk.add_sheet('骨质破坏')
    ksheet = {
        'k1': sheet1,
        'k2': sheet2,
        'k3': sheet3,
        'k4': sheet4,
        'k5': sheet5
    }

    for k, v in f_kind_accs.iteritems():
        print k, len(v)
        for i, num in enumerate(v):
            for j, value in enumerate(acc_datas[num]):
                ksheet[k].write(i, j, value)
    wbk.save(os.path.join(outdir, 'data.xls'))


    # del_data()

if __name__ == '__main__':
    # mmm()
    q = db_dcm.session.query(Study_dcm).filter(Study_dcm.created_time > '2018-03-05 18:30:00', Study_dcm.study_date.like('2017%'))
    print q.count()
    items = q.all()
    a_p = set([e.patient_fk for e in items])
    print len(a_p)

    x = db_dcm.session.query(Study_dcm).filter(Study_dcm.created_time > '2018-03-05 18:30:00', Study_dcm.study_date.like('201803%'))
    x_p = set([e.patient_fk for e in x])
    print len(x_p)

    print len(a_p - x_p)

    del_studys = [e for e in items if e.patient_fk in (a_p - x_p)]
    print len(del_studys)
    cdcm.del_study(del_studys)