var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds153392.mlab.com:53392/heroku_w0cv6gwr'; // user yours
}

var mongoose = require("mongoose");
// var instance2 = new Mongoose();
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;