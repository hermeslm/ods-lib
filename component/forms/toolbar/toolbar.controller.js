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
                    OdsFormService.newFieldSelectObject()
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
