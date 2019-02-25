# -*- coding:utf-8 -*-
import re
import requests
from bs4 import BeautifulSoup
import urllib
from gs.common import cdb
from gs.sve import app_jdjgq
from gs.util import mymodel

cdb.init_flaskdb_jdjgq(app_jdjgq)
from gs.common.cdb import db_jdjgq
from gs.model.jdjgq import Music

def get_music_info():
    a = requests.get("http://www.jdjgq.com/play/url.php?music=821_822_823_824_825_826_827_828_829_830")
    soup = BeautifulSoup(a.content, 'lxml')
    exit()
    base_url = "http://www.jdjgq.com/play/url.php"
    for i in range(0, 4000):
        try:
            id_list = range(i * 10 + 1, (i + 1) * 10 + 1)
            res = requests.get(url=base_url, params={"music": "_".join(map(str, id_list))})
            content = res.content.decode('gbk')
            m_list = content.split("\r\n")[1:-1]
            model_list = []
            for j in range(len(m_list)):
                tag = m_list[j]
                m = re.match(r".+src=\"([^\"]+)\" lrc=\"([^\"]+)\" label=\"([^\"]+)\".+", tag)
                music = Music()
                music.music_url = m.groups()[0]
                music.lrc_url = m.groups()[1]
                music.label = m.groups()[2]
                music.item_id = id_list[j]
                model_list.append(mymodel.model_todbdict(music))
            try:
                db_jdjgq.session.execute(Music.__table__.insert(), model_list)
                db_jdjgq.session.commit()
            except Exception as e:
                print e
                db_jdjgq.session.rollback()
        except Exception as e:
            print e

def process_music_info():
    try:
        music_list = db_jdjgq.session.query(Music).all()
        for music in music_list:
            if music.music_url:
                music.name = music.label
                url_list = music.music_url.split('/')
                music.author = url_list[-3]
                music.album = url_list[-2]
        db_jdjgq.session.commit()
    except Exception as e:
        print e
        db_jdjgq.session.rollback()


if __name__ == '__main__':
    process_music_info()
