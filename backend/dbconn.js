const {Pool} = require("pg");
require("dotenv").config();

const conn = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

const initialize = async() => {

    await conn.query("CREATE TABLE IF NOT EXISTS USERS( ID SERIAL PRIMARY KEY , USERNAME VARCHAR(255) NOT NULL , EMAIL VARCHAR(255) UNIQUE NOT NULL , PASSWORD VARCHAR(255) NOT NULL );")
        .then(()=> console.log("Successfully initialized USERS table"))
        .catch(err => setImmediate(() => {   throw err }));

    await conn.query("CREATE TABLE IF NOT EXISTS DATA ( ID SERIAL PRIMARY KEY , USERID INTEGER, FIRSTNAME VARCHAR(255), LASTNAME VARCHAR(255), QUOTE TEXT, SCORE INTEGER DEFAULT 0, BLOGS INTEGER DEFAULT 0, FOREIGN KEY (USERID) REFERENCES USERs(ID) );")
        .then(()=> console.log("Successfully initialized DATA table"))
        .catch(err => setImmediate(() => {   throw err }));    

    await conn.query("CREATE TABLE IF NOT EXISTS QUESTIONS ( ID SERIAL PRIMARY KEY , USERID INTEGER, TITLE VARCHAR(100), STATEMENT TEXT , INPUT TEXT , OUTPUT TEXT , CORRECT INTEGER DEFAULT 0, WRONG INTEGER DEFAULT 0 , STATUS INTEGER DEFAULT 1, FOREIGN KEY(USERID) REFERENCES USERS(ID) );")
        .then(()=> console.log("Successfully initialized QUESTIONS table"))
        .catch(err => setImmediate(() => {   throw err })); 
    
    await conn.query("CREATE TABLE IF NOT EXISTS SOLVED ( ID SERIAL PRIMARY KEY , USERID INTEGER, QUESTIONID INTEGER , FOREIGN KEY(USERID) REFERENCES USERs(ID) , FOREIGN KEY(QUESTIONID) REFERENCES QUESTIONS(ID) );")
        .then(()=> console.log("Successfully initialized SOLVED table"))
        .catch(err => setImmediate(() => {   throw err }));
    
    await conn.query("CREATE TABLE IF NOT EXISTS BLOGS ( ID SERIAL PRIMARY KEY , USERID INTEGER, CONTENT TEXT, TITLE VARCHAR(255), LIKES INTEGER DEFAULT 0 , DISLIKES INTEGER DEFAULT 0 , STATUS INTEGER DEFAULT 1, FOREIGN KEY (USERID) REFERENCES USERs(ID) );")
        .then(()=> console.log("Successfully initialized BLOGS table"))
        .catch(err => setImmediate(() => {   throw err }));   
    
    await conn.query("CREATE TABLE IF NOT EXISTS COMMENTS ( ID SERIAL PRIMARY KEY , USERID INTEGER, BLOGID INTEGER , CONTENT TEXT , LIKES INTEGER DEFAULT 0 , DISLIKES INTEGER DEFAULT 0 , FOREIGN KEY (USERID) REFERENCES USERs(ID) , FOREIGN KEY(BLOGID) REFERENCES BLOGS(ID) );")
        .then(()=> console.log("Successfully initialized COMMENTS table"))
        .catch(err => setImmediate(() => {   throw err }));

    await conn.query("CREATE TABLE IF NOT EXISTS BLOGLIKES (ID SERIAL PRIMARY KEY , USERID INTEGER , BLOGID INTEGER , DATA INTEGER,  FOREIGN KEY(USERID) REFERENCES USERS(ID) , FOREIGN KEY(BLOGID) REFERENCES BLOGS(ID));")
        .then(() => console.log("Successfully initialized BLOGLIKES table"))
        .catch(err => setImmediate(() => {   throw err }));   

    await conn.query("CREATE TABLE IF NOT EXISTS COMMENTLIKES (ID SERIAL PRIMARY KEY , USERID INTEGER , COMMENTID INTEGER , DATA INTEGER,  FOREIGN KEY(USERID) REFERENCES USERS(ID) , FOREIGN KEY(COMMENTID) REFERENCES COMMENTS(ID));")
        .then(() => console.log("Successfully initialized COMMENTLIKESLIKES table"))
        .catch(err => setImmediate(() => {   throw err }));       


}

initialize();

module.exports = conn