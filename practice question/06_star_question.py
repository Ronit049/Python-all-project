'''
Docstring for practice question.06_star_question
            *
          * * *
        * * * * * 
      * * * * * * *
    * * * * * * * * * 
'''
rows = 5

for i in range(rows):
    # Print spaces
    for j in range(rows - i - 1):
        print(" ", end="")

    # Print stars
    for k in range(2 * i + 1):
        print("*", end=" ")

    print()
