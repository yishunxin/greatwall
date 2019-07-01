import json
import requests
def post_login():
    datas = {
        'phone': 'admin',
        'password': '123456'
    }

    resp = requests.post("http://tj.sparkcab.com/api001/login", data = json.dumps(datas))
    print resp.content
post_login()