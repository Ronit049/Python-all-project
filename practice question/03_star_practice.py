'''
Q3. print this pattern
        * * * * *
        * * * * 
        * * * 
        * * 
        * 
'''
r = int(input("Enter the number of rows to print reverse triangle : "))
for i in range(r,0,-1):
    for j in range(i):
        print("*",end=" ")
    print()