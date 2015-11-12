'use strict';

angular.module('angularApp').controller('EventsPublicDashboardCtrl', function($scope, AuthService, Event) {

    $scope.configPublicEvents = {
        title: '"All the " + events.total + " public events"',
        getFrom: Event.mostRecent,
        search: true,
        create: false,
        scroll: true
	};

});