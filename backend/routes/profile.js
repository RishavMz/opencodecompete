const express = require('express');
const router = express.Router();
const conn = require("../dbconn");

router.get("/me", async(req, res) => {
    await conn.query("SELECT * FROM DATA WHERE USERID = $1",[req.session.userID])
    .then((response) =>{
        res.send(response.rows[0]);
    })
    .catch(err => setImmediate(() => {   throw err })); 
});

router.put("/update", async(req,res) => {
    if(req.body.firstname === "" || req.body.lastname === ""){
        res.status("404");
        res.send("No data provided")
    } else {
        await conn.query("UPDATE DATA SET FIRSTNAME = $1, LASTNAME = $2 WHERE USERID = $3;", [req.body.firstname, req.body.lastname, req.session.userID])
        .then(() => res.send("Successfully updated"))
        .catch(err => setImmediate( () => {   throw err}));
    }
})

module.exports = router;