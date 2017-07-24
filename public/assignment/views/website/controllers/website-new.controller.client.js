(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController)

    function websiteNewController($location,$routeParams, websiteService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        // declare functions
        model.newWebsite = newWebsite;
        // functins
        function init() {
            model.websites = websiteService.findWebsiteByUserId(model.userId);
        }
        init();

        function newWebsite() {
            var _website = model.newwebsite;


        }

    }

})();