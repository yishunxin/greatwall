import json
from operator import index

import pickledb
import requests
from bs4 import BeautifulSoup
from pickledb import PickleDB

db = PickleDB("jbzm.db")


def write_result(archive_id, type, name, album=None, url=None, cover_url=None):
    global db
    db.set(archive_id, [type, name, album, url, cover_url])
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
        if play_list_div:
            play_list = play_list_div['data-tracks-url']
            content = json.loads(requests.get(play_list).text)
            for item in content:
                write_result(archive_id=index, type='mp3', name=item['title'], album=item['subtitle'],
                             url=item['audio'], cover_url=item['cover'])
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
            print(f"{title},url={url}")
            write_result(archive_id=index, type='unknown', name=title, url=url)
    except Exception as e:
        raise e


def start_run():
    base_url = "https://jbzm365.com"
    uri = "/archives/{}"
    for index in range(1, 10000):
        url = base_url + uri.format(index)
        core(index, url)


if __name__ == '__main__':
    start_run()
    pass
