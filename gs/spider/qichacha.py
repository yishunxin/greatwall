# -*-coding:utf-8-*-
import time

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException


def excute():
	with open('danwei.txt', 'r') as f:
		lines = f.read().decode('utf8').split('\n')
		result = [item.split('\t') for item in lines]
	try:
		yanzhengma = False
		option = webdriver.ChromeOptions()
		option.headless=True
		option.add_argument(
			'--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"')
		driver = webdriver.Chrome(chrome_options=option)
		driver.get('https://www.qcc.com/user_login')
		try:
			driver.find_element_by_xpath('//*[@id="qrcodeLoginPanel"]/div[2]/div/div[3]/a[3]').click()
		except (NoSuchElementException) as e:
			print e
			driver.find_element_by_xpath('//*[@id="normalLoginPanel"]/div/div/div[3]/a[3]').click()
		driver.find_element_by_xpath('//*[@id="jump_login_url_a"]').click()
		driver.find_element_by_id('username').send_keys('17611160302')
		driver.find_element_by_id('password').send_keys('ysb247365ystx')
		driver.find_element_by_xpath('//*[@id="vForm"]/div[2]/div/ul/li[7]/div[1]/input').click()
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
			if item[1]:
				print 'processed',item
				continue
			driver.find_element_by_xpath('/html/body/header/div/div/a').click()
			driver.find_element_by_id('searchkey').send_keys(item[0])
			driver.find_element_by_xpath('//*[@id="indexSearchForm"]/div[1]/span/input').click()
			if driver.find_element_by_xpath('//*[@id="countOld"]').text == u'您的搜索词太宽泛，建议更换一下搜索词':
				print  u'您的搜索词太宽泛，建议更换一下搜索词',item[0]
				item[1] =  u'您的搜索词太宽泛，建议更换一下搜索词'
				item[2] =  u'您的搜索词太宽泛，建议更换一下搜索词'
				continue
			if int(driver.find_element_by_xpath('//*[@id="countOld"]/span').text)==0:
				print 'no_tag', item[0]
				item[1] = 'None'
				item[2] = 'None'
				continue
			plist = driver.find_element_by_xpath('//*[@id="search-result"]/tr[1]/td[3]').find_elements_by_tag_name('p')[::-1]
			addr=''
			for p in plist:
				if u'地址' in p.text:
					addr = p.text
					break
			item[1] = addr
			item[2] = driver.find_element_by_xpath('//*[@id="search-result"]/tr[1]/td[3]/a').text
			print item
	except Exception as e:
		raise Exception(e)
	finally:
		try:
			driver.close()
		except:
			pass
		with open('danwei.txt', 'wb') as f:
			for item in result:
				f.write('\t'.join(item).encode('utf8')+'\n')

if __name__ == '__main__':
	excute()
