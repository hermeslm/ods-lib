/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsWizardService', OdsWizardService);

    OdsWizardService.$inject = ['OdsWizardState'];

    function OdsWizardService(OdsWizardState) {

        var service = {

            setEnable: setEnable,
            setDisable: setDisable,
            setDone: setDone,
            setCurrent: setCurrent,
            setError: setError,
            goToStep: goToStep

        };

        function goToStep(steps, index) {

            if (steps.length > index) {
                if (steps[index].status !== OdsWizardState.DISABLED) {
                    // clearCurrent(steps);
                    setDone(steps[index - 1]);
                    setCurrent(steps[index]);
                }
            }
        }

        function setEnable(step) {

            if (step) {
                step.status = "";
            }
        }

        function setDisable(step) {

            if (step) {
                step.status = OdsWizardState.DISABLED;
            }
        }

        function setDone(step) {

            if (step) {
                step.status = OdsWizardState.DONE;
            }
        }

        function setCurrent(step) {

            if (step) {
                step.status = OdsWizardState.CURRENT;
            }
        }

        function setError(step) {

            if (step) {
                step.status = OdsWizardState.ERROR;
            }
        }

        return service;
    }
})();
