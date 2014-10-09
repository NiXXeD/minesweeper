angular.module('minesweeper')
    .controller('tileCtrl', function($scope) {
        $scope.getBackColor = function() {
            var color;
            if ($scope.cell.marked) {
                color = '#000080';
            } else if ($scope.cell.covered) {
                color = '#008000';
            } else if ($scope.cell.mine) {
                color = '#800000';
            } else {
                color = '#614126';
            }
            return color;
        }
    });