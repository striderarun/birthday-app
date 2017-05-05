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
        templateUrl: 'views/pages/upcoming-events.html',
        controller: 'UpcomingEventsController'
    })
    .state('upload-events', {
        url: '/upload-events',
        templateUrl: 'views/pages/upload-events.html',
        controller: 'UploadEventsController'
    })
    .state('add', {
        url: '/add',
        templateUrl: 'views/pages/add.html',
    })
    .state('add.add-event', {
        url: '/event/{eventId}',
        templateUrl: 'views/pages/add-event.html',
        controller: 'AddEventController'
    })
    .state('add.add-user', {
        url: '/user',
        templateUrl: 'views/pages/add-user.html',
        controller: 'AddUserController'
    })
    .state('add.add-group', {
        url: '/group',
        templateUrl: 'views/pages/add-group.html',
        controller: 'AddGroupController'
    })
    .state('add.upload-profile-image', {
        url: '/upload-profile-image/{userId}',
        templateUrl: 'views/pages/upload-profile-image.html',
        controller: 'UploadProfileImageController'
    });
}]);