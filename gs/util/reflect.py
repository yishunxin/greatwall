import sys
import types


def get_mod(module_path):
    try:
        mod = sys.modules[module_path]
        if not isinstance(mod, types.ModuleType):
            raise KeyError
    except KeyError:
        mod = __import__(module_path, globals(), locals(), [''])
        sys.modules[module_path] = mod
    return mod


def get_func(full_funcname):
    last_dot = full_funcname.rfind(u".")
    func_name = full_funcname[last_dot + 1:]
    mod_path = full_funcname[:last_dot]
    mod = get_mod(mod_path)
    r_func = getattr(mod, func_name)
    assert callable(r_func), u"%s is not callable." % full_funcname
    return r_func


def get_class(full_classname, parentclass=None):
    r_class = get_func(full_classname)
    if parentclass is not None:
        if not issubclass(r_class, parentclass):
            raise TypeError(u"%s is not a subclass of %s" %
                            (full_classname, parentclass))
    # Return a reference to the class itself, not an instantiated object.
    return r_class


def apply_fuc(obj, str_func, arr_args):
    obj_func = getattr(obj, str_func)
    return apply(obj_func, arr_args)


def get_object(full_classname):
    clazz = get_class(full_classname)
    return clazz()


if __name__ == '__main__':
    # aa = getObject("common.reflect.print_test")
    # setattr(aa, 'teacher_id', 1)
    # print aa.teacher_id
    args = {"1": "aaaa", "2": "aaaaaaawq", "3": "aaqq"}
    apply_fuc(get_object("common.reflect.Person"), "print_test", [])
