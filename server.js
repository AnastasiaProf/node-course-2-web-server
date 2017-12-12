const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log.");
    }
  });
  next();
});

//maintenance middleware
// app.use((req, res, next) => {
//   res.render("maintenance.hbs", {
//     pageTitle: "We'll be right back",
//     welcomeMessage: "The site is being updated we will be back soon."
//   });
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

//handler for hhtp get request
app.get("/", (req, res) => {
  //res.send("<h1>Hello World!</h1>");
  // res.send({
  //   name: "Ana",
  //   likes: ["cat", "dog", "music"]
  // });
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Hello you!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects Page"
  });
});

app.get("/bad", (rq, res) => {
  res.send({
    errorMessage: "Error handling request."
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
