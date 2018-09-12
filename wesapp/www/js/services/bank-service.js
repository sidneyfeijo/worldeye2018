angular.module('app.bankService', ['ngResource'])

.factory("bankResource", function($http,$rootScope) {

	var service = {};

	service.get = function(moeda) {
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		if(moeda == '')
		return $http(
		{
			method: 'GET',
			url: $rootScope.baseURL+'/RestFull/bank/',
			config:config
		});
		return $http(
		{
			method: 'GET',
			url: $rootScope.baseURL+'/RestFull/bank/?currency='+moeda,
			config:config
		});


	};
	return service;
});