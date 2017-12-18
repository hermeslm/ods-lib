'use strict';

angular
    .module('ods-lib')
    .directive('odsCkeditor', CKEditor);

CKEditor.$inject = ['$timeout', 'OdsCkeditor'];

function CKEditor($timeout, OdsCkeditor) {

    var directive = {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            name: '@',
            ngModel: '=',
            options: '=',
            disabled: '=?ngDisabled'
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope, elm, attr) {

        if (typeof($scope.ngModel) === 'undefined') {
            console.error('Please define ng-model.');
            return;
        }

        if (typeof(CKEDITOR) === 'undefined') {
            console.error('Please include CKEditor js in your html.');
            return;
        }

        if (!attr.id && !attr.name) {
            $scope.name = OdsCkeditor.generateName();
        } else {
            $scope.name = attr.name;
        }

        //We check if an instance exists.
        $scope.ck = OdsCkeditor.getInstance($scope.name);

        if (!$scope.ck) {
            elm[0].name = $scope.name;
            elm[0].id = $scope.name;
            $scope.ck = CKEDITOR.replace(elm[0]);
            OdsCkeditor.register($scope.name, $scope.ck);
        }

        $scope.disabled = $scope.disabled ? $scope.disabled : false;

        $scope.ck.on('instanceReady', function () {

            OdsCkeditor.setData($scope.name, $scope.ngModel);
            OdsCkeditor.setOptions($scope.name, OdsCkeditor.initOptions($scope.options));
        });

        $scope.ck.on('pasteState', function () {
            $timeout(function () {
                $scope.ngModel = OdsCkeditor.getData($scope.name);
            }, 0, false);
        });

        $scope.$watch('disabled', function (newValue, oldValue) {

            $timeout(function () {
                if (newValue !== oldValue) {
                    newValue = newValue ? newValue : false;
                    OdsCkeditor.setReadOnly($scope.name, newValue);
                }
            }, 0, false);
            return;
        });

        $scope.$watch('options', function (options) {

            $timeout(function () {
                OdsCkeditor.setOptions($scope.name, OdsCkeditor.initOptions(options));
            }, 0, false);
            return;
        });

        $scope.$watch('ngModel', function (model) {

            $timeout(function () {
                OdsCkeditor.setData($scope.name, model);
            }, 0, false);
            return;
        });

        $scope.$on('$destroy', function () {
            OdsCkeditor.unregister($scope.name);
        });
    }
}