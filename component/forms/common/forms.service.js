/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
        'use strict';

        angular
            .module('ods-lib')
            .factory('OdsFormService', OdsFormService);

        OdsFormService.$inject = ['OdsFieldType', 'OdsComponentType', 'OdsDateTimeFormat', '$window', 'dialogs',
            '$resource', 'OdsPosition'];

        function OdsFormService(OdsFieldType, OdsComponentType, OdsDateTimeFormat, $window, dialogs,
                                $resource, OdsPosition) {

            var uniqueCounter = (+new Date()) % 10000;

            var version = '1.0';

            var formats = {
                JSON: 'json'
            };

            var clipBoard = [];
            var callbacks = [];

            var service = {

                //Utils methods
                newSchema: newSchema,
                newSchemaEmpty: newSchemaEmpty,
                initSchema: initSchema,
                generateName: generateName,
                onAdd: onAdd,
                getFieldValueAsNumber: getFieldValueAsNumber,
                copyToClipboard: copyToClipboard,
                strSubtitutor: strSubtitutor,
                restResource: restResource,
                getClipBoard: getClipBoard,
                setClipBoard: setClipBoard,
                addToClipBoard: addToClipBoard,
                onAddToClipBoard: onAddToClipBoard,
                renameComponent: renameComponent,
                importForm: importForm,
                exportForm: exportForm,
                importSubForm: importSubForm,
                downloadObjectAsJson: downloadObjectAsJson,
                loadSubForm: loadSubForm,
                checkUpload: checkUpload,
                getExportables: getExportables,

                //Section specific
                cloneSection: cloneSection,

                //Templates management
                getToolbarComponent: getToolbarComponent,
                getSchemaField: getSchemaField,
                getSchemaFieldProperties: getSchemaFieldProperties,
                getFormFieldTemplate: getFormFieldTemplate,
                getFormViewerTemplate: getFormViewerTemplate,

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
                newFieldSelect2Object: newFieldSelect2Object,
                newFieldMultiSelectObject: newFieldMultiSelectObject,
                newFieldToggleObject: newFieldToggleObject,
                newDateTimeObject: newDateTimeObject,
                newFieldLabelObject: newFieldLabelObject,
                newFieldCheckBoxObject: newFieldCheckBoxObject,
                newFieldCheckBoxListObject: newFieldCheckBoxListObject,
                newFieldRadioListObject: newFieldRadioListObject,

                //Fields plugins creation methods
                newYesNoObject: newYesNoObject,
                newTableObject: newTableObject,
                newItemObject: newItemObject,
                newCKEditorObject: newCKEditorObject,

                //Select utils methods
                getSelectFieldId: getSelectFieldId,
                getSelectFieldTitle: getSelectFieldTitle,
                getSelectFieldTitleValue: getSelectFieldTitleValue,
                getSelectFieldIdValue: getSelectFieldIdValue,

                //Table field specific
                removeRow: removeRow,
                removeColumn: removeColumn,
                cloneRow: cloneRow,

                //CKEditor field specific
                setConfigToCKEditorComponent: setConfigToCKEditorComponent,
                defaultCKEditorPrefix: defaultCKEditorPrefix,
                defaultCKEditorSuffix: defaultCKEditorSuffix,

                getTimeZoneUTC: getTimeZoneUTC,
                convertFormSchemaFromServer: convertFormSchemaFromServer,
                setReadOnlyStatus: setReadOnlyStatus,
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
                    hideLabel: true,
                    description: 'New Form Description',
                    layout: [newSectionObject()],
                    allowedTypes: [OdsComponentType.SECTION]
                };
            }

            /**
             * Create a new Schema.
             */
            function newSchemaEmpty() {
                return {
                    name: generateName(OdsComponentType.FORM),
                    label: 'New Form',
                    hideLabel: true,
                    description: 'New Form Description',
                    layout: [],
                    allowedTypes: [OdsComponentType.SECTION]
                };
            }

            /**
             * Import Schema.
             */
            function importForm(file) {

                var base64result = file.substr(file.indexOf(',') + 1);
                var decodedString = atob(base64result);
                if (decodedString && decodedString !== '') {
                    return angular.fromJson(decodedString);
                } else {
                    console.error('Not valid JSON file!!!')
                }
            }

            /**
             * Export Schema.
             */
            function exportForm(schema) {

                var exportObject = {
                    format: formats.JSON,
                    version: version,
                    form: schema
                };

                var now = new Date();

                downloadObjectAsJson(exportObject, schema.label + ' ' + now.getFullYear() + '-' +
                    now.getMonth() + '-' + now.getDate());
            }

            /**
             * Download schema as JSON
             * @param exportObj
             * @param exportName
             */
            function downloadObjectAsJson(exportObj, exportName) {

                var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
                var downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute('href', dataStr);
                downloadAnchorNode.setAttribute('download', exportName + '.json');
                downloadAnchorNode.click();
                downloadAnchorNode.remove();
            }

            function checkUpload() {

                // Check for the various File API support.
                if ($window.File && $window.FileReader && $window.FileList && $window.Blob) {
                    // Great success! All the File APIs are supported.
                    return true;
                } else {
                    alert('The File APIs are not fully supported in this browser.');
                    return false;
                }
            }

            /**
             * This method allows to import a subform into th schema
             * @param subForm
             */
            function importSubForm(subForm) {

                //TODO check subform syntax.
                EventDataFactory.setData(OdsEvent.LOAD_SUB_FORM, subForm);
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
             * @deprecated
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
                    // this.schema = schema;
                } else {
                    console.error('Please specify a schema!!!');
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
                            case OdsFieldType.SELECT2:
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
                            case OdsFieldType.CHECKBOX:
                                return 'forms/toolbar/components/checkbox.html';
                            case OdsFieldType.CHECKBOX_LIST:
                                return 'forms/toolbar/components/checkbox-list.html';
                            case OdsFieldType.RADIO:
                                return 'forms/toolbar/components/radio-list.html';
                            case OdsFieldType.CKEDITOR:
                                return 'forms/toolbar/components/ckeditor.html';
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
                    case OdsFieldType.SELECT2:
                        return 'forms/schema/components/select2/select2.html';
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
                    case OdsFieldType.CHECKBOX:
                        return 'forms/schema/components/checkbox/checkbox.html';
                    case OdsFieldType.CHECKBOX_LIST:
                        return 'forms/schema/components/checkbox-list/checkbox-list.html';
                    case OdsFieldType.RADIO:
                        return 'forms/schema/components/radio-list/radio-list.html';
                    case OdsFieldType.CKEDITOR:
                        return 'forms/schema/plugins/ckeditor/ckeditor.html';
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
                    case OdsFieldType.SELECT2:
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
                    case OdsFieldType.CHECKBOX:
                        return 'forms/schema/components/checkbox/checkbox-properties.html';
                    case OdsFieldType.CHECKBOX_LIST:
                        return 'forms/schema/components/checkbox-list/checkbox-list-properties.html';
                    case OdsFieldType.RADIO:
                        return 'forms/schema/components/radio-list/radio-list-properties.html';
                    case OdsFieldType.CKEDITOR:
                        return 'forms/schema/plugins/ckeditor/ckeditor-properties.html';
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
                    case OdsFieldType.SELECT2:
                        return 'forms/common/fields/select2.html';
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
                    case OdsFieldType.CHECKBOX:
                        return 'forms/common/fields/checkbox.html';
                    case OdsFieldType.CHECKBOX_LIST:
                        return 'forms/common/fields/checkbox-list.html';
                    case OdsFieldType.RADIO:
                        return 'forms/common/fields/radio-list.html';
                    case OdsFieldType.CKEDITOR:
                        return 'forms/common/fields/plugins/ckeditor.html';
                    default :
                        return 'forms/common/fields/no-field.html';
                }
            }

            /**
             * Return field template for each field type in Form Viewer
             * @param fieldType Field type
             * @returns {*}
             */
            function getFormViewerTemplate(fieldType) {

                switch (fieldType) {
                    case OdsFieldType.TEXT:
                        return 'forms/common/viewer/input.html';
                    case OdsFieldType.NUMBER:
                        return 'forms/common/viewer/input.html';
                    case OdsFieldType.PASSWORD:
                        return 'forms/common/viewer/input.html';
                    case OdsFieldType.DATE:
                        return 'forms/common/viewer/input.html';
                    case OdsFieldType.TEXTAREA:
                        return 'forms/common/viewer/input.html';
                    case OdsFieldType.TOGGLE:
                        return 'forms/common/viewer/toggle.html';
                    case OdsFieldType.SELECT:
                        return 'forms/common/viewer/select.html';
                    case OdsFieldType.SELECT2:
                        return 'forms/common/viewer/select.html';
                    case OdsFieldType.MULTI_SELECT:
                        return 'forms/common/viewer/multi-select.html';
                    case OdsFieldType.DATETIME:
                        return 'forms/common/viewer/datetime.html';
                    case OdsFieldType.IF_YES:
                        return 'forms/common/viewer/plugins/if-yes.html';
                    case OdsFieldType.TABLE:
                        return 'forms/common/viewer/plugins/table.html';
                    case OdsFieldType.LABEL:
                        return 'forms/common/fields/label-empty.html';
                    case OdsFieldType.CHECKBOX:
                        return 'forms/common/viewer/checkbox.html';
                    case OdsFieldType.CHECKBOX_LIST:
                        return 'forms/common/viewer/checkbox-list.html';
                    case OdsFieldType.RADIO:
                        return 'forms/common/viewer/radio-list.html';
                    case OdsFieldType.CKEDITOR:
                        return 'forms/common/viewer/plugins/ckeditor.html';
                    default :
                        return 'forms/common/viewer/no-template.html';
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
                    isExportable: false,
                    displayProperties: false,
                    hideLabel: false,
                    allowedTypes: [
                        OdsComponentType.ROW
                    ],
                    rows: [newRowObject()]
                };
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
                };
            }

            /**
             * Create a new Column Object.
             * @param colWidth Width of column.
             * @returns {{name, cssClass: string, allowedTypes: [null], fields: Array}}
             */
            function newColumnObject(colWidth) {

                return {
                    name: generateName(OdsComponentType.COLUMN),
                    cssClass: ' col-xs-' + colWidth + ' col-sm-' + colWidth + ' col-md-' + colWidth + ' col-lg-' + colWidth,
                    allowedTypes: [
                        OdsComponentType.FIELD
                    ],
                    fields: []
                };
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
                    // ,
                    // getValue: function () {
                    //     return value;
                    // }
                };
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
                };
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
                };
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
                };
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
                };
            }

            /**
             * Create a new Field Select2 Object
             * @returns Field Select2 Object
             */
            function newFieldSelect2Object() {

                return {
                    componentType: OdsComponentType.FIELD,
                    label: 'Select2',
                    name: generateName(OdsComponentType.FIELD),
                    placeholder: '',
                    type: OdsFieldType.SELECT2,
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
                };
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
                    render: null,
                    validation: {
                        messages: {}
                    }
                };
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
                };
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
                    format: OdsDateTimeFormat.ShortDateLongYear,
                    selectedFormat: OdsDateTimeFormat.ShortDateLongYear,
                    options: {
                        timezone: getTimeZoneUTC()
                    },
                    // utc: true,
                    required: false,
                    value: date
                };
            }

            function newFieldLabelObject() {

                return {
                    componentType: OdsComponentType.FIELD,
                    label: 'Label',
                    cssClass: 'text-left',
                    name: generateName(OdsComponentType.FIELD),
                    type: OdsFieldType.LABEL,
                    value: 'Label'
                };
            }

            function newFieldCheckBoxObject() {

                return {
                    componentType: OdsComponentType.FIELD,
                    label: 'CheckBox',
                    hideLabel: true,
                    ln: false,
                    name: generateName(OdsComponentType.FIELD),
                    type: OdsFieldType.CHECKBOX,
                    value: false
                };
            }

            function newFieldCheckBoxListObject() {
                return {
                    componentType: OdsComponentType.FIELD,
                    label: 'CheckBox List',
                    name: generateName(OdsComponentType.FIELD),
                    type: OdsFieldType.CHECKBOX_LIST,
                    inline: false,
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
                    value: {}
                };
            }

            function newFieldRadioListObject() {
                return {
                    componentType: OdsComponentType.FIELD,
                    label: 'Radiobutton List',
                    name: generateName(OdsComponentType.FIELD),
                    type: OdsFieldType.RADIO,
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
                    value: {}
                };
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
                };
            }

            function newTableObject() {

                return {
                    componentType: OdsComponentType.FIELD,
                    label: 'Table',
                    name: generateName(OdsComponentType.FIELD),
                    type: OdsFieldType.TABLE,
                    cssClass: 'table table-bordered',
                    matrix: [
                        [newItemObject(), newItemObject()]
                    ],
                    validation: {
                        messages: {}
                    }
                };
            }

            function newItemObject() {

                return {
                    name: generateName(OdsComponentType.ITEM),
                    fields: [],
                    // width: '10px',
                    allowedTypes: [OdsComponentType.FIELD]
                };
            }

            function newCKEditorObject() {

                //Default key combination. (CTRL + SPACE)
                var CTRL = 1114112;

                return {
                    componentType: OdsComponentType.FIELD,
                    label: 'CKEditor',
                    name: generateName(OdsComponentType.FIELD),
                    type: OdsFieldType.CKEDITOR,
                    readonly: false,
                    printView: false,
                    options: {
                        triggerKeyCode: CTRL + 32,
                        prefix: defaultCKEditorPrefix(),
                        suffix: defaultCKEditorSuffix(),
                        suggestionsUrl: '',
                        tokensUrl: '',
                        locked: true,
                        suggestions: [{
                            id: 'suggestion1',
                            label: 'Suggestion1'
                        }, {
                            id: 'suggestion2',
                            label: 'Suggestion2'
                        }, {
                            id: 'suggestion3',
                            label: 'Suggestion3'
                        }],
                        tokens: null
                    },
                    value: null
                };
            }

            function defaultCKEditorPrefix() {

                return '${';
            }

            function defaultCKEditorSuffix() {

                return '}';
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
                var id;
                switch (field.type) {
                    case OdsFieldType.SELECT:
                        if (field.value) {
                            id = getSelectFieldId(field);
                            value += Number(field.value[id]);
                        }
                        break;
                    case OdsFieldType.SELECT2:
                        if (field.value) {
                            id = getSelectFieldId(field);
                            value += Number(field.value[id]);
                        }
                        break;
                    case OdsFieldType.MULTI_SELECT:
                        if (field.value) {
                            id = getSelectFieldId(field);
                            for (var i = 0; i < field.value.length; i++) {
                                value += Number(field.value[i][id]);
                            }
                        }
                        break;
                    case OdsFieldType.LABEL:
                        if (field.value) {
                            value += 0;
                        }
                        break;
                    default:
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
                    return window.clipboardData.setData('Text', text);

                } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
                    var textarea = document.createElement('textarea');
                    textarea.textContent = text;
                    textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        return document.execCommand('copy');  // Security exception may be thrown by some browsers.
                    } catch (ex) {
                        console.warn('Copy to clipboard failed.', ex);
                        return false;
                    } finally {
                        document.body.removeChild(textarea);
                    }
                }
            }

            /**
             * Substitute object value in a string template using pattern with prefix and suffix.
             * @param str String to substitute.
             * @param valuesMap Object with values.
             * @param prefix Pattern prefix.
             * @param suffix Pattern suffix.
             * @returns {*} String pattern replaced with it object values.
             */
            function strSubtitutor(str, valuesMap, prefix, suffix) {

                var strResult = '';

                if (str) {
                    strResult = str;

                    for (var property in valuesMap) {
                        if (valuesMap.hasOwnProperty(property)) {
                            // do stuff
                            var re = new RegExp(escapeRegExp(prefix + property + suffix), 'gi');
                            strResult = strResult.replace(re, valuesMap[property]);
                        }
                    }
                }

                return strResult;
            }

            function restResource(resourceUrl) {

                return $resource(resourceUrl, {}, {
                    'query': {method: 'GET', isArray: true},
                    'get': {
                        method: 'GET',
                        transformResponse: function (data) {
                            if (data) {
                                data = angular.fromJson(data);
                            }
                            return data;
                        }
                    }
                });
            }

            function getClipBoard() {

                return clipBoard;
            }

            function setClipBoard(cb) {

                clipBoard = cb;
                //notify if there are any listeners
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](clipBoard);
                }
            }

            function addToClipBoard(item) {

                var comp = renameComponent(item);
                clipBoard.push(comp);
                //notify if there are any listeners
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](clipBoard);
                }
            }

            function onAddToClipBoard(callback) {

                callbacks.push(callback);
            }

            function escapeRegExp(str) {

                return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
            }

            function copyJson(json) {

                // $window.prompt('Copy to clipboard: Ctrl+C, Enter', json);
                copyToClipboard(json);
                $window.alert('Code copied to clipboard!!!');
            }

            function renameComponent(component) {

                var comp = angular.copy(component);

                switch (comp.componentType) {
                    // case OdsComponentType.FORM:
                    //     return 'form' + uniqueCounter;
                    // case OdsComponentType.SECTION:
                    //     return 'section' + uniqueCounter;
                    // case OdsComponentType.ROW:
                    //     return 'row' + uniqueCounter;
                    // case OdsComponentType.COLUMN:
                    //     return 'column' + uniqueCounter;
                    case OdsComponentType.FIELD:
                        comp.name = generateName(comp.componentType);
                        if (comp.type === OdsFieldType.TABLE) {
                            for (var i = 0; i < comp.matrix.length; i++) {
                                for (var j = 0; j < comp.matrix[i].length; j++) {
                                    comp.matrix[i][j].name = generateName(comp.matrix[i][j].componentType);
                                }
                            }
                        }
                        return comp;
                    // case OdsComponentType.ITEM:
                    //     return 'item' + uniqueCounter;
                    // case OdsComponentType.PLUGIN:
                    //     return 'plugin' + uniqueCounter;
                    default :
                        return uniqueCounter;
                }
            }

            //TODO add get values from table field, not implemented at the moment.
            function saveFormData(schema) {

                var formData = {
                    formName: schema.name,
                    formLabel: schema.label,
                    formDescription: schema.description,
                    fields: []
                };

                var field;
                var layout = schema.layout;

                for (var i = 0; i < layout.length; i++) {
                    var rows = layout[i].rows;
                    for (var j = 0; j < rows.length; j++) {
                        var cols = rows[j].cols;
                        for (var k = 0; k < cols.length; k++) {
                            var fields = cols[k].fields;
                            for (var l = 0; l < fields.length; l++) {
                                if (fields[l].type === OdsFieldType.TABLE) {
                                    for (var m = 0; m < fields[l].matrix.length; m++) {
                                        for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                            field = {
                                                name: cols[k].fields[l].matrix[m][p].fields[0].name,
                                                type: cols[k].fields[l].matrix[m][p].fields[0].type,
                                                code: cols[k].fields[l].matrix[m][p].fields[0].code,
                                                value: cols[k].fields[l].matrix[m][p].fields[0].value
                                            };
                                            formData.fields.push(field);
                                        }
                                    }
                                } else {
                                    field = {
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

            // /**
            //  * Return all exportable elements as array.
            //  */
            // function getExportables(schema) {
            //
            //     var exportables = [];
            //     var layout = schema.layout;
            //     for (var i = 0; i < layout.length; i++) {
            //         var content = layout[i];
            //         if (content && content.exportable) {
            //             exportables.push(content);
            //         }
            //     }
            //
            //     return exportables;
            // }

            /**
             * Return all exportable elements embedded in a form.
             */
            function getExportables(schema) {

                var form = newSchemaEmpty();
                var layout = schema.layout;
                for (var i = 0; i < layout.length; i++) {
                    var content = layout[i];
                    if (content && content.exportable) {
                        form.layout.push(content);
                    }
                }

                return form;
            }

            /**
             * Load a subform into the schema
             *
             * @return Boolean Return True if the operation is successful or False if an error occur.
             */
            function loadSubForm(schema, subForm, position) {

                var layout = schema.layout;
                if (Array.isArray(layout)) {
                    if (position === OdsPosition.TOP) {
                        layout.unshift(subForm);
                    } else {
                        layout.push(subForm);
                    }

                    return true;
                } else {
                    return false;
                }
            }

            function getDataFromComponentCode(schema, code) {

                var resultFields = [];

                var field;
                var layout = schema.layout;
                var fields;

                for (var i = 0; i < layout.length; i++) {
                    var rows = layout[i].rows;
                    for (var j = 0; j < rows.length; j++) {
                        var cols = rows[j].cols;
                        for (var k = 0; k < cols.length; k++) {
                            fields = cols[k].fields;
                            for (var l = 0; l < fields.length; l++) {
                                if (fields[l].type === OdsFieldType.TABLE) {
                                    for (var m = 0; m < fields[l].matrix.length; m++) {
                                        for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                            if (cols[k].fields[l].matrix[m][p].fields[0].code === code) {
                                                field = {
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
                                        field = {
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

            function convertFormSchemaFromServer(json) {

                var schema = angular.fromJson(json);

                var fields;
                var layout = schema.layout;

                for (var i = 0; i < layout.length; i++) {
                    var rows = layout[i].rows;
                    for (var j = 0; j < rows.length; j++) {
                        var cols = rows[j].cols;
                        for (var k = 0; k < cols.length; k++) {
                            fields = cols[k].fields;
                            for (var l = 0; l < fields.length; l++) {
                                if (fields[l].type === OdsFieldType.TABLE) {
                                    for (var m = 0; m < fields[l].matrix.length; m++) {
                                        var matrixRow = fields[l].matrix[m];
                                        for (var p = 0; p < matrixRow.length; p++) {
                                            if (matrixRow[p].fields.length > 0) {
                                                if (matrixRow[p].fields[0].type === OdsFieldType.DATETIME) {
                                                    //If field is datetime we set Date object from string
                                                    matrixRow[p].fields[0].value = new Date(Date.parse(matrixRow[p].fields[0].value));
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (fields[l].type === OdsFieldType.DATETIME) {
                                        fields[l].value = new Date(Date.parse(fields[l].value));
                                    }
                                }
                            }
                        }
                    }
                }

                return schema;
            }

            /**
             * This method make all fields in the schema read only or not.
             * @param json
             * @param status
             * @return {Object|Array|string|number}
             */
            function setReadOnlyStatus(json, status) {

                var schema = angular.fromJson(json);

                var fields;
                var layout = schema.layout;

                for (var i = 0; i < layout.length; i++) {
                    var rows = layout[i].rows;
                    for (var j = 0; j < rows.length; j++) {
                        var cols = rows[j].cols;
                        for (var k = 0; k < cols.length; k++) {
                            fields = cols[k].fields;
                            for (var l = 0; l < fields.length; l++) {
                                if (fields[l].type === OdsFieldType.TABLE) {
                                    for (var m = 0; m < fields[l].matrix.length; m++) {
                                        var matrixRow = fields[l].matrix[m];
                                        for (var p = 0; p < matrixRow.length; p++) {
                                            if (matrixRow[p].fields.length > 0) {
                                                matrixRow[p].fields[0].readonly = status;
                                            }
                                        }
                                    }
                                } else {
                                    fields[l].readonly = status;
                                }
                            }
                        }
                    }
                }

                return schema;
            }

            function setConfigToCKEditorComponent(schema, config) {

                var fields;

                if (schema && schema.layout) {
                    var layout = schema.layout;

                    for (var i = 0; i < layout.length; i++) {
                        var rows = layout[i].rows;
                        for (var j = 0; j < rows.length; j++) {
                            var cols = rows[j].cols;
                            for (var k = 0; k < cols.length; k++) {
                                fields = cols[k].fields;
                                for (var l = 0; l < fields.length; l++) {
                                    if (fields[l].type === OdsFieldType.TABLE) {
                                        for (var m = 0; m < fields[l].matrix.length; m++) {
                                            var matrixRow = fields[l].matrix[m];
                                            for (var p = 0; p < matrixRow.length; p++) {
                                                if (matrixRow[p].fields.length > 0) {
                                                    if (matrixRow[p].fields[0].type === OdsFieldType.CKEDITOR) {
                                                        matrixRow[p].fields[0].options.prefix = config.ckeditor.prefix ?
                                                            config.ckeditor.prefix : defaultCKEditorPrefix();
                                                        matrixRow[p].fields[0].options.suffix = config.ckeditor.suffix ?
                                                            config.ckeditor.suffix : defaultCKEditorSuffix();
                                                        if (config.ckeditor.suggestions) {
                                                            matrixRow[p].fields[0].options.suggestions = config.ckeditor.suggestions;
                                                        }
                                                        if (config.ckeditor.suggestionsUrl) {
                                                            matrixRow[p].fields[0].options.suggestionsUrl = config.ckeditor.suggestionsUrl
                                                        }
                                                        if (config.ckeditor.tokens) {
                                                            matrixRow[p].fields[0].options.tokens = config.ckeditor.tokens;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (fields[l].type === OdsFieldType.CKEDITOR) {
                                            fields[l].options.prefix = config.ckeditor.prefix ?
                                                config.ckeditor.prefix : defaultCKEditorPrefix();
                                            fields[l].options.suffix = config.ckeditor.suffix ?
                                                config.ckeditor.suffix : defaultCKEditorSuffix();
                                            if (config.ckeditor.suggestions) {
                                                fields[l].options.suggestions = config.ckeditor.suggestions;
                                            }
                                            if (config.ckeditor.suggestionsUrl) {
                                                fields[l].options.suggestionsUrl = config.ckeditor.suggestionsUrl
                                            }
                                            if (config.ckeditor.tokens) {
                                                fields[l].options.tokens = config.ckeditor.tokens;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            /**
             * This method clone Section.
             * @param schema
             * @param section
             * @param position
             * @package clonedCanClone
             * @return {Object|Array|string|number}
             */
            function cloneSection(schema, section, clonedCanClone, position) {

                var fields;
                var cloneSection = angular.copy(section);
                cloneSection.name = generateName(cloneSection.componentType);
                cloneSection.canClone = clonedCanClone;
                cloneSection.clonedCanClone = clonedCanClone;
                var rows = cloneSection.rows;
                for (var i = 0; i < rows.length; i++) {
                    var cols = rows[i].cols;
                    rows[i].name = generateName(rows[i].componentType);
                    for (var j = 0; j < cols.length; j++) {
                        fields = cols[j].fields;
                        cols[j].name = generateName(cols[j].componentType);
                        for (var k = 0; k < fields.length; k++) {
                            if (fields[k].type === OdsFieldType.TABLE) {
                                for (var l = 0; l < fields[k].matrix.length; l++) {
                                    var matrixRow = fields[k].matrix[l];
                                    for (var p = 0; p < matrixRow.length; p++) {
                                        matrixRow[p].name = generateName(OdsComponentType.ITEM);
                                        if (matrixRow[p].fields.length > 0) {
                                            matrixRow[p].fields[0].name = generateName(matrixRow[p].fields[0].componentType);
                                        }
                                    }
                                }
                            } else {
                                fields[k].name = generateName(fields[k].componentType);
                            }
                        }
                    }
                }

                position = position ? position : OdsPosition.DOWN;
                if (position === OdsPosition.UP) {
                    //We put over the new section
                    schema.layout.unshift(cloneSection);
                } else {
                    //Put above the new section
                    schema.layout.push(cloneSection);
                }
                return schema;
            }

            return service;
        }
    }

)();
