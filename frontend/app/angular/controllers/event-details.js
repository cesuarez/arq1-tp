'use strict';

angular.module('angularApp').controller('EventDetailsCtrl', function($scope, $stateParams, Event, uiGmapGoogleMapApi) {
      
    $scope.event = Event.get({ id: $stateParams.id });
    $scope.event.$promise.then(function(data) {
        $scope.event = data;

        if($scope.authUser) {
            $scope.newComment();
        }

        // WEATHER ICON
        var eventWeather =  $scope.event.weather.replace(/-/g ,' ');
        eventWeather = eventWeather.charAt(0).toUpperCase() + eventWeather.slice(1);
        $scope.weather = {
            icon: $scope.event.weather,
            size: 50,
            animated: true,
            color: "black",
            cleanDetail: eventWeather
        };

        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = { 
                center: {
                    latitude: $scope.event.latitude,
                    longitude: $scope.event.longitude
                },
                zoom: 8,
                markers: [{
                    id: Date.now(),
                    coords: {
                        latitude: $scope.event.latitude,
                        longitude: $scope.event.longitude
                    }
                }]
            };
        });
    });
    
    $scope.newComment = function() {
        $scope.comment = {
            comment: '',
            user_id: $scope.authUser.id,
            event_id: $scope.event.id
        };
    };

    $scope.comments = Event.comments({ id: $stateParams.id });
    
    $scope.sendComment = function() {
        Event.comment($scope.comment, function(data) {
            $scope.comments = data;
            $scope.newComment();
        });
    };
    
    $scope.moreComments = function() {
        if($scope.comments.next_page_url) {
            Event.comments({ 
                id: $scope.event.id, 
                page: $scope.comments.current_page + 1 
            }, function(data) {
                var comments = $scope.comments.data;
                var newComments = data;
                newComments.data = comments.concat(newComments.data);
                $scope.comments = newComments;
            });
        }
    };


});