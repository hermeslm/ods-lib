/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsModel', ModelDirective);

ModelDirective.$inject = ['OdsFormService'];

function ModelDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/common/model/model.html',
        scope: {
            model: '=',
            cssClass: '@'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.copy = copy;

        $scope.$watch('model', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        function copy() {
            OdsFormService.copyJson(angular.toJson($scope.model, true));
        }
    }
}
