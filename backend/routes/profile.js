const express = require('express');
const router = express.Router();
const conn = require("../dbconn");

router.get("/me", async(req, res) => {
    console.log(req.session.userID);
    await conn.query("SELECT * FROM DATA WHERE USERID = $1",[req.session.userID])
    .then((response) =>{
        res.send(response.rows[0]);
    })
    .catch(err => setImmediate(() => {   throw err })); 
});

router.put("/update", async(req,res) => {
    console.log(req.session.userID);
    await conn.query("UPDATE DATA SET FIRSTNAME = $1, LASTNAME = $2, QUOTE = $3 WHERE USERID = $4;", [req.body.firstname, req.body.lastname, req.body.quote, req.session.userID])
    .then(() => res.send("Successfully updated"))
    .catch(err => setImmediate( () => {   throw err}));
})

module.exports = router;