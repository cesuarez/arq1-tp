'use strict';

angular.module('angularApp').controller('PhotoUploadCtrl', function($scope, Upload) {

    $scope.keepFile = function(file) {
        if (file && !file.$error) {
            $scope.file = undefined; // for animation reasons
            $scope.file = file;
        } else {
            $scope.file = undefined;
        }
    };

    $scope.uploadFile = function() {
        var file = $scope.file;
        if (!$scope.file) return;
        if (file && !file.$error) {
          file.upload = Upload.upload({
            url: 'https://api.cloudinary.com/v1_1/' + $.cloudinary.config().cloud_name + '/upload',
            fields: {
              upload_preset: $.cloudinary.config().upload_preset,
              tags: 'angularApp',
              context: 'photo=' + 'photo ' + new Date()
            },
            file: file
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = 'Uploading... ' + file.progress + '%';
          }).success(function (data, status, headers, config) {
            file.result = data;
          }).error(function (data, status, headers, config) {
            file.result = data;
          });
        }
    };

    /* Modify the look and fill of the dropzone when files are being dragged over it */
    $scope.dragOverClass = function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items !== null) {
        for (var i = 0 ; i < items.length; i++) {
          if (items[i].kind == 'file') {
            hasFile = true;
            break;
          }
        }
      } else {
        hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
    };
    
});