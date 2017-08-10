var app = require('../../express');
var pageModel = require('../model/page/page.model.server');
// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

// html handlers
app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);


function deletePage(req,res) {
    var _pageId = req.params.pageId;
    pageModel.findPageById(_pageId)
        .then(function (page) {
            var _websiteId = page._website.toString();
            pageModel.deletePage(_websiteId, _pageId)
                .then(function (status) {
                    res.send(status);
                })

        })
}

function updatePage(req,res) {
    var _pageId = req.params.pageId;
    var _page = req.body;
    pageModel
        .updatePage(_pageId, _page)
        .then(function (status) {
            res.send(status);
        });
}
function findPageById(req, res) {
    var _pageId = req.params.pageId;
    pageModel
        .findPageById(_pageId)
        .then(function (page) {
            res.json(page);
        })
}

function findAllPagesForWebsite(req,res){
    var _websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(_websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

function createPage(req,res) {
    var _newpage = req.body;
    var _websiteId = req.params.websiteId;
    pageModel
        .createPage(_newpage, _websiteId)
        .then(function (page) {
            res.json(page);
        });

}