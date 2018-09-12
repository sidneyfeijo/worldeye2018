angular.module('app.reset-controller', ['app.resetService'])

.controller('ResetController', function($scope,$rootScope,$state,resetResource,$ionicLoading,$ionicPopup) {
	$scope.usuario = {
		senha_antiga: null,
		senha_nova:null,
		cli_id: $rootScope.user.CLI_ID
		
	};
	
	$scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  $scope.myGoBack = function() {
    $state.go('tab.profile');
  };
		$scope.submit = function(){
		if(!this.formulario.$valid)
			return
		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		resetResource.post($scope.usuario)
		.success(function(data, status, headers, config) {
			
			$ionicLoading.hide();
			$scope.showAlert('Success', data.MSG);
			
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}

	
	
});