/**
 * @description the directive for rendering a list of data
 * @author Akshay Abraham
 *
 * @usage <list headers=""></list>
 *
 * @details This attribute has the following configuration options:-
 *
 *  @headers            variable to maintain the list of headers for the table
 *  @dataItems          variable which holds the list of attributes of each list-item that need to be displayed
 *  @service            service which provides the available options (mandatory)
 *  @factory            injectable factory which provides the service to get available options (mandatory)
 */

(function () {
   'use strict';
}());

angular.module('sales-events').directive('list', ['$http', '$injector', '$rootScope', function ($http, $injector, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            columnWidths: '=',
            include: '=',
            factory: '@',
            headers: '=',
            jsonPath: '@',
            responseName: '@',
            service: '@'
        },
        templateUrl: 'scripts/components/list.html',
        link: function($scope, elm, attr, ctrl, transclude) {
            if ($scope.service && $scope.factory) {
                var dataFactory = $injector.get($scope.factory);

                dataFactory[$scope.service]().then(function(res) {
                    $scope.data = angular.copy(res.data);
                });
            } else {
                $http.get($scope.jsonPath).then(function(res) {
                    $scope.data = angular.copy(res.data[$scope.responseName]);
                });
            }
        }
    };
}]);