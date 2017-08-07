var mongoose = require('mongoose');

var pageSchema = mongoose.modelSchemas({
    _website: {type: mongoose.Schema.Type.ObjectId, ref: "WebsiteModel"},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
});

module.exports = pageSchema;