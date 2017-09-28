/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsRow', RowDirective);

RowDirective.$inject = ['OdsFormService', 'NgTableParams'];

function RowDirective(OdsFormService, NgTableParams) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/row/row.html',
        scope: {
            schema: '=',
            row: '=',
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


        $scope.originalData = angular.copy($scope.row.cols);

        $scope.tableParams = new NgTableParams({}, {
            filterDelay: 0,
            dataset: $scope.row.cols
        });

        function cancelColumnEdited(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(row, originalRow);
        }

        function resetRow(row, rowForm){
            row.isEditing = false;
            rowForm.$setPristine();
            // $scope.tableTracker.untrack(row);
            return _.findWhere($scope.originalData, function(r){
                return r.id === row.id;
            });
        }

        function saveColumnEdited(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(originalRow, row);
        }

        function toggleRowProperties(row) {

            row.displayProperties = !row.displayProperties;
            $scope.expanded = row.displayProperties;
        }

        function removeRow(schema, section) {

            $scope.schema = OdsFormService.removeRow(schema, section);
        }

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
                alert('Columns can\'t be greater than 12 columns, please fix it!!!');
            }
        }

        function removeColumn(cols, index) {

            $scope.row.cols.splice(index, 1);
            $scope.tableParams.reload();
        }

        $scope.$watch('row', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);
    }
}
