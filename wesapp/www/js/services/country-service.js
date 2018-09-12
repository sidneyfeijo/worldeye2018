angular.module('app.countryService', ['ngResource'])

.factory("countryResource", function($http,$rootScope) {

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
			url: $rootScope.baseURL+'/RestFull/country/',
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
			url: $rootScope.baseURL+'/RestFull/country/?ccode='+ccode,
			config:config
		});


	};
	return service;
});