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
    await conn.query("SELECT * FROM BLOGS;")
    .then((response) => {
        res.send(response.rows);
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
  await conn.query("UPDATE BLOGS SET LIKES = LIKES+1 WHERE ID = ",[req.body.id])
  .then(() => {res.send("Post Liked")})
  .catch(err => setImmediate(() => {   throw err })); 
});

// Handle dislike
router.put("/disliked", async(req, res) => {
  await conn.query("UPDATE BLOGS SET DISLIKES = DISLIKES+1 WHERE ID = ",[req.body.id])
  .then(() => {res.send("Post Disliked")})
  .catch(err => setImmediate(() => {   throw err })); 
});





module.exports = router;