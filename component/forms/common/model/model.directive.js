/**
 * Created by hermeslm on 3/28/17.
 */
angular
  .module('ods-lib')
  .directive('odsModel', ModelDirective);

ModelDirective.$inject = ['OdsFormService'];

function ModelDirective(OdsFormService) {
  const directive = {
    restrict: 'E',
    templateUrl: 'forms/common/model/model.html',
    scope: {
      model: '=',
      cssClass: '@'
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {
    $scope.copy = copy;

    function copy() {
      OdsFormService.copyJson(angular.toJson($scope.model, true));
    }
  }
}
