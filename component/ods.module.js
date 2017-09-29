'use strict';

angular
    .module('ods-lib', [
        'ui.bootstrap',
        'ui.select',
        'webcam',
        // 'pdf',
        // 'ui.bootstrap.datetimepickerr',
        // 'datatables',
        // 'datatables.factory',
        // 'datatables.bootstrap',
        // 'datatables.colreorder',
        // 'datatables.columnfilter',
        // 'angularMoment',
        'nzToggle',
        'dndLists',
        'ngTable',
        'ngSanitize',
        'cp.ngConfirm',
        'dialogs.main',
        'dialogs.default-translations'])
    .value('version', '1.0');

