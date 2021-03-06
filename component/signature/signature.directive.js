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
            name: '@',
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

        var hideRequiredClass = 'sig-box-default';
        var showRequiredClass = 'sig-box-error';

        //If model not present we will exit.
        if ($scope.model === null) {
            console.error('Please define a model using "ng-model" attribute!!!');
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

            $scope.element = $element.children('div').children('div').jSignature($scope.options);
            // $element.find('#sig').jSignature($scope.options);
            $scope.element.initialized = true;
            OdsSignature.register($scope.name, $scope.element);
        }

        function init() {

            //Init options
            if (!$scope.options) {
                initOptions();
            }

            //Init name
            if (!$scope.name) {
                $scope.name = OdsSignature.generateName();
            } else {
                if (OdsSignature.getInstance($scope.name)) {
                    console.error('Name already defined in another Signature instance, please pick another name!!!');
                    return;
                }
            }

            //Init required field
            $scope.requiredClass = hideRequiredClass;
            $scope.required = !!$scope.required;

            //Init Element
            initElement();
            //Set value
            // setValue();

            if ($scope.options.disabled) {
                OdsSignature.disable($scope.name, $scope.options);
            }

            //Init on change event
            $scope.element.bind('change', function () {

                    // $timeout, 100, true because event happens outside angular's digest cycle
                    // and change is called on setData
                    $timeout(function () {
                        var valid = isValid($scope.name);
                        if (valid) {
                            $scope.model = 'data:' +
                                OdsSignature.getData($scope.name, OdsSignature.exportTypes.IMAGE).join(',');
                        }
                    }, 100, true);
                    if ($scope.onChange) {
                        $scope.onChange();
                    }
                }
            );
        }

        function setValue() {

            if ($scope.model && $scope.model !== '') {
                // We set signature if it is present
                OdsSignature.setData($scope.name, $scope.model);
                hideRequired(true);
            }
        }

        function reset() {

            $scope.model = '';
            OdsSignature.reset($scope.name);
        }

        function isValid() {

            return OdsSignature.isValid($scope.name);
        }

        function hideRequired(state) {

            if (state) {
                $scope.requiredClass = hideRequiredClass;
            } else {
                $scope.requiredClass = showRequiredClass;
            }
            controller.$setValidity('required', state);
        }

        $scope.$watch('model', function (model, oldModel) {

            if ($scope.required && !isValid()) {
                hideRequired(false);
            } else {
                hideRequired(true);
            }
            setValue();
            return;
        });

        $scope.$watch('disabled', function (disabled) {

            if (disabled) {
                OdsSignature.disable($scope.name);
            } else {
                OdsSignature.enable($scope.name);
            }
            return;
        });

        $scope.$watch('required', function (required) {

            var valid = isValid($scope.name);
            if (required && !valid) {
                //We set this patch in case required option change and model is valid too
                if ($scope.model && $scope.model !== '') {
                    // We set signature if it is present
                    hideRequired(true);
                } else {
                    hideRequired(false);
                }
            } else {
                hideRequired(true);
            }
            return;
        });

        $scope.$on('$destroy', function () {
            OdsSignature.unregister($scope.name);
        });
    }
}