
(function() {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);
    function userService($http) {


        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser,
    };
        return api;
        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
            // return user;
        }
        function findUserById(userid) {
            return $http.get("/api/user/"+ userid);
            // for(var u in users){
            //     var _user = users[u];
            //     if(_user._id === userid){
            //         return _user;
            //     }
            // }
            // return null;
        }
        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
            // for(var u in users){
            //     var _user = users[u];
            //     if(_user.username === username){
            //         return _user;
            //     }
            // }
            // return null;

        }
        function findUserByCredentials(username,password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);

        }

        function updateUser(userid, user) {
            var url = "/api/user/" + userid;
            return $http.put(url,user);


        }
        function deleteUser(userid) {
            var url = "/api/user/" + userid;
            return $http.delete(url);

        }
    }
})();

