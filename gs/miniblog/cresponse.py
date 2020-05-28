# -*- coding:utf-8 -*-
import recurjson


def common_json_response(**kwdata):
    return recurjson.encode(kwdata)


def common_json_entity(entity):
    return recurjson.encode(entity)


def common_json_entities(*args):
    return recurjson.encode(args)
