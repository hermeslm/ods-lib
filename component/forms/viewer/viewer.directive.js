/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsViewer', ViewerDirective);

ViewerDirective.$inject = ['OdsFormService', 'uibDateParser'];

function ViewerDirective(OdsFormService, uibDateParser) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/viewer/viewer.html',
        scope: {
            schema: '=',
            config: '=',
            cssClass: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        if ($scope.config) {
            //CKEditor config load.
            if ($scope.config.ckeditor) {

                OdsFormService.setConfigToCKEditorComponent($scope.schema, $scope.config);
            }
        }

        //CKEditor specific
        $scope.valueSubtitutor = valueSubtitutor;
        $scope.getFormViewerTemplate = getFormViewerTemplate;

        $scope.getRadioTextFromValue = getRadioTextFromValue;
        $scope.getSelectTextFromValue = getSelectTextFromValue;
        $scope.getFieldTextsFromValues = getFieldTextsFromValues;
        $scope.getFieldChecklistFromValues = getFieldChecklistFromValues;

        $scope.dateTimeRender = dateTimeRender;
        $scope.hideTitle = hideTitle;

        /**
         * Hide title or label from component
         * @param field Component
         * @returns {boolean}
         */
        function hideTitle(field) {

            return !!field.hideLabel;
        }

        /**
         * Return Form Viewer template for every field.
         * @param fieldType Field type.
         * @returns {*} Field Viewer template.
         */
        function getFormViewerTemplate(fieldType) {

            return OdsFormService.getFormViewerTemplate(fieldType);
        }

        function valueSubtitutor(field) {

            if (field.options.tokens && field.printView) {
                return OdsFormService.strSubtitutor(field.value, field.options.tokens, field.options.prefix,
                    field.options.suffix);
            } else {
                return field.value;
            }
        }

        /**
         * Get option text from radio list
         * @param field
         * @returns {string}
         */
        function getRadioTextFromValue(field) {

            for (var i = 0; i < field.options.length; i++) {
                var value = field.options[i][OdsFormService.getSelectFieldId(field)];
                if (value == field.value) {
                    return field.options[i][OdsFormService.getSelectFieldTitle(field)];
                }
            }

            return '';
        }

        /**
         * Get option text from select list
         * @param field
         * @returns {string}
         */
        function getSelectTextFromValue(field) {

            for (var i = 0; i < field.options.length; i++) {
                var value = field.options[i][OdsFormService.getSelectFieldId(field)];
                if (field.value) {
                    if (value === field.value[OdsFormService.getSelectFieldId(field)]) {
                        return field.options[i][OdsFormService.getSelectFieldTitle(field)];
                    }
                }
            }

            return '';
        }

        function getFieldTextsFromValues(field) {

            var result = [];
            if (field.value) {
                for (var i = 0; i < field.value.length; i++) {
                    var value = field.value[i][OdsFormService.getSelectFieldId(field)];
                    for (var j = 0; j < field.options.length; j++) {
                        var current = field.options[j][OdsFormService.getSelectFieldId(field)];
                        if (value === current) {
                            result.push(field.options[j][OdsFormService.getSelectFieldTitle(field)]);
                        }
                    }
                }
            }

            if (result.length > 0) {
                return result;
            } else {
                return '';
            }
        }

        function dateTimeRender(field) {

            if (field.format) {
                return uibDateParser.filter(field.value, field.format);
            } else {
                return field.value;
            }
        }

        function getFieldChecklistFromValues(field) {

            var result = [];
            if (field.value) {
                for (var i = 0; i < field.options.length; i++) {
                    var id = field.value[i + 1];
                    if (id) {
                        var value = field.options[i].name;
                        result.push(value);
                    }
                }
            }

            if (result.length > 0) {
                return result;
            } else {
                return '';
            }
        }
    }
}
