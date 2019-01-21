'use strict';

angular
    .module('ods-lib')
    .directive('odsTextHideValue', odsTextHideValue);

odsTextHideValue.$inject = [];

function odsTextHideValue() {

    return {
        restrict: 'E',
        templateUrl: 'hide-value/text-hide-value.html',
        scope: {
            ngValue: '@',
            chart: '@'
        },
        link: linkFunc
    };

    function linkFunc($scope) {

        $scope.toggleFn = toggleFn;

        init();

        function init() {

            $scope.toggle = $scope.toggle ? $scope.toggle : false;
            $scope.chart = $scope.chart ? $scope.chart : 'x';
            updateComponent();
        }

        function toggleIcon() {
            $scope.icon = $scope.toggle ? 'fa fa-eye' : 'fa fa-eye-slash';
        }

        function toggleCursor() {
            $scope.cursor = $scope.ngDisabled ? 'not-allowed' : 'pointer';
        }

        function toggleValue() {
            $scope.value = '';
            for (var i = 0; i < $scope.ngValue.length; i++) {
                $scope.value += $scope.chart;
            }
            $scope.value = $scope.toggle ? $scope.ngValue : $scope.value;
        }

        function updateComponent() {
            toggleIcon();
            toggleCursor();
            toggleValue();
        }

        function toggleFn() {
            $scope.toggle = !$scope.toggle;
            updateComponent();
        }
    }
}