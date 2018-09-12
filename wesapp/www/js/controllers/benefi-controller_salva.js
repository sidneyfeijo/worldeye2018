angular.module('app.benefi-controller' ,['app.benefiService'])

.controller('BenefiController', function($scope,$state,benefiResource,$ionicLoading,$rootScope,$localStorage,$stateParams) {
console.log($stateParams);
$scope.send = function(benef){
	$state.go('tab.home-benefi-data', { 
	benef: benef,
	sended:$stateParams.sended.toLocaleString().indexOf('.') < 0 
		 ? $stateParams.sended.toString() +'.00'
		 : $stateParams.sended.toString(),
	currency:$stateParams.moedaDestino.name.split(' ')[1],
	fee:$stateParams.fee,
	rate:$stateParams.rate,
	valorDestino:$stateParams.valorDestino });
};

$scope.edit = function(id){
	$state.go('tab.benefi-persist', { id: id });
};
console.log($stateParams);
	$scope.beneficioarios = [];
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
	var options = $rootScope.user;
	if( typeof $stateParams.moedaDestino != "undefined" && $stateParams.moedaDestino != null){
		var currency = $stateParams.moedaDestino.name.split(' ')[1];
		var rate = $stateParams.moedaDestino.rate;
		options.moedaDestino = $stateParams.moedaDestino;
		$scope.ieSend = true;
	}else{
		$scope.ieSend = false;
	}
	if(!$stateParams.moedaDestino)
	{
			benefiResource.get(options)
	.success(function(data, status, headers, config) {
		$scope.beneficioarios = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$scope.beneficioarios = [];
		$ionicLoading.hide();
	});
	}
else
{
		benefiResource.get(options)
	.success(function(data, status, headers, config) {
		for(var i = 0; i < data.length; i++)
		{
			if(data[i].currency_code == currency)
				$scope.beneficioarios.push(data[i]);
		}
			 
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$scope.beneficioarios = [];
		$ionicLoading.hide();
	});
}

});