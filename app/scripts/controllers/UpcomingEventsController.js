/**
 * @description the controller for upcoming-events.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').controller('UpcomingEventsController', ['$scope', '$rootScope', '$http', 'eventsConstants', 'routes', 'emailsService', 'eventsService', function ($scope, $rootScope, $http, eventsConstants, routes, emailsService, eventsService) {
    /**
     * @description This method is run on load of the upcoming-events.html
     */
    $scope.init = function () {
        $scope.date = new Date();
        $scope.month = moment($scope.date).format(eventsConstants.MONTH_FORMAT);
        $scope.fetchEvents();
    };

    /**
     * @description This method switches the currently selected month/year combination for which events are being viewed
     */
    $scope.adjustMonthYear = function (val) {
        if (val > 0) {
            $scope.month = moment($scope.date.setMonth($scope.date.getMonth() + 1)).format(eventsConstants.MONTH_FORMAT);
        } else {
            $scope.month = moment($scope.date.setMonth($scope.date.getMonth() - 1)).format(eventsConstants.MONTH_FORMAT);
        }

        $scope.fetchEvents();
    };

    /**
     * @description This method takes the user back to the list view
     */
    $scope.backToListView = function () {
        $scope.fetchEvents();
        $scope.toggleEventDetails('hide', event);
    };

    $scope.sendReminder = function() {
        $rootScope.isLoading = true;
        emailsService.sendReminder($scope.selectedEvent.id).then(function (res) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.REMINDER_SENT,
                doneBtnTxt: eventsConstants.REDIRECT_TO_LIST_VIEW,
                onDone: $scope.backToListView
            };
        }, function (error) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.ERROR_ENCOUNTERED,
                doneBtnTxt: eventsConstants.SH_T
            };
        }).finally (function () {
            $rootScope.isLoading = false;
        });
    };

    /**
     * @description This method shows the delete overlay
     */
    $scope.showDeleteOverlay = function () {
        $rootScope.overlay = {
            show: true,
            message: eventsConstants.CONFIRM_DELETE,
            cancelBtnTxt: eventsConstants.NO,
            doneBtnTxt: eventsConstants.YES,
            onDone: $scope.deleteEvent
        };
    };

    /**
     * @description This method shows the reminder overlay
     */
    $scope.showReminderOverlay = function () {
        $rootScope.overlay = {
            show: true,
            message: eventsConstants.CONFIRM_REMINDER,
            cancelBtnTxt: eventsConstants.NO,
            doneBtnTxt: eventsConstants.YES,
            onDone: $scope.sendReminder
        };
    };

    /**
     * @description This method deletes the selected event
     */
    $scope.deleteEvent = function () {
        var event = {
            target: $('.fa-trash')
        };

        $rootScope.isLoading = true;

        eventsService.deleteEvent($scope.selectedEvent.id).then(function (res) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.DELETE_SUCCESS,
                doneBtnTxt: eventsConstants.REDIRECT_TO_LIST_VIEW,
                onDone: $scope.backToListView
            };
        }, function (error) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.ERROR_ENCOUNTERED,
                doneBtnTxt: eventsConstants.SH_T
            };
        }).finally (function () {
            $rootScope.isLoading = false;
        });
    };


    /**
     * @description This method fetches the events for the currently selected month and year
     */
    $scope.fetchEvents = function () {
        $rootScope.isLoading = true;

        eventsService.fetchEvents($scope.date.getMonth() + 1, $scope.date.getFullYear()).then(function (res) {
            $scope.eventsList = res.data.content;

            angular.forEach($scope.eventsList, function (event, index) {
                event.eventDayAndTime = moment(event.eventDate).format(eventsConstants.LIST_DATE_FORMAT);
            });
        }, function (error) {
            $rootScope.overlay = {
                show: true,
                message: eventsConstants.ERROR_ENCOUNTERED,
                doneBtnTxt: eventsConstants.SH_T
            };
        }).finally (function () {
            $rootScope.isLoading = false;
        });
    };

    /**
     * @description This method displays/hides the details view for a selected/unselected event
     */
    $scope.toggleEventDetails = function (type, event, index) {
        $('.month-details, tr').removeClass('selected');

        $scope.selectedEvent = $scope.eventsList[index];

        if ($('.desktop-view').css('display') !== 'none') {
            $('tbody').animate({height: type === 'show' ? 0 : 550}, 'fast');
            $('table').animate({marginTop: type === 'show' ? '0%' : '2.5%'}, 'fast');
            $('.event-details').animate({height: type === 'show' ? 475 : 0}, 'fast');
            $(event.target).parent().addClass('selected');
        } else {
            $(event.target).addClass('selected');
        }

        $('.edit-icon')[type === 'show' ? 'show' : 'hide']();
    };

    $scope.init();
}]);