require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
var profile = require("./profile");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.set("views", "./views");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = {
    person: {
      firstName: "Cavan",
      lastName: "Stewart"
    }
  };
  res.render("index", data);
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/thanks", (req, res) => {
  const msg = {
    to: "cavanwstewart@gmail.com",
    from: req.body.email,
    subject: "New Portfolio Contact",
    text: "this is " + req.body.firstName + " " + req.body.lastName,
  };
  sgMail.send(msg)
  
  res.render("thanks", { contact: req.body });
});

app.use("/profile", profile);

app.listen(8080, () => {
  console.log("listening at http://localhost:8080");
});
