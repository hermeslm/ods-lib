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
            getValidationPatterns: getValidationPatterns,
            newSectionObject: newSectionObject,
            newRowObject: newRowObject,
            newColumnObject: newColumnObject,

            //Fields creation methods
            newFieldTextObject: newFieldTextObject,
            newFieldNumberObject: newFieldNumberObject,
            newFieldPasswordObject: newFieldPasswordObject,
            newFieldTextareaObject: newFieldTextareaObject,
            newFieldSelectObject: newFieldSelectObject,

            //Select utils methods
            getSelectFieldId: getSelectFieldId,
            getSelectFieldTitle: getSelectFieldTitle,
            getSelectFieldTitleValue: getSelectFieldTitleValue,
            getSelectFieldIdValue: getSelectFieldIdValue,

            getFormFieldTemplate: getFormFieldTemplate,
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

        /**
         * Return a toolbar component template from type.
         * @param component Component type.
         * @returns {*} Component template.
         */
        function getToolbarComponent(component) {

            switch (component.componentType) {
                case OdsComponentType.SECTION:
                    return 'forms/toolbar/components/section.html';
                case OdsComponentType.FIELD:
                    switch (component.type) {
                        case OdsFieldType.TEXT:
                            return 'forms/toolbar/components/input.html';
                        case OdsFieldType.NUMBER:
                            return 'forms/toolbar/components/input.html';
                        case OdsFieldType.PASSWORD:
                            return 'forms/toolbar/components/input.html';
                        case OdsFieldType.TEXTAREA:
                            return 'forms/toolbar/components/textarea.html';
                        case OdsFieldType.SELECT:
                            return 'forms/toolbar/components/select.html';
                        default :
                            return 'forms/toolbar/components/no-component.html';
                    }
                default :
                    return 'forms/toolbar/components/no-component.html';
            }
        }

        /**
         * Return field template for Schema View
         * @param field Field
         * @returns {*}
         */
        function getSchemaField(field) {

            switch (field.type) {
                case OdsFieldType.TEXT:
                    return 'forms/schema/components/input.html';
                case OdsFieldType.NUMBER:
                    return 'forms/schema/components/input.html';
                case OdsFieldType.PASSWORD:
                    return 'forms/schema/components/input.html';
                case OdsFieldType.TEXTAREA:
                    return 'forms/schema/components/textarea/textarea.html';
                case OdsFieldType.SELECT:
                    return 'forms/schema/components/select/select.html';
                default :
                    return 'forms/schema/components/no-field.html';
            }
        }

        /**
         * Return field properties template for Schema View
         * @param field Field
         * @returns {*}
         */
        function getSchemaFieldProperties(field) {

            switch (field.type) {
                case OdsFieldType.TEXT:
                    return 'forms/schema/components/text/text-properties.html';
                case OdsFieldType.NUMBER:
                    return 'forms/schema/components/number/number-properties.html';
                case OdsFieldType.PASSWORD:
                    return 'forms/schema/components/password/password-properties.html';
                case OdsFieldType.TEXTAREA:
                    return 'forms/schema/components/textarea/textarea-properties.html';
                case OdsFieldType.SELECT:
                    return 'forms/schema/components/select/select-properties.html';
                default :
                    return 'forms/schema/components/no-field-properties.html';
            }
        }

        /**
         * Return pattern list.
         * @returns pattern list.
         */
        function getValidationPatterns() {

            var patterns = [
                {
                    value: 0,
                    pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
                    title: 'Url',
                    group: 'url'
                }, {
                    value: 1,
                    pattern: '^([a-z][a-z0-9\\-]+(\\.|\\-*\\.))+[a-z]{2,6}$',
                    title: 'Domain',
                    group: 'domain'
                }, {
                    value: 2,
                    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
                    title: 'IPv4 Address',
                    group: 'ip'
                }, {
                    value: 3,
                    pattern: '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
                    title: 'Email Address',
                    group: 'email'
                }, {
                    value: 4,
                    pattern: '^-{0,1}\\d+$',
                    title: 'Integer',
                    group: 'numeric'
                }, {
                    value: 5,
                    pattern: '^\\d+$',
                    title: 'Positive Integer',
                    group: 'numeric'
                }, {
                    value: 6,
                    pattern: '^-\\d+$',
                    title: 'Negative Integer',
                    group: 'numeric'
                }, {
                    value: 7,
                    pattern: '^-{0,1}\\d*\\.{0,1}\\d+$',
                    title: 'Number',
                    group: 'numeric'
                }, {
                    value: 8,
                    pattern: '^\\d*\\.{0,1}\\d+$',
                    title: 'Positive Number',
                    group: 'numeric'
                }, {
                    value: 9,
                    pattern: '^-\\d*\\.{0,1}\\d+$',
                    title: 'Negative Number',
                    group: 'numeric'
                }, {
                    value: 10,
                    pattern: '^(19|20)[\\d]{2,2}$',
                    title: 'Year (1920-2099)',
                    group: 'numeric'
                }, {
                    value: 11,
                    pattern: '(?=.*\\d)(?=.*[!@#$%^&*\\-=()|?."\';:]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
                    title: 'Password',
                    group: 'password'
                }
            ];

            return patterns;
        }

        /**
         * Create a new Section Object.
         * @returns {{name, componentType: string, title: string, displayProperties: boolean, allowedTypes: [null], rows: [null]}}
         */
        function newSectionObject() {

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

        /**
         * Create a new Row Object.
         * @returns {{name, componentType: string, cssClass: string, displayProperties: boolean, cols: [null]}}
         */
        function newRowObject() {

            return {
                name: generateName(OdsComponentType.ROW),
                componentType: OdsComponentType.ROW,
                cssClass: 'row',
                displayProperties: false,
                cols: [newColumnObject(12)]
            }
        }

        /**
         * Create a new Column Object.
         * @param colWidth Width of column.
         * @returns {{name, cssClass: string, allowedTypes: [null], fields: Array}}
         */
        function newColumnObject(colWidth) {

            return {
                name: generateName(OdsComponentType.COLUMN),
                cssClass: 'col-lg-' + colWidth,
                allowedTypes: [
                    OdsComponentType.FIELD
                ],
                fields: []
            }
        }

        /**
         * Create a new Field Text Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldTextObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'TextBox',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.TEXT,
                required: false,
                value: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Number Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldNumberObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Number',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.NUMBER,
                required: false,
                value: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Password Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldPasswordObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Password',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.PASSWORD,
                required: false,
                value: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Textarea Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldTextareaObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Textarea',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.TEXTAREA,
                required: false,
                rows: 3,
                value: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Select Object
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, multiSelect: boolean, valueField: string, titleField: string, limitTo: number, value: Array, data: Array, validation: {messages: {}}}}
         */
        function newFieldSelectObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Select',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.SELECT,
                required: false,
                multiSelect: false,
                valueField: '',
                titleField: '',
                limitTo: 10,
                value: null,
                options: [{
                    id: 1,
                    name: 'Option 1'
                }, {
                    id: 2,
                    name: 'Option 2'
                }, {
                    id: 3,
                    name: 'Option 3'
                }],
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Return field template for each field type in Form View
         * @param fieldType Field type
         * @returns {*}
         */
        function getFormFieldTemplate(fieldType) {

            switch (fieldType) {
                case OdsFieldType.TEXT:
                    return 'forms/common/fields/input.html';
                case OdsFieldType.NUMBER:
                    return 'forms/common/fields/input.html';
                case OdsFieldType.PASSWORD:
                    return 'forms/common/fields/input.html';
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

        function getSelectFieldId(field) {

            var defaultId = 'id';
            if (field) {
                return field.valueField !== undefined ? field.valueField : defaultId;
            } else {
                return defaultId;
            }
        }

        function getSelectFieldTitle(field) {

            var defaultName = 'name';
            if (field) {
                return field.titleField !== undefined ? field.titleField : defaultName;
            } else {
                return defaultName;
            }
        }

        function getSelectFieldTitleValue(field, element) {

            if (field) {
                if (field.render && element && element.constructor !== Array) {
                    return field.render(element);
                } else {
                    if (element && element.constructor !== Array) {
                        return field.titleField !== undefined ? element[field.titleField] : element.name;
                    }
                    else {
                        return field.placeholder;
                    }
                }
            } else {
                return field.placeholder;
            }
        }

        function getSelectFieldIdValue(field, element) {

            if (field) {
                if (element && element.constructor !== Array) {
                    return field.valueField !== undefined ? element[field.valueField] : element.id;
                }
            } else {
                return field.placeholder;
            }
        }

        function copyJson(json) {

            $window.prompt('Copy to clipboard: Ctrl+C, Enter', json);
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
