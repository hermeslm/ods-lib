/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('MainCtrl', function ($scope) {

    $scope.ssn = '234343123';
    $scope.disabled = false;
    $scope.required = false;

    $scope.toggleDisabled = toggleDisabled;
    $scope.toggleRequired = toggleRequired;

    function toggleDisabled() {
        $scope.disabled = !$scope.disabled;
    }

    function toggleRequired() {
        $scope.required = !$scope.required;
    }
});

