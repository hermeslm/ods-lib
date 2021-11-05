/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsGridRenderProps', GridRenderProps);

GridRenderProps.$inject = ['OdsFormService'];

function GridRenderProps(OdsFormService) {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/schema/plugins/grid-render/grid-render-props.html',
    scope: {
      field: '='
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {
  }
}
