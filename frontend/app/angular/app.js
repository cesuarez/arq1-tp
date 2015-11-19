'use strict';

angular.module('angularApp', [
  'ui.select',
  'ngSanitize',
  'ngRoute', 
  'ui.router', 
  'ngAnimate', 
  'ngResource', 
  'ui.bootstrap', 
  'angular-loading-bar',
  'ngFileUpload',
  'cloudinary',
  'satellizer',
  'uiGmapgoogle-maps',
  'angular-skycons',
]);

$.cloudinary.config().cloud_name = 'sawady';
$.cloudinary.config().upload_preset = 'ni89rhc4';