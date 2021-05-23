const express = require("express");
const router = express.Router();
const conn = require('../dbconn');

// ================ Test data ================

data = [
    ["person1",100, 100],
    ["person2",200, 200],
    ["person3",300, 300],
    ["person4",400, 400],
    ["person5",200, 400],
    ["person6",100, 500],
    ["person7",200, 400],
    ["person8",100, 500]
]


// ================= Routes ===================

router.get("/all", (req, res) => {
    res.json(data)
});

module.exports = router;