const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const app = express();
const port= process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + '\n', (err)=>{
    if (err) {
      console.log("Unable to append to server");
    }
  })
  next();
});

// app.use((req, res, next) =>{
//   res.render("maintenance");
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper("getCurrentYear", ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res, next) => {
  res.render("home", {
    pageTitle:"Home Page",
    welcomeMessage: "Welcome to my website"
  });
});

app.get('/about', (req, res, next) => {
  res.render("about", {
    pageTitle:"About Page"
  });
});

app.get('/projects', (req, res, next) => {
  res.render("projects", {
    pageTitle:"Projects Page"
  });
});

// bad - send back json with error message
app.get('/bad', (req, res, next) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
