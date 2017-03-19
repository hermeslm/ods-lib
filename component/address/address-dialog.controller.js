'use strict';

angular
    .module('ods-lib')
    .controller('AddressDialogController', AddressDialogController);

AddressDialogController.$inject = ['$uibModalInstance', 'address', 'countries', 'states'];

function AddressDialogController($uibModalInstance, address, countries, states) {
    var vm = this;

    vm.address = address;
    vm.countries = countries;
    vm.states = states;

    vm.clear = clear;
    vm.save = save;
    vm.onCountryChange = onCountryChange;

    function clear() {
        $uibModalInstance.dismiss('cancel');
    }

    function save() {
        $uibModalInstance.close(vm.address);
        vm.isSaving = false;
    }

    function onCountryChange() {
        $filter('filter')(vm.states, vm.address.country.code, undefined);
    }
}