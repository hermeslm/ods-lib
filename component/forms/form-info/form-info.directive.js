/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormInfo', OdsFormInfoDirective);

OdsFormInfoDirective.$inject = [];

function OdsFormInfoDirective() {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form-info/form-info.html',
        scope: {
            schema: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.view = '-schema';

        $scope.getUniqueName = getUniqueName;

        /**
         * Return an unique name to avoid fields name collisions.
         * @returns {boolean}
         */
        function getUniqueName(field) {
            return field.name ? field.name + $scope.view : $scope.view;
        }
    }
}
