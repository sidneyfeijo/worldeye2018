angular.module('app.benefiService', ['ngResource'])

.factory("benefiResource", function($http,$rootScope,$state) {

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
				url: $rootScope.baseURL+'/RestFull/benefs/?hash='+$rootScope.user.CLI_ID,
				config:config
			});


	};
	
	service.single = function(id) {
		
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http(
			{
				method: 'GET',
				url: $rootScope.baseURL+'/RestFull/benefs/?id='+id,
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
				url: $rootScope.baseURL+'/RestFull/benefs/',
				data:model,
				config:config
			});


	};
	
	return service;
});

