/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsFormBuilderController', OdsFormBuilderController);

    OdsFormBuilderController.$inject = ['$scope', 'OdsFormService'];

    function OdsFormBuilderController($scope, OdsFormService) {

        $scope.config = {
            ckeditor: {
                suggestionsUrl: 'http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/suggestions.json',
                tokensUrl: 'http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/tokens.json',
                suggestions: [
                    {
                        'id': 'patientName',
                        'label': 'Patient Name'
                    },
                    {
                        'id': 'patientDob',
                        'label': 'Patient DOB'
                    },
                    {
                        'id': 'patientGender',
                        'label': 'Patient Gender'
                    },
                    {
                        'id': 'patientMaritalStatus',
                        'label': 'Patient Marital Status'
                    }
                ]
            }
        };

        $scope.runTimeConfig = {
            ckeditor: {
                tokens: {
                    'patientName': 'Hermes Lorenzo',
                    'patientDob': '01/24/1980',
                    'patientGender': 'Male',
                    'patientMaritalStatus': 'Single'
                }
            }
        };

        $scope.saveForm = function(schema){

            var data = OdsFormService.saveFormData(schema);
            console.log('The form data is: ' + JSON.stringify(data, null, 4));
        };

        $scope.toggleStyle = function(){

            $scope.cssClass = $scope.cssClass === 'form-print' ? 'form-print1' : 'form-print';
        };
    }
})();