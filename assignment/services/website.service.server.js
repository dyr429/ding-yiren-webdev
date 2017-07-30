var app = require('../../express');
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
    var websiteId = req.params.websiteId;
    var website = req.body;
    for(var w in websites){
        if(websites[w]._id === websiteId){
            websites[w] = website;
            return res.send(website);
        }
    }
    res.sendStatus(404);
}
function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    for(var w in websites){
        var _website = websites[w];
        if(_website._id === websiteId){
            return res.send(_website);
        }
    }
    res.sendStatus(404);
}

function findAllWebsitesForUser(req,res){
    var userId = req.params.userId;
    var result = [];
    for(var w in websites){
        var _website = websites[w];
        if(_website.developerId === userId){
            result.push(_website);
        }
    }
    return res.send(result);
}

function createWebsite(req,res) {
    var website = req.body;
    website._id = (new Date()).getTime() + ""
    website.developerId = req.params.userId;
    websites.push(website);
    return res.send(website);
}