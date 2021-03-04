# -*-coding:utf8-*-
def load_config():
    with open('config.txt', 'r') as f:
        data = f.readlines()
        data = [item.strip() for item in data if item]
        config = {}
        config['date'] = data[1]
        group = []
        mids = []
        for item in data[3:]:
            mid,small,name = item.split('-')
            if mid not in mids:
                group.append({'name':mid,'child':[]})
            child = group[-1]['child']
            child.append([]) 
        pass


def run():
    config = load_config()
    pass


if __name__ == '__main__':
    run()
