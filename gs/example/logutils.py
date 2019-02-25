import logging

class logger:
    def __init__(self, name):
        self.log = logging.getLogger(name)
        self.log.setLevel(logging.DEBUG)

        fmt = '%(asctime)s %(thread)d|%(threadName)s %(filename)s:%(lineno)s %(levelname)s %(name)s :%(message)s'
        formatter = logging.Formatter(fmt)

        ch = logging.StreamHandler()
        ch.setFormatter(formatter)
        ch.setLevel(logging.DEBUG)
        fh = logging.FileHandler('jiayuan.log')
        fh.setFormatter(formatter)
        fh.setLevel(logging.DEBUG)
        
        self.log.addHandler(fh)
        self.log.addHandler(ch)

    def get_logger(self):
        return self.log

if __name__ == '__main__':
    jiayuan = logger('jiayuan').get_logger()
    jiayuan.info('hey')
    jiayuan.debug('jdskfj')
    jiayuan.error('jdskfj')
