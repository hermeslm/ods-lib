/**
 * Created by PpTMUnited on 5/23/2017.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .directive('udtAttach1', Attach);

    Attach.$inject = ['$state', 'File', '$sessionStorage', 'CoreService', 'toastr', 'fancyboxService'];

    function Attach($state, File, $sessionStorage, CoreService, toastr, fancyboxService) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/udt/udt-attach-file/udt-attach-file.html',
            scope: {//all this scope value defined, are attr for the directive. Can be used like is explained below
                formId: '@',//id of the form you wanna find the attachments
                isSigned: '=',//if is already signed, don't add more files
                disableAttach: '=',//if we dont want to attach anything, just view the files
                redirect: '=',//if we want to redirect to an state
                attach: '&', //You must define attach method
                delete: '&', //You must define delete method
                list: '&'
            },
            link: linkFunc
        };

        return directive;

        /* private helper methods*/

        function linkFunc($scope, element) {
            $scope.imageType = 'image';
            $scope.applicationType = 'application';
            $scope.attachFileData = {};

            // loadAllFiles();
            //
            // function loadAllFiles() {
            //     if ($scope.formId && $scope.formId !== "") {
            //         File.byOwner({id: $scope.formId}, function (result) {
            //             $scope.files = result;
            //         });
            //     } else {
            //         console.log('Not Form Id ');
            //     }
            // }

            $scope.list()().then(function (data) {
                $scope.files = data;
            });

            $scope.imageDetail = function (id, type) {
                File.findFileById({id: id}).$promise
                    .then(function (data) {
                        if (data && data.file) {
                            fancyboxService.fancyboxPlus()({
                                // 'padding': 0,
                                'href': 'data:' + type + ';base64,' + data.file,
                                'title': data.name,
                                // 'titlePosition'  : 'over',
                                'transitionIn': 'elastic',
                                'transitionOut': 'elastic'
                            });
                        } else {
                            toastr.warning("The file was not found.");
                        }
                    });
            }


            $scope.getFileAttached = function (fileType, id) {
                $sessionStorage.typeFile = fileType;
                File.findFile({id: id});
            };

            /**
             * Attach a file
             * @param file
             * @param data
             */
            $scope.attachFile = function (file, data) {
                CoreService.attachment(file, data).then(function (result) {
                    result.id = $scope.formId;
                    $scope.attach()(result, successResult, errorResult);
                    // SystemService.attachConsent(result, successResult, errorResult);
                });
            };

            /**
             * Delete a file
             * @param fileId
             */
            $scope.deleteFile = function (fileId) {
                $scope.delete()(fileId).then(function (data) {
                    $scope.files.map(function (file) {
                        if (file.id == fileId) {
                            file.hide = true;
                        }
                    })
                    // $('li[data-id="' + fileId + '"]').detach();
                });
            };

            var successResult = function (result) {
                if ($scope.redirect) {
                    $state.go($state.current, {}, {reload: true});
                } else {
                    // loadAllFiles();
                    $scope.list()().then(function (data) {
                        $scope.files = data;
                    });
                }
            };

            var errorResult = function (error) {
                console.log(error)
            };

        }
    }
})();
