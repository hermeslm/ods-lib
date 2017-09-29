/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsFormService', OdsFormService);

    OdsFormService.$inject = ['OdsFieldType', 'OdsComponentType', '$window'];

    function OdsFormService(OdsFieldType, OdsComponentType, $window) {

        var uniqueCounter = (+new Date) % 10000;
        var schema = null;

        var service = {
            initSchema: initSchema,
            generateName: generateName,
            getToolbarComponent: getToolbarComponent,
            getSchemaField: getSchemaField,
            getSchemaFieldProperties: getSchemaFieldProperties,
            newSectionObject: newSectionObject,
            newRowObject: newRowObject,
            newColumnObject: newColumnObject,
            getFieldTemplate: getFieldTemplate,
            copyJson: copyJson,
            saveFormData: saveFormData,
            saveFormSchema: saveFormSchema
        };

        /**
         * Generate object name by type.
         * @param type Object type.
         * @returns
         */
        function generateName(type) {

            uniqueCounter++;

            switch (type) {
                case OdsComponentType.SECTION:
                    return 'section' + uniqueCounter;
                case OdsComponentType.ROW:
                    return 'row' + uniqueCounter;
                case OdsComponentType.COLUMN:
                    return 'column' + uniqueCounter;
                case OdsComponentType.FIELD:
                    return 'field' + uniqueCounter;
                default :
                    return uniqueCounter;
            }
        }

        /**
         * Init the schema
         * @param schema
         * @returns {*}
         */
        function initSchema(schema) {

            if (schema) {
                schema.allowedTypes = [OdsComponentType.SECTION];

                for (var i = 0; i < schema.layout.length; i++) {
                    schema.layout[i].displayProperties = false;
                    schema.layout[i].allowedTypes = [OdsComponentType.ROW];
                    for (var j = 0; j < schema.layout[i].rows.length; j++) {
                        schema.layout[i].rows[j].displayProperties = false;
                        for (var k = 0; k < schema.layout[i].rows[j].cols.length; k++) {
                            schema.layout[i].rows[j].cols[k].allowedTypes = [OdsComponentType.FIELD];
                            schema.layout[i].rows[j].cols[k].displayProperties = false;
                        }
                    }
                }
                this.schema = schema;
            } else {
                alert('Please specify a schema!!!');
            }
            return schema;
        }

        function getToolbarComponent(component) {

            switch (component.componentType) {
                case OdsComponentType.SECTION:
                    return 'forms/toolbar/components/section.html';
                case OdsComponentType.FIELD:
                    switch (component.type) {
                        case OdsFieldType.TEXT:
                            return 'forms/toolbar/components/text.html';
                        default :
                            return 'forms/toolbar/components/no-component.html';
                    }
                default :
                    return 'forms/toolbar/components/no-component.html';
            }
        }

        function getSchemaField(field) {

            switch (field.type) {
                case OdsFieldType.TEXT:
                    return 'forms/schema/components/text/text.html';
                default :
                    return 'forms/schema/components/no-field.html';
            }
        }

        function getSchemaFieldProperties(field) {

            switch (field.type) {
                case OdsFieldType.TEXT:
                    return 'forms/schema/components/text/text-properties.html';
                default :
                    return 'forms/schema/components/no-field-properties.html';
            }
        }


        function newSectionObject() {

            uniqueCounter++;
            return {
                name: generateName(OdsComponentType.SECTION),
                componentType: OdsComponentType.SECTION,
                title: 'Section',
                displayProperties: false,
                allowedTypes: [
                    OdsComponentType.ROW
                ],
                rows: [newRowObject()]
            }
        }

        function newRowObject() {

            uniqueCounter++;
            return {
                name: generateName(OdsComponentType.ROW),
                componentType: OdsComponentType.ROW,
                cssClass: 'row',
                displayProperties: false,
                cols: [newColumnObject(12)]
            }
        }

        function newColumnObject(colWidth) {

            uniqueCounter++;
            return {
                name: generateName(OdsComponentType.COLUMN),
                cssClass: 'col-lg-' + colWidth,
                allowedTypes: [
                    OdsComponentType.FIELD
                ],
                fields: []
            }
        }

        function getFieldTemplate(fieldType) {

            switch (fieldType) {
                case OdsFieldType.TEXT:
                    return 'forms/common/fields/text.html';
                case OdsFieldType.NUMBER:
                    return 'forms/common/fields/number.html';
                case OdsFieldType.DATE:
                    return 'forms/common/fields/date.html';
                case OdsFieldType.TEXTAREA:
                    return 'forms/common/fields/textarea.html';
                case OdsFieldType.TOGGLE:
                    return 'forms/common/fields/toggle.html';
                case OdsFieldType.SELECT:
                    return 'forms/common/fields/select.html';
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/common/fields/multi-select.html';
                default :
                    return 'forms/common/fields/text.html';
            }
        }

        function copyJson(json) {

            $window.prompt("Copy to clipboard: Ctrl+C, Enter", json);
        }

        function saveFormData(schema) {

            var formData = {
                formName: schema.name,
                formLabel: schema.label,
                formDescription: schema.description
            };

            var layout = schema.layout;
            for (var i = 0; i < layout.length; i++) {
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        formData[cols[k].field.name] = cols[k].field.value;
                    }
                }
            }
            return formData;
        }

        function saveFormSchema(schema) {

            return schema;
        }

        return service;
    }
})();
