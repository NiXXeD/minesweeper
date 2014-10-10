angular.module('minesweeper')
    .controller('configCtrl', function($scope) {
        var defaultVals = {
                rows: 15,
                cols: 15,
                mines: 35
            };

        $scope.config = {
            rows: defaultVals.rows,
            cols: defaultVals.cols,
            mines: defaultVals.mines
        };

        $scope.config.isStandard = function() {
            return (this.rows == defaultVals.rows &&
                this.cols == defaultVals.cols &&
                this.mines == defaultVals.mines);
        };

        $scope.config.reset = function() {
            this.rows = defaultVals.rows;
            this.cols = defaultVals.cols;
            this.mines = defaultVals.mines;
        };

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