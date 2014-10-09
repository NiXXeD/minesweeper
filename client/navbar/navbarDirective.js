angular.module('minesweeper')
    .directive('navbar', function() {
        return {
            restrict: 'E',
            templateUrl: 'navbar/navbar.html',
            controller: 'navbarCtrl'
        };
    });