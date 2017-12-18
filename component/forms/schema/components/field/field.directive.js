/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';
angular
    .module('ods-lib')
    .directive('odsField', FieldDirective);

FieldDirective.$inject = ['OdsFormService', 'dialogs'];

function FieldDirective(OdsFormService, dialogs) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/field/field.html',
        scope: {
            row: '=',
            col: '=',
            config: '=',
            field: '=',
            popoverProps: '@',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        /**
         * This set the field in Schema view disabled.
         * @type {boolean}
         */
        $scope.fieldDisabled = true;

        $scope.toggleFieldProperties = toggleFieldProperties;
        $scope.getSchemaField = getSchemaField;
        $scope.getSchemaFieldProperties = getSchemaFieldProperties;
        $scope.removeField = removeField;

        $scope.getSelectFieldId = getSelectFieldId;
        $scope.getSelectFieldTitle = getSelectFieldTitle;
        $scope.getSelectFieldTitleValue = getSelectFieldTitleValue;

        $scope.patterns = OdsFormService.getValidationPatterns();
        $scope.onSelectPattern = onSelectPattern;
        $scope.onChangeMinLength = onChangeMinLength;
        $scope.onChangeMaxLength = onChangeMaxLength;
        $scope.onChangeRequired = onChangeRequired;

        $scope.openCalendar = openCalendar;
        $scope.formats = OdsFormService.getDateTimeFormats();
        $scope.formats.push({value: 'custom', option: 'Custom format'});
        $scope.showCustomFormat = $scope.field.selectedFormat === 'custom' ? true : false;
        $scope.onSelectFormat = onSelectFormat;

        /**
         * Toggle Row properties options.
         * @param field Current field to show properties options.
         */
        function toggleFieldProperties(field) {

            //We check if field width < 300, then properties will sow as popover
            if ($element[0].children[0].clientWidth < 300) {
                $scope.field.popoverProps = !$scope.field.popoverProps;
                field.showProperties = false;
            } else {
                $scope.field.popoverProps = false;
                field.showProperties = !field.showProperties;
            }
        }

        function getSchemaField(field) {

            return OdsFormService.getSchemaField(field);
        }

        function getSchemaFieldProperties(field) {

            return OdsFormService.getSchemaFieldProperties(field);
        }

        function getSelectFieldId(field) {

            return OdsFormService.getSelectFieldId(field);
        }

        function getSelectFieldTitle(field) {

            return OdsFormService.getSelectFieldTitle(field);
        }

        function getSelectFieldTitleValue(field, element) {

            return OdsFormService.getSelectFieldTitleValue(field, element);
        }

        /**
         * Remove field from schema.
         * @param index Field index to remove.
         */
        function removeField(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this field?',
                {size: 'sm'}).result.then(function (btn) {

                $scope.col.fields.splice(index, 1);
            });

        }

        function onSelectPattern() {

            if ($scope.field.validation) {
                if ($scope.field.patternSelect === '') {
                    delete $scope.field.validation.pattern;
                    delete $scope.field.validation.messages.pattern;
                } else {
                    $scope.field.validation.pattern = $scope.patterns[$scope.field.patternSelect].pattern;
                }
            } else {
                var pattern = {
                    pattern: $scope.patterns[$scope.field.patternSelect].pattern
                }
                $scope.field.validation = pattern;
            }
        }

        function onChangeMinLength() {

            if ($scope.field.validation) {
                if ($scope.field.validation.minlength === null) {
                    delete $scope.field.validation.minlength;
                    delete $scope.field.validation.messages.minlength;
                }
            }
        }

        function onChangeMaxLength() {

            if ($scope.field.validation) {
                if ($scope.field.validation.minlength === null) {
                    delete $scope.field.validation.minlength;
                    delete $scope.field.validation.messages.minlength;
                }
            }
        }

        function onChangeRequired() {

            if ($scope.field.validation) {
                if (!$scope.field.validation.required) {
                    delete $scope.field.validation.required;
                    delete $scope.field.validation.messages.required;
                }
            }
        }

        /**
         * Open and close Calendar popup
         * @param field
         * @returns {boolean|*}
         */
        function openCalendar(field) {

            $scope.field.open = !field.open;
            return $scope.field.open;
        }

        /**
         * On select format event in Calendar field.
         */
        function onSelectFormat(selectedFormat) {

            if (selectedFormat === 'custom') {
                $scope.showCustomFormat = true;
                $scope.field.format = 'MM/dd/yyyy';
            } else {
                $scope.showCustomFormat = false;
                $scope.field.format = selectedFormat;
            }
        }
    }
}
