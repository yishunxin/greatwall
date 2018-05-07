# -*- coding:utf-8 -*-
import logging
import logging.handlers

from gs.conf import logger as logconf, db_zhenai as dbconf


def init():
    if dbconf.SQLALCHEMY_ECHO:
        return
    logging.basicConfig(level=logconf.LEVEL, format=logconf.FORMAT, datefmt=logconf.DATE_FMT, filemode='w+')
    logger = logging.getLogger()
    trfh = logging.handlers.TimedRotatingFileHandler('logs/' + logconf.LOGNAME + '.log', 'D', 1, 10)
    trfh.setFormatter(logging.Formatter(logconf.FORMAT))
    logger.addHandler(trfh)
