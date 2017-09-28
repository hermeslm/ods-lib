/*!
 * See LICENSE in this repository for license information
 */
(function(){
'use strict';

angular
    .module('ods-lib', [
        'ui.bootstrap',
        'ui.select',
        'webcam',
        // 'pdf',
        // 'ui.bootstrap.datetimepickerr',
        // 'datatables',
        // 'datatables.factory',
        // 'datatables.bootstrap',
        // 'datatables.colreorder',
        // 'datatables.columnfilter',
        // 'angularMoment',
        'nzToggle',
        'dndLists',
        'ngTable',
        'ngSanitize'])
    .value('version', '1.0');


'use strict';
angular.module('ods-lib').run(['$templateCache', function($templateCache) {$templateCache.put('address/address-dialog.html','<form name="addressForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myAddressLabel">Create or edit a Address</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_street">Street</label><input type="text" class="form-control" name="street" id="field_street" ng-model="vm.address.street" placeholder="Street..." tabindex="2"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_phone">Phone</label><input type="text" class="form-control" name="phone" id="field_phone" ng-model="vm.address.phone" placeholder="Phone..." tabindex="8"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_street2">Street2</label><input type="text" class="form-control" name="street2" id="field_street2" ng-model="vm.address.street2" placeholder="Street 2..." tabindex="3"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_mobile">Mobile</label><input type="text" class="form-control" name="mobile" id="field_mobile" ng-model="vm.address.mobile" placeholder="Mobile..." tabindex="9"></div></div></div><div class="row"><div class="col-md-6"><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_city">City</label><input type="text" class="form-control" name="city" id="field_city" ng-model="vm.address.city" placeholder="City..." tabindex="4"></div></div><div class="col-md-6"><div class="form-group"><div class="form-group"><label class="control-label" for="field_country">Country</label><select class="form-control" id="field_country" name="country" ng-model="vm.address.state.country" tabindex="7" ng-options="country as country.name for country in vm.countries track by country.code"><option value="" disabled="disabled" hidden>Country...</option></select></div></div></div></div></div><div class="col-md-6"><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_fax">Fax</label><input type="text" class="form-control" name="fax" id="field_fax" ng-model="vm.address.fax" placeholder="Fax..." tabindex="10"></div></div></div></div></div><div class="row"><div class="col-md-6"><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_zipCode">Zip</label><input type="text" class="form-control" name="zipCode" id="field_zipCode" ng-model="vm.address.zip" placeholder="ZIP" tabindex="6"></div></div><div class="col-md-6"><label class="control-label" for="field_state">State</label><select class="form-control" id="field_state" name="state" ng-model="vm.address.state" tabindex="5" ng-options="state as state.name for state in vm.states | filter:{country:vm.address.state.country} track by state.code"><option value="" disabled="disabled" hidden>State...</option></select></div></div></div><div class="col-md-6"><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_email">Email</label><input type="text" class="form-control" name="email" id="field_email" ng-model="vm.address.email" placeholder="Email..." tabindex="11"></div></div></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_notes">Notes</label><textarea rows="3" class="form-control" name="notes" id="field_notes" ng-model="vm.address.notes" placeholder="Notes..." tabindex="12">\n                    </textarea></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button type="button" ng-click="vm.save()" ng-disabled="addressForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span></button></div></form>');
$templateCache.put('address/address.html','<label class="control-label" for="udt-address">{{label}}</label><div class="input-group"><input type="text" class="form-control" name="udt-address" id="udt-address" readonly="readonly" value="{{printName(ngModel)}}"> <span class="input-group-addon" ng-click="openModal()"><i class="fa fa-external-link"></i></span></div>');
$templateCache.put('forms/form-builder.html','<!--<div class="row" ng-show="infoMessage" ng-class="ng-hide">--><!--<div class="col-lg-12">--><!--<div uib-alert class="alert alert-info alert-dismissible" close="hideInfoMessage()">--><!--<h4><i class="icon fa fa-info"> </i> Reports info! </h4>--><!--If don\'t have a PDF viewer plugin in the browser. No biggie... you can download it.--><!--Please select the report and download it from report preview.--><!--</div>--><!--</div>--><!--</div>--><div class="row"><div class="col-md-3"><ods-form-toolbar></ods-form-toolbar></div><div class="col-md-9"><uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Form information"><ods-form-info schema="schema"></ods-form-info></uib-tab><uib-tab index="1" heading="Form Schema"><ods-schema schema="schema" debug-mode="debugMode"></ods-schema></uib-tab><uib-tab index="2" heading="Form Preview"><ods-form schema="schema" on-save="vm.onSave"></ods-form></uib-tab><uib-tab index="3" heading="Form Model" ng-show="debugMode"><ods-model schema="schema"></ods-model></uib-tab></uib-tabset></div></div>');
$templateCache.put('j-signature/j-signature.html','<div id="signature"><div id="jSignature"></div><button type="button" class="btn btn-danger" ng-click="reset()"><span class="glyphicon glyphicon-erase"></span> <span>Clear</span></button><!--<button ng-click="getData()">getData</button>--><!--<button ng-click="setData()">setData</button>--></div>');
$templateCache.put('forms/form/form.html','<form name="{{schema.name}}" role="form" novalidate ng-submit="save()" show-validation><div class="box-body padding-top"><div class="alert alert-success" ng-show="vm.success"><strong>Password changed!</strong></div><div class="alert alert-danger" ng-show="vm.error"><strong>An error has occurred!</strong> The password could not be changed.</div><div class="alert alert-danger" ng-show="vm.doNotMatch">The password and its confirmation do not match!</div><div ng-repeat="section in schema.layout"><h4 ng-bind-html="section.title"></h4><div class="{{row.cssClass}}" ng-repeat="row in section.rows"><div class="{{col.cssClass}}" ng-repeat="col in row.cols"><div ng-if="col.field"><div class="form-group" ng-switch="col.field.type" ng-class="{\'has-error\': {{schema.name}}.{{col.field.name}}.$invalid}"><label class="control-label" for="{{col.field.name}}" ng-hide="vm.hideTitle(col.field)">{{col.field.label}}</label><div ng-switch-when="NUMBER"><ng-include src="vm.getFieldTemplate(\'NUMBER\')"></ng-include></div><div ng-switch-when="TEXT"><ng-include src="vm.getFieldTemplate(\'TEXT\')"></ng-include></div><div ng-switch-when="DATE"><ng-include src="vm.getFieldTemplate(\'DATE\')"></ng-include></div><div ng-switch-when="TEXTAREA"><ng-include src="vm.getFieldTemplate(\'TEXTAREA\')"></ng-include></div><div ng-switch-when="TOGGLE"><ng-include src="vm.getFieldTemplate(\'TOGGLE\')"></ng-include></div><div ng-switch-when="SELECT"><ng-include src="vm.getFieldTemplate(\'SELECT\')"></ng-include></div><div ng-switch-when="MULTI_SELECT"><ng-include src="vm.getFieldTemplate(\'MULTI_SELECT\')"></ng-include></div><div ng-switch-default><ng-include src="vm.getFieldTemplate(\'TEXT\')"></ng-include></div><div ng-show="{{schema.name}}.{{col.field.name}}.$invalid"><p class="help-block" ng-show="{{schema.name}}.{{col.field.name}}.$error.required">This field is required.</p></div></div></div></div></div></div></div><div class="box-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Clear</span></button> <button type="submit" ng-disabled="{{schema.name}}.$invalid" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span></button></div></form>');
$templateCache.put('forms/form-info/form-info.html','<form name="formInfo" role="form" novalidate ng-submit="save()" show-validation><div class="box-body padding-top"><div class="row"><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formSchema.formName.$invalid}"><label class="control-label" for="formName">Form name</label><input class="form-control" name="formName" id="formName" ng-model="schema.name" ng-required="true"></div></div><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formSchema.formLabel.$invalid}"><label class="control-label" for="formLabel">Form label</label><input class="form-control" name="formLabel" id="formLabel" ng-model="schema.label" ng-required="true"></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{\'has-error\': formSchema.description.$invalid}"><label class="control-label" for="description">Form description</label><textarea class="form-control" name="description" id="description" ng-model="schema.description" ng-required="false" rows="3" placeholder="Type form description...">\n                    </textarea></div></div></div></div></form>');
$templateCache.put('forms/model/model.html','<div class="padding"><pre>{{modelAsJson}}</pre></div>');
$templateCache.put('forms/schema/schema.html','<div class="box-schema"><div class="alert alert-danger" ng-show="vm.error"><strong>An error has occurred!</strong> Error in schema.</div><ul dnd-list="schema.layout" dnd-allowed-types="schema.allowedTypes"><li class="box-schema-section" ng-repeat="object in schema.layout" dnd-draggable="object" dnd-disable-if="object.componentType == undefined" dnd-effect-allowed="move" dnd-moved="schema.layout.splice($index, 1)" ng-include="\'forms/schema/components/component.html\'"></li></ul></div>');
$templateCache.put('forms/toolbar/field.html','<div class="box-draggable"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs btn-primary" type="button" ng-click="vm.addField(field)" title="Add this field."><span class="fa fa-plus"></span></button></div></div><!--<div fg-field="template"--><!--fg-tab-index="-1"--><!--fg-no-validation-summary="true"--><!--fg-edit-mode="true"></div>--><label class="control-label" for="{{field.name}}">{{field.title}}</label><input class="form-control" name="{{field.name}}" id="{{field.name}}">');
$templateCache.put('forms/toolbar/toolbar.html','<div class="box box-solid"><div class="box-header with-border"><h3 class="box-title">{{vm.toolbar.title}}</h3></div><!-- /.box-header --><div class="box-body"><uib-accordion close-others="true"><div uib-accordion-group class="panel-default" panel-class="panel-toolbar" heading="{{group.title}}" is-open="group.open" is-disabled="group.disabled" ng-repeat="group in vm.toolbar.groups" ng-init="groupIndex = $index"><ul class="list-group no-margin-bottom"><li class="padding-bottom" ng-repeat="component in group.components"><div class="box-toolbar" dnd-draggable="component" dnd-type="component.componentType" dnd-effect-allowed="copy" ng-include="\'forms/toolbar/components/component.html\'"></div></li></ul></div></uib-accordion></div><!-- /.box-body --></div><!-- /.box -->');
$templateCache.put('forms/common/fields/date.html','<div class="input-group" ng-hide="vm.hideParam(col.field)"><input id="{{col.field.name}}" class="form-control" name="{{col.field.name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="vm.getRequired(col.field)" ng-model="col.field.value" is-open="col.field.datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.openCalendar($index)"><i class="glyphicon glyphicon-calendar"></i></button></span></div>');
$templateCache.put('forms/common/fields/multi-select.html','<div ng-hide="vm.hideParam(col.field)"><ui-select name="{{col.field.name}}" id="{{col.field.name}}" multiple="multiple" ng-model="col.field.value" ui-select-required="vm.getRequired(col.field)" close-on-select="true" title="{{col.field.title}}"><ui-select-match placeholder="{{col.field.placeholder}}">{{vm.getSelectTitleField(col.field, $item)}}</ui-select-match><ui-select-choices repeat="element in col.field.data | filter:$select.search | limitTo: col.field.limitTo"><div ng-bind-html="vm.getSelectTitleField(col.field, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div>');
$templateCache.put('forms/common/fields/number.html','<input class="form-control" name="{{col.field.name}}" id="{{col.field.name}}" ng-hide="vm.hideParam(col.field)" ng-model="col.field.value" ng-required="vm.getRequired(col.field)" type="number">');
$templateCache.put('forms/common/fields/select.html','<div ng-hide="vm.hideParam(col.field)"><ui-select name="{{col.field.name}}" id="{{col.field.name}}" ng-model="col.field.value" ui-select-required="vm.getRequired(col.field)" close-on-select="true" title="{{col.field.title}}"><ui-select-match placeholder="{{col.field.placeholder}}">{{vm.getSelectTitleField(col.field, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in col.field.data | filter:$select.search | limitTo: col.field.limitTo"><div ng-bind-html="vm.getSelectTitleField(col.field, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div>');
$templateCache.put('forms/common/fields/text.html','<input class="form-control" name="{{col.field.name}}" id="{{col.field.name}}" ng-hide="vm.hideParam(col.field)" ng-model="col.field.value" ng-required="vm.getRequired(col.field)">');
$templateCache.put('forms/common/fields/textarea.html','<textarea class="form-control" name="{{col.field.name}}" id="{{col.field.name}}" rows="{{col.field.rows}}" placeholder="{{col.field.placeholder}}" ng-hide="vm.hideParam(col.field)" ng-model="col.field.value" ng-required="vm.getRequired(col.field)">\n</textarea>');
$templateCache.put('forms/common/fields/toggle.html','<br ng-if="col.field.ln"><toggle name="{{col.field.name}}" id="{{col.field.name}}" on="{{col.field.on}}" off="{{col.field.off}}" ng-model="col.field.value"></toggle>');
$templateCache.put('forms/schema/components/component.html','<div ng-include="getSchemaComponent(object)"></div>');
$templateCache.put('forms/schema/components/no-component.html','<div><h3>Component error</h3><div style="padding: 5px">Please fix this component: {{component.name}}</div></div>');
$templateCache.put('forms/schema/components/row.html','<ods-row schema="schema" row="row" debug-mode="debugMode"></ods-row>');
$templateCache.put('forms/schema/components/section.html','<ods-section schema="schema" section="object" debug-mode="debugMode"></ods-section>');
$templateCache.put('forms/schema/components/text.html','<label class="control-label" for="{{col.field.name}}">{{col.field.label}}</label><input class="form-control" name="{{col.field.name}}" id="{{col.field.name}}">');
$templateCache.put('forms/toolbar/components/component.html','<div class="" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs btn-primary" type="button" ng-click="vm.addSection(component)" title="Add this field."><span class="fa fa-plus"></span></button></div></div><div class="box-header with-border"><h4 class="box-title">{{section.title}}</h4></div><div class="box-body"><div ng-include="vm.getToolbarComponent(component)"></div></div></div>');
$templateCache.put('forms/toolbar/components/no-component.html','<div><h3>Component error</h3><div style="padding: 5px">Please fix this component: {{component.name}}</div></div>');
$templateCache.put('forms/toolbar/components/section.html','<div class=""><h3>Section Component</h3><!--<div style="padding: 5px;">This add a Section</div>--></div>');
$templateCache.put('forms/toolbar/components/text.html','<label class="control-label" for="{{component.name}}">{{component.label}}</label><input class="form-control" name="{{component.name}}" id="{{component.name}}">');
$templateCache.put('forms/schema/components/row/item.html','<div>column: {{$index}}</div>');
$templateCache.put('forms/schema/components/row/row-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="sectionPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.name.$invalid}"><label for="name" class="col-sm-2 control-label">Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="name" name="name" placeholder="Name..." ng-model="row.name" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.cssClass.$invalid}"><label for="cssClass" class="col-sm-2 control-label">Class Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="cssClass" name="cssClass" placeholder="Css Class..." ng-model="row.cssClass" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.cols.$invalid}"><label for="cols" class="col-sm-2 control-label">Cols:</label><div class="col-sm-4"><input type="number" class="form-control" id="cols" name="cols" placeholder="Cols..." ng-model="row.cols.length" ng-required="false" ng-disabled="true"></div><div class="col-lg-6"><!--<button type="button" class="btn btn-primary" ng-click="addRow()">Add row</button>--></div></div></div></div></form><div class="row no-vertical-margin"><div class="col-lg-6"><table ng-table="tableParams" class="table table-bordered table-hover table-condensed editable-table demoTable" ng-form="tableForm" disable-filter="isAdding"><colgroup><col width="50%"></colgroup><tr ng-repeat="row in $data" ng-form="rowForm"><td title="\'Class Name\'" ng-switch="row.isEditing" ng-form="cssClass" class="align-middle"><span ng-switch-default class="editable-text">{{row.cssClass}}</span><div class="controls" ng-switch-when="true"><input type="text" name="cssClass" ng-model="row.cssClass" class="editable-input form-control input-sm" required></div></td><td><button class="btn btn-primary btn-sm" ng-click="saveColumnEdited(row, rowForm)" ng-if="row.isEditing" ng-disabled="rowForm.$pristine || rowForm.$invalid"><span class="glyphicon glyphicon-ok"></span></button> <button class="btn btn-default btn-sm" ng-click="cancelColumnEdited(row, rowForm)" ng-if="row.isEditing"><span class="glyphicon glyphicon-remove"></span></button> <button class="btn btn-default btn-sm" ng-click="row.isEditing = true" ng-if="!row.isEditing"><span class="glyphicon glyphicon-pencil"></span></button> <button class="btn btn-danger btn-sm" ng-click="removeColumn($data, $index)" ng-if="!row.isEditing"><span class="glyphicon glyphicon-trash"></span></button></td></tr></table></div><div class="col-lg-6"><button class="btn btn-primary" ng-click="addColumn(row)">Add column</button></div></div></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div class="jsonify padding"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" title="Copy the json data." ng-click="copy()"><span class="fa fa-clipboard"></span></button><!--<button class="btn btn-default btn-xs" type="button" title="Display hidden properties."--><!--ng-click="displayHidden = !displayHidden" ng-class="{ \'active\': displayHidden }"><span--><!--class="fa fa-eye"></span></button>--></div><pre>{{modelAsJson}}</pre></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/row/row.html','<div class="box-draggable" ng-class="{ \'error\': row.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" ng-disabled="section.displayProperties && section.invalid" ng-class="{ \'active\': section.displayProperties }" ng-click="toggleRowProperties(row)" title="Configure this Section."><span class="fa fa-wrench"></span></button> <button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeRow(schema, row)" title="Remove"><span class="fa fa-trash"></span></button></div></div><div class="box padding"><div class="box-body no-padding"><ul dnd-list="row.cols" dnd-allowed-types="row.allowedTypes"><li class="box-row {{col.cssClass}}" ng-repeat="col in row.cols" dnd-draggable="col" dnd-effect-allowed="move" dnd-moved="row.cols.splice($index, 1)" dnd-selected="models.selected = col" ng-class="{selected: models.selected === row.cols}" ng-include="\'forms/schema/components/row/item.html\'"></li></ul></div><!-- /.box-body --></div><div class="box-properties-container" ng-class="{ visible: row.displayProperties }"><div class="padding"><div ng-include="\'forms/schema/components/row/row-properties.html\'"></div></div></div></div>');
$templateCache.put('forms/schema/components/section/section-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="sectionPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.name.$invalid}"><label for="name" class="col-sm-2 control-label">Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="name" name="name" placeholder="Name..." ng-model="section.name" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.rows.$invalid}"><label for="rows" class="col-sm-2 control-label">Rows:</label><div class="col-sm-4"><input type="number" class="form-control" id="rows" name="rows" placeholder="Rows..." ng-model="section.rows.length" ng-required="false" ng-disabled="true"></div><div class="col-lg-6"><button type="button" class="btn btn-primary" ng-click="addRow()">Add row</button></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.title.$invalid}"><label for="title" class="col-sm-2 control-label">Title:</label><div class="col-sm-9"><input type="text" class="form-control" id="title" name="title" placeholder="Title..." ng-model="section.title" ng-required="false"></div></div></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div class="jsonify padding"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" title="Copy the json data." ng-click="copy()"><span class="fa fa-clipboard"></span></button><!--<button class="btn btn-default btn-xs" type="button" title="Display hidden properties."--><!--ng-click="displayHidden = !displayHidden" ng-class="{ \'active\': displayHidden }"><span--><!--class="fa fa-eye"></span></button>--></div><pre>{{modelAsJson}}</pre></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/section/section.html','<div class="box-draggable" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" ng-disabled="section.displayProperties && section.invalid" ng-class="{ \'active\': section.displayProperties }" ng-click="toggleSectionProperties(section)" title="Configure this Section."><span class="fa fa-wrench"></span></button> <button class="btn btn-default btn-xs" type="button" ng-click="schemaCtrl.swapFields($index - 1, $index)" ng-disabled="$index === 0" title="Move up"><span class="fa fa-arrow-up"></span></button> <button class="btn btn-default btn-xs" type="button" ng-click="schemaCtrl.swapFields($index, $index + 1)" ng-disabled="$index === schema.fields.length - 1" title="Move down"><span class="fa fa-arrow-down"></span></button> <button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeSection(schema, section)" title="Remove"><span class="fa fa-trash"></span></button></div></div><div class="box-header with-border"><h4 class="box-title" ng-bind-html="section.title"></h4></div><div class="box-body"><ul dnd-list="section.rows" dnd-allowed-types="row.allowedTypes"><li class="{{row.cssClass}} padding-top" ng-repeat="row in section.rows" dnd-draggable="row" dnd-type="row.componentType" dnd-disable-if="row.componentType == undefined" dnd-effect-allowed="move" dnd-moved="section.rows.splice($index, 1)" ng-include="\'forms/schema/components/row.html\'"></li></ul></div><div class="box-properties-container" ng-class="{ visible: section.displayProperties }"><div class="padding"><div ng-include="\'forms/schema/components/section/section-properties.html\'"></div></div></div></div>');}]);
'use strict';

angular
    .module('ods-lib')
    .controller('AddressDialogController', AddressDialogController);

AddressDialogController.$inject = ['$uibModalInstance', 'address', 'countries', 'states', '$filter'];

function AddressDialogController($uibModalInstance, address, countries, states, $filter) {
    var vm = this;

    vm.address = address;
    vm.countries = countries;
    vm.states = states;

    vm.clear = clear;
    vm.save = save;

    function clear() {
        $uibModalInstance.dismiss('cancel');
    }

    function save() {
        $uibModalInstance.close(vm.address);
        vm.isSaving = false;
    }
}
'use strict';

angular
    .module('ods-lib')
    .directive('address', Address);

Address.$inject = ['$uibModal'];

function Address($uibModal) {

    var directive = {
        restrict: 'E',
        templateUrl: 'address/address.html',
        scope: {
            label: '=',
            address: '=',
            countries: '=',
            states: '=',
            ngModel: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.openModal = function ($element) {
            $uibModal.open({
                templateUrl: 'address/address-dialog.html',
                controller: 'AddressDialogController',
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    address: function () {
                        if ($scope.ngModel !== null) {
                            return $scope.ngModel;
                            // {
                            //     address: $scope.ngModel.address,
                            //     address2: $scope.ngModel.address2,
                            //     city: $scope.ngModel.city,
                            //     state: $scope.ngModel.state,
                            //     zip: $scope.ngModel.zip,
                            //     // country: $scope.ngModel.country,
                            //     phone: $scope.ngModel.phone,
                            //     mobile: $scope.ngModel.mobile,
                            //     fax: $scope.ngModel.fax,
                            //     email: $scope.ngModel.email,
                            //     notes: $scope.ngModel.notes
                            // }
                        } else {
                            return null;
                        }
                    },
                    countries: function () {
                        return $scope.countries;
                    },
                    states: function () {
                        return $scope.states;
                    }

                }
            }).result.then(function (result) {
                // $element.
                updateValue(result);
                //$state.go($state.current.name, null, {reload: $state.current.name});
            }, function (result) {
                //$state.go($state.current.name);
            });
        };

        $scope.printName = printName;

        function printName(address) {
            if (address != null) {
                return address.street + ' ' +
                    address.street2 + ' ' +
                    address.city + ',' +
                    address.state.name + ' ' +
                    address.zip
            } else {
                return '';
            }
        }

        function updateValue(value) {
            // var input = $element[0].getElementsByTagName('input');
            $scope.ngModel = value;
        }

    }
}
'use strict';

angular
    .module('ods-lib')
    .filter('Phone', Phone);

function Phone() {
    return function (phone) {
        if (!phone) {
            return '';
        }

        var value = phone.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return phone;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return phone;
        }

        if (country === 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
}
'use strict';

angular
    .module('ods-lib')
    .filter('PropsFilter', PropsFilter);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs an AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform an OR.
 */
function PropsFilter() {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
}
/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsFormBuilderController', OdsFormBuilderController);

    OdsFormBuilderController.$inject = ['OdsFormService'];

    function OdsFormBuilderController(OdsFormService) {

        var vm = this;

        vm.onSave = onSave;

        function onSave(schema, data) {
            alert(data);
        }

    }
})();

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormBuilder', OdsFormBuilder);

OdsFormBuilder.$inject = ['OdsFormService', '$uibModal', '$sce', '$q'];

function OdsFormBuilder(OdsFormService, $uibModal, $sce, $q) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form-builder.html',
        scope: {
            schema: '=',
            debugMode: '='
        },
        controller: 'OdsFormBuilderController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        //$scope.model = true;
    }
}

'use strict';

angular
    .module('ods-lib')
    .directive('jSignature', Signature);

jSignature.$inject = ['$timeout', 'JSignature'];

function jSignature($timeout, JSignature) {

    var directive = {
        restrict: 'E',
        templateUrl: 'j-signature/j-signature.html',
        scope: {
            sig: '=',
            width: '@',
            height: '@',
            color: '@',
            bgColor: '@',
            lineWidth: '@',
            cssclass: '@',
            undo: '@',
            save: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        console.log('jSignatureDirective: link');
        console.dir($scope, $element);

        var options = {
            width: $scope.width,
            height: $scope.height,
            color: $scope.color,
            'background-color': $scope.bgColor,
            lineWidth: $scope.lineWidth,
            cssClass: $scope.cssClass,
            UndoButton: $scope.undo
        };

        JSignature.initialize($scope, options);

        $scope.reset = function () {
            JSignature.reset();
        };

//             $scope.initialized = false;
//
//             var options = {
//                 width: $scope.width,
//                 height: $scope.height,
//                 color: $scope.color,
//                 'background-color': $scope.bgColor,
//                 lineWidth: $scope.lineWidth,
//                 cssclass: $scope.cssclass
//             };
//
//             $scope.initialize = function() {
//                 if (!$scope.initialized) {
//                     $element.find('#jSignature').jSignature(options);
//                     $scope.initialized = true;
//                 }
//             };
//
//             $scope.reset = function() {
//                 console.log('reset!!!');
//                 $element.jSignature('reset');
//             };
//
//             $scope.getData = function() {
//                 console.log('getData!!!');
//                 var datapair = $element.jSignature('getData', 'base30');
//                 var svg = $element.jSignature('getData', 'svg');
//                 console.dir(datapair);
//                 //alert(datapair);
//                 //              alert(svg);
//                 $scope.save(svg);
//             };
//
//             $scope.setData = function(sig) {
//                 console.log('setData!!!');
//
//
//
//                 if (sig) {
//                     datapair = sig;
//                 }
//                 console.log(datapair);
//                 $element.jSignature('setData', 'data:' + datapair.join(','));
//             };
//
//
//             $scope.initialize();
// //            $scope.setData();
//
//
//             $scope.$watch('sig', function(sig) {
//                 if (sig) {
//                     console.log('watch if ' + sig);
//                     $scope.setData(sig);
//                     //alert('watch if ' + sig);
//
//                     return;
//                 }
//                 console.log('watch else');
//
//             });
    }
}
'use strict';

angular
    .module('ods-lib')
    .factory('Signature', Signature);

function Signature() {

    var apinamespace = 'jSignature';

    var exportTypes = {
        DEFAULT: 'default',
        NATIVE: 'native',
        IMAGE: 'image',
        BASE30: 'base30',
        IMAGE_SIGNATURE_BASE30: 'image/jsignature;base30',
        SVG: 'svg',
        SVG_XML: 'image/svg+xml',
        SVG_BASE64: 'svgbase64',
        IMAGE_SVG_XML_BASE64: 'image/svg+xml;base64'
    }

    var importTypes = {
        NATIVE: 'native',
        IMAGE: 'image',
        IMAGE_PNG_BASE64: 'image/png;base64',
        IMAGE_JPEG_BASE64: 'image/jpeg;base64',
        IMAGE_JPG_BASE64: 'image/jpg;base64'
    }

    var object = {
        initialized: false,
        options: {
            width: null,
            height: null,
            color: null,
            'background-color': null,
            lineWidth: null,
            cssclass: null,
            UndoButton: false
        },
        element: null
    };

    var service = {
        getObject: getObject,
        exportTypes: exportTypes,
        importTypes: importTypes,
        initialize: initialize,
        reset: reset,
        getData: getData,
        // setData: setData,
        disable: disable,
        enable: enable
    };

    return service;

    function initialize(element, options) {

        object.initialized = false;

        if (!object.initialized) {
            // object.element = element.find('#jSignature').jSignature(options);
            object.element = $('#jSignature');
            object.initialized = true;
            object.element.jSignature(options);
        }
    };

    function reset() {
        // console.log('reset!!!');
        object.element.jSignature('reset');
    };

    function getData(type) {
        // console.log('getData!!!');
        return object.element.jSignature('getData', type);
    };

    function getDataAsSVG() {
        // console.log('getData!!!');
        // var datapair = object.element.jSignature('getData', 'base30');
        var svg = object.element.jSignature('getData', 'svg');
        return svg;
    };

    function getDataAsBase30() {
        // console.log('getData!!!');
        // var datapair = object.element.jSignature('getData', 'base30');
        var svg = object.element.jSignature('getData', 'svg');
        return svg;
    };

    function setData(sig) {
        // console.log('setData!!!');
        // console.log(sig);
        object.element.jSignature('setData', 'data:' + sig.join(','));
    };

    function disable() {
        // console.log('Disable!!!');
        object.element.jSignature('disable');
    };

    function enable() {
        // console.log('Enable!!!');
        object.element.jSignature('enable');
    };

    function undo() {
        var eventName = apinamespace + '.undo'
        object.element.jSignature('events');
    };

    function getObject() {
        // $('#signature').on('change', function(e){
        //     var undef
        //     if ($(e.target).jSignature('getData','native').length) {
        //         $tools.find('input').prop('disabled', false)
        //     } else {
        //         $tools.find('input').prop('disabled', true)
        //     }
        //
        // })
        return object.element;
    }


}
'use strict';

angular
    .module('ods-lib')
    .factory('DYMO', DYMO);

DYMO.$inject = ['XMLConfig', 'Base64', 'moment'];

function DYMO(XMLConfig, Base64, moment) {
    var service = {
        loadPrinters: loadPrinters,
        loadDYMOOrderTemplate: loadDYMOOrderTemplate,
        loadDYMOEnvOrderTemplate: loadDYMOEnvOrderTemplate,
        printPatientOrderLabel: printPatientOrderLabel,
        printEnvOrderLabel: printEnvOrderLabel,
        loadDefaultDYMOOrderTemplate: loadDefaultDYMOOrderTemplate,
        loadDefaultDYMOEnvOrderTemplate: loadDefaultDYMOEnvOrderTemplate,
        testPatientLabel: testPatientLabel,
        testEnvironmentalLabel: testEnvironmentalLabel
    };

    return service;

    var printersSelect = '';
    var orderTemplate;
    var envOrdertemplate;

    loadPrinters();
    function loadPrinters() {
        var printers = dymo.label.framework.getLabelWriterPrinters();
        if (printers.length == 0) {
            // alert("No DYMO printers are installed. Install DYMO printers.");
            return false;
        }

        for (var i = 0; i < printers.length; i++) {
            var printer = printers[i];

            var printerName = printer.name;
            printersSelect = printerName;
        }

        return true;
    }

    function loadDYMOOrderTemplate(xml) {
        orderTemplate = dymo.label.framework.openLabelXml(xml);
    }

    function loadDYMOEnvOrderTemplate(xml) {
        envOrdertemplate = dymo.label.framework.openLabelXml(xml);
    }

    function printPatientOrderLabel(data) {
        if (!orderTemplate) {
            loadDefaultDYMOOrderTemplate();
        }

        orderTemplate.setObjectText('barcode', data.barcode);
        orderTemplate.setObjectText('name', data.name);
        orderTemplate.setObjectText('dob', moment(data.dob).format("MM/DD/Y"));
        orderTemplate.setObjectText('collectedDate', moment(data.collectedDate).format("MM/DD/Y"));
        orderTemplate.setObjectText('tube', data.tube);

        orderTemplate.print(printersSelect);
    }

    function printEnvOrderLabel(data) {
        if (!envOrdertemplate) {
            loadDefaultDYMOEnvOrderTemplate();
        }

        envOrdertemplate.setObjectText('barcode', data.barcode);
        envOrdertemplate.setObjectText('name', data.machine);
        envOrdertemplate.setObjectText('collectedDate', moment(data.collectedDate).format("MM/DD/Y"));
        envOrdertemplate.setObjectText('tube', data.tube);

        envOrdertemplate.print(printersSelect);
    }

    function loadDefaultDYMOOrderTemplate() {
        XMLConfig.patient().$promise.then(function (data) {
            orderTemplate = dymo.label.framework.openLabelXml(Base64.decode(data.file.replace("77u/", "")));
        }, function () {
            orderTemplate = dymo.label.framework.openLabelXml('<?xml version="1.0" encoding="utf-8"?><DieCutLabel Version="8.0" Units="twips"><PaperOrientation>Landscape</PaperOrientation><Id>Address</Id><IsOutlined>false</IsOutlined><PaperName>30252 Address</PaperName><DrawCommands><RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" /></DrawCommands><ObjectInfo><BarcodeObject><Name>barcode</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>True</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><Text>1234567890</Text><Type>Code128Auto</Type><Size>Medium</Size><TextPosition>Bottom</TextPosition><TextFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><CheckSumFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><TextEmbedding>None</TextEmbedding><ECLevel>0</ECLevel><HorizontalAlignment>Center</HorizontalAlignment><QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" /></BarcodeObject><Bounds X="331" Y="150.600006103516" Width="2672" Height="750" /></ObjectInfo><ObjectInfo><TextObject><Name>name</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Jhon Doe</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1601" Y="953" Width="1940" Height="230" /></ObjectInfo><ObjectInfo><TextObject><Name>dob</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="751" Y="1178" Width="870" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>collectedDate</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="738.000000000001" Y="953" Width="870.000000000002" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>compendium</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">test te test</String><Attributes><Font Family="Tahoma" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1998" Y="1163" Width="2250" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">COL:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="953" Width="445.000000000001" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO_____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Test:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1606" Y="1178" Width="435.000000000001" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO__2</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">DOB:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="1178" Width="584.999999999999" Height="270" /></ObjectInfo></DieCutLabel>');
        });
    }

    function loadDefaultDYMOEnvOrderTemplate() {
        XMLConfig.environmental().$promise.then(function (data) {
            envOrdertemplate = dymo.label.framework.openLabelXml(Base64.decode(data.file.replace("77u/", "")));
        }, function () {
            envOrdertemplate = dymo.label.framework.openLabelXml('<?xml version="1.0" encoding="utf-8"?><DieCutLabel Version="8.0" Units="twips"><PaperOrientation>Landscape</PaperOrientation><Id>Address</Id><IsOutlined>false</IsOutlined><PaperName>30252 Address</PaperName><DrawCommands><RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" /></DrawCommands><ObjectInfo><BarcodeObject><Name>barcode</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>True</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><Text>1234567890</Text><Type>Code128Auto</Type><Size>Medium</Size><TextPosition>Bottom</TextPosition><TextFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><CheckSumFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><TextEmbedding>None</TextEmbedding><ECLevel>0</ECLevel><HorizontalAlignment>Center</HorizontalAlignment><QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" /></BarcodeObject><Bounds X="331" Y="150.600006103516" Width="2672" Height="580" /></ObjectInfo><ObjectInfo><TextObject><Name>name</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Jhon Doe</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="798" Width="1740" Height="220" /></ObjectInfo><ObjectInfo><TextObject><Name>collectedDate</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="753.000000000001" Y="998" Width="1290" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>tube</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">test te test</String><Attributes><Font Family="Tahoma" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="332.999999999999" Y="1223" Width="2250" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">COL:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="1013" Width="945" Height="270" /></ObjectInfo></DieCutLabel>');
        });
    }

    function testPatientLabel(xml) {
        var template;
        if (xml) {
            template = dymo.label.framework.openLabelXml(Base64.decode(xml.replace("77u/", "")));
        } else {
            template = orderTemplate;
        }

        template.setObjectText('barcode', 'P000001');
        template.setObjectText('name', 'Jhon Doe');
        template.setObjectText('dob', moment(new Date()).format("MM/DD/Y"));
        template.setObjectText('collectedDate', moment(new Date()).format("MM/DD/Y"));
        template.setObjectText('tube', 'Some tube name');

        template.print(printersSelect);
    }

    function testEnvironmentalLabel(xml) {
        var template;
        if (xml) {
            template = dymo.label.framework.openLabelXml(Base64.decode(xml.replace("77u/", "")));
        } else {
            template = envOrdertemplate;
        }

        template.setObjectText('barcode', 'E000001');
        template.setObjectText('name', 'TheMachinen');
        template.setObjectText('collectedDate', moment(new Date()).format("MM/DD/Y"));
        template.setObjectText('tube', 'Some tube name');

        template.print(printersSelect);
    }
};
'use strict';

angular
    .module('ods-lib')
    .service('GUIUtils', GUIUtils);

function GUIUtils() {

    var statusTypes = ['default', 'danger', 'primary', 'success', 'info', 'warning'];

    var service = {
        getActionsTemplate: getActionsTemplate,
        getStatusTemplate: getStatusTemplate,
        expandWeekCodeString: expandWeekCodeString,
        mailto: mailto,
        objectToArray: objectToArray,
        getDays: getDays,
        daysToWeekCodeString: daysToWeekCodeString,
        weekCodeStringToDays: weekCodeStringToDays,
        getMonths: getMonths,
        monthsCodeStringToMonths: monthsCodeStringToMonths,
        monthsToMonthCodeString: monthsToMonthCodeString,
        getDefaultUserPicture: getDefaultUserPicture,
        getDefaultUserPictureContentType: getDefaultUserPictureContentType,
        resetUserPicture: resetUserPicture,
        colorHtmlYesNo: colorHtmlYesNo
    };

    return service;

    /**
     * Return a Action Template for grid bootstrap based
     * @param data
     * @param entity
     * @param buttons
     * @returns {string}
     */
    function getActionsTemplate(data, entity, buttons) {
        var stButtons = '';

        // stButtons = '<div class="btn-group">'+
        //     '<a type="button" class="btn btn-primary btn-xs"><i class="glyphicon glyphicon-eye-open"></i></i></a>'+
        //     '<a type="button" class="btn btn-warning btn-xs"><i class="glyphicon glyphicon-pencil"></i></a>'+
        //     '<a type="button" class="btn btn-danger btn-xs"><i class="glyphicon glyphicon-trash"></i></a>'+
        //     '</div>';

         // Single button
        // stButtons = '<div class="btn-group-vertical">'+
        //     '<div class="btn-group open" uib-dropdown>'+
        //     '<button type="button" class="btn btn-default dropdown-toggle" uib-dropdown-toggle data-toggle="dropdown" aria-expanded="true">'+
        //     '<span class="caret"></span>'+
        //     '</button>'+
        //     '<ul class="dropdown-menu" uib-dropdown-menu style="min-width: 30px;width: 52px;">'+
        //         '<li><a href="#"><i class="fa fa-eye"></i></a></li>'+
        //         '<li class="divider"></li>'+
        //         '<li><a href="#"><i class="fa fa-edit"></i></a></li>'+
        //         '<li class="divider"></li>'+
        //         '<li><a href="#"><i class="fa fa-trash"></i></a></li>'+
        //     '</ul>'+
        //     '</div>'+
        //     '</div>';


        // stButtons = '<div>' +
        // '<div class="btn-group" uib-dropdown>' +
        // '<button type="button" class="btn btn-default">Actions</button>' +
        // '<button type="button" class="btn btn-default dropdown-toggle" uib-dropdown-toggle ng-disabled="disabled" data-toggle="dropdown" aria-expanded="false">' +
        // '<span class="caret"></span>' +
        // '<span class="sr-only">Toggle Dropdown</span>' +
        // '</button>' +
        // '<ul class="dropdown-menu" uib-dropdown-menu role="menu" style="min-width: 80px;">' +
        // '<li><a ui-sref="hospitalization({id:' + data.id + '})">View</a></li>' +
        // '<li><a ui-sref="infection({id:' + data.id + '})">Edit</a></li>' +
        // '<li><a ui-sref="order({id:' + data.id + '})">Delete</a></li>' +
        // '</ul>' +
        // '</div></div>';

        for (var i = 0, len = buttons.length; i < len; i++) {
            switch (buttons[i]) {
                case 'view': {
                    stButtons += '<a class="btn-sm btn-primary" ui-sref="' + entity + '-detail({id:data.id})" href="#/' + entity + '/' + data.id + '">' +
                        '   <i class="glyphicon glyphicon-eye-open"></i></a>&nbsp;';
                    // stButtons += '<a class="btn-sm btn-primary " ui-sref="' + entity + '-detail({id:' + data.id + '})">' +
                    //     '   <i class="glyphicon glyphicon-eye-open"></i></a>';
                    break;
                }
                case 'update': {
                    // if (stButtons.length != 0)
                    //     stButtons += '&nbsp;'

                    // stButtons += '<a class="btn-sm btn-warning" ui-sref="' + entity + '.edit({id:' + data.id + '})">' +
                    //     '   <i class="fa fa-edit"></i></a>';
                    stButtons += '<a class="btn-sm btn-warning" ui-sref="' + entity + '.edit({id:' + data.id + '})" href="#/' + entity + '/' + data.id + '/edit">' +
                        '<span class="glyphicon glyphicon-pencil"></span></a>';
                    break;
                }
                case 'delete': {
                    if (stButtons.length != 0)
                        stButtons += '&nbsp;'

                    stButtons += '<a class="btn-sm btn-danger" ui-sref="' + entity + '.delete({id:' + data.id + '})"  href="#/' + entity + '/' + data.id + '/delete">' +
                        '<span class="glyphicon glyphicon-trash"></span></a>';
                    // stButtons += '<a class="btn-sm btn-danger" ui-sref="' + entity + '.delete({id:' + data.id + '})">' +
                    //     '   <i class="fa fa-trash"></i></a>';
                    break;
                }
                case 'all' : {
                    stButtons += '<a class="btn-sm btn-primary" ui-sref="' + entity + '-detail({id:' + data.id + '})" href="#/' + entity + '/' + data.id + '">' +
                        '   <i class="glyphicon glyphicon-eye-open"></i></a>&nbsp;';
                    stButtons += '<a class="btn-sm btn-warning" ui-sref="' + entity + '.edit({id:' + data.id + '})" href="#/' + entity + '/' + data.id + '/edit">' +
                        '   <i class="glyphicon glyphicon-pencil"></i></a>&nbsp;';
                    stButtons += '<a class="btn-sm btn-danger" ui-sref="' + entity + '.delete({id:' + data.id + '})"  href="#/' + entity + '/' + data.id + '/delete">' +
                        '   <i class="glyphicon glyphicon-trash"></i></a>';
                }
            }
        }

        return stButtons;
    }

    /**
     * Return a Status Template for grid bootstrap based
     * @param label
     * @param type
     * @returns {string}
     */
    function getStatusTemplate(label, type) {

        var index = statusTypes.indexOf(type);
        if (index != -1) {
            return '<small class="label label-' + statusTypes[index] + '">' + label + '</small>';
        } else {
            return '<small class="label label-' + statusTypes[0] + '">' + label + '</small>';
        }
    }

    /**
     * Expand a week code String '0000000' to human days week
     * @param weekCode binary String length 7 Ex 0100101 ==> MON,THU,SAT
     * @param separator
     */
    function expandWeekCodeString(weekCode, separator) {
        var days = '';
        for (var i = 0; i < weekCode.length; i++) {
            if (weekCode[i] != '0') {
                if ((days.length > 0) && (i > 0)) {
                    days += separator;
                }
                switch (i) {
                    case 1:
                        days += 'MON';
                        break;
                    case 1:
                        days += 'TUE';
                        break;
                    case 2:
                        days += 'WED';
                        break;
                    case 3:
                        days += 'THU';
                        break;
                    case 4:
                        days += 'FRI';
                        break;
                    case 5:
                        days += 'SAT';
                        break;
                    case 6:
                        days += 'SUN';
                        break;
                }
            }
        }

        return days;
    }

    function getDays() {
        return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    }

    function weekCodeStringToDays(weekCode) {
        var days = [];
        for (var i = 0; i < weekCode.length; i++) {
            if (weekCode.charAt(i) == '1') {
                switch (i) {
                    case 0:
                        days.push('MON');
                        break;
                    case 1:
                        days.push('TUE');
                        break;
                    case 2:
                        days.push('WED');
                        break;
                    case 3:
                        days.push('THU');
                        break;
                    case 4:
                        days.push('FRI');
                        break;
                    case 5:
                        days.push('SAT');
                        break;
                    case 6:
                        days.push('SUN');
                        break;
                }
            }
        }

        return days;
    }

    function daysToWeekCodeString(days) {
        var code = '0000000';

        if (days) {
            code = code.split("");

            for (var i = 0; i < days.length; i++) {
                switch (days[i]) {
                    case 'MON':
                        code[0] = '1';
                        break;
                    case 'TUE':
                        code[1] = '1';
                        break;
                    case 'WED':
                        code[2] = '1';
                        break;
                    case 'THU':
                        code[3] = '1';
                        break;
                    case 'FRI':
                        code[4] = '1';
                        break;
                    case 'SAT':
                        code[5] = '1';
                        break;
                    case 'SUN':
                        code[6] = '1';
                        break;
                }
            }

            return code.join("");
        }

        return code;
    }

    function getMonths() {
        return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    }

    function monthsCodeStringToMonths(monthCode) {
        var days = [];
        for (var i = 0; i < monthCode.length; i++) {
            if (monthCode.charAt(i) == '1') {
                switch (i) {
                    case 0:
                        days.push('JAN');
                        break;
                    case 1:
                        days.push('FEB');
                        break;
                    case 2:
                        days.push('MAR');
                        break;
                    case 3:
                        days.push('APR');
                        break;
                    case 4:
                        days.push('MAY');
                        break;
                    case 5:
                        days.push('JUN');
                        break;
                    case 6:
                        days.push('JUL');
                        break;
                    case 7:
                        days.push('AUG');
                        break;
                    case 8:
                        days.push('SEP');
                        break;
                    case 9:
                        days.push('OCT');
                        break;
                    case 10:
                        days.push('NOV');
                        break;
                    case 11:
                        days.push('DEC');
                        break;
                }
            }
        }

        return days;
    }

    function monthsToMonthCodeString(months) {
        var code = '000000000000';

        if (months) {
            code = code.split("");

            for (var i = 0; i < months.length; i++) {
                switch (months[i]) {
                    case 'JAN':
                        code[0] = '1';
                        break;
                    case 'FEB':
                        code[1] = '1';
                        break;
                    case 'MAR':
                        code[2] = '1';
                        break;
                    case 'APR':
                        code[3] = '1';
                        break;
                    case 'MAY':
                        code[4] = '1';
                        break;
                    case 'JUN':
                        code[5] = '1';
                        break;
                    case 'JUL':
                        code[6] = '1';
                        break;
                    case 'AUG':
                        code[7] = '1';
                        break;
                    case 'SEP':
                        code[8] = '1';
                        break;
                    case 'OCT':
                        code[9] = '1';
                        break;
                    case 'NOV':
                        code[10] = '1';
                        break;
                    case 'DEC':
                        code[11] = '1';
                        break;
                }
            }

            return code.join("");
        }

        return code;
    }

    /**
     * Returns a URL for a mailto-link
     * @param  {String} recepient    - Recepient email address
     * @param  {Object} opts         - Options to construct the URL
     * @param  {String} opts.cc      - Cc recepient email address (optional)
     * @param  {String} opts.bcc     - Bcc recepient email address (optional)
     * @param  {String} opts.subject - Email subject (optional)
     * @param  {String} opts.body    - Email body (optional). Separate lines with the newline character (\n)
     * @return {String}              - Returns the URL to put into the href-attribute of a mailto link
     */
    function mailto(recepient, opts) {
        var link = '<a href="mailto:';
        link += recepient;//window.encodeURIComponent(recepient);
        var params = [];
        angular.forEach(opts, function (value, key) {
            params.push(key.toLowerCase() + "=" + window.encodeURIComponent(value));
        });
        if (params.length > 0) {
            link += "?" + params.join("&");
        }
        link += '">' + recepient + '</a>';
        return link;
    };

    /**
     * Return object fields as array
     * @param object
     */
    function objectToArray(object) {

        var toArray = [];
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                toArray.push(object[key]);
            }
        }
        return toArray;
    }

    function getDefaultUserPicture() {
        return "/9j/4AAQSkZJRgABAQEAYABgAAD/4QHGRXhpZgAATU0AKgAAAAgABFEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAGAAAAAPlEDAAEAAAABAAAAAAAAAADn5+fBwcHAwMC/v7+5ubm8vLzm5ubo6Oi+vr64uLi9vb27u7u6urq3t7fCwsLAwsHCwMHk5OTl5eW2trbf39/V1dXOzs7h4eHj4+Pi4uLa2trFxcXPz8/S0tLc3NzHx8fLy8vW1tbIyMjDw8PKysrExMTX19fMzMzZ2dnR0dHe3t7d3d3Nzc3Q0NDg4ODU1NTGxsbY2NjT09PBwb/b29vBwcPJycnCwb/BwL7Bv8DAwcPCwMPAwr+/wcDCwsDBw8LCwsTBw8C6uLng3t/DwcTBwMXEwL+/wb7AwcXAwMLCwb3b293i4+Xd3tnf4eDBwsTZ3d7AwL68vLrZ3dy7vbzo6Oq9uLzDwcLb29nn5+W5t7i8urvj4eK4ure/w8LFwMS+w7/c2tu5ubvBv8Tn5+nDwsDp5+jp6em7u726vLkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAF/AX8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorH8aeOdP8C6W1zfTBWIPlRKcyTH0A/r0FeT6X+0drU2rxNcQ2K2TTDzAI23LHu5wc9QO+KAPcKKRHWRAykMrDII7iloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiqer+ItP0CPdfXlraLjP72UJn6Z60AXKK4PXf2ivD+lblt2udRkHQQx7Vz7s2P0BriPEP7RutauGTT7eDTY243f62T8z8v6UAe06xrtn4etDcX11Dawj+KR9ufYep9hXmHjb9pRFDW+gweY3T7TOuFH+6vU/U4+hrzC+kvfEF59ovrme6mb+KVyx/DPT6VNb6csYoAjvri88S6i13f3E1zcSdXkbP4D0HsOKsQ2ixLipVUJ0paAPZvgn4q/t7wqLWVs3GmkRHJ5KfwH8hj/gNdlmvAfh94qbwd4pt7ot/o7nypx6oep/Dg/hXvwbeNw5B5B9aACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqG/v4NLs5Li5mjt4Yhl5JGCqo9ya8r8b/tJBXa30CASEcfaplO3/gKf1P5UAer3FzHaQtJNJHFGoyzOwVR+JrmtV+M3hnR2ZZNWglZe0Aab9VBH614HrGr6p4tuvO1G8uLps5AdvlX6L0H4CmRaQAOeaAPXtT/ab0e24tbK/um7Fgsan8ck/pXN6t+0tq95kWOn2dqvrIWlYfjwP0ri005F7VKtsq0AW9U+JfifXwwm1a6jVv4YSIR9PlA/WsT+zZLiQySM0jtyWY5JrSEajtTqAKcWlKvarCWqp2qSigAAxRRRQAUUUUABG4Yr6A+Ht0954I0uSTlvs6qSe+Bj+lfP+M17r8J9Rj1DwHY+WwLQqYnH91ge/wCGD+NAHR0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVj+NfG9j4E0dry+kx/DFEv35m9FH9egrSv76LTLGa4ncRw26GR2PRVAyTXzX418W3PxF8TyXsxZYQdkERPESdh9T1J9aAJPG3xA1P4lahuuW8q0RsxWyH5I/c/3m9z+nSqNppyxjkVNbWywp0qagBqoFHFOoooAKKKKACiiigAooooAKKKKACiiigArofhv49fwNrm6Qs2n3RCzqP4fRx7j9R+Fc9Qw3DFAH0rbXEd3bxyxOskcihkZTlWB6EU+vJPgn8Q20u8XRb1z9mnbFs5/wCWTn+H6Ht6H68et0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwf7RWsyaZ8P/JjyPt9wkDEf3cFj+e0D8TXi+m2wSKvXP2mRnwjp/8A1/L/AOgPXldsMRCgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooADkEMpKspyCOxr6G8Ias2u+F7C8b/AFk8Cs/+9jn9c18817x8LTnwBpn/AFzP/oRoA6CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA83/AGmP+RR0/wD6/l/9AevK7b/UrXq/7S0e7wXYt/dv0z7fI9eUW3+pWgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK96+GS7PAWl/8AXHP6mvBa+g/A1ubXwZpaH732WMkemVBoA1aKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDn/inp0OpfD7VlmjWRYbZ5lz/CyKWBH4ivAbKTfEPpX0R48XzPA+sr/esZx/5DavnLSz+5WgC3RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOij82VVHViBX0pBCttCka/djUKPoK+b9PG6/gHrIv86+kqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAzvGCeZ4S1Rf71pKP8Axw182aUf3Qr6Y8Rr5nh6/X+9byD/AMdNfM2knMdAF2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAktZPJuo37KwP619KCvmc8ivffhxqr614I064kJaRotjE9WKkrn8cUAbdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRQaAMPx/4w0/whoEr303l/aEaOJANzyNjsPxHPQV876T/q61Pih4jm8aePbyR2P2e1kNvAvZUUkfqcn8faqdtB5KUASUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXuvwlRY/h7poVg3yuSR6l2J/nXhVeifs/wCvzJql3pbNut2jNwgP8DAgHH1yPyoA9UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPmnxFZfYfGurQ/8APO8lA+m84ptbHxcsP7O+KOpDHyzlJl98oM/qDWPQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXYfA1tvjtf8AagkH16GuPrtPgRAZfG7N/wA8rZ2P5qP60AeyUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHjv7R2l/Z/E+m3wHy3MBhJHqjZ/k/6VxKnKivcPi34Jbxt4UaOAZvLV/OgH94gEFfxH6gV4cEaFmjkVo5IztZWGCp7gigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0b9nqwLX+pXWPlSNIgfUkkn+Q/OvO0UuwVQWZjgADqa91+GPhZvCfhSGGVdtzOfOmHox7fgAB9c0AdDRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFcJ8b/B9vd+GZtUht41vbUq7yKMM6dCD64znJ54ru6hv7KPUrGa3mXdDcI0bj1UjB/nQB81xyeYuadTtQ0uTw/rN1YTf6y1laMn+8AeD+I5/Gm0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFbfw70D/hJPGFnbsu6JX8yX02ryfz6fjQB6n8Ofh3ZeH9Hs7ia1jbUmQSPI4y0ZPOB6Y6cV1XSiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACjrRRQB5D+0J4b+w67a6tGv7u8XyZiP769D+K8f8AAa4UNuFe+/ETwx/wl3hC8swuZivmQ+0i8j8+n0Jr5+tn3Jg8MvBHpQBJRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXqX7P2geVZ3mpOvzSnyIz/sjlvzOP++a8vhia4mWONSzuQqqOpJ6V9DeFNDXw14cs7FcZgjAYjux5Y/iSaANCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAzXg/xd8N/8Ix47naNdtvqH+kx+gJPzD/vrJ+hFe8V5z+0nCg8L6dPtHmR3gjVu4VkYkfjtH5UAeW0U2Jt0Yp1ABRRRQAUUUUAFFFFABRRRQAUE4oooA7n4K+Cm1fWF1OZf9FsmzHn/AJaSdv8Avnr9ce9ev5rB+GMax+AtMCKFHlZOPUk5/Wt6gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK85/aY/5Emx/6/wBP/RclejV5Z+0/qTJp2j2ahdk00kzHuCgAH/oZ/KgDza2/1Y+lSVHbjEQqSgAooooAKKKKACiiigAooooAKKKKAPd/hVJ5vw+00/7DD8nYV0Ncd8DL17rwIsbY221xJGmPThv5sa7GgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAr3+rWukoGurq3tlbODLIEB/M147+0N4isfEGq6StjeWt4IEl3mGUSBSSvUg+1c78Yb+41/wCJWorLIzpav5ES9o1XsPxyfxrGttM8o570AW4hhKdSKNopaACiiigAooooAKKKKACiiigAooooA9a+AWowr4XurdpI1mW6ZtpYZ2lFwcfga75WDDI5HqK+Y7mHzkxXoH7N19NaapqGnmRmgaITqhPCMGAOPruH5UAeuUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUM4RSzHao5JPaiuB/aA8b/8I34TNjA2281TMYweUi/jP4/d/E+lAHkniDUY9Z8aapdwtvhuLqR42x1UscH8sUtUtKt/KSrtABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXTfCPWl0Tx1alztjus27H/AHun/jwFczQGZGDKxVlIKkdQaAPpjpRWP4F8UR+L/DVveKy+ZjZMo/gkHUf1+hFbFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUVzPjP4uaJ4JDR3Fz9oul/5doPnkz79l/EivKfF3x61zxQWiscaXatxiJszMPd+3/AcUAeveL/iVo/ghD9uvF87GRbx/PK3/AAHt9TgV4L428Vy/ELxfPqDK0cPEcEbH/VxjoPqeSfcmsuLTWmkZ5GZmY5YnksavW9qsIoAkiTYlOoooAKKKKACiiigAooooAKKKKACiiigAooooAKBRRQBueAfH03gHVzJtaazm4nhB5Pow/wBofrXtPhrxhpvi618ywuo5sDLJnEif7y9RXz0RkVCIpLW4Wa3lkhmQ5V42Ksp9iKAPp6ivEfC/x71nw/tj1BE1S3XjcfkmA/3hwfxGfevSvCXxZ0TxftjguhBcN/ywn/dyZ9uzfgTQB0lFHeigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiihnCKzMdqgZJJ4FABRXC+M/j9ovhndDasdUul42wN+7U+79PyzXlfi34q6946LRzXBtbRuPs9vlEI/2j1b8Tj2oA9e8Z/G/Q/CJeJZv7QvF48m3Ibaf9pug/U+1eVeLvjTr3jNmijk/s20bjyrckMw/2n6n8MD2rmrXSMfeq9FbLGKAKFtpOeWq7FaLEKmooAAMUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAIyB+tQT2CyirFFAGt4Z+KeveDtscdyby1X/AJYXOXAHseo/A49q9J8J/HvR9eKxXm7S7luMTHMRPs//AMVivICM1DLaLIKAPpyKZbiJXRldGGVZTkEfWnV83+G/Fur+Cpd2nXkkcecmFvmib/gJ4/EYNej+FP2irO8Kw6xbtYy9POjy8JPuPvL+v1oA9JoqHTtTt9XtFuLWeG4hf7rxuGU/iKmoAKKKKACiiigAooooAKKKKACiio7u8hsLZ5p5Y4YYxlnkYKqj3JoAkps06W0TSSOscaDLMxwqj3NeceMv2j9O0nfDpER1K4HHmHKQqf5t+GB715d4n8aa147mzqF3I8OcrAnyxL/wH+pyaAPWPGX7ROk6Duh01TqlyOModsKn3bv+Ax715X4q+ImuePXK3l0y2xORbxfJEPqOrf8AAs1n2ulKg5q4kKoOlAFG10kL1q5HbrGKkooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqOS3WQVJRQAaRquoeFrvz9Nu5rWTvsPyv9QeD+Ir0Twn+0Xt2w65a7e32m3HB/wB5P8M/SvO6a8KuKAPo7RPEFj4ksxcWN1DdQnqY2ztPoR1B9jVyvmOwnutCvRc2NxNazr0eNiufr6j2NegeE/2iZ7Vlh1y281en2mBcN9WTofwx9KAPXKKo6D4msPFNn9o0+6iuo++w8ofQjqD7Gr1ABRRRQAVFe3sOnWrzXE0cEMYy7yMFVR7k1znxL+KNn8OtPUyD7RfTA+TbqcZ/2m9F/n2rwrxR4w1b4gXvnahcM0YOUhX5Yo/ov9Tk+9AHqHjT9pGx00tBo0P9oTDjznysKn27t+g968u8ReKNY8dXPmajdyzKpysedscf0Ucfj1qG10xYxzVpYwtAFS20tU61bSJYxxTqKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmvErinUUAMsZrnRL1bqxuJrW4Xo8bbT9D6j2Nej+B/wBoNt8drr0e3sLuJeP+BqP5r+Ved014VcdKAPpa2uo723SaGRJYpFDK6HKsD3BqSvBfh38S7v4f3Ihbdc6ZI2Xh7x/7Se/t0P617jpGr2+u6bDd2sqzW8y7kYf56jpj1oA+dPiNdTa58SNYkmcyeVdPAuf4VRioA/AVXht1hWpPEJ8zxtrLf3r6Y/8AkQ0UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUBcKKKKAuFFFFAXCiiigLhRRRQFwooooC4UUUUBcKKKKAuIwDDmvQP2fNamtdZutNZma3mjM6r/dcEA4+oP6CuArtPgR/yPJ/69n/AJrQB//Z";
    }

    function getDefaultUserPictureContentType() {
        return "image/jpeg";
    }

    function resetUserPicture(patient) {
        patient.picture = getDefaultUserPicture();
        patient.pictureContentType = getDefaultUserPictureContentType();
    }

    function colorHtmlYesNo(value) {
        if (value) {
            return getStatusTemplate('Yes', 'success');
        } else {
            return getStatusTemplate('No', 'danger');
        }
    }
}
'use strict';

angular
    .module('ods-lib')
    .factory('ModalEntity', ModalEntity);

ModalEntity.$inject = ['$uibModal', '$rootScope', '$state'];

function ModalEntity($uibModal, $rootScope, $state) {

    var modals = [];

    var service = {
        openModalEntity: openModalEntity
    };

    return service;

    /**
     * Return a Action Template for grid bootstrap based
     * @param data
     * @param entity
     * @param buttons
     * @returns {string}
     */
    function openModalEntity(templateUrl, controller, controllerAs, size, entity) {

        return $uibModal.open({
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: controllerAs,
                backdrop: 'static',
                size: size,
                resolve: {
                    entity: function () {
                        return entity;
                    },
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('country');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            }
        ).result;


// $uibModal.open({
//     templateUrl: 'app/entities/country/country-dialog.html',
//     controller: 'CountryDialogController',
//     controllerAs: 'vm',
//     backdrop: 'static',
//     size: 'lg',
//     resolve: {
//         entity: ['Country', function (Country) {
//             return Country.get({id: $stateParams.id}).$promise;
//         }]
//     }
// }).result.then(function () {
//     $state.go('^', {}, {reload: false});
// }, function () {
//     $state.go('^');
// });
    }
}
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsFieldType', {
            'DATE': 'DATE',
            'TEXT': 'TEXT',
            'NUMBER': 'NUMBER',
            'TEXTAREA': 'TEXTAREA',
            'TOGGLE': 'TOGGLE',
            'SELECT': 'SELECT',
            'MULTI_SELECT': 'MULTI_SELECT'
            //You can add your new field types
        })
        .constant('OdsComponentType', {
            'SECTION': 'section', //Do not edit this type
            'ROW': 'row', //Do not edit this type
            'FIELD': 'field' //Do not edit this type
        });
})();

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

/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsFormController', OdsFormController);

    OdsFormController.$inject = ['OdsFormService'];

    function OdsFormController(OdsFormService) {

        var vm = this;

        // vm.form = form;
        vm.getRequired = getRequired;
        vm.getFieldTemplate = getFieldTemplate;
        vm.getSelectTitleField = getSelectTitleField;

        function getRequired(field) {

            return field && field.required && field.required !== undefined ? field.required : false;
        }

        function getFieldTemplate(fieldType) {

            return OdsFormService.getFieldTemplate(fieldType);
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

    }
})();

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsForm', FormDirective);

FormDirective.$inject = ['OdsFormService'];

function FormDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form/form.html',
        scope: {
            schema: '=',
            onSave: '='
        },
        controller: 'OdsFormController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.clear = clear;
        $scope.save = save;

        function clear() {
            //TODO confirm if you want to clear al fields.
            alert("Entro al clear");
        }

        function save() {
            if($scope.onSave !== undefined){
                var data = OdsFormService.saveFormData($scope.schema);
                $scope.onSave($scope.schema, data);
            }else {
                alert("You must to define a onSave function.");
            }
        }
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsSchemaController', OdsSchemaController);

    OdsSchemaController.$inject = ['OdsFormService'];

    function OdsSchemaController(OdsFormService) {

        var vm = this;

    }
})();

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormInfo', OdsFormInfoDirective);

OdsFormInfoDirective.$inject = ['OdsFormService'];

function OdsFormInfoDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form-info/form-info.html',
        scope: {
            schema: '='
        },
        // controller: 'OdsSchemaController',
        // controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsModel', ModelDirective);

ModelDirective.$inject = ['OdsFormService'];

function ModelDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/model/model.html',
        scope: {
            schema: '='
        },
        // controller: 'OdsFormController',
        // controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.$watch('schema', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsSchemaController', OdsSchemaController);

    OdsSchemaController.$inject = ['OdsFormService'];

    function OdsSchemaController(OdsFormService) {

        var vm = this;

        vm.getSchemaComponent = getSchemaComponent;

        function getSchemaComponent() {
            return OdsFormService.getSchemaComponent();
        }
    }
})();

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSchema', SchemaDirective);

SchemaDirective.$inject = ['OdsFormService', '$timeout'];

function SchemaDirective(OdsFormService, $timeout) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/schema.html',
        scope: {
            schema: '=',
            debugMode: '='
        },
        controller: 'OdsSchemaController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.schema = OdsFormService.initSchema($scope.schema);

        $scope.getSchemaComponent = getSchemaComponent;

        function getSchemaComponent(object) {
            return OdsFormService.getSchemaComponent(object);
        }

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsFormToolbarController', OdsFormToolbarController);

    OdsFormToolbarController.$inject = ['OdsFormService', 'OdsFieldType', 'OdsComponentType'];

    function OdsFormToolbarController(OdsFormService, OdsFieldType, OdsComponentType) {

        var vm = this;

        vm.toolbar = {
            title: 'Fields Toolbar',
            groups: [{
                id: 0,
                open: false,
                disabled: false,
                title: 'Layout',
                icon: 'fa fa-dashboard',
                components: [OdsFormService.newSectionObject()
                    // , {
                    //     componentType: OdsComponentType.ROW,
                    //     cssClass: 'row',
                    //     cols: [{
                    //         cssClass: 'col-lg-12',
                    //         field: null
                    //     }]
                    // }
                ]
            }, {
                id: 1,
                open: false,
                disabled: false,
                title: 'Text input fields',
                icon: 'fa fa-dashboard',
                components: [{
                    componentType: OdsComponentType.FIELD,
                    label: 'TextBox',
                    name: 'textbox1',
                    placeholder: '',
                    type: OdsFieldType.TEXT,
                    required: false,
                    value: ''
                }, {
                    id: 1,
                    type: OdsFieldType.NUMBER,
                    title: 'Number',
                    template: '/api/report/rounding-report'
                }]
            }, {
                id: 2,
                open: false,
                disabled: false,
                title: 'Select input fields',
                icon: 'fa fa-dashboard',
                components: [{
                    id: 0,
                    type: OdsFieldType.TEXT,
                    title: 'TextBox',
                    name: 'texbox',
                    template: '/api/report/rounding-report',
                }, {
                    id: 1,
                    type: OdsFieldType.NUMBER,
                    title: 'Number',
                    name: 'number',
                    template: '/api/report/rounding-report'
                }]
            }]
        };

        vm.getSuperFieldTemplate = getSuperFieldTemplate;
        vm.getToolbarComponent = getToolbarComponent;
        vm.addField = addField;
        vm.addSection = addSection;

        function getSuperFieldTemplate() {
            return OdsFormService.getSuperFieldTemplate();
        }

        function getToolbarComponent(componentType) {
            return OdsFormService.getToolbarComponent(componentType);
        }

        function addField() {
            alert("Add field function");
        }

        function addSection() {
            alert("Add section function");
        }

    };
})();

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormToolbar', OdsFormToolbar);

OdsFormToolbar.$inject = ['OdsFormService', '$uibModal', '$sce', '$q'];

function OdsFormToolbar(OdsFormService, $uibModal, $sce, $q) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/toolbar/toolbar.html',
        // scope: {
            // schema: '=',
        // },
        controller: 'OdsFormToolbarController',
        controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsRow', RowDirective);

RowDirective.$inject = ['OdsFormService', 'NgTableParams'];

function RowDirective(OdsFormService, NgTableParams) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/row/row.html',
        scope: {
            schema: '=',
            row: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.toggleRowProperties = toggleRowProperties;
        $scope.removeRow = removeRow;
        $scope.addColumn = addColumn;
        $scope.removeColumn = removeColumn;
        $scope.cancelColumnEdited = cancelColumnEdited;
        $scope.saveColumnEdited = saveColumnEdited;


        $scope.originalData = angular.copy($scope.row.cols);

        $scope.tableParams = new NgTableParams({}, {
            filterDelay: 0,
            dataset: $scope.row.cols
        });

        function cancelColumnEdited(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(row, originalRow);
        }

        function resetRow(row, rowForm){
            row.isEditing = false;
            rowForm.$setPristine();
            // $scope.tableTracker.untrack(row);
            return _.findWhere($scope.originalData, function(r){
                return r.id === row.id;
            });
        }

        function saveColumnEdited(row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(originalRow, row);
        }

        function toggleRowProperties(row) {

            row.displayProperties = !row.displayProperties;
            $scope.expanded = row.displayProperties;
        }

        function removeRow(schema, section) {

            $scope.schema = OdsFormService.removeRow(schema, section);
        }

        function addColumn(row) {

            var gridSize = 0;
            for (var i = 0; i < row.cols.length; i++) {

                var size = row.cols[i].cssClass.substr(row.cols[i].cssClass.length - 2);
                size = parseInt(size.replace(/-/g, ''));
                gridSize = eval(gridSize + size);
            }
            if (gridSize < 12) {
                row.cols.push(OdsFormService.newColumnObject(12 - gridSize));
                $scope.tableParams.reload();
            } else {
                alert('Columns can\'t be greater than 12 columns, please fix it!!!');
            }
        }

        function removeColumn(cols, index) {

            $scope.row.cols.splice(index, 1);
            $scope.tableParams.reload();
        }

        $scope.$watch('row', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSection', SectionDirective);

SectionDirective.$inject = ['OdsFormService'];

function SectionDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/section/section.html',
        scope: {
            schema: '=',
            section: '=',
            debugMode: '='
        },
        // controller: 'OdsSchemaController',
        // controllerAs: 'vm',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.toggleSectionProperties = toggleSectionProperties;
        $scope.removeSection = removeSection;
        $scope.addRow = addRow;

        function toggleSectionProperties(section) {

            section.displayProperties = !section.displayProperties;
            $scope.expanded = section.displayProperties;
        }

        function removeSection(schema, section) {

            $scope.schema = OdsFormService.removeSection(schema, section);
        }

        function addRow() {
            $scope.section.rows.push(OdsFormService.newRowObject());
        }

        $scope.$watch('section', function (model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);


    }
}

})();