angular.module('app.home-controller', ['app.moedaService','app.conversaoService','selector'])

.controller('HomeController', function($scope,$state,$ionicSlideBoxDelegate,$ionicLoading,$stateParams,$ionicPopup,$rootScope,$localStorage,
	converter,moedaResource) {


	var key = 'user';
	$rootScope.user = $localStorage.getObject(key);
	if($stateParams.params == null && (typeof $rootScope.user != "undefined" && $rootScope.user != null)
		&& (typeof $rootScope.user.HASH != "undefined" && $rootScope.user.HASH != null)){
		$rootScope.goTabHome();
	}

	$scope.teste = '';
	var arrt = [];
	$scope.moedast1 = [{}];
function getNewArr(Tarr) {
        
    return Tarr.map(function(item){
        return {
		id: item.id,
		name: item.name,
		rate: item.rate,
		flag: item.flag,
		ctry: item.ctry // JUL18
	};
    });
    
}

	$scope.updateMySelectedOptions= function(oldValue, newValue) {
		//alert(JSON.stringify(newValue));
		//alert(oldValue.id + oldValue.ctry + '|' + newValue.id + newValue.ctry);
		for (var i =0; i < $scope.moedas.length; i++) {
			//alert('1: ' + $scope.moedas[i].ctry + ' - ' + newValue.ctry);
			//if ($scope.moedas[i].id == newValue.id) {
			//if ($scope.moedas[i].flag == newValue.flag) {
			if ($scope.moedas[i].ctry == newValue.ctry) { // JUL18
				//$scope.ctry = $scope.moedas[i].ctry;
				//$scope.moedaDestinoChange($scope.moedast1[i]);
				
				$scope.moedaDestinoChange($scope.moedas[i]);
				break;
			}
		}
	}
	
	$scope.click = false;
	$scope.valor = '100.00';
	$scope.valorDestino = '0';
	$scope.flagged = '';
	$scope.rate = '0.00';
	$scope.fee = '0.00';

	$scope.moedaDestino = {};
	//$scope.moedaDestino = [];
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
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
	}).then(function(){
	}); 
	moedaResource.query(function(listamoedas) {
		$scope.moedas = listamoedas;
$scope.teste = $scope.moedas.length;
		for (var i =0; i < $scope.moedas.length; i++) {
			arrt.push({
				id: $scope.moedas[i].id,
				name: $scope.moedas[i].name,
				rate: $scope.moedas[i].rate,
				//flag: $scope.moedas[i].flag
				flag: 'flag '+$scope.moedas[i].flag,
				
				//cur: $scope.moedas[i].id.substr(3,3),
				cur: $scope.moedas[i].id.substr(3,3) + ' ' + $scope.moedas[i].ctrn, // JUL18
				ctry: $scope.moedas[i].ctry, // JUL18
				ctrn: $scope.moedas[i].ctrn // JUL18
			});
			$scope.moedas[i].flag = 'flag '+$scope.moedas[i].flag;
		}
		$scope.moedast1 = arrt;
		//alert('4');
		//$scope.mymoedast = "GBPBRL"; JUL18
		$scope.mymoedast = "55"; // JUL18
		$scope.teste = $scope.moedast1.length;

		//$scope.moedaDestinoChange($scope.moedas[0]);
		//alert('3: ' + $scope.moedast1[0].ctry);
		$scope.moedaDestinoChange($scope.moedast1[0]);

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
var xyz = [{id:"GBPBRL",name:"Real BRL",rate:"3.83",flag:"br"},{id:"GBPEUR",name:"Euro EUR",rate:"1.12",flag:"eu"},{id:"GBPUSD",name:"Dollar USD",rate:"1.19",flag:"us"},{id:"GBPARS",name:"Argentine Peso ARS",rate:"19.0842",flag:"ar"},{id:"GBPAUD",name:"Australian AUD",rate:"1.6469",flag:"au"},{id:"GBPBOB",name:"Boliviano BOB",rate:"8.6154",flag:"bo"},{id:"GBPCAD",name:"Canadian CAD",rate:"1.6705",flag:"ca"},{id:"GBPCLP",name:"Chilean Peso CLP",rate:"820.2697",flag:"cl"},{id:"GBPCOP",name:"Colombian Peso COP",rate:"3,560.250",flag:"co"},{id:"GBPCZK",name:"Czech Koruna",rate:"31.6195",flag:"cz"},{id:"GBPECU",name:"Ecuador US Dollar",rate:"1.2468",flag:"ec"},{id:"GBPPYG",name:"Guarani PYG",rate:"7,018.7048",flag:"py"},{id:"GBPJPY",name:"Japan Yen",rate:"138.7813",flag:"jp"},{id:"GBPNZD",name:"New Zealand NZD",rate:"1.7916",flag:"nz"},{id:"GBPPEN",name:"Nuevo Sol PEN",rate:"4.0528",flag:"pe"},{id:"GBPCHF",name:"Swiss Franc CHF",rate:"1.2519",flag:"ch"},{id:"GBPUYU",name:"Uruguayo Peso UYU",rate:"35.5837",flag:"uy"},{id:"GBPVEF",name:"Venezuela VEF",rate:"12.4556",flag:"ve"},{id:"GBPPLN",name:"Zloty PLN",rate:"4.9495",flag:"pl"}];
	$scope.moedaInputChange = function(valor){
		$scope.valor = valor;
		if(typeof $scope.moedaDestino.id != 'undefined' && $scope.moedaDestino.id != null){
			//$scope.valorDestino = $scope.moedaDestino.rate * $scope.valor;
			//alert(ctry);

			$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
			}).then(function(){
			});
			var options ={
				id : $scope.moedaDestino.id,
				valor:  $scope.valor,
				ctry: $scope.moedaDestino.ctry // JUL18
				//ctry: '351'
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
		//alert('2: ' + $scope.moedaDestino.ctry);


		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		var options ={
			id : $scope.moedaDestino.id,
			valor:  $scope.valor,
			ctry: $scope.moedaDestino.ctry // JUL18
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