angular.module('app.docService', ['ngResource'])

.factory("docResource", function($http,$rootScope) {

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
				url: $rootScope.baseURL+'/RestFull/documentos/?hash='+$rootScope.user.CLI_ID,
				config:config
			});


	};


	
	return service;
});