'use strict';

angular.module('angularApp').controller('HomeCtrl', function($scope, AuthService, Event) {

    if($scope.authUser) {
        $scope.configUserEvents = {
            title: '"Your lastest events"',
            getFrom: Event.byUser,
            getParams: { 
                userId: $scope.authUser.id
            },
            redirectTo: 'user({ id: ' + $scope.authUser.id + '  })',
            search: true,
            create: true,
            scroll: false
    	};
    }

    $scope.configMostRecentEvents = {
        title: '"Most recent public events"',
        getFrom: Event.mostRecent,
        redirectTo: 'events',
        search: true,
        create: false,
        scroll: true
	};

});