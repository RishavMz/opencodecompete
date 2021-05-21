const express = require("express");
const router = express.Router();

// ================ Test data ================

data = {
    "person1": [100, 100],
    "person2": [200, 200],
    "person3": [300, 300],
    "person4": [400, 400],
    "person5": [500, 500],
    "person6": [600, 600],
    "person7": [700, 700],
    "person8": [800, 800]
}


// ================= Routes ===================

router.get("/all", (req, res) => {
    res.json(data)
});

module.exports = router;