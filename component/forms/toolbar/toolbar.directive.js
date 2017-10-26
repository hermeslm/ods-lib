/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormToolbar', OdsFormToolbar);

OdsFormToolbar.$inject = ['OdsFormService'];

function OdsFormToolbar(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/toolbar/toolbar.html',
        // controller: 'OdsFormToolbarController',
        // controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.getToolbarComponent = getToolbarComponent;

        $scope.toolbar = {
            title: 'Fields Toolbar',
            groups: [{
                id: 0,
                open: false,
                disabled: false,
                title: 'Layout',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newSectionObject()
                ]
            }, {
                id: 1,
                open: false,
                disabled: false,
                title: 'Text input fields',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newFieldTextObject(),
                    OdsFormService.newFieldNumberObject(),
                    OdsFormService.newFieldPasswordObject(),
                    OdsFormService.newFieldTextareaObject()
                ]
            }, {
                id: 2,
                open: false,
                disabled: false,
                title: 'Select input fields',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newFieldSelectObject(),
                    OdsFormService.newFieldMultiSelectObject()

                ]
            }, {
                id: 3,
                open: false,
                disabled: false,
                title: 'Toggle fields',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newFieldToggleObject()
                ]
            }, {
                id: 4,
                open: false,
                disabled: false,
                title: 'DateTime fields',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newDateTimeObject()
                ]
            }, {
                id: 5,
                open: false,
                disabled: false,
                title: 'Plugins',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newYesNoObject(),
                    OdsFormService.newTableObject(),
                    OdsFormService.newFieldLabelObject()
                ]
            }]
        };

        function getToolbarComponent(componentType) {
            return OdsFormService.getToolbarComponent(componentType);
        }

    }
}
