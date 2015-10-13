'use strict';

angular.module('angularApp', [
  'ngRoute', 
  'ui.router', 
  'ngAnimate', 
  'ngResource', 
  'ui.bootstrap', 
  'angular-loading-bar',
  'ngFileUpload',
  'cloudinary',
]);

$.cloudinary.config().cloud_name = 'sawady';
$.cloudinary.config().upload_preset = 'ni89rhc4';