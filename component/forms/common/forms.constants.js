(function () {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsFieldType', {
            'DATE': 'date',
            'TEXT': 'text',
            'NUMBER': 'number',
            'PASSWORD': 'password',
            'TEXTAREA': 'textarea',
            'TOGGLE': 'toggle',
            'SELECT': 'select',
            'MULTI_SELECT': 'multi_select'
            //You can add your new field types
        })
        .constant('OdsComponentType', {
            'SECTION': 'section', //Do not edit this type
            'ROW': 'row', //Do not edit this type
            'COLUMN': 'column', //Do not edit this type
            'FIELD': 'field' //Do not edit this type
        });
})();