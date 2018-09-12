angular.module('app.profileService', ['ngResource'])

.factory("profileResource", function($http,$rootScope) {

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
			url: $rootScope.baseURL+'/RestFull/profile/?hash='+model.HASH,
			config:config
		});


	};

	service.post = function(model) {
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http(
		{
			method: 'POST',
			url: $rootScope.baseURL+'/RestFull/profile/',
			config:config,
			data:model
		});
	};
	return service;
});