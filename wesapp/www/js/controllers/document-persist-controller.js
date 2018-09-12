angular.module('app.document-persist-controller', ['app.tipoDocService','app.countryService','app.profileDocumentsService','ngMask','selector'])

.controller('DocumentPersistController', function($scope,$rootScope,$state,countryResource,tipoDocResource,profileDocumentsResource,$ionicLoading, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet,ionicDatePicker) {
	
	  $scope.backToDocuments = function() {
      $state.go('tab.documents');
  };
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };

	var DateFull, DateDay, DateMonth, DateYear;
	var dt1=0;
	var mon1=0;
	var yr1=0;
	var DateFullD;
	//var dtnum = 1497135600000;
	//var dtnum = Date.parse( "Jun 11, 2017");
	var dtnum = 0;

    $scope.documentTypes = [];
	$scope.countries = [];
	var arrt = [];
	$scope.countriest1 = [{}];
	$scope.document = {
		docType : {},
		country:{},
		number: null,
		valid: null,
		frontImg: null,
		backImg: null,
		hash: $rootScope.user
	};

    $scope.openDatePicker = function(){
		DateFull = $scope.document.valid;
		//alert($scope.document.valid);
		if (DateFull != '' && DateFull != null) {
			DateDay = DateFull.substr(0,2);
			DateMonth = DateFull.substr(3,2); //January is 0!

			DateYear = DateFull.substr(6,4);
			dt1   = parseInt(DateDay);
			mon1  = parseInt(DateMonth);
			mon1  -= 1;
			yr1   = parseInt(DateYear);
			dtnum = new Date(yr1, mon1, dt1, 00, 00).getTime();
		} else {
			dtnum = new Date().getTime();
		}
		var ipObj1 = {
		  callback: function (val) {  //Mandatory
			//console.log('Return value from the datepicker popup is : ' + val, new Date(val));
			//$scope.showAlert('Return value from the datepicker popup is', val);
			var dtf = new Date(val);
			var dd = dtf.getDate();
			var mm = dtf.getMonth()+1; //January is 0!

			var yyyy = dtf.getFullYear();
			if(dd<10){
				dd='0'+dd;
			} 
			if(mm<10){
				mm='0'+mm;
			} 
			var today = dd+'/'+mm+'/'+yyyy;
			//alert(DateYear);

			$scope.document.valid = today;
		  },
		  //disabledDates: [            //Optional
		  //  new Date(yr1,mon1,dt1),
		  //  new Date(2015, 3, 16),
		  //  new Date(2015, 4, 16),
		  //  new Date(2015, 5, 16)
		  //  new Date('Wednesday, August 12, 2015'),
		  //  new Date("08-16-2016")
		  //  new Date(1439676000000)
		  //],
		  from: new Date(1910, 1, 1), //Optional
		  //to: new Date(), //Optional
		  dateFormat: 'dd/MM/yyyy',
		  //inputDate: new Date(2015,3,25),      //Optional
		  //inputDate: $scope.document.valid,      //Optional
		  //inputDate: new Date(yr1,mon1,dt1),      //Optional
		  inputDate: new Date(dtnum),
		  mondayFirst: true,          //Optional
		  //disableWeekdays: [0],       //Optional
		  disableWeekdays: [],       //Optional
		  showTodayButton: true,       //Optional
		  closeOnSelect: false,       //Optional
		  weeksList: ["S", "M", "T", "W", "T", "F", "S"],
		  templateType: 'popup'       //Optional
		};

		ionicDatePicker.openDatePicker(ipObj1);
    };

	$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
	}).then(function(){
	});
	tipoDocResource.get()
	.success(function(data, status, headers, config) {
		$scope.documentTypes = data;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$ionicLoading.hide();
	});
	
countryResource.get()
	.success(function(data, status, headers, config) {
		$scope.countries = data;
		for (var i =0; i < $scope.countries.length; i++) {
			//if (i == 0) {
			//alert($scope.countries[i].flag);
			//}
			arrt.push({
				id: $scope.countries[i].id,
				name: $scope.countries[i].name,
				flag: $scope.countries[i].flag
			});
		}
		$scope.countriest1 = arrt;
		//$scope.countriest1 = data;

		//if ($scope.profile.COUNTRY != '') {
		//	$scope.countriest = $scope.profile.COUNTRY;
		//} else {
		//	$scope.countriest = $scope.countriest1[0].id;
		//}
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$ionicLoading.hide();
	});


	$scope.saveDoc = function(){
		console.log($scope.document);
		if($scope.document.frontImg == null && $scope.document.backImg == null)
		{
			$scope.showAlert('Document photo (front/back)', 'Select an image to upload.');
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
		profileDocumentsResource.post($scope.document)
		.success(function(data, status, headers, config) {
			$scope.showAlert('Success', 'Document saved.');
			$scope.backToDocuments();
		})
		.error(function(data, status, headers, config) {
			$ionicLoading.hide();
		});
	}

	$scope.getCamera = function(ieFront){
		if(navigator.camera != null 
			&& typeof navigator.camera != "undefined" ){
			navigator.camera.getPicture(onSuccess, onFail, { quality: 35,
				destinationType: Camera.DestinationType.DATA_URL });
		
		function onSuccess(imageURI) {
			if(ieFront){
				$scope.document.frontImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}else{
				$scope.document.backImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}
		}
		function onFail(message) {
		}
	}
};
/*
	$scope.getCamera = function(ieFront){
	alert('0');
	document.addEventListener("deviceready", function () {
		alert('1 ' + navigator.camera);
		if(navigator.camera != null 
			&& typeof navigator.camera != "undefined" ){
		alert('1a');
			navigator.camera.getPicture(onSuccess, onFail, { quality: 35,
				destinationType: Camera.DestinationType.DATA_URL });
		
		function onSuccess(imageURI) {
			if(ieFront){
				$scope.document.frontImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}else{
				$scope.document.backImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}
		}
		function onFail(message) {
		}
	}
	}, false);
};
*/
//
/*
	$scope.getCamera = function(ieFront){
	alert('0');
	//document.addEventListener("deviceready", onDeviceReady, false);
	//function onDeviceReady() {
	//ionic.Platform.ready( function() {
		//alert('1 ' + navigator.camera);
		//if($cordovaCamera != null 
		//&& typeof $cordovaCamera != "undefined" ){
		alert('1a');
			//$cordovaCamera.getPicture(onSuccess, onFail, {quality: 35,
			navigator.camera.getPicture(onSuccess, onFail, {quality: 35,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 100,
				targetHeight: 100,
				//popoverOptions: $cordovaCamera.PopoverArrowDirection.ARROW_UP,
				saveToPhotoAlbum: false,
				correctOrientation:true});
		
		function onSuccess(imageURI) {
			if(ieFront){
				$scope.document.frontImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}else{
				$scope.document.backImg = imageURI;
				//$scope.selected = 'data:image/png;base64,'+imageURI;
			}
		}
		function onFail(message) {
			alert(message);
		}
	//	});
	//}
	//}
};
*/
//

});