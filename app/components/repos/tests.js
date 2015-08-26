

describe('RHTest.controllers module', function() {
    
    'use strict';

    beforeEach(module('RHTest.controllers'));
    beforeEach(module('RHTest.services'));

    /* Test reposCtrl */
    describe('reposCtrl', function () {
        var scope, controller, $httpBackend, $location;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, _$location_) {
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            $httpBackend.expectGET('https://api.github.com/search/repositories?q=pizza')
                .respond({
                    "total_count": 3433,
                    "incomplete_results": false,
                    "items": [
                            {
                                "id": 13313291,
                                "name": "pizza",
                                "full_name": "zurb/pizza",
                                "owner": { "login": "zurb"},
                                "stargazers_count": 360,
                                "watchers_count": 360,
                                "forks_count": 52
                            },
                            {
                                "id": 37230167,
                                "name": "pizza",
                                "full_name": "stevekinney/pizza",
                                "owner": { "login": "stevekinney"},
                                "stargazers_count": 83,
                                "watchers_count": 83,
                                "forks_count": 77
                            },
                            {
                                "id": 12673482,
                                "name": "pizza",
                                "full_name": "makersquare/pizza",
                                "owner": { "login": "makersquare"},
                                "stargazers_count": 2,
                                "watchers_count": 2,
                                "forks_count": 120
                            }]
                });

            scope = $rootScope.$new();

            controller = $controller('reposCtrl', {$scope: scope});

        }));


        it('should retrieve a list of repos', function () {
            scope.search = {term:'pizza'};

            expect(scope.search.result).toBeUndefined();

            scope.searchRepo();

            $httpBackend.flush();

            expect(scope.search.result.items.length).toBe(3);

        });

        it('should not call the service if the query length than 3', function () {
            scope.search = {term:'pi'};

            expect(scope.search.result).toBeUndefined();

            scope.searchRepo();

            expect(scope.search.result).toBeUndefined();

        });


        it('should move to the location path', function() {

            scope.goToRepo(150);

            expect($location.path()).toBe('/repo/150');

        });

    });

    /* Test repoDetailCtrl */
    describe('repoDetailCtrl', function () {
        var scope, controller, $httpBackend;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;

            $httpBackend.expectGET('https://api.github.com/repositories/13313291')
                .respond({
                            "id": 13313291,
                            "name": "pizza",
                            "full_name": "zurb/pizza",
                            "owner": { "login": "zurb"},
                            "stargazers_count": 360,
                            "watchers_count": 360,
                            "forks_count": 52
                        });

            scope = $rootScope.$new();

            controller = $controller('repoDetailCtrl', {$scope: scope, $routeParams: {id: 13313291}});

        }));


        it('should retrieve repo infos', function () {

            expect(scope.repo).toBeUndefined();

            $httpBackend.flush();

            expect(scope.repo).toBeDefined();
            expect(scope.repo.id).toEqual(13313291);
            expect(scope.repo.full_name).toEqual("zurb/pizza");

        });

    });
});