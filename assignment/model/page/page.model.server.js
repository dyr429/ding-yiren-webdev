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

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}