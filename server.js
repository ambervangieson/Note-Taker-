const express = require('express');
const path = require('path');


//tells web server what port to listen on
const PORT = process.env.PORT || 3000;
const app = express ():

const fs = require (fs);


 app.use(express.urlencoded({ extended: true}));
 app.use(express.json());


// Get call for index page
app.get('/', function(req, res) {
res.send(path.join(__dirname, "./public/index.html"));
 return res.json(index)
 });

 // Get call for notes page
 app.get('/notes', function(req, res) {
     res.send(path.join(__dirname, "./public/notes.html"));
     return res.json(note)
 });

 app.post('/notes', function (req, res) {
     res.send('Post request to notepage')
 });

 app.delete ('/notes' (req, res)=> {
     res.send("Delete Request Called")
 })


 app.listen(PORT, function (err) {
     if (err) console.log(err);
  console.log("Webpage listening on PORT" , PORT);
 });


 