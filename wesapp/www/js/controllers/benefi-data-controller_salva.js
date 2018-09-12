angular.module('app.benefi-data-controller', ['app.benefiService','app.sendService','ngSanitize','ionic'])

.controller('BenefiDataController', function($scope,$state,$rootScope,benefiResource,sendResource,$ionicPopup,$ionicLoading,$stateParams) {
var cifras = {
	'BRL': 'R$',
	'EUR': '‎€',
	'USD':'US$'
};
$scope.benefi = {};
$scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  $scope.reference = '';
  $scope.emailben = '';	
  $scope.msg = $stateParams.msg == null ? {} : $stateParams.msg;
  if($stateParams.msg != null)
  $scope.msg.CORPO = $scope.msg.CORPO
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>')
  .replace('<>','</br>');	
  
 $scope.send = {
client_id: $rootScope.user.CLI_ID,
 beneficiary_id:$stateParams.benef.id,
 bankaccount_id:$stateParams.benef.bankaccount_id,
 accounttype:$stateParams.benef.accounttype,
 reference:$stateParams.reference,
 emailben:$stateParams.emailben,
currency:$stateParams.currency,
rate:$stateParams.rate,
fee:$stateParams.fee,
sended:$stateParams.sended.toString().indexOf('.') < 0 ? $stateParams.sended +'.00':$stateParams.sended,
valorDestino:$stateParams.valorDestino	
};
console.log($scope.send);
$scope.currency = $stateParams.currency;
$scope.transferId = $stateParams.transferId != null ? $stateParams.transferId : 0;
$scope.cifra = cifras[$stateParams.currency];
$scope.docs = [];
$scope.benefi = $stateParams.benef == null ? {} : $stateParams.benef;
$scope.sended = $scope.send.sended;
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var day = daysInWeek[today.getDay()];
var tommorrow_day = daysInWeek[tomorrow.getDay()];
var dd = today.getDate();
var ddt = tomorrow.getDate();
var mm = today.getMonth()+1; 
var mmt = tomorrow.getMonth()+1; 
var yyyy = today.getFullYear();
var yyyyt = tomorrow.getFullYear();

if(dd<10) {
    dd='0'+dd
} 
if(ddt<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 
if(mmt<10) {
    mmt='0'+mmt
} 

today = dd+'/'+mm+'/'+yyyy;
tomorrow = ddt+'/'+mmt+'/'+yyyyt;
$scope.dateExtense = day+', '+today;
$scope.dateExtense_t = tommorrow_day+', '+tomorrow;
$scope.valueF = $stateParams.valorDestino;

$scope.confirmDetails = function(){
	
	$state.go('tab.cofirm-details', { 
	benef:$scope.benefi,
	currency:$stateParams.currency,
	rate:$stateParams.rate,
	fee:$stateParams.fee,
	sended:$stateParams.sended,
	valorDestino:$stateParams.valorDestino
	});
};
$scope.selectPayment = function(refp,embp){
	//alert(refp);
	//if (this.obj.reference == '') {
	//	this.obj.reference = 'TESTE';
	//}
	$state.go('tab.select-payment', { 
	benef:$scope.benefi,
	currency:$stateParams.currency,
	rate:$stateParams.rate,
	fee:$stateParams.fee,
	sended:$stateParams.sended,
	valorDestino:$stateParams.valorDestino,
	//reference:this.obj.reference,
	//emailben:this.obj.emailben	});	
	//reference:this.conf.reference.value,
	//emailben:this.conf.emailben.value	});	
	reference:refp,
	emailben:embp	});	

	
};
$scope.received = function(payment){
	
	
	sendResource.post($scope.send)
			.success(function(data, status, headers, config) {
			$ionicLoading.hide();
			$state.go('tab.received', { 
			transferId:data.id,
			benef:$scope.benefi,
			currency:$stateParams.currency,
			rate:$stateParams.rate,
			fee:$stateParams.fee,
			sended:$stateParams.sended,
			valorDestino:$stateParams.valorDestino,
			msg: data			});
			
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});

	
};


});