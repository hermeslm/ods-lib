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
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        if(!$scope.schema) {
            $scope.schema = OdsFormService.newSchema();
            // $scope.schema = OdsFormService.initSchema($scope.schema);
        }
    }
}
