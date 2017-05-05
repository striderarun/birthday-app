/**
 * @description the factory for group-related services
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').factory('groupsService', ['eventsUrls', '$http', '$q', function (eventsUrls, $http, $q) {
    var groupsService = {};

    /**
     * @description this method fetches all groups
     */
    groupsService.fetchGroups = function () {
        return $http.get(eventsUrls.GROUPS_FETCH);
    };

    /**
     * @description this method saves a user
     */
    groupsService.saveGroup = function (group) {
        return $http.put(eventsUrls.GROUP_SAVE, group);
    };

    return groupsService;
}]);