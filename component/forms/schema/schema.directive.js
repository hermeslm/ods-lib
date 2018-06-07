/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSchema', SchemaDirective);

SchemaDirective.$inject = ['OdsFormService', 'EventDataFactory', 'OdsEvent'];

function SchemaDirective(OdsFormService, EventDataFactory, OdsEvent) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/schema.html',
        scope: {
            schema: '=',
            config: '=',
            debugMode: '='
        },
        link: linkFunc,
        controller: ['$scope', 'EventDataFactory', 'OdsEvent', function ($scope, EventDataFactory, OdsEvent) {

            EventDataFactory.registerObserver(OdsEvent.IMPORT_SCHEMA, $scope);
            EventDataFactory.registerObserver(OdsEvent.EXPORT_SCHEMA, $scope);

        }]
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.onAdd = onAdd;
        $scope.onImportSchema = onImportSchema;
        $scope.onExportSchema = onExportSchema;

        if (!$scope.schema) {
            $scope.schema = OdsFormService.newSchema();
            // $scope.schema = OdsFormService.initSchema($scope.schema);
        }

        /**
         * Catch onAdd event in drag and drop for setting field properties
         */
        function onAdd() {

            $scope.schema.layout.push(OdsFormService.newSectionObject());
        }

        /**
         * Event change schema notify
         * @param data New Schema
         */
        function onImportSchema(data) {

            $scope.schema = data.schema;
        }

        function onExportSchema(){

            OdsFormService.exportSchema($scope.schema);
        }

        $scope.$on('$destroy', function() {

            EventDataFactory.unRegisterObserver(OdsEvent.IMPORT_SCHEMA, $scope, '$id');
            EventDataFactory.unRegisterObserver(OdsEvent.EXPORT_SCHEMA, $scope, '$id');
        });

    }
}
