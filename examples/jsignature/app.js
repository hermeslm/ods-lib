/**
 * Created by hermeslm on 3/19/17.
 */

(function () {
    'use strict';

    angular.module('example', ['ods-lib'])
        .controller('MainCtrl', ExampleController);

    ExampleController.$inject = ['$scope', 'OdsSignature'];

    function ExampleController($scope, OdsSignature) {

        $scope.default = 'data:image/png;base64,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';
        $scope.selected = '';
        $scope.disabled = false;
        $scope.required = false;
        $scope.model = '';
        $scope.name = 'testSig';
        $scope.enableComponent = enableComponent;
        $scope.disableComponent = disableComponent;
        $scope.getSignature = getSignature;
        $scope.setSignature = setSignature;
        $scope.onChange = onChange;
        $scope.toggleRequired = toggleRequired;
        $scope.submit = submit;

        $scope.selected1 = '';
        $scope.disabled1 = false;
        $scope.required1 = false;
        $scope.model1 = '';
        $scope.name1 = 'testSig1';
        $scope.enableComponent1 = enableComponent1;
        $scope.disableComponent1 = disableComponent1;
        $scope.getSignature1 = getSignature1;
        $scope.setSignature1 = setSignature1;
        $scope.onChange1 = onChange1;
        $scope.toggleRequired1 = toggleRequired1;
        $scope.submit1 = submit1;

        function enableComponent() {

            $scope.disabled = false;
            //You can call service enable too.
            // OdsSignature.enable($scope.model);
        }

        function disableComponent() {

            $scope.disabled = true;
            //You can call service disable too.
            // OdsSignature.disable($scope.model);
        }

        function getSignature() {

            if (!OdsSignature.getData($scope.name, OdsSignature.exportTypes.NATIVE).length) {
                alert("Please sign and then press finish!!!");
            } else {
                $scope.selected = OdsSignature.getData($scope.name, OdsSignature.exportTypes.IMAGE).join(',');
            }
        }

        function setSignature() {

            OdsSignature.setData($scope.name, $scope.default);
        }

        function onChange() {

            var d = OdsSignature.getData($scope.name, OdsSignature.exportTypes.NATIVE);
            if (d.length >= 1) {
                console.log("There is a modification.");
                $scope.selected = 'data:' + OdsSignature.getData($scope.name, OdsSignature.exportTypes.IMAGE).join(',');
            } else {
                console.log("There is not a modification.");
            }

        }
        
        function toggleRequired() {

            $scope.required = !$scope.required;
        }

        function submit() {
            console.log($scope.model);
            alert("Submit form!!!");
        }






        //Second instance of Signature
        function enableComponent1() {

            $scope.disabled1 = false;
            //You can call service enable too.
            // OdsSignature.enable($scope.model);
        }

        function disableComponent1() {

            $scope.disabled1 = true;
            //You can call service disable too.
            // OdsSignature.disable($scope.model);
        }

        function getSignature1() {

            if (!OdsSignature.getData($scope.name1, OdsSignature.exportTypes.NATIVE).length) {
                alert("Please sign and then press finish!!!");
            } else {
                $scope.selected1 = OdsSignature.getData($scope.name1, OdsSignature.exportTypes.IMAGE).join(',');
            }
        }

        function setSignature1() {

            OdsSignature.setData($scope.name1, $scope.default);
        }

        function onChange1() {

            var d = OdsSignature.getData($scope.name1, OdsSignature.exportTypes.NATIVE);
            if (d.length >= 1) {
                console.log("There is a modification.");
                $scope.selected1 = 'data:' + OdsSignature.getData($scope.name, OdsSignature.exportTypes.IMAGE).join(',');
            } else {
                console.log("There is not a modification.");
            }

        }

        function toggleRequired1() {

            $scope.required1 = !$scope.required1;
        }

        function submit1() {
            console.log($scope.model1);
            alert("Submit form!!!");
        }
    }

})();