/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormBuilder', OdsFormBuilder);

OdsFormBuilder.$inject = [];

function OdsFormBuilder() {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form-builder.html',
        scope: {
            schema: '=',
            debugMode: '='
        },
        controller: 'OdsFormBuilderController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc() {

    }
}
