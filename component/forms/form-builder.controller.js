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

        $scope.saveForm = function(schema){
            var data = OdsFormService.saveFormData(schema);
            console.log("The form data is: " + JSON.stringify(data, null, 4));
        }
    }
})();