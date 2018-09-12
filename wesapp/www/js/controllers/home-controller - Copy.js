angular.module('app.home-controller', ['app.moedaService','app.conversaoService'])

.controller('HomeController', function($scope,$state,$ionicSlideBoxDelegate,$ionicLoading,$stateParams,$ionicPopup,$rootScope,$localStorage,
	converter,moedaResource) {


	var key = 'user';
	$rootScope.user = $localStorage.getObject(key);
	if($stateParams.params == null && (typeof $rootScope.user != "undefined" && $rootScope.user != null)
		&& (typeof $rootScope.user.HASH != "undefined" && $rootScope.user.HASH != null)){
		$rootScope.goTabHome();
	}

	$scope.click = false;
	$scope.valor = '100.00';
	$scope.valorDestino = '0';
	$scope.flagged = '';
	$scope.rate = '0.00';
	$scope.fee = '0.00';

	$scope.moedaDestino = {};
	$ionicSlideBoxDelegate.update();

	$scope.options = {
		imgCalculator: 'img/calcs.png',
		imgAbout: 'img/about.png',
		calculatorClass: 'home-icon-font-activi',
		aboutClass:'home-icon-font',
		subTitle:'Do the Math'
	}

	$scope.moedas =[];

	$scope.moedaOrigem = {};
	$scope.moedasOrigem = [];
	$scope.moedasOrigem.push({
		id:1,
		name:'GBP'
	});
	$scope.moedaOrigem = $scope.moedasOrigem[0];

	$ionicLoading.show({
		template: 'Loading...'
	}).then(function(){
	}); 
	moedaResource.query(function(listamoedas) {
		$scope.moedas = listamoedas;
		for (var i =0; i < $scope.moedas.length; i++) {
			$scope.moedas[i].flag = 'flag '+$scope.moedas[i].flag;
		}
		$scope.moedaDestinoChange($scope.moedas[0]);
		$ionicSlideBoxDelegate.update();
		$ionicLoading.hide();
	}, function(erro) {
		console.log(erro);
		$ionicLoading.hide();
		var myPopup = $ionicPopup.show({
			template: 'Verifique se você está conectado a internet!',
			title: 'Erro de conexão',
		});

	});
	$scope.moedaInputChange = function(valor){
		$scope.valor = valor;
		if(typeof $scope.moedaDestino.id != 'undefined' && $scope.moedaDestino.id != null){
			//$scope.valorDestino = $scope.moedaDestino.rate * $scope.valor;

			$ionicLoading.show({
				template: 'Loading...'
			}).then(function(){
			});
			var options ={
				id : $scope.moedaDestino.id,
				valor:  $scope.valor
			};
			converter.do(options)
			.success(function(data, status, headers, config) {
				$scope.fee = data.fee;
				$scope.valorDestino = data.valor;
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
				$scope.valorDestino = 0;
				$scope.fee = 0;
			});

		}
	}

	$scope.moedaDestinoChange = function(moeda){
		$scope.moedaDestino = moeda;
		//$scope.valorDestino = moeda.rate * $scope.valor;
		$scope.flagged = moeda.flag;
		$scope.rate =  moeda.rate;


		$ionicLoading.show({
			template: 'Loading...'
		}).then(function(){
		});
		var options ={
			id : $scope.moedaDestino.id,
			valor:  $scope.valor
		};
		converter.do(options)
		.success(function(data, status, headers, config) {
			$scope.fee = data.fee;
			$scope.valorDestino = data.valor;
			$ionicLoading.hide();
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			$scope.valorDestino = 0;
			$scope.fee = 0;
		});

	}

	$scope.pagerClick = function(index){
		if(index == 0){
			$scope.calculatorClick();
		}else{
			$scope.aboutClick();
		}
	}

	$scope.calculatorClick = function(){
		$scope.options = {
			imgCalculator: 'img/calcs.png',
			imgAbout: 'img/about.png',
			calculatorClass: 'home-icon-font-activi',
			aboutClass:'home-icon-font',
			subTitle:'Do the Math'
		};
		$scope.click = true;
		$ionicSlideBoxDelegate.previous();
		$scope.click = false;
	}

	$scope.aboutClick = function(){
		$scope.options = {
			imgCalculator: 'img/calc.png',
			imgAbout: 'img/abouts.png',
			aboutClass: 'home-icon-font-activi',
			calculatorClass:'home-icon-font',
			subTitle:'Who We Are'
		};
		$scope.click = true;
		$ionicSlideBoxDelegate.next();
		$scope.click = false;
	}

	$scope.slideHasChanged= function(index){
		if(!$scope.click){
			if(index == 0){
				$scope.options = {
					imgCalculator: 'img/calcs.png',
					imgAbout: 'img/about.png',
					calculatorClass: 'home-icon-font-activi',
					aboutClass:'home-icon-font',
					subTitle:'Do the Math'
				}
			}else{
				$scope.options = {
					imgCalculator: 'img/calc.png',
					imgAbout: 'img/abouts.png',
					aboutClass: 'home-icon-font-activi',
					calculatorClass:'home-icon-font',
					subTitle:'Who We Are'
				};
			}
		}
		
	}
	

});