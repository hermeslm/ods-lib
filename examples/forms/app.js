/**
 * Created by hermeslm on 3/28/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('FormsController', FormsController);

FormsController.$inject = ['$scope', 'OdsFieldType', 'OdsComponentType'];

function FormsController($scope, OdsFieldType, OdsComponentType) {

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
            {
                "name": "row9545",
                "componentType": "row",
                "cssClass": "row",
                "displayProperties": false,
                "cols": [
                    {
                        "name": "column9547",
                        "cssClass": "col-lg-6",
                        "allowedTypes": [
                            "field"
                        ],
                        "fields": [
                            {
                                "componentType": "field",
                                "label": "Password",
                                "name": "field3729",
                                "placeholder": "Escriba su contrsena",
                                "type": "password",
                                "required": false,
                                "value": "Lolopingu.0",
                                "validation": {
                                    "required": true,
                                    "messages": {
                                        "required": "Campo requerido",
                                        "pattern": "La contrasena debe cumplir."
                                    },
                                    "pattern": "(?=.*\\d)(?=.*[!@#$%^&*\\-=()|?.\"';:]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                },
                                "patternSelect": "11"
                            }
                        ]
                    }, {
                        "name": "column9547",
                        "cssClass": "col-lg-6",
                        "allowedTypes": [
                            "field"
                        ],
                        "fields": [{
                            "componentType": "field",
                            "label": "Number",
                            "name": "field3872",
                            "placeholder": "",
                            "type": "number",
                            "required": false,
                            "patternSelect": "4",
                            "validation": {
                                "pattern": "^-{0,1}\\d+$",
                                "required": true,
                                "messages": {
                                    "required": "Numero requerido",
                                    "pattern": "Solo valores enteros"
                                }
                            }
                        }]
                    }
                ]
            }
        ]
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
                    "label": "If yes:",
                    "name": "field4554",
                    "type": "if_yes",
                    "ln": false,
                    "on": "Yes",
                    "off": "No",
                    "value": {
                        "toggle": false,
                        "textarea": null
                    },
                    "placeholder": "",
                    "validation": {
                        "messages": {}
                    },
                    "showProperties": false
                }]
            }]
        }]
    };

    $scope.sections = [];
    // $scope.sections.push(section0);
    // $scope.sections.push($scope.section1);
    // $scope.sections.push($scope.section2);
    // $scope.sections.push($scope.section3);
    // $scope.sections.push($scope.section4);
    $scope.sections.push($scope.sectionLast);

    $scope.schema = {
        name: 'testForm',
        label: 'Form Test',
        description: 'Form Description',
        layout: $scope.sections
    };

}