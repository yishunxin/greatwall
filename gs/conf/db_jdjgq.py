# -*- coding:utf-8 -*-
__author__ = 'yishunxin'

# 本地数据库
HOST = '127.0.0.1'
PORT = 3306
USER = 'jdjgq_user'
PASSWD = 'jdjgq_user_123!'
DB = 'jdjgq'

#线上
HOST = '182.61.51.31'
USER = 'shekinah'
PASSWD = 'shekinah@365'

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
