const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;
const db = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');





app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'))

app.get("/api/notes", function (req, res) {
    let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    res.json(saveNotes);
});
app.delete("/api/notes/:id", function (req, res) {
    let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    //res.sendFile(saveNotes.[Number(req.params.id)]);
    const newSaveNotes =
        saveNotes.filter((note) => {
            return note.id !== req.params.id
        })
    fs.writeFileSync("./db/db.json", JSON.stringify(newSaveNotes));
    res.json(newSaveNotes);
});
app.post("/api/notes", function (req, res) {
    let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    const { title, text } = req.body;
    const newNote = { title, text, id: uuidv4() }
    saveNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(saveNotes));
    res.json(saveNotes);
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, function () {
    console.log(`Now listening to port ${PORT}. Enjoy your stay!`);
})









