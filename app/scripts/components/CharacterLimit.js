/**
 * @description the directive for displaying the characters remaining for an input field
 * @author Akshay Abraham
 *
 * @usage <input type="text" ng-model="formData.title" class="event-title" placeholder="Enter the event's title" character-limit required/>
 *
 * @details This attribute has the following configuration options:-
 *
 *  @characterLimit           character limit for the input field on which this directive is specified
 */

(function () {
   'use strict';
}());

angular.module('sales-events').directive('characterLimit', ['$compile', function ($compile) {
    return {
        require: '^directiveController',
        restrict: 'A',
        scope: {
            characterLimit: '='
        },
        link: function($scope, elm, attr, ctrl, transclude) {
            ctrl.displayDirectiveName('characterLimit');

            var characterLimitElement = angular.element('<div class="chars-remaining"> {{remaining}} character(s) remaining</span>'),
                maxlength = parseInt(attr.maxlength);

            $scope.remaining = maxlength - $scope.characterLimit.length;

            $scope.appendToInput = function() {
                elm.parent().append($compile(characterLimitElement)($scope));
            };

            $scope.$watch('characterLimit', function (newVal, oldVal) {
                $scope.remaining = $scope.characterLimit ? maxlength - $scope.characterLimit.length : maxlength;
                $scope.appendToInput();
            });

            $scope.appendToInput();
        }
    };
}]);