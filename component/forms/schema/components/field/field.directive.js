/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsField', FieldDirective);

FieldDirective.$inject = ['OdsFormService', 'OdsComponentType'];

function FieldDirective(OdsFormService, OdsComponentType) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/field/field.html',
        scope: {
            row: '=',
            col: '=',
            field: '=',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.toggleFieldProperties = toggleFieldProperties;
        $scope.getSchemaField = getSchemaField;
        $scope.getSchemaFieldProperties = getSchemaFieldProperties;

        /**
         * Toggle Row properties options.
         * @param row Current row to show properties options.
         */
        function toggleFieldProperties(field) {

            field.showProperties = !field.showProperties;
        }

        function getSchemaField(field) {

            return OdsFormService.getSchemaField(field);
        }

        function getSchemaFieldProperties(field) {

            return OdsFormService.getSchemaFieldProperties(field);
        }

    }
}
