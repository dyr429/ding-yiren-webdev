var mongoose = require("mongoose");
var songSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    name: String,
    url: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "song"});
module.exports = songSchema;