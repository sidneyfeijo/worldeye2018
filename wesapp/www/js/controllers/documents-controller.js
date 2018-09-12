angular.module('app.documents-controller', ['app.docService'])

.controller('DocumentsController', function($scope,$rootScope,docResource,$ionicLoading) {
$scope.docs = [];
$scope.document = {
	hash: $rootScope.user
};
docResource.get($scope.document)
	.success(function(data, status, headers, config) {
		$scope.docs = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$ionicLoading.hide();
	});
	

});