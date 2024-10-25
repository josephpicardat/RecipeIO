# RecipeIO

## Overview

RecipeIO is a full-stack web application developed by the House of Stark team to provide a platform where users can create, share, and organize their favorite recipes. This project was built as part of a group collaboration showcasing full-stack development skills. Users can log in, create recipe books, add recipes, and explore the community’s culinary creations.

<img src='./public/images/6-10-22_RIOscreenshot.png' alt='A screenshot of the homepage of House of Starks Project 2: RecipeIO'/>


## Features

- User Authentication: Users can sign up, log in, and manage their profiles.
- Recipe Management: Create, view, and manage personal recipes and recipe books.
- Community Recipes: Browse random recipes contributed by other users.
- Interactive UI: Responsive navigation with easy-to-use forms for recipe and book creation.


## Getting Started

Visit it on Heroku to try it out! <a target="_blank" rel="noopener noreferrer" href="https://recipeio-project2.herokuapp.com/login">Check it out here!</a>

To use RecipeIO, you can run the project locally by following the instructions below.

### Prerequisites

- Node.js: Make sure Node.js is installed. Download it from nodejs.org.
- MongoDB: Ensure you have MongoDB installed or access to a MongoDB instance.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/sorting_algorithm_visualizer.git
    cd sorting_algorithm_visualizer
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```
3. **Set up environment variables:**
Create a .env file in the root directory and configure the following:

    ```bash
    MONGO_URI=<your_mongo_db_uri>
    SESSION_SECRET=<your_session_secret>
    ```

4.	**Start the development server:**
    ```bash
    npm start
    ```

5.	**Visit the app locally:**
    Open your browser and navigate to http://localhost:3000.


## Usage

### Once logged in, users can:

1.	Create and Organize Recipes: Add recipes, input ingredients, provide instructions, and categorize them into books.
2.	Browse Recipes: View recipes created by other users or explore random selections.
3.	Manage Recipe Books: Create and organize personal recipe collections.
4.	Visual Feedback: Enjoy a smooth and responsive user experience across all devices.

### How to Create a Recipe

1.	Log in or sign up to access the main dashboard.
2.	Navigate to the recipe creation page from the navbar.
3.	Fill out the form with the recipe name, ingredients, instructions, and an optional image URL.
4.	Assign the recipe to a book (if none exist, create a new book first).
5.	Submit the form to add the recipe to your collection.

## Technologies

-	Frontend: HTML, CSS, JavaScript, Handlebars.js
-	Backend: Node.js, Express.js
-	Database: MongoDB
-	Authentication: Passport.js for user authentication

## Technologies in Detail

This project uses various technologies, and here’s what each does:

- Express.js: Provides a set of features for web and mobile applications. It’s used here to manage routes (e.g., GET, POST, DELETE) for books, users, and recipes.
- Sequelize: A promise-based Node.js ORM (Object-Relational Mapping) tool that supports various SQL-based databases. It is used here to manage database operations such as querying for books, recipes, and user information.
- Bcrypt.js: A password hashing library used to securely hash passwords in the user model and verify them during authentication.

### API Documentation for Book Routes

The Book Routes controller handles CRUD operations related to cookbooks (books) created by users. Below is a summary of the available routes.

####GET /books/

Description: Retrieve all cookbooks associated with the authenticated user.

- Request Type: GET
- Authentication: Required (withAuth middleware)
- Response: Renders the books template with a list of all cookbooks that the user has created.
- Error Handling: If there’s an error, it returns a status 500 with the error message.

Example Response:
```bash
{
  "bookData": [
    {
      "id": 1,
      "name": "Italian Recipes",
      "user_id": 3
    },
    {
      "id": 2,
      "name": "Vegan Recipes",
      "user_id": 3
    }
  ],
  "logged_in": true
}
```

#### GET /books/newbook

Description: Displays a form for creating a new cookbook.

- Request Type: GET
- Authentication: Required (withAuth middleware)
- Response: Renders the newBook template.
- Error Handling: If there’s an error, it returns a status 500.

#### POST /books/makenewbook

Description: Creates a new cookbook associated with the authenticated user.

- Request Type: POST
- Authentication: Required (withAuth middleware)
- Body Parameters:
    - name (string): The name of the new cookbook.
- Response: Redirects to the /books route after the book is created. Logs a success message in the console.
- Error Handling: If the book creation fails, it returns a status 400.

Example Success Log:
```bash
status: 'ok', message: Italian Recipes is created!
```

### User Model

The User model represents users in the system, and it includes fields for user credentials, authentication hooks for password hashing, and password validation.

Model Definition
```bash
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4],
        },
    },
}, {
    hooks: {
        beforeCreate: async(newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        beforeUpdate: async(updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});
```
#### Model Fields:

- id: Primary key, auto-incremented.
- first_name: User’s first name, required.
- last_name: User’s last name, required.
- username: Unique username, required.
- email: Must be a valid and unique email address, required.
- password: A hashed password, with a minimum length of 4 characters.

#### Hooks:

- beforeCreate: Automatically hashes the user’s password before storing it in the database.
- beforeUpdate: Hashes the password before an update if the password has changed.

#### Methods:

- checkPassword: A custom method for comparing a user’s login password to the hashed password in the database.

## QUESTIONS:

If you have any questions,

you can contact me via a message on LinkedIn at [josephpicardat](https://www.linkedin.com/in/josephpicardat/)

## CREDIT:

This project was made in 2022 by Group Two

This project was made through the contributions of:


<a target="_blank" rel="noopener noreferrer" href="https://github.com/alexyn26">Alexandra Najera</a>

<a target="_blank" rel="noopener noreferrer" href="https://github.com/Chueg">Andrew Johnson</a>

<a target="_blank" rel="noopener noreferrer" href="https://github.com/josephpicardat">Joseph Picardat</a>

<a target="_blank" rel="noopener noreferrer" href="https://github.com/Lawhornmatt">Matthew Lawhorn</a>

<a target="_blank" rel="noopener noreferrer" href="https://github.com/RelentlessNC">Nicholas Conklin</a>

<a target="_blank" rel="noopener noreferrer" href="https://github.com/sky19930112">Samuel Hsu</a>

<a target="_blank" rel="noopener noreferrer" href="https://github.com/Thomasple13">Thomas Le</a>


## LICENSE:

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Bugs](https://img.shields.io/github/issues/Lawhornmatt/RecipeIO/bug.svg)](https://github.com/Lawhornmatt/RecipeIO/issues)

This program is copyrighted under the MIT open source license.

Copyright 2022 Group Two

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[Further license information can be found here.](https://opensource.org/licenses/MIT)

