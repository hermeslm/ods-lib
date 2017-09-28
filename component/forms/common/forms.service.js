/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsFormService', OdsFormService);

    OdsFormService.$inject = ['OdsFieldType', 'OdsComponentType'];

    function OdsFormService(OdsFieldType, OdsComponentType) {

        var lastIdValue = 0;
        var schema = null;

        var service = {
            initSchema: initSchema,
            getToolbarComponent: getToolbarComponent,
            // getSchemaSectionPropertiesComponent: getSchemaSectionPropertiesComponent,
            getSchemaComponent: getSchemaComponent,
            newSectionObject: newSectionObject,
            removeSection: removeSection,
            newRowObject: newRowObject,
            newColumnObject: newColumnObject,
            getSuperFieldTemplate: getSuperFieldTemplate,
            getFieldTemplate: getFieldTemplate,
            saveFormData: saveFormData,
            saveFormSchema: saveFormSchema
        };

        function initSchema(schema) {

            if(schema) {
                schema.allowedTypes = [OdsComponentType.SECTION];

                for (var i = 0; i < schema.layout.length; i++) {
                    schema.layout[i].displayProperties = false;
                    schema.layout[i].allowedTypes = [OdsComponentType.ROW];
                    for (var j = 0; j < schema.layout[i].rows.length; j++) {
                        schema.layout[i].rows[j].displayProperties = false;
                    }
                }
                this.schema = schema;
            }else {
                alert('Please specify a schema!!!');
            }
            return schema;
        }

        function getToolbarComponent(component) {

            switch (component.componentType) {
                case OdsComponentType.SECTION:
                    return 'forms/toolbar/components/section.html';
                case OdsComponentType.FIELD:
                    switch (component.type) {
                        case OdsFieldType.TEXT:
                            return 'forms/toolbar/components/text.html';
                        default :
                            return 'forms/toolbar/components/no-component.html';
                    }
                default :
                    return 'forms/toolbar/components/no-component.html';
            }
        }

        // function getSchemaSectionPropertiesComponent(){
        //     return 'forms/schema/components/section-properties.html';
        // }

        function getSchemaComponent(component) {

            switch (component.componentType) {
                case OdsComponentType.SECTION:
                    return 'forms/schema/components/section.html';
                case OdsComponentType.FIELD:
                    switch (component.type) {
                        case OdsFieldType.TEXT:
                            return 'forms/toolbar/components/text.html';
                        default :
                            return 'forms/toolbar/components/no-component.html';
                    }
                default :
                    return 'forms/toolbar/components/no-component.html';
            }
        }

        function removeSection(schema, section) {

            var index = $.grep(schema.layout, function (sec, i) {
                var index = -1;
                if (sec.name === section.name) {
                    return i;
                }
                return index;
            });

            schema.layout.splice(index, 1);
            return schema;
        }

        function newSectionObject() {

            lastIdValue++;
            return {
                name: 'row' + lastIdValue,
                componentType: OdsComponentType.SECTION,
                title: 'Section',
                displayProperties: false,
                allowedTypes: [
                    OdsComponentType.ROW
                ],
                rows: []
            }
        }

        function newRowObject() {

            lastIdValue++;
            return {
                name: 'row' + lastIdValue,
                componentType: OdsComponentType.ROW,
                cssClass: 'row',
                displayProperties: false,
                allowedTypes: [
                    OdsComponentType.FIELD
                ],
                cols: [{
                    cssClass: 'col-lg-12',
                    field: null
                }]
            }
        }

        function newColumnObject(colWidth) {

            lastIdValue++;
            return {
                name: 'column' + lastIdValue,
                cssClass: 'col-lg-' + colWidth,
                field: null
            }
        }

        function getSuperFieldTemplate() {

            return 'forms/toolbar/field.html';
        }

        function getFieldTemplate(fieldType) {

            switch (fieldType) {
                case OdsFieldType.TEXT:
                    return 'forms/common/fields/text.html';
                case OdsFieldType.NUMBER:
                    return 'forms/common/fields/number.html';
                case OdsFieldType.DATE:
                    return 'forms/common/fields/date.html';
                case OdsFieldType.TEXTAREA:
                    return 'forms/common/fields/textarea.html';
                case OdsFieldType.TOGGLE:
                    return 'forms/common/fields/toggle.html';
                case OdsFieldType.SELECT:
                    return 'forms/common/fields/select.html';
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/common/fields/multi-select.html';
                default :
                    return 'forms/common/fields/text.html';
            }
        }

        function saveFormData(schema) {

            var formData = {
                formName: schema.name,
                formLabel: schema.label,
                formDescription: schema.description
            };

            var layout = schema.layout;
            for (var i = 0; i < layout.length; i++) {
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        formData[cols[k].field.name] = cols[k].field.value;
                    }
                }
            }
            return formData;
        }

        function saveFormSchema(schema) {

            return schema;
        }

        return service;
    }
})();
