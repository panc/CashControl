'use strict';

angular.module('cashcontrol')
.controller('userProfileController', [
    '$scope', '$stateParams', 'userService', 'toasts', function($scope, $stateParams, userService, toasts) {

        $scope.user = {};
        $scope.hideRole = true;

        if ($stateParams.userId) {
            userService.loadProfile($stateParams.userId)
                .then(function(user) {
                    $scope.user = user;
                    $scope.hideRole = user.role == userConfig.roles.user;
                })
                .catch(toasts.error);
        }
    }
]);