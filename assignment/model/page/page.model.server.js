var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var userModel = require('../user/user.model.server');
var websiteModel = require('../website/website.model.server');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;
pageModel.deletePage = deletePage;


module.exports = pageModel;


//functions
function createPage(page, websiteid) {
    page._website = websiteid;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteid, page._id)
        })
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {$set: newPage});
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function deletePage(websiteId,pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deleteWebsite(websiteId, pageId);
        });
}

function addWidget(pageId, widgetId){
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}