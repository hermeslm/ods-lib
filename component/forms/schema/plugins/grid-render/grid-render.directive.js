/**
 * Created by hermeslm on 11/3/2021.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsGridRender', GridRenderDirective);

GridRenderDirective.$inject = ['OdsFormService', 'dialogs'];

function GridRenderDirective(OdsFormService, dialogs) {

  return {
    restrict: 'E',
    templateUrl: 'forms/schema/plugins/grid-render/grid-render.html',
    scope: {
      field: '=',
      config: '='
    },
    link: linkFunc
  };

  /* private helper methods*/

  function linkFunc($scope) {

    $scope.removeRow = removeRow;
    $scope.swapRow = swapRow;

    injectConfig($scope.config.gridRender);

    function injectConfig(gridRenderConfig) {
      if (gridRenderConfig && gridRenderConfig.length > 0) {
        $scope.field.descriptor = gridRenderConfig[0].descriptor
      }
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
     * Swap Row order.
     * @param idx1
     * @param idx2
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
  }
}
