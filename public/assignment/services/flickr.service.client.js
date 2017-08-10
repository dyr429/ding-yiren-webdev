
(function() {
    angular
        .module("WebAppMaker")
        .factory("flickrService", flickrService);
    function flickrService($http) {
        var api = {
            "searchPhotos"   : searchPhotos,

        };
        return api;


        function searchPhotos(searchTerm) {
            var key = "b146860e0706e3443a5cf383967f7a9b";
            var secret = "b80dc0a3a8f87156";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search"
                +"&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url).then(function (data) {
                return data;
            });
        }


    }
})();

