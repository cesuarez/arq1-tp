'use strict';

angular.module('angularApp').controller('EventDetailsCtrl', function($scope, Event, event, comments, uiGmapGoogleMapApi) {

    $scope.event = event;

    if($scope.authUser) {
        event.$promise.then($scope.newComment);
    }

    uiGmapGoogleMapApi.then(function(maps) {
        console.log("EVENT en Map:", event);
        $scope.map = { 
            center: {
                latitude: event.latitude,
                longitude: event.longitude
            },
            zoom: 8,
            markers: [{
                id: Date.now(),
                coords: {
                    latitude: event.latitude,
                    longitude: event.longitude
                }
            }]
        };
    });

    $scope.newComment = function() {
        $scope.comment = {
            comment: '',
            user_id: $scope.authUser.id,
            event_id: $scope.event.id
        };
    };

    // WEATHER ICON
    $scope.weather = {
        icon: event.weather,
        size: 50,
        animated: true,
        color: "black",
        cleanDetail: event.weather.replace(/-/g ,' ')
    };
    
    $scope.comments = comments;
    
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