/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
      .module('ods-lib')
      .factory('OdsFormService', OdsFormService);

    OdsFormService.$inject = ['OdsFieldType', 'OdsComponentType', 'OdsDateTimeFormat', '$window', 'dialogs',
      '$resource', 'OdsPosition', 'EventDataFactory', 'OdsEvent'];

    function OdsFormService(OdsFieldType, OdsComponentType, OdsDateTimeFormat, $window, dialogs,
                            $resource, OdsPosition, EventDataFactory, OdsEvent) {

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
        newYesNoCheckboxObject: newYesNoCheckboxObject,
        newYesNoRadioObject: newYesNoRadioObject,
        newOptionsTextAreaObject: newOptionsTextAreaObject,
        newTableObject: newTableObject,
        newItemObject: newItemObject,
        newGridRenderObject: newGridRenderObject,
        newCKEditorObject: newCKEditorObject,
        newCanvasPainterObject: newCanvasPainterObject,

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

        //Options-textarea
        createOptionsGroup: createOptionsGroup,

        getTimeZoneUTC: getTimeZoneUTC,
        convertFormSchema: convertFormSchema,
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
          var loadedFile = angular.fromJson(decodedString);
          loadedFile.form = convertFormSchema(loadedFile.form);
          return loadedFile;
        } else {
          console.error('Not valid JSON file!!!');
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
              case OdsFieldType.IF_YES_CHECKBOX:
                return 'forms/toolbar/plugins/if-yes-checkbox.html';
              case OdsFieldType.IF_YES_RADIO:
                return 'forms/toolbar/plugins/if-yes-radio.html';
              case OdsFieldType.TABLE:
                return 'forms/toolbar/plugins/table.html';
              case OdsFieldType.LABEL:
                return 'forms/toolbar/components/label.html';
              case OdsFieldType.GRID_RENDER:
                return 'forms/toolbar/plugins/grid-render.html';
              case OdsFieldType.CHECKBOX:
                return 'forms/toolbar/components/checkbox.html';
              case OdsFieldType.CHECKBOX_LIST:
                return 'forms/toolbar/components/checkbox-list.html';
              case OdsFieldType.RADIO:
                return 'forms/toolbar/components/radio-list.html';
              case OdsFieldType.CKEDITOR:
                return 'forms/toolbar/components/ckeditor.html';
              case OdsFieldType.OPTIONS_TEXTAREA:
                return 'forms/toolbar/plugins/options-textarea.html';
              case OdsFieldType.CANVAS_PAINTER:
                return 'forms/toolbar/plugins/canvas-painter.html';
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
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/schema/plugins/if-yes-checkbox/if-yes-checkbox.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/schema/plugins/if-yes-radio/if-yes-radio.html';
          case OdsFieldType.TABLE:
            return 'forms/schema/plugins/table/container.html';
          case OdsFieldType.LABEL:
            return 'forms/schema/components/label.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/schema/plugins/grid-render/container.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/schema/components/checkbox/checkbox.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/schema/components/checkbox-list/checkbox-list.html';
          case OdsFieldType.RADIO:
            return 'forms/schema/components/radio-list/radio-list.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/schema/plugins/ckeditor/ckeditor.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/schema/plugins/options-textarea/options-textarea.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/schema/plugins/canvas-painter/container.html';
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
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/schema/plugins/if-yes-checkbox/if-yes-checkbox-properties.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/schema/plugins/if-yes-radio/if-yes-radio-properties.html';
          case OdsFieldType.TABLE:
            return 'forms/schema/plugins/table/table-properties.html';
          case OdsFieldType.LABEL:
            return 'forms/schema/components/label/label-properties.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/schema/plugins/grid-render/grid-render-properties.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/schema/components/checkbox/checkbox-properties.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/schema/components/checkbox-list/checkbox-list-properties.html';
          case OdsFieldType.RADIO:
            return 'forms/schema/components/radio-list/radio-list-properties.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/schema/plugins/ckeditor/ckeditor-properties.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/schema/plugins/options-textarea/options-textarea-properties.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/common/fields/plugins/canvas-painter/canvas-painter-properties.html';
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
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/common/fields/plugins/if-yes-checkbox.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/common/fields/plugins/if-yes-radio.html';
          case OdsFieldType.TABLE:
            return 'forms/common/fields/plugins/table.html';
          case OdsFieldType.LABEL:
            return 'forms/common/fields/label-empty.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/common/fields/plugins/grid-render.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/common/fields/checkbox.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/common/fields/checkbox-list.html';
          case OdsFieldType.RADIO:
            return 'forms/common/fields/radio-list.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/common/fields/plugins/ckeditor.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/common/fields/plugins/options-textarea/options-textarea.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/common/fields/plugins/canvas-painter/container.html';
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
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/common/viewer/plugins/if-yes-checkbox.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/common/viewer/plugins/if-yes-radio.html';
          case OdsFieldType.TABLE:
            return 'forms/common/viewer/plugins/table.html';
          case OdsFieldType.LABEL:
            return 'forms/common/fields/label-empty.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/common/viewer/plugins/grid-render.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/common/viewer/checkbox.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/common/viewer/checkbox-list.html';
          case OdsFieldType.RADIO:
            return 'forms/common/viewer/radio-list.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/common/viewer/plugins/ckeditor.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/common/viewer/plugins/options-textarea.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/common/viewer/plugins/canvas-painter.html';
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
       * @returns {{isExportable: boolean, displayProperties: boolean, allowedTypes: string[],
       * componentType: string, name: (*|number), title: string, rows: {displayProperties: boolean,
       * componentType: string, cssClass: string, name: (*|number), cols: {allowedTypes: string[],
       * cssClass: string, name: (*|number), fields: Array}[]}[], hideLabel: boolean}}
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
       * @returns {{displayProperties: boolean, componentType: string, cssClass: string,
       * name: (*|number), cols: {allowedTypes: string[], cssClass: string, name: (*|number), fields: Array}[]}}
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
       * @returns {{allowedTypes: string[], cssClass: string, name: (*|number), fields: Array}}
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
       * Create a new base Field Object.
       * @returns
       */
      function newBaseFieldObject() {

        return {
          componentType: OdsComponentType.FIELD,
          name: generateName(OdsComponentType.FIELD),
          required: false,
          exportable: false,
          linkedTo: null
        };
      }

      /**
       * Create a new Field Text Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldTextObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'TextBox',
          placeholder: '',
          type: OdsFieldType.TEXT,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Number Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldNumberObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Number',
          placeholder: '',
          type: OdsFieldType.NUMBER,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Password Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldPasswordObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Password',
          placeholder: '',
          type: OdsFieldType.PASSWORD,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Textarea Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldTextareaObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Textarea',
          placeholder: '',
          type: OdsFieldType.TEXTAREA,
          rows: 3,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Select Object
       * @returns {componentType: string, titleField: string, name: (*|number), options: *[],
       * limitTo: number, label: string, placeholder: string, type: (number|string),
       * valueField: string, value: null, required: boolean, validation: {messages: {}}} Select Object
       */
      function newFieldSelectObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Select',
          placeholder: '...Select an option',
          type: OdsFieldType.SELECT,
          valueField: 'id',
          titleField: 'name',
          limitTo: 10,
          value: null,
          options: [{
            value: 1,
            id: 1,
            name: 'Option 1',
            color: '#FFFFFF'
          }, {
            value: 2,
            id: 2,
            name: 'Option 2',
            color: '#FFFFFF'
          }, {
            value: 3,
            id: 3,
            name: 'Option 3',
            color: '#FFFFFF'
          }],
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Select2 Object
       * @returns
       */
      function newFieldSelect2Object() {

        return _.merge(newBaseFieldObject(), {
          label: 'Select2',
          placeholder: '',
          type: OdsFieldType.SELECT2,
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
        });
      }

      /**
       * Create a new Field Multiselect Object
       * @returns
       */
      function newFieldMultiSelectObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Multi select',
          placeholder: '',
          type: OdsFieldType.MULTI_SELECT,
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
        });
      }

      /**
       * Create a new Field Toggle Object
       * @returns
       */
      function newFieldToggleObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Toggle',
          type: OdsFieldType.TOGGLE,
          ln: false,
          on: 'Yes',
          off: 'No',
          value: false
        });
      }

      function newDateTimeObject() {

        var today = new Date();
        var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(),
          today.getDate(), 9, 0, 0));
        return _.merge(newBaseFieldObject(), {
          label: 'DateTime',
          type: OdsFieldType.DATETIME,
          enableTime: false,
          format: OdsDateTimeFormat.ShortDateLongYear,
          selectedFormat: OdsDateTimeFormat.ShortDateLongYear,
          modelOptions: {
            timezone: getTimeZoneUTC()
          },
          openInEditMode: false,
          // utc: true,
          value: date,
          validation: {
            datetime: false,
            messages: {
              datetime: 'Invalid Date or Time.'
            }
          }
        });
      }

      function newFieldLabelObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Label',
          cssClass: 'text-left',
          type: OdsFieldType.LABEL,
          value: 'Label'
        });
      }

      function newFieldCheckBoxObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'CheckBox',
          hideLabel: true,
          ln: false,
          type: OdsFieldType.CHECKBOX,
          value: false
        });
      }

      function newFieldCheckBoxListObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'CheckBox List',
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
        });
      }

      function newFieldRadioListObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Radiobutton List',
          type: OdsFieldType.RADIO,
          options: [{
            value: 1,
            id: 1,
            name: 'Option 1'
          }, {
            value: 2,
            id: 2,
            name: 'Option 2'
          }, {
            value: 3,
            id: 3,
            name: 'Option 3'
          }],
          value: {}
        });
      }

      function newYesNoObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'If yes:',
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
        });
      }

      function newYesNoRadioObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'If yes Radio:',
          type: OdsFieldType.IF_YES_RADIO,
          ln: true,
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
        });
      }

      function newYesNoCheckboxObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'If yes options:',
          type: OdsFieldType.IF_YES_CHECKBOX,
          ln: false,
          on: 'Yes',
          off: 'No',
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
          value: {
            toggle: false,
            checkbox: {}
          },
          placeholder: '',
          validation: {
            messages: {}
          }
        });
      }

      function newOptionsTextAreaObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Options Textarea:',
          type: OdsFieldType.OPTIONS_TEXTAREA,
          modal: {
            title: 'Modal Title',
            placeholder: '',
            tooltip: '',
            value: ''
          },
          groups: [
            createOptionsGroup()
          ],
          value: '',
          placeholder: '',
          validation: {
            messages: {}
          }
        });
      }

      function createOptionsGroup() {
        const options = [];
        for (var i = 1; i <= 3; i++) {
          options.push({
            id: 'Option ' + i,
            name: 'Option ' + i
          });
        }
        return {
          name: generateName(),
          label: 'Group label',
          groupValue: 'Group value',
          isOpen: false,
          inline: false,
          options: options,
          optionValue: null
        };
      }

      function newTableObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Table',
          type: OdsFieldType.TABLE,
          cssClass: 'table table-bordered',
          matrix: [
            [newItemObject(), newItemObject()]
          ],
          validation: {
            messages: {}
          }
        });
      }

      function newItemObject() {

        return {
          name: generateName(OdsComponentType.ITEM),
          fields: [],
          // width: '10px',
          allowedTypes: [OdsComponentType.FIELD]
        };
      }

      function newGridRenderObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Grid Render',
          type: OdsFieldType.GRID_RENDER,
          cssClass: 'table table-bordered',
          manageRows: true,
          descriptor: {
            header: ['Column 1', 'Column 2'],
            data: []
          }
        });
      }

      var defaultBackground = 'data:image/png;base64,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';

      function newCanvasPainterObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Canvas Painter',
          type: OdsFieldType.CANVAS_PAINTER,
          readonly: true,
          options: {
            canvasId: 'odsCanvasMain',
            tmpCanvasId: 'odsCanvasMain',
            width: 600,
            height: 367,
            backgroundColor: '#fff',
            undoEnabled: true,
            opacity: 0.9,
            undo: true,
            imageSrc: defaultBackground,
            color: '#ff0',
            lineWidth: 10,
            lineColors: ['#F9FF33', '#000', '#9CB199', '#CF3759', '#485247', '#E77547', '#D38E47', '#0A6A74', '#153974']
          },
          value: defaultBackground
        });
      }

      function newCKEditorObject() {

        //Default key combination. (CTRL + SPACE)
        var CTRL = 1114112;

        return _.merge(newBaseFieldObject(), {
          label: 'CKEditor',
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
        });
      }

      function defaultCKEditorPrefix() {

        return '${';
      }

      function defaultCKEditorSuffix() {

        return '}';
      }

      /**
       * Remove row from grid.
       * @param grid Table
       * @param index Row index to remove.
       */
      function removeRow(grid, index) {
        if (grid.length > 1) {
          dialogs.confirm('Confirm!!!', 'Do you want to remove this row?',
            {
              size: 'sm',
              windowClass: 'ods-dialog'
            })
            .result
            .then(function () {
              grid.splice(index, 1);
            });
          return;
        }
        dialogs.notify('Information', 'At least one row must exist.',
          {
            size: 'sm',
            windowClass: 'ods-dialog'
          })
          .result
          .then(function () {
          });
      }

      /**
       * remove column to from table.
       * @param table Table
       * @param index Column index to remove.
       */
      function removeColumn(table, index) {

        if (table.matrix[0].length > 1) {
          dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
            {
              size: 'sm',
              windowClass: 'ods-dialog'
            })
            .result
            .then(function () {

              for (var i = 0; i < table.matrix.length; i++) {
                table.matrix[i].splice(index, 1);
              }
            });
        } else {
          dialogs.notify('Information', 'At least one column must exist.',
            {
              size: 'sm',
              windowClass: 'ods-dialog'
            })
            .result
            .then(function () {
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
            //We clean the field linked value.
            row[i].fields[j].linkedTo = '';
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
            } else {
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
          'query': {
            method: 'GET',
            isArray: true
          },
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

        if (comp.componentType === OdsComponentType.FIELD) {
          comp.name = generateName(comp.componentType);
          if (comp.type === OdsFieldType.TABLE) {
            _.forEach(comp.matrix, function (rows) {
              _.forEach(rows, function (column) {
                column.name = generateName(column.componentType);
              });
            });
          }
          return comp;
        } else {
          return uniqueCounter;
        }
      }

      function saveFormData(schema) {

        var formData = {
          formName: schema.name,
          formLabel: schema.label,
          formDescription: schema.description,
          fields: []
        };

        formData.fields.concat(getDataFromComponentCode(schema, false, null));
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
        _.forEach(schema.layout, function (item) {
          if (item && item.exportable) {
            form.layout.push(item);
          }
        });

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

      /**
       * Get fields data from schema by code.
       * @param schema Form schema.
       * @param code Code to fin in the schema.
       * @param filter Boolean to specify if filter or not.
       * @returns {Array}
       */
      function getDataFromComponentCode(schema, filter, code) {

        var fields = [];

        _.forEach(schema.layout, function (item) {
          var rows = item.rows;
          _.forEach(rows, function (row) {
            var cols = row.cols;
            _.forEach(cols, function (columnRow) {
              _.forEach(columnRow.fields, function (field) {
                if (field.type === OdsFieldType.TABLE) {
                  getDataFromTablePlugin(fields, field, filter, code);
                } else {
                  getDataFromField(fields, field, filter, code);
                }
              });
            });
          });
        });

        return fields;
      }

      function getDataFromTablePlugin(result, field, filter, code) {

        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0) {
              getDataFromField(result, matrixColumn.fields[0], filter, code);
            }
          });
        });
      }

      function getDataFromField(result, field, filter, code) {

        field = {
          name: field.name,
          type: field.type,
          code: field.code,
          value: field.value
        };
        if (filter) {
          if (field.code === code) {
            result.push(field);
          }
        } else {
          result.push(field);
        }
      }

      /**
       * Deserialize the json schema into schema object and parse
       * the datetime field value from string into a Date valid object.
       * @param json The json form schema.
       * @returns {Object|Array|string|number}
       */
      function convertFormSchema(schema) {

        if (schema) {
          _.forEach(schema.layout, function (item) {
            var rows = item.rows;
            _.forEach(rows, function (row) {
              var cols = row.cols;
              _.forEach(cols, function (columnRow) {
                _.forEach(columnRow.fields, function (field) {
                  if (field.type === OdsFieldType.TABLE) {
                    convertTablePlugin(field);
                  } else {
                    initDateTimeField(field);
                  }
                });
              });
            });
          });
        }

        return schema;
      }

      /**
       * Deserialize the json schema into schema object and parse
       * the datetime field value from string into a Date valid object.
       * @param json The json form schema.
       * @returns {Object|Array|string|number}
       */
      function convertFormSchemaFromServer(json) {

        var schema = angular.fromJson(json);
        return convertFormSchema(schema);
      }

      /**
       * Initialize the DateTime field from text using Date parsing.
       * @param field DateTime field.
       */
      function initDateTimeField(field) {

        //If field is datetime we set Date object from string
        if (field.type === OdsFieldType.DATETIME) {
          if (field.value !== null) {
            field.value = new Date(Date.parse(field.value));
          }
        }
      }

      /**
       * Util function that serialize schema matrix plugin
       * @param field Field of type OdsFieldType.TABLE
       */
      function convertTablePlugin(field) {

        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0) {
              initDateTimeField(matrixColumn.fields[0]);
            }
          });
        });
      }

      /**
       * This method make all fields in the schema read only or not.
       * @param json
       * @param status
       * @return {Object|Array|string|number}
       */
      function setReadOnlyStatus(json, status) {

        var schema = angular.fromJson(json);
        _.forEach(schema.layout, function (item) {
          var rows = item.rows;
          _.forEach(rows, function (row) {
            var cols = row.cols;
            _.forEach(cols, function (columnRow) {
              _.forEach(columnRow.fields, function (field) {
                if (field.type === OdsFieldType.TABLE) {
                  setStatusToTablePlugin(field, status);
                } else {
                  setStatusToField(field, status);
                }
              });
            });
          });
        });

        return schema;
      }

      function setStatusToTablePlugin(field, status) {

        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0) {
              setStatusToField(matrixColumn.fields[0], status);
            }
          });
        });
      }

      function setStatusToField(field, status) {

        field.readonly = status;
      }

      /**
       * Inject config to CKEditor in the Schema.
       * @param schema The Schema object.
       * @param config The CKEditor configuration.
       */
      function setConfigToCKEditorComponent(schema, config) {

        if (schema && schema.layout && config) {
          _.forEach(schema.layout, function (item) {
            var rows = item.rows;
            _.forEach(rows, function (row) {
              var cols = row.cols;
              _.forEach(cols, function (columnRow) {
                _.forEach(columnRow.fields, function (field) {
                  if (field.type === OdsFieldType.TABLE) {
                    setConfigToCKEditorInTablePlugin(field, config);
                  } else {
                    setConfigToCKEditorField(field, config);
                  }
                });
              });
            });
          });
        }
      }

      /**
       * Inject config to CKEditor in the Table plugin field.
       * @param field The field object.
       * @param config The CKEditor configuration.
       */
      function setConfigToCKEditorInTablePlugin(field, config) {
        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0 &&
              matrixColumn.fields[0].type === OdsFieldType.CKEDITOR) {
              setConfigToCKEditorField(matrixColumn.fields[0], config);
            }
          });
        });
      }

      /**
       * Inject config to CKEditor into the field.
       * @param field The field object.
       * @param config The CKEditor configuration.
       */
      function setConfigToCKEditorField(field, config) {

        if (config.ckeditor) {
          if (field.type === OdsFieldType.CKEDITOR) {
            field.options.prefix = config.ckeditor.prefix ?
              config.ckeditor.prefix : defaultCKEditorPrefix();
            field.options.suffix = config.ckeditor.suffix ?
              config.ckeditor.suffix : defaultCKEditorSuffix();
            if (config.ckeditor.suggestions) {
              field.options.suggestions = config.ckeditor.suggestions;
            }
            if (config.ckeditor.suggestionsUrl) {
              field.options.suggestionsUrl = config.ckeditor.suggestionsUrl;
            }
            if (config.ckeditor.tokens) {
              field.options.tokens = config.ckeditor.tokens;
            }
          }
        }
      }

      /**
       * This method clone Section.
       * @param schema
       * @param section
       * @param position
       * @param clonedCanClone
       * @return {Object|Array|string|number}
       */
      function cloneSection(schema, section, clonedCanClone, position) {

        var cloneSection = angular.copy(section);
        cloneSection.name = generateName(cloneSection.componentType);
        cloneSection.canClone = clonedCanClone;
        cloneSection.clonedCanClone = clonedCanClone;
        _.forEach(cloneSection.rows, function (row) {
          row.name = generateName(row.componentType);
          _.forEach(row.cols, function (columnRow) {
            columnRow.name = generateName(columnRow.componentType);
            _.forEach(columnRow.fields, function (field) {
              if (field.type === OdsFieldType.TABLE) {
                //We must to repeat the process because is a table.
                _.forEach(field.matrix, function (matrixRow) {
                  matrixRow.name = generateName(OdsComponentType.ITEM);
                  _.forEach(matrixRow, function (matrixColumn) {
                    if (matrixColumn.fields.length > 0) {
                      matrixColumn.fields[0].name =
                        generateName(matrixColumn.fields[0].componentType);
                    }
                  });
                });
              } else {
                field.name = generateName(field.componentType);
              }
            });
          });
        });

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

)
();
