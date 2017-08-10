'use strict';

/* Directives */

angular.module('weatherApp.directives', [])

    .directive('weatherPanel', [function factory() {
        return {
            restrict: 'EA',
            scope: {
                cityForecast: '=showEntry',
                forecast: '=weatherPanel'
            },

            templateUrl: 'partialViews/weatherDisplayPanel.html',

            link: function (scope, element, attrs) {
                // Get icon image url
                scope.weatherIcon = function (iconName) {
                    return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
                };

                scope.parseDate = function (time) {
                    return new Date(time * 1000);
                };
            }
        }
    }])
    .directive('weatherFurtherDays', [function factory() {
        return {
            restrict: 'EA',
            scope: {
                cityForecast: '=showEntry',
                forecast: '=weatherPanel'
            },

            templateUrl: 'partialViews/weatherDisplayRow.html',

            link: function (scope, element, attrs) {
                // Get icon image url
                scope.weatherIcon = function (iconName) {
                    return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
                };

                scope.parseDate = function (time) {
                    return new Date(time * 1000);
                };
            }
        }
    }]);