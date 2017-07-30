var app = require('../../express');
var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

// html handlers
app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);


function deletePage(req,res) {
    var pageId = req.params.pageId;
    for(var p in pages){
        if(pages[p]._id === pageId){
            if(p > -1){
                var deleted = pages[p];
                pages.splice(p,1);
            }
            return res.send(deleted);
        }
    }
    res.sendStatus(404);
}

function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for(var p in pages){
        if(pages[p]._id === pageId){
            pages[p] = page;
            return res.send(page);
        }
    }
    res.sendStatus(404);
}
function findPageById(req, res) {
    var pageId = req.params.pageId;
    for(var p in pages){
        var _page = pages[p];
        if(_page._id === pageId){
            return res.send(_page);
        }
    }
    res.sendStatus(404);
}

function findAllPagesForWebsite(req,res){
    var websiteId = req.params.websiteId;
    var result = [];
    for(var p in pages){
        var _page = pages[p];
        if(_page.websiteId === websiteId){
            result.push(_page);
        }
    }
    return res.send(result);
}

function createPage(req,res) {
    var page = req.body;
    page._id = (new Date()).getTime() + ""
    page.websiteId = req.params.websiteId;
    pages.push(page);
    return res.send(page);
}