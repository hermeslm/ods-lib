/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsTableProps', TablePropsDirective);

TablePropsDirective.$inject = ['OdsFormService'];

function TablePropsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/table/table-props.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.addRow = addRow;
        $scope.addColumn = addColumn;

        /**
         * Add row to the table
         */
        function addRow() {
            var columnLength = $scope.field.matrix[0].length;
            var row = [];
            for (var i = 0; i < columnLength; i++) {
                row.push(OdsFormService.newItemObject());
            }
            $scope.field.matrix.push(row);
        }

        /**
         * Add column to the table.
         * @param row Row to add column.
         */
        function addColumn() {
            for (var i = 0; i < $scope.field.matrix.length; i++) {
                $scope.field.matrix[i].push(OdsFormService.newItemObject());
            }
        }

    }
}
