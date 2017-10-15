/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsFormService', OdsFormService);

    OdsFormService.$inject = ['OdsFieldType', 'OdsComponentType', 'OdsDateTimeFormat', '$window'];

    function OdsFormService(OdsFieldType, OdsComponentType, OdsDateTimeFormat, $window) {

        var uniqueCounter = (+new Date) % 10000;
        var schema = null;

        var service = {
            newSchema: newSchema,
            initSchema: initSchema,
            generateName: generateName,
            getToolbarComponent: getToolbarComponent,
            getSchemaField: getSchemaField,
            getSchemaFieldProperties: getSchemaFieldProperties,
            getValidationPatterns: getValidationPatterns,
            getDateTimeFormats: getDateTimeFormats,
            newSectionObject: newSectionObject,
            newRowObject: newRowObject,
            newColumnObject: newColumnObject,

            //Fields creation methods
            newFieldTextObject: newFieldTextObject,
            newFieldNumberObject: newFieldNumberObject,
            newFieldPasswordObject: newFieldPasswordObject,
            newFieldTextareaObject: newFieldTextareaObject,
            newFieldSelectObject: newFieldSelectObject,
            newFieldMultiSelectObject: newFieldMultiSelectObject,
            newFieldToggleObject: newFieldToggleObject,
            newDateTimeObject: newDateTimeObject,

            //Fields plugins creation methods
            newYesNoObject: newYesNoObject,
            newTableObject: newTableObject,

            //Select utils methods
            getSelectFieldId: getSelectFieldId,
            getSelectFieldTitle: getSelectFieldTitle,
            getSelectFieldTitleValue: getSelectFieldTitleValue,
            getSelectFieldIdValue: getSelectFieldIdValue,

            getFormFieldTemplate: getFormFieldTemplate,
            getTimeZoneUTC: getTimeZoneUTC,
            copyJson: copyJson,
            saveFormData: saveFormData,
            saveFormSchema: saveFormSchema
        };

        /**
         * Create a new Schema.
         */
        function newSchema() {
            return {
                name: 'newForm',
                label: 'New Form',
                description: 'New Form Description',
                layout: []
            };
        }

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
                        case OdsFieldType.MULTI_SELECT:
                            return 'forms/toolbar/components/multi-select.html';
                        case OdsFieldType.TOGGLE:
                            return 'forms/toolbar/components/toggle.html';
                        case OdsFieldType.DATETIME:
                            return 'forms/toolbar/components/datetime.html';
                        case OdsFieldType.IF_YES:
                            return 'forms/toolbar/plugins/if-yes.html';
                        case OdsFieldType.TABLE:
                            return 'forms/toolbar/plugins/table.html';
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
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/schema/components/multi-select/multi-select.html';
                case OdsFieldType.TOGGLE:
                    return 'forms/schema/components/toggle/toggle.html';
                case OdsFieldType.DATETIME:
                    return 'forms/schema/components/datetime/datetime.html';
                case OdsFieldType.IF_YES:
                    return 'forms/schema/plugins/if-yes/if-yes.html';
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
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/schema/components/multi-select/multi-select-properties.html';
                case OdsFieldType.TOGGLE:
                    return 'forms/schema/components/toggle/toggle-properties.html';
                case OdsFieldType.DATETIME:
                    return 'forms/schema/components/datetime/datetime-properties.html';
                case OdsFieldType.IF_YES:
                    return 'forms/schema/plugins/if-yes/if-yes-properties.html';
                default :
                    return 'forms/schema/components/no-field-properties.html';
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
                case OdsFieldType.DATETIME:
                    return 'forms/common/fields/datetime.html';
                case OdsFieldType.IF_YES:
                    return 'forms/common/fields/plugins/if-yes.html';
                default :
                    return 'forms/common/fields/no-field.html';
            }
        }

        /**
         * Return pattern list.
         * @returns [null,null,null,null,null,null,null,null,null,null,null,null] list.
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

        function getDateTimeFormats() {

            var object = OdsDateTimeFormat;
            var formats = [];
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    // do stuff
                    var format = {
                        value: object[property],
                        option: property
                    };
                    formats.push(format);
                }
            }
            return formats;
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
         * Create a new Field Multiselect Object
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, multiSelect: boolean, valueField: string, titleField: string, limitTo: number, value: Array, options: Array, render: null, validation: {messages: {}}}}
         */
        function newFieldMultiSelectObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Multi select',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.MULTI_SELECT,
                required: false,
                multiSelect: true,
                valueField: 'id',
                titleField: 'name',
                limitTo: 10,
                value: [],
                options: [],
                render: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Toggle Object
         * @returns {{componentType: string, label: string, name, type: string, ln: boolean, on: string, off: string, value: string}}
         */
        function newFieldToggleObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Toggle',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.TOGGLE,
                ln: false,
                on: 'Yes',
                off: 'No',
                value: false
            }
        }

        function newDateTimeObject() {

            var today = new Date();
            var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0));
            return {
                componentType: OdsComponentType.FIELD,
                label: 'DateTime',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.DATETIME,
                enableTime: false,
                format: OdsDateTimeFormat.ShortDate,
                selectedFormat: OdsDateTimeFormat.ShortDate,
                // datepickerOptions: {
                //     timezone: getTimeZoneUTC()
                // },
                // utc: true,
                required: false,
                value: date
            }
        }

        function newYesNoObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'If yes:',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.IF_YES,
                ln: false,
                on: 'Yes',
                off: 'No',
                value: {
                    toggle: false,
                    textarea: null,
                },
                placeholder: '',
                validation: {
                    messages: {}
                }
            }
        }

        function newTableObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Table',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.TABLE,
                columns:[
                    {title:'Column1', field:'column1'},
                    {title:'Column2', field:'column2'}
                ],
                value: [
                    [1, 'Row1 Col1', 'Row2 Col 2']
                ],
                validation: {
                    messages: {}
                }
            }
        }

        function getTimeZoneUTC() {

            return 'UTC/GMT';
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
                        var fields = cols[k].fields;
                        for (var l = 0; l < fields.length; l++)
                            formData[cols[k].fields[l].name] = cols[k].fields[l].value;
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
