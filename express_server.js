// const express = require("express");
// const bodyParser = require("body-parser");
// let app = express();
// // default port is 8080
// let PORT = 8080;
// app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended: true}));
// const urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };
// app.get("/", (req, res) => {
//   res.end("Hello");
// });
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}!`);
// });
// app.get("/urls.json", (req, res) => {
//   res.json(urlDatabase);
// });
// // Add a new route to urls_index to print the shorten and full url
// app.get("/urls", (req, res) => {
//   let templateVars = { urls: urlDatabase};
//   res.render("urls_index", templateVars);
// });
// app.get("/urls/new", (req, res) => {
//   res.render("urls_new");
// });
// // Add a new route to urls_show to print each urls based on given id 
// app.get("/urls/:id", (req, res) => {
//   let templateVars = { 
//     shortURL: req.params.id,
//     longURL: urlDatabase[shortURL]
//   };
//   res.render("urls_show", templateVars);
// })
// app.get("/hello", (req, res) => {
//   res.end("<html><body>Hello <b>World</b></body></html>\n");
// });
// app.post("/urls", (req, res) => {
//   res.send("OK");
// });

  function generateRandomString(length, char) {
    let result = "";
    for ( let i = length; i>0; i--){
      result += char[Math.floor(Math.random() * char.length)];
    }
    console.log(result);
  }
  generateRandomString(6,'0123456789abcdefghijklmnopqrstuvwxyz');

