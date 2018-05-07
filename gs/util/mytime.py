# -*- coding:utf-8 -*-
import calendar
import datetime
import time
import types
from datetime import timedelta, date

from dateutil.relativedelta import relativedelta

__author__ = 'weijingqi'

DEFAULT_TIME_FORMAT = '%Y-%m-%d %H:%M'
DEFAULT_TIME_FORMAT_CN = '%Y年%m月%d日 %H:%M'
FORMAT_YMDHMS = '%Y-%m-%d %H:%M:%S'
FORMAT_YMDHMS2 = '%Y%m%d%H%M%S'
FORMAT_YMD = '%Y-%m-%d'
FORMAT_YMD2 = '%Y%m%d'
FORMAT_YM_CN = '%Y年%m月'
FORMAT_HM = '%H:%M'
FORMAT_MD = '%m%d'
FORMAT_HMS = '%H:%M:%S'
FORMAT_YMD3 = '%Y/%m/%d'
FORMAT_YMD4 = '%d/%b/%Y'

def get_now_seconds():
    return int(time.time())

def get_now_datetime():
    return datetime.datetime.now()

def get_day_begin(busi_time=None):
    if busi_time is None:
        busi_time = get_now_datetime()
    else:
        busi_time = parse_time(busi_time)
    return datetime.datetime.combine(busi_time, datetime.time.min)


def get_day_end(busi_time=None):
    if busi_time is None:
        busi_time = get_now_datetime()
    else:
        busi_time = parse_time(busi_time)
    return datetime.datetime.combine(busi_time, datetime.time.max)


def get_year_begin():
    year = get_now_datetime().year
    return get_day_begin(mkday(year, 1, 1))


def get_year_end():
    year = get_now_datetime().year
    return get_day_end(mkday(year, 12, 31))

def get_day(busi_time=None):
    if busi_time is None:
        busi_time = get_now_datetime()
    else:
        busi_time = parse_time(busi_time)
    if isinstance(busi_time, datetime.datetime):
        return datetime.datetime.date(busi_time)
    return busi_time


def format_time(busi_time, default_format=DEFAULT_TIME_FORMAT):
    if not busi_time:
        return ''
    return busi_time if isinstance(busi_time, types.StringTypes) else busi_time.strftime(default_format)


def format_time_ymd(busi_time):
    return format_time(busi_time, FORMAT_YMD2)


def format_time_ymd2(busi_time):
    return format_time(busi_time, FORMAT_YMD)


def format_time_hm(busi_time):
    return format_time(busi_time, FORMAT_HM)


def add_delta(busi_time=None, **kwargs):
    if not busi_time:
        busi_time = get_now_datetime()
    return busi_time + datetime.timedelta(**kwargs)


def parse_time(busi_time, default_format=DEFAULT_TIME_FORMAT):
    if not busi_time:
        return None
    if not isinstance(busi_time, types.StringTypes):
        return busi_time

    try:
        return datetime.datetime.strptime(busi_time, default_format)
    except ValueError:
        try:
            return datetime.datetime.strptime(busi_time, FORMAT_YMD)
        except ValueError:
            try:
                return datetime.datetime.strptime(busi_time, FORMAT_YMDHMS)
            except ValueError:
                try:
                    return datetime.datetime.strptime(busi_time, FORMAT_YMD2)
                except ValueError:
                    try:
                        return datetime.datetime.strptime(busi_time, FORMAT_YMDHMS2)
                    except ValueError:
                        return None


'''
start_time: 2016-05-01
end_time: 2016-05-03
ret: 2016-05-01, 2016-05-02, 2016-05-03
'''
def days_between(start_time, end_time):
    start_time = parse_time(start_time)
    end_time = parse_time(end_time)
    dates = []
    t_start = start_time
    while format_time_ymd(t_start) <= format_time_ymd(end_time):
        dates.append(t_start)
        t_start = add_delta(t_start, days=1)
    return dates


weeks = [u'周一', u'周二', u'周三', u'周四', u'周五', u'周六', u'周日']


def format_week(busi_time):
    if not busi_time:
        return ''
    busi_time = parse_time(busi_time)
    return '%s%s' % (weeks[busi_time.weekday()], format_time(busi_time, '%m%d'))


def get_weekregion(day=None):
    if day is None:
        day = get_now_datetime()
    else:
        day = parse_time(day)
    if not day:
        return None, None
    day = parse_time(format_time_ymd(day))
    wd = day.weekday()
    return add_delta(day, days=0 - wd), get_day_end(add_delta(day, days=6 - wd))


def get_monthregion(day=None):
    if day is None:
        day = get_now_datetime()
    else:
        day = parse_time(day)
    if not day:
        return None, None
    day = parse_time(format_time_ymd(day))
    year = day.year
    month = day.month
    return datetime.datetime(year, month, 1), get_day_end(datetime.datetime(year, month, get_days_of_month(year, month)))


def format_meeting_time(busi_time):
    if not busi_time:
        return ''
    busi_time = parse_time(busi_time)
    return '%s%s' % (weeks[busi_time.weekday()], format_time(busi_time, '%m%d %H:%M'))


def num2datetime(t_num):
    return datetime.datetime.fromtimestamp(float(t_num))


def datetime2num(dt):
    try:
        return time.mktime(dt.timetuple())
    except Exception, e:
        print e
        return 0


def mkday(year, month, day):
    try:
        return datetime.datetime(int(year), int(month), int(day))
    except Exception, e:
        print e
        return None


def format_week2(busi_time):
    if not busi_time:
        return ''
    busi_time = parse_time(busi_time)
    return '%s' % weeks[int(busi_time.strftime('%w'))]


def latest_hour():
    now = get_now_datetime()
    now = add_delta(now, hours=1)
    now = add_delta(now, minutes=-now.minute)
    now = add_delta(now, seconds=-now.second)
    now = add_delta(now, microseconds=-now.microsecond)
    return now


def to_hm(seconds):
    seconds = int(seconds)
    t_str = ''
    h = seconds // 3600
    if h:
        t_str += str(h) + u'时'
    seconds %= 3600
    m = seconds // 60
    if m or h:
        t_str += str(m) + u'分'
    else:
        t_str += u'小于1分'
    return t_str


def to_hm2(seconds):
    seconds = int(seconds)
    h = seconds // 3600
    seconds %= 3600
    m = seconds // 60
    return h, m


def today():
    return date.today()


def get_day_of_day(n=0):
    return date.today() + timedelta(days=n)

def get_days_of_month(year, mon):
    return calendar.monthrange(year, mon)[1]

def get_lastday_of_month(year, mon):
    return format_time_ymd2(mkday(year, mon, get_days_of_month(year, mon)))

def get_today_month(n=0):
    t = get_now_datetime()
    return t + relativedelta(months=n)


if __name__ == '__main__':
    print get_monthregion()
    pass