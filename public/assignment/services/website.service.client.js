
(function() {
    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService);
    function websiteService() {
        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ]
        ;


        var api = {
            "createWebsite"   : createWebsite,
            "findWebsiteById" : findWebsiteByUserId,
            "findWebsiteByUserId" : findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite" : deleteWebsite,
        };
        return api;
        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites){
                var _website = websites[w];
                if(_website._id === websiteId){
                    return _website;
                }
            }
            return null;
        }
        function findWebsiteByUserId(userId) {
            var result = new Array();
            for(var w in websites){
                var _website = websites[w];
                if(_website.developerId === userId){
                    result.push(_website);
                }
            }
            return result;

        }
        function updateWebsite(websiteId,website) {
            for(var w in websites){
                if(websites[w]._id === websiteId){
                    websites[w] = website;
                    return website;
                }
            }
            return null;
        }


        function deleteWebsite(websiteId) {
            for(var w in websites){
                if(websites[w]._id === websiteId){
                    var deleted = websites[w];
                    if(w > -1){
                        websites.splice(w,1);
                    }
                    return deleted;
                }
            }
            return null;
        }
    }
})();

