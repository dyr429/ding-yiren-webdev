(function() {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController)

    function registerController($location, userService) {
        var model = this;
        model.register = register;
        function init() {
        }
        init();

        function register(user) {
            var _user = userService.findUserByUsername(user.username);
            if (model.user.password === model.verifypassword) {
                if (!_user) {
                    var user = userService.createUser(user);
                    $location.url("/user/" + user._id);
                } else {
                    model.errorMessage = "username already exist";
                }
            }else{
                model.errorMessage = "password do not match";
            }



        }

    }

})();