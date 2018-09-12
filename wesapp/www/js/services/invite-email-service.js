angular.module('app.inviteEmailService', ['ngResource'])

.factory("inviteEmailResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/email/',data:model,config:config});


	};
	return service;
});