import json
import urllib.request
import re
from contextlib import nullcontext

import pickledb
import requests
from bs4 import BeautifulSoup

db = pickledb.load("jbzm.db", auto_dump=True)


def write_result(name, album, url, cover_url):
    global dbp
    db.set(url, [name, album, url, cover_url])
    db.dump()


def start_run():
    base_url = "https://jbzm365.com"
    uri = "/archives/{}"
    index = 8846

    # 设置请求头，模拟浏览器访问
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    url = base_url + uri.format(index)
    try:
        # 发送HTTP请求[1,4](@ref)
        response = requests.get(url, headers=headers)
        response.encoding = 'utf-8'  # 设置编码

        # 检查请求是否成功
        if response.status_code != 200:
            print(f"请求失败，状态码: {response.status_code}")
            return None
        soup = BeautifulSoup(response.text, 'html.parser')
        # 播放列表
        play_list_div = soup.select_one('div[data-tracks-url]')
        if play_list_div:
            play_list = play_list_div['data-tracks-url']
            content = json.loads(requests.get(play_list).text)

            pass

        element_class = "a"
        target_element = "B"
        # 根据是否有类名选择不同的提取方式
        if element_class:
            elements = soup.find_all(target_element, class_=element_class)
        else:
            elements = soup.find_all(target_element)

        extracted_data = []

        # 提取数据
        for element in elements:
            element_data = {
                'text': element.get_text().strip(),
                'href': element.get('href') if element.get('href') else 'N/A'
            }
            extracted_data.append(element_data)

        return extracted_data

    except Exception as e:
        print(f"发生错误: {e}")
        return None


if __name__ == '__main__':
    start_run()
    pass
