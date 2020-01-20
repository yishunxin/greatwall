# -*-coding:utf8-*-
class BTree(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def list2tree(t_list):
    """
    将列表转为二叉树
    :param t_list:
    :return:
    """
    if not t_list:
        return None
    root = BTree(t_list.pop(0))
    tree_list = [root]
    while t_list:
        cur_node = tree_list[0]
        if cur_node.left and cur_node.right:
            tree_list.pop(0)
            cur_node = tree_list[0]
        if not cur_node.left:
            cur_node.left = BTree(t_list.pop(0))
            tree_list.append(cur_node.left)
        else:
            cur_node.right = BTree(t_list.pop(0))
            tree_list.append(cur_node.right)
    return root


def pre_order(t_tree):
    """
    迭代方式的二叉树前序遍历
    :param t_tree:
    :return list
    """
    if not t_tree:
        return []
    tree_list = [t_tree]
    result = []
    while tree_list:
        cur_node = tree_list.pop(0)
        result.append(cur_node.val)
        if cur_node.right:
            tree_list.insert(0, cur_node.right)
        if cur_node.left:
            tree_list.insert(0, cur_node.left)
    return result


def pre_order_by_recur(t_tree):
    """
    递归方法二叉树前序遍历
    :param t_tree:
    :return:list
    """
    result = []

    def myrecur(x):
        if not x:
            return
        result.append(x.val)
        myrecur(x.left)
        myrecur(x.right)

    myrecur(t_tree)
    return result


def mid_order(t_tree):
    #TODO 不会
    """
    二叉树的中序遍历：迭代方法
    :param t_tree:
    :return:
    """
    if not t_tree:
        return []
    tree_list = [t_tree]
    result = []
    while result:
        cur_node = result.pop()
        tree_list.append()
        if cur_node.left:
            tree_list.append(cur_node.left)
        if cur_node.right:
            tree_list.append(cur_node.right)


def mid_order_by_recur(t_tree):
    """
    二叉树的中序遍历：递归方法
    :param t_tree:
    :return:
    """
    result = []
    def myrecur(x):
        if not x:
            return
        if x.left:
            myrecur(x.left)
        result.append(x.val)
        myrecur(x.right)
    myrecur(t_tree)
    return result

def post_order_by_recur(in_tree):
    """
    二叉树的后序遍历：递归方法
    :param in_tree:
    :return:
    """
    result = []
    def myrecur(x):
        if not x:
            return
        if x.left:
            myrecur(x.left)
        if x.right:
            myrecur(x.right)
        result.append(x.val)
    myrecur(in_tree)
    return  result

def post_order(in_tree):
    """
    二叉树遍历：迭代方法
    :param in_tree:
    :return:
    """
    tree_stack = [in_tree]
    result = []
    while tree_stack:
        cur_node = tree_stack.pop(0)
        result.insert(0,cur_node.val)
        if cur_node.left:
            tree_stack.insert(0,cur_node.left)
        if cur_node.right:
            tree_stack.insert(0,cur_node.right)
    return result


if __name__ == '__main__':
    mytree = list2tree([1, 2, 3, 4,5,6,7,8,9,10])
    # print(pre_order(mytree))
    print (post_order_by_recur(mytree))
    print (post_order(mytree))
    pass
