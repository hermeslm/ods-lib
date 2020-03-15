/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
  'use strict';

  angular
    .module('ods-lib')
    .controller('OdsOptionsModalController', OdsOptionsModalController);

  OdsOptionsModalController.$inject = ['$scope', 'OdsFormService', 'field', '$uibModalInstance'];

  function OdsOptionsModalController($scope, OdsFormService, field, $uibModalInstance) {

    const DOT_SEPARATOR = '. ';
    const COMMA_SEPARATOR = ', ';
    $scope.field = field;

    function concatOptionsGroup(group, separator) {
      var value = '';
      if (group && group.optionValue) {
        var optionsValue = concatOptions(group.optionValue);
        if (optionsValue !== '') {
          value += group.groupValue;
          value += optionsValue;
        }
      }
      var result = separator + value;
      return result !== separator ? result : '';
    }

    function concatOptions(optionValue) {
      var result = '';
      Object.entries(optionValue)
        .forEach(function (entry) {
          if(entry[1]){
            result += COMMA_SEPARATOR + entry[0]
          }
        });
      return result;
    }

    $scope.save = function (field) {
      if (field && field.groups) {
        field.value = '';
        field.groups.forEach(function (group, index) {
            if (index === 0) {
              field.value += concatOptionsGroup(group, '');
            } else {
              field.value += concatOptionsGroup(group, DOT_SEPARATOR);
            }
          }
        );
        field.value += field.value === '' ? field.modal.value : DOT_SEPARATOR + field.modal.value;
      }
      $uibModalInstance.close();
    };

    $scope.clear = function (field) {
      field.value = '';
      field.modal.value = '';
      field.groups.forEach(function (group) {
        group.optionValue = '';
        }
      );
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
