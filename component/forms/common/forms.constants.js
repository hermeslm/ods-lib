(function () {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsFieldType', {
            'DATE': 'DATE',
            'TEXT': 'TEXT',
            'NUMBER': 'NUMBER',
            'TEXTAREA': 'TEXTAREA',
            'TOGGLE': 'TOGGLE',
            'SELECT': 'SELECT',
            'MULTI_SELECT': 'MULTI_SELECT'
            //You can add your new field types
        })
        .constant('OdsComponentType', {
            'SECTION': 'section', //Do not edit this type
            'ROW': 'row', //Do not edit this type
            'COLUMN': 'column', //Do not edit this type
            'FIELD': 'field' //Do not edit this type
        });
})();
