angular.module('app.sendService', ['ngResource'])

.factory("sendResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/send/',data:model,config:config});


	};
	return service;
});