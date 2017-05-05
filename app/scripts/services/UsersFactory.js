/**
 * @description the factory for user-related services
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').factory('usersService', ['eventsUrls', '$http', '$q', function (eventsUrls, $http, $q) {
    var usersService = {};

    /**
     * @description this method fetches all users
     */
    usersService.fetchUsers = function () {
        return $http.get(eventsUrls.USERS_FETCH);
    };

    /**
     * @description this method saves a user
     */
    usersService.saveUser = function (user) {
        return $http.put(eventsUrls.USERS_SAVE, user);
    };

    usersService.fetchUserImage = function (userId) {
        var url = eventsUrls.USERS_UPLOAD_PROFILE_IMAGE.replace('<userId>', userId);
        return $http.get(url);
    };

    return usersService;
}]);