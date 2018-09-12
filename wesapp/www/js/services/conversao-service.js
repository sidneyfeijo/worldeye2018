angular.module('app.conversaoService', ['ngResource'])

.factory("converter", function($http,$rootScope) {

	var service = {};

	service.do = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/conversao/',data:model,config:config});


	};
	return service;
});