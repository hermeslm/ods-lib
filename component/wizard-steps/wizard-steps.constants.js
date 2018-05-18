(function () {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsWizardState', {
            CURRENT: 'current',
            DONE: 'done',
            ERROR: 'error',
            DISABLED: 'disabled'
        });

})();
