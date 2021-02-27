# -*-coding:utf8-*-
def solution(input_str):
	lower = {}
	result = []
	nums = []
	for index in range(len(input_str)):
		char = input_str[index]
		if char.islower():
			if char not in lower:
				lower[char] = len(result)
				result.append(char)
			else:
				result[lower[char]] = ''
		elif char.isdigit():
			nums.append(char)
		else:
			result.append(char.lower())
	result.extend(nums[::-1])
	return ''.join(result)


if __name__ == '__main__':
	print solution('abc1SHHjj23kLS99 2kkka')
