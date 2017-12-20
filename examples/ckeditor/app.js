/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('MainCtrl', function ($scope, OdsCkeditor) {

    $scope.isReadOnly = false;

    // $scope.content = '';

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
    $scope.toggleReadOnly = toggleReadOnly;
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

        $scope.options = options;
        //You can
        // OdsCkeditor.setOptions($scope.ck, options);
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

        $scope.options = options;
        // you can set read only by service call function.
        // OdsCkeditor.setOptions($scope.ck, options);
    }

    function toggleReadOnly() {

        $scope.isReadOnly = !$scope.isReadOnly;
        // you can set read only by service call function.
        // OdsCkeditor.setReadOnly($scope.ck, $scope.isReadOnly);
    }

    function reset() {

        $scope.options = defaultOptions;
        // OdsCkeditor.setOptions($scope.ck, defaultOptions);
    }
})
;
