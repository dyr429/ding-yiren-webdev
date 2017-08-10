var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageModel = require('../page/page.model.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;


module.exports = widgetModel;


//functions
function createWidget(pageId,widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            return pageModel
                .addWidget(pageId, widget._id)
        })
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function findAllWidgetsForPage(pageId) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            var ids = page.widgets;
            return widgetModel.find({ _id: { $in: ids } }).exec(function(err, docs) {
                docs.sort(function(a, b) {
                    // Sort
                    return ids.indexOf(a._id) - ids.indexOf(b._id);
                });
            });
        })
}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            Array.prototype.move = function (from, to) {
                this.splice(to, 0, this.splice(from, 1)[0]);
            };
            page.widgets.move(start, end);
            return page.save();
        });
}

function deleteWidget(widgetId,pageId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

