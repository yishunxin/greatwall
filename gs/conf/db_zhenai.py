# -*- coding:utf-8 -*-
__author__ = 'yishunxin'

# 线上数据库
HOST = 'shekinahdb.cbjla4zm3cj6.us-east-2.rds.amazonaws.com'
PORT = 3306
USER = 'shekinah'
PASSWD = 'shekinah'
DB = 'zhenai'

CHARSET = 'utf8'
# sqlalchemy 配置 看下面的链接
# http://www.pythondoc.com/flask-sqlalchemy/config.html
# 操作函数 sqlalchemy.sql.operators.ColumnOperators
SQLALCHEMY_ECHO = False
# 设置为true则可以直接查看salalchemy转译成的sql语句
SQLALCHEMY_TRACK_MODIFICATIONS = False
# 多少秒后自动回收连接 3600
SQLALCHEMY_POOL_RECYCLE = 3600

# pool size
SQLALCHEMY_POOL_SIZE = 20
