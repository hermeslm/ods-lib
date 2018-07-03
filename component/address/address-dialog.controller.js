'use strict';

angular
    .module('ods-lib')
    .controller('AddressDialogController', AddressDialogController);

AddressDialogController.$inject = ['$uibModalInstance', 'address', 'countries', 'states'];

function AddressDialogController($uibModalInstance, address, countries, states) {

    var vm = this;

    var nonEmail = "non-email@domain.com";

    vm.address = address;
    vm.countries = countries;
    vm.states = states;
    vm.nonEmail = false;

    vm.clear = clear;
    vm.save = save;
    vm.toggleEmail = toggleEmail;
    vm.emailChanged = emailChanged;

    function clear() {

        $uibModalInstance.dismiss('cancel');
    }

    function save() {

        $uibModalInstance.close(vm.address);
        vm.isSaving = false;
    }

    function toggleEmail() {

        if (vm.nonEmail) {
            if (vm.address) {
                vm.address.email = nonEmail;
            } else {
                vm.address = {
                    email: nonEmail
                }
            }
        } else {
            if (vm.address) {
                vm.address.email = '';
            }
        }
    }

    function emailChanged() {

        if (!vm.address.email) {
            vm.nonEmail = false;
        }
    }
}
