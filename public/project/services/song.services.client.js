(function () {
    angular
        .module("Musiker")
        .factory("songService", songService);


    function songService($http) {

        var api =  {
            "createSongForUser": createSongForUser,
            "findSongById": findSongById,
            "findSongBySongName":findSongBySongName,
            "findAllSongsByUser": findAllSongsByUser,
            "updateSong": updateSong,
            "deleteSong": deleteSong
        };

        return api;


        function findSongById(songId) {
            var url = "/projectapi/song/" + songId;
            return $http.get(url);
        }

        function findAllSongsByUser(userId) {
            var url = "/projectapi/user/" + userId + "/song";
            return $http.get(url);
        }

        function createSongForUser(userId, song) {
            var url = "/projectapi/user/" + userId + "/song";
            return $http.post(url,song);
        }

        function findSongBySongName(songname) {
            var url = "/projectapi/song?songname="+songname;
            return $http.get(url);
        }

        function updateSong(songId,song){
            var url = "/projectapi/song/" + songId;
            return $http.put(url,song);
        }

        function deleteSong(songId){
            var url = "/projectapi/song/" + songId;
            return $http.delete(url);
        }

    }

})();