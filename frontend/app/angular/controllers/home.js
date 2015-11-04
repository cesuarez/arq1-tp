'use strict';

angular.module('angularApp').controller('HomeCtrl', function($scope, AuthService, Event, uiGmapGoogleMapApi) {

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

    $scope.getUserEvents = function() {
        if (AuthService.getAuthUser()){
            return Event.byUser({ 
                userId: AuthService.getAuthUser().id
            }, function(data) {
                $scope.userEvents = data;
            });
        }
    };

    $scope.getMostRecentEvents = function() {
        return Event.mostRecent(function(data) {
            $scope.mostRecent = data;
        });
    };
    
    $scope.refreshEvents = function() {
        $scope.getUserEvents();
        $scope.getMostRecentEvents();
    };
    
    $scope.refreshEvents();

    // TODO este codigo tambien se repite en user-dashboard
    $scope.newEvent = function() {
        $scope.event = new Event({ 
            date: new Date(),
            privacy: 'public',
            user_id: $scope.authUser.id,
            location: "TODO"
        });
    };

    $scope.saveEvent = function() {
        var event = $scope.event;
        $scope.event = undefined;
        event.$save(function(data) {
            $scope.refreshEvents();
        }, function() {
            $scope.event = event;
        });
    };

    $scope.save = function() {
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

    $scope.minDate = new Date();
    
    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.format = 'dd-MM-yyyy';

    $scope.status = {
        opened: false
    };
    
});