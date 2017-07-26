
(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController)

    function websiteListController($routeParams,$location, websiteService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];

        //declare function

        //initial function
        function init() {
            model.websites = websiteService.findWebsiteByUserId(model.userId);
        }
        init();

        //functions


    }

})();