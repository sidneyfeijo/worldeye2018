angular.module('app.recoverService', ['ngResource'])

.factory("recoverResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/recoverPass/',data:model,config:config});


	};
	return service;
});