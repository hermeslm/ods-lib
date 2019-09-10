/**
 * Created by hermeslm on 3/28/17.
 */


angular
  .module('ods-lib')
  .directive('odsFormBuilder', OdsFormBuilder);

OdsFormBuilder.$inject = [];

function OdsFormBuilder() {
  const directive = {
    restrict: 'E',
    templateUrl: 'forms/form-builder.html',
    scope: {
      schema: '=',
      debugMode: '=',
    },
    controller: 'OdsFormBuilderController',
    controllerAs: 'vm',
    link: linkFunc,
  };

  return directive;

  /* private helper methods */

  function linkFunc() {

  }
}
