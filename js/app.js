'use strict';

// Declare app level module which depends on filters, and services
angular.module('weatherApp', [
    'ngRoute',
    'weatherApp.filters',
    'weatherApp.services',
    'weatherApp.directives',
    'weatherApp.controllers',
    'iso-3166-country-codes',
    'ui.bootstrap'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/forecast', {templateUrl: 'partialViews/forecastForOneCity.html', controller: 'MainCtrl'});
    $routeProvider.otherwise({redirectTo: '/forecast'});
}]);

