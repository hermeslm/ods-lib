/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsFormController', OdsFormController);

    OdsFormController.$inject = ['OdsFormService'];

    function OdsFormController(OdsFormService) {

        var vm = this;

        // vm.form = form;
        vm.getRequired = getRequired;
        vm.getFieldTemplate = getFieldTemplate;
        vm.getSelectTitleField = getSelectTitleField;

        function getRequired(field) {

            return field && field.required && field.required !== undefined ? field.required : false;
        }

        function getFieldTemplate(fieldType) {

            return OdsFormService.getFieldTemplate(fieldType);
        }

        function getSelectTitleField(param, element) {

            if (element) {
                if (param.render) {
                    return param.render(element);
                } else {
                    return param.titleField !== undefined ? element[param.titleField] : element.name;
                }
            } else {
                return param.placeholder;
            }
        }

    }
})();
