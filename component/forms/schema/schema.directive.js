/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSchema', SchemaDirective);

SchemaDirective.$inject = ['OdsFormService', '$timeout'];

function SchemaDirective(OdsFormService, $timeout) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/schema.html',
        scope: {
            schema: '=',
            debugMode: '='
        },
        controller: 'OdsSchemaController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.schema = OdsFormService.initSchema($scope.schema);

        $scope.getSchemaComponent = getSchemaComponent;

        function getSchemaComponent(object) {
            return OdsFormService.getSchemaComponent(object);
        }

    }
}
