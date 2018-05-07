# -*- coding:utf-8 -*-
import paramiko
import os

G_HOST = '139.196.105.107'
G_PORT = 6000
G_USER = 'gemini'
G_PASSWORD = '*gemini2012'

def sftp_upload(local, remote, host=G_HOST, port=G_PORT, username=G_USER, password=G_PASSWORD):
    print 'sftp upload {} to {}'.format(local, remote)
    sf = paramiko.Transport((host, port))
    sf.connect(username=username, password=password)
    sftp = paramiko.SFTPClient.from_transport(sf)
    try:
        if os.path.isdir(local):  # 判断本地参数是目录还是文件
            for f in os.listdir(local):  # 遍历本地目录
                sftp.put(os.path.join(local, f), os.path.join(remote, f))  # 上传目录中的文件
        else:
            sftp.put(local, os.path.join(remote, os.path.basename(local)))  # 上传文件
    except Exception, e:
        print('upload exception:', e)
    sf.close()

def sftp_download(local, remote, host=G_HOST, port=G_PORT, username=G_USER, password=G_PASSWORD):
    sf = paramiko.Transport((host, port))
    sf.connect(username=username, password=password)
    sftp = paramiko.SFTPClient.from_transport(sf)
    try:
        if os.path.isdir(local):  # 判断本地参数是目录还是文件
            for f in sftp.listdir(remote):  # 遍历远程目录
                sftp.get(os.path.join(remote + f), os.path.join(local + f))  # 下载目录中文件
        else:
            sftp.get(remote, local)  # 下载文件
    except Exception, e:
        print('download exception:', e)
    sf.close()



if __name__ == '__main__':
    host = '192.168.1.125'  # 主机
    port = 22  # 端口
    username = 'work'  # 用户名
    password = 'nb2018'  # 密码
    local = 'd:/Desktop_C/share/access_20180109.log'
    remote = '/home/work'  # 远程文件或目录，与本地一致，当前为linux目录格式
    sftp_upload(local, remote, host, port, username, password)  # 上传
    # sftp_download(host,port,username,password,local,remote)#下载
