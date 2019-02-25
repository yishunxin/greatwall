# -*- coding:utf-8 -*-
from flask import Flask

app_zhenai = Flask(__name__)
app_zhenai.config['SECRET_KEY'] = 'S0T01M/2yX P~XHY111111]PPO/,?IT3'

app_baihe = Flask(__name__)
app_baihe.config['SECRET_KEY'] = 'S0T01M/2yX P~XHY111111]PPO/,?IT4'

app_jdjgq = Flask(__name__)
app_jdjgq.config['SECRET_KEY'] = 'S0T01M/2yX P~XHY111111]PPO/,?IT5'
from gs.common import clogger

clogger.init()
