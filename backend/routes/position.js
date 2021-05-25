const express = require("express");
const router = express.Router();
const conn = require('../dbconn');

// ================ Test data ================

data = [
    ["person1",100, 162]
]


// ================= Routes ===================

router.get("/all", (req, res) => {
    res.json(data);
    console.log(req.session.userID);
});

module.exports = router;