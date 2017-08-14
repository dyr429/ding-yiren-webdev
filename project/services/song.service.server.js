var app = require("../../express");
var songModel = require("../model/song.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});
var fs = require('fs');

app.post("/projectapi/user/:userId/song", createSongForUser);
app.get("/projectapi/song", findSongBySongName);
app.get("/projectapi/user/:userId/song", findAllSongsByUser);
app.get("/projectapi/song/:songId", findSongById);
app.put("/projectapi/song/:songId", updateSong);
app.post("/projectapi/upload", upload.single('myFile'), uploadSong);
app.delete("/projectapi/song/:songId", deleteSong);

function uploadSong(req, res) {

    var myFile = req.file;

    var userId = req.body.userId;
    console.log("gagag");
    console.log(userId);
    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    var song= { "url":'/public/uploads/' + filename,
                "name": originalname
    };

    songModel.createSongForUser(userId,song)
        .then(function () {
            var callbackUrl = "/project/#!/user/" + userId;
            res.redirect(callbackUrl);
        })
}



function createSongForUser(req,res) {
    var song = req.body;
    var userId = req.params.userId;
    songModel
        .createSongForUser(userId, song)
        .then(function (song) {
            res.json(song);
        });
}

function findSongById(req,res) {
    var songId = req.params.songId;
    songModel
        .findSongById(songId)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findSongBySongName(req, res) {
    var songname = req.query.songname;
    songname += ".mp3";
    songModel
        .findSongBySongName(songname)
        .then(function (song) {
            if (song === null)
                return res.send("0");
            else
                return res.json(song);

        }, function (err) {
            return res.sendStatus(404).send(err);
        });
}

function findAllSongsByUser(req, res) {
    var userId = req.params.userId;
    songModel
        .findAllSongsByUser(userId)
        .then(function (songs) {
            res.json(songs);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateSong(req, res){
    var songId = req.params.songId;
    var song = req.body;
    songModel
        .updateSong(songId,song)
        .then(function (song) {
            res.json(song);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function deleteSong(req, res) {
    var songId = req.params.songId;
    songModel
        .deleteSongById(songId)
        .then(function (song) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}