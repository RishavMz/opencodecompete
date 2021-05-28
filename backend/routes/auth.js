const express = require("express");
const redis = require("ioredis");
const router = express.Router();
const conn = require("../dbconn");
const redisClient = new redis(process.env.REDIS_URL);
const bcrypt = require('bcrypt');
const saltRounds = 10;

//===================== auth routes ===========================


//============== Check if already logged in (remember me) ===============

// If session already set 
router.get("/remember", (req, res) => {
    if(req.session.username){
        res.send("200"+req.session.username);
    }
});

// If browser closed but cookie set
router.post("/remember", async (req, res) => {

    // Verify cookie data from the login cookie data stored in redis cache
    await redisClient.sismember("SESSIONS", req.body.username,  async(error, reply) => {
        if(reply === 1){
            res.send("200LoggedIn");
                await conn.query("SELECT ID FROM USERS WHERE USERNAME = $1 ", [req.body.username ])
                .then(async (res) => {
                    req.session.userID = res.rows[0].id;
                })
                .catch(err => setImmediate(() => {   throw err }));
        } else {
            res.send("404NotFound");
        }
        if(error){
            console.log(error);
        }
    });
});

//========================= Sign UP ================================


router.post("/signup", async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email){
        res.send("403No Data");
        
     } else {
        var hashed = "";

        await bcrypt.hash(req.body.password, saltRounds).then((hash)=> { 
            hashed = hash;  
        }).then(async ()=> {

            await conn.query("INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ( $1 , $2, $3)" , [ req.body.username, req.body.email, hashed ])
            .then(async() => {

                res.status("201")
                res.send('201Created Successfully');
            })
            .catch(err => setImmediate(() => {   throw err })); 
        });
             
    }
});


//============================ Log In ================================


router.post("/login", async (req, res) => {

    if(req.session.username){
       res.send("304Already Logged In");

   } else if(!req.body.username || !req.body.password) {
      res.send("403No Data");

   } else {
       
        var auth = 0;

       await conn.query("SELECT PASSWORD, ID FROM USERS WHERE USERNAME = $1 ", [req.body.username ])
        .then(async (res) => {

              var hash = res.rows[0];
              if (hash == null){
                
                auth = 1;   

              } else {
                hash = hash.password;
                await bcrypt.compare(req.body.password, hash).then( (result) => {
                if(result){
                    req.session.userID = res.rows[0].id;
                    auth = 2;
                }
            });
        }
      })
      .catch(err => setImmediate(() => {   throw err }));

      if ( auth === 2){
            console.log("Logged In");
            req.session.username = req.body.username;

                // Store data in redis cache for verifying cookies
                await redisClient.sadd("SESSIONS",req.session.username, (error) =>{
                    if(error) {console.log(error)}
                });
            res.send("200"+req.session.username);

      } else if(auth === 1){
                      
            res.send("403WrongUsername");
      } else {
          res.send("403IncorrectPassword");
      }
    }
      
});


//============================= Log Out ===============================


router.post("/logout", async(req, res) => {
    var found = 0;
    if(req.session.username){

        // Check if cookie data for current user present in cache
        await redisClient.sismember("SESSIONS", req.session.username , (error, reply) =>{
            found =  reply;
            if(error){ console.log(error)}
        });
        if(found === 1){

            // Remove the current user cookie list from redis cache
            redisClient.srem("SESSIONS", req.session.username, (error) =>{
                if(error){ console.log(error)}
            });
        } 
    }
    console.log("Logged out");

    // Destroy current session
    req.session.destroy();
    res.send("200Logged Out");
});


//====================================================================



module.exports = router;