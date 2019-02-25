#-*- encoding:UTF-8 -*-
import sqlite3
import os
import time
import logutils

jiayuan_create_table = {u'key_info':u'''CREATE TABLE [key_info] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[nickName] varchar(40) NULL,
[charm] integer default '0' NULL,
[member] varchar(40) NULL,
[star] integer default '0' NULL,
[honesty] varchar(50) NULL,
[brief] varchar(100) NULL,
[degree] varchar(40) NULL,
[height] varchar(40) NULL,
[car] varchar(40) NULL,
[income] varchar(40) NULL,
[house] varchar(40) NULL,
[weight] varchar(40) NULL,
[constellation] varchar(40) NULL,
[nation] varchar(40) NULL,
[zodiac] varchar(40) NULL,
[blood] varchar(40) NULL
)''',
                    u'self_evaluation':u'''CREATE TABLE [self_evaluation] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[introduction] varchar(1000) NULL,
[hobby] varchar(1000) NULL,
[labels] varchar(1000) NULL
)''',
                        u'claim':u'''CREATE TABLE [claim] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[age] varchar(40) NULL,
[height] varchar(40) NULL,
[nation] varchar(40) NULL,
[degree] varchar(40) NULL,
[album] varchar(40) NULL,
[marriage] varchar(40) NULL,
[area] varchar(40) NULL,
[honesty] varchar(40) NULL
)''',
                        u'lifestyle':u'''CREATE TABLE [lifestyle] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[smoking] varchar(40) NULL,
[drinking] varchar(40) NULL,
[exercise] varchar(40) NULL,
[diet] varchar(40) NULL,
[shopping] varchar(40) NULL,
[religion] varchar(40) NULL,
[rest] varchar(40) NULL,
[socialClass] varchar(40) NULL,
[maxConsume] varchar(40) NULL,
[houseKeeping] varchar(40) NULL,
[houseArrange] varchar(40) NULL,
[lovePet] varchar(40) NULL,
[aboutPet] varchar(40) NULL
)''',
                        u'salary':u'''CREATE TABLE [salary] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[income] varchar(50)  NULL,
[house] varchar(50)  NULL,
[car] varchar(50)  NULL,
[concept] varchar(400)  NULL,
[invest] varchar(100)  NULL,
[debt] varchar(100)  NULL
)''',
                        u'career':u'''CREATE TABLE [career] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[job] varchar(40) NULL,
[company] varchar(40) NULL,
[companyType] varchar(40) NULL,
[welfare] varchar(40) NULL,
[workState] varchar(40) NULL,
[workChange] varchar(40) NULL,
[careerFamily] varchar(40) NULL,
[workAbroad] varchar(40) NULL,
[school] varchar(40) NULL,
[major] varchar(40) NULL,
[language] varchar(40) NULL
)''',
                        u'marriage':u'''CREATE TABLE [marriage] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[place] varchar(40) NULL,
[hukou] varchar(40) NULL,
[nationality] varchar(40) NULL,
[personality] varchar(40) NULL,
[humor] varchar(40) NULL,
[temper] varchar(40) NULL,
[emotion] varchar(40) NULL,
[wantKid] varchar(40) NULL,
[whenMarry] varchar(40) NULL,
[yiDiLian] varchar(40) NULL,
[idealMarriage] varchar(40) NULL,
[liveWithPoPo] varchar(40) NULL,
[ranking] varchar(40) NULL,
[parent] varchar(40) NULL,
[siblings] varchar(40) NULL,
[parentEconomy] varchar(40) NULL,
[parentHealth] varchar(40) NULL,
[parentWork] varchar(40) NULL
)''',
                        'status':'''CREATE TABLE [status] (
[uid] integer  UNIQUE NOT NULL PRIMARY KEY,
[download] boolean DEFAULT '0' NULL
)'''}

attr_map = {u'学历':'degree', u'身高':'height', u'购车':'car', \
            u'月薪':'income', u'住房':'house', u'体重':'weight', \
            u'星座':'constellation', u'民族':'nation', u'属相':'zodiac', \
            u'血型':'blood', u'年龄':'age', \
            u'相册':'album', u'婚姻状况':'marriage', \
            u'居住地':'area', u'诚信':'honesty', u'吸烟':'smoking', \
            u'饮酒':'drinking', u'锻炼习惯':'exercise', u'饮食习惯':'diet', \
            u'逛街购物':'shopping', u'宗教信仰':'religion', u'作息时间':'rest', \
            u'交际圈子':'socialClass', u'最大消费':'maxConsume', u'家务':'houseKeeping', \
            u'家务分配':'houseArrange', u'宠物':'lovePet', u'关于宠物':'aboutPet', \
            u'购房':'house', u'经济观念':'concept', u'投资理财':'invest', \
            u'外债贷款':'debt', u'职业职位':'job', u'公司行业':'company', \
            u'公司类型':'companyType', u'福利待遇':'welfare', u'工作状态':'workState', \
            u'调动工作可能性':'workChange', u'事业与家庭':'careerFamily', u'海外工作可能性':'workAbroad', \
            u'毕业院校':'school', u'专业类型':'major', u'语言能力':'language', \
            u'籍贯':'place', u'户口':'hukou', u'国籍':'nationality', \
            u'\u4e2a\u6027\u5f85\u5f81':'personality', u'幽默感':'humor', u'脾气':'temper', \
            u'对待感情':'emotion', u'是否要小孩':'wantKid', u'何时结婚':'whenMarry', \
            u'是否能接受异地恋':'yiDiLian', u'理想婚姻':'idealMarriage', u'愿与对方父母同住':'liveWithPoPo', \
            u'家中排行':'ranking', u'父母情况':'parent', u'兄弟姐妹':'siblings', \
            u'父母经济情况':'parentEconomy', u'父母医保情况':'parentHealth', u'父母的工作':'parentWork'}
dblogger = logutils.logger('db').get_logger()

class dbmgr:
    def __init__(self, db_file = 'jiayuan.db'):
        dblogger.debug('path： %s' % db_file)
        if os.path.exists(db_file):
            if not os.path.isfile(db_file):
                self.db_file = os.path.abspath(os.path.join(os.path.curdir, 'jiayuan.db'))
                with open(self.db_file, 'w') as f:
                    pass
            self.db_file = os.path.abspath(db_file)
        else:
            self.db_file = os.path.abspath(db_file)
            with open(self.db_file, 'w') as f:
                    pass
        self.conn = None
        while True:
            try:
                self.conn = sqlite3.connect(self.db_file, check_same_thread = False)
                self.__create_table()
                break
            except Exception,e:
                dblogger.error('create table failed %s' % str(e))
                time.sleep(10)

    def __create_table(self):
        try:
            cur = self.conn.cursor()
            cur.execute("select name from sqlite_master where type = 'table'")
            db_table_list = cur.fetchall()

            all_table = []
            for item in db_table_list:
                all_table.append(item[0])
            dblogger.debug('existing tables: %s' % str(db_table_list))
            for tbl_name,create_table_sql in jiayuan_create_table.iteritems():
                if tbl_name in all_table:
                    continue
                cur.execute(create_table_sql)
                dblogger.debug('create table: %s' % tbl_name)
            self.conn.commit()
            cur.close()
            dblogger.info('create tables success!')
            return True
        except Exception,e:
            dblogger.error('__create_table failed: %s' % str(e))
            return False

    def gen_key_info_insert(self, uid, nickName, charm, member, star, honesty, brief, key_info_map):
        insert = u'insert into key_info(uid, nickName, charm, member, star, honesty, brief'
        values = u"values(%s, '%s', %s, '%s', %s, '%s', '%s'" % (str(uid), nickName, str(charm), \
                                                        u';'.join(member), str(star), u';'.join(honesty), brief)
        for key,val in key_info_map.iteritems():
            insert = insert + u', ' + attr_map[key]
            values = values + (u", '%s'" % val)
        return insert + u') ' + values + u')'

    def gen_self_evaluation_insert(self, uid, evaluation, hobbies, labels):
        all_hobby = []
        for key,val in hobbies.iteritems():
            all_hobby.extend(val)
        insert = u"insert into self_evaluation(uid, introduction, hobby, labels) values(%s, '%s', '%s', '%s')" \
                 % (str(uid), evaluation, u';'.join(all_hobby), u';'.join(labels))
        return insert

    def gen_other_insert(self, uid, table_name, info_map):
        insert  = u'insert into %s (uid' % table_name
        values = u"values(%s" % str(uid)
        for key,val in info_map.iteritems():
            insert  = insert + u', ' + attr_map[key]
            values = values + (u", '%s'" % val)
        return insert + u') ' + values + u')'

    def delete_status(self, uid):
        dblogger.debug('delete uid: %s' % str(uid))
        try:
            cur = self.conn.cursor()
            cur.execute('delete from status where uid = %s' % str(uid))
            self.conn.commit()
            cur.close()
            dblogger.info('delete uid:%s success' % str(uid))
            return True
        except Exception,e:
            dblogger.error('delete_status failed: %s' % str(e))
            return False

    def insert_status(self, uid_list):
        dblogger.debug('insert uids: %s' % str(uid_list))
        try:              
            cur = self.conn.cursor()
            insert_list = []
            for uid in uid_list:
                cur.execute('select uid from status where uid = %s' % str(uid))
                a = cur.fetchone()
                if a is not None and int(uid) in a:
                    continue
                insert_list.append('insert into status(uid, download) values(%s, 0)' % str(uid))

            for ins in insert_list:
                cur.execute(ins)
            self.conn.commit()
            cur.close()
            dblogger.info('insert success')
            return True
        except Exception,e:
            dblogger.error('insert_status failed %s' % str(e))
            return False

    def change_status(self, uid, val):
        try:
            download = 0
            if val:
                download = 1
                
            cur = self.conn.cursor()
            cur.execute('select uid from status where uid = %s' % str(uid))
            a = cur.fetchone()
            if a is not None and int(uid) in a:
                cur.execute('delete from status where uid = %s' % str(uid))
            cur.execute('insert into status(uid, download) values(%s, %s)' % (str(uid), str(download)))
            self.conn.commit()
            cur.close()
            dblogger.debug('set %s status to %s success' % (str(uid), str(val)))
            return True
        except Exception,e:
            dblogger.error('change_status failed %s' % str(e))
            return False

    def select_undownload(self, num, id_list):
        try:
            cur = self.conn.cursor()
            cur.execute('select uid from status where download = 0')
            result = cur.fetchmany(num)
            for uid in result:
                id_list.append(uid[0])
            dblogger.debug('num: %s' % str(num))
            dblogger.debug('list: %s' % str(id_list))
            return True
        except Exception,e:
            dblogger.error('select_undownload failed %s' % str(e))
            return False

    def do_insert(self, parse):
        try:
            cur = self.conn.cursor()
            cur.execute('select uid from key_info where uid = %s' % str(parse.uid))
            a = cur.fetchone()
            if a is not None and int(parse.uid) in a:
                cur.execute('delete from key_info where uid = %s' % str(parse.uid))
            s = self.gen_key_info_insert(parse.uid, parse.nickname, parse.charm_value, \
                        parse.member_dj, parse.star_number, parse.honesty_lvl, parse.brief_info, parse.member_info_map)
            dblogger.debug(s)
            cur.execute(s)

            cur.execute('select uid from self_evaluation where uid = %s' % str(parse.uid))
            a = cur.fetchone()
            if a is not None and int(parse.uid) in a:
                cur.execute('delete from self_evaluation where uid = %s' % str(parse.uid))
            s = self.gen_self_evaluation_insert(parse.uid, parse.self_intro, parse.hobbies, parse.labels)
            dblogger.debug(s)
            cur.execute(s)

            cur.execute('select uid from claim where uid = %s' % str(parse.uid))
            a = cur.fetchone()
            if a is not None and int(parse.uid) in a:
                cur.execute('delete from claim where uid = %s' % str(parse.uid))
            s = self.gen_other_insert(parse.uid, 'claim', parse.claims)
            dblogger.debug(s)
            cur.execute(s)

            cur.execute('select uid from lifestyle where uid = %s' % str(parse.uid))
            a = cur.fetchone()
            if a is not None and int(parse.uid) in a:
                cur.execute('delete from lifestyle where uid = %s' % str(parse.uid))
            s = self.gen_other_insert(parse.uid, 'lifestyle', parse.habbits)
            dblogger.debug(s)
            cur.execute(s)

            cur.execute('select uid from salary where uid = %s' % str(parse.uid))
            a = cur.fetchone()
            if a is not None and int(parse.uid) in a:
                cur.execute('delete from salary where uid = %s' % str(parse.uid))
            s = self.gen_other_insert(parse.uid, 'salary', parse.salary)
            dblogger.debug(s)
            cur.execute(s)

            cur.execute('select uid from career where uid = %s' % str(parse.uid))
            a = cur.fetchone()
            if a is not None and int(parse.uid) in a:
                cur.execute('delete from career where uid = %s' % str(parse.uid))
            s = self.gen_other_insert(parse.uid, 'career', parse.work_study)
            dblogger.debug(s)
            cur.execute(s)

            cur.execute('select uid from marriage where uid = %s' % str(parse.uid))
            a = cur.fetchone()
            if a is not None and int(parse.uid) in a:
                cur.execute('delete from marriage where uid = %s' % str(parse.uid))
            s = self.gen_other_insert(parse.uid, 'marriage', parse.marriage_concept)
            dblogger.debug(s)
            cur.execute(s)
            self.conn.commit()
            cur.close()
        except Exception,e:
            dblogger.error('do_insert failed %s ' % str(e))
            return False     

if __name__ == '__main__':
    mgr = dbmgr(r'E:\jiayuan.db')

    import parsemgr
    page = ''
    with open('37620742.html', 'r') as f:
        page = f.read().decode('UTF-8')

    parse = parsemgr.parsemgr(page)
    parse.get_all_info()
    mgr.do_insert(parse)

    
