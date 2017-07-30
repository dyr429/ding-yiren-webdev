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
            if (model.user.password === model.verifypassword) {
                userService.findUserByCredentials(user.username)
                    .then(function (response) {
                        var responseuser = response.data;
                        if (responseuser === "0") {
                            return userService.createUser(user);
                        } else {
                            model.errorMessage = "username already exist";
                        }
                        return "err";
                    })
                    .then(function(response){
                        if(response != "err"){
                            user = response.data;
                            $location.url("/user/" + user._id);
                        }
                        else{
                            model.errorMessage = "something goes wrong";
                        }


                        });
            }else{
                model.errorMessage = "password do not match";
                return;
            }
        }
    }
})();