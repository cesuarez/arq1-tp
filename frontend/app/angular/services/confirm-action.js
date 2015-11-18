'use strict';

//Menu service used for managing  menus
angular.module('angularApp').service('ConfirmActionService', function($uibModal, $log) {
	this.open = function (msg, f) {
		var modalInstance = $uibModal.open({
		  templateUrl: 'partials/modal-confirm.html',
		  controller: function ($scope, $modalInstance) {  
		  	  $scope.msg = msg ? msg : '¿Desea confirmar la acción?';
			  $scope.ok = function () {
			    $modalInstance.close();
			  };
			  $scope.cancel = function () {
			    $modalInstance.dismiss('cancel');
			  };
		  }
		});
		modalInstance.result.then(function () {
			f();
		});
	};
});