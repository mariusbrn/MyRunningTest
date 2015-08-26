

angular.module('RHTest.controllers', [])

/**
 * Repos list Controller
 */
.controller('reposCtrl', ['$scope', '$location', 'reposServices', function($scope, $location, reposServices) {

   'use strict';

   $scope.search = {term: ""};

   $scope.searchRepo = function() {
        if($scope.search.term.length > 2) {
            reposServices.search($scope.search.term)
                .then(function(response) {
                    $scope.search.result = response.data;
                }); 
        }              
   };

   $scope.goToRepo = function(id) {
        $location.path( 'repo/' + id );
   };

}])

/**
 * Repo details Controller
 */
.controller('repoDetailCtrl', ['$scope', '$routeParams', 'reposServices', function($scope, $routeParams, reposServices) {

    'use strict';

    reposServices.get($routeParams.id)
        .then(function(response) {
            $scope.repo = response.data;
        });    

}]);

