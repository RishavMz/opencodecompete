const express = require('express');
const router = express.Router();
const conn = require("../dbconn");
const multer = require("multer");

var uploadtime = "";
var filename = "";
//==================== Multer configuration ==================

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


router.get("/all", async(req, res) =>{
    await conn.query("SELECT * FROM BLOGS;")
    .then((response) => {
        res.send(response.rows);
    })
    .catch(err => setImmediate(() => {   throw err }));

});



router.post("/new",blogUpload.single('blog'), async(req, res) => {
  await conn.query("INSERT INTO BLOGS(USERID , CONTENT) VALUES($1, $2)", [req.session.userID , filename])
  .then(()=>{
    console.log("upload successful");
    res.send("Upload successful");
  })
  .catch((err) =>{
    console.log(err);
  })

});







module.exports = router;