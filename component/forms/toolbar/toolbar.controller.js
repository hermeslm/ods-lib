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
                components: [OdsFormService.newSectionObject()]
            }, {
                id: 1,
                open: false,
                disabled: false,
                title: 'Text input fields',
                icon: 'fa fa-dashboard',
                components: [{
                    componentType: OdsComponentType.FIELD,
                    label: 'TextBox',
                    name: 'textbox1',
                    placeholder: '',
                    type: OdsFieldType.TEXT,
                    required: false,
                    value: ''
                }, {
                    id: 1,
                    type: OdsFieldType.NUMBER,
                    title: 'Number',
                    template: '/api/report/rounding-report'
                }]
            }, {
                id: 2,
                open: false,
                disabled: false,
                title: 'Select input fields',
                icon: 'fa fa-dashboard',
                components: [{
                    id: 0,
                    type: OdsFieldType.TEXT,
                    title: 'TextBox',
                    name: 'texbox',
                    template: '/api/report/rounding-report',
                }, {
                    id: 1,
                    type: OdsFieldType.NUMBER,
                    title: 'Number',
                    name: 'number',
                    template: '/api/report/rounding-report'
                }]
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
