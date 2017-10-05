'use strict';

angular
    .module('ods-lib', [
        'ui.bootstrap',
        'ui.select',
        'webcam',
        'nzToggle',
        'dndLists',
        'ngTable',
        'ngSanitize',
        'cp.ngConfirm',
        'dialogs.main',
        'dialogs.default-translations',
        'ngMessages'])
    .value('version', '1.0');

