angular.module('app.transfers-controller', ['app.transfersService'])

.controller('TransfersController', function($scope,transfersResource,$ionicLoading,$rootScope,$localStorage) {
	$scope.transfers = [];
	$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
	}).then(function(){
	});
	var key = 'user';
	$rootScope.user = $localStorage.getObject(key);
	transfersResource.get($rootScope.user)
	.success(function(data, status, headers, config) {
		for (var i = 0;i < data.length; i++) {
			if(data[i].status == 'Paid'){
				data[i].icon = 'icon ion-checkmark-circled'
				data[i].estilo = 'position: relative;top: 30px; color: #00B300;'
			}else if(data[i].status == 'Sent to Payment' || data[i].status == 'On Hold Compliance'){
				data[i].icon = 'icon ion-forward'
				data[i].estilo = 'position: relative;top: 30px; color: #00B300;'
			}else if(data[i].status == 'Ready to Pay'){
				data[i].icon = 'icon ion-forward'
				data[i].estilo = 'position: relative;top: 30px; color: #275387;'
			}else if(data[i].status == 'Waiting Confirmation'){
				data[i].icon = 'icon ion-help-circled'
				data[i].estilo = 'position: relative;top: 30px; color: #FF8000;'
			}else{
				data[i].icon = 'icon ion-close-circled'
				data[i].estilo = 'position: relative;top: 30px; color: #FF4D4D;'
			}
			data[i].currency = data[i].currency.replace("GBP", "GBP to ");
		}
		
		$scope.transfers = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$scope.transfers = [];
		$ionicLoading.hide();
	});
});