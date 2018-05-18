(function () {
    'use strict';

    angular
        .module('ods-lib')
        .directive('uiSelectRequired', UiSelectRequired);

    UiSelectRequired.$inject = ['$parse'];

    function UiSelectRequired($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                //console.log($scope.required);
                scope.required = $parse(attrs.uiSelectRequired)(scope);//JSON.parse(attrs.ngRequired);

                ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {

                    if (scope.required) {
                        var determineVal;
                        if (angular.isArray(modelValue)) {
                            determineVal = modelValue;
                        } else if (angular.isArray(viewValue)) {
                            determineVal = viewValue;
                        } else return !isEmpty(modelValue);
                        return determineVal.length > 0;
                    } else {
                        return true;
                    }
                };
            }
        };
    }

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
})();
