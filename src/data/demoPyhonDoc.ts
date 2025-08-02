export const pythonStudyMaterial: string = `Day 1: Getting Started: Python Setup & Your First Program 

Lesson Goal: Set up your programming environment and write your first simple Python program. 

Today's Commitment: Approximately 2 hours. 

Activities Breakdown: 

(30 mins) Reading: Introduction & Setup 

(60 mins) Reading & Practice: Core Concepts - Variables, Data Types, and I/O 

(45 mins) Coding Exercise: Personal Greeting App 

(15 mins) Review: Daily Quiz 

 

(30 mins) Reading: Introduction & Setup 

Welcome to Day 1! Today, we lay the groundwork for everything to come. 

What are Data Structures and Algorithms (DSA)? 

Imagine you have a massive library of books. 

A Data Structure is how you organize the books. You could stack them in a pile (a "stack"), line them up on a shelf (an "array" or "list"), or create a catalog system that tells you exactly which aisle and shelf a book is on (a "hash map"). The organization method you choose affects how easily you can find, add, or remove books. 

An Algorithm is the step-by-step process you use to find a book. A simple algorithm might be to start at the first shelf and check every single book until you find the one you want. A better algorithm might be to use the library's catalog to go directly to the right location. 

In programming, DSA is the study of how to organize data efficiently and the step-by-step procedures to manipulate that data to solve problems. Mastering DSA is crucial for writing efficient, scalable, and powerful software. 

Setting Up Your Python Environment 

We'll use Python for this course because its syntax is clean and beginner-friendly. 

Install Python: 

Go to the official Python website at python.org. 

Navigate to the "Downloads" section. It should automatically suggest the correct version for your operating system (Windows, macOS, Linux). 

Download the latest stable version (e.g., Python 3.12.x). 

Run the installer. Important: On Windows, make sure to check the box that says "Add Python to PATH" during installation. This allows you to run Python from your computer's command line or terminal. 

Verify the Installation: 

Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux). 

Type the following command and press Enter: 

Bash 

python --version 
 

You should see the Python version you just installed, like Python 3.12.4. If you see an error, the installation might not have worked correctly, or it wasn't added to your PATH. 

How to Run a Python Program: 

Create a file named hello.py. You can use any basic text editor like Notepad (Windows) or TextEdit (macOS). 

Inside the file, type: print("Hello, World!") 

Save the file. 

In your terminal, navigate to the directory where you saved hello.py. 

Run the script with the command: python hello.py 

You should see Hello, World! printed in your terminal. Congratulations, you're a programmer! 

 

(60 mins) Reading & Practice: Core Concepts - Variables, Data Types, and I/O 

Now let's learn the basic building blocks of a program. 

Variables 

A variable is like a labeled box where you can store a piece of information. You can change the contents of the box, hence the name "variable." 

In Python, you create a variable by giving it a name and using the equals sign (=) to assign it a value. 

Python 

# 'name' is the variable, and "Alice" is the value. 
name = "Alice" 
age = 30 
# You can print variables to see their value. 
print(name) # Output: Alice 
print(age)  # Output: 30 
 

Data Types 

Every value in Python has a "type." Here are the most common basic ones: 

String (str): Textual data. You define strings using single (') or double (") quotes. 

greeting = "Hello there!" 

Integer (int): Whole numbers, without decimals. 

user_count = 100 

Float (float): Numbers with decimals. 

price = 19.99 

Boolean (bool): Represents truth values. It can only be True or False. 

is_active = True 

Python is dynamically typed, which means you don't have to declare the type of a variable. Python figures it out for you. You can check a variable's type with the type() function. 

Python 

item = "Laptop" 
print(type(item)) # Output: <class 'str'> 
 
item = 5 
print(type(item)) # Output: <class 'int'> 
 

Notice how we can assign a new value of a different type to the same variable item. 

Input/Output (I/O) 

Your program needs to interact with the user. 

Output: We've already used the print() function to display output to the screen. 

Input: The input() function prompts the user to enter text and captures what they type. It always returns the data as a string. 

Python 

# Prompts the user and waits for them to type something and press Enter. 
user_name = input("Please enter your name: ") 
print("Welcome, " + user_name + "!") # We use '+' to combine strings. 
 

If you need a number from the user, you must convert the string from input() into a number type (int or float). 

Python 

age_str = input("How old are you? ") 
# The 'age_str' variable holds a string, e.g., "25" 
# We must convert it to an integer to do math with it. 
age_int = int(age_str) 
 
# Now we can perform calculations 
years_until_100 = 100 - age_int 
print("You will be 100 in", years_until_100, "years.") 
 

 

(45 mins) Coding Exercise: Personal Greeting App 

Let's build a simple app that uses everything we've learned. 

Goal: Create a Python script that asks for the user's name and favorite hobby, and then prints a personalized message. 

Instructions: 

Create a new file named greeter.py. 

Inside the file, write comments to outline what you'll do: 

# 1. Greet the user and ask for their name 

# 2. Store their name in a variable 

# 3. Ask for their favorite hobby 

# 4. Store their hobby in a variable 

# 5. Print a personalized message 

Step 1 & 2: Use the input() function to ask for the user's name. Store the result in a variable called user_name. 

Step 3 & 4: Use the input() function again to ask for their favorite hobby. Store it in a variable called hobby. 

Step 5: Use the print() function to display a message that includes both variables. For example: "Nice to meet you, [Name]! I hear you like [Hobby]. That sounds fun!" 

Full Code Solution: 

Python 

# greeter.py 
 
# 1. Greet the user and ask for their name. 
# 2. Store their name in a variable. 
print("Hello! I'd like to get to know you.") 
user_name = input("What is your name? ") 
 
# 3. Ask for their favorite hobby. 
# 4. Store their hobby in a variable. 
hobby = input("What is your favorite hobby? ") 
 
# 5. Print a personalized message. 
# We use an f-string here, which is a modern way to format strings in Python. 
# Just put an 'f' before the opening quote and place variables in curly braces {}. 
print(f"Nice to meet you, {user_name}! I hear you like {hobby}. That sounds fun!") 
 

Run your script from the terminal: python greeter.py and test it out! 

 

(15 mins) Review: Daily Quiz 

What is the main difference between an int and a float data type? 

Which function is used to get text input from a user in the terminal? 

What will the following code print? 

Python 

x = 10 
y = "20" 
print(str(x) + y) 
 

Why is the Add Python to PATH option important during installation on Windows? 

Quiz Answers: 

An int is a whole number, while a float is a number with a decimal point. 

The input() function. 

1020. It converts the integer 10 to the string "10" and then concatenates (joins) it with the string "20". 

It allows you to run the python command from any directory in the terminal without having to type the full path to the Python executable. 

 `