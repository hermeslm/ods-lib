/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsReportsService', OdsReportsService);

    OdsReportsService.$inject = ['$q', '$http', 'moment', 'OdsParamType', 'OdsDateUtils', '$window'];

    function OdsReportsService($q, $http, moment, OdsParamType, OdsDateUtils, $window) {

        var pdfFooter = function (currentPage, pageCount) {
            return {
                columns: [
                    {
                        text: 'Report filter used',
                        margin: [20, 0],
                        fontSize: 10
                    },
                    {
                        text: 'Date: ' + moment().format('MM/DD/YYYY hh:mm') + '\n' +
                        'Page ' + currentPage.toString() + ' of ' + pageCount,
                        alignment: 'right',
                        margin: [0, 0, 20, 0],
                        fontSize: 10
                    }
                ]
            };
        };

        function pdfFooterWithFilters(report) {

            if (report.params.length > 0) {

                var filters = '';
                for (var i = 0; i < report.params.length; i++) {
                    var hideParam = report.params[i].hideInFooter !== undefined ?
                        report.params[i].hideInFooter : false;
                    if (!hideParam) {
                        switch (report.params[i].type) {
                            case OdsParamType.DATE:
                                filters += report.params[i].title + ': ' +
                                    OdsDateUtils.formatter(report.params[i].value, 'MM/dd/yyyy') + '\n';
                                break;
                            // case ParamType.NUMBER:
                            //     filters += report.params[i].title + ': ' + report.params[i].value + '\n';
                            //     break;
                            default:
                                filters += report.params[i].title + ': ' + report.params[i].value + '\n';
                                break;
                        }
                    }
                }

                return function (currentPage, pageCount) {
                    return {
                        columns: [
                            {
                                text: filters,
                                margin: [20, 0],
                                fontSize: 8
                            },
                            {
                                image: 'data:image/jpeg;base64,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',
                                fit: [100, 100],
                                margin: [0, 0, 0, 0]
                            },
                            {
                                text: 'Date: ' + moment().format('MM/DD/YYYY hh:mm') + '\n' +
                                'Page ' + currentPage.toString() + ' of ' + pageCount,
                                alignment: 'right',
                                margin: [0, 0, 20, 0],
                                fontSize: 8
                            }
                        ]
                    };
                };
            } else {
                return function (currentPage, pageCount) {
                    return {
                        columns: [
                            {
                                text: 'No Filters',
                                margin: [20, 0],
                                fontSize: 8
                            },
                            {
                                text: 'Date: ' + moment().format('MM/DD/YYYY hh:mm') + '\n' +
                                'Page ' + currentPage.toString() + ' of ' + pageCount,
                                alignment: 'right',
                                margin: [0, 0, 20, 0],
                                fontSize: 8
                            }
                        ]
                    };
                };
            }

        }

        var pdfContent = [];

        var service = {
            getHttpResource: getHttpResource,
            postHttpResource: postHttpResource,
            getReport: getReport,
            downloadReport: downloadReport,
            downloadReportFromSource: downloadReportFromSource,
            getSourceReport: getSourceReport,
            isMimeSupported: isMimeSupported,
            forceDownload: forceDownload,
            forceDownloadAndOpenPDFObject: forceDownloadAndOpenPDFObject
        };

        function postHttpResource(url, data) {
            var dataPromise = $http.post(url, data);
            return dataPromise;
        }

        function getHttpResource(url) {
            var dataPromise = $http.get(url);
            return dataPromise;
        }

        return service;

        function getReport(report) {

            return $q(function (resolve, reject) {

                var postReport = buildPost(report);

                postHttpResource(report.url, postReport).then(function success(response) {

                    //Check if the pdf is in base64
                    if (report.base64) {
                        resolve('data:application/pdf;base64,' + response.data.file);
                    } else {
                        var pdfData = response.data;
                        pdfData.footer = pdfFooterWithFilters(report);
                        var pdfFile = pdfMake.createPdf(pdfData);
                        // var pdfFile = pdfMake.createPdf(response.data);
                        pdfFile.getBase64(function (output) {
                            // resolve(base64ToUint8Array(output));
                            resolve('data:application/pdf;base64,' + output);
                        });
                    }
                }, function error(response) {
                    var pdfFile = pdfMake.createPdf(createErrorPdf(response));
                    // var pdfFile = pdfMake.createPdf(response.data);
                    pdfFile.getBase64(function (output) {
                        // resolve(base64ToUint8Array(output));
                        resolve('data:application/pdf;base64,' + output);
                    });
                    // console.log(response);
                });
            });
        }

        function downloadReport(report) {

            var postReport = buildPost(report);

            postHttpResource(report.url, postReport).then(function success(response) {

                //Check if the pdf is in base64
                if (report.base64) {
                    var file = 'data:application/pdf;base64,' + response.data.file;

                    var isChrome = !!window.chrome && !!window.chrome.webstore;
                    var isIE = /*@cc_on!@*/false || !!document.documentMode;
                    var isEdge = !isIE && !!window.StyleMedia;

                    if (isChrome) {
                        var downloadLink = angular.element('<a></a>');
                        downloadLink.attr('href', file);
                        downloadLink.attr('target', '_blank');
                        downloadLink.attr('download', report.title);
                        downloadLink[0].click();
                    }
                    else if (isEdge || isIE) {
                        window.navigator.msSaveOrOpenBlob(file, report.title);
                    }
                    else {
                        var fileURL = URL.createObjectURL(file);
                        window.open(fileURL);
                    }
                } else {
                    var pdfData = response.data;
                    pdfData.footer = pdfFooterWithFilters(report);
                    pdfMake.createPdf(pdfData).download(report.title);
                }
            }, function error(response) {
                pdfMake.createPdf(createErrorPdf(response)).download(report.title);
            });
        }

        function downloadReportFromSource(pdfSource, report) {
            var pdfData = pdfSource;
            pdfData.footer = pdfFooterWithFilters(report);
            pdfMake.createPdf(pdfData).download(report.title);
        }

        function getSourceReport(report) {

            return $q(function (resolve, reject) {

                var postReport = buildPost(report);

                postHttpResource(report.url, postReport).then(function success(response) {

                    //Check if the pdf is in base64
                    if (report.base64) {
                        resolve('data:application/pdf;base64,' + response.data.file);
                    } else {
                        var pdfData = response.data;
                        pdfData.footer = pdfFooterWithFilters(report);
                        resolve(pdfData);
                    }
                }, function error(response) {
                    var pdfFile = createErrorPdf(response);
                    resolve(pdfFile);
                });
            });
        }

        function createErrorPdf(response) {

            var dd = {
                'content': [
                    {text: 'Error loading report with status: ' + response.status, color: '#ff0000'},
                    {text: 'Status text: ' + response.statusText, color: '#ff0000'},
                ]
            };

            return dd;
        }

        function isMimeSupported() {

            if ($window.navigator && $window.navigator.mimeTypes && $window.navigator.mimeTypes['application/pdf']) {
                // You may add extra attributes (eg. to allow transparency) or style the iframe
                return true;
            } else {
                return false;
            }
        }

        function buildUrl(report) {

            var url = report.url;
            for (var i = 0; i < report.params.length; i++) {
                var value;
                switch (report.params[i].type) {
                    case OdsParamType.DATE:
                        value = OdsDateUtils.convertLocalDateToServer(report.params[i].value);
                        break;
                    default:
                        value = report.params[i].value;
                        break;
                }
                url += '/' + value;
            }
            return url;
        }

        function buildPost(report) {

            // var url = report.url;
            var params = [];
            for (var i = 0; i < report.params.length; i++) {
                var param = {
                    name: report.params[i].name,
                    type: report.params[i].type,
                    value: null
                };
                switch (report.params[i].type) {
                    case OdsParamType.DATE:
                        param.value = [OdsDateUtils.convertLocalDateToServer(report.params[i].value)];
                        break;
                    case OdsParamType.LIST:
                        param.value = [report.params[i].value];
                        break;
                    case OdsParamType.SINGLE_SELECT:
                        var idField = report.params[i].valueField !== undefined ? report.params[i].valueField : 'id';
                        param.value = [report.params[i].value[idField]];
                        break;
                    case OdsParamType.MULTI_SELECT:
                        var tmpParams = [];
                        for (var j = 0; j < report.params[i].value.length; j++) {
                            var idField = report.params[i].valueField !== undefined ? report.params[i].valueField : 'id';
                            tmpParams.push(report.params[i].value[j][idField]);
                        }
                        param.value = tmpParams;
                        break;
                    case OdsParamType.TABLE_SELECT:
                        var tmpParams = [];
                        for (var key in report.params[i].value) {
                            if (key === 'length' || !report.params[i].value.hasOwnProperty(key)) continue;
                            var value = key;
                            if (report.params[i].value[key]) {
                                tmpParams.push(value);
                            }

                        }
                        param.value = tmpParams;
                        break;
                    default:
                        param.value = [report.params[i].value];
                        break;
                }
                params.push(param);
            }

            var postReport = {
                title: report.title,
                params: params,
                pageOrientation: report.pageOrientation
            };

            return postReport;
        }

        function forceDownload(report) {
            var postReport = buildPost(report);

            postHttpResource(report.url, postReport).then(function success(response) {
                var contentType = response.headers('Content-Type');
                var contentDisp = response.headers('Content-Disposition');
                var index = contentDisp.indexOf('filename="');

                var filename = "filename";

                if (index != -1) {
                    var i = index + 10;
                    while (contentDisp[i] != '"') {
                        i++;
                    }

                    filename = contentDisp.substring(index + 10, i);
                }

                var a = document.createElement("a");
                a.href = URL.createObjectURL(new Blob([response.data], {type: contentType}));
                a.download = filename;
                a.click();
            }, function error(response) {
                pdfMake.createPdf(createErrorPdf(response)).download(report.title);
            });
        }

        function forceDownloadAndOpenPDFObject(data) {
            pdfMake.createPdf(data).open();
        }
    }
})();
