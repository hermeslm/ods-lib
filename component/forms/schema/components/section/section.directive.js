/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSection', SectionDirective);

SectionDirective.$inject = ['OdsFormService'];

function SectionDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/section/section.html',
        scope: {
            schema: '=',
            section: '=',
            debugMode: '='
        },
        // controller: 'OdsSchemaController',
        // controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.toggleSectionProperties = toggleSectionProperties;
        $scope.removeSection = removeSection;
        $scope.addRow = addRow;

        function toggleSectionProperties(section) {

            section.displayProperties = !section.displayProperties;
            $scope.expanded = section.displayProperties;
        }

        function removeSection(schema, section) {

            $scope.schema = OdsFormService.removeSection(schema, section);
        }

        function addRow() {
            $scope.section.rows.push(OdsFormService.newRowObject());
        }

        $scope.$watch('section', function (model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);


    }
}
