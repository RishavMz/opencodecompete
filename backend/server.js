const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// ================ Setup =====================

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// ================= Routes ===================

const positionRoute = require("./routes/position");


app.get("/", (req, res) =>{
    res.send("Random text go brr....");
});

app.use("/position", positionRoute);

// ================= Server ===================

app.listen(process.env.PORT, () =>{
    console.log("Server up and running at port ", process.env.PORT);
});
