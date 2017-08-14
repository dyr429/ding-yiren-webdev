/**
 * Created by Chuhan on 8/4/17.
 */
(function () {
    angular
        .module("Musiker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/templates/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/play", {
                templateUrl: "views/templates/play.html"
            })
            .when("/register", {
                templateUrl: "views/templates/register.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/templates/login.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/templates/profile.html",
                controller: "profileController",
                controllerAs: "model"
            })
            .when("/user/:uid/follow", {
                templateUrl: "views/templates/follow.html",
                controller: "followController",
                controllerAs: "model"
            })
            .when("/user/:uid/song", {
                templateUrl: "views/templates/song.html",
                controller: "songController",
                controllerAs: "model"
            })


    }
}());

