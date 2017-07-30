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
            websiteService.findWebsiteByUserId(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
        }
        init();

        function newWebsite() {
            var _website = model.newwebsite;
            websiteService.createWebsite(model.userId, _website)
                .then(function (response) {
                    _website = response.data;
                    if(_website != "0"){
                        $location.url("user/" + model.userId + "/website");
                    }
                    return;
                })

        }

    }

})();