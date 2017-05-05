/**
 * @description the factory for event-related services
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').factory('eventsService', ['eventsUrls', '$http', '$q', function (eventsUrls, $http, $q) {
    var eventsService = {};

    /**
     * @description this method fetches all events for the selected month and year
     */
    eventsService.fetchEvents = function (month, year) {
        var params = {
               '<month>': month,
               '<year>': year
            },
            url = eventsUrls.EVENTS_FETCH;

        url = url.replace(/<month>|<year>/gi, function(match) {
            return params[match];
        });

        return $http.get(url);
    };

    /**
     * @description this method fetches an event by ID
     */
    eventsService.fetchEventByID = function (eventId) {
        var url = eventsUrls.EVENTS_FETCH_BY_ID.replace('<eventId>', eventId);
        return $http.get(url);
    };

    /**
     * @description this method saves an event
     */
    eventsService.saveEvent = function (event) {
        return $http.put(eventsUrls.EVENTS_SAVE, event);
    };

    /**
     * @description this method updates an event
     */
    eventsService.updateEvent = function (event) {
        return $http.post(eventsUrls.EVENTS_SAVE, event);
    };

    /**
     * @description this method deletes an event
     */
    eventsService.deleteEvent = function (eventId) {
        var url = eventsUrls.EVENTS_DELETE.replace('<eventId>', eventId);
        return $http.delete(url);
    };

    return eventsService;
}]);