'use strict';

angular
    .module('ods-lib')
    .directive('odsCkeditor', CKEditor);

CKEditor.$inject = ['$uibModal'];

function CKEditor($uibModal) {

    var directive = {
        restrict: 'A',
        require: '?ngModel',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, elm, attr, ngModel) {

        var ck = CKEDITOR.replace(elm[0]);
        if (!ngModel) return;
        ck.on('instanceReady', function () {
            ck.setData(ngModel.$viewValue);
        });
        function updateModel() {
            scope.$apply(function () {
                ngModel.$setViewValue(ck.getData());
            });
        }
        ck.on('change', updateModel);
        ck.on('key', updateModel);
        ck.on('dataReady', updateModel);

        ngModel.$render = function (value) {
            ck.setData(ngModel.$viewValue);
        };
    }

}