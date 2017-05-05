/**
 * @description the factory for email-related services
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').factory('emailsService', ['eventsUrls', '$http', '$q', function (eventsUrls, $http, $q) {
    var usersService = {};

    /**
     * @description this method fetches all users
     */
    usersService.sendReminder = function (id) {
        var url = eventsUrls.EMAILS_SEND_REMINDER.replace('<eventId>', id);
        return $http.post(url, null);
    };

    return usersService;
}]);