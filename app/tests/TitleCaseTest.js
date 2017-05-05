/**
 * This script tests the Dropdown.js
 */
describe('TitleCase.js', function () {
    beforeEach(function() {
        module('sales-events');
        module('jasmine.templates');

        inject(function($compile, $rootScope) {
            compile = $compile;
            this.scope = $rootScope.$new();
            this.scope.sampleText = 'HELLO';
        });

        directiveElem = getCompiledElement(this.scope);
    });

    function getCompiledElement(scope) {
        var element = angular.element('<span class="sample">{{sampleText | titleCase}}</span>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    describe('TitleCase.js test cases', function() {
        it('should titlecase any text', function () {
            expect(directiveElem.text()).toEqual('Hello');
        });
    });
});