/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsForm', FormDirective);

FormDirective.$inject = ['OdsFormService'];

function FormDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form/form.html',
        scope: {
            schema: '=',
            onSave: '='
        },
        controller: 'OdsFormController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.clear = clear;
        $scope.save = save;

        function clear() {
            //TODO confirm if you want to clear al fields.
            alert("Entro al clear");
        }

        function save() {
            if($scope.onSave !== undefined){
                var data = OdsFormService.saveFormData($scope.schema);
                $scope.onSave($scope.schema, data);
            }else {
                alert("You must to define a onSave function.");
            }
        }
    }
}
