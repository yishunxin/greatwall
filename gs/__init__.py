# -*-coding:utf8-*-
a = '[] Nov 20 01:00:06 g58kr-gs03-10001 G58KR_GameStatistic: [2020-11-20 01:00:06 +0900][lxtl],{"monster_count": 10, "ip": "118.46.235.73", "box_count": 4, "cluster": "10001", "diff": 3, "use_time": 221, "id": 19, "old_accountid": "11620547@gaea.win.163.com", "goal": "21-1", "app_channel": "gaea", "role_id": "1000101011482", "hero_awake_list": [[96, 0], [34, 0], [100, 0], [37, 1], [39, 4], [105, 0], [76, 4], [78, 0], [19, 0], [20, 4], [22, 4], [91, 0]], "score": 1200, "imitator": true, "vip_level": 3, "day": "2020-11-20 01:00:06", "account_id": "11620547@gaea.win.163.com", "hero_score_list": [[96, 50734], [34, 57850], [100, 64797], [37, 56592], [39, 85908], [105, 51739], [76, 83618], [78, 53341], [19, 52603], [20, 69243], [22, 66155], [91, 51920]], "hero_type_list": [[96, 3], [34, 3], [100, 6], [37, 6], [39, 2], [105, 6], [76, 4], [78, 2], [19, 6], [20, 1], [22, 5], [91, 2]], "role_name": "나스웨", "map_type": 1, "serverid": 1001, "coin": 1260, "win": 1, "role_level": 96, "udid": "ab3a871e87f79900", "server": "1001", "mac_addr": "00:00:00:00:00:00", "urs": "", "action": 2, "battle_time_list": [28, 41, 32, 39, 36, 27, 25, 104, 18, 34], "root": false}'


import re
p = re.compile(r'\"role_id\": \"(\d+)\"')
t=p.search(a)
print t.groups()