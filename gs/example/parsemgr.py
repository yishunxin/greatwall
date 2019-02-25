#-*- encoding:UTF-8 -*-
import re

class parsemgr:
    def __init__(self, page):
        self.page = page
        self.uid = 0
        self.nickname = ''
        self.member_dj = []
        self.star_number = 0
        self.honesty_lvl = []
        self.charm_value = 0
        self.brief_info = ''
        self.member_info_map = {}
        self.self_intro = ''
        self.hobbies = {}
        self.labels = []
        self.claims = {}
        self.habbits = {}
        self.salary = {}
        self.work_study = {}
        self.marriage_concept = {}

    def get_id_nickname(self):
        pattern = re.compile(u'<title>个人资料_(\w+)（佳缘ID:(\d+)）的个人空间_世纪佳缘交友网</title>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            self.nickname = result.group(1)
            self.uid = result.group(2)

    def get_member_dj(self):
        pattern = re.compile(u'<span class="member_dj">(.*?)</span>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            member_dj = result.group(1)
            pattern2 = re.compile(u'title="([\S ]+?)"', re.U | re.S)
            self.member_dj = pattern2.findall(member_dj)
            if len(self.member_dj) == 0:
                self.member_dj = [member_dj]

    def get_honesty_level(self):
        self.star_number = self.page.count(u'src="http://images.jiayuan.com/w4/profile/i/star_icon.gif"')
        pattern = re.compile(u'<span class="member_ico">(.*?)</span>', re.U | re.S)
        result = pattern.findall(self.page)
        pattern2 = re.compile(u'title="([\S ]+?)"', re.U | re.S)
        for item in result:
            honesty = pattern2.findall(item)
            for h in honesty:
                self.honesty_lvl.append(re.sub(u'&nbsp;', '', h.strip()))

    def get_charm_value(self):
        pattern = re.compile(u'<h6>(\d+)</h6>\s*<p>魅力值</p>', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            self.charm_value = int(result.group(1).strip())

    def get_brief_info(self):
        pattern = re.compile(u'<h6 class="member_name">(.*?)<', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            self.brief_info = result.group(1)

    def get_member_info_map(self):
        pattern = re.compile(u'<ul class="member_info_list fn-clear">(.*?)</ul>', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            member_info_list = result.group(1)
            pattern2 = re.compile(u'<div class="fl f_gray_999">(\w+)：</div>\s*<div class="fl pr">.*?>(.*?)</em>', re.S | re.U)
            result = pattern2.findall(member_info_list)
            for item in result:
                key,val = item
                self.member_info_map[key] = val

    def get_self_intro(self):
        pattern = re.compile(u'<div class="js_text">(.*?)</div>', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            self.self_intro = result.group(1).strip()

    def get_hobbies(self):
        pattern = re.compile(u'<span\s*title="(\w+)"></span>(.*?)</li>', re.S | re.U)
        result = pattern.findall(self.page)
        for item in result:
            catagory,specific = item
            if self.hobbies.has_key(catagory.strip()):
                self.hobbies[catagory.strip()].append(specific.strip())
            else:
                self.hobbies[catagory.strip()] = []
                self.hobbies[catagory.strip()].append(specific.strip())

    def get_labels(self):
        pattern = re.compile(u'<div\s*class="pag_list_grey_c"\s*id="\d+">(.*?)</div>', re.S | re.U)
        result = pattern.findall(self.page)
        for item in result:
            self.labels.append(item.strip())

    def get_claims(self):
        pattern = re.compile(u'<h4>她的择偶要求</h4>\s*<ul class="js_list fn-clear">(.*?)</ul>', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            claims = result.group(1)
            pattern2 = re.compile(u'<li class="fn-clear">\s*<span>([ \S]+)：</span>\s*<div class="[\S]+">([ \S]+)</div>\s*</li>', re.S | re.U)
            claim_list = pattern2.findall(claims)
            for item in claim_list:
                key,val  = item
                self.claims[re.sub(u'&nbsp;', '', key.strip())] = val.strip()

    def get_habbits(self):
        pattern = re.compile(u'<h6 class="yh">嗜好习惯</h6>\s*<ul class="js_list fn-clear">(.*?)</ul>', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            habbits = result.group(1)
            pattern2 = re.compile(u'<li class="fn-clear">\s*<span>([\S ]+)：</span>\s*<div class="ifno_r_con"><em[\S ]*?>([\S ]+)</em>', re.S | re.U)
            habbits_list = pattern2.findall(habbits)
            for item in habbits_list:
                key,val  = item
                self.habbits[re.sub(u'&nbsp;', '', key.strip())] = val.strip()

        house_keeping_pattern = re.compile(u'<div class="js_tit yh">家务</div>(.*?)</dl>', re.U | re.S)
        result = house_keeping_pattern.search(self.page)
        if result is not None:
            house_keeping_content = result.group(1)
            pattern = re.compile(u'<dd class="cur" >(\w+)</dd>', re.U | re.S)
            level = pattern.search(house_keeping_content)
            if level is not None:
                self.habbits[u'家务'] = level.group(1)
        pattern = re.compile(u'家务分配：</span>.*?<em[\S ]*?>(.*?)</em>', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            self.habbits[u'家务分配'] = result.group(1)

        pattern = re.compile(u'<div class="js_tit yh">宠物</div>(.*?)</dl>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            house_keeping_content = result.group(1)
            pattern = re.compile(u'<dd class="cur" >(\w+)</dd>', re.U | re.S)
            level = pattern.search(house_keeping_content)
            if level is not None:
                self.habbits[u'宠物'] = level.group(1)
        pattern = re.compile(u'关于宠物：</span>.*?<em[\S ]*?>(.*?)</em>', re.S | re.U)
        result = pattern.search(self.page)
        if result is not None:
            self.habbits[u'关于宠物'] = result.group(1)

    def get_salary(self):
        pattern = re.compile(u'<h4>经济实力</h4>\s*<ul class="js_list fn-clear">(.*?)</ul>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            salary = result.group(1)
            pattern2 = re.compile(u'<li class="fn-clear">\s*<span>([ \S]+)：</span>\s*<div class="[\S ]*?">([\S ]+)</div>\s*</li>', re.S | re.U)
            salary_list = pattern2.findall(salary)
            for item in salary_list:
                key,val  = item
                pattern2 = re.compile(u'<em[\S ]+?>([\S ]+)</em>', re.S | re.U)
                tmp = pattern2.search(val)
                if tmp is None:
                    self.salary[re.sub(u'&nbsp;', '', key.strip())] = val.strip()
                else:
                    self.salary[re.sub(u'&nbsp;', '', key.strip())] = tmp.group(1).strip()

    def get_work_study(self):
        pattern = re.compile(u'<h6 class="yh">工作</h6>\s*<ul class="js_list fn-clear">(.*?)</ul>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            work = result.group(1)
            pattern2 = re.compile(u'<li class="fn-clear">\s*<span>([ \S]+)：</span>\s*<div class="ifno_r_con"><em[\S ]*?>([ \S]+)</em></div>\s*</li>', re.S | re.U)
            work_list = pattern2.findall(work)
            for item in work_list:
                key,val  = item
                self.work_study[re.sub(u'&nbsp;', '', key.strip())] = val.strip()
                
        pattern = re.compile(u'<h6 class="yh">学习</h6>\s*<ul class="js_list fn-clear">(.*?)</ul>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            study = result.group(1)
            pattern2 = re.compile(u'<li class="fn-clear">\s*<span>([ \S]+)：</span>\s*<div class="[\S ]*?"><em[\S ]*?>([ \S]+)</em></div>\s*</li>', re.S | re.U)
            study_list = pattern2.findall(study)
            for item in study_list:
                key,val  = item
                self.work_study[re.sub(u'&nbsp;', '', key.strip())] = val.strip()

    def get_marriage_concept(self):
        pattern = re.compile(u'<h6 class="yh">关于自己</h6>\s*<ul class="js_list fn-clear">(.*?)</ul>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            about_self = result.group(1)
            pattern2 = re.compile(u'<li class="fn-clear">\s*<span>([ \S]+)：</span>\s*<div class="[\S ]*?"><em[\S ]*?>([ \S]+)</em></div>\s*</li>', re.S | re.U)
            about_self_list = pattern2.findall(about_self)
            for item in about_self_list:
                key,val  = item
                self.marriage_concept[re.sub(u'&nbsp;', '', key.strip())] = val.strip()
                
        pattern = re.compile(u'<h6 class="yh mt5">关于家庭</h6>\s*<ul class="js_list fn-clear">(.*?)</ul>', re.U | re.S)
        result = pattern.search(self.page)
        if result is not None:
            about_family = result.group(1)
            pattern2 = re.compile(u'<li class="fn-clear">\s*<span>([ \S]+)：</span>\s*<div class="[\S ]*?"><em[\S ]*?>([ \S]+)</em></div>\s*</li>', re.S | re.U)
            about_family_list = pattern2.findall(about_family)
            for item in about_family_list:
                key,val  = item
                self.marriage_concept[re.sub(u'&nbsp;', '', key.strip())] = val.strip()

    def get_all_info(self):
        self.get_id_nickname()
        self.get_member_dj()
        self.get_honesty_level()
        self.get_charm_value()
        self.get_brief_info()
        self.get_member_info_map()
        self.get_self_intro()
        self.get_hobbies()
        self.get_labels()
        self.get_claims()
        self.get_habbits()
        self.get_salary()
        self.get_work_study()
        self.get_marriage_concept()
        
if __name__ == '__main__':
    page = ''
    with open('37620742.html', 'r') as f:
        page = f.read().decode('UTF-8')

    mgr = parsemgr(page)
    mgr.get_all_info()
