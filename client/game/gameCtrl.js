angular.module('minesweeper')
    .controller('gameCtrl', function($scope, $http) {
        $scope.rows = [];
        $scope.state = 'stopped';
        $scope.time = null;
        $scope.name = null;

        $scope.clear = function() {
            $scope.rows = [];
            $scope.state = 'stopped';
            $scope.$broadcast('timer-clear');

            //create grid
            for (var r = 0; r < $scope.config.rows; r++) {
                var row = [];
                for (var c = 0; c < $scope.config.cols; c++) {
                    row.push({
                        row: r,
                        col: c,
                        covered: true,
                        mine: false,
                        marked: false,
                        count: 0
                    });
                }
                $scope.rows.push(row);
            }
        };

        $scope.clear();

        $scope.click = function(clickedCell) {
            if (checkState(clickedCell)) {
                if (!clickedCell.marked && clickedCell.covered) {
                    uncoverCell(clickedCell);
                    checkWin();
                }
            }
        };

        $scope.rightClick = function(clickedCell) {
            if ($scope.state === 'playing') {
                if (clickedCell.covered) {
                    clickedCell.marked = !clickedCell.marked;
                } else {
                    //check if it's a 'safe' move first
                    var nearbyMarked = 0;
                    forNearbyCells(clickedCell, function(cell) {
                        if (cell.marked) {
                            nearbyMarked++;
                        }
                    });

                    if (nearbyMarked == clickedCell.count) {
                        //open the cells
                        forNearbyCells(clickedCell, function(cell) {
                            if (!cell.marked && cell.covered) {
                                uncoverCell(cell);
                            }
                        });
                    }
                }

                checkWin();
            }
        };

        function uncoverCell(clickedCell) {
            clickedCell.covered = false;
            var cells = [clickedCell];

            while (clickedCell.count == 0 && cells.length > 0) {
                var centerCell = cells.pop();

                if (centerCell.count == 0) {
                    forNearbyCells(centerCell, function(cell) {
                        if (!cell.marked) {
                            if (cell.covered && cell.count == 0) {
                                cells.push(cell);
                            }

                            cell.covered = false;
                        }
                    });
                }
            }
        }

        function checkState(cell) {
            if ($scope.state === 'stopped') {
                //generate mines
                for (var m = 0; m < $scope.config.mines; m++) {
                    var mr = Math.round(Math.random() * ($scope.config.rows - 1));
                    var mc = Math.round(Math.random() * ($scope.config.cols - 1));
                    if (cell.row != mr && cell.col != mc && !$scope.rows[mr][mc].mine) {
                        $scope.rows[mr][mc].mine = true;
                    } else {
                        m--;
                    }
                }

                //generate counts
                forAllCells(function(cell) {
                    forNearbyCells(cell, function(nbc) {
                        if (nbc.mine) cell.count++;
                    });
                });

                $scope.state = 'playing';
                $scope.$broadcast('timer-start');
                return true;
            } else if ($scope.state === 'playing') {
                return true;
            }

            return false;
        }

        function checkWin() {
            var todo = false;
            forAllCells(function(cell) {
                if (cell.mine) {
                    if (!cell.covered) {
                        loseGame();
                        return false;
                    } else if (!cell.marked) {
                        todo = true;
                    }
                } else if (cell.covered) {
                    todo = true;
                }
            });

            if (!todo) {
                $scope.state = 'win';
                $scope.$broadcast('timer-stop');
            }
        }

        function loseGame() {
            $scope.state = 'lose';
            $scope.$broadcast('timer-stop');

            //uncover all mines to see
            forAllCells(function(cell) {
                if (cell.mine) cell.covered = false;
            });
        }

        $scope.$on('timer-stopped', function(event, data) {
            $scope.time = data;
        });

        function forNearbyCells(cell, callback) {
            for (var r = cell.row - 1; r <= cell.row + 1; r++) {
                for (var c = cell.col - 1; c <= cell.col + 1; c++) {
                    if ($scope.rows[r] && $scope.rows[r][c] && !(c == cell.col && r == cell.row)) {
                        callback($scope.rows[r][c]);
                    }
                }
            }
        }

        function forAllCells(callback) {
            $scope.rows.forEach(function(row) {
                row.forEach(function(cell) {
                    callback(cell);
                });
            });
        }

        $scope.submitScore = function() {
            if ($scope.state === 'win') {
                var seconds = ($scope.time.days * 86400) + ($scope.time.hours * 3600) + ($scope.time.minutes * 60) + $scope.time.seconds;

                var entry = {
                    name: $scope.name,
                    time: seconds,
                    date: new Date()
                };

                $http.post('/api/scores', entry)
                    .success(function() {
                        $scope.clear();
                    })
                    .error(function() {
                        $scope.clear();
                    });
            } else {
                $scope.clear();
            }
        }
    });