
angular.module('app.invite-controller', ['ngCordova'])

.controller('InviteController', function($scope,$state,$cordovaSms,$ionicModal,$ionicPopup) {

		$scope.numbersms = '';

		 $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
  
  	 $scope.goEmail = function() {
    $state.go('invite-email');
  };
  
		$scope.sendSMS = function(){
		
		$cordovaSms
      .send('', 'Hey !!! checkout this incredible transfer app.', {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
               intent: 'INTENT'  // Opens Default sms app
              //intent: '' // Sends sms without opening default sms app
            }
	  }
)
      .then(function() {
        //$scope.showAlert('Success', ' Success! SMS was sent.');
      }, function(error) {
        //$scope.showAlert('Error', ' An error occurred.');
      });

	};
$scope.modal = $ionicModal.fromTemplate( '<ion-modal-view>' +
      ' <ion-header-bar>' +
         '<h1 class = "title">Insert a number</h1> <button class = "button icon icon-left ion-ios-close-outline" ng-click = "closeModal()"></button>' +
      '</ion-header-bar>' +
		'<ion-content>'+
		'<div class="row">'+
			'<div class="col col-33" >'+
				'<label style="margin-left:15%;color:  rgb(81,159,202);">SMS number</label>'+
			'</div>			<div class="col" >'+
				'<input type="text"  style="width: 100%;box-shadow: 0 0 3px #111;" ng-model="numbersms">	'+
			'</div>		</div>'+
		'<button style="width: 65%;position: relative;left: 30%;" ng-click="sendSMS();" type="button"'+
		' class="button button-block button-positive back_btn icon-left ion-checkmark-round">Send sms</button>'
		+'</ion-content>' +
		
   '</ion-modal-view>', {
      scope: $scope,
      animation: 'slide-in-up'//'slide-left-right'
   })

   $scope.openModal = function() {
      $scope.modal.show();
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
});