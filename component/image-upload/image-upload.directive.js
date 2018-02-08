(function () {
    'use strict';

    angular
        .module('ods-lib')
        .directive('imageUpload', imageUpload);

    imageUpload.$inject = ['$uibModal'];

    function imageUpload($uibModal) {

        var directive = {
            restrict: 'E',
            templateUrl: 'image-upload/image-upload.html',
            scope: {//all this scope value defined, are attr for the directive. Can be used like is explained below
                image: '=',//modal field for the image value
                typeImage: '=',//modal field form the image type
                cssClass: '@',//form for the image component. Can be square or circle[e.g: class="img-circle/img-square"]
                css: '@',
                ngModel: '='
            },
            link: linkFunc
        };

        return directive;

        /* private helper methods*/

        function linkFunc($scope) {
            $scope.openModal = function () {
                $uibModal.open({
                    templateUrl: 'image-upload/image-upload-dialog.html',
                    controller: 'ImageUploadDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: $scope.size,
                    resolve: {
                        entity: function () {
                            return $scope.ngModel ? $scope.ngModel : null;
                        },
                        image: function () {
                            return $scope.image;
                        },
                        typeImage: function () {
                            return $scope.typeImage;
                        }
                    }
                }).result.then(function () {}, function (result) {
                    updateValue(result);
                });
            };

            function updateValue(value) {
                $scope.image = value.picture;
                $scope.typeImage = value.pictureContentType;
            }

        }
    }
})();
