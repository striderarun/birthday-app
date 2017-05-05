/**
 * @description the controller for upload-profile-image.html
 * @author Akshay Abraham
 */

(function () {
   'use strict';
}());

angular.module('sales-events').controller('UploadProfileImageController', ['usersService', 'eventsUrls', 'eventsConstants', 'routes', '$rootScope', '$scope', '$state', '$http', '$timeout', 'Upload', function (usersService, eventsUrls, eventsConstants, routes, $rootScope, $scope, $state, $http, $timeout, Upload) {
    /**
     * @description this method sets a default image to download on first load
     */
    $scope.init = function () {
        var downloadImgUrl,
            uploadImgUrl;

        $scope.downloadImageUrl = 'styles/images/profile.image.jpg';
        $scope.formData = {
            user: $state.params.userId ? $state.params.userId.split(',') : []
        };

        uploadImgUrl = eventsUrls.REST_URL_BASE + eventsUrls.USERS_UPLOAD_PROFILE_IMAGE.replace('<userId>', $scope.formData.user[0]);

        if ($scope.formData.user[0]) {
            usersService.fetchUserImage($scope.formData.user[0]).then(function (res) {
                $scope.downloadImageUrl = res.data.length !== 0 ? uploadImgUrl : eventsUrls.RESOURCES_DEFAULT_PROFILE_IMAGE;
            }, function () {
                $scope.downloadImageUrl = eventsUrls.RESOURCES_DEFAULT_PROFILE_IMAGE;
            }).finally(function () {
        });

        $scope.uploadImageUrl = uploadImgUrl;
    }
    };

    /**
     * @description this method reloads the view with the selected userId profile image
     */
    $scope.onUserSelect = function () {
        $state.go(routes.UPLOAD_PROFILE_IMAGE, {userId: $scope.formData.user[0] || null}, { reload: true });
    };

    /**
     * @description this method uploads the selected image
     */
    $scope.uploadImage = function (file) {
        if ($scope.uploadProfileImageForm.file.$valid && $scope.file) {
            Upload.upload({
                url: $scope.uploadImageUrl,
                data: {image: file}
            }).then(function (resp) {
                $rootScope.overlay = {
                    show: true,
                    message: eventsConstants.IMAGE_UPLOAD_SUCCESS,
                    doneBtnTxt: eventsConstants.OKAY,
                    onDone: $scope.onUserSelect
                };
            }, function (resp) {
                $rootScope.overlay = {
                    show: true,
                    message: eventsConstants.ERROR_ENCOUNTERED,
                    doneBtnTxt: eventsConstants.SH_T
                };
            });
        }
    };

    $scope.init();
}]);