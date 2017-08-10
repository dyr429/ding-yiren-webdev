
(function() {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController)

    function pageEditController($routeParams,$location, pageService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        //declare function
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        //initial function
        function init() {
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response.data;
                });
            pageService.findPageById(model.pageId)
                .then(function (response) {
                    model.thispage = response.data;
                });

        }
        init();

        //functions
        function updatePage(){
            pageService.updatePage(model.pageId, model.thispage)
                .then(function (response) {
                    if(response.data != "0"){
                        alert("update success");
                        $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
                    }
                    else{
                        alert("update fail");
                    }}
                );

        }

        function deletePage(){
            pageService.deletePage(model.pageId)
                .then(function (response) {
                    var deletepage = response.data;
                    if(deletepage != "0"){
                        alert("delete success")
                        $location.url("user/" +model.userId + "/website/" + model.websiteId + "/page");
                    }else{
                        alert("delete fail");
                    }
                });

        }


    }

})();