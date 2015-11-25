'use strict';

angular.module('angularApp').controller('EventFastFormCtrl', function($scope, $rootScope, Event, uiGmapGoogleMapApi, ngNotify) {
    
    $scope.newEvent = function() {
        var d = new Date();
        d.setDate(d.getDate() + 1);
        $scope.event = new Event({ 
            date: d,
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
            $rootScope.$broadcast('closed-events-form');
        }, function() {
            $scope.event = event;
        });
    };
    
    var collect_date_errors = function(form, r) {
        var oneHourInFuture = new Date();
        oneHourInFuture.setHours(oneHourInFuture.getHours() + 1);
        if($scope.event.date <= oneHourInFuture) {
            r.push('date (must be a future date, one hour at least)');
        }
    };
    
    var collect_geolocation_errors = function(form, r) {
        if($scope.event.latitude === undefined || $scope.event.longitude === undefined) {
            r.push('<strong>location</strong> (must set a location on the map)');
        }
    };
    
    var collect_angular_errors = function(form, r) {
        angular.forEach(form.$error, function(v, k) {
            angular.forEach(v, function(i) {
                r.push('<strong>' + i.$name + '</strong>' + ' (' + k + ')');
                i.$setDirty(true);
            });
        });
    };
    
    var collect_errors = function(form) {
        var r = [];
        collect_angular_errors(form, r);
        collect_date_errors(form, r);
        collect_geolocation_errors(form, r);
        return r.join(', ');
    };

    $scope.save = function(form) {
        if(form.$valid && $scope.event.date >= new Date() && $scope.event.longitude !== undefined && $scope.event.latitude !== undefined) {
            $scope.event.date.setSeconds(0);
            $scope.$on('upload-finished', function(evt, data) {
                $scope.event.img = data.public_id;
                $scope.saveEvent();
            });
            $scope.$on('upload-failed', function(evt, data) {
                $scope.saveEvent();
            });
            $scope.$broadcast('upload-file');
        } else {
            console.log(form);
            ngNotify.set('<i>Please correct the next fields</i>: ' + collect_errors(form), {
                type: 'error',
                duration: 2000,
                html: true
            });
        }
    };

    $scope.cancel = function() {
        $scope.event = undefined;
        $rootScope.$broadcast('closed-events-form');
    };

    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = { 
            center: {
                latitude: -34.6250478,
                longitude: -58.48684
            },
            zoom: 5,
            markers: $scope.event ? [{
                        id: Date.now(),
                        coords: {
                            latitude: $scope.event.latitude,
                            longitude: $scope.event.longitude
                        }
                    }] : [],
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