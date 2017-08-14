var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("ProjectUserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findAllUsers = findAllUsers;
userModel.deleteUserById = deleteUserById;
userModel.addSong = addSong;
userModel.removeSong = removeSong;
userModel.findFollowingByUser = findFollowingByUser;
userModel.findFollowersByUser = findFollowersByUser;
userModel.addFollowingByUser = addFollowingByUser;
userModel.addFollowerByUser = addFollowerByUser;
module.exports = userModel;

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function updateUser(userId, user) {
    return userModel.updateOne({_id: userId},
        {$set: user});
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function deleteUserById(userId) {
    return userModel.findOneAndRemove({_id: userId});
}

function removeSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.songs.indexOf(songId);
            user.songs.splice(index, 1);
            return user.save();
        })
}

function addSong(userId, songId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.songs.push(songId);
            return user.save();
        });
}

function findFollowingByUser(userId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            var following = user.following;
            return userModel.find({ _id: { $in: following } }).exec(function(err, docs) {
                docs.sort(function(a, b) {
                    // Sort docs by the order of their index in widgets.
                    return following.indexOf(a._id) - following.indexOf(b._id);
                });
            });
        })
}

function findFollowersByUser(userId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            var followers = user.followers;
            return userModel.find({ _id: { $in: followers } }).exec(function(err, docs) {
                docs.sort(function(a, b) {
                    // Sort docs by the order of their index in widgets.
                    return followers.indexOf(a._id) - followers.indexOf(b._id);
                });
            });
        })
}

function addFollowingByUser(userId, followingId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.following.push(followingId);
            return user.save();
        })
}

function addFollowerByUser(userId, followerId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.followers.push(followerId);
            return user.save();
        })
}