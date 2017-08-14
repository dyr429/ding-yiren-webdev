(function () {
    angular
        .module("Musiker")
        .controller("songController", songController);

    function songController(songService, userService, $routeParams) {
        //declare controller
        var model = this;
        //variable from path
        model.userId = $routeParams["uid"];

        //declare function
        model.searchSong = searchSong;
        model.addToList = addToList;
        //initial function
        function init() {
            songService.findAllSongsByUser(model.userId)
                .then(function (response) {
                    if(response) {
                        model.mysongs = response.data;
                    }
                });
        }
        init();

        //functions
        function searchSong(searchContent) {
            songService.findSongBySongName(searchContent)
                .then(function (response) {
                    model.searchresult = response.data;
                })
        }

        function addToList() {
            userService.addSong(model.searchresult._id)
                .then(function (response) {
                    // model.searchresult = response.data;
                })
        }

        function uploadSong(songId) {
            songService.uploadSong(songId)
                .then(function (response) {
                    // model.searchresult = response.data;
                })
        }


    }
})();