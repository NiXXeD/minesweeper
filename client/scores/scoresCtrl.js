angular.module('minesweeper')
    .controller('scoresCtrl', function($scope, $http) {
        $scope.error = null;
        $scope.scores = [];

        $http.get('/api/scores')
            .success(function(data) {
                $scope.scores = data;
            })
            .error(function(err) {
                $scope.error = err;
            });
    });