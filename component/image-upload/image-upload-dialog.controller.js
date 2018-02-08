/**
 * Created by PpTMUnited on 2/21/2017.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('ImageUploadDialogController', ImageUploadDialogController);

    ImageUploadDialogController.$inject = ['$timeout', '$uibModalInstance', 'DataUtils', '$scope',
        'OdsUtils', 'image', 'typeImage'];

    function ImageUploadDialogController($timeout, $uibModalInstance, DataUtils, $scope,
                                         OdsUtils, image, typeImage) {
        var vm = this;

        vm.image = {};
        vm.image.picture = image;
        vm.image.pictureContentType = typeImage;
        vm.imageTmp = {};
        angular.copy(vm.image, vm.imageTmp);
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            stopWebCam();
            $uibModalInstance.dismiss(vm.image);
            angular.copy(vm.imageTmp, vm.image);
        }

        function save() {
            stopWebCam();
            $uibModalInstance.dismiss(vm.image);
        }

        vm.setPicture = function ($file) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function (base64Data) {
                    $scope.$apply(function () {
                        vm.image.picture = base64Data;
                        vm.image.pictureContentType = $file.type;
                    });
                });
            }
        };

        vm.resetUserPicture = function () {
            OdsUtils.resetUserPicture(vm.image);
        };

        var _video = null,
            patData = null;

        vm.patOpts = {x: 0, y: 0, w: 25, h: 25};

        // Setup a channel to receive a video property
        // with a reference to the video element
        // See the HTML binding in main.html
        vm.channel = {};

        vm.webcamError = false;
        vm.onError = function (err) {
            $scope.$apply(
                function () {
                    $scope.webcamError = err;
                }
            );
        };

        vm.onSuccess = function () {
            // The video element contains the captured camera data
            _video = vm.channel.video;
            $scope.$apply(function () {
                vm.patOpts.w = _video.width;
                vm.patOpts.h = _video.height;
                //$scope.showDemos = true;
            });
        };

        vm.onStream = function () {
            // You could do something manually with the stream.
        };

        vm.makeSnapshot = function () {
            if (_video) {
                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) {
                    return;
                }

                patCanvas.width = _video.width;
                patCanvas.height = _video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = getVideoData(vm.patOpts.x, vm.patOpts.y, vm.patOpts.w, vm.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                sendSnapshotToServer(patCanvas.toDataURL().split('base64,')[1]);

                patData = idata;
            }
        };

        /**
         * Redirect the browser to the URL given.
         * Used to download the image by passing a dataURL string
         */
        vm.downloadSnapshot = function downloadSnapshot(dataURL) {
            window.location.href = dataURL;
        };

        var getVideoData = function getVideoData(x, y, w, h) {
            var hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = _video.width;
            hiddenCanvas.height = _video.height;
            var ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(_video, 0, 0, _video.width, _video.height);
            return ctx.getImageData(x, y, w, h);
        };

        /**
         * This function could be used to send the image data
         * to a backend server that expects base64 encoded images.
         *
         * In this example, we simply store it in the scope for display.
         */
        var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
            vm.image.picture = imgBase64;
        };

        function stopWebCam() {
            var MediaStream = window.MediaStream;

            if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
                MediaStream = webkitMediaStream;
            }

            if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
                MediaStream.prototype.stop = function() {
                    this.getAudioTracks().forEach(function(track) {
                        track.stop();
                    });

                    this.getVideoTracks().forEach(function(track) {
                        track.stop();
                    });
                };
            }
        }
    }
})();

