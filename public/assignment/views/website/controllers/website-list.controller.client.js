
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
           websiteService.findWebsiteByUserId(model.userId)
               .then(function (response) {
                   model.websites = response.data;
               });
        }
        init();

        //functions


    }

})();