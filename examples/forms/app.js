/**
 * Created by hermeslm on 3/28/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('FormsController', FormsController);

FormsController.$inject = ['$scope', 'OdsFieldType', 'OdsComponentType', 'OdsFormService'];

function FormsController($scope, OdsFieldType, OdsComponentType, OdsFormService) {

    // var $scope = this;

    var section0 = {
        "name": "section9543",
        "componentType": "section",
        "title": "Section",
        "displayProperties": false,
        "allowedTypes": [
            "row"
        ],
        "rows": [
            // {
            //     "name": "row9545",
            //     "componentType": "row",
            //     "cssClass": "row",
            //     "displayProperties": false,
            //     "cols": [
            //         {
            //             "name": "column9547",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "DateTime",
            //                     "name": "field8869",
            //                     "type": "datetime",
            //                     "enableTime": false,
            //                     "format": "MM/dd/yyyy",
            //                     "selectedFormat": "MM/dd/yyyy",
            //                     "options": {
            //                         "timezone": "UTC/GMT"
            //                     },
            //                     "required": false,
            //                     "value": "2017-12-04T17:15:17.743Z",
            //                     "popoverProps": false,
            //                     "showProperties": false,
            //                     "open": false
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "column9547",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "Number",
            //                     "name": "field3872",
            //                     "placeholder": "",
            //                     "type": "number",
            //                     "required": false,
            //                     "patternSelect": "4",
            //                     "validation": {
            //                         "pattern": "^-{0,1}\\d+$",
            //                         "required": true,
            //                         "messages": {
            //                             "required": "Numero requerido",
            //                             "pattern": "Solo valores enteros"
            //                         }
            //                     },
            //                     "showProperties": false,
            //                     "value": 12,
            //                     "popoverProps": false
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "column3153",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "TextBox",
            //                     "name": "field3155",
            //                     "placeholder": "",
            //                     "type": "text",
            //                     "required": false,
            //                     "value": "twertwerwe ertwertwe",
            //                     "validation": {
            //                         "messages": {}
            //                     },
            //                     "popoverProps": false,
            //                     "showProperties": false
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "column3154",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "TextBox",
            //                     "name": "field3156",
            //                     "placeholder": "",
            //                     "type": "text",
            //                     "required": false,
            //                     "value": "werwertwer wertwert",
            //                     "validation": {
            //                         "messages": {}
            //                     },
            //                     "popoverProps": false,
            //                     "showProperties": false
            //                 }
            //             ]
            //         }
            //     ],
            //     "showProperties": false
            // },
            // {
            //     "name": "row1149",
            //     "componentType": "row",
            //     "cssClass": "row",
            //     "displayProperties": false,
            //     "cols": [
            //         {
            //             "name": "column1150",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "Radiobutton List",
            //                     "name": "field1154",
            //                     "type": "radio",
            //                     "options": [
            //                         {
            //                             "id": 1,
            //                             "name": "Option 1"
            //                         },
            //                         {
            //                             "id": 2,
            //                             "name": "Option 2"
            //                         },
            //                         {
            //                             "id": 3,
            //                             "name": "Option 3"
            //                         }
            //                     ],
            //                     "value": "2",
            //                     "popoverProps": false,
            //                     "showProperties": false,
            //                     "inline": true
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "column1151",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "Select",
            //                     "name": "field1155",
            //                     "placeholder": "",
            //                     "type": "select",
            //                     "required": false,
            //                     "multiSelect": false,
            //                     "valueField": "id",
            //                     "titleField": "name",
            //                     "limitTo": 10,
            //                     "value": {
            //                         "id": 1,
            //                         "name": "Option 1"
            //                     },
            //                     "options": [
            //                         {
            //                             "id": 1,
            //                             "name": "Option 1"
            //                         },
            //                         {
            //                             "id": 2,
            //                             "name": "Option 2"
            //                         },
            //                         {
            //                             "id": 3,
            //                             "name": "Option 3"
            //                         }
            //                     ],
            //                     "validation": {
            //                         "messages": {}
            //                     },
            //                     "popoverProps": false,
            //                     "showProperties": false
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "column1152",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "Multi select",
            //                     "name": "field1156",
            //                     "placeholder": "",
            //                     "type": "multiselect",
            //                     "required": false,
            //                     "multiSelect": true,
            //                     "valueField": "id",
            //                     "titleField": "name",
            //                     "limitTo": 10,
            //                     "value": [
            //                         {
            //                             "id": "1",
            //                             "name": "sdfsdfsdf"
            //                         },
            //                         {
            //                             "id": "2",
            //                             "name": "fgsdsdsdf"
            //                         }
            //                     ],
            //                     "options": [
            //                         {
            //                             "id": "1",
            //                             "name": "sdfsdfsdf"
            //                         },
            //                         {
            //                             "id": "2",
            //                             "name": "fgsdsdsdf"
            //                         },
            //                         {
            //                             "id": "3",
            //                             "name": "fgsdfgsdfgsdf"
            //                         }
            //                     ],
            //                     "render": null,
            //                     "validation": {
            //                         "messages": {}
            //                     },
            //                     "popoverProps": false,
            //                     "showProperties": false
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "column1153",
            //             "cssClass": "col-lg-3",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "CheckBox",
            //                     "hideLabel": false,
            //                     "ln": false,
            //                     "name": "field1157",
            //                     "type": "checkbox",
            //                     "value": true,
            //                     "popoverProps": false,
            //                     "showProperties": false
            //                 }
            //             ]
            //         }
            //     ],
            //     "showProperties": false
            // },
            // {
            //     "name": "row6817",
            //     "componentType": "row",
            //     "cssClass": "row",
            //     "displayProperties": false,
            //     "cols": [
            //         {
            //             "name": "column6818",
            //             "cssClass": "col-lg-6",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "CheckBox List",
            //                     "name": "field6820",
            //                     "type": "checkboxlist",
            //                     "options": [
            //                         {
            //                             "id": 1,
            //                             "name": "Option 1"
            //                         },
            //                         {
            //                             "id": 2,
            //                             "name": "Option 2"
            //                         },
            //                         {
            //                             "id": 3,
            //                             "name": "Option 3"
            //                         }
            //                     ],
            //                     "value": {
            //                         "1": true,
            //                         "2": true,
            //                         "3": true
            //                     },
            //                     "popoverProps": false,
            //                     "showProperties": false,
            //                     "inline": true
            //                 }
            //             ]
            //         },
            //         {
            //             "name": "column6819",
            //             "cssClass": "col-lg-6",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "Toggle",
            //                     "name": "field6821",
            //                     "type": "toggle",
            //                     "ln": false,
            //                     "on": "Yes",
            //                     "off": "No",
            //                     "value": true
            //                 }
            //             ]
            //         }
            //     ],
            //     "showProperties": false
            // },
            {
                "name": "row2364",
                "componentType": "row",
                "cssClass": "row",
                "displayProperties": false,
                "cols": [
                    {
                        "name": "column2365",
                        "cssClass": "col-lg-6",
                        "allowedTypes": [
                            "field"
                        ],
                        "fields": [
                            {
                                "componentType": "field",
                                "label": "If yes:",
                                "name": "field2367",
                                "type": "if_yes",
                                "ln": true,
                                "on": "Yes",
                                "off": "No",
                                "value": {
                                    "toggle": true,
                                    "textarea": "gfhdfdfg dfghdfghd dfhdfgdfgh."
                                },
                                "placeholder": "",
                                "validation": {
                                    "messages": {}
                                },
                                "popoverProps": false,
                                "showProperties": false
                            }
                        ]
                    },
                    {
                        "name": "column2366",
                        "cssClass": "col-lg-6",
                        "allowedTypes": [
                            "field"
                        ],
                        "fields": [
                            {
                                "componentType": "field",
                                "label": "CKEditor",
                                "name": "field2368",
                                "type": "ckeditor",
                                "readonly": false,
                                "printView": false,
                                "options": {
                                    "triggerKeyCode": 1114144,
                                    "prefix": "${",
                                    "suffix": "}",
                                    "suggestionsUrl": "",
                                    "tokensUrl": "http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/tokens.json",
                                    "locked": true,
                                    "suggestions": [
                                        {
                                            "id": "patientName",
                                            "label": "Patient Name"
                                        },
                                        {
                                            "id": "patientDob",
                                            "label": "Patient DOB"
                                        },
                                        {
                                            "id": "patientGender",
                                            "label": "Patient Gender"
                                        },
                                        {
                                            "id": "patientMaritalStatus",
                                            "label": "Patient Marital Status"
                                        }
                                    ],
                                    "tokens": {
                                        "patientName": "Hermes Lorenzo",
                                        "patientDob": "01/24/1980",
                                        "patientGender": "Male",
                                        "patientMaritalStatus": "Single"
                                    }
                                },
                                "value": "<p>gfdfhdfg dfgdfhdfghd dfghdfghdf dfgdfdfg</p>\n",
                                "popoverProps": false,
                                "showProperties": false
                            }
                        ]
                    }
                ],
                "showProperties": false
            }//,
            // {
            //     "name": "row4227",
            //     "componentType": "row",
            //     "cssClass": "row",
            //     "displayProperties": false,
            //     "cols": [
            //         {
            //             "name": "column4228",
            //             "cssClass": "col-lg-12",
            //             "allowedTypes": [
            //                 "field"
            //             ],
            //             "fields": [
            //                 {
            //                     "componentType": "field",
            //                     "label": "Table",
            //                     "name": "field4229",
            //                     "type": "table",
            //                     "cssClass": "table table-bordered table-responsive position-relative",
            //                     "matrix": [
            //                         [
            //                             {
            //                                 "name": "form4223",
            //                                 "fields": [
            //                                     {
            //                                         "componentType": "field",
            //                                         "label": "Label",
            //                                         "cssClass": "text-left",
            //                                         "name": "field4230",
            //                                         "type": "label",
            //                                         "value": "Label"
            //                                     }
            //                                 ],
            //                                 "allowedTypes": [
            //                                     "field"
            //                                 ],
            //                                 "totalLabel": "Total"
            //                             },
            //                             {
            //                                 "name": "form4224",
            //                                 "fields": [
            //                                     {
            //                                         "componentType": "field",
            //                                         "label": "TextBox",
            //                                         "name": "field4231",
            //                                         "placeholder": "",
            //                                         "type": "text",
            //                                         "required": false,
            //                                         "value": "dfghdfghd dfghdfghdf dfghdfghdf.",
            //                                         "validation": {
            //                                             "messages": {}
            //                                         }
            //                                     }
            //                                 ],
            //                                 "allowedTypes": [
            //                                     "field"
            //                                 ],
            //                                 "totalLabel": "Total"
            //                             },
            //                             {
            //                                 "name": "form8467",
            //                                 "fields": [
            //                                     {
            //                                         "componentType": "field",
            //                                         "label": "Number",
            //                                         "name": "field8468",
            //                                         "placeholder": "",
            //                                         "type": "number",
            //                                         "required": false,
            //                                         "value": 10,
            //                                         "validation": {
            //                                             "messages": {}
            //                                         }
            //                                     }
            //                                 ],
            //                                 "allowedTypes": [
            //                                     "field"
            //                                 ],
            //                                 "totalLabel": "Total",
            //                                 "total": true
            //                             }
            //                         ],
            //                         [
            //                             {
            //                                 "name": "form8469",
            //                                 "fields": [
            //                                     {
            //                                         "componentType": "field",
            //                                         "label": "Label",
            //                                         "cssClass": "text-left",
            //                                         "name": "field8472",
            //                                         "type": "label",
            //                                         "value": "Label"
            //                                     }
            //                                 ],
            //                                 "allowedTypes": [
            //                                     "field"
            //                                 ]
            //                             },
            //                             {
            //                                 "name": "form8470",
            //                                 "fields": [
            //                                     {
            //                                         "componentType": "field",
            //                                         "label": "Select",
            //                                         "name": "field8474",
            //                                         "placeholder": "",
            //                                         "type": "select",
            //                                         "required": false,
            //                                         "multiSelect": false,
            //                                         "valueField": "id",
            //                                         "titleField": "name",
            //                                         "limitTo": 10,
            //                                         "value": {
            //                                             "id": 3,
            //                                             "name": "Option 3"
            //                                         },
            //                                         "options": [
            //                                             {
            //                                                 "id": 1,
            //                                                 "name": "Option 1"
            //                                             },
            //                                             {
            //                                                 "id": 2,
            //                                                 "name": "Option 2"
            //                                             },
            //                                             {
            //                                                 "id": 3,
            //                                                 "name": "Option 3"
            //                                             }
            //                                         ],
            //                                         "validation": {
            //                                             "messages": {}
            //                                         }
            //                                     }
            //                                 ],
            //                                 "allowedTypes": [
            //                                     "field"
            //                                 ]
            //                             },
            //                             {
            //                                 "name": "form8471",
            //                                 "fields": [
            //                                     {
            //                                         "componentType": "field",
            //                                         "label": "Number",
            //                                         "name": "field8475",
            //                                         "placeholder": "",
            //                                         "type": "number",
            //                                         "required": false,
            //                                         "value": 20,
            //                                         "validation": {
            //                                             "messages": {}
            //                                         }
            //                                     }
            //                                 ],
            //                                 "allowedTypes": [
            //                                     "field"
            //                                 ]
            //                             }
            //                         ]
            //                     ],
            //                     "validation": {
            //                         "messages": {}
            //                     },
            //                     "popoverProps": false,
            //                     "showProperties": true,
            //                     "totals": true,
            //                     "rowHeader": true,
            //                     "canCloneRow": false
            //                 }
            //             ]
            //         }
            //     ],
            //     "showProperties": false
            // }
        ],
        "showProperties": false
    };

    $scope.section1 = {
        name: 'section1',
        componentType: OdsComponentType.SECTION,
        title: '1. CLIENT’S PRESENTING PROBLEM(S): (list specific symptoms, criteria for diagnosis and justification of treatment recommendations)',
        rows: [{
            cssClass: 'row',
            componentType: OdsComponentType.ROW,
            cols: [{
                cssClass: 'col-lg-12',
                fields: [{
                    label: 'Problems',
                    name: 'problems',
                    placeholder: 'Type the patient problems...',
                    type: OdsFieldType.TEXTAREA,
                    componentType: OdsComponentType.FIELD,
                    required: true,
                    rows: 8,
                    value: ''
                }]
            }]
        }]
    };

    $scope.section2 = {
        name: 'section2',
        componentType: OdsComponentType.SECTION,
        title: '2. CLIENT\'S ASSESSMENT OF SITUATION: (list how the client’s symptoms are affecting clients emotional functioning and use their own words.',
        rows: [{
            cssClass: 'row',
            componentType: OdsComponentType.ROW,
            cols: [{
                cssClass: 'col-lg-12',
                fields: [{
                    label: 'Situation',
                    name: 'situation',
                    placeholder: 'Type the patient situation...',
                    type: OdsFieldType.TEXTAREA,
                    componentType: OdsComponentType.FIELD,
                    required: true,
                    rows: 2,
                    value: ''
                }]
            }]
        }]
    };

    $scope.section3 = {
        name: 'section3',
        componentType: OdsComponentType.SECTION,
        title: '3. Suicide/Homicide Risk Mini Screening.',
        rows: [{
            cssClass: 'row',
            componentType: OdsComponentType.ROW,
            cols: [{
                cssClass: 'col-lg-4',
                fields: [{
                    label: "Have you ever thought about killing yourself or others?",
                    name: "suicide",
                    type: "toggle",
                    componentType: "field",
                    ln: false,
                    on: "Yes",
                    off: "No",
                    value: false,
                    validation: {
                        required: true,
                        messages: {
                            required: "Campo requerido"
                        }
                    }
                }]
            }, {
                cssClass: 'col-lg-8',
                fields: [{
                    label: 'If yes, explain',
                    name: 'suicideIfTrue',
                    placeholder: '',
                    type: OdsFieldType.TEXT,
                    componentType: OdsComponentType.FIELD,
                    required: false,
                    value: ''
                }]
            }]
        }, {
            cssClass: 'row',
            componentType: OdsComponentType.ROW,
            cols: [{
                cssClass: 'col-lg-4',
                fields: [{
                    label: 'Do you own a weapon?',
                    name: 'weapon',
                    type: OdsFieldType.TOGGLE,
                    componentType: OdsComponentType.FIELD,
                    ln: false,
                    on: 'Yes',
                    off: 'No',
                    value: ''
                }]
            }, {
                cssClass: 'col-lg-8',
                fields: [{
                    label: 'If yes, explain',
                    name: 'weaponIfTrue',
                    placeholder: '',
                    type: OdsFieldType.TEXT,
                    componentType: OdsComponentType.FIELD,
                    required: false,
                    value: ''
                }]
            }]
        }]
    };

    $scope.section4 = {
        name: 'section4',
        componentType: OdsComponentType.SECTION,
        title: '4. Sexual History.',
        rows: [{
            cssClass: 'row',
            componentType: OdsComponentType.ROW,
            cols: [{
                cssClass: 'col-lg-6',
                fields: [{
                    label: 'What is your sexual orientation?',
                    name: 'sexualOrientation',
                    required: true,
                    multiSelect: false,
                    placeholder: 'Type sexual orientation...',
                    type: OdsFieldType.SELECT,
                    componentType: OdsComponentType.FIELD,
                    valueField: 'value',
                    titleField: 'text',
                    limitTo: 10,
                    render: function (element) {
                        if (element.length === 0) {
                            return 'Type sexual orientation...';
                        } else {
                            return element.text;
                        }
                    },
                    value: null,
                    options: [{
                        value: 1,
                        text: 'Heterosexual'
                    }, {
                        value: 2,
                        text: 'Homosexual'
                    }, {
                        value: 3,
                        text: 'Bisexual'
                    }],
                    validation: {
                        required: true,
                        messages: {
                            required: 'Campo requerido'
                        }
                    }
                }]
            }, {
                cssClass: 'col-lg-6',
                fields: [{
                    label: 'Describe current sexual activity',
                    name: 'sexualActivity',
                    required: true,
                    multiSelect: false,
                    placeholder: 'Type sexual activity...',
                    type: OdsFieldType.MULTI_SELECT,
                    componentType: OdsComponentType.FIELD,
                    valueField: 'id',
                    titleField: 'name',
                    limitTo: 10,
                    render: function (element) {
                        if (element.length === 0) {
                            return 'Type sexual activity...';
                        } else {
                            return element.name;
                        }
                    },
                    value: [],
                    options: [{
                        id: 1,
                        name: 'Abstains'
                    }, {
                        id: 2,
                        name: 'Single partner'
                    }, {
                        id: 3,
                        name: 'Multiple partners'
                    }]
                }]
            }]
        }]
    };

    // $scope.row2 = {
    //     cssClass: 'row',
    //     cols: [{
    //         cssClass: 'col-lg-4',
    //         field: {
    //             label: 'Clinic',
    //             name: 'clinic_id',
    //             type: OdsFieldType.NUMBER,
    //             value: 1,
    //             required: true,
    //             hidden: true
    //         }
    //     }, {
    //         cssClass: 'col-lg-4',
    //         field: {
    //             label: 'Draw day',
    //             name: 'drawDay',
    //             placeholder: 'Select draw day...',
    //             type: OdsFieldType.TEXT,
    //             required: true,
    //             value: ''
    //         }
    //     }, {
    //         cssClass: 'col-lg-4',
    //         field: {
    //             label: 'Start Date',
    //             name: 'start_date',
    //             required: true,
    //             type: OdsFieldType.DATE,
    //             value: new Date()
    //         }
    //     }]
    // };
    //
    // $scope.row3 = {
    //     cssClass: 'row',
    //     cols: [{
    //         cssClass: 'col-lg-12',
    //         field: {
    //             label: 'Description',
    //             name: 'description',
    //             placeholder: 'Type a description...',
    //             type: OdsFieldType.TEXTAREA,
    //             required: true,
    //             rows: 3,
    //             value: ''
    //         }
    //     }]
    // };
    $scope.sectionTmp = {
        "name": "section6627",
        "componentType": "section",
        "title": "Section",
        "displayProperties": false,
        "allowedTypes": [
            "row"
        ],
        "rows": [
            {
                "name": "row6628",
                "componentType": "row",
                "cssClass": "row",
                "displayProperties": false,
                "cols": [
                    {
                        "name": "column6629",
                        "cssClass": "col-lg-12",
                        "allowedTypes": [
                            "field"
                        ],
                        "fields": [{
                            "componentType": "field",
                            "label": "CKEditor",
                            "name": "field6610",
                            "type": "ckeditor",
                            "readonly": false,
                            "usedAsConsent": true,
                            "options": {
                                "triggerKeyCode": 1114144,
                                "prefix": "${",
                                "suffix": "}",
                                "suggestionsUrl": "http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/suggestions.json",
                                "tokensUrl": "http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/tokens.json",
                                "locked": true,
                                "suggestions": [
                                    {
                                        "id": "patientName",
                                        "label": "Patient Name"
                                    },
                                    {
                                        "id": "patientDob",
                                        "label": "Patient DOB"
                                    },
                                    {
                                        "id": "patientGender",
                                        "label": "Patient Gender"
                                    },
                                    {
                                        "id": "patientMaritalStatus",
                                        "label": "Patient Marital Status"
                                    }
                                ],
                                "tokens": null
                            },
                            "value": "<p>The patient&nbsp;&nbsp;<span class=\"marker\">${patientName}</span>&nbsp; with date of born&nbsp;&nbsp;<span class=\"marker\">${patientDob}</span>&nbsp;and gender&nbsp;&nbsp;<span class=\"marker\">${patientGender}</span>&nbsp;having a marital status&nbsp;&nbsp;<span class=\"marker\">${patientMaritalStatus}</span>&nbsp;:</p>\n\n<ul>\n\t<li>Case 1: This case is a test.</li>\n\t<li>Case 2: This is a second test.</li>\n</ul>\n",
                            "popoverProps": false,
                            "showProperties": true
                        }]
                    }
                ],
                "showProperties": true
            }
        ],
        "showProperties": false
    };

    $scope.sectionLast = {
        name: 'section1',
        componentType: OdsComponentType.SECTION,
        title: 'Test Section',
        rows: [{
            cssClass: 'row',
            componentType: OdsComponentType.ROW,
            cols: [{
                cssClass: 'col-lg-12',
                fields: [{
                    "componentType": "field",
                    "label": "Table",
                    "name": "field5817",
                    "type": "table",
                    "cssClass": "table table-bordered table-responsive position-relative",
                    "matrix": [
                        [
                            {
                                "name": "item5815",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "Label",
                                        "cssClass": "text-left",
                                        "name": "field48",
                                        "type": "label",
                                        "value": "Label"
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ],
                                "totalLabel": "Total"
                            },
                            {
                                "name": "item5816",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "Label",
                                        "cssClass": "text-left",
                                        "name": "field2586",
                                        "type": "label",
                                        "value": "Label"
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ],
                                "totalLabel": "Total",
                                "total": true
                            },
                            {
                                "name": "item2022",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "Label",
                                        "cssClass": "text-left",
                                        "name": "field2587",
                                        "type": "label",
                                        "value": "Label"
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ],
                                "totalLabel": "Total"
                            }
                        ],
                        [
                            {
                                "name": "item5821",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "Label",
                                        "cssClass": "text-left",
                                        "name": "field2585",
                                        "type": "label",
                                        "value": "Label"
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ],
                                "totalLabel": "Total"
                            },
                            {
                                "name": "item5823",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "Number",
                                        "name": "field2584",
                                        "placeholder": "",
                                        "type": "number",
                                        "required": false,
                                        "value": 1,
                                        "validation": {
                                            "messages": {}
                                        }
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ],
                                "totalLabel": "Total"
                            },
                            {
                                "name": "item2023",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "TextBox",
                                        "name": "field2583",
                                        "placeholder": "",
                                        "type": "text",
                                        "required": false,
                                        "value": null,
                                        "validation": {
                                            "messages": {}
                                        }
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ]
                            }
                        ],
                        [
                            {
                                "name": "item2577",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "Label",
                                        "cssClass": "text-left",
                                        "name": "field2580",
                                        "type": "label",
                                        "value": "Label"
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ]
                            },
                            {
                                "name": "item2578",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "Number",
                                        "name": "field2581",
                                        "placeholder": "",
                                        "type": "number",
                                        "required": false,
                                        "value": 2,
                                        "validation": {
                                            "messages": {}
                                        }
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ]
                            },
                            {
                                "name": "item2579",
                                "fields": [
                                    {
                                        "componentType": "field",
                                        "label": "TextBox",
                                        "name": "field2582",
                                        "placeholder": "",
                                        "type": "text",
                                        "required": false,
                                        "value": null,
                                        "validation": {
                                            "messages": {}
                                        }
                                    }
                                ],
                                "allowedTypes": [
                                    "field"
                                ]
                            }
                        ]
                    ],
                    "validation": {
                        "messages": {}
                    },
                    "showProperties": true,
                    "totals": true,
                    "deleteRows": true,
                    "deleteColumns": true,
                    "rowHeader": true,
                    "colHeader": false
                }],
                allowedTypes: [
                    'field'
                ],
                displayProperties: false
            }
            ]
        }]
    };

    $scope.sections = [];
    $scope.sections.push(section0);
    // $scope.sections.push($scope.section1);
    // $scope.sections.push($scope.section2);
    // $scope.sections.push($scope.section3);
    // $scope.sections.push($scope.section4);
    $scope.sections.push($scope.sectionTmp);
    // $scope.sections.push($scope.sectionLast);

    $scope.schema = {
        name: 'testForm',
        label: 'Form Test',
        description: 'Form Description',
        layout: $scope.sections,
        allowedTypes: ["section"]
    };

    $scope.test1 = '<p>this is a sample&nbsp;&nbsp;<span class="marker">${patientName}</span>&nbsp;that I testing with&nbsp;&nbsp;<span class="marker">${patientDob}</span>&nbsp;.${patientName} is here.</p>';
    $scope.test2 = '<p>this is a sample&nbsp;&nbsp;<span class="marker">@patientName</span>&nbsp;that I testing with&nbsp;&nbsp;<span class="marker">@patientDob</span>&nbsp;. but we must to check this @patientDobcase hermeslm@gmail.com. @patientName is here.</p>';

    var patient = {
        patientName : 'Hermes Lorenzo',
        patientDob : '01/24/2017'
    };

    $scope.parse1 = parse1;
    $scope.templateResult1 = '';

    function parse1() {

        $scope.templateResult1 = OdsFormService.strSubtitutor($scope.test1, patient, '${', '}');
    }

    $scope.parse2 = parse2;
    $scope.templateResult2 = '';

    function parse2() {

        $scope.templateResult2 = OdsFormService.strSubtitutor($scope.test2, patient, '@', '');
    }

}