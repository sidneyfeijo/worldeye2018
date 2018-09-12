angular.module('app.benefi-controller' ,['app.benefiService'])

.controller('BenefiController', function($scope,$state,benefiResource,$ionicLoading,$rootScope,$localStorage,$stateParams) {
console.log($stateParams);
//alert($stateParams.curpairdest);
//alert('1begin');
$scope.send = function(benef){
	$state.go('tab.home-benefi-data', { 
	benef: benef,
	sended:$stateParams.sended.toLocaleString().indexOf('.') < 0 
		 ? $stateParams.sended.toString() +'.00'
		 : $stateParams.sended.toString(),
	currency:$stateParams.moedaDestino.name.split(' ')[1],
	fee:$stateParams.fee,
	rate:$stateParams.rate,
	curpairdest:$stateParams.curpairdest,
	ctrycode:$stateParams.ctrycode,
	valorDestino:$stateParams.valorDestino });
};
//alert('2');

$scope.edit = function(id){
	$state.go('tab.benefi-persist', { id: id });
};
//alert('3');
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
//alert('4');
	var key = 'user';
	$rootScope.user = $localStorage.getObject(key);
	var options = $rootScope.user;
	//alert('5 ' + options);
	//alert('A777 ' + JSON.stringify($stateParams.moedaDestino));
	if( typeof $stateParams.moedaDestino != "undefined" && $stateParams.moedaDestino != null){
		//var currency = $stateParams.moedaDestino.name.split(' ')[1];
		var curpart = $stateParams.moedaDestino.id;
		var currency = curpart.substr(3,3);
		var rate = $stateParams.moedaDestino.rate;
		options.moedaDestino = $stateParams.moedaDestino;
		$scope.ieSend = true;
		//alert('6');
	}else{
		$scope.ieSend = false;
		//$scope.ieSend = true;
//alert('7');
	}
	if(!$stateParams.moedaDestino)
	{
			benefiResource.get(options)
	.success(function(data, status, headers, config) {
		$scope.beneficioarios = data;
		//alert('8');
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
			//alert('9 ' + data[i].currency_code + ' - ' + currency + ' -- ' + $stateParams.moedaDestino.id + ' --- ' + curpart);
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