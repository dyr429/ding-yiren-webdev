/**
 * Created by Chuhan on 8/11/17.
 */
(function () {
    angular
        .module("Musiker")
        .factory("userService", userService);


    function userService($http) {

        var api =  {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials":findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "removeSong":removeSong,
            "addSong":addSong,
            "findFollowingByUser":findFollowingByUser,
            "findFollowersByUser":findFollowersByUser,
            "addFollowingByUser":addFollowingByUser,
            "addFollowersByUser":addFollowersByUser
        };

        return api;

        function findUserByCredentials(username,password) {
            var url = "/projectapi/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/projectapi/user/" + userId;
            return $http.get(url);

        }

        function createUser(user) {
            var url = "/projectapi/user";
            return $http.post(url,user);
        }

        function findUserByUsername(username) {
            console.log("userService" + username);
            var url = "/projectapi/user?username="+username;
            return $http.get(url);
        }

        function updateUser(userId,user){
            var url = "/projectapi/user/" + userId;
            return $http.put(url,user);
        }

        function deleteUser(userId){
            var url = "/projectapi/user/" + userId;
            return $http.delete(url);

        }

        function removeSong(userId, songId) {
            var url = "/projectapi/user/" + userId + "/song/" + songId;
            return $http.delete(url);
        }

        function addSong(userId, songId) {
            var url = "/projectapi/user/" + userId + "/song/" + songId;
            return $http.post(url);
        }

        function findFollowingByUser(userId) {
            var url = "/projectapi/user/" + userId + "/following";
            return $http.get(url);
        }

        function findFollowersByUser(userId) {
            var url = "/projectapi/user/" + userId + "/follower";
            return $http.get(url);
        }

        function addFollowingByUser(userId, followingId) {
            var url = "/projectapi/user/" + userId + "/following/" + followingId;
            return $http.put(url);
        }

        function addFollowersByUser(userId, followerId) {
            var url = "/projectapi/user/" + userId + "/follower/" + followerId;
            return $http.put(url);
        }
    }

})();