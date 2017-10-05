/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsRow', RowDirective);

RowDirective.$inject = ['OdsFormService', 'OdsComponentType', 'NgTableParams', 'dialogs'];

function RowDirective(OdsFormService, OdsComponentType, NgTableParams, dialogs) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/row/row.html',
        scope: {
            section: '=',
            row: '=',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.toggleRowProperties = toggleRowProperties;
        $scope.removeRow = removeRow;
        $scope.addColumn = addColumn;
        $scope.removeColumn = removeColumn;
        $scope.cancelColumnEdited = cancelColumnEdited;
        $scope.saveColumnEdited = saveColumnEdited;

        $scope.onAdd = function(item, type) {

            if(type === OdsComponentType.FIELD){
                item.name = OdsFormService.generateName(OdsComponentType.FIELD);
                return item;
            }
        };

        $scope.tableParams = new NgTableParams({}, {

            filterDelay: 0,
            dataset: $scope.row.cols
        });

        /**
         * Cancel row column edited in row properties
         * @param row
         * @param rowForm
         */
        function cancelColumnEdited(row, rowForm) {

            var originalRow = resetRow(row, rowForm);
            angular.extend(row, originalRow);
        }

        /**
         * Reset row column edited in row properties
         * @param row
         * @param rowForm
         * @returns {*}
         */
        function resetRow(row, rowForm) {

            row.isEditing = false;
            rowForm.$setPristine();

            return row;
        }

        /**
         * Save row column edited in row properties
         * @param row
         * @param rowForm
         */
        function saveColumnEdited(row, rowForm) {

            var originalRow = resetRow(row, rowForm);
            angular.extend(originalRow, row);
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
                {size: 'sm'}).result.then(function (btn) {

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
                gridSize = eval(gridSize + size);
            }
            if (gridSize < 12) {
                row.cols.push(OdsFormService.newColumnObject(12 - gridSize));
                $scope.tableParams.reload();
            } else {
                dialogs.notify('Notification', 'Columns can\'t be greater than 12 columns, please fix it!!!',
                    {size: 'sm'}).result.then(function (btn) {
                });
            }
        }

        /**
         * Add column to current row.
         * @param row Row to add column.
         */
        function removeColumn(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
                {size: 'sm'}).result.then(function (btn) {

                $scope.row.cols.splice(index, 1);
                $scope.tableParams.reload();
            });
        }
    }
}
