/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.$inject = ['$scope', '$q'];
app.controller('MainCtrl', function ($scope, $q) {

    $scope.selectedWorkingWeek = {
        "deleted": false,
        "id": 3,
        "name": "3-Week(1/15/2018-1/21/2018)",
        "startDate": "2018-01-15",
        "endDate": "2018-01-21"
    };

    $scope.required = true;
    $scope.disabled = false;

    // var vm = this;
    $scope.filters = [
        {
            title: 'Current Month',
            pattern: '(2/',
            active: true
        },
        {
            title: 'Current Year',
            pattern: '2018',
            active: false
        }
    ];

    $scope.list = [
        {
            "id": 1,
            "name": "1-Week(1/01/2017-1/07/2017)",
            "startDate": "1/01/2017",
            "endDate": "1/07/2017"
        },
        {
            "id": 2,
            "name": "2-Week(1/08/2017-1/14/2017)",
            "startDate": "1/08/2017",
            "endDate": "1/14/2017"
        },
        {
            "deleted": false,
            "id": 3,
            "name": "3-Week(1/15/2018-1/21/2018)",
            "startDate": "2018-01-15",
            "endDate": "2018-01-21"
        },
        {
            "deleted": false,
            "id": 4,
            "name": "4-Week(2/22/2018-1/28/2018)",
            "startDate": "2018-01-22",
            "endDate": "2018-01-28"
        },
        {
            "deleted": false,
            "id": 5,
            "name": "5-Week(2/29/2018-2/04/2018)",
            "startDate": "2018-01-29",
            "endDate": "2018-02-04"
        }];

    $scope.onSelect = function () {

        alert($scope.selectdWorkingWeek.name);
    }

    $scope.toggleRequired = function () {

        $scope.required = !$scope.required;
    }

    $scope.toggleDisabled = function () {

        $scope.disabled = !$scope.disabled;
    }

});
