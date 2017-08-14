var mongoose = require("mongoose");
var songSchema = require("./song.schema.server");
var songModel = mongoose.model("SongModel", songSchema);
var userModel = require("./user.model.server")
var db = require("./database");

songModel.createSongForUser = createSongForUser;
songModel.findSongById = findSongById;
songModel.findSongBySongName = findSongBySongName;
songModel.findAllSongsByUser = findAllSongsByUser;
songModel.deleteSong = deleteSong;
songModel.updateSong = updateSong;
songModel.getSongUrl = getSongUrl;

module.exports = songModel;

function createSongForUser(userId, song) {
    song._user = userId;
    var songTmp = null;
    return songModel
        .create(song)
        .then(function (songDoc) {
            songTmp = songDoc;
            return userModel.addSong(userId, songTmp._id)
        })
        .then(function (userDoc) {
            return songTmp;
        })
}

function findSongById(songId) {
    return songModel.findOne({_id: songId});
}

function findSongBySongName(songname) {
    return songModel.find({name: songname});
}

function findAllSongsByUser(userId) {
    return songModel.find({_user: userId});
}

function deleteSong(userId, songId) {
    var songTmp = null;
    return songModel
        .remove({_id: songId})
        .then(function (song) {
            songTmp = song;
            return userModel.removeSong(userId, songId);
        })
        .then(function (userDoc) {
            return songTmp;
        })
}

function updateSong(songId, song) {
    return songModel
        .updateOne({_id: songId},
            {$set: song});
}

function getSongUrl(songId) {
    return songModel
        .findById(songId)
        .then(function (song) {
            return song.url;
        })
}