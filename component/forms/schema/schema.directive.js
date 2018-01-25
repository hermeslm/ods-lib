/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSchema', SchemaDirective);

SchemaDirective.$inject = ['OdsFormService'];

function SchemaDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/schema.html',
        scope: {
            schema: '=',
            config: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.onAdd = onAdd;

        if (!$scope.schema) {
            $scope.schema = OdsFormService.newSchema();
            // $scope.schema = OdsFormService.initSchema($scope.schema);
        }

        /**
         * Catch onAdd event in drag and drop for setting field properties
         * @param item Field
         * @param type Field type.
         */
        function onAdd(item, type) {

            $scope.schema.layout.push(OdsFormService.newSectionObject());
        }

    }
}
