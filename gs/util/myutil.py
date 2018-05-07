# -*- coding:utf-8 -*-
import StringIO
import functools
import hashlib
import json
import random
import types

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

json_dumps = functools.partial(json.dumps, ensure_ascii=False)


def split(t_str, t_sep=','):
    return t_str.split(t_sep) if t_str else []


def get_from_dict(t_dict, key, default_value=None):
    return t_dict[key] if key in t_dict else default_value


def list2map(items, prop_key, value_type=None, handler=None):
    t_dict = dict()
    for item in items:
        key = getattr(item, prop_key) if hasattr(item, prop_key) else item[prop_key]
        if value_type is None:
            t_dict[key] = handler(item) if handler else item
        elif isinstance(value_type, types.ListType):
            if key not in t_dict:
                t_dict[key] = []
            t_dict[key].append(handler(item) if handler else item)
    return t_dict


def get_vcode():
    return ''.join(random.Random().sample(map(str, range(10)), 6))


dataurl_font = ImageFont.truetype('msyh.ttf', 40)


def getdataurl(name):
    name = name[-2:] if len(name) > 2 else name
    t_md5 = hashlib.md5(name.encode('utf-8', 'ignore')).hexdigest()
    weight = 120
    hight = 120
    image = Image.new('RGB', (weight, hight), '#' + t_md5[:6])
    draw = ImageDraw.Draw(image)
    draw.text((20, 30), name, font=dataurl_font, fill=(255, 255, 255))

    output = StringIO.StringIO()
    image.save(output, format="png")
    contents = output.getvalue()
    output.close()
    # return 'data:image/png;base64,' + base64.b64encode(contents)
    return contents


def GetFileMd5(strFile):
    t_file = None
    strMd5 = ""

    try:
        t_file = open(strFile, "rb")
        md5 = hashlib.md5()

        while True:
            strRead = t_file.read(8096)
            if not strRead:
                break
            md5.update(strRead)
        bRet = True
        strMd5 = md5.hexdigest()
    except:
        bRet = False
    finally:
        if t_file:
            t_file.close()

    return [bRet, strMd5]


def data2excel(data, name=None):
    import xlwt
    workbook = xlwt.Workbook(encoding='utf8')
    worksheet = workbook.add_sheet('sheet1')

    fmt_str = '\t'.join(map(lambda x: '{}', data[0]))
    for row, x in enumerate(data):
        print fmt_str.format(*x)
        for col in range(len(x)):
            worksheet.write(row, col, label=x[col])
    if name:
        workbook.save(name)
    return workbook

def check_npydir(npy_dir):
    import os
    from gs.conf.data import LUNGMASK_FOLDER, LUNG_FOLDER, LUNGINFO_FOLDER, DESC_FOLDER
    path = os.path.join(npy_dir, LUNG_FOLDER)
    if not os.path.exists(path):
        os.makedirs(path)
    path = os.path.join(npy_dir, LUNGMASK_FOLDER)
    if not os.path.exists(path):
        os.makedirs(path)
    path = os.path.join(npy_dir, LUNGINFO_FOLDER)
    if not os.path.exists(path):
        os.makedirs(path)
    path = os.path.join(npy_dir, DESC_FOLDER)
    if not os.path.exists(path):
        os.makedirs(path)