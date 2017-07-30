
(function() {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController)

    function pageListController($routeParams,$location, pageService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];

        //declare function
        //initial function
        function init() {
             pageService.findPageByWebsiteId(model.websiteId)
                 .then(function (response) {
                     model.pages = response.data;
                 });
        }
        init();

        //functions
    }

})();