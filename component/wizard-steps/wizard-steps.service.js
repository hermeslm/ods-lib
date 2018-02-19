/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsWizardService', OdsWizardService);

    OdsWizardService.$inject = [];

    function OdsWizardService() {

        var service = {

            goToStep: goToStep

        };

        function goToStep(steps, name) {

            var selected = null;
            for (var i = 0; i < steps.length; i++) {
                if (steps[i].name === name) {
                    selected = i;
                    steps[i].current = true;
                    steps[i].done = false;
                } else {
                    if (selected && i === selected + 1) {
                        steps[i].current = false;
                        steps[i].done = false;
                        steps[i].disable = false;
                    } else {
                        if (selected && i > selected) {
                            if (!steps[i].disable) {
                                steps[i].done = false;
                                steps[i].current = false;
                            }
                        } else {
                            steps[i].done = true;
                            steps[i].current = false;
                            steps[i].disable = true;
                        }
                    }
                }
            }
        }

        return service;
    }
})();
