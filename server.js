const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true })); //req.body requires this setup (post request)
app.use(express.json());
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('./api/notes', (req, res) => {
    req.readFile(path.join(__dirname, "./db/db.json"))
});
app.post('./api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
})

// require("./routes/apiRoutes.js")(app);
// require("./routes/htmlRoutes.js")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});