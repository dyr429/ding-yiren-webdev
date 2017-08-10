(function() {
    angular
        .module("WebAppMaker")
        .controller("flickrImageSearchController", flickrImageSearchController)

    function flickrImageSearchController($routeParams,$location, flickrService, widgetService) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];
        model.websiteId = $routeParams["wid"];
        model.pageId = $routeParams["pid"];
        model.widgetId = $routeParams["wgid"];

        //declare function
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;


        //initial function
        function init() {
           console.log("initial");
        }
        init();

        //functions
        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    console.log(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_s.jpg";
            widgetService.findWidgetById(model.widgetId)
                .then(function (response) {
                    _widget = response.data;
                    _widget.url = url;
                    widgetService
                        .updateWidget(model.widgetId,_widget)
                        .then(function () {
                            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page/"
                                + model.pageId + "/widget/" + model.widgetId);
                        });
                })

        }


    }

})();