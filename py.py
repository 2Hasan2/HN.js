from turtle import *

# Set up the window and its attributes
setup(500, 500)
title("Turtle Keys")
bgcolor("yellow")

# Create our turtle
t = Turtle()
t.shape("turtle")
t.color("green")
t.width(3)
t.speed(0)

# Define the functions for our keys
def f():
    t.forward(50)

def l():
    t.left(90)

def r():
    t.right(90)

def b():
    t.backward(50)

def u():
    t.penup()

def d():
    t.pendown()

def p():
    t.color("purple")

def g():
    t.color("green")


# Tell the program which functions go with which keys
onkey(f, "Up")
onkey(l, "Left")
onkey(r, "Right")
onkey(b, "Down")
onkey(u, "u")
onkey(d, "d")
onkey(p, "p")
onkey(g, "g")

# This line "listens" for the key presses
listen()

# This line keeps the window open

mainloop()