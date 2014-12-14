'use strict';

/**
 * @ngdoc overview
 * @name fifastatsApp
 * @description
 * # fifastatsApp
 *
 * Main module of the application.
 */
angular
  .module('fifastatsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'parse-angular'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/about', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/academy', {
        templateUrl: 'views/academy.html',
        controller: 'AcademyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
