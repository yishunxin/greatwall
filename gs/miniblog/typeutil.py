# -*- coding: utf-8 -*-

import datetime
import operator
import types
from decimal import Decimal

SEQUENCES = (list, set, tuple)
SEQUENCES_SET = set(SEQUENCES)
PRIMITIVES = {bool, float, int, str}
TIMES = {datetime.date, datetime.datetime, datetime.time}


def is_primitive(obj):
    if obj is None:
        return True
    elif type(obj) in PRIMITIVES:
        return True
    return False


def is_decimal(obj):
    return type(obj) is Decimal


def is_bytes(obj):
    return type(obj) is bytes


def is_type(obj):
    return isinstance(obj, type)



def is_object(obj):
    return (isinstance(obj, object) and
            not isinstance(obj, (type, types.FunctionType)))


def is_dictionary(obj):
    return type(obj) is dict or (hasattr(obj, '__class__') and
                                 issubclass(obj.__class__, dict) and not is_dictionary(obj))


def is_sequence(obj):
    return type(obj) in SEQUENCES_SET or (
        hasattr(obj, '__class__') and (issubclass(obj.__class__, SEQUENCES)) and not is_sequence(obj))


def is_list(obj):
    return type(obj) is list


def is_time(obj):
    return type(obj) in TIMES


def translate_module_name(module):
    if module == 'builtins' or module == 'exceptions':
        return '__builtin__'
    else:
        return module


def is_function(obj):
    if type(obj) in (types.FunctionType,
                     types.MethodType,
                     types.LambdaType,
                     types.BuiltinFunctionType,
                     types.BuiltinMethodType):
        return True
    if not hasattr(obj, '__class__'):
        return False
    module = translate_module_name(obj.__class__.__module__)
    name = obj.__class__.__name__
    return (module == '__builtin__' and
            name in ('function',
                     'builtin_function_or_method',
                     'instancemethod',
                     'method-wrapper'))


def is_module_function(obj):
    return (hasattr(obj, '__class__') and
            isinstance(obj, types.FunctionType) and
            hasattr(obj, '__module__') and
            hasattr(obj, '__name__') and
            obj.__name__ != '<lambda>')



def is_picklable(name, value):
    return is_module_function(value) or not is_function(value)


def itemgetter(obj, getter=operator.itemgetter(0)):
    return str(getter(obj))
