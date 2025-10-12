# -*- coding:utf-8 -*-
import logging
import os
import re
import threading

import requests
import urllib

import thread

from gs.common import cdb
from gs.sve import app_jdjgq
from gs.util import mymodel

cdb.init_flaskdb_jdjgq(app_jdjgq)
from gs.common.cdb import db_jdjgq
from gs.model.jdjgq import Music

logger = logging.getLogger("jdjgq")


def get_music_info():
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
                print(e)
                db_jdjgq.session.rollback()
        except Exception as e:
            print(e)


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
        print(e)
        db_jdjgq.session.rollback()


def down_music_thread(music_list):
    root_path = "F:/music/jdjgq"
    if not os.path.exists(root_path):
        os.makedirs(root_path)
    for music in music_list:
        try:
            folder = os.path.join(root_path, music.author, music.album)
            if not os.path.exists(folder):
                os.makedirs(folder)
            music_file = os.path.join(folder, music.name + '.mp3')
            lrc_file = os.path.join(folder, music.name + '.lrc')
            lrc_url = "http://www.jdjgq.com/" + '/'.join(music.lrc_url.split('/')[3:])
            urllib.urlretrieve(music.music_url.encode('utf8'), music_file)
            urllib.urlretrieve(lrc_url.encode('utf8'), lrc_file)
            try:
                db_jdjgq.session.query(Music).filter(Music.m_id == music.m_id).update({Music.status: 1})
                db_jdjgq.session.commit()
            except Exception as e:
                logger.exception(e)
                db_jdjgq.session.rollback()
        except Exception as e:
            logger.exception(e)
            db_jdjgq.session.query(Music).filter(Music.m_id == music.m_id).update({Music.status: 2})
            db_jdjgq.session.commit()


def start_down():
    music_list = db_jdjgq.session.query(Music).filter(Music.status == '0').all()
    logger.info("start,lenth=={}".format(str(len(music_list))))
    percount = len(music_list) / 10
    for i in range(10):
        t_music_list = music_list[i * percount:(i + 1) * percount]
        t = threading.Thread(target=down_music_thread, args=(t_music_list,))
        t.start()


if __name__ == '__main__':
    start_down()
