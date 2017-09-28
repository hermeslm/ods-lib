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
        templateUrl: 'forms/model/model.html',
        scope: {
            schema: '='
        },
        // controller: 'OdsFormController',
        // controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.$watch('schema', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

    }
}
