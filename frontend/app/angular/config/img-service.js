'use strict';

angular.module('angularApp').config(function($httpProvider) {
    $httpProvider.interceptors.push(function() {
      return {
       request: function(config) {
           if(config.url.indexOf('cloudinary') !== -1) {
                delete config.headers.authorization;
           }
           return config;
        }
      };
    });
});