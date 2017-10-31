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
            MULTI_SELECT: 'multiselect',
            IF_YES: 'if_yes',
            TABLE: 'table',
            LABEL: 'label',
            CHECKBOX: 'checkbox',
            CHECKBOX_LIST: 'checkboxlist',
            RADIO: 'radio'
            //You can add your new field types
        })
        .constant('OdsComponentType', {
            SECTION: 'section', //Do not edit this type
            ROW: 'row', //Do not edit this type
            COLUMN: 'column', //Do not edit this type
            FIELD: 'field', //Do not edit this type
            PLUGIN: 'plugin' //Do not edit this type
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
        });
})();