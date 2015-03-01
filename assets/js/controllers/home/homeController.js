'use strict';

angular.module('cashcontrol')
.controller('homeController', [
    '$scope', '$state', '$window', 'auth', 'toasts', function($scope, $state, $window, auth, toasts) {

        $scope.user = {
            name: '',
            email: '',
            password: ''
        };

        $scope.signup = function() {
            $scope.submitted = true;

            if ($scope.submitForm.$invalid)
                return;

            auth.signup($scope.user)
				.then(function() {
					$state.go('games.overview');
				})
				.catch(toasts.error);
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    }
]);