angular.module('minesweeper')
    .controller('navbarCtrl', function($scope, $location) {

        $scope.isActiveTab = function (tab) {
            return $location.path().indexOf(tab) == 0;
        };

    });