/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('WizardCtrl', WizardCtrl);

WizardCtrl.$inject = ['$scope', 'OdsWizardService', 'OdsWizardState'];

function WizardCtrl($scope, OdsWizardService, OdsWizardState) {

    $scope.steps = [
        {
            name: 'select',
            label: 'Select template',
            status: OdsWizardState.CURRENT,
            visible: true,
            state: 'doc-impl.select',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, 0);
            }
        },
        {
            name: 'info',
            label: 'Information',
            status: OdsWizardState.DISABLED,
            visible: true,
            state: 'doc-impl.info',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, 1);
                if(this.status !== OdsWizardState.DISABLED){
                    OdsWizardService.setEnable($scope.steps[2]);
                }

            }
        },
        {
            name: 'form',
            label: 'Form',
            status: OdsWizardState.DISABLED,
            visible: true,
            state: 'doc-impl.form',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, 2);
                if(this.status !== OdsWizardState.DISABLED){
                    OdsWizardService.setEnable($scope.steps[3]);
                }
            }
        },
        {
            name: 'services',
            label: 'Services',
            status: OdsWizardState.DISABLED,
            visible: true,
            state: 'doc-impl.services',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, 3);
                if(this.status !== OdsWizardState.DISABLED){
                    OdsWizardService.setEnable($scope.steps[4]);
                }
            }
        },
        {
            name: 'attachments',
            label: 'Attachments',
            status: OdsWizardState.DISABLED,
            visible: true,
            state: 'doc-impl.attachments',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, 4);
                if(this.status !== OdsWizardState.DISABLED){
                    OdsWizardService.setEnable($scope.steps[5]);
                }
            }
        },
        {
            name: 'signature',
            label: 'Signature',
            status: OdsWizardState.DISABLED,
            visible: true,
            state: 'doc-impl.signature',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, 5);
                if(this.status !== OdsWizardState.DISABLED){
                    OdsWizardService.setEnable($scope.steps[6]);
                }
            }
        },
        {
            name: 'finish',
            label: 'Finish',
            status: OdsWizardState.DISABLED,
            visible: true,
            state: 'doc-impl.finish',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, 6);
            }
        }];

    $scope.enableSecondStep = enableSecondStep;

    function enableSecondStep() {

        OdsWizardService.setEnable($scope.steps[1]);

    }

}
