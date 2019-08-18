'use strict';

angular
    .module('ods-lib', [
        'ui.bootstrap',
        'ui.toggle',
        'ui.select',
        'ui.bootstrap.datetimepicker',
        'dndLists',
        'ngSanitize',
        'cp.ngConfirm',
        'dialogs.main',
        'ngMessages',
        'mgcrea.bootstrap.affix',
        'ngResource',
        'ngStorage',
        'angularMoment',
        'datatables',
        'datatables.factory',
        'datatables.bootstrap',
        'datatables.colreorder',
        'uiCropper',
        'ngFileUpload',
        'pdfjsViewer',
        'ui.mask'
    ])
    .config(configFunction)
    .value('version', '3.6.0')
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
