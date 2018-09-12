angular.module('app.tipoDocService', ['ngResource'])

.factory("tipoDocResource", function($http,$rootScope) {

	var service = {};

	service.get = function() {
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http(
		{
			method: 'GET',
			url: $rootScope.baseURL+'/RestFull/tipoDocumento/',
			config:config
		});


	};
	return service;
});