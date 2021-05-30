const express = require('express');
const router = express.Router();
const conn = require("../dbconn");
const multer = require("multer");

var uploadtime = "";
var questionfilename = "";
var inputfilename = "";
var outputfilename = "";
var questiontitle = "";
//==================== Multer configuration ==================

// Configuring storage location for uploading problem statement file
var questionStorage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, __dirname+'../../data/questions/statement');
   },
  filename: function (req, file, cb) {
      uploadtime = Date.now();
      questionfilename = uploadtime+"-"+file.originalname;
      cb(null , questionfilename);
  }
});
var questionUpload = multer({ storage: questionStorage });

// Configuring storage location for uploading file containing input testcases
var inputStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname+'../../data/questions/input');
     },
    filename: function (req, file, cb) {
        uploadtime = Date.now();
        inputfilename = uploadtime+"-"+file.originalname;
        cb(null , inputfilename);
    }
  });
  var inputUpload = multer({ storage: inputStorage });

// Configuring storage location for uploading file containing correct output to corresponging test cases
  var outputStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname+'../../data/questions/output');
     },
    filename: function (req, file, cb) {
        uploadtime = Date.now();
        outputfilename = uploadtime+"-"+file.originalname;
        cb(null , outputfilename);
    }
  });
  var outputUpload = multer({ storage: outputStorage });

//===================== question routes ===========================

// Show all questions (only for testing purpose)
router.get("/all", async(req, res) =>{
    await conn.query("SELECT * FROM QUESTIONS;")
    .then((response) => {
        res.send(response.rows);
    })
    .catch(err => setImmediate(() => {   throw err }));
});


// Route to upload problem statement
router.post("/newstatement",questionUpload.single('questionfile'), (req, res) => {
  console.log("Problem statement"+questionfilename);
  res.send("Done step 1 uploaded problem statememt");
});

// Route to upload testcases file
router.post("/newinput",inputUpload.single('inputfile'), (req, res) => {
  console.log("Input testcases"+inputfilename);
  res.send("Done step 2 uploaded input file");
  
});

// Route to upload correct output file
router.post("/newoutput",outputUpload.single('outputfile'), (req, res) => {
  console.log("Correct output"+outputfilename);
  res.send("Done step 3 uploaded output file");

});

router.post("/titleadd", async(req, res) => {
  questiontitle = req.body.title;
  await res.send("Ok");
})

// Route to add all three filenames to database. Together, these four routes would add a question.
router.post("/add", async(req, res) => {
    if(questionfilename === "" || inputfilename === "" || outputfilename === ""){
        await res.send("Statement, input and output files not uploaded yet")
    } else {
        await conn.query("INSERT INTO QUESTIONS(USERID, STATEMENT, INPUT, OUTPUT, TITLE) VALUES($1 , $2 , $3 , $4 , $5);", [req.session.userID, questionfilename , inputfilename , outputfilename, questiontitle])
        .then(() => {
            console.log("Added all 3 files for question");
            res.send("Successfully created question")
        })
        .catch((err) => {
            console.log(err);
        })
    }
});


// Handle correctly solved
router.put("/correct", async(req, res) => {
  await conn.query("UPDATE QUESTIONS SET CORRECT = CORRECT+1 WHERE ID = ",[req.body.id])
  .then(() => {res.send("Question correct submission")})
  .catch((err) => {console.log(err)});
});

// Handle incorrectly solved
router.put("/wrong", async(req, res) => {
  await conn.query("UPDATE QUESTIONS SET WRONG = WRONG+1 WHERE ID = ",[req.body.id])
  .then(() => {res.send("Question incorrect")})
  .catch((err) => {console.log(err)});
});


module.exports = router;