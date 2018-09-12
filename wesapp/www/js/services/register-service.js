angular.module('app.registerService', ['ngResource'])

.factory("registerResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/register/',data:model,config:config});


	};
	return service;
});