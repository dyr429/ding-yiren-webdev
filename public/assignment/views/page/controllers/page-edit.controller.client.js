
(function() {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController)

    function pageEditController($routeParams,$location, pageService) {
        //declare controller
        var model = this;
        //variable from path
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var pageId = $routeParams["pid"];
        //declare function
        model.updatePage = updatePage;
        model.deletePage = deletePage;


        // var cloneObj = function(obj){
        //     var str, newobj = obj.constructor === Array ? [] : {};
        //     if(typeof obj !== 'object'){
        //         return;
        //     } else if(window.JSON){
        //         str = JSON.stringify(obj),
        //             newobj = JSON.parse(str);
        //     } else {
        //         for(var i in obj){
        //             newobj[i] = typeof obj[i] === 'object' ?
        //                 cloneObj(obj[i]) : obj[i];
        //         }
        //     }
        //     return newobj;
        // };
        //initial function
        function init() {
            model.pages = pageService.findPageByWebsiteId(websiteId);
            model.thispage = cloneObj(pageService.findPageById(pageId));
            model.userId = userId;
            model.websiteId = websiteId;
            model.pageId = pageId;
        }
        init();

        //functions
        function updatePage(){
            var _page = pageService.updatePage(pageId, model.thispage);
            if(_page){
                alert("update scceuss")
            }
            $location.url("user/" + userId + "/website/" + websiteId + "/page");
        }

        function deletePage(){
            pageService.deletePage(pageId);
            $location.url("user/" + userId + "/website/" + websiteId + "/page");
        }


    }

})();