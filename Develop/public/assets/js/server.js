
const fs = require('fs');
const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3000;


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../')));


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, "../../index.html"))
});


app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});


app.get('/api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../../../db/db.JSON'));
    
});


app.post('/api/notes', function(req, res) {
    let notesJson;
    fs.readFile('../../../db/db.JSON', 'utf8', (err, data) => {
        notesJson = JSON.parse(data);
        notesJson.push(req.body);
        let idNum = 1;
        notesJson.forEach(note => {
            note.id = idNum;
            idNum++;
        });
    
        if(err) throw err;
        let stringJson = JSON.stringify(notesJson);
        fs.writeFile(path.join(__dirname, '../../../db', 'db.json'), stringJson, (err) => {
            if(err) throw err;
        });
    });
    res.send(req.body);
}); 

app.delete('/api/notes/:id', function(req, res) {
    const id = parseInt(req.params.id);
    fs.readFile('../../../db/db.JSON', 'utf8', (err, data) => {
        let jsonData = JSON.parse(data);
        jsonData = jsonData.filter(function(note) {
            return note.id !== id; 
        });
        let stringJson = JSON.stringify(jsonData);
        fs.writeFile(path.join(__dirname, '../../../db', 'db.json'), stringJson, (err) => {
            if(err) throw err;
        });
    });    
    res.sendStatus(200);
});


app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});