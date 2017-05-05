/**
 * @description a common controller for all directives
 * @author Akshay Abraham
 */

angular.module('sales-events').directive('directiveController', [function () {
    return {
        controller: function () {
            /**
             * @description A simple method to display directive name
             */
            this.displayDirectiveName = function (dirName) {
                console.log('The ' + dirName + ' directive has been initialized.');
            };
        }
    }
}]);