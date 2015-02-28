'use strict';

angular.module('cashcontrol')
.controller('languageController', ['$scope', '$translate', function ($scope, $translate) {

     $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
    };
    
}]);