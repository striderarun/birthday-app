/**
 * @description the directive for rendering a modal based on the triggered action
 * @author Akshay Abraham
 *
 * @usage <modal onCancel="mockMethod" onDone="mockMethod" showModal="booleanVal"/>
 *
 * @details This attribute has the following configuration options:-
 *
 *  @onCancel           method which runs on cancelling modal operation
 *  @onDone             method which runs on continuing with modal operation
 *  @showModal          variable which determines whether to show or hide the modal
 */

(function () {
   'use strict';
}());

angular.module('sales-events').directive('modal', ['$interpolate', function ($interpolate) {
    return {
        require: '^directiveController',
        restrict: 'E',
        scope: {
            cancelBtnText: '=',
            doneBtnText: '=',
            modalMessage: '=',
            onCancel: '&',
            onDone: '&',
            showModal: '='

        },
        templateUrl: 'scripts/components/modal.html',
        link: function($scope, elm, attr, ctrl) {
            ctrl.displayDirectiveName('modal');
        }
    };
}]);