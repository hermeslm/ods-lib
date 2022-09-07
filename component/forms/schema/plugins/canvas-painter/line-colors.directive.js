/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsCanvasPainterColors', CanvasPainterColors);

CanvasPainterColors.$inject = [];

function CanvasPainterColors() {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/schema/plugins/canvas-painter/line-colors.html',
    scope: {
      colors: '='
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {
    console.log($scope)

    $scope.addColor = addColor;
    $scope.removeColor = removeColor;

    function addColor() {
      $scope.colors.push('#F9FF33');
    }

    function removeColor(index) {
      $scope.colors.splice(index, 1);
    }

    $scope.$watch('colors', function (model) {
      if (model) {
        var colors = [];
        for (var i = 0; i < model.length; i++) {
          colors.push(model[i]);
        }
        $scope.colors = colors;
      }
    }, true);
  }
}
