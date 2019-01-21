'use strict';

angular
    .module('ods-lib', [
        'ui.bootstrap',
        'ui.toggle',
        'ui.select',
        'ui.bootstrap.datetimepicker',
        'webcam',
        // 'nzToggle',
        'dndLists',
        'ngSanitize',
        'cp.ngConfirm',
        'dialogs.main',
        // 'dialogs.default-translations',
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
    .value('version', '2.0.1')
    .run(function (/*editableOptions */) {
        // editableOptions.theme = 'bs3';
    });

configFunction.$inject = ['$rootScopeProvider', '$localStorageProvider', '$translateProvider'];

function configFunction($rootScopeProvider, $localStorageProvider, $translateProvider) {

    //We add this due to a limitation of AngularJS to avoid infinite recursion
    // or infinite loop when dirty checking the model. In our case is because template recursion.
    $rootScopeProvider.digestTtl(15);
    $localStorageProvider.setKeyPrefix('ods-');

    $translateProvider.translations('en-US', {
        DIALOGS_ERROR: "Error",
        DIALOGS_ERROR_MSG: "An unknown error has occurred.",
        DIALOGS_CLOSE: "Close",
        DIALOGS_PLEASE_WAIT: "Please Wait",
        DIALOGS_PLEASE_WAIT_ELIPS: "Please Wait...",
        DIALOGS_PLEASE_WAIT_MSG: "Waiting on operation to complete.",
        DIALOGS_PERCENT_COMPLETE: "% Complete",
        DIALOGS_NOTIFICATION: "Notification",
        DIALOGS_NOTIFICATION_MSG: "Unknown application notification.",
        DIALOGS_CONFIRMATION: "Confirmation",
        DIALOGS_CONFIRMATION_MSG: "Confirmation required.",
        DIALOGS_OK: "OK",
        DIALOGS_YES: "Yes",
        DIALOGS_NO: "No"
    });

    $translateProvider.preferredLanguage('en-US');
}
