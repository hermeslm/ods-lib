export default class FormsService {
  constructor(OdsFieldType, OdsComponentType, OdsDateTimeFormat, $window, dialogs,
    $resource, OdsPosition, EventDataFactory, OdsEvent) {
    this.fieldType = OdsFieldType;
    this.componentType = OdsComponentType;
    this.dateTimeFormat = OdsDateTimeFormat;
    this.position = OdsPosition;
    this.eventDataFactory = EventDataFactory;
    this.event = OdsEvent;

    this.$window = $window;
    this.dialogs = dialogs;
    this.$resource = $resource;

    this.uniqueCounter = (+new Date()) % 10000;
    this.version = '1.0';
    this.clipBoard = [];
    this.callbacks = [];
    this.formats = { JSON: 'json' };
  }

  /**
   * Create a new Schema.
   */
  newSchema() {
    return {
      name: this.generateName(this.componentType.FORM),
      label: 'New Form',
      hideLabel: true,
      description: 'New Form Description',
      layout: [this.newSectionObject()],
      allowedTypes: [this.componentType.SECTION],
    };
  }

  /**
   * Create a new Schema.
   */
  newSchemaEmpty() {
    return {
      name: this.generateName(this.componentType.FORM),
      label: 'New Form',
      hideLabel: true,
      description: 'New Form Description',
      layout: [],
      allowedTypes: [this.componentType.SECTION],
    };
  }

  /**
   * Import Schema.
   */
  importForm(file) {
    const base64result = file.substr(file.indexOf(',') + 1);
    const decodedString = atob(base64result);
    if (decodedString && decodedString.length > 0) {
      const loadedFile = angular.fromJson(decodedString);
      loadedFile.form = this.convertFormSchema(loadedFile.form);
      return loadedFile;
    }
    console.error('Not valid JSON file!!!');
  }

  /**
   * Export Schema.
   */
  exportForm(schema) {
    const exportObject = {
      format: this.formats.JSON,
      version: this.version,
      form: schema,
    };

    const now = new Date();
    this.downloadObjectAsJson(exportObject, `${schema.label} ${now.getFullYear()}-${
      now.getMonth()}-${now.getDate()}`);
  }

  /**
   * Download schema as JSON
   * @param exportObj
   * @param exportName
   */
  downloadObjectAsJson(exportObj, exportName) {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${exportName}.json`);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  checkUpload() {
    // Check for the various File API support.
    if (this.$window.File && this.$window.FileReader
      && this.$window.FileList && this.$window.Blob) {
      // Great success! All the File APIs are supported.
      return true;
    }
    alert('The File APIs are not fully supported in this browser.');
    return false;
  }

  /**
   * This method allows to import a subform into th schema
   * @param subForm
   */
  importSubForm(subForm) {
    // TODO check subform syntax.
    this.eventDataFactory.setData(this.event.LOAD_SUB_FORM, subForm);
  }

  /**
   * Generate object name by type.
   * @param type Object type.
   * @returns
   */
  generateName(type) {
    this.uniqueCounter += 1;
    switch (type) {
      case this.componentType.FORM:
        return `form${this.uniqueCounter}`;
      case this.componentType.SECTION:
        return `section${this.uniqueCounter}`;
      case this.componentType.ROW:
        return `row${this.uniqueCounter}`;
      case this.componentType.COLUMN:
        return `column${this.uniqueCounter}`;
      case this.componentType.FIELD:
        return `field${this.uniqueCounter}`;
      case this.componentType.ITEM:
        return `item${this.uniqueCounter}`;
      case this.this.componentType.PLUGIN:
        return `plugin${this.uniqueCounter}`;
      default:
        return this.uniqueCounter;
    }
  }

  /**
   * Catch onAdd event in drag and drop for setting field properties,
   * we only set field name and datetime for now.
   *
   * @param item Field
   * @param type Field type.
   */
  onAdd(item, type) {
    if (type === this.componentType.FIELD) {
      item.name = this.generateName(this.componentType.FIELD);
      if (item.type === this.fieldType.DATETIME) {
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
  initSchema(schema) {
    if (schema) {
      schema.allowedTypes = [this.componentType.SECTION];

      for (let i = 0; i < schema.layout.length; i++) {
        schema.layout[i].displayProperties = false;
        schema.layout[i].allowedTypes = [this.componentType.ROW];
        for (let j = 0; j < schema.layout[i].rows.length; j++) {
          schema.layout[i].rows[j].displayProperties = false;
          for (let k = 0; k < schema.layout[i].rows[j].cols.length; k++) {
            schema.layout[i].rows[j].cols[k].allowedTypes = [this.componentType.FIELD];
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
  getToolbarComponent(component) {
    switch (component.componentType) {
      case this.componentType.SECTION:
        return 'forms/toolbar/components/section.html';
      case this.componentType.FIELD:
        switch (component.type) {
          case this.fieldType.TEXT:
            return 'forms/toolbar/components/input.html';
          case this.fieldType.NUMBER:
            return 'forms/toolbar/components/input.html';
          case this.fieldType.PASSWORD:
            return 'forms/toolbar/components/input.html';
          case this.fieldType.TEXTAREA:
            return 'forms/toolbar/components/textarea.html';
          case this.fieldType.SELECT:
            return 'forms/toolbar/components/select.html';
          case this.fieldType.SELECT2:
            return 'forms/toolbar/components/select.html';
          case this.fieldType.MULTI_SELECT:
            return 'forms/toolbar/components/multi-select.html';
          case this.fieldType.TOGGLE:
            return 'forms/toolbar/components/toggle.html';
          case this.fieldType.DATETIME:
            return 'forms/toolbar/components/datetime.html';
          case this.fieldType.IF_YES:
            return 'forms/toolbar/plugins/if-yes.html';
          case this.fieldType.TABLE:
            return 'forms/toolbar/plugins/table.html';
          case this.fieldType.LABEL:
            return 'forms/toolbar/components/label.html';
          case this.fieldType.CHECKBOX:
            return 'forms/toolbar/components/checkbox.html';
          case this.fieldType.CHECKBOX_LIST:
            return 'forms/toolbar/components/checkbox-list.html';
          case this.fieldType.RADIO:
            return 'forms/toolbar/components/radio-list.html';
          case this.fieldType.CKEDITOR:
            return 'forms/toolbar/components/ckeditor.html';
          default:
            return 'forms/toolbar/components/no-component.html';
        }
      default:
        return 'forms/toolbar/components/no-component.html';
    }
  }

  /**
   * Return field template for Schema View
   * @param field Field
   * @returns {*}
   */
  getSchemaField(field) {
    switch (field.type) {
      case this.fieldType.TEXT:
        return 'forms/schema/components/input.html';
      case this.fieldType.NUMBER:
        return 'forms/schema/components/input.html';
      case this.fieldType.PASSWORD:
        return 'forms/schema/components/input.html';
      case this.fieldType.TEXTAREA:
        return 'forms/schema/components/textarea/textarea.html';
      case this.fieldType.SELECT:
        return 'forms/schema/components/select/select.html';
      case this.fieldType.SELECT2:
        return 'forms/schema/components/select2/select2.html';
      case this.fieldType.MULTI_SELECT:
        return 'forms/schema/components/multi-select/multi-select.html';
      case this.fieldType.TOGGLE:
        return 'forms/schema/components/toggle/toggle.html';
      case this.fieldType.DATETIME:
        return 'forms/schema/components/datetime/datetime.html';
      case this.fieldType.IF_YES:
        return 'forms/schema/plugins/if-yes/if-yes.html';
      case this.fieldType.TABLE:
        return 'forms/schema/plugins/table/container.html';
      case this.fieldType.LABEL:
        return 'forms/schema/components/label.html';
      case this.fieldType.CHECKBOX:
        return 'forms/schema/components/checkbox/checkbox.html';
      case this.fieldType.CHECKBOX_LIST:
        return 'forms/schema/components/checkbox-list/checkbox-list.html';
      case this.fieldType.RADIO:
        return 'forms/schema/components/radio-list/radio-list.html';
      case this.fieldType.CKEDITOR:
        return 'forms/schema/plugins/ckeditor/ckeditor.html';
      default:
        return 'forms/schema/components/no-field.html';
    }
  }

  /**
   * Return field properties template for Schema View
   * @param field Field
   * @returns {*}
   */
  getSchemaFieldProperties(field) {
    switch (field.type) {
      case this.fieldType.TEXT:
        return 'forms/schema/components/text/text-properties.html';
      case this.fieldType.NUMBER:
        return 'forms/schema/components/number/number-properties.html';
      case this.fieldType.PASSWORD:
        return 'forms/schema/components/password/password-properties.html';
      case this.fieldType.TEXTAREA:
        return 'forms/schema/components/textarea/textarea-properties.html';
      case this.fieldType.SELECT:
        return 'forms/schema/components/select/select-properties.html';
      case this.fieldType.SELECT2:
        return 'forms/schema/components/select/select-properties.html';
      case this.fieldType.MULTI_SELECT:
        return 'forms/schema/components/multi-select/multi-select-properties.html';
      case this.fieldType.TOGGLE:
        return 'forms/schema/components/toggle/toggle-properties.html';
      case this.fieldType.DATETIME:
        return 'forms/schema/components/datetime/datetime-properties.html';
      case this.fieldType.IF_YES:
        return 'forms/schema/plugins/if-yes/if-yes-properties.html';
      case this.fieldType.TABLE:
        return 'forms/schema/plugins/table/table-properties.html';
      case this.fieldType.LABEL:
        return 'forms/schema/components/label/label-properties.html';
      case this.fieldType.CHECKBOX:
        return 'forms/schema/components/checkbox/checkbox-properties.html';
      case this.fieldType.CHECKBOX_LIST:
        return 'forms/schema/components/checkbox-list/checkbox-list-properties.html';
      case this.fieldType.RADIO:
        return 'forms/schema/components/radio-list/radio-list-properties.html';
      case this.fieldType.CKEDITOR:
        return 'forms/schema/plugins/ckeditor/ckeditor-properties.html';
      default:
        return 'forms/schema/components/no-field-properties.html';
    }
  }

  /**
   * Return field template for each field type in Form View
   * @param fieldType Field type
   * @returns {*}
   */
  getFormFieldTemplate(fieldType) {
    switch (fieldType) {
      case this.fieldType.TEXT:
        return 'forms/common/fields/input.html';
      case this.fieldType.NUMBER:
        return 'forms/common/fields/input.html';
      case this.fieldType.PASSWORD:
        return 'forms/common/fields/input.html';
      case this.fieldType.DATE:
        return 'forms/common/fields/date.html';
      case this.fieldType.TEXTAREA:
        return 'forms/common/fields/textarea.html';
      case this.fieldType.TOGGLE:
        return 'forms/common/fields/toggle.html';
      case this.fieldType.SELECT:
        return 'forms/common/fields/select.html';
      case this.fieldType.SELECT2:
        return 'forms/common/fields/select2.html';
      case this.fieldType.MULTI_SELECT:
        return 'forms/common/fields/multi-select.html';
      case this.fieldType.DATETIME:
        return 'forms/common/fields/datetime.html';
      case this.fieldType.IF_YES:
        return 'forms/common/fields/plugins/if-yes.html';
      case this.fieldType.TABLE:
        return 'forms/common/fields/plugins/table.html';
      case this.fieldType.LABEL:
        return 'forms/common/fields/label-empty.html';
      case this.fieldType.CHECKBOX:
        return 'forms/common/fields/checkbox.html';
      case this.fieldType.CHECKBOX_LIST:
        return 'forms/common/fields/checkbox-list.html';
      case this.fieldType.RADIO:
        return 'forms/common/fields/radio-list.html';
      case this.fieldType.CKEDITOR:
        return 'forms/common/fields/plugins/ckeditor.html';
      default:
        return 'forms/common/fields/no-field.html';
    }
  }

  /**
   * Return field template for each field type in Form Viewer
   * @param fieldType Field type
   * @returns {*}
   */
  getFormViewerTemplate(fieldType) {
    switch (fieldType) {
      case this.fieldType.TEXT:
        return 'forms/common/viewer/input.html';
      case this.fieldType.NUMBER:
        return 'forms/common/viewer/input.html';
      case this.fieldType.PASSWORD:
        return 'forms/common/viewer/input.html';
      case this.fieldType.DATE:
        return 'forms/common/viewer/input.html';
      case this.fieldType.TEXTAREA:
        return 'forms/common/viewer/input.html';
      case this.fieldType.TOGGLE:
        return 'forms/common/viewer/toggle.html';
      case this.fieldType.SELECT:
        return 'forms/common/viewer/select.html';
      case this.fieldType.SELECT2:
        return 'forms/common/viewer/select.html';
      case this.fieldType.MULTI_SELECT:
        return 'forms/common/viewer/multi-select.html';
      case this.fieldType.DATETIME:
        return 'forms/common/viewer/datetime.html';
      case this.fieldType.IF_YES:
        return 'forms/common/viewer/plugins/if-yes.html';
      case this.fieldType.TABLE:
        return 'forms/common/viewer/plugins/table.html';
      case this.fieldType.LABEL:
        return 'forms/common/fields/label-empty.html';
      case this.fieldType.CHECKBOX:
        return 'forms/common/viewer/checkbox.html';
      case this.fieldType.CHECKBOX_LIST:
        return 'forms/common/viewer/checkbox-list.html';
      case this.fieldType.RADIO:
        return 'forms/common/viewer/radio-list.html';
      case this.fieldType.CKEDITOR:
        return 'forms/common/viewer/plugins/ckeditor.html';
      default:
        return 'forms/common/viewer/no-template.html';
    }
  }

  /**
   * Return pattern list.
   * @returns [null,null,null,null,null,null,null,null,null,null,null,null] list.
   */
  getValidationPatterns() {
    return [
      {
        value: 0,
        pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
        title: 'Url',
        group: 'url',
      }, {
        value: 1,
        pattern: '^([a-z][a-z0-9\\-]+(\\.|\\-*\\.))+[a-z]{2,6}$',
        title: 'Domain',
        group: 'domain',
      }, {
        value: 2,
        pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
        title: 'IPv4 Address',
        group: 'ip',
      }, {
        value: 3,
        pattern: '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
        title: 'Email Address',
        group: 'email',
      }, {
        value: 4,
        pattern: '^-{0,1}\\d+$',
        title: 'Integer',
        group: 'numeric',
      }, {
        value: 5,
        pattern: '^\\d+$',
        title: 'Positive Integer',
        group: 'numeric',
      }, {
        value: 6,
        pattern: '^-\\d+$',
        title: 'Negative Integer',
        group: 'numeric',
      }, {
        value: 7,
        pattern: '^-{0,1}\\d*\\.{0,1}\\d+$',
        title: 'Number',
        group: 'numeric',
      }, {
        value: 8,
        pattern: '^\\d*\\.{0,1}\\d+$',
        title: 'Positive Number',
        group: 'numeric',
      }, {
        value: 9,
        pattern: '^-\\d*\\.{0,1}\\d+$',
        title: 'Negative Number',
        group: 'numeric',
      }, {
        value: 10,
        pattern: '^(19|20)[\\d]{2,2}$',
        title: 'Year (1920-2099)',
        group: 'numeric',
      }, {
        value: 11,
        pattern: '(?=.*\\d)(?=.*[!@#$%^&*\\-=()|?."\';:]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
        title: 'Password',
        group: 'password',
      },
    ];
  }

  getDateTimeFormats() {
    const object = this.dateTimeFormat;
    const formats = [];
    const keys = Object.keys(object);
    keys.forEach((key) => {
      const format = {
        value: object[key],
        option: key,
      };
      formats.push(format);
    });

    return formats;
  }

  /**
   * Create a new Section Object.
   * @returns
   */
  newSectionObject() {
    return {
      name: this.generateName(this.componentType.SECTION),
      componentType: this.componentType.SECTION,
      title: 'Section',
      isExportable: false,
      displayProperties: false,
      hideLabel: false,
      allowedTypes: [
        this.componentType.ROW,
      ],
      rows: [this.newRowObject()],
    };
  }

  /**
   * Create a new Row Object.
   * @returns
   */
  newRowObject() {
    return {
      name: this.generateName(this.componentType.ROW),
      componentType: this.componentType.ROW,
      cssClass: 'row',
      displayProperties: false,
      cols: [this.newColumnObject(12)],
    };
  }

  /**
   * Create a new Column Object.
   * @param colWidth Width of column.
   * @returns {{allowedTypes: string[], cssClass: string, name: (*|number), fields: Array}}
   */
  newColumnObject(colWidth) {
    return {
      name: this.generateName(this.componentType.COLUMN),
      cssClass: ` col-xs-${colWidth} col-sm-${colWidth} col-md-${colWidth} col-lg-${colWidth}`,
      allowedTypes: [
        this.componentType.FIELD,
      ],
      fields: [],
    };
  }

  /**
   * Create a new base Field Object.
   * @returns
   */
  newBaseFieldObject() {
    return {
      componentType: this.componentType.FIELD,
      name: this.generateName(this.componentType.FIELD),
      required: false,
      exportable: false,
      linkedTo: null,
    };
  }

  /**
   * Create a new Field Text Object.
   * @returns
   */
  newFieldTextObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'TextBox',
      placeholder: '',
      type: this.fieldType.TEXT,
      value: null,
      validation: {
        messages: {},
      },
    });
  }

  /**
   * Create a new Field Number Object.
   * @returns
   */
  newFieldNumberObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Number',
      placeholder: '',
      type: this.fieldType.NUMBER,
      value: null,
      validation: {
        messages: {},
      },
    });
  }

  /**
   * Create a new Field Password Object.
   * @returns
   */
  newFieldPasswordObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Password',
      placeholder: '',
      type: this.fieldType.PASSWORD,
      value: null,
      validation: {
        messages: {},
      },
    });
  }

  /**
   * Create a new Field Textarea Object.
   * @returns
   */
  newFieldTextareaObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Textarea',
      placeholder: '',
      type: this.fieldType.TEXTAREA,
      rows: 3,
      value: null,
      validation: {
        messages: {},
      },
    });
  }

  /**
   * Create a new Field Select Object
   * @returns Select Object
   */
  newFieldSelectObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Select',
      placeholder: '',
      type: this.fieldType.SELECT,
      valueField: 'id',
      titleField: 'name',
      limitTo: 10,
      value: null,
      options: [{
        id: 1,
        name: 'Option 1',
      }, {
        id: 2,
        name: 'Option 2',
      }, {
        id: 3,
        name: 'Option 3',
      }],
      validation: {
        messages: {},
      },
    });
  }

  /**
   * Create a new Field Select2 Object
   * @returns
   */
  newFieldSelect2Object() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Select2',
      placeholder: '',
      type: this.fieldType.SELECT2,
      multiSelect: false,
      valueField: 'id',
      titleField: 'name',
      limitTo: 10,
      value: null,
      options: [{
        id: 1,
        name: 'Option 1',
      }, {
        id: 2,
        name: 'Option 2',
      }, {
        id: 3,
        name: 'Option 3',
      }],
      validation: {
        messages: {},
      },
    });
  }

  /**
   * Create a new Field Multiselect Object
   * @returns
   */
  newFieldMultiSelectObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Multi select',
      placeholder: '',
      type: this.fieldType.MULTI_SELECT,
      multiSelect: true,
      valueField: 'id',
      titleField: 'name',
      limitTo: 10,
      value: [],
      options: [{
        id: 1,
        name: 'Option 1',
      }, {
        id: 2,
        name: 'Option 2',
      }, {
        id: 3,
        name: 'Option 3',
      }],
      render: null,
      validation: {
        messages: {},
      },
    });
  }

  /**
   * Create a new Field Toggle Object
   * @returns
   */
  newFieldToggleObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Toggle',
      type: this.fieldType.TOGGLE,
      ln: false,
      on: 'Yes',
      off: 'No',
      value: false,
    });
  }


  newDateTimeObject() {
    const today = new Date();
    const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(),
      today.getDate(), 9, 0, 0));
    return _.merge(this.newBaseFieldObject(), {
      label: 'DateTime',
      type: this.fieldType.DATETIME,
      enableTime: false,
      format: this.dateTimeFormat.ShortDateLongYear,
      selectedFormat: this.dateTimeFormat.ShortDateLongYear,
      modelOptions: {
        timezone: this.getTimeZoneUTC(),
      },
      openInEditMode: false,
      // utc: true,
      value: date,
      validation: {
        datetime: false,
        messages: {
          datetime: 'Invalid Date or Time.',
        },
      },
    });
  }


  newFieldLabelObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Label',
      cssClass: 'text-left',
      type: this.fieldType.LABEL,
      value: 'Label',
    });
  }


  newFieldCheckBoxObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'CheckBox',
      hideLabel: true,
      ln: false,
      type: this.fieldType.CHECKBOX,
      value: false,
    });
  }


  newFieldCheckBoxListObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'CheckBox List',
      type: this.fieldType.CHECKBOX_LIST,
      inline: false,
      options: [{
        id: 1,
        name: 'Option 1',
      }, {
        id: 2,
        name: 'Option 2',
      }, {
        id: 3,
        name: 'Option 3',
      }],
      value: {},
    });
  }


  newFieldRadioListObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Radiobutton List',
      type: this.fieldType.RADIO,
      options: [{
        id: 1,
        name: 'Option 1',
      }, {
        id: 2,
        name: 'Option 2',
      }, {
        id: 3,
        name: 'Option 3',
      }],
      value: {},
    });
  }


  newYesNoObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'If yes:',
      type: this.fieldType.IF_YES,
      ln: false,
      on: 'Yes',
      off: 'No',
      value: {
        toggle: false,
        textarea: null,
      },
      placeholder: '',
      validation: {
        messages: {},
      },
    });
  }


  newTableObject() {
    return _.merge(this.newBaseFieldObject(), {
      label: 'Table',
      type: this.fieldType.TABLE,
      cssClass: 'table table-bordered',
      matrix: [
        [this.newItemObject(), this.newItemObject()],
      ],
      validation: {
        messages: {},
      },
    });
  }


  newItemObject() {
    return {
      name: this.generateName(this.componentType.ITEM),
      fields: [],
      // width: '10px',
      allowedTypes: [this.componentType.FIELD],
    };
  }


  newCKEditorObject() {
    // Default key combination. (CTRL + SPACE)
    const CTRL = 1114112;

    return _.merge(this.newBaseFieldObject(), {
      label: 'CKEditor',
      type: this.fieldType.CKEDITOR,
      readonly: false,
      printView: false,
      options: {
        triggerKeyCode: CTRL + 32,
        prefix: this.defaultCKEditorPrefix(),
        suffix: this.defaultCKEditorSuffix(),
        suggestionsUrl: '',
        tokensUrl: '',
        locked: true,
        suggestions: [{
          id: 'suggestion1',
          label: 'Suggestion1',
        }, {
          id: 'suggestion2',
          label: 'Suggestion2',
        }, {
          id: 'suggestion3',
          label: 'Suggestion3',
        }],
        tokens: null,
      },
      value: null,
    });
  }


  defaultCKEditorPrefix() {
    return '${';
  }


  defaultCKEditorSuffix() {
    return '}';
  }

  /**
   * Remove row from table.
   * @param table Table
   * @param index Row index to remove.
   */
  removeRow(table, index) {
    if (table.matrix.length > 1) {
      this.dialogs.confirm('Confirm!!!', 'Do you want to remove this row?',
        { size: 'sm', windowClass: 'ods-dialog' }).result.then(() => {
        table.matrix.splice(index, 1);
      });
    } else {
      this.dialogs.notify('Information', 'At least one row must exist.',
        { size: 'sm', windowClass: 'ods-dialog' }).result.then(() => {
      });
    }
  }

  /**
   * remove column to from table.
   * @param table Table
   * @param index Column index to remove.
   */
  removeColumn(table, index) {
    if (table.matrix[0].length > 1) {
      this.dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
        { size: 'sm', windowClass: 'ods-dialog' }).result.then(() => {
        for (let i = 0; i < table.matrix.length; i++) {
          table.matrix[i].splice(index, 1);
        }
      });
    } else {
      this.dialogs.notify('Information', 'At least one column must exist.',
        { size: 'sm', windowClass: 'ods-dialog' }).result.then(() => {
      });
    }
  }

  /**
   * Clone the last row in table and add it as a new row.
   * @param table Table
   */
  cloneRow(table) {
    // copy last row in table
    const row = angular.copy(table.matrix[table.matrix.length - 1]);
    // set new name for every field in row.
    for (let i = 0; i < row.length; i++) {
      row[i].name = this.generateName(this.componentType.ITEM);
      for (let j = 0; j < row[i].fields.length; j++) {
        row[i].fields[j].name = this.generateName(this.componentType.FIELD);
      }
    }
    table.matrix.push(row);
  }


  getTimeZoneUTC() {
    return 'UTC/GMT';
  }

  getFieldValueAsNumber(field) {
    let value = 0;
    let id;
    switch (field.type) {
      case this.fieldType.SELECT
      || this.fieldType.SELECT2:
        if (field.value) {
          id = this.getSelectFieldId(field);
          value += Number(field.value[id]);
        }
        break;
      case this.fieldType.MULTI_SELECT:
        if (field.value) {
          id = this.getSelectFieldId(field);
          for (let i = 0; i < field.value.length; i++) {
            value += Number(field.value[i][id]);
          }
        }
        break;
      case this.fieldType.LABEL:
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

  getSelectFieldId(field) {
    const defaultId = 'id';
    if (field) {
      return field.valueField !== undefined ? field.valueField : defaultId;
    }
    return defaultId;
  }

  getSelectFieldTitle(field) {
    const defaultName = 'name';
    if (field) {
      return field.titleField !== undefined ? field.titleField : defaultName;
    }
    return defaultName;
  }

  getSelectFieldTitleValue(field, element) {
    if (field) {
      if (field.render && element && element.constructor !== Array) {
        return field.render(element);
      }
      if (element && element.constructor !== Array) {
        return field.titleField !== undefined ? element[field.titleField] : element.name;
      }
      return field.placeholder;
    }
    return field.placeholder;
  }

  getSelectFieldIdValue(field, element) {
    let value = field.placeholder;
    if (field) {
      if (element && element.constructor !== Array) {
        value = field.valueField !== undefined ? element[field.valueField] : element.id;
      }
    } else {
      value = field.placeholder;
    }
    return value;
  }

  copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData('Text', text);
    }
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      const textarea = document.createElement('textarea');
      textarea.textContent = text;
      textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand('copy'); // Security exception may be thrown by some browsers.
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
  strSubtitutor(str, valuesMap, prefix, suffix) {
    let strResult = '';
    if (str) {
      strResult = str;
      const keys = Object.keys(valuesMap);
      keys.forEach((key) => {
        const re = new RegExp(this.escapeRegExp(prefix + key + suffix), 'gi');
        strResult = strResult.replace(re, valuesMap[key]);
      });
    }

    return strResult;
  }

  restResource(resourceUrl) {
    return this.$resource(resourceUrl, {}, {
      query: { method: 'GET', isArray: true },
      get: {
        method: 'GET',
        transformResponse(data) {
          if (data) {
            return angular.fromJson(data);
          }
          return data;
        },
      },
    });
  }

  getClipBoard() {
    return this.clipBoard;
  }

  setClipBoard(cb) {
    this.clipBoard = cb;
    // notify if there are any listeners
    this.callbacks.forEach((callBack) => {
      callBack(this.clipBoard);
    });
  }

  addToClipBoard(item) {
    const comp = this.renameComponent(item);
    this.clipBoard.push(comp);
    // notify if there are any listeners
    this.callbacks.forEach((callBack) => {
      callBack(this.clipBoard);
    });
  }

  onAddToClipBoard(callback) {
    this.callbacks.push(callback);
  }

  escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }

  copyJson(json) {
    // $window.prompt('Copy to clipboard: Ctrl+C, Enter', json);
    this.copyToClipboard(json);
    this.$window.alert('Code copied to clipboard!!!');
  }

  renameComponent(component) {
    const comp = angular.copy(component);

    if (comp.componentType === this.componentType.FIELD) {
      comp.name = this.generateName(comp.componentType);
      if (comp.type === this.fieldType.TABLE) {
        comp.matrix.forEach((rows) => {
          rows.forEach((column) => {
            column.name = this.generateName(column.componentType);
          });
        });
      }
      return comp;
    }
    return this.uniqueCounter;
  }

  saveFormData(schema) {
    const formData = {
      formName: schema.name,
      formLabel: schema.label,
      formDescription: schema.description,
      fields: [],
    };

    formData.fields.concat(this.getDataFromComponentCode(schema, false, null));
    return formData;
  }

  saveFormSchema(schema) {
    return schema;
  }

  /**
   * Return all exportable elements embedded in a form.
   */
  getExportables(schema) {
    const form = this.newSchemaEmpty();
    _.forEach(schema.layout, (item) => {
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
  loadSubForm(schema, subForm, position) {
    const { layout } = schema;
    if (Array.isArray(layout)) {
      if (position === this.position.TOP) {
        layout.unshift(subForm);
      } else {
        layout.push(subForm);
      }
      return true;
    }
    return false;
  }

  /**
   * Get fields data from schema by code.
   * @param schema Form schema.
   * @param code Code to fin in the schema.
   * @param filter Boolean to specify if filter or not.
   * @returns {Array}
   */
  getDataFromComponentCode(schema, filter, code) {
    const fields = [];

    _.forEach(schema.layout, (item) => {
      const { rows } = item;
      _.forEach(rows, (row) => {
        const { cols } = row;
        _.forEach(cols, (columnRow) => {
          _.forEach(columnRow.fields, (field) => {
            if (field.type === this.fieldType.TABLE) {
              this.getDataFromTablePlugin(fields, field, filter, code);
            } else {
              this.getDataFromField(fields, field, filter, code);
            }
          });
        });
      });
    });

    return fields;
  }

  getDataFromTablePlugin(result, field, filter, code) {
    // We must to repeat the process because is a table.
    _.forEach(field.matrix, (matrixRow) => {
      _.forEach(matrixRow, (matrixColumn) => {
        if (matrixColumn.fields.length > 0) {
          this.getDataFromField(result, matrixColumn.fields[0], filter, code);
        }
      });
    });
  }

  getDataFromField(result, field, filter, code) {
    const tmpField = {
      name: field.name,
      type: field.type,
      code: field.code,
      value: field.value,
    };
    if (filter) {
      if (tmpField.code === code) {
        result.push(tmpField);
      }
    } else {
      result.push(tmpField);
    }
  }

  /**
   * Deserialize the json schema into schema object and parse
   * the datetime field value from string into a Date valid object.
   * @returns {Object|Array|string|number}
   * @param schema
   */
  convertFormSchema(schema) {
    if (schema) {
      _.forEach(schema.layout, (item) => {
        const { rows } = item;
        _.forEach(rows, (row) => {
          const { cols } = row;
          _.forEach(cols, (columnRow) => {
            _.forEach(columnRow.fields, (field) => {
              if (field.type === this.fieldType.TABLE) {
                this.convertTablePlugin(field);
              } else {
                this.initDateTimeField(field);
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
  convertFormSchemaFromServer(json) {
    const schema = angular.fromJson(json);
    return this.convertFormSchema(schema);
  }

  /**
   * Initialize the DateTime field from text using Date parsing.
   * @param field DateTime field.
   */
  initDateTimeField(field) {
    // If field is datetime we set Date object from string
    if (field.type === this.fieldType.DATETIME) {
      if (field.value !== null) {
        field.value = new Date(Date.parse(field.value));
      }
    }
  }

  /**
   * Util  that serialize schema matrix plugin
   * @param field Field of type fieldType.TABLE
   */
  convertTablePlugin(field) {
    // We must to repeat the process because is a table.
    _.forEach(field.matrix, (matrixRow) => {
      _.forEach(matrixRow, (matrixColumn) => {
        if (matrixColumn.fields.length > 0) {
          this.initDateTimeField(matrixColumn.fields[0]);
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
  setReadOnlyStatus(json, status) {
    const schema = angular.fromJson(json);
    _.forEach(schema.layout, (item) => {
      const { rows } = item;
      _.forEach(rows, (row) => {
        const { cols } = row;
        _.forEach(cols, (columnRow) => {
          _.forEach(columnRow.fields, (field) => {
            if (field.type === this.fieldType.TABLE) {
              this.setStatusToTablePlugin(field, status);
            } else {
              this.setStatusToField(field, status);
            }
          });
        });
      });
    });

    return schema;
  }

  setStatusToTablePlugin(field, status) {
    // We must to repeat the process because is a table.
    _.forEach(field.matrix, (matrixRow) => {
      _.forEach(matrixRow, (matrixColumn) => {
        if (matrixColumn.fields.length > 0) {
          this.setStatusToField(matrixColumn.fields[0], status);
        }
      });
    });
  }

  setStatusToField(field, status) {
    field.readonly = status;
  }

  /**
   * Inject config to CKEditor in the Schema.
   * @param schema The Schema object.
   * @param config The CKEditor configuration.
   */
  setConfigToCKEditorComponent(schema, config) {
    if (schema && schema.layout && config) {
      _.forEach(schema.layout, (item) => {
        const { rows } = item;
        _.forEach(rows, (row) => {
          const { cols } = row;
          _.forEach(cols, (columnRow) => {
            _.forEach(columnRow.fields, (field) => {
              if (field.type === this.fieldType.TABLE) {
                this.setConfigToCKEditorInTablePlugin(field, config);
              } else {
                this.setConfigToCKEditorField(field, config);
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
  setConfigToCKEditorInTablePlugin(field, config) {
    // We must to repeat the process because is a table.
    _.forEach(field.matrix, (matrixRow) => {
      _.forEach(matrixRow, (matrixColumn) => {
        if (matrixColumn.fields.length > 0
          && matrixColumn.fields[0].type === this.fieldType.CKEDITOR) {
          this.setConfigToCKEditorField(matrixColumn.fields[0], config);
        }
      });
    });
  }

  /**
   * Inject config to CKEditor into the field.
   * @param field The field object.
   * @param config The CKEditor configuration.
   */
  setConfigToCKEditorField(field, config) {
    if (config.ckeditor) {
      if (field.type === this.fieldType.CKEDITOR) {
        field.options.prefix = config.ckeditor.prefix
          ? config.ckeditor.prefix : this.defaultCKEditorPrefix();
        field.options.suffix = config.ckeditor.suffix
          ? config.ckeditor.suffix : this.defaultCKEditorSuffix();
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
  cloneSection(schema, section, clonedCanClone, position) {
    const cloneSection = angular.copy(section);
    cloneSection.name = this.generateName(cloneSection.componentType);
    cloneSection.canClone = clonedCanClone;
    cloneSection.clonedCanClone = clonedCanClone;
    _.forEach(cloneSection.rows, (row) => {
      row.name = this.generateName(row.componentType);
      _.forEach(row.cols, (columnRow) => {
        columnRow.name = this.generateName(columnRow.componentType);
        _.forEach(columnRow.fields, (field) => {
          if (field.type === this.fieldType.TABLE) {
            // We must to repeat the process because is a table.
            _.forEach(field.matrix, (matrixRow) => {
              matrixRow.name = this.generateName(this.componentType.ITEM);
              _.forEach(matrixRow, (matrixColumn) => {
                if (matrixColumn.fields.length > 0) {
                  matrixColumn.fields[0].name = this.generateName(matrixColumn.fields[0].componentType);
                }
              });
            });
          } else {
            field.name = this.generateName(field.componentType);
          }
        });
      });
    });

    position = position || this.position.DOWN;
    if (position === this.position.UP) {
      // We put over the new section
      schema.layout.unshift(cloneSection);
    } else {
      // Put above the new section
      schema.layout.push(cloneSection);
    }
    return schema;
  }
}

FormsService.$inject = ['OdsFieldType', 'OdsComponentType', 'OdsDateTimeFormat', '$window', 'dialogs',
  '$resource', 'OdsPosition', 'EventDataFactory', 'OdsEvent'];
