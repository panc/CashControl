'use strict';

angular.module('cashcontrol')
.controller('userController', ['$scope', 'userService', 'toasts', function ($scope, userService, toasts) {

    $scope.roles = [
        { name: 'Admin', index: 1 },
        { name: 'User', index: 2 }
    ];

    $scope.save = function() {
        userService.update($scope.users)
            .then(function() {
                toasts.info('Successfully saved.');
            })
            .catch(toasts.error);
    };

    userService.loadAllUser()
        .then(function(users) {
            $scope.users = users;
        })
        .catch(toasts.error);
}]);