'use strict';

angular.module('angularApp').controller('EventDetailsCtrl', function($scope, $stateParams, Event, uiGmapGoogleMapApi, $state) {

    $scope.loadEventDetails = function(data) {
        data.date = new Date(data.date);
        $scope.event = data;
        
        Event.owner({ id: data.id }, function(data) {
            $scope.eventOwner = data;
            $scope.isOwner = $scope.authUser ? data.id === $scope.authUser.id : false;
        });

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
            $scope.detailsMap = { 
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
    };
    
    $scope.getEvent = function() {
        $scope.event = Event.get({ id: $stateParams.id }, $scope.loadEventDetails, function() {
            $scope.event = undefined;
            $state.go('home');
        });
    };
    
    $scope.changeAssistance = function(bool) {
        $scope.assistanceDisabled = true;
        Event.changeAssistance({ id: $scope.event.id}, { assistance: bool }, function(response){
            $scope.event.assistance = bool;
            $scope.assistanceDisabled = false;
            console.log(response);
        }, function(){
            $scope.assistanceDisabled = false;
        });
    };
    
    $scope.openEdit = function() {
        $scope.openedEdit = true;
    };
    
    $scope.remove = function() {
        $scope.event.$remove(function(data) {
            $state.go('home');
        });
    };
    
    $scope.$on('closed-events-form', function() {
        $scope.openedEdit = false;
        $scope.getEvent();
    });
    
    $scope.getEvent();

});