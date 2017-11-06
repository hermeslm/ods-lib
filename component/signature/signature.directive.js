'use strict';

angular
    .module('ods-lib')
    .directive('odsSignature', odsSignature);

odsSignature.$inject = ['$timeout', 'OdsSignature'];

function odsSignature($timeout, OdsSignature) {

    var directive = {
        restrict: 'E',
        require: '?ngModel',
        templateUrl: 'signature/signature.html',
        scope: {
            model: '=ngModel',
            options: '=?',
            disabled: '=ngDisabled',
            required: '=?ngRequired',
            onChange: '&'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element, attrs, controller) {

        //If model not present we will exit.
        if (!$scope.model) {
            console.error('Please define a model!!!');
            return;
        }

        $scope.reset = reset;

        init();

        function initOptions() {

            $scope.options = {
                width: 'ratio',
                height: 'ratio',
                color: '#00008B',
                'background-color': '#EEEEEE',
                lineWidth: 0,
                cssClass: ''
            };
        }

        function initElement() {

            $scope.model.element = $element.find('#jSignature').jSignature($scope.options);
            $scope.model.initialized = true;
        }

        function init() {

            //Init options
            if (!$scope.options) {
                initOptions();
            }

            //Init required field
            $scope.required = $scope.required ? true : false;

            //Init Element
            initElement();
            if ($scope.model && $scope.model.sig && $scope.model.sig !== '') {
                // We set signature if it is present
                OdsSignature.setData($scope.model, $scope.model.sig);
            }
            if ($scope.options.disabled) {
                OdsSignature.disable($scope.model, $scope.options);
            }

            //Init on change event
            $scope.model.element.bind('change', function (event) {

                    // $timeout, 100, true because event happens outside angular's digest cycle
                    // and change is called on setData
                    $timeout(function () {
                        if (isValid()) {
                            //We update validity if is required
                            $scope.hideRequired = true;
                        } else {
                            $scope.hideRequired = !$scope.required ? true : false;
                        }
                        $scope.model.sig = 'data:' +
                            OdsSignature.getData($scope.model, OdsSignature.exportTypes.IMAGE).join(',');
                    }, 100, true);
                    if ($scope.onChange) {
                        $scope.onChange($scope.model);
                    }
                }
            );
        }

        function reset() {

            OdsSignature.reset($scope.model);
        }

        function isValid() {

            return OdsSignature.isValid($scope.model);
        }

        $scope.$watch('model', function (model) {

            if ($scope.required && !isValid()) {
                $scope.hideRequired = false;
            } else {
                $scope.hideRequired = !$scope.required;
            }
            return;
        });

        $scope.$watch('disabled', function (disabled) {

            if (disabled) {
                OdsSignature.disable($scope.model);
            } else {
                OdsSignature.enable($scope.model);
            }
            return;
        });

        $scope.$watch('required', function (required) {

            if (required && !isValid()) {
                $scope.hideRequired = false;
            } else {
                $scope.hideRequired = !required;
            }
            return;
        });

        $scope.$watch('hideRequired', function (hideRequired) {

            controller.$setValidity('required', hideRequired);
            return;
        });

//             $scope.initialized = false;
//
//             var options = {
//                 width: $scope.width,
//                 height: $scope.height,
//                 color: $scope.color,
//                 'background-color': $scope.bgColor,
//                 lineWidth: $scope.lineWidth,
//                 cssclass: $scope.cssclass
//             };
//
//             $scope.initialize = function() {
//                 if (!$scope.initialized) {
//                     $element.find('#jSignature').jSignature(options);
//                     $scope.initialized = true;
//                 }
//             };
//
//             $scope.reset = function() {
//                 console.log('reset!!!');
//                 $element.jSignature('reset');
//             };
//
//             $scope.getData = function() {
//                 console.log('getData!!!');
//                 var datapair = $element.jSignature('getData', 'base30');
//                 var svg = $element.jSignature('getData', 'svg');
//                 console.dir(datapair);
//                 //alert(datapair);
//                 //              alert(svg);
//                 $scope.save(svg);
//             };
//
//             $scope.setData = function(sig) {
//                 console.log('setData!!!');
//
//
//
//                 if (sig) {
//                     datapair = sig;
//                 }
//                 console.log(datapair);
//                 $element.jSignature('setData', 'data:' + datapair.join(','));
//             };
//
//
//             $scope.initialize();
// //            $scope.setData();
//
//
//             $scope.$watch('sig', function(sig) {
//                 if (sig) {
//                     console.log('watch if ' + sig);
//                     $scope.setData(sig);
//                     //alert('watch if ' + sig);
//
//                     return;
//                 }
//                 console.log('watch else');
//
//             });
    }
}