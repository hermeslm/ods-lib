/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFieldSelectOptions', FieldSelectOptionsDirective);

FieldSelectOptionsDirective.$inject = ['OdsFormService'];

function FieldSelectOptionsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/select/select-options-properties.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.addOption = addOption;
        $scope.removeOption = removeOption;

        function addOption() {
            var option = {
                id: '',
                name: '',
                color: '#FFF'
            };
            $scope.field.options.push(option);
        }

        function removeOption(index) {
            $scope.field.options.splice(index, 1);
        }
    }
}
