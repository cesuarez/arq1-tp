'use strict';

angular.module('angularApp').service('EventsDashboard', function(Event, AuthService) {
    
    this.userEvents = {
        list: [],
        count: 0
    };
    
    this.mostRecent = {
        list: [],
        count: 0
    };
    
    this.getUserEvents = function() {
        return Event.byUser({ 
            userId: AuthService.getAuthUser().id
        }, function(data) {
            this.userEvents.list  = data.data;
            this.userEvents.count = data.total;
        }.bind(this));
    };

    this.getMostRecentEvents = function() {
        return Event.mostRecent(function(data) {
            this.mostRecent.list  = data.data;
            this.mostRecent.count = data.total;
        }.bind(this));
    };
    
    this.refreshEvents = function() {
        this.getUserEvents();
        this.getMostRecentEvents();
    };

});