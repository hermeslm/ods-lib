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
            return 'forms/schema/plugins/canvas-painter/canvas-painter-properties.html';
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
            return 'forms/common/fields/plugins/canvas-painter/canvas-painter.html';
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
          readonly: false,
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
            color: '#000',
            lineWidth: 10,
            lineColors: ['#000', '#9CB199', '#CF3759', '#485247', '#E77547', '#D38E47', '#0A6A74', '#153974']
          },
          value: null
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
