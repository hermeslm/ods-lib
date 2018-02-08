/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsParam', odsParamDirective);

odsParamDirective.$inject = ['OdsParamType', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$filter', '$compile'];

function odsParamDirective(OdsParamType, DTOptionsBuilder, DTColumnBuilder, $q, $filter, $compile) {

    var directive = {
        restrict: 'E',
        templateUrl: 'reports/param.html',
        scope: {
            param: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.hideTitle = hideTitle;
        $scope.hideParam = hideParam;
        $scope.getRequired = getRequired;
        $scope.openCalendar = openCalendar;
        $scope.getSelectTitleField = getSelectTitleField;

        //TABLE_SELECT
        $scope.search = search;
        $scope.getDtOptions = getDtOptions;
        $scope.getDtColumns = getDtColumns;
        $scope.toggleAll = toggleAll;
        $scope.toggleOne = toggleOne;

        initTableParam($scope.param);
        initDateParam($scope.param);

        function initTableParam(param) {

            if (param.type === OdsParamType.TABLE_SELECT) {
                param.dtInstance = {};
                param.dtOptions = undefined;
                param.dtColumns = undefined;
                param.isFilter = false;
                param.selected = [];
                param.selectedAll = false;
                //init pre-selections
                var valueField = param.valueField;
                var gridOptions = param.gridOptions;
                for (var j = 0; j < gridOptions.preSelected.length; j++) {
                    var preSelectedId = gridOptions.preSelected[j][valueField];
                    param.selected[preSelectedId] = true;
                }
            }
        }

        function initDateParam(param) {

            if (param.type === OdsParamType.DATE) {
                param.datePickerOpenStatus = false;
            }
        }

        function hideTitle(param) {

            return !!(param.hidden || param.hideTitle);
        }

        function hideParam(param) {

            return !!param.hidden;
        }

        function getRequired(param) {

            return param.required !== undefined ? param.required : false;
        }

        function openCalendar(param) {

            param.datePickerOpenStatus = true;
        }

        function getSelectTitleField(param, element) {

            if (element) {
                if (param.render) {
                    return param.render(element);
                } else {
                    return param.titleField !== undefined ? element[param.titleField] : element.name;
                }
            } else {
                return param.placeholder;
            }
        }

        function search(param) {
            param.dtInstance.reloadData();
        }

        function getDtOptions(param) {

            if (param.dtOptions === undefined) {
                //We set the new dtOptions into array
                param.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                    var defer = $q.defer();
                    if (param.isFilter) {
                        defer.resolve(param.gridOptions.data);
                        param.isFilter = false;
                    } else if (!param.searchQuery || param.searchQuery === '') {
                        defer.resolve(param.gridOptions.data);
                    } else {
                        defer.resolve($filter('filter')(param.gridOptions.data, param.searchQuery, undefined));
                    }
                    return defer.promise;
                }).withPaginationType('full_numbers').withBootstrap().withDOM('tip').withOption('aaSorting', [[1, 'asc']])
                    .withOption('createdRow', function (row) {
                        $compile(angular.element(row).contents())($scope);
                    })
                    .withOption('headerCallback', function (header) {
                        $compile(angular.element(header).contents())($scope);
                    });
                return param.dtOptions;
            } else {
                return param.dtOptions;
            }
        }

        function getDtColumns(param) {

            if (param.dtColumns === undefined) {
                //We build all columns
                var gridOptions = param.gridOptions;
                var columns = [];
                for (var i = 0; i < gridOptions.columnDef.length; i++) {
                    var columnDef = gridOptions.columnDef[i];
                    if (columnDef.id) {
                        columns.push(DTColumnBuilder.newColumn(null).withTitle(
                            '<input type="checkbox" ng-model="param.selectedAll" ng-change="toggleAll(' + param + ')">')
                            .notSortable()
                            .renderWith(function (data) {
                                return '<input type="checkbox" ng-model="param.selected[' + data[param.valueField] + ']" ng-click="toggleOne(' + param + ')">';
                            }));
                    } else {
                        var column;
                        if (columnDef.render === undefined) {
                            column = DTColumnBuilder.newColumn(columnDef.field).withTitle(columnDef.title);
                            columns.push(column);
                        } else {
                            column = DTColumnBuilder.newColumn(columnDef.field).withTitle(columnDef.title)
                                .renderWith(columnDef.render);
                            columns.push(column);
                        }
                    }
                }
                param.dtColumns = columns;
            }

            return param.dtColumns;
        }

        function toggleAll(param) {

            for (var i = 0; i < param.gridOptions.data.length; i++) {
                var valueField = param.valueField;
                var value = param.gridOptions.data[i][valueField];
                param.selected[value] = param.selectedAll;
            }

            param.value = param.selected;
        }

        function toggleOne(param) {
            for (var id in param.selected) {
                if (param.selected.hasOwnProperty(id)) {
                    if (!param.selected[id]) {
                        param.selectedAll = false;
                        return;
                    }
                }
            }
            param.selectedAll = true;
            param.value = param.selected;
        }

    }
}
