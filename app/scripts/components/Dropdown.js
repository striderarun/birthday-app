/**
 * @description the directive for rendering a dropdown
 * @author Akshay Abraham
 *
 * @usage <dropdown selected-options="selectedOptions" available-options="availableOptions" dropdown="Enter gender" dropdown-width="30" placeholder="Provide a gender" selection-limit="2"/>
 *
 * @details This attribute has the following configuration options:-
 *
 *  @ngModel            variable to maintain the list of selected options (mandatory)
 *  @placeholder        provide a placeholder
 *  @dropdownWidth      provide the width of the dropdown and the pill container (in percentage)
 *  @selectionLimit     provide the maximum number of options that can be selected, after which selection is blocked
 *  @outputType         provide the type of output; 'array' or 'string'. This is a mandatory value (mandatory)
 *  @factory            injectable factory which provides the service to get available options (mandatory)
 *  @service            service which provides the available options (mandatory)
 *  @jsonPath           provides the json path which has the available options (mandatory)
 *  @sortOptionsBy      provide the value based on which you would like to sort the available and selected options (mandatory)
 *  @optionAs           provide the content to display in each available and selected option. This value must be an angular expression (mandatory)
 *  @showCheckbox       boolean value which determines whether the checkbox is displayed or not
 *  @responseName       name of the data list in the response (mandatory)
 *  @outputType         provide the type of output to store (array or string) (mandatory)
 *  @outputParam        provide the output parameter on the basis of which the string or array is formulated (mandatory)
 *  @onChange           callback to run on selecting an option
 *  @selectedOptions    parameter in which the details of the selected options can be accessed outside the directive
 */

(function () {
   'use strict';
}());

angular.module('sales-events').directive('dropdown', ['$http', '$injector', '$rootScope', function ($http, $injector, $rootScope) {
    return {
        require: '^directiveController',
        restrict: 'E',
        scope: {
            ngModel: '=',
            placeholder: '@',
            dropdownWidth: '=',
            selectionLimit: '=',
            jsonPath: '@',
            optionAs: '@',
            responseName: '@',
            outputType: '@',
            outputParam: '@',
            sortOptionsBy: '@',
            selectedOptions: '=?',
            service: '@',
            factory: '@',
            showCheckbox: '=',
            onChange: '&'
        },
        templateUrl: 'app/scripts/components/dropdown.html',
        link: function($scope, elm, attr, ctrl, transclude) {
            ctrl.displayDirectiveName('dropdown');

            $scope.ngModel = $scope.ngModel || ($scope.outputType === 'array' ? [] : '');
            $scope.selectedOptions = $scope.selectedOptions || ($scope.outputType === 'array' ? [] : '');
            $scope.filteredOptions = [];
            $scope.temp = {
                isSelected: false
            };

            $scope.fetchDropdownOptions = function () {
                if ($scope.service && $scope.factory) {
                    var dataFactory = $injector.get($scope.factory);

                    dataFactory[$scope.service]().then(function(res) {
                        $scope.availableOptions = angular.copy(res.data);
                        $scope.options = angular.copy(res.data);

                        $scope.options.sort(compare);
                        $scope.availableOptions.sort(compare);
                        $scope.populateDropdownOnInit();
                    });
                } else {
                    $http.get($scope.jsonPath).then(function(res) {
                        $scope.availableOptions = angular.copy(res.data[$scope.responseName]);
                        $scope.options = angular.copy(res.data[$scope.responseName]);

                        $scope.options.sort(compare);
                        $scope.availableOptions.sort(compare);
                        $scope.populateDropdownOnInit();
                    });
                }
            };

            $scope.populateDropdownOnInit = function() {
                var selectedOptionIds = [],
                    updatedAvailableOptions;

                if ($scope.ngModel && $scope.ngModel.constructor === Array && $scope.ngModel.length > 0) {
                    angular.forEach($scope.ngModel, function (value, key1) {
                        var id = parseInt(value, 10);

                        angular.forEach($scope.availableOptions, function (option, key2) {
                            if (option[$scope.outputParam] === id) {
                                $scope.selectedOptions.push(option);
                                selectedOptionIds.push(parseInt(value, 10));
                            }
                        });
                    });
                } else {
                    angular.forEach($scope.availableOptions, function (option, key2) {
                        if (option[$scope.outputParam] === $scope.ngModel) {
                            $scope.selectedOptions.push(option);
                            selectedOptionIds.push(option[$scope.outputParam]);
                        }
                    });
                }

                $scope.availableOptions = $.grep($scope.availableOptions, function (option, key) {
                    return $.inArray(option[$scope.outputParam], selectedOptionIds) === -1;
                });
            };

            $scope.displayOptions = function (event) {
                if ($scope.selectedOptions.length !== $scope.selectionLimit && !$(event.target).hasClass('fa-times')) {
                    $(elm).find('input[type="text"]').focus();
                    $(elm).find('.dropdown-content')
                        .slideDown(250)
                        .addClass('dropdown-visible')
                        .removeClass('dropdown-hidden');
                }
            };

            $scope.hideOptions = function () {
                $scope.isFocused = false;
                $(elm).find('.dropdown-content .dropdown-option').removeClass('hover');
                $(elm).find('.dropdown-content')
                    .slideUp(250)
                    .addClass('dropdown-hidden')
                    .removeClass('dropdown-visible');
            };

            $scope.navigate = function (event) {
                var selectedElement = $(elm).find('.hover');

                if ($(elm).find('.dropdown-content').hasClass('dropdown-hidden')) {
                    $scope.displayOptions(event);
                } else {
                    $(elm).find('.dropdown-content .dropdown-option').removeClass('hover');
                }

                if (selectedElement[0]) {
                    if (event.keyCode === 38) {
                        selectedElement.parent().animate({ scrollTop: selectedElement.prev()[0].offsetTop }, "fast");
                        selectedElement.prev().addClass('hover');
                    } else if (event.keyCode === 40) {
                        selectedElement.parent().animate({ scrollTop: selectedElement.next()[0].offsetTop }, "fast");
                        selectedElement.next().addClass('hover');
                    } else if (event.keyCode === 13) {
                        $scope.selectOption(selectedElement.index(), null);
                    }
                } else {
                    $(elm).find('.dropdown-content .dropdown-option:first').addClass('hover');
                }
            };

            $scope.removeSelectedOption = function (index, event) {
                var removedOption = $scope.selectedOptions.splice(index, 1),
                    indexToRemove = -1;

                if ($scope.outputType === 'array') {
                    angular.forEach($scope.ngModel, function (value, key) {
                        if (removedOption[0][$scope.outputParam] === value) {
                            indexToRemove = key;
                        }
                    });

                    $scope.ngModel.splice(indexToRemove, 1);
                } else {
                    //TODO
                }

                angular.forEach($scope.options, function (value, key) {
                    if (value[$scope.outputParam] === removedOption[0][$scope.outputParam]) {
                        $scope.availableOptions.push(value);
                    }
                });

                $scope.availableOptions.sort(compare);
                $scope.temp.isSelected = false;
                $scope.onChange();
                $scope.hideOptions();
            };

            $scope.selectOption = function (index, event) {
                var indexToSplice,
                    selectedOption = $scope.filteredOptions[index];

                if ($scope.availableOptions.length > 0) {
                    $scope.selectedOptions.push(selectedOption);
                    $scope.selectedOptions.sort(compare);

                    if ($scope.outputType === 'array') {
                        $scope.ngModel.push($scope.filteredOptions[index][$scope.outputParam]);
                    } else {
                        //TODO
                    }

                    angular.forEach($scope.availableOptions, function (option, key) {
                        if (option[$scope.outputParam] === selectedOption[$scope.outputParam]) {
                            indexToSplice = key;
                        }
                    });

                    $scope.availableOptions.splice(indexToSplice, 1);
                    $scope.onChange();
                    $scope.hideOptions();
                    $scope.searchText = '';

                    $scope.temp.isSelected = $scope.availableOptions.length === 0;
                    $scope.isFocused = true;
                    $(elm).find('.input-field').animate({ scrollTop: $(elm).find('.input-field')[0].scrollHeight }, "slow");
                }
            };

            $scope.toggleSelect = function () {
                if ($scope.temp.isSelected) {
                    angular.forEach($scope.availableOptions, function (value, key) {
                        if ($scope.outputType === 'array') {
                            $scope.selectedOptions.push($scope.availableOptions[key]);
                            $scope.ngModel.push($scope.availableOptions[key][$scope.outputParam]);
                        } else {
                            //TODO
                        }
                    });

                    $scope.availableOptions = [];
                    $scope.selectedOptions.sort(compare);
                } else {
                    $scope.ngModel = [];
                    $scope.availableOptions = angular.copy($scope.options);
                    $scope.availableOptions.sort(compare);
                    $scope.selectedOptions = [];
                }

                $scope.onChange();
            };

            function compare(a,b) {
                if (a[$scope.sortOptionsBy] < b[$scope.sortOptionsBy])
                    return -1;
                if (a[$scope.sortOptionsBy] > b[$scope.sortOptionsBy])
                    return 1;
                return 0;
            }

            $scope.fetchDropdownOptions();
        }
    };
}]);