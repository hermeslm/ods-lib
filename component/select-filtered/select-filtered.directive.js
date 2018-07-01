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
            name: '@',
            hideLabel: '=',
            placeholder: '@',
            ngModel: '=',
            titleProperty: '=?',
            ngDisabled: '=?',
            ngRequired: '=?',
            tooltip: '@',
            list: '=',
            filters: '=',
            onSelect: '&',
            renderStyle: '&',
            render: '&'
        },
        link: linkFunc
    };

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.toggleFilter = toggleFilter;
        $scope.getSelectTitleValue = getSelectTitleValue;
        $scope.onSelectFn = onSelectFn;
        $scope.renderClass = renderClass;

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
                if($scope.render){
                    return $scope.render()(element, $scope.titleProperty);
                }else {
                    return element[$scope.titleProperty];
                }
            } else {
                return $scope.placeholder;
            }
        }

        function onSelectFn() {

            if ($scope.onSelect) {
                $scope.onSelect();
            } else {
                console.log('You must to to define onSelect() function.');
            }
        }

        function renderClass(element) {

            if($scope.renderStyle){
                return $scope.renderStyle()(element);
            }else {
                return '';
            }
        }

        $scope.$watch('selected', function (newValue) {

            $scope.ngModel = newValue.value;
        }, true);

        $scope.$watch('list', function () {

            doFilter();
        }, true);

    }
}
