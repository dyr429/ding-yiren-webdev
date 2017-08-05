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
                templateUrl: "views/search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/play", {
                templateUrl: "views/play.html",
            })


    }
}());

