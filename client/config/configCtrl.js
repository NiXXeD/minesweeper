angular.module('minesweeper')
    .controller('configCtrl', function($scope) {
        var defaultVals = {
                rows: 15,
                cols: 15,
                mines: 35
            };

        var config = {
            rows: defaultVals.rows,
            cols: defaultVals.cols,
            mines: defaultVals.mines
        };

        config.isStandard = function() {
            return (config.rows == defaultVals.rows &&
                config.cols == defaultVals.cols &&
                config.mines == defaultVals.mines);
        };

        config.reset = function() {
            config.rows = defaultVals.rows;
            config.cols = defaultVals.cols;
            config.mines = defaultVals.mines;
        };

        $scope.config = config;

        $scope.onChange = function() {
            var max = $scope.getMaxMines();
            if ($scope.config.mines > max) {
                $scope.config.mines = max;
            }
            $scope.config.difficulty = Math.floor($scope.config.mines / max * 10);
        };

        $scope.getMaxMines = function() {
            return $scope.config.rows * $scope.config.cols * 0.5;
        }
    });