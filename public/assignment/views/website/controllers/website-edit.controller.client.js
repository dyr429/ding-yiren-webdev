
(function() {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController)

    function websiteEditController($routeParams,$location, websiteService) {
        //declare controller
        var model = this;
        //variable from path
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        //declare function
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;


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
            model.websites = websiteService.findWebsiteByUserId(userId);
            model.thiswebsite = cloneObj(websiteService.findWebsiteById(websiteId));
            model.userId = userId;
            model.websiteId = websiteId;
        }
        init();

        //functions


        function updateWebsite(user){
            var _website = websiteService.updateWebsite(websiteId, model.thiswebsite);
            if(_website){
                alert("update scceuss")
            }
            $location.url("user/" + userId + "/website");
        }

        function deleteWebsite(){
            websiteService.deleteWebsite(websiteId);
            $location.url("user/" + userId + "/website");
        }


    }

})();