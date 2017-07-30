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
            pageService.findPageByWebsiteId(model.websiteId)
                .then(function (response) {
                    model.pages = response.data;
                });
        }
        init();

        function newPage() {
            pageService.createPage(model.websiteId, model.newpage)
                .then(function (response) {
                    if(response.data != "0")
                        $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
                    else
                        alert("cannot create new page");
                });
        }

    }

})();