'use strict';

angular.module('angularApp').controller('EventDetailsCtrl', function($scope, $stateParams, Event, uiGmapGoogleMapApi, $state, $location, ngNotify, Supply) {
    
    $scope.loadEventDetails = function(data) {
        data.date = new Date(data.date);
        $scope.event = data;

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
            $scope.event.assistingUsers = response;
            Supply.get({ eventId: $scope.event.id }, function(data) {
                $scope.event.supplies = data.supplies;
            });
        }, function(){
            $scope.assistanceDisabled = false;
        });
    };

    $scope.userInvitations = {};
    $scope.searchUninvitedUsers = function(user) {
        if (!user){
            user = '';
        }
        Event.uninvitedUsers({ id: $scope.event.id, name: user}, {}, function(response){
            $scope.userInvitations.uninvitedUsers = response;
        });
    };

    $scope.inviteDisabled = false;
    $scope.sendInvitation = function(){
        $scope.inviteDisabled = true;
        if ($scope.userInvitations.selectedUser){
            Event.invite({ id: $scope.event.id, userId: $scope.userInvitations.selectedUser.id}, {}, function(response){
                ngNotify.set($scope.userInvitations.selectedUser.name + " was invited!", 'success');
                $scope.userInvitations.selectedUser = null;
                $scope.inviteDisabled = false;
                $scope.searchUninvitedUsers('');
            }, function(){
                $scope.inviteDisabled = false;
            });  
        }
    };

    $scope.openEdit = function() {
        $scope.openedEdit = true;
    };
    
    $scope.remove = function() {
        $scope.event.$remove(function(data) {
            $state.go('home');
        });
    };

    $scope.goToUser = function(userId){
        $location.path('user/' + userId);
    };
    
    $scope.$on('closed-events-form', function() {
        $scope.openedEdit = false;
        $scope.getEvent();
    });
    
    $scope.getEvent();

});