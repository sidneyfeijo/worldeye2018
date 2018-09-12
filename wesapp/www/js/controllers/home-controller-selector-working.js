angular.module('app.home-controller', ['app.moedaService','app.conversaoService','selector','mobiscroll-select'])

.controller('HomeController', function($scope,$state,$ionicSlideBoxDelegate,$ionicLoading,$stateParams,$ionicPopup,$rootScope,$localStorage,
	converter,moedaResource) {


	// mobiscroll
	var myDataWork = [];
	$scope.selectOptions1 = {
		theme: 'mobiscroll',
		lang: 'en-UK',
		multiline: 1,
		height: 50,
		closeOnOverlayTap: true,
		circular: false,
		buttons: ['cancel'],
		showScrollArrows: false,
		filter: false,
		inputClass: 'demo-non-form',
		placeholder: 'Please Select...',
		//onItemTap: function (event,inst) {
		//	var countryselected = inst.getVal(); // Call the getVal method
		//	alert('Country ' + countryselected);
		//},
		onChange: function (event,inst) {
			var countryselected1 = inst.getVal(); // Call the getVal method
			//alert('CountrySet ' + countryselected1);
			for (var i =0; i < $scope.moedasori.length; i++) {
				if ($scope.moedasori[i].id == countryselected1) {
					$scope.flagori = $scope.moedasori[i].flag;
					//curori = $scope.moedasori[i].id;
					//alert(JSON.stringify($scope.moedasori[i]));
					break;
				}
			}
		}
	};
	$scope.selectOptions2 = {
	  theme: 'mobiscroll',
	  lang: 'en-UK',
	  multiline: 1,
	  height: 50,
	  closeOnOverlayTap: true,
	  circular: false,
	  buttons: ['cancel'],
	  showScrollArrows: false,
	  filter: false,
	  inputClass: 'demo-non-form',
	  placeholder: 'Please Select...',
	  onChange: function (event,inst) {
		var countryselected2 = inst.getVal();
		//alert('CountrySet ' + countryselected2);
		for (var i = 0; i < $scope.moedas.length; i++) {
		  //alert('Ctry ' + $scope.moedas[i].ctry);
		  if ($scope.moedas[i].ctry == countryselected2) {
			//alert('Flag ' + $scope.moedas[i].flag);
			$scope.flagdes = $scope.moedas[i].flag;
			break;
		  }
		}
	  }
	};
	// mobiscroll




	var key = 'user';
	$rootScope.user = $localStorage.getObject(key);
	if($stateParams.params == null && (typeof $rootScope.user != "undefined" && $rootScope.user != null)
		&& (typeof $rootScope.user.HASH != "undefined" && $rootScope.user.HASH != null)){
		$rootScope.goTabHome();
	}

	$scope.teste = '';
	
	$scope.curpairdest = '';
	$scope.ctrycode = '';
	
	var arrt = [];
	var arrtori = [];
	var curori = "";
	var curdes = "";
	$scope.moedast1 = [{}];
	$scope.moedast0 = [{}];
	//alert('A1');
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

	$scope.updateMySelectedOptions = function(oldValue, newValue) {
	//alert('A2');
		//alert('Old value: '+JSON.stringify(oldValue));
		//alert('New value: '+JSON.stringify(newValue));
		//alert(JSON.stringify(newValue));
		//alert(oldValue.id + oldValue.ctry + '|' + newValue.id + newValue.ctry);
		if (angular.isUndefined(oldValue)) {
			var oldvalor = "55";
		} else {
			var oldvalor = oldValue.ctry;
		}
		if (angular.isUndefined(newValue)) {
			var newvalor = "55";
		} else {
			var newvalor = newValue.ctry;
		}
		for (var i =0; i < $scope.moedas.length; i++) {
			//alert('1: ' + $scope.moedas[i].ctry + ' - ' + newvalor + ' oldvalue=' + oldvalor);
			//if ($scope.moedas[i].id == newValue.id) {
			//if ($scope.moedas[i].flag == newValue.flag) {
			//if ($scope.moedas[i].ctry == newValue.ctry) { // JUL18
			if ($scope.moedas[i].ctry == newvalor) { // JUL18
				//$scope.ctry = $scope.moedas[i].ctry;
				//$scope.moedaDestinoChange($scope.moedast1[i]);
				
				//alert('1 Achou: ' + $scope.moedas[i].ctry + ' - ' + newvalor + ' oldvalue=' + oldvalor);
				$scope.mymoedast = newvalor;
				$scope.moedaDestinoChange($scope.moedas[i]);
				break;
			}
		}
	}
	//alert('X1');
	$scope.updateMySelectedOptions0 = function(oldValue, newValue) {
	//alert('A3');
		//alert('0 Old value: '+JSON.stringify(oldValue));
		//alert('0 New value: '+JSON.stringify(newValue));
		//alert(oldValue.id + oldValue.ctry + '|' + newValue.id + newValue.ctry);
		for (var i =0; i < $scope.moedasori.length; i++) {
			//alert('1 0: ' + $scope.moedasori[i].ctry + ' - ' + newValue.ctry + ' oldvalue=' + oldValue.ctry);
			//if ($scope.moedas[i].id == newValue.id) {
			//if ($scope.moedas[i].flag == newValue.flag) {
			if ($scope.moedasori[i].ctry == newValue.ctry) { // JUL18
				//$scope.ctry = $scope.moedas[i].ctry;
				//$scope.moedaDestinoChange($scope.moedast1[i]);
				
				$scope.moedaOrigemChange($scope.moedasori[i]);
				break;
			}
		}
		// AQUI UPDATE Lista de Moedas Destino 104-167
		$ionicLoading.show({
		   template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
		   animation: 'fade-in',
		   noBackdrop: true,
		   maxWidth: 40,
		   showDelay: 0
		}).then(function(){
		});
			var options ={
				//curnot: 'GBP',
				curnot: $scope.moedasori[i].id.substr(0,3),
				tipo: 'DES'
			};
			moedaResource.do(options)
			//moedaResource.query(function(listamoedas) {
			.success(function(data, status, headers, config) {
			//$scope.moedas = listamoedas;
			$scope.moedas = data;
			$scope.teste = $scope.moedas.length;
			arrt = [];
			myDataWork = [];
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
				// mobicroll
				myDataWork.push({
					value: $scope.moedas[i].ctry,
					text: $scope.moedas[i].name,
					html: '<span class="'+$scope.moedas[i].flag+'"></span>'+$scope.moedas[i].name
				});
				// mobiscroll
			}
			//alert('A5');
			$scope.myData2 = myDataWork;
			$scope.moedast1 = [{}];
			$scope.moedast1 = arrt;
			// mobicroll
			$scope.sel2 = "55";
			$scope.flagdes = 'flag br';
			// mobicroll
			//alert('4');
			//$scope.mymoedast = "GBPBRL"; JUL18
			$scope.mymoedast = "55"; // JUL18
			for (var i =0; i < $scope.moedast1.length; i++) {
				if ($scope.moedast1[i].ctry == "55") {
					curdes = $scope.moedast1[i].id;
					//alert('curdes = ' + curdes);
					break;
				}
			}
			$scope.teste = $scope.moedast1.length;

			//$scope.moedaDestinoChange($scope.moedas[0]);
			//alert('3: ' + $scope.moedast1[0].ctry);
			$scope.moedaDestinoChange($scope.moedast1[i]);

			$ionicSlideBoxDelegate.update();
			$ionicLoading.hide();
			})
		//}, function(erro) {
			.error(function(data, status, headers, config) {
			//console.log(erro);
			$ionicLoading.hide();
			var myPopup = $ionicPopup.show({
				template: 'Verifique se você está conectado a internet!',
				title: 'Erro de conexão',
			});

		});
		//
	}
	
	$scope.click = false;
	$scope.valor = '100.00';
	$scope.valorDestino = '0';
	$scope.flagged = '';
	$scope.rate = '0.00';
	$scope.fee = '0.00';

	$scope.moedaDestino = {};
	$scope.moedaOrigem = {};
	//$scope.moedaDestino = [];
	$ionicSlideBoxDelegate.update();

	$scope.options = {
		imgCalculator: 'img/calcs.png',
		imgAbout: 'img/about.png',
		calculatorClass: 'home-icon-font-activi',
		aboutClass:'home-icon-font',
		subTitle:'Do the Math'
	}

	//$scope.moedas =[];

	$scope.moedaOrigem = {};
	$scope.moedasOrigem = [];
	$scope.moedasOrigem.push({
		id:1,
		name:'GBP'
	});
	//alert('A4');
	
	//$scope.moedaOrigem = $scope.moedasOrigem[0];

	$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
	}).then(function(){
	});
		// Processa moedaDestino ****************************************************************************************
	// Processa moedaDestino END
	
	// Processa moedaOrigem ****************************************************************************************
		var options ={
			curnot: 'GBP',
			tipo: 'ORI'
		};
		//alert('A42');
		moedaResource.do(options)
		//moedaResource.query(function(listamoedas) {
		.success(function(data, status, headers, config) {
		//$scope.moedas = listamoedas;
		$scope.moedasori = data;
		$scope.teste = $scope.moedasori.length;
		//var myDataOri = [{}];
		myDataWork = [];
		for (var i =0; i < $scope.moedasori.length; i++) {
			arrtori.push({
				id: $scope.moedasori[i].id,
				name: $scope.moedasori[i].name,
				rate: $scope.moedasori[i].rate,
				//flag: $scope.moedas[i].flag
				flag: 'flag '+$scope.moedasori[i].flag,
				
				//cur: $scope.moedas[i].id.substr(3,3),
				cur: $scope.moedasori[i].id.substr(3,3) + ' ' + $scope.moedasori[i].ctrn, // JUL18
				ctry: $scope.moedasori[i].ctry, // JUL18
				ctrn: $scope.moedasori[i].ctrn // JUL18
			});
			$scope.moedasori[i].flag = 'flag '+$scope.moedasori[i].flag;
			// mobicroll
			myDataWork.push({
				value: $scope.moedasori[i].id,
				//text: $scope.moedasori[i].ctry + ' ' + $scope.moedasori[i].name,
				text: $scope.moedasori[i].name,
				html: '<span class="'+$scope.moedasori[i].flag+'"></span>'+$scope.moedasori[i].name
			});
			// mobiscroll
			
		}
		//alert('A6');
		$scope.myData = myDataWork;
		$scope.moedast0 = arrtori;
		// mobicroll
		
		if($scope.myInstance1 != null 
			&& typeof $scope.myInstance1 != "undefined" ){
		$scope.myInstance1.option({
				theme: 'mobiscroll',
				lang: 'en-UK',
				multiline: 1,
				height: 50,
				data: myData,
				closeOnOverlayTap: true,
				circular: false,
				buttons: ['cancel'],
				showScrollArrows: false,
				filter: false,
				inputClass: 'demo-non-form',
				placeholder: 'Please Select...',
				//onItemTap: function (event,inst) {
				//	var countryselected = inst.getVal(); // Call the getVal method
				//	alert('Country ' + countryselected);
				//},
				onChange: function (event,inst) {
					var countryselected1 = inst.getVal(); // Call the getVal method
					//alert('CountrySet ' + countryselected1);
					for (var i =0; i < $scope.moedasori.length; i++) {
						if ($scope.moedasori[i].id == countryselected1) {
							$scope.flagori = $scope.moedasori[i].flag;
							//curori = $scope.moedasori[i].id;
							//alert(JSON.stringify($scope.moedasori[i]));
							break;
						}
					}
				}
			});
		}
		
		//$scope.myInstance.nonFormSettings.data = myData;
		$scope.sel = "GBPGBP";
		$scope.flagori = 'flag gb';
		// mobicroll
		
		//alert('5');
		//$scope.mymoedast = "GBPBRL"; JUL18
		$scope.mymoedast0 = "GBP"; // JUL18
		for (var i =0; i < $scope.moedasori.length; i++) {
			if ($scope.moedasori[i].ctry == "GBP") {
				curori = $scope.moedasori[i].id;
				//alert(JSON.stringify($scope.moedasori[i]));
				break;
			}
		}
		$scope.teste = $scope.moedast0.length;

		//$scope.moedaDestinoChange($scope.moedas[0]);
		//alert('3: ' + $scope.moedast1[0].ctry);
		$scope.moedaOrigemChange($scope.moedast0[i]);

		$ionicSlideBoxDelegate.update();
		$ionicLoading.hide();
		})
	//}, function(erro) {
		.error(function(data, status, headers, config) {
		//console.log(erro);
		//alert(headers);
		$ionicLoading.hide();
		var myPopup = $ionicPopup.show({
			template: 'Verifique se você está conectado a internet!22',
			title: 'Erro de conexão',
		});

	});
	
	// Processa moedaOrigem END
	
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
				ctry: $scope.moedaDestino.ctry, // JUL18
			//idori : curori,
			//iddes : curdes,
			idori : $scope.mymoedast0,
			iddes : $scope.mymoedast,
			idfrom: 'moedaInputChange'
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
		//alert('A7 ' + JSON.stringify(moeda));
		$scope.moedaDestino = moeda;
		//$scope.valorDestino = moeda.rate * $scope.valor;
		$scope.flagged = moeda.flag;
		$scope.rate =  moeda.rate;
		//alert('21: ' + $scope.moedaDestino.ctry);


		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		var curpair1 = curori.substring(0,3);
		var curpair2 = curpair1.concat(curdes.substring(3,3));
		//alert($scope.moedaDestino.id);
		//alert(JSON.stringify($scope.moedaDestino));
		
		$scope.curpairdest = $scope.moedaDestino.id;
		$scope.ctrycode = $scope.moedaDestino.ctry;
		
		var options ={
			id : $scope.moedaDestino.id,
			valor:  $scope.valor,
			ctry: $scope.moedaDestino.ctry, // JUL18
			//idori : curori,
			//iddes : curdes,
			idori : $scope.mymoedast0,
			iddes : $scope.mymoedast,
			idfrom: 'moedaDestinoChange'
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
	$scope.moedaOrigemChange = function(moeda){
		//alert('A8');
		$scope.moedaOrigem = moeda;
		//$scope.valorDestino = moeda.rate * $scope.valor;
		
		$scope.flagged = moeda.flag;
		$scope.rate =  moeda.rate;
		
		//alert('22: ' + $scope.moedaOrigem.flag);


		$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
		}).then(function(){
		});
		var curpair1 = curori.substring(0,3);
		var curpair2 = curpair1.concat(curdes.substring(3,3));
		var options ={
			id : $scope.moedaOrigem.id,
			valor:  $scope.valor,
			ctry: $scope.moedaOrigem.ctry, // JUL18
			//idori : curori,
			//iddes : curdes,
			idori : $scope.mymoedast0,
			iddes : $scope.mymoedast,
			idfrom: 'moedaOrigemChange'
		};
		converter.do(options)
		.success(function(data, status, headers, config) {
			
			$scope.fee = data.fee;
			$scope.valorDestino = data.valor;
			
			$ionicLoading.hide();
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
			
			//$scope.valorDestino = 0;
			//$scope.fee = 0;
			
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