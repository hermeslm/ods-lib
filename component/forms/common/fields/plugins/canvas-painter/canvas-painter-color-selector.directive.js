'use strict';

angular
  .module('ods-lib')
  .directive('odsCanvasPainterColorSelector', CanvasPainterColorSelector);

CanvasPainterColorSelector.$inject = ['OdsFormService'];

function CanvasPainterColorSelector(OdsFormService) {

  return {
    restrict: 'AE',
    scope: {
      colorList: '=odsCanvasPainterColorSelector',
      selectedColor: '='
    },
    templateUrl: 'forms/common/fields/plugins/canvas-painter/color-selector.html',
    link: function (scope) {
      scope.selectedColor = '#ff0';

      scope.setColor = function (col) {
        scope.selectedColor = col;
      };
    }
  };
}