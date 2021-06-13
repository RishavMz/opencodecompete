
## Database schema
` Core Features:`
* Users     : Contains user login credentials
* Data      : Contains profile data about users

` Questions + solving`
* Questions : Contains all questions data uploaded to web app
* Solved    : Many to Many table to keep track of questions solved by a user

`Blogs + comments/likes`
* Blogs     : Contains blogs written by the users
* Comments  : Contains comments written by users for blogs
* Reply     : Contains replies written by users for comments on blogs
* Bloglikes : Many to one table to keep track of likes/dislikes on blogs
* Commentlikes : Many to one table to keep track of likes/dislikes on comments
* replylikes : Many to one table to keep track of likes/dislikes on replies

### Diagram:

<img src = "./schema.png"/>

#

## Backend structure:

* Data - Folder storing all uploaded files (for blogs and questions)
> As of now, the uploaded files are being stored in backend, instead of cloud for ease of development

* routes:
    - /auth - handled by auth.js
    - /blogs - handled by blogs.js
    - /profiles - handled by profile.js
    - /questions - handled by questions.js 

* dbconn.js - Helper file to connect with the postgresql database

* server.js - Main file

## Frontend structure:

* auth  - Rendered when the user is not logged in. Handles signup/login operations

* main  - Rendered when the user is logged in. Handles the different functionality of web application
   

