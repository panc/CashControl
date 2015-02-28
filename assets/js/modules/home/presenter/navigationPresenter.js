'use strict';

var user = angular.module('cashcontrol');

user.controller('navigationController', ['$scope', '$state', 'auth', 'alertService', function($scope, $state, auth, alertService) {

    $scope.user = auth.user;

    $scope.logout = function() {
        auth.logout(function() {
            $state.go('home');
        },
        alertService.error);
    };

    $scope.login = function() {
        $scope.submitted = true;
        
        if ($scope.loginForm.$invalid)
                return;

        auth.login({
                email: $scope.loginForm.email.$modelValue,
                password: $scope.loginForm.password.$modelValue
            },
            function(res) {
                $state.go('games.overview');
            },
            alertService.error);
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
    
    $scope.alerts = alertService.alerts;

    $scope.closeAlert = function(index) {
        alertService.closeAlert(index);
    };
}]);