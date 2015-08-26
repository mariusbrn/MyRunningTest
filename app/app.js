

angular.module('RHTest', [
  'ngMaterial',
  'ngAnimate',
  'ngRoute',
  'RHTest.services',
  'RHTest.controllers'
])

.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    'use strict';

    $routeProvider.
      when('/repos', {
        templateUrl: 'components/repos/repos-list.html',
        controller: 'reposCtrl'
      }).
      when('/repo/:id', {
        templateUrl: 'components/repos/repo-detail.html',
        controller: 'repoDetailCtrl'
      }).
      otherwise({
        redirectTo: '/repos'
      });

}]);
