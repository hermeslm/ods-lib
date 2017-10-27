/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsFormService', OdsFormService);

    OdsFormService.$inject = ['OdsFieldType', 'OdsComponentType', 'OdsDateTimeFormat', '$window', 'dialogs'];

    function OdsFormService(OdsFieldType, OdsComponentType, OdsDateTimeFormat, $window, dialogs) {

        var uniqueCounter = (+new Date) % 10000;
        // var schema = null;

        var service = {
            //Utils methods
            newSchema: newSchema,
            initSchema: initSchema,
            generateName: generateName,
            onAdd: onAdd,
            getFieldValueAsNumber: getFieldValueAsNumber,
            copyToClipboard: copyToClipboard,

            //Templates management
            getToolbarComponent: getToolbarComponent,
            getSchemaField: getSchemaField,
            getSchemaFieldProperties: getSchemaFieldProperties,
            getFormFieldTemplate: getFormFieldTemplate,

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
            newFieldLabelObject: newFieldLabelObject,

            //Fields plugins creation methods
            newYesNoObject: newYesNoObject,
            newTableObject: newTableObject,
            newItemObject: newItemObject,

            //Select utils methods
            getSelectFieldId: getSelectFieldId,
            getSelectFieldTitle: getSelectFieldTitle,
            getSelectFieldTitleValue: getSelectFieldTitleValue,
            getSelectFieldIdValue: getSelectFieldIdValue,

            //Table field specific
            removeRow: removeRow,
            removeColumn: removeColumn,
            cloneRow: cloneRow,

            getTimeZoneUTC: getTimeZoneUTC,
            copyJson: copyJson,
            getDataFromComponentCode: getDataFromComponentCode,
            saveFormData: saveFormData,
            saveFormSchema: saveFormSchema
        };

        /**
         * Create a new Schema.
         */
        function newSchema() {
            return {
                name: generateName(OdsComponentType.FORM),
                label: 'New Form',
                description: 'New Form Description',
                layout: [],
                allowedTypes: [OdsComponentType.SECTION]
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
                case OdsComponentType.FORM:
                    return 'form' + uniqueCounter;
                case OdsComponentType.SECTION:
                    return 'section' + uniqueCounter;
                case OdsComponentType.ROW:
                    return 'row' + uniqueCounter;
                case OdsComponentType.COLUMN:
                    return 'column' + uniqueCounter;
                case OdsComponentType.FIELD:
                    return 'field' + uniqueCounter;
                case OdsComponentType.ITEM:
                    return 'item' + uniqueCounter;
                case OdsComponentType.PLUGIN:
                    return 'plugin' + uniqueCounter;
                default :
                    return uniqueCounter;
            }
        }

        /**
         * Catch onAdd event in drag and drop for setting field properties,
         * we only set field name and datetime for now.
         *
         * @param item Field
         * @param type Field type.
         */
        function onAdd(item, type) {

            if (type === OdsComponentType.FIELD) {
                item.name = generateName(OdsComponentType.FIELD);
                if (item.type === OdsFieldType.DATETIME) {
                    // var today = new Date();
                    // var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
                    item.value = new Date();
                }
                return item;
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
                        case OdsFieldType.LABEL:
                            return 'forms/toolbar/components/label.html';
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
                case OdsFieldType.TABLE:
                    return 'forms/schema/plugins/table/container.html';
                case OdsFieldType.LABEL:
                    return 'forms/schema/components/label.html';
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
                case OdsFieldType.TABLE:
                    return 'forms/schema/plugins/table/table-properties.html';
                case OdsFieldType.LABEL:
                    return 'forms/schema/components/label/label-properties.html';
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
                case OdsFieldType.TABLE:
                    return 'forms/common/fields/plugins/table.html';
                case OdsFieldType.LABEL:
                    return 'forms/common/fields/label-empty.html';
                default :
                    return 'forms/common/fields/no-field.html';
            }
        }

        /**
         * Return pattern list.
         * @returns [null,null,null,null,null,null,null,null,null,null,null,null] list.
         */
        function getValidationPatterns() {

            return [
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
                },
                getValue: function () {
                    return value;
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
         * @returns Field Select Object
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
                valueField: 'id',
                titleField: 'name',
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
         * @returns Field Toggle Object
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
                options: {
                    timezone: getTimeZoneUTC()
                },
                // utc: true,
                required: false,
                value: date
            }
        }

        function newFieldLabelObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Label',
                cssClass: 'text-left',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.LABEL,
                value: 'Label'
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
                    textarea: null
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
                cssClass: 'table table-bordered table-responsive position-relative',
                matrix: [
                    [newItemObject(), newItemObject()]
                ],
                validation: {
                    messages: {}
                }
            }
        }

        function newItemObject() {

            return {
                name: generateName(OdsComponentType.ITEM),
                fields: [],
                // width: '10px',
                allowedTypes: [OdsComponentType.FIELD]
            }
        }

        /**
         * Remove row from table.
         * @param table Table
         * @param index Row index to remove.
         */
        function removeRow(table, index) {

            if (table.matrix.length > 1) {
                dialogs.confirm('Confirm!!!', 'Do you want to remove this row?',
                    {size: 'sm'}).result.then(function () {

                    table.matrix.splice(index, 1);
                });
            } else {
                dialogs.notify('Information', 'At least one row must exist.',
                    {size: 'sm'}).result.then(function () {
                });
            }
        }

        /**
         * remove column to from table.
         * @param table Table
         * @param index Column index to remove.
         */
        function removeColumn(table, index) {

            if (table.matrix[0].length > 1) {
                dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
                    {size: 'sm'}).result.then(function () {

                    for (var i = 0; i < table.matrix.length; i++) {
                        table.matrix[i].splice(index, 1);
                    }
                });
            } else {
                dialogs.notify('Information', 'At least one column must exist.',
                    {size: 'sm'}).result.then(function () {
                });
            }
        }

        /**
         * Clone the last row in table and add it as a new row.
         * @param table Table
         */
        function cloneRow(table) {

            //copy last row in table
            var row = angular.copy(table.matrix[table.matrix.length - 1]);
            //set new name for every field in row.
            for (var i = 0; i < row.length; i++) {
                row[i].name = generateName(OdsComponentType.ITEM);
                for (var j = 0; j < row[i].fields.length; j++) {
                    row[i].fields[j].name = generateName(OdsComponentType.FIELD);
                }
            }
            table.matrix.push(row);
        }

        function getTimeZoneUTC() {

            return 'UTC/GMT';
        }

        function getFieldValueAsNumber(field) {

            var value = 0;
            switch (field.type) {
                case OdsFieldType.TEXT:
                    if (field.value) {
                        value += Number(field.value);
                    }
                    break;
                case OdsFieldType.NUMBER:
                    if (field.value) {
                        value += Number(field.value);
                    }
                    break;
                case OdsFieldType.SELECT:
                    if (field.value) {
                        var id = getSelectFieldId(field);
                        value += Number(field.value[id]);
                    }
                    break;
                case OdsFieldType.MULTI_SELECT:
                    if (field.value) {
                        var id = getSelectFieldId(field);
                        for (var i = 0; i < field.value.length; i++) {
                            value += Number(field.value[i][id]);
                        }
                    }
                    break;
                case OdsFieldType.TEXTAREA:
                    if (field.value) {
                        value += Number(field.value);
                    }
                    break;
            }

            return value;
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

        function copyToClipboard(text) {
            if (window.clipboardData && window.clipboardData.setData) {
                // IE specific code path to prevent textarea being shown while dialog is visible.
                return clipboardData.setData("Text", text);

            } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                var textarea = document.createElement("textarea");
                textarea.textContent = text;
                textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                } catch (ex) {
                    console.warn("Copy to clipboard failed.", ex);
                    return false;
                } finally {
                    document.body.removeChild(textarea);
                }
            }
        }

        function copyJson(json) {

            // $window.prompt('Copy to clipboard: Ctrl+C, Enter', json);
            copyToClipboard(json);
            $window.alert('Code copied to clipboard!!!');
        }

        //TODO add get values from table field, not implemented at the moment.
        function saveFormData(schema) {

            var formData = {
                formName: schema.name,
                formLabel: schema.label,
                formDescription: schema.description,
                fields: []
            };

            var layout = schema.layout;
            for (var i = 0; i < layout.length; i++) {
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        var fields = cols[k].fields;
                        for (var l = 0; l < fields.length; l++) {
                            if (fields[l].type == OdsFieldType.TABLE) {
                                for (var m = 0; m < fields[l].matrix.length; m++) {
                                    for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                        var field = {
                                            name: cols[k].fields[l].matrix[m][p].fields[0].name,
                                            type: cols[k].fields[l].matrix[m][p].fields[0].type,
                                            code: cols[k].fields[l].matrix[m][p].fields[0].code,
                                            value: cols[k].fields[l].matrix[m][p].fields[0].value
                                        };
                                        formData.fields.push(field);
                                    }
                                }
                            } else {
                                var field = {
                                    name: cols[k].fields[l].name,
                                    type: cols[k].fields[l].type,
                                    code: cols[k].fields[l].code,
                                    value: cols[k].fields[l].value
                                };
                                formData.fields.push(field);
                            }
                        }
                    }
                }
            }
            return formData;
        }

        function saveFormSchema(schema) {

            return schema;
        }

        function getDataFromComponentCode(schema, code) {

            var resultFields = [];

            var layout = schema.layout;
            for (var i = 0; i < layout.length; i++) {
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        var fields = cols[k].fields;
                        for (var l = 0; l < fields.length; l++) {
                            if (fields[l].type == OdsFieldType.TABLE) {
                                for (var m = 0; m < fields[l].matrix.length; m++) {
                                    for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                        if (cols[k].fields[l].matrix[m][p].fields[0].code === code) {
                                            var field = {
                                                name: cols[k].fields[l].matrix[m][p].fields[0].name,
                                                type: cols[k].fields[l].matrix[m][p].fields[0].type,
                                                code: cols[k].fields[l].matrix[m][p].fields[0].code,
                                                value: cols[k].fields[l].matrix[m][p].fields[0].value
                                            };
                                            resultFields.push(field);
                                        }
                                    }
                                }
                            } else {
                                if (cols[k].fields[l].code === code) {
                                    var field = {
                                        name: cols[k].fields[l].name,
                                        type: cols[k].fields[l].type,
                                        code: cols[k].fields[l].code,
                                        value: cols[k].fields[l].value
                                    };
                                    resultFields.push(field);
                                }
                            }
                            // //TODO if component is a table we need to lookup for every field in the table.
                            // if (cols[k].fields[l].code === code) {
                            //     var field = {
                            //         name: cols[k].fields[l].name,
                            //         code: cols[k].fields[l].code,
                            //         value: cols[k].fields[l].value
                            //     };
                            //     resultFields.push(field);
                            // }
                        }
                    }
                }
            }
            return fields;
        }

        return service;
    }
})();