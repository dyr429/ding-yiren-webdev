
var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/uploads'});

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


// html handlers
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

    var thiswidget = findWidgetByIdentity(widgetId);
    thiswidget.url = '/uploads/' + filename;

    var callbackUrl = "/assignment/#!/user/" +  userId +"/website/"+websiteId+"/page/"+pageId+"/widget/"+ widgetId;
    res.redirect(301, callbackUrl);

}


function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            if (w > -1) {
                var deleted = widgets[w];
                widgets.splice(w, 1);
            }
            return res.send(deleted);
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w] = widget;
            return res.send(widget);
        }
    }
    res.sendStatus(404);
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget._id === widgetId) {
            return res.send(_widget);
        }
    }
    res.sendStatus(404);
}

function findWidgetByIdentity(id) {
    var widgetId = id;
    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget._id === widgetId) {
            return _widget;
        }
    }
   return;
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    var result = [];
    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget.pageId === pageId) {
            result.push(_widget);
        }
    }
    return res.send(result);
}

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + ""
    widget.pageId = req.params.pageId;
    widgets.push(widget);
    return res.send(widget);
}
