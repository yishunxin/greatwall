class Solution(object):
    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: int
        """
        result = 0
        t_list = {}
        for i in range(len(s)):
            if s[i] not in t_list:
                t_list[s[i]] = 1
            else:
                result+=2
                t_list.pop(s[i])
        if t_list:
            result+=1
        return result

if __name__ == '__main__':
    print (ascii('1')+ascii('2'))
    p
    pass