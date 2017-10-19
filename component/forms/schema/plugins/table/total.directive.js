/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsTableTotal', TableTotalDirective);

TableTotalDirective.$inject = ['OdsFormService'];

function TableTotalDirective(OdsFormService) {

    return {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/table/total.html',
        scope: {
            field: '=',
            label: '=',
            colIndex: '='
        },
        link: linkFunc
    };

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.total = 0;
        $scope.label = $scope.label && $scope.label !== '' ? $scope.label : 'Total';

        $scope.$watch('field', function (model) {
            $scope.total = total(model);
        }, true);

        function total(model) {
            var index = $scope.colIndex;
            var total = 0;
            for (var i = 0; i < model.matrix.length; i ++){

                if(model.matrix[i][index].fields.length > 0) {
                    // if (typeof model.matrix[i][index].fields[0].value == 'number') {
                        total += OdsFormService.getFieldValueAsNumber(model.matrix[i][index].fields[0]);
                    // }
                }
            }
            return total;
        }
    }
}
