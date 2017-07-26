(function() {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController)

    function pageNewController($location,$routeParams, pageService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        // declare functions
        model.newPage = newPage;
        // functins
        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function newPage() {
            pageService.createPage(model.websiteId, model.newpage);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");


        }

    }

})();