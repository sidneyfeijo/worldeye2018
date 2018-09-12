//angular.module('app.moedaService', ['ngResource'])
//.factory('moedaResource', function($resource,$rootScope) {
//
//	return $resource($rootScope.baseURL+'/RestFull/moedas/', null, {
//		'update' : { 
//			method: 'PUT'
//		}
//	});
//});

angular.module('app.moedaService', ['ngResource'])

.factory("moedaResource", function($http,$rootScope) {

	var service = {};

	service.do = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/moedas/',data:model,config:config});


	};
	return service;
});

