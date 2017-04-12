const express = require("express");
const bodyParser = require("body-parser");
let app = express();
// default port is 8080
let PORT = 8080;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
// Add a new route to urls_index to print the shorten and full url
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase};
  res.render("urls_index", templateVars);
});
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
// Add a new route to urls_show to print each urls based on given id 
app.get("/urls/:id", (req, res) => {
  let templateVars = { 
    shortURL: req.params.id,
    longURL: urlDatabase[req.params.id]
  };
  res.render("urls_show", templateVars);
})
app.post("/urls", (req, res) => {
  function generateRandomString() {
    let length = 6;
    let char = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for ( let i = length; i>0; i--){
      result += char[Math.floor(Math.random() * char.length)];
      }
    return result;
  }
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/"+ shortURL);
  console.log("database",urlDatabase);
});
// Redirect Short URLs
app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.originalUrl.substr(3);
  let longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});
// handle delete request 
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id]g
  res.redirect("/urls");
});



