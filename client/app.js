angular.module('minesweeper', ['ngRoute', 'timer'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/news', {
                templateUrl: 'news/news.html',
                controller: 'newsCtrl'
            })
            .when('/game', {
                templateUrl: 'game/game.html',
                controller: 'gameCtrl'
            })
            .when('/config', {
                templateUrl: 'config/config.html',
                controller: 'configCtrl'
            })
            .when('/scores', {
                templateUrl: 'scores/scores.html',
                controller: 'scoresCtrl'
            })
            .otherwise({
                redirectTo: '/game'
            });
    });