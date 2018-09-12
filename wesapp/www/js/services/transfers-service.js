angular.module('app.transfersService', ['ngResource'])

.factory("transfersResource", function($http,$rootScope) {

	var service = {};

	service.get = function(model) {
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http(
			{
				method: 'GET',
				url: $rootScope.baseURL+'/RestFull/transferencias/?hash='+model.HASH,
				config:config
			});


	};
	return service;
});