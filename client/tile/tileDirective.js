angular.module('minesweeper')
    .directive('tile', function() {
        return {
            restrict: 'E',
            templateUrl: 'tile/tile.html',
            controller: 'tileCtrl',
            scope: {
                cell: '='
            }
        }
    });