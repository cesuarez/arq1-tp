'use strict';

angular.module('angularApp').controller('HomeCtrl', function($scope, AuthService, Event) {

    if($scope.authUser) {
        $scope.configUserEvents = {
            title: '"Your lastest events"',
            getFrom: Event.get,
            getParams: { 
                userId: $scope.authUser.id,
                pageSize: 3
            },
            redirectTo: 'user({ id: ' + $scope.authUser.id + '  })',
            search: false,
            create: true,
            scroll: false
    	};
    }

    $scope.configMostRecentEvents = {
        title: '"Public events <small>(" + total + " in total)</small>"',
        getFrom: Event.get,
        getParams: { 
            privacy: 'public'
        },
        search: true,
        create: false,
        scroll: true
	};

});