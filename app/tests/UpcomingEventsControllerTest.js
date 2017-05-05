/**
 * This script tests the UpcomingEventsControllerTest.js
 */
describe('UpcomingEventsControllerTest.js', function() {
    beforeEach(function() {
        module('sales-events');
        module('jasmine.templates');

        inject(function($compile, $rootScope, $controller, $templateCache, $q, $timeout) {
            this.scope = $rootScope.$new();
            this.compile = $compile;
            this.q = $q;
            timeout = $timeout;

            this.scope.eventsList = [{
                      "eventId":1,
                      "eventType":"Birthday",
                      "eventDate":"18-JUN-2016 18:00:00",
                      "eventTitle":"Joe's birthday",
                      "eventDescription":"Join us as we celebrate with Joe on his special day.",
                      "eventVenue": "Ground floor, Pantry"
                  }, {
                      "eventId":2,
                      "eventType":"Birthday",
                      "eventDate":"19-JUN-2016 16:00:00",
                      "eventTitle":"Angel's birthday",
                      "eventDescription":"Join us as we celebrate with Angel on his special day.",
                      "eventVenue": "Ground floor, Pantry"
                  }, {
                      "eventId":3,
                      "eventType":"Meeting",
                      "eventDate":"20-JUN-2016 16:05:00",
                      "eventTitle":"Meeting with Rajneesh",
                      "eventDescription":"Join us as we celebrate with Michael on his special day.",
                      "eventVenue": "Ground floor, Pantry"
                  }];

            this.templateCache = $templateCache;

            this.mockEventsService = {
                fetchEvents: function() {
                    //TODO
                },
                deleteEvent: function(eventId) {
                    //TODO
                }
            };

            this.upcomingEventsController = function() {
                return $controller('UpcomingEventsController', {
                    $scope: this.scope,
                    eventsService: this.mockEventsService
                });
            };

            jasmine.getFixtures().fixturesPath = 'base/app/views/pages';
            loadFixtures('upcoming-events.html');

            spyOn(this.mockEventsService, 'fetchEvents').and.callFake(function(){
                var deferred = q.defer();
                return deferred.promise;
            });
        });
    });


    describe('UpcomingEventsControllerTest.js test cases', function() {
        it('should fetch the list view data on controller initialization', function() {
            this.upcomingEventsController();
            expect(this.mockEventsService.fetchEvents).toHaveBeenCalled();
        });

        it('should check if clicking on the (<-) arrow decrements the current month/year combo', function() {
            var htmlElement = $('html');

            this.upcomingEventsController();
            this.scope.date = new Date(2016,10,30);

            this.compile(htmlElement)(this.scope);
            $('.fa-arrow-circle-left').trigger('click');
            expect(this.scope.month).toEqual('October 2016');
        });

        it('should check if clicking on the (<-) arrow increments the current month/year combo', function() {
            var htmlElement = $('html');

            this.upcomingEventsController();
            this.scope.date = new Date(2016,10,30);

            this.compile(htmlElement)(this.scope);
            $('.fa-arrow-circle-right').trigger('click');
            expect(this.scope.month).toEqual('December 2016');
        });

        it('should open event details view on clicking on its row entry', function() {
            var htmlElement = $('html');

            this.upcomingEventsController();

            this.compile(htmlElement)(this.scope);
            this.scope.$apply();
            $('tr:first').trigger('click');
            expect(this.scope.selectedEvent.eventId).toEqual(1);
            $('tr:last').trigger('click');
            expect(this.scope.selectedEvent.eventId).toEqual(3);
        });

        it('should allow for deletion for an event which is selected', function() {
            var htmlElement = $('html');

            this.upcomingEventsController();

            this.compile(htmlElement)(this.scope);
            this.scope.$apply();
            $('tr:first').trigger('click');
            expect(this.scope.selectedEvent.eventId).toEqual(1);
            spyOn(this.mockEventsService, 'deleteEvent').and.callFake(function(){
                var deferred = q.defer();
                return deferred.promise;
            });

            this.scope.deleteEvent(this.scope.selectedEvent.eventId);
            expect(this.mockEventsService.deleteEvent).toHaveBeenCalled();
        });
    });
});