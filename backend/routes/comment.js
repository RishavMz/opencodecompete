const express = require("express");
const router = express.Router();
const conn = require("../dbconn");

//=================================================================

router.post("/new", async(req, res) =>{
    if(!req.session.userID || !req.body.content || !req.body.blogid){
        res.send("404");
    } else {
        await conn.query("INSERT INTO COMMENTS (USERID, BLOGID, CONTENT) VALUES ($1, $2, $3)", [req.session.userID, req.body.blogid, req.body.content])
        .then(() => res.send("Successfully added"))
        .catch(err => setImmediate( () => { throw err}));
    }
});

router.get("/all/:slug", async(req, res) => {
    await conn.query("SELECT * FROM COMMENTS WHERE BLOGID = $1 ORDER BY ID DESC;", [req.params.slug])
    .then((resp) => res.send(resp.rows))
    .catch(err => setImmediate(() => {throw err}))
    
})

//=================================================================


module.exports = router;