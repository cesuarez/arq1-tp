'use strict';

angular.module('angularApp').controller('UserDashboardCtrl', function($scope, $stateParams, Event, User) {
    
    $scope.user = User.get({ id: $stateParams.id });

    $scope.configUserEvents = {
        title: 'user.name + " <small>(" + events.total + " events)</small>"',
        injectForTitle: function(scope) {
            scope.user = $scope.user;
        },
        getFrom: Event.byUser,
        getParams: { 
            userId: $stateParams.id
        },
        search: true,
        create: true,
        scroll: false
	};
    
});