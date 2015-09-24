'use strict';

angular.module('elmApp').service('ElmEvents', ['$window', 'Events', 
  function($window, Events){
    this.sendEvents = function(eventsModule) {
      Events.get(function(data) {
        eventsModule.ports.getEvents.send(data);
      });
    };
  }
]);