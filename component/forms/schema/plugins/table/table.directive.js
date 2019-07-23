/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsTable', TableDirective);

TableDirective.$inject = ['OdsFormService', 'dialogs', 'OdsComponentType', 'OdsFieldType'];

function TableDirective(OdsFormService, dialogs, OdsComponentType, OdsFieldType) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/table/table.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.removeRow = removeRow;
        $scope.removeColumn = removeColumn;
        $scope.onAdd = onAdd;
        $scope.cloneRow = cloneRow;
        $scope.swapRow = swapRow;
        $scope.swapColumn = swapColumn;
        $scope.checkItem = checkItem;

        function checkItem(index, item, external, type) {

            //We prevent add recursively a table inside other.
            if (type === OdsComponentType.FIELD && item.type === OdsFieldType.TABLE) {
                dialogs.notify('Information!!!', 'Insert a table into a table cell is not allowed.', {size: 'sm', windowClass: 'ods-dialog'});
                return false;
            } else {
                return item;
            }

        }

        function onAdd(item, type) {

            OdsFormService.onAdd(item, type);
        }

        /**
         * Remove row from section.
         * @param table Table to remove row
         * @param index Row index to remove.
         */
        function removeRow(table, index) {

            OdsFormService.removeRow(table, index);
        }

        /**
         * Add column to current row.
         * @param table Table to remove column
         * @param row Row to add column.
         */
        function removeColumn(table, index) {

            OdsFormService.removeColumn(table, index);
        }

        function cloneRow(table) {

            OdsFormService.cloneRow(table);
        }

        /**
         * Swap Row order.
         * @param index New Row index.
         */
        function swapRow(idx1, idx2) {

            dialogs.confirm('Confirm!!!', 'Do you want swap this row?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                // var _previousValue = [];
                // angular.copy($scope.field.matrix, _previousValue);

                if (idx1 <= -1 || idx2 <= -1 ||
                    idx1 >= $scope.field.matrix.length ||
                    idx2 >= $scope.field.matrix.length) {

                    return;
                }
                $scope.field.matrix[idx1] = $scope.field.matrix.splice(idx2, 1, $scope.field.matrix[idx1])[0];

            });
        }

        /**
         * Swap Row order.
         * @param index New Row index.
         */
        function swapColumn(idx1, idx2) {

            dialogs.confirm('Confirm!!!', 'Do you want swap this column?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                if (idx1 <= -1 || idx2 <= -1 ||
                    idx1 >= $scope.field.matrix[idx1].length ||
                    idx2 >= $scope.field.matrix[idx2].length) {

                    return;
                }
                for (var i = 0; i < $scope.field.matrix.length; i++) {
                    var tmp = angular.copy($scope.field.matrix[i][idx2]);
                    $scope.field.matrix[i][idx2] = angular.copy($scope.field.matrix[i][idx1]);
                    $scope.field.matrix[i][idx1] = tmp;
                }
            });
        }
    }
}
