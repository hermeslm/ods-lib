/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsSchemaController', OdsSchemaController);

    OdsSchemaController.$inject = ['OdsFormService'];

    function OdsSchemaController(OdsFormService) {

        var vm = this;

        vm.getSchemaComponent = getSchemaComponent;

        function getSchemaComponent() {
            return OdsFormService.getSchemaComponent();
        }
    }
})();
