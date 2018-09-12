angular.module('app.recover-controller', ['app.recoverService'])

.controller('RecoverController', function($scope,$state,recoverResource,$ionicLoading,$ionicPopup) {
	$scope.usuario = {
		email: null,
		
		
	};
	
	$scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  $scope.myGoBack = function() {
    $state.go('login');
  };
		$scope.submit = function(){
		if($scope.usuario.email == null ||$scope.usuario.email == '')
			return;
		
		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		recoverResource.post($scope.usuario)
		.success(function(data, status, headers, config) {
			
			$ionicLoading.hide();
			if(data.MSG.indexOf('enviado'))
			{
				$scope.showAlert('Success', data.MSG);
				$state.go('login');
				}
		else{
			$scope.showAlert('Error', data.MSG);
		}
			
			
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}

	
	
});