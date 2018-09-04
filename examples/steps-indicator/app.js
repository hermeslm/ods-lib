/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('MainCtrl', function ($scope) {

    // var vm = this;

    $scope.steps = [
        {
            name: 'DRAFT',
            label: 'Draft',
            status: 'active',
            disabled: false,
            callback: function (elem) {
                // Prompt for status change
                if(confirm('Do you want to change to READY state?')){
                }
            }
        },
        {
            name: 'READY',
            label: 'Ready',
            status: '',
            disabled: true,
            callback: function (elem) {
            }
        },
        {
            name: 'JOINED',
            label: 'Joined',
            status: '',
            disabled: false,
            callback: function (elem) {
            }
        },
        {
            name: 'DISCHARGED',
            label: 'Discharged',
            status: '',
            disabled: false,
            callback: function (elem) {
            }
        }];

});
