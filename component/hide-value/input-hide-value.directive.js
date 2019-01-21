'use strict';

angular
    .module('ods-lib')
    .directive('odsInputHideValue', odsInputHideValue);

odsInputHideValue.$inject = ['OdsUtils'];

function odsInputHideValue(OdsUtils) {

    return {
        restrict: 'E',
        templateUrl: 'hide-value/input-hide-value.html',
        scope: {
            label: '@',
            name: '@',
            ngModel: '=',
            ngDisabled: '=',
            ngRequired: '=',
            mask: '@'
        },
        link: linkFunc
    };

    function linkFunc($scope) {

        $scope.toggleFn = toggleFn;
        $scope.onBlur = onBlur;
        $scope.onFocus = onFocus;

        init();

        function init() {

            $scope.name = $scope.name ? $scope.name : OdsUtils.generateName('odsInputHideValue');
            $scope.toggle = $scope.toggle ? $scope.toggle : false;
            $scope.ngRequired = $scope.ngRequired ? $scope.ngRequired : false;
            updateComponent();
        }

        function toggleIcon() {
            $scope.icon = $scope.toggle ? 'fa fa-eye' : 'fa fa-eye-slash';
        }

        function toggleType() {
            $scope.type = $scope.toggle ? 'text' : 'password';
        }

        function toggleCursor() {
            $scope.cursor = $scope.ngDisabled ? 'not-allowed' : 'pointer';
        }

        function updateComponent() {
            toggleIcon();
            toggleType();
            toggleCursor();
        }

        function toggleFn() {
            $scope.toggle = !$scope.ngDisabled ? !$scope.toggle : $scope.toggle;
            updateComponent();
        }

        function onBlur() {
            $scope.toggle = false;
            updateComponent();
        }

        function onFocus() {
            $scope.toggle = true;
            updateComponent();
        }

        $scope.$watch('ngDisabled', function () {
            toggleCursor();
        });
    }
}