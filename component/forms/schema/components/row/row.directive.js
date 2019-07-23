/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsRow', RowDirective);

RowDirective.$inject = ['OdsFormService', 'dialogs'];

function RowDirective(OdsFormService, dialogs) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/row/row.html',
        scope: {
            section: '=',
            row: '=',
            config: '=',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        //We get the component name, it i used in form and fields ids and names.
        $scope.name = $scope.row.name;
        $scope.toggleRowProperties = toggleRowProperties;
        $scope.removeRow = removeRow;
        $scope.addColumn = addColumn;
        $scope.removeColumn = removeColumn;
        $scope.onAdd = onAdd;
        $scope.dropCallback = dropCallback;
        $scope.onChangeColWith = onChangeColWith;

        function dropCallback(index, item, external, type) {

            var newObject = OdsFormService.onAdd(item, type);
            return newObject;
        }

        /**
         * Catch onAdd event in drag and drop for setting field properties
         * @param item Field
         * @param type Field type.
         */
        function onAdd() {

            var tmp = $scope.section.rows[$scope.section.rows.length - 1];
            if (tmp.cols.length > 0) {
                if (tmp.cols[0].fields.length > 0) {
                    $scope.section.rows.push(OdsFormService.newRowObject());
                }
            }
        }

        /**
         * Toggle Row properties options.
         * @param row Current row to show properties options.
         */
        function toggleRowProperties(row) {

            row.showProperties = !row.showProperties;
        }

        /**
         * Remove row from section.
         * @param index Row index to remove.
         */
        function removeRow(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this row?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                $scope.section.rows.splice(index, 1);
            });
        }

        /**
         * Add column to current row.
         * @param row Row to add column.
         */
        function addColumn(row) {

            var gridSize = 0;
            for (var i = 0; i < row.cols.length; i++) {

                var size = row.cols[i].cssClass.substr(row.cols[i].cssClass.length - 2);
                size = parseInt(size.replace(/-/g, ''));
                gridSize = gridSize + size;
            }
            if (gridSize < 12) {
                row.cols.push(OdsFormService.newColumnObject(12 - gridSize));
            } else {
                dialogs.notify('Notification', 'Columns can\'t be greater than 12 columns, please fix it!!!',
                    {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                });
            }
        }

        /**
         * Add column to current row.
         * @param row Row to add column.
         */
        function removeColumn(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                $scope.row.cols.splice(index, 1);
            });
        }

        /**
         * Change col width.
         * @param col Column to change width.
         */
        function onChangeColWith(col) {

            col.cssClass = ' col-xs-' + col.width + ' col-sm-' + col.width +
                ' col-md-' + col.width + ' col-lg-' + col.width;
        }
    }
}
