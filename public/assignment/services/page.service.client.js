
(function() {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);
    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];


        var api = {
            "createPage"   : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById" : findPageById,
            "updatePage": updatePage,
            "deletePage" : deletePage,
        };
        return api;
        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageById(pageId) {
            for(var p in pages){
                var _page = pages[p];
                if(_page._id === pageId){
                    return _page;
                }
            }

            return null;
        }
        function findPageByWebsiteId(websiteId) {
            var result = new Array();
            for(var p in pages){
                var _page = pages[p];
                if(_page.websiteId === websiteId){
                    result.push(_page);
                }
            }
            return result;

        }
        function updatePage(pageId,page) {
            for(var p in pages){
                if(pages[p]._id === pageId){
                    pages[p] = page;
                    return page;
                }
            }
            return null;
        }


        function deletePage(pageId) {
            for(var p in pages){
                if(pages[p]._id === pageId){
                    var deleted = pages[p];
                    if(p > -1){
                        pages.splice(p,1);
                    }
                    return deleted;
                }
            }
            return null;
        }
    }
})();

