
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
        * (GET) /remember - Updates login stats when session present
        * (POST) /remember - Validates cookie from cache and logs in user 
        * (POST) /signup - Handles registering of a new user
        * (POST) /login - Handles log in feature
        * (POST) /logout - Handles log out feature

    - /blogs - handled by blogs.js
        * (GET)  /all - Returns all blogs
        * (POST) /new - Handles upload of a new blog file
        * (POST) /newtitle - Handles addition of title for blog and completion of blog addition
            > /new is followed by /newtitle to add a blog successfully
        * (PUT) /liked - Increments likes on a post by 1
        * (PUT) /disliked - Increment dislikes on a post by 1
    - /profiles - handled by profile.js
        * (GET) /me - Get response as data from DATA table for the logged in user
        * (PUT) /update - Handle updation of the mutable details for the user
    - /questions - handled by questions.js 
        * (GET)  /all - Returns all questions
        * (POST) /newstatement - Handles upload of new problem statement file
        * (POST) /newinput Handles upload of new input testcases file
        * (POST) /newoutput - Handles upload of new correct output file
        * (POST) /titleadd - Handles addition of title 
        * (POST) /add - Handles completion of uploading of question into database
            > /add is finally called after /newstatement, /newinput, /newoutput and /titleadd to upload a question
        * (PUT)  /correct - Increments correct submissions for a question on correct submission
        * (PUT)  /wrong - Increments incorrect submission for a question on incorrect submission       



* dbconn.js - Helper file to connect with the postgresql database

* server.js - Main file

## Frontend structure:

* auth  - Rendered when the user is not logged in. Handles signup/login operations

    - auth.js - Parent component to signup and login. 
    - signup - Child component which handles signup operation for auth.js
    - login  - Child component which handles login operation for auth.js

* main  - Rendered when the user is logged in. Handles the different functionality of web application
   
    - main.js   - Handles routing of various components
    - contribution - Handles addition of files for new blog or question
    - feed - Renders titles of blogs and questions from database
    - navbar - Navbar😅
    - profile - Handles user profile viewing and updation
    - notfound - Handles 404 for unknown routes


