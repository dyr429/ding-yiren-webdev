
var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});
var widgetModel = require('../model/widget/widget.model.server');
var fs = require('fs');
// var widgets = [
//     {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     {
//         "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"
//     },
//     {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     {
//         "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E"
//     },
//     {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];


// html handlers
app.put("/api/page/:pageId/widget",sortWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);


function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;


    var thiswidget = widgetModel.findWidgetById(widgetId);
    thiswidget.url = '/uploads/' + filename;

    widgetModel.updateWidget(widgetId,thiswidget)
        .then(function () {
            var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
            res.redirect(301, callbackUrl);
    })
}


function sortWidget(req, res){
    var _initialIndex = req.query['initial'];
    var _finalIndex = req.query['final'];
    var _pageId = req.params.pageId;
    widgetModel.reorderWidget(_pageId,_initialIndex,_finalIndex)
        .then(function (status) {
            res.send(status);
        })

}

// function reorderWidget(pageId, start, end) {
//     var count = 0;
//     var realIndexStart = 0;
//     var realIndexEnd = 0;
//     for (var w in widgets) {
//         var _widget = widgets[w];
//         if (_widget.pageId === pageId) {
//             if(count === Number(start)){
//                 realIndexStart = w;
//             }else if(count === Number(end)){
//                 realIndexEnd = w;
//             }
//             count++;
//         }
//     }
//
//     Array.prototype.move = function (from, to) {
//         this.splice(to, 0, this.splice(from, 1)[0]);
//     };
//     widgets.move(realIndexStart,realIndexEnd);
//     return;
// }

function deleteWidget(req, res) {
    var _widgetId = req.params.widgetId;
    widgetModel.findWidgetById(_widgetId)
        .then(function (widget) {
            var _pageId = widget._page.toString();
            widgetModel.deleteWidget(_widgetId, _pageId)
                .then(function (status) {
                    res.send(status);
                })

        })

}

function updateWidget(req, res) {
    var _widgetId = req.params.widgetId;
    var _widget = req.body;
    widgetModel.updateWidget(_widgetId,_widget)
        .then(function (status) {
            res.send(status);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}

// function findWidgetByIdentity(id) {
//     var widgetId = id;
//     for (var w in widgets) {
//         var _widget = widgets[w];
//         if (_widget._id === widgetId) {
//             return _widget;
//         }
//     }
//    return;
// }

function findAllWidgetsForPage(req, res) {
    var _pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(_pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function createWidget(req, res) {
    var _widget = req.body;
    var _pageId = req.params.pageId;
    widgetModel
        .createWidget(_pageId, _widget)
        .then(function (widget) {
            res.json(widget);
        });
}


