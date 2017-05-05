/**
 * @description a filter to return a modified list based on entered user parameters
 * @author Akshay Abraham
 *
 * @usage <div ng-repeat="name in FootballClubs"> {{ name.CompanyName | titleCase }} </div>
 */

angular.module('sales-events').filter('listFilter', function() {
    return function (list, searchText, searchParam) {
        var filteredList = [];

        if (searchText) {
            angular.forEach(list, function (value, key) {
                if (value[searchParam].indexOf(searchText) !== -1) {
                    filteredList.push(value);
                }
            });
        } else {
            filteredList = list;
        }

        return filteredList;
    };
});