// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic']); // 'starter.controllers', 'starter.services'])

app.run(function($ionicPlatform) {
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
});

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-register.html',
          controller: 'templateFormController'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-attendees.html',
        controller: 'templateAttendeesController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

app.service('tempStorageService', function(){
  /* Object array to store, add and call data */
  this.storageObjArray =
    [
      {
        "firstName": "Herkko",
        "lastName": "Makkonen",
        "email": "makkonen22@gmail.com",
        "diet": "meat",
        "sauna": true
      },
      {
        "firstName": "Maija",
        "lastName": "Maukonen",
        "email": "maija.maukonen@outlook.com",
        "diet": "fish",
        "sauna": true
      },
      {
        "firstName": "Mervi",
        "lastName": "Laulavainen",
        "email": "merla@yahoo.com",
        "diet": "vegetarian",
        "sauna": false
      },
      {
        "firstName": "Jussi",
        "lastName": "Turunen",
        "email": "jussi.turunen@luukku.com",
        "diet": "meat",
        "sauna": true
      },
      {
        "firstName": "Günther",
        "lastName": "Bösebuben",
        "email": "guenther.boeseboeben@gmx.de",
        "diet": "fish",
        "sauna": true
      },
      {
        "firstName": "Erkki",
        "lastName": "Lasinen",
        "email": "erkki62@hotmail.com",
        "diet": "meat",
        "sauna": false
      },
      {
        "firstName": "Rauli",
        "lastName": "Hiironen",
        "email": "rauli-hiironen@gmail.com",
        "diet": "fish",
        "sauna": true
      },
      {
        "firstName": "Paula",
        "lastName": "Viitaniemi",
        "email": "paula.viitaniemi@jamk.fi",
        "diet": "vegetarian",
        "sauna": false
      }
    ];

  // Some text that could be on a sole controller, but are here for testing the service.
  this.infoText = "We have an awesome event on 1st of September at Lutakko aukio!";
  this.buttonText = "Go ahead and register!";
});

// Creating custom filter to transform boolean data into user readable words.
app.filter('bool2words', function(){
  return function(x){
    if (x === true){
      return "Yes!";
    } else if (x === false){
      return "No...";
    } else {
      return "No...";
    }
  };
});

// Creating filter to capitalize the first letter of dietary options that would otherwise
// be all lowercase.
app.filter('capitalize', function(){
  return function(x){
    if(x) {
      var tempString = x[0].toUpperCase();
      for (var i = 1; i < x.length; i += 1) {
        tempString += x[i];
      }
    }
    else { tempString = 'No preference';}
    return tempString;
  };
});


app.controller('templateFormController', function($scope, $log, $location, tempStorageService){
  $scope.title = 'Register to ROCK!';
  $scope.reg = {};
  $scope.register = function(){
    tempStorageService.storageObjArray.push($scope.reg);
    localStorage.setItem('attendees', JSON.stringify(tempStorageService.storageObjArray));
    $log.info('sent');
    $scope.reg = {};
    $location.path('/tab.account');
  };
});

// The injected tempStorageService.storageObjArray is handed over to $scope.persons
// and iterated in the view with ng-route, with custom filters.
app.controller('templateAttendeesController', function($scope, $log, tempStorageService){
  $scope.title = 'These people have registered to ROCK!';
  $scope.persons = JSON.parse(localStorage.getItem('attendees'));
  $log.info(localStorage.getItem('attendees'));
});










