'use strict';

angular
    .module('ods-lib', [
        'ui.bootstrap',
        'ui.toggle',
        'ui.select',
        'ui.bootstrap.datetimepicker',
        'webcam',
        'nzToggle',
        'dndLists',
        'ngSanitize',
        'cp.ngConfirm',
        'dialogs.main',
        'dialogs.default-translations',
        'ngMessages',
        'mgcrea.bootstrap.affix',
        '$rootScopeProvider'
    ], config)
    .value('version', '1.0');

config.$inject = ['$rootScopeProvider'];

function config($rootScopeProvider) {

    //We add this due to a limitation of AngularJS to avoid infinite recursion
    // or infinite loop when dirty checking the model. In our case is because template recursion.
    $rootScopeProvider.digestTtl(15);
}

angular
    .module('ods-lib').run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});

