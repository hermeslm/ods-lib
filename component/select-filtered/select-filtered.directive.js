'use strict';

angular
    .module('ods-lib')
    .directive('selectFiltered', selectFiltered);

selectFiltered.$inject = ['$filter'];

function selectFiltered($filter) {

    return {
        restrict: 'E',
        templateUrl: 'select-filtered/select-filtered.html',
        scope: {
            label: '@',
            hideLabel: '=',
            placeholder: '@',
            ngModel: '=',
            titleProperty: '=?',
            ngDisabled: '=?',
            ngRequired: '=?',
            tooltip: '@',
            list: '=',
            filters: '='
        },
        link: linkFunc
    };

    /* private helper methods*/

    function linkFunc($scope) {

        var counter = (+new Date()) % 10000;

        $scope.name = generateName();
        $scope.toggleFilter = toggleFilter;
        $scope.getSelectTitleValue = getSelectTitleValue;

        init();

        function init() {

            var tmpModel = angular.copy($scope.ngModel);
            $scope.selected = {
                value : tmpModel ? tmpModel : null
            };
            $scope.ngDisabled = !!$scope.ngDisabled;
            $scope.ngRequired = !!$scope.ngRequired;
            $scope.titleProperty = $scope.titleProperty ? $scope.titleProperty : 'name';
            doFilter();
        }

        function doFilter() {

            $scope.filtered = angular.copy($scope.list);
            if ($scope.filters && $scope.filters.length > 0) {
                for (var i = 0; i < $scope.filters.length; i++) {
                    if ($scope.filters[i].active) {
                        // $scope.selected.value = null;
                        $scope.filtered = $filter('filter')($scope.filtered, $scope.filters[i].pattern, undefined);
                    }
                }
            }
        }

        function toggleFilter(filter) {

            filter.active = !filter.active;
            doFilter();
        }

        function getSelectTitleValue(element) {

            if (element && element.constructor !== Array) {
                return element[$scope.titleProperty];
            } else {
                return $scope.placeholder;
            }
        }

        function generateName() {

            counter++;
            return 'select-filtered' + counter;
        }

        $scope.$watch('selected', function (newValue) {

            $scope.ngModel = newValue.value;
        }, true);

        $scope.$watch('list', function (newList) {

            $scope.list = newList;
        }, true);

    }
}