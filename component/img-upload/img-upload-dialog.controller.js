/**
 * Created by PpTMUnited on 2/21/2017.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('ImgUploadDialogController', ImgUploadDialogController);

    ImgUploadDialogController.$inject = ['$scope', '$uibModalInstance', 'areaType', 'ngModel',
        'croppedImageSize', 'original'];

    function ImgUploadDialogController($scope, $uibModalInstance, areaType, ngModel,
                                       croppedImageSize, original) {

        var vm = this;

        vm.original = original;
        vm.model = ngModel;
        vm.croppedImageSize = croppedImageSize ? Number(croppedImageSize) : 300;
        vm.areaType = areaType;

        vm.file = {
            image: null,
            //type: null
        };

        vm.save = save;
        vm.clear = clear;
        vm.handleFileSelect = handleFileSelect;

        function handleFileSelect(evt, file) {

            vm.file = file;
            // var fileUp = file;
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function () {
                    vm.original = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        }

        function clear() {
            $uibModalInstance.dismiss(null);
        }

        function save() {
            var file = {
                original: vm.original,
                model: vm.model
            };
            $uibModalInstance.dismiss(file);
        }
    }
})();
