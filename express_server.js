const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
let app = express();
// default port is 8080
let PORT = 8080;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// pass the user_id form the cookies in the templates so they can
// be rendered in each ejs file
app.use((req, res, next) => {
  let userID = req.cookies["user_id"];
  if (userID){
    res.locals.user = users[userID];
  }
  else { res.locals.user = null;}
  next();
});

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  },
 "ahmed": {
   id: "ahmed",
   email: "adel_ahmed90@icloud.com",
   password: "cats"
 } 
};
// function to create random string
function generateRandomString() {
    let length = 6;
    let char = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for ( let i = length; i > 0; i--){
      result += char[Math.floor(Math.random() * char.length)];
    }
    return result;
  }
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
app.get("/", (req, res) => {
  res.end("Hello!");
});
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
// Add a new route to urls_index to print the shorten and full url
app.get("/urls", (req, res) => {
  res.render("urls_index", { urls: urlDatabase });
});
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
// Add a new route to urls_show to print each urls based on given id
app.get("/urls/:id", (req, res) => {
  let template = {
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
  };
  res.render("urls_show", template);
});

app.post("/urls", (req, res) => {
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/" + shortURL);
});
// Redirect Short URLs
app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.originalUrl.substr(3);
  let longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});
// handle delete request
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});
// handle update requests
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect("/urls/" + req.params.id);
});
app.get("/login", (req, res) => {
  res.render("user_login")
});
// handle login submision and errors
app.post("/login", (req, res) => {
  let { email, password } = req.body;
  for (let key in users ) {
    if (email === users[key].email) {
      if (password === users[key].password){
        res.cookie("user_id",key);
        res.redirect("/urls")
        return
      } else { 
        res.status(403).send("Your password dosen't match")
        return;
      }
    } 
  }
  res.status(403).send("Email is not registered"); 
});
// handle the logout and clear the cookies
app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/urls");
});
// hanlde requests for /register
app.get("/register", (req, res) => {
  res.render("user_register");
});
// handle registeration 
app.post("/register", (req, res) => {
  let id = generateRandomString();
  let { email, password } = req.body;
  if (email === "" || password === "") {
      res.status(400).send("Please enter email and password");
      return;
  } else if (email) {
    for (let key in users ){
      if (email === users[key].email) {
        res.status(400).send("Email is already registered ");
        return
      } 
    }
  }
  users[id] = { id, email, password };
  // console.log("users",users);
  res.cookie("user_id", id);
  res.redirect("/urls")
});