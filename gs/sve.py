# -*- coding:utf-8 -*-
from flask import Flask

app_zhenai = Flask(__name__)
app_zhenai.config['SECRET_KEY'] = 'S0T01M/2yX P~XHY111111]PPO/,?IT3'

from gs.common import clogger
clogger.init()

