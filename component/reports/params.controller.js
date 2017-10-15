/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsParamsController', OdsParamsController);

    OdsParamsController.$inject = ['OdsParamType', 'report', '$uibModalInstance', '$q',
        'DTOptionsBuilder', 'DTColumnBuilder', '$filter', '$compile', 'moment', '$scope'];

    function OdsParamsController(OdsParamType, report, $uibModalInstance, $q,
                                 DTOptionsBuilder, DTColumnBuilder, $filter, $compile, moment, $scope) {

        var vm = this;

        vm.clear = clear;
        vm.openReport = openReport;
        vm.openCalendar = openCalendar;
        vm.paramType = OdsParamType;
        vm.report = report;
        vm.getSelectTitleField = getSelectTitleField;
        vm.getRequired = getRequired;
        vm.hideParam = hideParam;
        vm.hideTitle = hideTitle;

        //TABLE_SELECT
        // vm.selected = {};
        // vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.getDtOptions = getDtOptions;
        vm.getDtColumns = getDtColumns;
        vm.search = search;
        initTables();

        function initTables() {
            for (var i = 0; i < vm.report.params.length; i++) {
                if (vm.report.params[i].type === OdsParamType.TABLE_SELECT) {
                    vm.report.params[i].dtInstance = {};
                    vm.report.params[i].dtOptions = undefined;
                    vm.report.params[i].dtColumns = undefined;
                    vm.report.params[i].isFilter = false;
                    vm.report.params[i].selected = [];
                    vm.report.params[i].selectedAll = false;
                    //init pre-selections
                    var valueField = vm.report.params[i].valueField;
                    var gridOptions = vm.report.params[i].gridOptions;
                    for (var j = 0; j < gridOptions.preSelected.length; j++) {
                        var preSelectedId = gridOptions.preSelected[j][valueField];
                        vm.report.params[i].selected[preSelectedId] = true;
                    }
                }
            }
        }

        function getDtOptions(param, index) {

            if (param.dtOptions === undefined) {
                //We set the new dtOptions into array
                vm.report.params[index].dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                    var defer = $q.defer();
                    if (param.isFilter) {
                        defer.resolve(param.gridOptions.data);
                        vm.report.params[index].isFilter = false;
                    } else if (!vm.report.params[index].searchQuery || vm.report.params[index].searchQuery === '') {
                        defer.resolve(param.gridOptions.data);
                    } else {
                        defer.resolve($filter('filter')(param.gridOptions.data, vm.report.params[index].searchQuery, undefined));
                    }
                    return defer.promise;
                }).withPaginationType('full_numbers').withBootstrap().withDOM('tip').withOption('aaSorting', [[1, 'asc']])
                    .withOption('createdRow', function (row, data, dataIndex) {
                        $compile(angular.element(row).contents())($scope);
                    })
                    .withOption('headerCallback', function (header) {
                        if (!vm.headerCompiled) {
                            vm.headerCompiled = true;
                            $compile(angular.element(header).contents())($scope);
                        }
                    });
                return vm.report.params[index].dtOptions;
            } else {
                return vm.report.params[index].dtOptions;
            }
        }

        function getDtColumns(param, index) {

            if (param.dtColumns === undefined) {
                //We build all columns
                var gridOptions = param.gridOptions;
                var columns = [];
                for (var i = 0; i < gridOptions.columnDef.length; i++) {
                    var columnDef = gridOptions.columnDef[i];
                    if (columnDef.id) {
                        columns.push(DTColumnBuilder.newColumn(null).withTitle(
                            '<input type="checkbox" ng-model="vm.report.params[' + index + '].selectedAll" ng-change="vm.toggleAll(' + index + ')">')
                            .notSortable()
                            .renderWith(function (data, type, full, meta) {
                                return '<input type="checkbox" ng-model="vm.report.params[' + index + '].selected[' + data[param.valueField] + ']" ng-click="vm.toggleOne(' + index + ')">';
                            }));
                    } else {
                        if (columnDef.render === undefined) {
                            var column = DTColumnBuilder.newColumn(columnDef.field).withTitle(columnDef.title);
                            columns.push(column);
                        } else {
                            var column = DTColumnBuilder.newColumn(columnDef.field).withTitle(columnDef.title)
                                .renderWith(columnDef.render);
                            columns.push(column);
                        }
                    }
                }

                vm.report.params[index].dtColumns = columns;
                return vm.report.params[index].dtColumns;
            } else {
                return vm.report.params[index].dtColumns;
            }
        }

        function search(index) {
            vm.report.params[index].dtInstance.reloadData();
        }

        function toggleAll(index) {

            var param = vm.report.params[index];

            for (var i = 0; i < param.gridOptions.data.length; i++) {
                var valueField = param.valueField;
                var value = param.gridOptions.data[i][valueField];
                vm.report.params[index].selected[value] = vm.report.params[index].selectedAll;
            }

            vm.report.params[index].value = vm.report.params[index].selected;
        }

        function toggleOne(index) {
            for (var id in vm.report.params[index].selected) {
                if (vm.report.params[index].selected.hasOwnProperty(id)) {
                    if (!vm.report.params[index].selected[id]) {
                        vm.report.params[index].selectedAll = false;
                        return;
                    }
                }
            }
            vm.report.params[index].selectedAll = true;
            vm.report.params[index].value = vm.report.params[index].selected;
        }

        initDateParams(vm.report);

        function initDateParams(report) {
            for (var i = 0; i < report.params.length; i++) {
                if (vm.report.params[i].type === OdsParamType.DATE) {
                    vm.report.params[i].datePickerOpenStatus = false;
                }
            }
        }

        function openCalendar(index) {
            vm.report.params[index].datePickerOpenStatus = true;
        }

        function hideParam(param) {

            return param.hidden ? true : false;
        }

        function hideTitle(param) {

            return param.hidden || param.hideTitle ? true : false;
        }

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function openReport() {
            $uibModalInstance.close(vm.report);
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

        function getRequired(param) {

            return param.required !== undefined ? param.required : false;
        }

    }
})();
