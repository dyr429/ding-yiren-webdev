var app = require('../../express');
var websiteModel = require('../model/website/website.model.server');
var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

// html handlers
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get("/api/website/:websiteId", findWebsiteById);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);


function deleteWebsite(req,res) {
    var websiteId = req.params.websiteId;
    for(var w in websites){
        if(websites[w]._id === websiteId){
            var deleted = websites[w];
            if(w > -1){
                websites.splice(w,1);
            }
            return res.send(deleted);
        }
    }
    res.sendStatus(404);
}

function updateWebsite(req,res) {
    var _websiteId = req.params.websiteId;
    var _website = req.body;
    websiteModel
        .updateWebsite(_websiteId,_website)
        .then(function (status) {
            res.send(status);
        });
}
function findWebsiteById(req, res) {
    var _websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(_websiteId)
        .then(function (website) {
            res.json(website);
        }, function (err){
            res.send(err);
        });
}

function findAllWebsitesForUser(req,res){
    var _userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(_userId)
        .then(function (websites) {
            res.json(websites);
        });

}

function createWebsite(req,res) {
    var website = req.body;
    var userid = req.params.userId;
    websiteModel
        .createWebsite(website,userid)
        .then(function (website) {
            res.json(website);
        });
}