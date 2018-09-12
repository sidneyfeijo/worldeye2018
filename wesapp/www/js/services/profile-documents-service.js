angular.module('app.profileDocumentsService', ['ngResource'])

.factory("profileDocumentsResource", function($http,$rootScope) {

	var service = {};

	service.post = function(model) {
		

		var config = {
			headers : {
				'Content-Type': 'multipart/form-data-encoded'
			}
		}
		return $http({method: 'POST',url: $rootScope.baseURL+'/RestFull/profileDocumentos/',data:model,config:config});


	};
	return service;
});