(function () {
    angular
        .module("Musiker")
        .controller("searchController", searchController);

    function searchController(searchService) {
        var model = this;

        model.searchTrack = searchTrack;
        model.showDetails = showDetails;

        function searchTrack(song) {
            searchService.searchSong(song)
                .then(function (response) {
                    model.search = response.data.songList;
                    for(var u in model.search) {
                        // console.log(model.search[u].name);
                    }
                })
        }

        function showDetails(song) {
            model.song = song;
        }
    }
})();