
(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController)

        function loginController($location, userService) {
            var model = this;
            model.login = login;
            function init() {
            }
            init();

            function login(user) {
                var user = userService.findUserByCredentials(user.username, user.password);
                if (!user || user === null) {
                    model.errorMessage = "wrong username or password";
                } else {
                    $location.url("user/" + user._id);
                }
        }

    }

})();

