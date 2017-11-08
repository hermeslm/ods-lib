/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('MainCtrl', function ($scope, OdsCkeditor) {

    var defaultOptions = {
        prefix: '${',
        suffix: '}',
        suggestions: [
            {
                "id": "patientName",
                "label": "Patient Name"
            },
            {
                "id": "patientDob",
                "label": "Patient DOB"
            },
            {
                "id": "patientSex",
                "label": "Patient Sex"
            },
            {
                "id": "patientMaritalStatus",
                "label": "Patient Marital Status"
            }
        ]
    };

    $scope.options = angular.copy(defaultOptions);

    $scope.changePrefixAndSuffix = changePrefixAndSuffix;
    $scope.changeSuggestions = changeSuggestions;
    $scope.reset = reset;

    function changeSuggestions() {

        var options = {
            prefix: '${',
            suffix: '}',
            suggestions: [
                {
                    "id": "patientSex",
                    "label": "Patient Sex"
                },
                {
                    "id": "patientMaritalStatus",
                    "label": "Patient Marital Status"
                }
            ]
        };

        OdsCkeditor.setOptions($scope.ck, options);
    }

    function changePrefixAndSuffix() {

        var options = {
            prefix: '&nbsp;@',
            suffix: '&nbsp;',
            suggestions: [
                {
                    "id": "patientName",
                    "label": "Patient Name"
                },
                {
                    "id": "patientDob",
                    "label": "Patient DOB"
                }
            ]
        };

        OdsCkeditor.setOptions($scope.ck, options);
    }

    function reset() {

        OdsCkeditor.setOptions($scope.ck, defaultOptions);
    }
})
;
