const {Pool} = require("pg");
require("dotenv").config();

const conn = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});


conn.query("CREATE TABLE IF NOT EXISTS USERS ( ID SERIAL PRIMARY KEY , USERNAME VARCHAR(255) , EMAIL VARCHAR(255) UNIQUE NOT NULL , PASSWORD VARCHAR(255) );")
    .then(res => console.log("Successfully initialized USERS table"))
    .catch(err => setImmediate(() => {   throw err }));

module.exports = conn