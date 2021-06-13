const express = require('express');
const router = express.Router();
const conn = require("../dbconn");
const multer = require("multer");
const path = require("path");


var uploadtime = "";
var filename = "";
var title = "";

//==================== Multer configuration ==================

// Configuring storage location for uploading blog file
var blogStorage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, __dirname+'../../data/blogs');
   },
  filename: function (req, file, cb) {
      uploadtime = Date.now();
      filename = uploadtime+"-"+file.originalname;
      cb(null , filename);
  }
});
  var blogUpload = multer({ storage: blogStorage })

//===================== blog routes ===========================

// Route to get all blog files (for testing purpose)
router.get("/all", async(req, res) =>{
  console.log(req.session.userID);
    await conn.query("SELECT * FROM BLOGS ORDER BY LIKES DESC;")
    .then((response) => {
        res.send(response.rows);
    })
    .catch(err => setImmediate(() => {   throw err }));

});


// Get details about a particular blog
router.get("/details/:slug", async(req, res) => {
  await conn.query("SELECT * FROM BLOGS WHERE ID = $1;", [req.params.slug])
    .then((response) => {
      res.send(response.rows[0])
    })
    .catch(err => setImmediate(() => {   throw err })); 

});

// Route to upload blog file and add it to database 

router.post("/new",blogUpload.single('blog'), async(req, res) => {
  res.send("Uploaded"+filename);
});
router.post("/newtitle", async(req, res) =>{
  title = req.body.title;
  await conn.query("INSERT INTO BLOGS(USERID , CONTENT, TITLE) VALUES($1, $2, $3)", [req.session.userID , filename, title])
  .then(()=>{
    console.log("upload successful");
    res.send("Upload successful");
  })
  .catch(err => setImmediate(() => {   throw err })); 
});

// View a blog on screen
router.get("/viewone/:slug" , async(req, res) => {
  await conn.query("SELECT * FROM BLOGS WHERE ID = $1;", [req.params.slug])
    .then((response) => {
      var options = {
        root: path.join(__dirname+"/../data/blogs/")
      }
      var filename = response.rows[0].content;
        res.sendFile(filename, options, (err)=>{
          if(err){
            console.log(err);
          } else {
            console.log("Sent problem statement successfully");
          }
        })
    })
    .catch(err => setImmediate(() => {   throw err }));
})

// Handle like
router.put("/liked", async(req, res) => {
  await conn.query("SELECT COUNT(*) FROM BLOGLIKES WHERE BLOGID = $1 AND USERID = $2",[req.body.id, req.session.userID])
  .then(async(resp1) => {
    if(resp1.rows[0].count === '0'){
      await conn.query("UPDATE BLOGS SET LIKES = LIKES+1 WHERE ID = $1",[req.body.id])
      .then(() => {})
      .catch(err => setImmediate(() => {   throw err })); 
      await conn.query("INSERT INTO BLOGLIKES (BLOGID, USERID) VALUES($1, $2)",[req.body.id, req.session.userID])
      .then(() => {res.send("Like added to database")})
    .catch(err => setImmediate(() => {   throw err })); 
    }
  })
  .catch(err => setImmediate(() => {   throw err }));
  
});

// Handle dislike
router.put("/disliked", async(req, res) => {
  await conn.query("SELECT COUNT(*) FROM BLOGDISLIKES WHERE BLOGID = $1 AND USERID = $2",[req.body.id, req.session.userID])
  .then(async(resp1) => {
    if(resp1.rows[0].count === '0'){
      await conn.query("UPDATE BLOGS SET DISLIKES = DISLIKES+1 WHERE ID = $1",[req.body.id])
      .then(() => {})
      .catch(err => setImmediate(() => {   throw err })); 
      await conn.query("INSERT INTO BLOGDISLIKES (BLOGID, USERID) VALUES($1, $2)",[req.body.id, req.session.userID])
      .then(() => {res.send("DisLike added to database")})
    .catch(err => setImmediate(() => {   throw err })); 
    }
  })
  .catch(err => setImmediate(() => {   throw err }));
});


router.get("/contributedbyme", async(req, res) => {
  await conn.query("SELECT * FROM BLOGS WHERE USERID = $1", [req.session.userID])
  .then((resp) => {
    res.send(resp.rows);
  })
  .catch(err => setImmediate(() => { throw err}))
});


module.exports = router;