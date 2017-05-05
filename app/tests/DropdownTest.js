/**
 * This script tests the Dropdown.js
 */
describe('Dropdown.js', function () {
    beforeEach(function() {
        module('sales-events');
        module('jasmine.templates');

        inject(function($compile, $rootScope) {
            compile = $compile;
            this.scope = $rootScope.$new();

            this.scope.availableOptions = ['Sample 1', 'Sample 2', 'Sample 3'];
            this.scope.selectedOptions = [];
            this.scope.dropdownWidth = '300';
            this.scope.placeholder = 'This is a placeholder';
        });

        directiveElem = getCompiledElement(this.scope);
    });

    function getCompiledElement(scope) {
        var element = angular.element('<dropdown available-options="availableOptions" selected-options="selectedOptions" dropdown-width="dropdownWidth"></dropdown>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    describe('Dropdown.js test cases', function() {
        it('should have a div element with class "dropdown"', function() {
            var divElement = directiveElem.find('div.dropdown');
            expect(divElement).toBeDefined();
        });

        it('should have a dropdown width equal to the width value passed with the "dropdown-width" attribute of the directive', function() {
            var divElement = directiveElem.find('div.dropdown');
            expect(divElement.css('width')).toEqual(this.scope.dropdownWidth + 'px')
        });

        it('should have an input element with class "input field"', function() {
            var divElement = directiveElem.find('div.input-field');
            expect(divElement).toBeDefined();
        });

        it('should not display a dropdown without any click triggered', function() {
            expect(directiveElem.find('.dropdown-content')).toHaveClass('dropdown-hidden');
        });

        it('should display a dropdown on clicking the input element with class "input field"', function() {
            var divElement = directiveElem.find('div.input-field');
            divElement.trigger('click');

            expect(directiveElem.find('.dropdown-content')).toHaveClass('dropdown-visible');
        });

        it('should hide the dropdown on focusing outside the input element with class "input field"', function() {
            var divElement = directiveElem.find('div.input-field');
            divElement.trigger('click');

            expect(directiveElem.find('.dropdown-content')).toHaveClass('dropdown-visible');

            $(divElement.find('input')).blur();
            expect(directiveElem.find('.dropdown-content')).toHaveClass('dropdown-hidden');
        });

        it('should add selected options to the appropriate attribute', function() {
            var divElement = directiveElem.find('div.input-field');
            divElement.trigger('click');

            expect(directiveElem.find('.dropdown-content')).toHaveClass('dropdown-visible');

            expect(this.scope.selectedOptions.length).toEqual(0);
            directiveElem.find('.dropdown-option:first').trigger('click');
            expect(this.scope.selectedOptions.length).toEqual(1);
        });

        it('should allow removal of selected options by clicking the (x) adjacent to each pill', function() {
            var divElement = directiveElem.find('div.input-field');
            divElement.trigger('click');

            expect(directiveElem.find('.dropdown-content')).toHaveClass('dropdown-visible');

            expect(this.scope.selectedOptions.length).toEqual(0);
            directiveElem.find('.dropdown-option:first').trigger('click');
            expect(this.scope.selectedOptions.length).toEqual(1);

            directiveElem.find('.selected-option:first .fa-times').trigger('click');
            expect(this.scope.selectedOptions.length).toEqual(0);
        });
    });
});