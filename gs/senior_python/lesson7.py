import cProfile


def fibonacci(number):
	if number < 1:
		return 1
	else:
		return fibonacci(number - 1) + fibonacci(number - 2)


def work():
	print(fibonacci(32))
	print(fibonacci(33))


"""
         29860708 function calls (8 primitive calls) in 8.266 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    8.266    8.266 <string>:1(<module>)
        1    0.000    0.000    8.266    8.266 lesson7.py:10(work)
29860702/2    8.266    0.000    8.266    4.133 lesson7.py:3(fibonacci)
        1    0.000    0.000    8.266    8.266 {built-in method builtins.exec}
        2    0.000    0.000    0.000    0.000 {built-in method builtins.print}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}

"""
a = [None for item in range(50)]


def better_fibonacci(number):
	if a[number] is not None:
		return a[number]
	if number < 1:
		a[number] = 1
		return a[number]
	else:
		a[number] = better_fibonacci(number - 1) + better_fibonacci(number - 2)
		return a[number]


def work2():
	print(better_fibonacci(32))
	print(better_fibonacci(33))


if __name__ == '__main__':
	print('原始的运行结果：')
	cProfile.run("work()")
	print('优化后的运行结果：')
	cProfile.run("work2()")
