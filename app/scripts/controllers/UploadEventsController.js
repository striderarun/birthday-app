/**
 * @description the controller for upload-events.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').controller('UploadEventsController', ['$scope', function ($scope) {
    $scope.init = function () {
        $scope.usersTableConfig = {
            "headers": ['ID', 'First Name', 'Middle Name', 'Last Name', 'Gender', 'Birth Date', 'Primary Email'],
            "include": ['id', 'firstName', 'middleName', 'lastName', 'gender', 'birthdate', 'primaryEmail'],
            "columnWidths": ["100px", "250px", "250px", "250px", "250px", "250px", "250px"]
        }
    };

    $scope.init();
}]);