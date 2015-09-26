'use strict';

angular.module('elmApp').service('ElmEvents', function($window, Event) {
  this.sendEvents = function(eventsModule) {
    Event.get(function(data) {
      eventsModule.ports.getEvents.send(data);
    });
  };
});