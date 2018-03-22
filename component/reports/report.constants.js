(function () {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsParamType', {
            'DATE': 'DATE',
            'TEXT': 'TEXT',
            'NUMBER': 'NUMBER',
            'LIST': 'LIST',
            'SINGLE_SELECT': 'SINGLE_SELECT',
            'MULTI_SELECT': 'MULTI_SELECT',
            'TABLE_SELECT': 'TABLE_SELECT',
            'DRAG_AND_DROP': 'DRAG_AND_DROP',
            'CHECK_LIST': 'CHECK_LIST'
        })
        .constant('OdsPageOrientation', {
            'PORTRAIT': 'Portrait',
            'LANDSCAPE': 'Landscape'
        });

})();
