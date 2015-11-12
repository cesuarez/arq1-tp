'use strict';

angular.module('angularApp').controller('EventFastFormCtrl', function($scope, $rootScope, Event, uiGmapGoogleMapApi) {

    $scope.newEvent = function() {
        $scope.event = new Event({ 
            date: new Date(),
            privacy: 'public',
            user_id: $rootScope.authUser.id
        });
    };

    $scope.$on('open-create-event', function() {
        $scope.newEvent();
    });

    $scope.saveEvent = function() {
        var event = $scope.event;
        $scope.event = undefined;
        $scope.map.markers = [];
        event.$save(function(data) {
            $rootScope.$broadcast('refresh-events');
        }, function() {
            $scope.event = event;
        });
    };

    $scope.save = function() {
        $scope.event.date.setSeconds(0);
        $scope.$on('upload-finished', function(evt, data) {
            $scope.event.img = data.public_id;
            $scope.saveEvent();
        });
        $scope.$on('upload-failed', function(evt, data) {
            $scope.saveEvent();
        });
        $scope.$broadcast('upload-file');
    };

    $scope.cancel = function() {
        $scope.event = undefined;
    };

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { 
            center: {
                latitude: -34.6250478,
                longitude: -58.48684
            },
            zoom: 5,
            markers: [],
            events: {
                click: function (map, eventName, originalEventArgs) {
                    var e = originalEventArgs[0];
                    var lat = e.latLng.lat();
                    var lon = e.latLng.lng();
                    var marker = {
                        id: Date.now(),
                        coords: {
                            latitude: lat,
                            longitude: lon
                        }
                    };
                    if ($scope.event) {
                        $scope.event.latitude = lat;
                        $scope.event.longitude = lon;
                    }
                    $scope.map.markers.pop(); 
                    $scope.map.markers.push(marker);
                    $scope.$apply();
                }
            }
        };
    });

});