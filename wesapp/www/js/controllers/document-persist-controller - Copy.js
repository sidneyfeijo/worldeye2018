angular.module('app.document-persist-controller', ['app.tipoDocService','app.countryService','app.profileDocumentsService'])

.controller('DocumentPersistController', function($scope,$rootScope,$state,countryResource,tipoDocResource,profileDocumentsResource,$ionicLoading, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {
	
	  $scope.backToDocuments = function() {
      $state.go('tab.documents');
  };
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  
	$scope.documentTypes = [];
	$scope.countries = [];
	$scope.document = {
		docType : {},
		country:{},
		number: null,
		valid: null,
		frontImg: null,
		backImg: null,
		hash: $rootScope.user
	};

	$ionicLoading.show({
		template: 'Loading...'
	}).then(function(){
	});
	tipoDocResource.get()
	.success(function(data, status, headers, config) {
		$scope.documentTypes = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$ionicLoading.hide();
	});
	
	countryResource.get()
	.success(function(data, status, headers, config) {
		$scope.countries = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$ionicLoading.hide();
	});


	$scope.saveDoc = function(){
		console.log($scope.document);
		if($scope.document.frontImg == null && $scope.document.backImg == null)
		{
			$scope.showAlert('Error', 'Select an image to upload.');
			return;
		}
		$ionicLoading.show({
			template: 'Loading...'
		}).then(function(){
		});
		profileDocumentsResource.post($scope.document)
		.success(function(data, status, headers, config) {
			$scope.showAlert('Success', 'Document saved.');
			$scope.backToDocuments();
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}


	$scope.getCamera = function(ieFront){
		if(navigator.camera != null 
			&& typeof navigator.camera != "undefined" ){
			navigator.camera.getPicture(onSuccess, onFail, { quality: 35,
				destinationType: Camera.DestinationType.DATA_URL });
		
		function onSuccess(imageURI) {
			if(ieFront){
				$scope.document.frontImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}else{
				$scope.document.backImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}
		}
		function onFail(message) {
		}
	}
};


});