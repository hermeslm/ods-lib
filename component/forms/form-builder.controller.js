/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsFormBuilderController', OdsFormBuilderController);

    OdsFormBuilderController.$inject = ['OdsFormService'];

    function OdsFormBuilderController(OdsFormService) {

        var vm = this;

        vm.onSave = onSave;

        function onSave(schema, data) {
            alert(data);
        }

    }
})();
