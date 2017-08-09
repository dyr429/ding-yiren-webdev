var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var userModel = require('../user/user.model.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;


module.exports = websiteModel;


//functions
function createWebsite(website, userid) {
    website._user = userid;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userid, website._id)
        })
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}

function deletePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}