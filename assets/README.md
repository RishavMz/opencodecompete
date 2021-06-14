
## Database schema

<img src = "./schema.png"/>


### USERS
> Contains user login credentials
* ID
    - Primary Key
    - Auto Increment
* USERNAME
    - Varchar(255)
    - Not Null
* EMAIL
    - Varchar(255)
    - Unique
    - Not Null
* PASSWORD
    - Varchar(255)
    - Not Null

#

### DATA
> Contains profile data about users
* ID
    - Primary Key
    - Auto Increment
* USERID
    - Foreign Key [   `USERS` (ID)   ] 
    - Integer
* FIRSTNAME
    - Varchar(255)
* LASTNAME
    - Varchar(255)
* QUOTE 
    - Text
* SCORE
    - Integer
    - Default = 0
* BLOGS
    - Integer
    - Default = 0

#

### QUESTIONS
> Contains all questions data uploaded to web app    
* ID
    - Primary Key
    - Auto Increment
* USERID
    - Foreign Key [   `USERS` (ID)   ] 
    - Integer
* TITLE
    - Varchar(100) 
* STATEMENT  
    - Text
* INPUT
    - Text
* OUTPUT 
    - Text
* CORRECT
    - Integer
    - Default = 0
* WRONG
    - Integer
    - Default = 0
* STATUS
    - Integer
    - Default = 1
    
#

### SOLVED
> Many to Many table to keep track of questions solved by a user
* ID
    - Primary Key
    - Auto Increment
* USERID
    - Foreign Key [   `USERS` (ID)   ] 
    - Integer
* QUESTIONID
    - Foreign Key [   `QUESTIONS` (ID)   ] 
    - Integer
    
#

### BLOGS
> Contains data about blogs written by the users
* ID
    - Primary Key
    - Auto Increment
* USERID
    - Foreign Key [   `USERS` (ID)   ] 
    - Integer
* CONTENT
    - Text
* TITLE
    - Varchar(255)
* LIKES
    - Integer
    - Default = 0    
* DISLIKES
    - Integer
    - Default = 0
* STATUS
    - Integer
    - Default = 1
    
#

### COMMENTS
> Contains comments written by users for blogs
* ID
    - Primary Key
    - Auto Increment
* USERID
    - Foreign Key [   `USERS` (ID)   ] 
    - Integer
* BLOGID
    - Foreign Key [   `BLOGS` (ID)   ] 
    - Integer
* CONTENT
    - Text
* LIKES
    - Integer
    - Default = 0    
* DISLIKES
    - Integer
    - Default = 0
    
#

### BLOGLIKES
> Many to one table to keep track of likes / dislikes on blogs
* ID
    - Primary Key
    - Auto Increment
* USERID
    - Foreign Key [   `USERS` (ID)   ] 
    - Integer
* BLOGID
    - Foreign Key [   `BLOGS` (ID)   ] 
    - Integer
* DATA
    - Integer
    
#

### COMMENTLIKES
> Many to one table to keep track of likes / dislikes on comments to blogs

* ID
    - Primary Key
    - Auto Increment
* USERID
    - Foreign Key [   `USERS` (ID)   ] 
    - Integer
* COMMENTID
    - Foreign Key [   `COMMENT` (ID)   ] 
    - Integer
* DATA
    - Integer    
    
#

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
   

