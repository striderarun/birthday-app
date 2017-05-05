/**
 * @description the controller for add-group.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').controller('AddGroupController', ['$scope', '$rootScope', 'groupsService', 'eventsConstants', 'routes', '$state', function ($scope, $rootScope, groupsService, eventsConstants, routes, $state) {
    /**
     * @description this method is run on load of the add-group.html
     */
    $scope.init = function () {
        $scope.formData = {
            name: '',
            invitees: []
        };

        $scope.options = {
            minDate: null,
            showWeeks: false
        };
    };

    /**
     * @description this method is used to save a group
     */
    $scope.saveGroup = function () {
        var group = {};

        angular.copy($scope.formData, group);

        groupsService.saveGroup(group).then(function (res) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.SAVE_SUCCESS,
                doneBtnTxt: eventsConstants.REDIRECT_TO_LIST_VIEW,
                cancelBtnTxt: eventsConstants.CREATE_NEW_EVENT,
                onDone: $scope.redirectToListView,
                onCancel: $scope.reloadPage
            };
        }, function (error) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.ERROR_ENCOUNTERED,
                doneBtnTxt: eventsConstants.SH_T
            };
        }).finally (function () {
            //TODO
        });
    };

    $scope.init();
}]);