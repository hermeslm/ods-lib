/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormToolbar', OdsFormToolbar);

OdsFormToolbar.$inject = ['OdsFormService', '$uibModal', '$sce', '$q'];

function OdsFormToolbar(OdsFormService, $uibModal, $sce, $q) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/toolbar/toolbar.html',
        // scope: {
            // schema: '=',
        // },
        controller: 'OdsFormToolbarController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

    }
}
