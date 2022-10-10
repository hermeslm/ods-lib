/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
  'use strict';

  angular
    .module('ods-lib')
    .controller('OdsCanvasPainterController', OdsCanvasPainterController);

  OdsCanvasPainterController.$inject = ['$scope'];

  function OdsCanvasPainterController($scope) {

    $scope.selectedLineWidth = 10;
    $scope.version = 0;

    $scope.undo = function(){
      $scope.version--;
    };

    $scope.clear = function(){
      $scope.version = 0;
    };

    $scope.toggleEdit = function(){
      //$scope.field.readonly = !$scope.field.readonly;
    };
  }
})();