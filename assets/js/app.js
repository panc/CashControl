'use strict';

var cashcontrol = angular.module('cashcontrol', ['ui.bootstrap', 'ui.router', 'ngRoute', 'pascalprecht.translate']);

// configure the main module
cashcontrol.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var accessLevels = userConfig.accessLevels;
    var abstractView = {
        'header': {
            templateUrl: '/modules/home/views/header.html',
            controller: 'navigationController',
        },
        'main': {
            // Note: abstract still needs a ui-view for its children to populate.
            // We can simply add it inline here.
            template: '<ui-view/>',
        }
    };

    $stateProvider
        // routes for user module
        .state('user', {
            url: '/user',
            views: abstractView,
            abstract: true
        })
        .state('user.overview', {
            title: 'Users',
            url: '',
            templateUrl: '/modules/user/views/user.html',
            controller: 'userController',
            access: accessLevels.user
        })
        .state('user.profile', {
            title: 'User profile',
            url: '/:userId',
            templateUrl: '/modules/user/views/profile.html',
            controller: 'userProfileController',
            access: accessLevels.user
        })
    
        // routes for project module
        .state('projects', {
            url: '/projects',
            views: abstractView,
            abstract: true
        })
        .state('projects.overview', {
            title: 'Projects',
            url: '',
            templateUrl: '/modules/projects/views/projects.html',
            controller: 'projectController',
            access: accessLevels.admin
        })
        
        // routes for home module
        .state('home', {
            title: 'Home',
            url: '/',
            views: {
                'header': {
                    templateUrl: '/js/modules/home/views/loginHeader.html',
                    controller: 'navigationController',
                },
                'main': {
                    templateUrl: '/js/modules/home/views/index.html',
                    controller: 'homeController'
                }
            },
            access: accessLevels.public
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
        return {
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    }]);
}]);

cashcontrol.config(['$translateProvider', function($translateProvider) {

    $translateProvider
        .fallbackLanguage('en')
        .registerAvailableLanguageKeys(['en', 'de'], {
            'en_US': 'en',
            'en_UK': 'en',
            'de_DE': 'de',
            'de_CH': 'de',
            'de_AT': 'de'
        });

    $translateProvider.useCookieStorage();
    $translateProvider.determinePreferredLanguage();

    var origin = window.location.origin || window.location.protocol + '//' + window.location.host;

    $translateProvider.useStaticFilesLoader({
        prefix:  origin + '/locales/',
        suffix: '.json'
    });
}]);

cashcontrol.run(['$rootScope', '$location', '$state', 'Auth', 'alertService', function($rootScope, $location, $state, Auth, alertService) {

    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        var isLoggedIn = Auth.user.isLoggedIn;

        if (!Auth.authorize(toState.access)) {

            event.preventDefault();
            if (!isLoggedIn) {
                $state.go('home');
            }
            else {
                if (!fromState.controller)
                    $state.go('projects.overview');

                alertService.error('You are not allowed to access this page');
            }
        }
        else if (toState.name == 'home' && isLoggedIn) {

            event.preventDefault();
            $state.go('projects.overview');
        }
    });
}]);
