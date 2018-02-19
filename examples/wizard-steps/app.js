/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('WizardCtrl', WizardCtrl);

WizardCtrl.$inject = ['$scope', 'OdsWizardService'];

function WizardCtrl($scope, OdsWizardService) {


    $scope.steps = [
        {
            name: 'select',
            label: 'Select template',
            current: true,
            done: true,
            visible: true,
            disabled: false,
            state: 'doc-impl.select',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, this.name);
            }
        },
        {
            name: 'info',
            label: 'Information',
            current: false,
            done: false,
            visible: true,
            disabled: false,
            state: 'doc-impl.info',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, this.name);
            }
        },
        {
            name: 'form',
            label: 'Form',
            current: false,
            done: false,
            visible: true,
            disabled: true,
            state: 'doc-impl.form',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, this.name);
            }
        },
        {
            name: 'services',
            label: 'Services',
            current: true,
            done: false,
            visible: false,
            disabled: true,
            state: 'doc-impl.services',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, this.name);
            }
        },
        {
            name: 'attachments',
            label: 'Attachments',
            current: false,
            done: false,
            visible: true,
            disabled: true,
            state: 'doc-impl.attachments',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, this.name);
            }
        },
        {
            name: 'signature',
            label: 'Signature',
            current: false,
            done: false,
            visible: true,
            disabled: true,
            state: 'doc-impl.signature',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, this.name);
            }
        },
        {
            name: 'finish',
            label: 'Finish',
            current: false,
            done: false,
            visible: true,
            disabled: true,
            state: 'doc-impl.finish',
            callback: function () {

                OdsWizardService.goToStep($scope.steps, this.name);
            }
        }];

}
