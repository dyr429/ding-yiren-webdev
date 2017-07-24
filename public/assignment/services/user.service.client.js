
(function() {
    angular
        .module("WebAppMaker")
        .factory("userService", userService);
    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

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
            user._id = (new Date()).getTime() + "";
            users.push(user);
            return user;
        }
        function findUserById(userid) {
            for(var u in users){
                var _user = users[u];
                if(_user._id === userid){
                    return _user;
                }
            }
            return null;
        }
        function findUserByUsername(username) {
            for(var u in users){
                var _user = users[u];
                if(_user.username === username){
                    return _user;
                }
            }
            return null;

        }
        function findUserByCredentials(username,password) {
            for(var u in users){
                var _user = users[u];
                if(_user.username === username && _user.password === password){
                    return _user;
                }
            }
            return null;
        }

        function updateUser(userid, user) {
            for(var u in users){
               if(users[u]._id === userid){
                   users[u] = user;
                   return user;
               }
            }
            return null;

        }
        function deleteUser(userid) {
            for(var u in users){
                if(users[u]._id === userid){
                    var deletedUser = users[u];
                    if(u > -1){
                        users.splice(u,1);
                    }
                    return deletedUser;
                }
            }
            return null;
        }
    }
})();

