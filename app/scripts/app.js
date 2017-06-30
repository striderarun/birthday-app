/**
 * @description the main JS file of the application
 * @author Akshay Abraham
 */
(function () {
   'use strict';
}());

angular.module('sales-events', ['ui.router', 'ui.bootstrap', 'angularjs-datetime-picker', 'ngFileUpload']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('upcoming-events', {
        url: '/upcoming-events',
        templateUrl: 'app/views/pages/upcoming-events.html',
        controller: 'UpcomingEventsController'
    })
    .state('upload-events', {
        url: '/upload-events',
        templateUrl: 'app/views/pages/upload-events.html',
        controller: 'UploadEventsController'
    })
    .state('add', {
        url: '/add',
        templateUrl: 'app/views/pages/add.html',
    })
    .state('add.add-event', {
        url: '/event/{eventId}',
        templateUrl: 'app/views/pages/add-event.html',
        controller: 'AddEventController'
    })
    .state('add.add-user', {
        url: '/user',
        templateUrl: 'app/views/pages/add-user.html',
        controller: 'AddUserController'
    })
    .state('add.add-group', {
        url: '/group',
        templateUrl: 'app/views/pages/add-group.html',
        controller: 'AddGroupController'
    })
    .state('add.upload-profile-image', {
        url: '/upload-profile-image/{userId}',
        templateUrl: 'app/views/pages/upload-profile-image.html',
        controller: 'UploadProfileImageController'
    });
}]);