/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsFormToolbarController', OdsFormToolbarController);

    OdsFormToolbarController.$inject = ['OdsFormService', 'OdsFieldType', 'OdsComponentType'];

    function OdsFormToolbarController(OdsFormService, OdsFieldType, OdsComponentType) {

        var vm = this;

        vm.toolbar = {
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
                    OdsFormService.newTableObject()
                ]
            }]
        };

        // vm.getSuperFieldTemplate = getSuperFieldTemplate;
        vm.getToolbarComponent = getToolbarComponent;

        // vm.addField = addField;
        // vm.addSection = addSection;

        // function getSuperFieldTemplate() {
        //     return OdsFormService.getSuperFieldTemplate();
        // }

        function getToolbarComponent(componentType) {
            return OdsFormService.getToolbarComponent(componentType);
        }

        // function addField() {
        //     alert("Add field function");
        // }
        //
        // function addSection() {
        //     alert("Add section function");
        // }

    };
})();
