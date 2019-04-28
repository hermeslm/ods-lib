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

            EventDataFactory.registerObserver(OdsEvent.IMPORT_FORM, $scope);
            EventDataFactory.registerObserver(OdsEvent.EXPORT_FORM, $scope);
            EventDataFactory.registerObserver(OdsEvent.LOAD_SUB_FORM, $scope);

        }]
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.getEditMode = getEditMode;
        $scope.onAdd = onAdd;
        $scope.onImportForm = onImportForm;
        $scope.onExportForm = onExportForm;
        $scope.onLoadSubForm = onLoadSubForm;

        if (!$scope.schema) {
            $scope.schema = OdsFormService.newSchema();
            // $scope.schema = OdsFormService.initSchema($scope.schema);
        }

        //CKEditor config load.
        if ($scope.config) {
            if ($scope.config.ckeditor) {
                OdsFormService.setConfigToCKEditorComponent($scope.schema, $scope.config);
            }
        }

        /**
         * Return if it is in edit mode.
         * @returns {boolean}
         */
        function getEditMode() {
            return true;
        }

        /**
         * Catch onAdd event in drag and drop for setting field properties
         */
        function onAdd() {

            $scope.schema.layout.push(OdsFormService.newSectionObject());
        }

        /**
         * Event change schema notify
         * @param data New Form
         */
        function onImportForm(data) {

            $scope.schema = data.form;
        }

        function onExportForm() {

            OdsFormService.exportForm($scope.schema);
        }

        function onLoadSubForm(subForm, position) {

            OdsFormService.loadSubForm($scope.schema, subForm, position);
        }

        $scope.$on('$destroy', function () {

            EventDataFactory.unRegisterObserver(OdsEvent.IMPORT_FORM, $scope, '$id');
            EventDataFactory.unRegisterObserver(OdsEvent.EXPORT_FORM, $scope, '$id');
            EventDataFactory.unRegisterObserver(OdsEvent.LOAD_SUB_FORM, $scope, '$id');
        });

    }
}
