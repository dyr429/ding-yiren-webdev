
(function() {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController)

    function pageEditController($routeParams,$location, userService) {
        //variable from path
        var userId = $routeParams["uid"];
        //declare controller
        var model = this;
        //declare function
        model.updateUser = updateUser;
        model.unregister = unregister;

        //initial function
        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        //functions
        function updateUser(user){
            var _user = userService.updateUser(user._id, user);
            if(_user){
                alert("update scceuss")
            }
            $location.url("user/" + user._id);
        }

        function unregister(){
            userService.deleteUser(userId);
            $location.url("/");
        }

    }

})();