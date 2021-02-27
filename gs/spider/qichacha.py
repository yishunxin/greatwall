# -*-coding:utf-8-*-
import time
import traceback

import pygame
import re
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.wait import WebDriverWait

from playsound import playsound

def excute():
	with open('danwei.txt', 'r') as f:
		lines = f.read().decode('utf8').split('\n')
		result = [item.split('\t') for item in lines]
	# 提前筛选
	# for i in range(len(result)):
	# 	item =result[i]
	# 	if len(item) == 0:
	# 		continue
	# 	if item[1] or item[2]:
	# 		continue
	# 	break
	# if i == len(result)-1:
	# 	return
	# print i
	try:
		yanzhengma = False
		option = webdriver.ChromeOptions()
		option.headless=False

		option.add_argument(
			'--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"')
		driver = webdriver.Chrome(chrome_options=option)
		driver.get('https://www.qcc.com/user_login')
		# try:
		# 	driver.find_element_by_xpath('//*[@id="qrcodeLoginPanel"]/div[2]/div/div[3]/a[3]').click()
		# except (NoSuchElementException) as e:
		# 	print e
		# 	driver.find_element_by_xpath('//*[@id="normalLoginPanel"]/div/div/div[3]/a[3]').click()
		# driver.find_element_by_xpath('//*[@id="jump_login_url_a"]').click()
		# driver.find_element_by_id('username').send_keys('17611160302')
		# driver.find_element_by_id('password').send_keys('ysb247365ystx')
		# driver.find_element_by_xpath('//*[@id="vForm"]/div[2]/div/ul/li[7]/div[1]/input').click()
		while driver.current_url != u'https://www.qcc.com/':
			print driver.current_url
			time.sleep(1)
		# 验证码
		if yanzhengma:
			driver.find_element_by_id('door').send_keys('P6m45')
			driver.find_element_by_xpath('//*[@id="vForm"]/div[2]/div/ul/li[7]/div[1]/input').click()

			# 授权
			driver.find_element_by_xpath('//*[@id="outer"]/div/div[2]/form/div/div[2]/div/p/a[1]').click()
			pass
		# 首页查询
		for item in result:
			if len(item)==0:
				continue
			if item[1] or item[2]:
				print 'processed',item
				continue
			print 1
			query_name = item[0]
			# 特殊处理
			#结尾是（）的，去掉（）
			groups = re.match(r'(.{2,})\(.+\)$',query_name)
			if groups:
				query_name = groups.groups()[0]
			bo,addr,real_name = doquery(driver,query_name)
			# while not bo and query_name:
			# 	query_name = query_name[:-1]
			# 	bo, addr, real_name = doquery(driver, query_name)
			item[1] = addr
			item[2] = real_name
			print item
	except Exception as e:
		print item
		traceback.print_exc()
	finally:
		pygame.mixer.init()
		track = pygame.mixer.music.load('Secret Garden.mp3')
		pygame.mixer.music.play(-1,0)
		raw_input()
		try:
			driver.close()
		except:
			pass
		with open('danwei.txt', 'wb') as f:
			for item in result:
				f.write('\t'.join(item).encode('utf8')+'\n')

def doquery(driver_ins,corp_name):
	corp_addr=''
	real_name = ''
	WebDriverWait(driver_ins, 10, 0.5, NoSuchElementException).until(
		lambda driver: driver.find_element_by_xpath('/html/body/header/div/div/a'))
	driver_ins.find_element_by_xpath('/html/body/header/div/div/a').click()
	WebDriverWait(driver_ins, 10, 0.5, NoSuchElementException).until(lambda driver: driver.find_element_by_id('searchkey'))
	driver_ins.find_element_by_id('searchkey').send_keys(corp_name)
	driver_ins.find_element_by_xpath('//*[@id="indexSearchForm"]/div[1]/span/input').click()
	# 分析结果页面
	WebDriverWait(driver_ins, 10, 0.5, NoSuchElementException).until(
		lambda driver: driver.find_element_by_xpath('//*[@id="countOld"]'))
	if driver_ins.find_element_by_xpath('//*[@id="countOld"]').text == u'您的搜索词太宽泛，建议更换一下搜索词':
		print  u'您的搜索词太宽泛，建议更换一下搜索词', corp_name
		corp_addr = u'您的搜索词太宽泛，建议更换一下搜索词'
		real_name = corp_name
		return True, corp_addr,real_name
	if int(driver_ins.find_element_by_xpath('//*[@id="countOld"]/span').text) == 0:
		print 'no_tag', corp_name
		return False, corp_addr, real_name
	WebDriverWait(driver_ins, 10, 0.5, NoSuchElementException).until(
		lambda driver: driver.find_element_by_xpath('//*[@id="search-result"]/tr[1]/td[3]').find_elements_by_tag_name(
			'p'))
	plist = driver_ins.find_element_by_xpath('//*[@id="search-result"]/tr[1]/td[3]').find_elements_by_tag_name('p')[::-1]
	for p in plist:
		if u'地址' in p.text:
			corp_addr = p.text
			break
	real_name = driver_ins.find_element_by_xpath('//*[@id="search-result"]/tr[1]/td[3]/a').text
	return True, corp_addr,real_name
if __name__ == '__main__':
	excute()
