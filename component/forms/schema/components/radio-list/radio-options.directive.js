/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFieldRadioOptions', FieldRadioOptionsDirective);

FieldRadioOptionsDirective.$inject = ['OdsFormService'];

function FieldRadioOptionsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/radio-list/radio-options-properties.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.options = initOptions();
        $scope.addOption = addOption;
        $scope.removeOption = removeOption;

        function initOptions() {

            var options = [];
            for (var i = 0; i < $scope.field.options.length; i++) {
                var option = {
                    id: OdsFormService.getSelectFieldIdValue($scope.field, $scope.field.options[i]),
                    name: OdsFormService.getSelectFieldTitleValue($scope.field, $scope.field.options[i])
                };
                options.push(option);
            }
            return options;
        }

        function addOption() {

            var option = {
                id: '',
                name: ''
            };

            $scope.options.push(option);
        }

        function removeOption(index) {

            $scope.options.splice(index, 1);
        }

        $scope.$watch('options', function (model) {

            var options = [];
            for (var i = 0; i < model.length; i++) {
                var option = {};
                option[OdsFormService.getSelectFieldId($scope.field)] = model[i].id;
                option[OdsFormService.getSelectFieldTitle($scope.field)] = model[i].name;
                options.push(option);
            }
            $scope.field.options = options;
        }, true);
    }
}
