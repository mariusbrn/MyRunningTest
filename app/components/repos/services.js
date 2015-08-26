
angular.module('RHTest.services', [])
    .factory('reposServices', ['$http', function($http) {

    'use strict';

    var urlBase = 'https://api.github.com/';
    var reposFactory = {};

    reposFactory.search = function (q) {
        var params = {q: q};        
        return $http.get(urlBase + 'search/repositories', {params: params});
    };

    reposFactory.get = function (id) {
        return $http.get(urlBase + 'repositories/' + id);
    };

    return reposFactory;
}]);
