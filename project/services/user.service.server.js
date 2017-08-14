var app = require("../../express");
var userModel = require("../model/user.model.server");


app.post("/projectapi/user", createUser);
app.get("/projectapi/user", findUser);
app.get("/projectapi/user/:userId", findUserById);
app.put("/projectapi/user/:userId", updateUser);
app.delete("/projectapi/user/:userId", deleteUser);
app.delete("/projectapi/user/:userId/song/:songId", removeSong);
app.post("/projectapi/user/:userId/song/:songId", addSong);
app.put("/projectapi/user/:userId/following/:followingId", addFollowingByUser);
app.put("/projectapi/user/:userId/follower/:followerId", addFollowerByUser);
app.get("/projectapi/user/:userId/following", findFollowingByUser);
app.get("/projectapi/user/:userId/follower", findFollowersByUser);

function createUser(req,res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findUserById(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findUser(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    console.log(username);
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user === null)
                    return res.send("0");
                else
                    return res.json(user);

            }, function (err) {
                return res.sendStatus(404).send(err);
            });
    }
    else if(username) {
        console.log(username);
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user === null){
                    console.log("None");
                    return res.send("0");
                }
                else
                    return res.json(user);

            }, function (err) {
                return res.sendStatus(404).send(err);
            });
    }
}

function updateUser(req,res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId,user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel
        .deleteUserById(userId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function removeSong(req,res) {
    var userId = req.query.userId;
    var songId = req.params.songId;
    userModel
        .removeSong(userId,songId)
        .then(function (status) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function addSong(req,res) {
    var userId = req.query.userId;
    var songId = req.params.songId;
    userModel
        .addSong(userId,songId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function findFollowingByUser(req, res) {
    var userId = req.params.userId;
    userModel
        .findFollowingByUser(userId)
        .then(function (follwing) {
            res.json(follwing);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findFollowersByUser(req, res) {
    var userId = req.params.userId;
    userModel
        .findFollowersByUser(userId)
        .then(function (follwer) {
            res.json(follwer);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function addFollowerByUser(req, res) {
    var userId = req.params.userId;
    var followerId = req.params.followerId;
    userModel
        .addFollowerByUser(userId,followerId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}

function addFollowingByUser(req,res) {
    var userId = req.params.userId;
    var followingId = req.params.followingId;
    userModel
        .addFollowingByUser(userId,followingId)
        .then(function (user) {
            res.send("1");
        }, function (err) {
            res.send("0");
        });
}