angular.module('app.cityService', ['ngResource'])

.factory("cityResource", function($http,$rootScope) {

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
			url: $rootScope.baseURL+'/RestFull/city/',
			config:config
		});


	};
	service.where = function(ccode) {
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http(
		{
			method: 'GET',
			url: $rootScope.baseURL+'/RestFull/city/?ccode='+ccode,
			config:config
		});


	};
	return service;
});