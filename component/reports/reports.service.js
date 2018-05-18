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

        return service;

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
                            case OdsParamType.NUMBER:
                                filters += report.params[i].title + ': ' + report.params[i].value + '\n';
                                break;
                            default:
                                filters += report.params[i].title + ': ' + report.params[i].value + '\n';
                                break;
                        }
                    }
                }

                return function (currentPage, pageCount) {

                    var result;
                    if (report.footerLogo) {
                        result = {
                            columns: [
                                {
                                    text: filters,
                                    margin: [20, 0],
                                    fontSize: 8
                                },
                                {
                                    image: report.footerLogo,
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
                        }
                    } else {
                        result = {
                            columns: [
                                {
                                    text: filters,
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
                        }
                    }
                    return result;
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

        function postHttpResource(url, data) {

            return $http.post(url, data);
        }

        function getHttpResource(url) {

            return $http.get(url);
        }

        function getReport(report) {

            return $q(function (resolve) {

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

        function download(base64Data, title) {

            var arrBuffer = base64ToArrayBuffer(base64Data);

            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([arrBuffer], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
            var data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            document.body.appendChild(link); //required in FF, optional for Chrome
            link.href = data;
            link.download = title + ".pdf";
            link.click();
            window.URL.revokeObjectURL(data);
            link.remove();
        }

        function base64ToArrayBuffer(data) {
            var binaryString = window.atob(data);
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++) {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            return bytes;
        }

        function downloadReport(report) {

            var postReport = buildPost(report);
            postHttpResource(report.url, postReport).then(function success(response) {

                //Check if the pdf is in base64
                if (report.base64) {
                    download(response.data.file, report.title);
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

            return $q(function (resolve) {

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
                    {text: 'Status text: ' + response.statusText, color: '#ff0000'}
                ]
            };

            return dd;
        }

        function isMimeSupported() {

            return !!($window.navigator && $window.navigator.mimeTypes && $window.navigator.mimeTypes['application/pdf']);
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
                var tmpParams = [];
                var idField;
                switch (report.params[i].type) {
                    case OdsParamType.DATE:
                        param.value = [OdsDateUtils.convertLocalDateToServer(report.params[i].value)];
                        break;
                    case OdsParamType.LIST:
                        param.value = [report.params[i].value];
                        break;
                    case OdsParamType.SINGLE_SELECT:
                        idField = report.params[i].valueField !== undefined ? report.params[i].valueField : 'id';
                        param.value = [report.params[i].value[idField]];
                        break;
                    case OdsParamType.MULTI_SELECT:
                        param.value = getListValue(report.params[i]);
                        break;
                    case OdsParamType.TABLE_SELECT:
                        tmpParams = [];
                        for (var key in report.params[i].value) {
                            if (key === 'length' || !report.params[i].value.hasOwnProperty(key)) {
                                continue;
                            }
                            var value = key;
                            if (report.params[i].value[key]) {
                                tmpParams.push(value);
                            }

                        }
                        param.value = tmpParams;
                        break;
                    case OdsParamType.DRAG_AND_DROP:
                        param.value = getListValue(report.params[i]);
                        break;
                    case OdsParamType.CHECK_LIST:
                        param.value = getListValue(report.params[i]);
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

        function getListValue(param) {

            var tmpValue = [];
            var idField;
            for (var i = 0; i < param.value.length; i++) {
                idField = param.valueField !== undefined ? param.valueField : 'id';
                tmpValue.push(param.value[i][idField]);
            }
            return tmpValue;
        }

        function forceDownload(report) {

            var postReport = buildPost(report);
            postHttpResource(report.url, postReport).then(function success(response) {
                var contentType = response.headers('Content-Type');
                var contentDisp = response.headers('Content-Disposition');
                var index = contentDisp.indexOf('filename="');

                var filename = 'filename';

                if (index !== -1) {
                    var i = index + 10;
                    while (contentDisp[i] !== '"') {
                        i++;
                    }

                    filename = contentDisp.substring(index + 10, i);
                }

                var a = document.createElement('a');
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
