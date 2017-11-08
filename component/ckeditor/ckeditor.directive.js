'use strict';

angular
    .module('ods-lib')
    .directive('odsCkeditor', CKEditor);

CKEditor.$inject = ['OdsCkeditor'];

function CKEditor(OdsCkeditor) {

    var directive = {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            name: '@',
            ck: '=',
            options: '='
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

        $scope.ck = CKEDITOR.replace(elm[0]);

        $scope.ck.on('instanceReady', function () {
            $scope.ck.setData(ngModel.$viewValue);
            $scope.ck.execCommand('reloadOptions', OdsCkeditor.initOptions($scope.options));
        });

        function updateModel() {
            $scope.safeApply(function () {
                ngModel.$setViewValue($scope.ck.getData());
            });
        }

        $scope.ck.on('change', updateModel);
        $scope.ck.on('key', updateModel);
        $scope.ck.on('dataReady', updateModel);

        ngModel.$render = function (value) {
            $scope.ck.setData(ngModel.$viewValue);
        };

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    }

}