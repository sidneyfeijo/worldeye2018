angular.module('app.profile-controller', ['app.profileService','app.countryService','app.cityService','ngMask','selector'])

.controller('ProfileController', function($scope,$state,profileResource,countryResource,cityResource,$ionicLoading,$rootScope,$localStorage,ionicDatePicker) {
	$scope.countries = [];
	//$scope.docs = function() {
    //$state.go('tab.documents');
  //};

	var arrt = [];
	$scope.countriest1 = [{}];
	$scope.city1 = "";

	var DateFull, DateDay, DateMonth, DateYear;
	var dt1=0;
	var mon1=0;
	var yr1=0;
	var DateFullD;
	var dtnum = 0;
	//alert($scope.profile.DATEOFBIRTH);
	alert('begin');

	    $scope.openDatePicker = function(){
		DateFull = $scope.profile.DATEOFBIRTH;
		//alert($scope.profile.DATEOFBIRTH);
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

			$scope.profile.DATEOFBIRTH = today;
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
		  to: new Date(), //Optional
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

  $scope.resetPass = function() {
    $state.go('reset');
  };
	//$scope.profile = {};
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
	
profileResource.get($rootScope.user)
	.success(function(data, status, headers, config) {
		data.MOBILE = data.MOBILE == null ? '' : Number(data.MOBILE);
		//data.DATEOFBIRTH =  data.DATEOFBIRTH == null ? '' : new Date(data.DATEOFBIRTH);
		data.DATEOFBIRTH =  data.DATEOFBIRTH == null ? '' : data.DATEOFBIRTH;
		$scope.profile = data;
		
		//alert('1:'+$scope.profile.COUNTRY);
		//alert('11:'+$scope.profile.CITY);
		
		//$scope.cidade = $scope.profile.CITY;
		$scope.CLI_ID = $rootScope.user.CLI_ID;
		//$scope.city1 = 1;
		$ionicLoading.hide();
	})
	.error(function(data, status, headers, config) {
		$scope.profile = {};
		$ionicLoading.hide();
	});
	
countryResource.get()
	.success(function(data, status, headers, config) {
		$scope.countries = data;
		//alert($scope.countries[0].id);
		//alert($scope.countries.length);
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
		
		//alert('2:'+$scope.profile.COUNTRY);

		if ($scope.profile.COUNTRY != '') {
			$scope.countriest = $scope.profile.COUNTRY;
		} else {
			$scope.countriest = $scope.countriest1[0].id;
		}
		
		//alert('22 countryResource.get:'+$scope.countriest);
		
		$ionicLoading.hide();
		
		cityResource.where($scope.profile.COUNTRY)
			.success(function(data, status, headers, config) {
				$scope.cities = data;
				//$scope.banks = data;
				//alert($scope.countries[0].id);
				//alert($scope.countries.length);
				for (var i =0; i < $scope.cities.length; i++) {
					if ($scope.cities[i].id == $scope.profile.CITY) {
						$scope.city1 = $scope.cities[i];
						
						//alert('23 cityResource.where '+$scope.cities[i].id + ' - ' + $scope.profile.CITY);
						
						break;
					}
					//if (i == 0) {
					//alert($scope.cities[i].id + $scope.cities[i].name);
					//}
					//arrt.push({
					//	id: $scope.cities[i].id,
					//	name: $scope.cities[i].name
					//});
				}
				//$scope.countriest1 = arrt;
				//$scope.countriest1 = data;
				//alert('2:'+$scope.profile.COUNTRY);

				//if ($scope.profile.CITY != '') {
				//	$scope.countriest = $scope.profile.COUNTRY;
				//} else {
				//	$scope.countriest = $scope.countriest1[0].id;
				//}
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
			});
	})
	.error(function(data, status, headers, config) {
		$ionicLoading.hide();
	});
//cityResource.get('44')
//cityResource.where('44')
		//alert('21:'+$scope.countriest);

	$scope.submit = function(){
		if(this.formprofile.$valid){
			$ionicLoading.show({
       template: '<img src="img/rmfavicon.png" alt="" width="32" height="32" />',
       animation: 'fade-in',
       noBackdrop: true,
       maxWidth: 40,
       showDelay: 0
			}).then(function(){
			});
			profileResource.post($scope.profile)
			.success(function(data, status, headers, config) {
				$scope.profile = data;
				$ionicLoading.hide();
			})
			.error(function(data, status, headers, config) {
				$ionicLoading.hide();
			});
		}
	}
	$scope.updateMySelectedOptions= function(oldValue, newValue) {
			cityResource.where(newValue.id)
				.success(function(data, status, headers, config) {
					$scope.cities = data;
					for (var i =0; i < $scope.cities.length; i++) {
						if ($scope.cities[i].id == $scope.profile.CITY) {
							$scope.city1 = $scope.cities[i];
							
							//alert('231 cityResource.where '+$scope.cities[i].id + ' - ' + $scope.profile.CITY);
							
							break;
						}
					}
					$ionicLoading.hide();
				})
				.error(function(data, status, headers, config) {
					$ionicLoading.hide();
				});
		//}
	}
$scope.hasChanged = function(cidade) {
    //alert('hasChanged ' + cidade);
	$scope.profile.CITY = cidade;
	//alert('230 ' + $scope.profile.CITY);
  }
});