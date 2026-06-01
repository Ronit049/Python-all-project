'''
Docstring for practice question.05_star_question
5 4 3 2 1 
4 3 2 1
3 2 1 
2 1 
1   
'''
r = 5
for i in range (r,0,-1):
    for j in range(i,0,-1):
        print(j, end=" ")
    print()


    r = 5
for i in range (r,0,-1):
    for j in range(i):
        print(j, end=" ")
    print()