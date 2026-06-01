'''number divisible by 3 and 5 both is fizzbuz;
   number divisible by 3 is fizz;
   number divisible by 5 is buzz;
'''

def fizzbuzz():
    n = int(input("Enter the number to print fizz buzz:"))
    for i in range (1 , n+1):
        if i % 3 == 0 and i % 5 ==0:
            print("fizzbuzz")
        elif i % 3 == 0 :
            print("fizz")
        elif  i % 5 ==0:
            print("buzz")
        else:
            print(i)

fizzbuzz()