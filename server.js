const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const app = express();

const router = require("./router");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//load static assets
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUnitialized: true
}));

app.use("/route", router);

//homepage
app.get("/", (req, res) => {
    res.render("base", {title: "Login System"});
})


app.listen(port, ()=> {console.log("Listening on port 3000")});