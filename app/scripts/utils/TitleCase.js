/**
 * @description a filter to camelcase text on the UI
 * @author Akshay Abraham
 *
 * @usage <div ng-repeat="name in FootballClubs"> {{ name.CompanyName | titleCase }} </div>
 */

angular.module('sales-events').filter('titleCase', function() {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
});