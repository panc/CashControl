'use strict';

angular.module('cashcontrol')
.controller('navigationController', ['$scope', '$state', 'auth', 'toasts', function ($scope, $state, auth, toasts) {

    $scope.user = auth.user;

    $scope.logout = function() {
        auth.logout(function() {
            $state.go('home');
        },
        toasts.error);
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
            toasts.error);
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
    
    $scope.alerts = toasts.entries;

    $scope.closeAlert = function(index) {
            toasts.closeToast(index);
    };
}]);