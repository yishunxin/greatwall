import json
import os
import shutil
import sys
import urllib
from operator import index

import pickledb
import requests
from bs4 import BeautifulSoup
from pickledb import PickleDB
from urllib3.util import url

db = PickleDB("jbzm.db")


def write_result(archive_id, type, name, album=None, url=None, cover_url=None, author=None, song_id=None):
    global db
    db.set(archive_id, [type, name, album, url, cover_url, author, song_id])
    db.save()


def core(index, url):
    global db

    value = db.get(index)

    if value and value[0] != "unknown":
        print("Already scan,value=", db.get(str(index)))
        return

    # 设置请求头，模拟浏览器访问
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        response.encoding = 'utf-8'  # 设置编码

        # 检查请求是否成功
        if response.status_code != 200:
            print(f"请求失败，状态码: {response.status_code},url={url}")
            write_result(archive_id=index, type="error", name=response.status_code, url=url)
            return
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.find('title').text

        # 播放列表
        play_list_div = soup.select_one('div[data-tracks-url]')

        # mp4
        mp4_tag = soup.find('source', type='video/mp4')
        # mp3
        audio_tag = soup.find('source', type='audio/mpeg')
        # songs
        songs = soup.select_one('div[songs]')
        # video
        video_tag = soup.find('video', class_='video-js')

        # skip
        skip_class = soup.find('div', class_='card').find('article').get('class')

        if play_list_div:
            play_list = play_list_div['data-tracks-url']
            content = json.loads(requests.get(play_list).text)
            for item in content:
                write_result(archive_id=index, type='mp3', name=item['title'], album=item['subtitle'],
                             url=item['audio'], cover_url=item['cover'])
        elif mp4_tag:
            mp4 = mp4_tag['src']
            write_result(archive_id=index, type='mp4', name=soup.title.text, url=mp4)
        elif audio_tag:
            audio = audio_tag['src']
            write_result(archive_id=index, type='mp3', name=soup.title.text, url=audio)
        elif songs and songs['songs'].split('remote#:').__len__() > 1:
            song_id = songs['songs'].split('remote#:')[1]
            res = json.loads(requests.get(
                "https://jbzm365.com/wp-admin/admin-ajax.php?action=hermit&scope=remote&id=" + song_id).text)
            if res and res.get('msg', {}).get('songs'):
                song_list = res.get('msg', {}).get('songs')
                for item in song_list:
                    write_result(archive_id=index, type='mp3', name=item['song_title'], url=item["song_src"],
                                 cover_url=item['song_cover'], author=item['song_cover'], song_id=item['song_id'])
        elif video_tag and video_tag.find('source'):
            video = video_tag.find('source')['src']
            write_result(archive_id=index, type='mp4', name=soup.title.text, url=video)
        # skip
        elif skip_class == ['post-content', f'post-{index}', 'attachment', 'type-attachment', 'status-inherit',
                            'hentry'] or skip_class == ['post-content', f'post-{index}', 'post', 'type-post',
                                                        'status-publish', 'format-image', 'hentry', 'category-11',
                                                        'category-6',
                                                        'post_format-post-format-image'] or skip_class == [
            'post-content', f'post-{index}', 'post', 'type-post', 'status-publish', 'format-image',
            'has-post-thumbnail', 'hentry', 'category-1',
            'post_format-post-format-image'] or "post_format-post-format-image" in skip_class or "和弦简谱_敬拜赞美" in title or "简谱和弦_敬拜赞美" in title:
            print(f"skip, {title},url={url}")
            write_result(archive_id=index, type='skip', name=title, url=url)
        # 特殊页面
        elif title == "示例页面_敬拜赞美":
            print(f"示例页面_敬拜赞美，url={url}")
            write_result(archive_id=index, type="admin", name=title, url=url)
        elif title == '用户登录_敬拜赞美':
            print(f"用户登录_敬拜赞美，url={url}")
            write_result(archive_id=index, type="admin", name=title, url=url)
        elif title == '标签云_敬拜赞美':
            print(f"标签云_敬拜赞美，url={url}")
            write_result(archive_id=index, type="admin", name=title, url=url)
        elif title == '空白页面_敬拜赞美':
            print(f"空白页面_敬拜赞美，url={url}")
            write_result(archive_id=index, type="admin", name=title, url=url)
        elif title == '网址导航_敬拜赞美':
            print(f"网址导航_敬拜赞美，url={url}")
            write_result(archive_id=index, type="admin", name=title, url=url)
        elif title == '模块化布局页面_敬拜赞美':
            print(f"模块化布局页面_敬拜赞美，url={url}")
            write_result(archive_id=index, type="admin", name=title, url=url)
        elif title == '敬拜赞美':
            print(f"敬拜赞美，url={url}")
            write_result(archive_id=index, type="admin", name=title, url=url)
        else:

            add_skip = input(f"if add skip: {title},url={url}")
            # add_skip = "n"
            if add_skip.strip().lower() == "n":
                print(f"unknown, {title},url={url}")
                write_result(archive_id=index, type='unknown', name=title, url=url)
            else:
                print(f"skip, {title},url={url}")
                write_result(archive_id=index, type='skip', name=title, url=url)
    except Exception as e:
        raise e


def backup_db():
    shutil.copyfile("jbzm.db", "jbzm_backup.db")


def start_run():
    backup_db()
    base_url = "https://jbzm365.com"
    uri = "/archives/{}"
    for index in range(1, 10000):
        url = base_url + uri.format(index)
        core(index, url)


def download():
    # db.set(archive_id, [type, name, album, url, cover_url, author, song_id])
    audio_dir = "D:/jbzm/audio"
    video_dir = "D:/jbzm/video"
    if not os.path.exists(audio_dir):
        os.makedirs(audio_dir)
    if not os.path.exists(video_dir):
        os.makedirs(video_dir)
    global db
    for key in db.all():
        value_list = db.get(key)
        type_dir = None
        if value_list[0] == 'mp3':
            type_dir = audio_dir
        elif value_list[0] == 'mp4':
            type_dir = video_dir
        else:
            pass
        if not type_dir:
            continue
        file_suffix = value_list[3].split('.')[-1]
        if "?" in file_suffix:
            file_suffix = file_suffix.split("?")[0]
        file_name = type_dir
        if value_list[2]:
            print(f"album name: {value_list[2]}")
            file_name = os.path.join(file_name, value_list[2])
        file_name = os.path.join(file_name, value_list[1] + '.' + file_suffix)

        # download mp3
        print(f"downloading {file_name},url={value_list[3]}")
        try:
            urllib.request.urlretrieve(value_list[3], file_name)
        except Exception as e:
            print(f"failed to download {file_name},url={value_list[3]}",e)

        # download cover
        if value_list[4]:
            cover_filename = file_name.split('.')[0] + '.' + value_list[4].split('.')[-1]
            print(f"downloading cover {cover_filename},url={value_list[4]}")
            try:
                urllib.request.urlretrieve(value_list[4], cover_filename)
            except Exception as e:
                print(f"failed to download cover {cover_filename},url={value_list[4]}",e)

    pass


if __name__ == '__main__':
    download()
    pass
