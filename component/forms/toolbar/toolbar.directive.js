/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormToolbar', OdsFormToolbar);

OdsFormToolbar.$inject = ['OdsFormService', '$sessionStorage', 'dialogs', 'EventDataFactory', 'OdsEvent'];

function OdsFormToolbar(OdsFormService, $sessionStorage, dialogs, EventDataFactory, OdsEvent) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/toolbar/toolbar.html',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.getToolbarComponent = getToolbarComponent;
        $scope.removeFromClipboard = removeFromClipboard;

        $scope.export = exportSchema;

        $scope.onLoad = onLoad;

        $scope.importFile = null;

        var clipboardIndex = 6;

        $scope.toolbar = {
            title: 'Fields Toolbar',
            groups: [{
                id: 0,
                open: false,
                disabled: false,
                title: 'Layout',
                icon: 'fa fa-dashboard',
                allowDelete: false,
                components: [
                    OdsFormService.newSectionObject()
                ]
            }, {
                id: 1,
                open: false,
                disabled: false,
                title: 'Text input fields',
                icon: 'fa fa-dashboard',
                allowDelete: false,
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
                allowDelete: false,
                components: [
                    OdsFormService.newFieldRadioListObject(),
                    OdsFormService.newFieldSelectObject(),
                    OdsFormService.newFieldSelect2Object(),
                    OdsFormService.newFieldMultiSelectObject()

                ]
            }, {
                id: 3,
                open: false,
                disabled: false,
                title: 'Check input fields',
                icon: 'fa fa-dashboard',
                allowDelete: false,
                components: [
                    OdsFormService.newFieldCheckBoxObject(),
                    OdsFormService.newFieldCheckBoxListObject(),
                    OdsFormService.newFieldToggleObject()
                ]
            }, {
                id: 4,
                open: false,
                disabled: false,
                title: 'DateTime fields',
                icon: 'fa fa-dashboard',
                allowDelete: false,
                components: [
                    OdsFormService.newDateTimeObject()
                ]
            }, {
                id: 5,
                open: false,
                disabled: false,
                title: 'Plugins',
                icon: 'fa fa-dashboard',
                allowDelete: false,
                components: [
                    OdsFormService.newYesNoObject(),
                    OdsFormService.newTableObject(),
                    OdsFormService.newFieldLabelObject(),
                    OdsFormService.newCKEditorObject()
                ]
            }, {
                id: 6,
                open: false,
                disabled: false,
                title: 'Clipboard',
                icon: 'fa fa-dashboard',
                allowDelete: true,
                components: []
            }]
        };

        //We register the update clipboard callback
        OdsFormService.onAddToClipBoard(function (items) {

            $scope.toolbar.groups[clipboardIndex].components = items;
            $sessionStorage.clipBoard = items;
        });

        if ($sessionStorage.clipBoard) {
            OdsFormService.setClipBoard($sessionStorage.clipBoard);
        } else {
            $scope.toolbar.groups[clipboardIndex].components = [];
            $sessionStorage.clipBoard = [];
        }

        function removeFromClipboard(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove the component from clipboard?',
                {size: 'sm'}).result.then(function () {

                $scope.toolbar.groups[clipboardIndex].components.splice(index, 1);
                $sessionStorage.clipBoard = $scope.toolbar.groups[clipboardIndex].components;
            });
        }

        function getToolbarComponent(componentType) {

            return OdsFormService.getToolbarComponent(componentType);
        }

        function onLoad(file) {

            EventDataFactory.setData(OdsEvent.IMPORT_SCHEMA, OdsFormService.importSchema(file));
        }

        function exportSchema() {

            EventDataFactory.setData(OdsEvent.EXPORT_SCHEMA, "");
        }
    }
}
