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
        'ngResource',
        'ngStorage'
    ])
    .config(configFunction)
    .value('version', '1.0')
    .run(function (/*editableOptions */) {
        // editableOptions.theme = 'bs3';
    });

configFunction.$inject = ['$rootScopeProvider', '$localStorageProvider'];

function configFunction($rootScopeProvider, $localStorageProvider) {

    //We add this due to a limitation of AngularJS to avoid infinite recursion
    // or infinite loop when dirty checking the model. In our case is because template recursion.
    $rootScopeProvider.digestTtl(15);
    $localStorageProvider.setKeyPrefix('ods-');
}