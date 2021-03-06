var mongoose = require('mongoose');
var q = require('q');
var connectionString = 'mongodb://localhost:27017/assignment'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds153392.mlab.com:53392/heroku_w0cv6gwr'; // user yours
}
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;