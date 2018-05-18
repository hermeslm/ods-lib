/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsReports', ReportsDirective);

ReportsDirective.$inject = ['OdsReportsService', '$uibModal', '$sce', '$q'];

function ReportsDirective(OdsReportsService, $uibModal, $sce, $q) {

    var directive = {
        restrict: 'E',
        templateUrl: 'reports/reports.html',
        scope: {
            reportsGroup: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        var BASE64_MARKER = ';base64,';

        function convertDataURIToBinary(uri, buffer) {

            var marker = ';base64,',
                raw = window.atob(uri.substring(uri.indexOf(marker) + marker.length)),
                n = raw.length,
                a = new Uint8Array(new ArrayBuffer(n));
            for(var i = 0; i < n ; i++){
                a[i] = raw.charCodeAt(i);
            }
            return buffer ? a.buffer : a;
        }

        $scope.infoMessage = true;
        $scope.selectReport = null;
        $scope.reportFile = getUrlReport();
        $scope.hideInfoMessage = hideInfoMessage;
        $scope.downloadReport = downloadReport;
        $scope.openReport = openReport;

        function getUrlReport(url) {
            return $sce.trustAsResourceUrl(url);
        }

        function hideInfoMessage() {
            $scope.infoMessage = false;
        }

        function openReport(groupIndex, reportIndex) {

            $scope.selectReport = null;

            var report = $scope.reportsGroup.groups[groupIndex].reports[reportIndex];
            var size = report.modalSize ? report.modalSize : 'sm';

            if (report.params.length > 0 &&
                $.grep(report.params, function (param) {
                    if (param.hidden) {
                        return param.hidden === false;
                    } else {
                        return true;
                    }
                }).length > 0) {
                $uibModal.open({
                    templateUrl: 'reports/params.html',
                    controller: 'OdsParamsController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: size,
                    resolve: {
                        report: [function () {
                            var deferred = $q.defer();
                            deferred.resolve(report);
                            return deferred.promise;
                        }]
                    }
                }).result.then(function (report) {
                    $scope.selectReport = report;
                    open(report);
                }, function () {
                });
            } else {
                $scope.selectReport = report;
                open(report);
            }
        }

        function open(report) {
            if (report.pdf !== undefined && !report.pdf) {
                forceDownload();
            } else {
                OdsReportsService.getReport(report).then(function (outReport) {
                    $scope.reportFile = convertDataURIToBinary(outReport);//getUrlReport(outReport);
                }, function () {

                });
            }
        }

        function downloadReport() {
            OdsReportsService.downloadReport($scope.selectReport);
        }

        function forceDownload() {
            OdsReportsService.forceDownload($scope.selectReport);
        }
    }
}
