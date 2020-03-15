/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsAccordionProperties', OdsAccordionProperties);

OdsAccordionProperties.$inject = ['OdsFormService', 'dialogs'];

function OdsAccordionProperties(OdsFormService, dialogs) {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/schema/plugins/options-textarea/accordion-properties.html',
    scope: {
      field: '='
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {

    $scope.addGroup = addGroup;
    $scope.removeGroup = removeGroup;

    function addGroup(field) {
      field.groups.push(OdsFormService.createOptionsGroup());
    }

    function removeGroup(index) {
      dialogs.confirm('Confirm!!!', 'Do you want to remove this group?',
        {
          size: 'sm',
          windowClass: 'ods-dialog'
        })
        .result
        .then(function () {
          $scope.field.groups.splice(index, 1);
        });
    }
  }
}
