# -*- coding:utf-8 -*-
from selenium import webdriver


def login():
    driver = webdriver.Chrome()
    driver.get('http://qzone.qq.com')
    driver.switch_to.frame('login_frame')
    driver.find_element_by_id('switcher_plogin').click()
    driver.find_element_by_id('u').clear()
    driver.find_element_by_id('u').send_keys('991007889')
    driver.find_element_by_id('p').clear()
    driver.find_element_by_id('p').send_keys('ysb247365ystx')
    driver.find_element_by_id('login_button').click()
    # driver.find_element_by_id('aMyFriends').click()
    # driver.switch_to.frame('app_canvas_frame')
    # driver.find_element_by_class_name('body > div.layout-app > div > div > div.layout-nav-friends > div > ul > li.item.item-current')
    # driver.find_element_by_class_name('layout-nav-friends')
    # driver.find_element_by_class_name()
    # driver.find_element_by_xpath('/html/body/div[1]/div/div/div[1]/div/ul/li[1]').click()
    # driver.find_element_by_id('mecarewho_list')
    driver.get('http://user.qzone.qq.com/317093217/photo/V11DhtoM1Xazmc/')
    driver.find_elements_by_xpath('//*[@id="js-module-container"]/div[1]/div[3]/div[1]/ul/li[1]/div/div[1]/a').click()


    print driver


if __name__ == '__main__':
    login()
    pass
