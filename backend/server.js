const express = require("express");
const cors = require("cors");
const uuid = require("uuid").v4;
const session = require("express-session");
const redis = require("ioredis");
require("dotenv").config();
const bodyParser = require("body-parser");
const redisClient = new redis(process.env.REDIS_URL);
const redisStore = require('connect-redis')(session);




// ================ Setup =====================

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });
  
app.use(session({
    genid: (req) =>{
      return uuid();  },
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: true,
    store: new redisStore({
        client: redisClient, 
        ttl: 86400 }),
  }));

// ================= Routes ===================

const authRoute = require("./routes/auth"); 
const blogRoute = require("./routes/blogs");
const questionRoute = require("./routes/questions");

app.get("/", (req, res) =>{
    res.send("Random text go brr....");
    console.log(req.session.userID);

});

app.use("/auth", authRoute);
app.use("/blogs",blogRoute);
app.use("/questions", questionRoute);

// ================= Server ===================

app.listen(process.env.PORT, () =>{
    console.log("Server up and running at port ", process.env.PORT);
});
