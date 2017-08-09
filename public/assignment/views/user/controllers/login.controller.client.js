
(function() {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController)

        function loginController($location, userService, $rootScope) {
            var model = this;
            model.login = login;
            function init() {
            }
            init();

            function login(user) {
                userService.findUserByCredentials(user.username, user.password)
                    .then(function(response){
                        user = response.data;
                        if (!user) {
                            model.errorMessage = "wrong username or password";
                        } else {
                            $rootScope.currentUser = user;
                            $location.url("user/" + user._id);
                        }
                    });

        }

    }

})();

