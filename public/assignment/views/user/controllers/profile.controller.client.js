
(function() {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController)

    function profileController($routeParams,$location, userService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        //declare function
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.showPassword = showPassword;

        //initial function
        function init() {
            model.user = cloneObj(userService.findUserById(model.userId));
        }
        init();

        //functions
        function updateUser(user){
            var _user = userService.updateUser(user._id, user);
            model.user = cloneObj(_user);
            if(_user){
                alert("update scceuss")
            }
     //       $location.url("user/" + user._id);
        }

        function unregister(){
            userService.deleteUser(model.userId);
            $location.url("/");
        }

        function showPassword() {
            var pass=document.getElementById("pass");
            var passbtn = document.getElementById("passbtn");
            if(pass.type === "text"){
                pass.type = "password";
                passbtn.innerHTML = "Show Password";
            }else{
                pass.type = "text";
                passbtn.innerHTML = "Hide Password";
            }

        }


    }

})();