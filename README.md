# Simple Calculator

Project made to showcase my skills at handling arithmetic operations & event delegation.

# Requirement

Requires "Live Server" extension found on VS Code store.
You can get it here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

# Features & Usage

- Pretty straightforward functionality. Only works with 2 numbers (both can be floats), each one made of user's desired length.

- Can perform basic arithmetic operations such as:
    - Add
    - Subtract
    - Multiply
    - Divide 

- This is achieved with a method akin to string concatenation. It is done taking advantage of default array conversion made by JS, this is further explained in the code with a comment (see the "numberBtns" event).

>[!NOTE]
>Known limitations: The first number cannot be negative and as stated before, can't perform operations longer than 2 numbers at a time.
