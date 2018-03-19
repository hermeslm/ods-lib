'use strict';

angular
    .module('ods-lib')
    .directive('wizardSteps', wizardSteps);

wizardSteps.$inject = [];

/**
 *  steps = [
 *    {
 *        name: 'DRAFT',
 *        label: 'Draft',
 *        status: 'active',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'READY',
 *        label: 'Ready',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'JOINED',
 *        label: 'Joined',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'DISCHARGED',
 *        label: 'Discharged',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    }];
 *
 *
 *
 * @returns {{restrict: string, templateUrl: string, scope: {ngModel: string, class: string, type: string}, link: linkFunc}}
 * @constructor
 */

function wizardSteps() {

    var directive = {
        restrict: 'E',
        templateUrl: 'wizard-steps/wizard-steps.html',
        scope: {
            ngModel: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.nextStep = nextStep;


        function nextStep() {



        }


    }
}