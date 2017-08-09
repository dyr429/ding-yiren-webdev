var app = require('../../express');
var userModel = require('../model/user/user.model.server');
// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", isAdmin: true  },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];

// html handlers
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUserByCredentials);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function getAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.send(users);
        }, function (err) {
            res.send(err);
        });

}

function createUser(req,res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function getUserById(req, res) {
    var _userId = req.params['userId'];
    userModel
        .findUserById(_userId)
        .then(function (user) {
            res.json(user);
        }, function (err){
            res.send(err);
        });
}

function deleteUser(req,res) {
    var _userId = req.params.userId;
    userModel
        .deleteUser(_userId)
        .then(function (user) {
            res.json(user);
        }, function (err){
            res.send(err);
        });
}

function updateUser(req,res) {
    var _userId = req.params.userId;
    var _newuser = req.body;
    userModel
        .updateUser(_userId,_newuser)
        .then(function () {
            userModel
                .findUserById(_userId)
                .then(function (user) {
                    res.json(user);
                })
        }, function (err){
            res.send(err);
        });

}

function findUserByCredentials(req,res) {
    var _username = req.query.username;
    var _password = req.query.password;

    if(_username!="undefined" && _password!="undefined"){
        userModel
            .findUserByCredentials(_username,_password)
            .then(function (user) {
                res.json(user);
            }, function (err){
                res.send(err);
            });
    }else if(_username!="undefined"){
        userModel
            .findUserByUsername(_username)
            .then(function (user) {
                res.json(user);
            }, function (err){
                res.send(err);
            });

    }

}

