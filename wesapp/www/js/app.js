// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ngCordova','ngLocalStorage', 'app.controllers', 'app.services', 'app.filters','app.home-controller','app.recover-controller','app.reset-controller','app.login-controller',
  'app.register-controller','app.invite-controller','app.transfers-controller','app.benefi-controller','app.documents-controller',
  'app.document-persist-controller','app.profile-controller','app.benefi-persist-controller','app.benefi-data-controller','app.invite-email-controller','ui.utils.masks','ionic-datepicker'])

.run(function($ionicPlatform, $rootScope,$ionicHistory,$state,$localStorage,$ionicHistory) {

  //$rootScope.baseURL = 'http://www.infohds.com.br';
  // Development
  //$rootScope.baseURL = 'http://localhost/wesapp';
  // Production
  $rootScope.baseURL = 'https://worldeyesolutionsdev.com/wesapp';
  //$rootScope.baseURL = 'http://127.0.0.1';
  $rootScope.user = {};

  //$rootScope.baseURL = 'http://192.168.25.18:8080';
  //$rootScope.baseURL = 'http://lucasgreis92.hopto.org:8080';
  
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.goRegister = function(){
    $state.go('register');
  }
  $rootScope.goLogin = function(){
    $state.go('login');
  }
  $rootScope.myGoBack = function() {
    $ionicHistory.goBack();
  };
  $rootScope.goTabHome = function() {
    $state.go('tab.home');
  };

  $rootScope.logout = function(){
    var key = 'user';
    $localStorage.putObject(key,{});
    $rootScope.user = {};
	$ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });   
    $state.go('home');
  }
  $rootScope.goBenefiPesist = function(){
    $state.go('tab.benefi-persist');
  }
  //$rootScope.goHomeBenefi = function(moedaDestino,sended,valorDestino,fee,rate){
  //  $state.go('tab.home-benefi',{moedaDestino:moedaDestino,sended:sended,valorDestino:valorDestino,fee:fee,rate:rate});
  //}
  $rootScope.goHomeBenefi = function(moedaDestino,sended,valorDestino,fee,rate,curpairdest,ctrycode){
    $state.go('tab.home-benefi',{moedaDestino:moedaDestino,sended:sended,valorDestino:valorDestino,fee:fee,rate:rate,curpairdest:curpairdest,ctrycode:ctrycode});
  }

  $rootScope.goDocuments = function(){
    $state.go('tab.documents');
  }

  $rootScope.goDocumentPersist = function(){
	  //alert('ola');
    $state.go('tab.document-perist');
  }
  
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  // ajustes para ws em php
  /*$httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};**/


  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home',{
    url:'/home/{params:json}',
    params: {params: null},
    cache:false,
    templateUrl:'templates/home.html',
    controller:'HomeController' 
  })


  .state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'LoginController' 

  })

  .state('register',{
    url:'/register',
    cache:false,
    templateUrl:'templates/register.html',
    controller:'RegisterController' 

  })
   .state('reset',{
    url:'/reset',
    cache:false,
    templateUrl:'templates/reset.html',
    controller:'ResetController' 

  }).state('recover',{
    url:'/recover',
    cache:false,
    templateUrl:'templates/recover.html',
    controller:'RecoverController' 

  })
   .state('invite-email',{
    url:'/invite-email',
    cache:false,
    templateUrl:'templates/invite-email.html',
    controller:'InviteEmailController' 

  })
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    url: '/home/{params:json}',
    cache:false,
    params: {params: {}},
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeController'
      }
    }
  })
 .state('tab.home-benefi-data',{
    url: '/home-benefi-data',
	//params:{benef:null,currency:null,fee:null,rate:null,sended:null,valorDestino:null},
	params:{benef:null,currency:null,fee:null,rate:null,sended:null,valorDestino:null,curpairdest:null,ctrycode:null},
    views:{
      'tab-home':{
        templateUrl: 'templates/benefi-data.html',
		controller: 'BenefiDataController'
      }
    }
  })
 .state('tab.cofirm-details',{
    url: '/confirm-details',
	//params:{benef:null,id:null,currency:null,fee:null,rate:null,sended:null,valorDestino:null},
	params:{benef:null,id:null,currency:null,fee:null,rate:null,sended:null,valorDestino:null,curpairdest:null,ctrycode:null},
    views:{
      'tab-home':{
        templateUrl: 'templates/confirm-details.html',
		controller: 'BenefiDataController'
      }
    }
  })
  .state('tab.select-payment',{
    url: '/select-payment',
	//params:{benef:null,id:null,sended:null,currency:null,fee:null,rate:null,valorDestino:null,reference:null,emailben:null},
	params:{benef:null,id:null,sended:null,currency:null,fee:null,rate:null,valorDestino:null,reference:null,emailben:null,curpairdest:null,ctrycode:null},
    views:{
      'tab-home':{
        templateUrl: 'templates/select-payment.html',
		controller: 'BenefiDataController'
      }
    }
  })
    .state('tab.received',{
    url: '/received',
	//params:{benef:null,id:null,sended:null,currency:null,fee:null,rate:null,valorDestino:null,msg:null},
	params:{benef:null,id:null,sended:null,currency:null,fee:null,rate:null,valorDestino:null,msg:null,curpairdest:null,ctrycode:null},
    views:{
      'tab-home':{
        templateUrl: 'templates/received.html',
		controller: 'BenefiDataController'
      }
    }
  })
  .state('tab.home-benefi', {
    url: '/home-benefi',
    //params:{moedaDestino:null,sended:null,currency:null,fee:null,rate:null,valorDestino:null},
    params:{moedaDestino:null,sended:null,currency:null,fee:null,rate:null,valorDestino:null,curpairdest:null,ctrycode:null},
    //params:{moedaDestino,sended,currency,fee,rate,valorDestino},
    cache:false,
    views: {
      'tab-home': {
        templateUrl: 'templates/benefi.html',
        controller: 'BenefiController'
      }
    }
  })
  .state('tab.invite', {
    url: '/invite',
    cache:false,
    views: {
      'tab-invite': {
        templateUrl: 'templates/invite.html',
        controller: 'InviteController'
      }
    }
  })
   
  .state('tab.transfers', {
    url: '/transfers',
    cache:false,
    views: {
      'tab-transfers': {
        templateUrl: 'templates/transfers.html',
        controller: 'TransfersController'
      }
    }
  })
  .state('tab.benefi', {
    url: '/benefi',
    cache:false,
    views: {
      'tab-benefi': {
        templateUrl: 'templates/benefi.html',
        controller: 'BenefiController'
      }
    }
  })
  .state('tab.benefi-persist', {
    url: '/benefi-persist',
	params:{id:null,valorDestino:null},
    cache:false,
    views: {
      'tab-benefi': {
        templateUrl: 'templates/benefi-persist.html',
        controller: 'BenefiPersistController'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    cache:false,
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileController'
      }
    }
  })

  .state('tab.documents',{
    url:'/documents',
    cache:false,
    views:{
      'tab-profile':{
        templateUrl:'templates/documents.html',
        controller:'DocumentsController'     
      }
    }
  })

.state('tab.document-perist',{
    url:'/document-persist',
    cache:false,
    views:{
      'tab-profile':{
        templateUrl:'templates/document-persist.html',
        controller:'DocumentPersistController'     
      }
    }
  })

  // Each tab has its own nav history stack:

  /*.state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  }) **/


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/');
    //$urlRouterProvider.otherwise('/home')

  });

