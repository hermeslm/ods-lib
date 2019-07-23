/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSection', SectionDirective);

SectionDirective.$inject = ['OdsFormService', 'dialogs'];

function SectionDirective(OdsFormService, dialogs) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/section/section.html',
        scope: {
            schema: '=',
            section: '=',
            config: '=',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        //We get the component name, it i used in form and fields ids and names.
        $scope.name = $scope.section.name;
        $scope.toggleProperties = toggleProperties;
        $scope.remove = remove;
        $scope.swap = swap;
        $scope.addRow = addRow;
        $scope.clone = clone;

        /**
         * Toggle Section properties options.
         * @param section Current section to show properties options.
         */
        function toggleProperties(section) {

            section.showProperties = !section.showProperties;
        }

        /**
         * Remove section from schema.
         * @param index Section index to remove.
         */
        function remove(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                $scope.schema.layout.splice(index, 1);
            });
        }

        /**
         * Swap Section order.
         * @param index New Section index.
         */
        function swap(idx1, idx2) {

            dialogs.confirm('Confirm!!!', 'Do you want swap this section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                var _previousValue = [];
                angular.copy($scope.schema.layout, _previousValue);

                if (idx1 <= -1 || idx2 <= -1 ||
                    idx1 >= $scope.schema.layout.length ||
                    idx2 >= $scope.schema.layout.length) {

                    return;
                }
                $scope.schema.layout[idx1] = $scope.schema.layout.splice(idx2, 1, $scope.schema.layout[idx1])[0];

            });
        }

        /**
         * Add a new row to the current Section.
         */
        function addRow() {

            $scope.section.rows.push(OdsFormService.newRowObject());
        }

        /**
         * To clone the section down.
         */
        function clone() {

            dialogs.confirm('Confirm!!!', 'Do you want to clone this Section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                $scope.schema = OdsFormService.cloneSection($scope.schema, $scope.section,
                    $scope.section.clonedCanCloned);
            });
        }

    }
}
