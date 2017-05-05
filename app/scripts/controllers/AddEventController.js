/**
 * @description the controller for add-event.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').controller('AddEventController', ['$scope', '$rootScope', 'eventsConstants', 'eventsService','routes', '$state', function ($scope, $rootScope, eventsConstants, eventsService, routes, $state) {
    /**
     * @description this method is run on load of the add-event.html
     */
    $scope.init = function () {
        $scope.formData = {
            eventDate: '',
            description: '',
            gender: [],
            invitees: [],
            spotlight: [],
            spotlightDetails: [],
            title: '',
            titleEqualsSubject: false,
            type: [],
            venue: []
        };

        if ($state.params.eventId) {
            $rootScope.isLoading = true;
            $scope.isUpdate = true;
            $scope.submitBtn = 'Update Event';

            eventsService.fetchEventByID(parseInt($state.params.eventId, 10)).then(function (res) {
                angular.extend($scope.formData, res.data);
            }, function (error) {
                $rootScope.overlay = {
                    show: true,
                    message: eventsConstants.ERROR_ENCOUNTERED,
                    doneBtnTxt: eventsConstants.SH_T
                };
            }).finally(function () {
                $rootScope.isLoading = false;
            })
        } else {
            $scope.isUpdate = false;
            $scope.submitBtn = 'Add Event';
        }

        $scope.options = {
            minDate: null,
            showWeeks: false
        };
    };

    /**
     * Populate a default title and description based on the spotlight user and event selected
     */
    $scope.populateDefaultEventTemplate = function () {
        var eventType,
            eventDate,
            currentDate = new Date();
            selectedUser = $scope.formData.spotlightDetails.length ? $scope.formData.spotlightDetails[0] : null;

        if ($scope.formData.spotlight.length === 1 && $scope.formData.type.length === 1 && selectedUser) {
            eventType = $scope.formData.type.toString();

            eventDate = eventType === eventsConstants.BIRTHDAY ? new Date(moment(selectedUser.birthDate).format('DD-MMM-YYYY 18:00:00')) : new Date();
            eventDate.setFullYear(new Date().getFullYear());

            if (eventDate < currentDate) {
                eventDate.setFullYear(eventDate.getFullYear() + 1);
            }

            $scope.formData.eventDate = moment(eventDate).format(eventsConstants.DATE_SAVE_FORMAT);

            if (eventType === eventsConstants.BIRTHDAY) {
                $scope.formData.title = eventsConstants.BIRTHDAY_TITLE.replace(eventsConstants.DUMMY_NAME, selectedUser.firstName);
                $scope.formData.description = eventsConstants.BIRTHDAY_DESCRIPTION.replace(eventsConstants.DUMMY_NAME, selectedUser.firstName + ' ' + selectedUser.lastName);
            } else if (eventType === eventsConstants.FAREWELL) {
                $scope.formData.title = eventsConstants.FAREWELL_TITLE.replace(eventsConstants.DUMMY_NAME, selectedUser.firstName);
                $scope.formData.description = eventsConstants.FAREWELL_DESCRIPTION.replace(eventsConstants.DUMMY_NAME, selectedUser.firstName + ' ' + selectedUser.lastName);
            } else if (eventType === eventsConstants.MEETING) {
                $scope.formData.title = eventsConstants.MEETING_TITLE.replace(eventsConstants.DUMMY_NAME, selectedUser.firstName);
                $scope.formData.description = eventsConstants.MEETING_DESCRIPTION.replace(eventsConstants.DUMMY_NAME, selectedUser.firstName + ' ' + selectedUser.lastName);
            }
        }
    };

    /**
     * @description this method is used to save an event
     */
    $scope.saveOrUpdateEvent = function () {
        var event = {};

        angular.copy($scope.formData, event);

        event.type = $scope.formData.type.toString();
        event.venue = $scope.formData.venue.toString();
        event.eventDate = moment($scope.formData.eventDate).format(eventsConstants.DATE_SAVE_FORMAT);

        eventsService[$scope.isUpdate ? 'updateEvent' : 'saveEvent'](event).then(function (res) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.SAVE_SUCCESS,
                doneBtnTxt: eventsConstants.REDIRECT_TO_LIST_VIEW,
                cancelBtnTxt: eventsConstants.CREATE_NEW_EVENT,
                onDone: $scope.redirectToListView,
                onCancel: $scope.reloadPage
            };
        }, function (error) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.ERROR_ENCOUNTERED,
                doneBtnTxt: eventsConstants.SH_T
            };
        }).finally (function () {
            //TODO
        });
    };

    /**
     * @description This method redirects to the events list view
     */
    $scope.redirectToListView = function () {
        $state.go(routes.UPCOMING_EVENTS);
    };

    /**
     * @description This method reloads the page
     */
    $scope.reloadPage = function () {
        $state.reload();
    };

    $scope.init();
}]);