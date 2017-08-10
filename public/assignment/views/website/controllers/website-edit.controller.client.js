
(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController)

    function websiteEditController($routeParams,$location, websiteService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        //declare function
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        //initial function
        function init() {
            websiteService.findWebsiteByUserId(model.userId)
                .then(function (response) {
                    model.websites = response.data;
                });
            websiteService.findWebsiteById(model.websiteId)
                .then(function (response) {
                    model.thiswebsite = response.data;
                });
        }
        init();

        //functions


        function updateWebsite(user){
            websiteService.updateWebsite(model.websiteId, model.thiswebsite)
                .then(function (response) {
                    var _website = response.data;
                    if(_website != "0"){
                        alert("update scceuss");
                    }
                });

            $location.url("user/" + model.userId + "/website");
        }

        function deleteWebsite(){
            websiteService.deleteWebsite(model.websiteId)
                .then(function (response) {
                    var deletewebsite = response.data;
                    if(deletewebsite != "0"){
                        alert("delete scceuss");
                    }
                });

            $location.url("user/" + model.userId + "/website");
        }


    }

})();