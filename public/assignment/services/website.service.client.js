
(function() {
    angular
        .module("WebAppMaker")
        .factory("websiteService", websiteService);
    function websiteService($http) {

        var api = {
            "createWebsite"   : createWebsite,
            "findWebsiteById" : findWebsiteById,
            "findWebsiteByUserId" : findWebsiteByUserId,
            "updateWebsite": updateWebsite,
            "deleteWebsite" : deleteWebsite,
        };
        return api;
        function createWebsite(userId, website) {
            var url = "/api/user/" + userId +"/website" ;
            return $http.post(url, website);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }
        function findWebsiteByUserId(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);

        }
        function updateWebsite(websiteId,website) {
            var url = "/api/website/" + websiteId ;
            return $http.put(url, website);
        }


        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId ;
            return $http.delete(url);
        }
    }
})();

