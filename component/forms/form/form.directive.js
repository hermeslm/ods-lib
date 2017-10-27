/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsForm', FormDirective);

FormDirective.$inject = ['OdsFormService', '$timeout'];

function FormDirective(OdsFormService, $timeout) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form/form.html',
        scope: {
            schema: '=',
            onSave: '&'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.form;

        $scope.clear = clear;
        $scope.save = save;

        //Common field validation
        $scope.getRequired = getRequired;
        $scope.getMinLength = getMinLength;
        $scope.getMaxLength = getMaxLength;
        $scope.getPattern = getPattern;


        $scope.getFormFieldTemplate = getFormFieldTemplate;

        //Select field specific
        $scope.getSelectFieldTitleValue = getSelectFieldTitleValue;

        //Calendar field specific
        $scope.openCalendar = openCalendar;

        //Table field specific
        $scope.removeRow = removeRow;
        $scope.removeColumn = removeColumn;
        $scope.cloneRow = cloneRow;

        /**
         * Return if field is required.
         * @param field Field
         * @returns {boolean}
         */
        function getRequired(field) {

            return field &&
            field.validation &&
            field.validation.required &&
            field.validation.required !== undefined ? field.validation.required : false;
        }

        /**
         * Return if field has min length.
         * @param field Field
         * @returns {boolean}
         */
        function getMinLength(field) {

            return field &&
            field.validation &&
            field.validation.minlength &&
            field.validation.minlength !== undefined ? field.validation.minlength : null;
        }

        /**
         * Return if field has a pattern.
         * @param field Field
         * @returns {boolean}
         */
        function getPattern(field) {

            return field &&
            field.validation &&
            field.validation.pattern &&
            field.validation.pattern !== undefined ? field.validation.pattern : null;
        }

        /**
         * Return if field has max length.
         * @param field Field
         * @returns {boolean}
         */
        function getMaxLength(field) {

            return field &&
            field.validation &&
            field.validation.maxlength &&
            field.validation.maxlength !== undefined ? field.validation.maxlength : null;
        }

        function getFormFieldTemplate(fieldType) {

            return OdsFormService.getFormFieldTemplate(fieldType);
        }

        function getSelectFieldTitleValue(field, element) {

            return OdsFormService.getSelectFieldTitleValue(field, element);
        }

        function clear() {
            //TODO confirm if you want to clear al fields.
            showInfo("Form cleared!!!");
        }

        /**
         * Call to external callback if it is specified, show error message if not defined.
         */
        function save() {

            if ($scope.schema.handleSubmit) {
                if ($scope.onSave) {
                    $scope.onSave();
                } else {
                    showError('You must to to define onSave() function.');
                }
            }
        }

        function showError(message) {

            $scope.error = true;
            $scope.message = message;
            $timeout(function () {
                $scope.error = false;
                $scope.message = '';
            }, 5000);
        }

        function showSuccess(message) {

            $scope.success = true;
            $scope.message = message;
            $timeout(function () {
                $scope.success = false;
                $scope.message = '';
            }, 5000);
        }

        function showInfo(message) {

            $scope.info = true;
            $scope.message = message;
            $timeout(function () {
                $scope.info = false;
                $scope.message = '';
            }, 5000);
        }

        // $scope.$watch('schema', function(schema) {
        //     console.log('Schema changed.');
        // }, true);

        /**
         * Open and close Calendar popup
         * @param field
         * @returns {boolean|*}
         */
        function openCalendar(field) {

            field.open = !field.open;
            return field.open;
        }

        /**
         * Remove row from section.
         * @param table Table to remove row
         * @param index Row index to remove.
         */
        function removeRow(table, index) {

            OdsFormService.removeRow(table, index);
        }

        /**
         * Add column to current row.
         * @param table Table to remove column
         * @param row Row to add column.
         */
        function removeColumn(table, index) {

            OdsFormService.removeColumn(table, index);
        }

        /**
         * Clone the last row in table and add it as a new row.
         * @param table Table
         */
        function cloneRow(table) {

            OdsFormService.cloneRow(table);
        }

    }
}