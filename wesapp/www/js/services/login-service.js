angular.module('app.loginService', ['ngResource'])

.factory('doLoginResource', function($http,$rootScope) {


	var service = {};

	service.doLogin = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/login/',data:model,config:config});


	};
	return service;
});