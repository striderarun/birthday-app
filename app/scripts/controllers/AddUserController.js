/**
 * @description the controller for add-user.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').controller('AddUserController', ['$scope', '$rootScope', 'eventsConstants', 'routes', 'usersService', '$state', function ($scope, $rootScope, eventsConstants, routes, usersService, $state) {
    /**
     * @description this method is run on load of the add-user.html
     */
    $scope.init = function () {
        $scope.formData = {
            firstName: '',
            middleName: '',
            lastName: '',
            gender: [],
            birthDate: '',
            primaryEmail: '',
            secondaryEmail: ''
        };

        $scope.options = {
            minDate: null,
            showWeeks: false
        };
    };

    /**
     * @description this method is used to save a user
     */
    $scope.saveUser = function () {
        var user = {};

        angular.copy($scope.formData, user);

        user.gender = $scope.formData.gender.toString();
        user.birthDate = moment($scope.formData.birthDate).format(eventsConstants.DATE_SAVE_FORMAT);

        usersService.saveUser(user).then(function (res) {
            $scope.userId = res.data.id;

            $rootScope.overlay = {
                show: true,
                message: eventsConstants.SAVE_SUCCESS,
                doneBtnTxt: eventsConstants.UPLOAD_IMAGE_FOR.replace(eventsConstants.DUMMY_NAME, user.firstName),
                cancelBtnTxt: eventsConstants.CREATE_NEW_USER,
                onDone: $scope.redirectToUploadImageView,
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

    /**
     * @description This method redirects to the events list view
     */
    $scope.redirectToUploadImageView = function (userId) {
        $state.go(routes.UPLOAD_PROFILE_IMAGE, {userId: $scope.userId});
    };

    /**
     * @description This method reloads the page
     */
    $scope.reloadPage = function () {
        $state.reload();
    };

    $scope.init();
}]);