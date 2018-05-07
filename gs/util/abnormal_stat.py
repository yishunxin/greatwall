# encoding: utf-8
import os
import xlrd

from gs.common import cdb
from gs.sve import app_mi
cdb.init_flaskdb_mi(app_mi)
from gs.common.cdb import db_mi as db
from gs.model.mi import Study, Patient

if __name__ == '__main__':
    route = r'C:\Users\Kenny\Desktop\2017\12'
    pathDir = os.listdir(route)
    datas = []
    abnormalPatIds = []
    for allDir in pathDir:
        print allDir
        child = os.path.join(route, allDir)
        print child
        excelFile = xlrd.open_workbook(child)
        sheet = excelFile.sheet_by_index(0)

        for i in range(1, sheet.nrows):
            if sheet.cell(i, 14).value.encode('utf-8') == '体检':
                datas.append(sheet.row_values(i))
            else:
                # print sheet.cell(i, 14).value.encode('utf-8')
                continue
        for data in datas:
            if data[2] == '胸部CT平扫未见明显异常。':
                continue
            if data[2] == '':
                continue
            else:
                abnormalPatIds.append(data[3])

    error_case = []
    for patId in abnormalPatIds:
        pid = db.session.query(Patient.pid).filter(Patient.patient_id == patId ).first()
        predict = db.session.query(Study.predict).filter(Study.pid == pid).first()
        if predict != 2:
            error_case.append(pid)

    print error_case