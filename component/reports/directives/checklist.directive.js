/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsCheckList', odsCheckListDirective);

odsCheckListDirective.$inject = [];

function odsCheckListDirective() {

    var directive = {
        restrict: 'E',
        templateUrl: 'reports/directives/checklist.html',
        scope: {
            list: '=',
            model: '=ngModel',
            height: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.toggleAll = toggleAll;
        $scope.selectOne = selectOne;

        function init() {

            $scope.allSelected = true;
            for (var i = 0; i < $scope.list.length; i++) {
                if(!$scope.list[i].selected){
                    $scope.allSelected = false;
                }
            }
        }

        function toggleAll() {

            $scope.model = [];
            for (var i = 0; i < $scope.list.length; i++) {
                $scope.list[i].selected = $scope.allSelected;
                $scope.model.push($scope.list[i]);
            }
        }

        function selectOne(element) {

            if (!element.selected) {
                $scope.allSelected = false;
            }
        }

    }
}
