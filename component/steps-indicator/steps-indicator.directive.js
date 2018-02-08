'use strict';

angular
    .module('ods-lib')
    .directive('stepsIndicator', StepsIndicator);

StepsIndicator.$inject = [];

/**
 *  steps = [
 *    {
 *        name: 'DRAFT',
 *        label: 'Draft',
 *        status: 'active',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'READY',
 *        label: 'Ready',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'JOINED',
 *        label: 'Joined',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'DISCHARGED',
 *        label: 'Discharged',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    }];
 *
 *
 *
 * @returns {{restrict: string, templateUrl: string, scope: {ngModel: string, class: string, type: string}, link: linkFunc}}
 * @constructor
 */

function StepsIndicator() {

    var directive = {
        restrict: 'E',
        templateUrl: 'steps-indicator/template.html',
        scope: {
            ngModel: '=',
            class: '@',
            type: '@'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.changeStatus = changeStatus;

        function changeStatus(elem) {

            if ($scope.type === 'multiselect') {
                if (elem.callback) {
                    elem.callback(elem);
                }
            } else {
                if (elem.callback) {
                    for (var i = 0; i < $scope.ngModel.length; i++) {
                        $scope.ngModel[i].status = '';
                    }
                    elem.callback(elem);
                }
            }
            var elementPos = $scope.ngModel.map(function(x) {return x.name; }).indexOf(elem.name);
            $scope.ngModel[elementPos].status = 'active';
        }
    }
}