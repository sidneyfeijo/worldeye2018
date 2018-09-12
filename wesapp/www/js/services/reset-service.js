angular.module('app.resetService', ['ngResource'])

.factory("resetResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/resetPass/',data:model,config:config});


	};
	return service;
});