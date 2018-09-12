angular.module('app.register-controller', ['app.registerService'])

.controller('RegisterController', function($scope,$state,registerResource,$ionicLoading,$ionicPopup) {
	$scope.usuario = {
		email: null,
		senha:null,
		confSenha: null
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
		if($scope.usuario.senha == null || $scope.usuario.confSenha == null)
			return;
		if($scope.usuario.senha != $scope.usuario.confSenha)
		{
			$scope.msgConfSenha = 'Passwords must match.';
			console.log($scope.msgConfSenha.length);
			return;
		}
		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		registerResource.post($scope.usuario)
		.success(function(data, status, headers, config) {
			if(data.length == 0)
			{
				$ionicLoading.hide();
				$scope.showAlert('Error', 'User already registered.');
				return;
			}
			$ionicLoading.hide();
			$scope.showAlert('Success', 'User registered successfully.');
			$state.go('login');
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}

	
	
});