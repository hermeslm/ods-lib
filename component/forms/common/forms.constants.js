(function () {
  'use strict';

  angular
    .module('ods-lib')
    .constant('OdsFieldType', {
      DATETIME: 'datetime',
      TEXT: 'text',
      NUMBER: 'number',
      PASSWORD: 'password',
      TEXTAREA: 'textarea',
      TOGGLE: 'toggle',
      SELECT: 'select',
      SELECT2: 'select2',
      MULTI_SELECT: 'multiselect',
      IF_YES: 'if_yes',
      IF_YES_CHECKBOX: 'if_yes_checkbox',
      IF_YES_RADIO: 'if_yes_radio',
      TABLE: 'table',
      LABEL: 'label',
      GRID_RENDER: 'grid_render',
      CHECKBOX: 'checkbox',
      CHECKBOX_LIST: 'checkboxlist',
      RADIO: 'radio',
      CKEDITOR: 'ckeditor',
      CANVAS_PAINTER: 'canvas_painter',
      OPTIONS_TEXTAREA: 'options_textarea'
      // You can add your new field types
    })
    .constant('OdsComponentType', {
      FORM: 'form', // Do not edit this type
      SECTION: 'section', // Do not edit this type
      ROW: 'row', // Do not edit this type
      COLUMN: 'column', // Do not edit this type
      FIELD: 'field', // Do not edit this type
      PLUGIN: 'plugin', // Do not edit this type
      ITEM: 'ITEM' // Do not edit this type
    })
    .constant('OdsDateTimeFormat', {
      FullDate: 'fullDate',
      LongDate: 'longDate',
      Medium: 'medium',
      MediumDate: 'mediumDate',
      MediumTime: 'mediumTime',
      Short: 'short',
      ShortDate: 'shortDate',
      ShortTime: 'shortTime',
      ISO8601Long: 'MM/dd/yyyy HH:mm:ss',
      // ISO8601Short:'Y-m-d',
      ShortDateLongYear: 'MM/dd/yyyy'
      // FullDateTime: 'l, F d, Y g:i:s A',
      // MonthDay: 'F d',
      // LongTime: 'g:i:s A',
      // UniversalSortableDateTime: 'Y-m-d H:i:sO',
      // YearMonth: 'F, Y'
    })
    .constant('OdsEvent', {
      IMPORT_FORM: 'importForm',
      EXPORT_FORM: 'exportForm',
      LOAD_SUB_FORM: 'loadSubForm'
    })
    .constant('OdsPosition', {
      TOP: 'top',
      DOWN: 'down'
    });

})();
