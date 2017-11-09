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
            ck: '=',
            options: '=',
            disabled: '=?ngDisabled'
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope, elm, attr, ngModel) {

        if (!ngModel) {
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

        $scope.disabled = $scope.disabled ? $scope.disabled : false;

        $scope.ck = CKEDITOR.replace(elm[0]);

        $scope.ck.on('instanceReady', function () {
            $scope.ck.setData(ngModel.$viewValue);
            $scope.ck.execCommand('reloadOptions', OdsCkeditor.initOptions($scope.options));
            OdsCkeditor.setReadOnly($scope.ck, $scope.disabled);
        });

        function updateModel() {
            $timeout(function () {
                ngModel.$setViewValue($scope.ck.getData());
            }, 0, false);
        }

        $scope.ck.on('change', updateModel);
        $scope.ck.on('key', updateModel);
        $scope.ck.on('dataReady', updateModel);

        ngModel.$render = function () {
            $scope.ck.setData(ngModel.$viewValue);
        };

        $scope.$watch('disabled', function (disabled) {

            $timeout(function () {
                disabled = disabled ? disabled : false;
                OdsCkeditor.setReadOnly($scope.ck, disabled);
            }, 100, false);
            return;
        });

        $scope.$watch('options', function (options) {

            $timeout(function () {
                $scope.ck.execCommand('reloadOptions', OdsCkeditor.initOptions(options));
            }, 100, false);
            return;
        });

    }

}