/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsParamsController', OdsParamsController);

    OdsParamsController.$inject = ['OdsReportsService', 'OdsParamType', 'report', '$uibModalInstance'];

    function OdsParamsController(OdsReportsService, OdsParamType, report, $uibModalInstance) {

        var vm = this;

        vm.clear = clear;
        vm.openReport = openReport;
        vm.paramType = OdsParamType;
        vm.report = report;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function openReport() {
            $uibModalInstance.close(vm.report);
        }
        
    }
})();
