'''
Q1. print this pattern
        * 
        * * 
        * * * 
        * * * * 
        * * * * *
'''
r = int(input("Enter the number of rows ro print right angle triangle :"))
for i in range (1, r+1):
    for j in range (1, i+1):
        print("*", end=" ")
    print()