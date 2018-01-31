/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('MainCtrl', function ($scope, OdsParamType, OdsPageOrientation) {

    // var vm = this;

    $scope.reportsGroup = {
        title: 'Reports Groups',
        groups: [{
            id: 1,
            open: false,
            disabled: false,
            title: 'Reports Group 1',
            icon: 'fa fa-dashboard',
            reports: [
                {
                    id: 0,
                    title: 'Report 1',
                    url: '/api/report/report1',
                    multiCols: false,
                    modalSize: 'sm',
                    params: [{
                        title: 'Hidden Param',
                        name: 'hidden_id',
                        type: OdsParamType.NUMBER,
                        value: 1,
                        required: true,
                        hidden: true
                    }, {
                        title: 'Select Param',
                        name: 'param2',
                        placeholder: 'Select Param...',
                        type: OdsParamType.MULTI_SELECT,
                        valueField: 'value',
                        titleField: 'text',
                        required: false,
                        value: [],
                        list: [{
                            value: 1,
                            text: 'Value 1'
                        }, {
                            value: 2,
                            text: 'Value 2'
                        }, {
                            value: 3,
                            text: 'Value 3'
                        }]
                    }, {
                        title: 'Date Param',
                        name: 'start_date',
                        required: true,
                        type: OdsParamType.DATE,
                        value: new Date()//new Date(1980, 0, 24) way to pass default value in params
                    }]
                },
                {
                    id: 0,
                    title: 'Report 2',
                    url: '/api/report/report2',
                    multiCols: false,
                    pageOrientation: OdsPageOrientation.PORTRAIT,
                    cols: true,
                    modalSize: 'lg',
                    params: [{
                        title: 'Hidden Param',
                        name: 'hidden_id',
                        type: OdsParamType.NUMBER,
                        value: 1,
                        required: true,
                        hidden: true
                    }, {
                        title: 'Select Param',
                        name: 'param2',
                        placeholder: 'Select Param...',
                        type: OdsParamType.MULTI_SELECT,
                        valueField: 'value',
                        titleField: 'text',
                        required: false,
                        value: [],
                        list: [{
                            value: 1,
                            text: 'Value 1'
                        }, {
                            value: 2,
                            text: 'Value 2'
                        }, {
                            value: 3,
                            text: 'Value 3'
                        }]
                    }, {
                        title: 'Date Param',
                        name: 'start_date',
                        required: true,
                        type: OdsParamType.DATE,
                        value: new Date()//new Date(1980, 0, 24) way to pass default value in params
                    }]
                }
            ]
        }, {
            id: 1,
            open: false,
            disabled: false,
            title: 'Reports Group 2',
            icon: 'fa fa-dashboard',
            reports: [
                {
                    id: 0,
                    title: 'Report 3',
                    url: '/api/report/report1',
                    multiCols: false,
                    params: [{
                        id: 1,
                        title: 'Language',
                        name: 'language',
                        hideInFooter: true,
                        type: OdsParamType.LIST,
                        value: '1',
                        list: [{
                            id: '1',
                            name: 'English'
                        }, {
                            id: '2',
                            name: 'Spanish'
                        }]
                    }, {
                        title: 'Date Param',
                        name: 'start_date',
                        required: true,
                        type: OdsParamType.DATE,
                        value: new Date()//new Date(1980, 0, 24) way to pass default value in params
                    }]
                },
                {
                    id: 0,
                    title: 'Report 4',
                    url: '/api/report/report1',
                    multiCols: false,
                    params: [{
                        title: 'Hidden Param',
                        name: 'hidden_id',
                        type: OdsParamType.NUMBER,
                        value: 1,
                        required: true,
                        hidden: true
                    }, {
                        title: 'Select Param',
                        name: 'param2',
                        placeholder: 'Select Param...',
                        type: OdsParamType.MULTI_SELECT,
                        valueField: 'value',
                        titleField: 'text',
                        required: false,
                        value: [],
                        list: [{
                            value: 1,
                            text: 'Value 1'
                        }, {
                            value: 2,
                            text: 'Value 2'
                        }, {
                            value: 3,
                            text: 'Value 3'
                        }]
                    }, {
                        title: 'Date Param',
                        name: 'start_date',
                        required: true,
                        type: OdsParamType.DATE,
                        value: new Date()//new Date(1980, 0, 24) way to pass default value in params
                    }]
                }]
        }]
    };

});
