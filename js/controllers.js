angular.module('weatherApp.controllers', [])

    .controller('MainCtrl', ['$scope', 'openWeatherMap', '$interval', '$http', 'ISO3166', '$uibModal',
        function ($scope, openWeatherMap, $interval, $http, ISO3166, $uibModal) {

            $scope.searchString = '';

            //listen for 'enter' to submit search
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    $scope.getForecastByLocation(document.getElementById('cityForceastSearchInput').value);
                }
            });

            //clock display
            var tick = function () {
                $scope.clock = Date.now();
            }
            tick();
            $interval(tick, 1000);

            //current position finder
            if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
            function onPositionUpdate(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
                $http.get(url)
                    .then(function (result) {
                        $scope.address = result.data.results[2].formatted_address;
                        city = result.data.results[2].address_components[0].long_name;
                        country = result.data.results[2].address_components[3].long_name;

                        //get current location forecast
                        $scope.forecast = openWeatherMap.queryForecastDaily({
                            cityName: city,
                            countryName: country
                        });
                        $scope.searchedCityName = city;
                    });
            };

            //forecast by search string
            $scope.getForecastByLocation = function (searchString) {
                if (searchString.length > 0) {
                    $scope.searchedCityName = ''
                    $scope.forecast = openWeatherMap.queryForecastDaily({
                        cityName: searchString
                    });
                    $scope.searchedCityName = searchString;
                }
                ;

            };

            //open modal
            $scope.open = function (forecastDetails, cityInfo) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'partialViews/detailedWeatherModal.html',
                    controller: 'modalCtrl',
                    resolve: {
                        details: function () {
                            return forecastDetails;
                        },
                        city: function () {
                            return cityInfo;
                        }
                    }
                });
            };
        }])

    .controller('modalCtrl', ['$scope', '$uibModalInstance', 'details', 'city', 'openWeatherMap',
        function ($scope, $uibModalInstance, details, city) {
            //data for modal display
            $scope.details = details;
            $scope.city = city;
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.weatherIcon = function (iconName) {
                return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
            };

            $scope.parseDate = function (time) {
                return new Date(time * 1000);
            };

        }]);