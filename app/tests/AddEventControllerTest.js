/**
 * This script tests the AddEventControllerTest.js
 */
describe('AddEventControllerTest.js', function() {
    beforeEach(function() {
        module('sales-events');
        module('jasmine.templates');

        inject(function($compile, $rootScope, $controller, $q) {
            this.scope = $rootScope.$new();
            this.compile = $compile;
            q = $q;

            this.mockEventsService = {
                saveEvent: function(event) {
                    //TODO
                }
            };

            this.addEventController = function() {
                return $controller('AddEventController', {
                    $scope: this.scope,
                    eventsService: this.mockEventsService
                });
            };

            jasmine.getFixtures().fixturesPath = 'base/app/views/pages';
            loadFixtures('add-event.html');
        });
    });


    describe('AddEventControllerTest.js test cases', function() {
        it('should initialize the form object on controller initialization', function() {
            expect(this.scope.formData).toBeUndefined();
            this.addEventController();
            expect(this.scope.formData).toBeDefined();
        });

        it('should initialize the dropdown available options on controller initialization', function() {
            expect(this.scope.formData).toBeUndefined();
            this.addEventController();
            expect(this.scope.genderOptions.length).toEqual(2);
            expect(this.scope.eventTypeOptions.length).toEqual(4);
        });

        it('should not trigger a save on clicking "Save Event" if any field has missing values', function() {
            this.addEventController();
            spyOn(this.scope, 'saveEvent');
            $('button').trigger('click');
            expect(this.scope.saveEvent).not.toHaveBeenCalled();
        });

        it('should trigger a save on clicking "Save Event" when all fields are filled', function() {
            var htmlElement = $('html');
            this.addEventController();

            spyOn(this.mockEventsService, 'saveEvent').and.callFake(function(){
                var deferred = q.defer();
                return deferred.promise;
            });

            this.scope.formData = {
                date: '10-APR-16 18:28:54',
                description: 'John Doe',
                gender: ['Male'],
                receiverList: ['john_doe@gmail.com'],
                spotlightUsers: ['john_doe@gmail.com'],
                title: 'John Doe',
                type: ['MEETING'],
                venue: ['ABC']
            };

            this.compile(htmlElement)(this.scope);
            $('button').trigger('click');
            expect(this.mockEventsService.saveEvent).toHaveBeenCalled();
        });
    });
});