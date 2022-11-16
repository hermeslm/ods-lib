/*!
 * See LICENSE in this repository for license information
 */
(function(){
'use strict';

angular
  .module('ods-lib', [
    'ui.bootstrap',
    'ui.toggle',
    'ui.select',
    'ui.bootstrap.datetimepicker',
    'dndLists',
    'ngSanitize',
    'cp.ngConfirm',
    'dialogs.main',
    'ngMessages',
    'mgcrea.bootstrap.affix',
    'ngResource',
    'ngStorage',
    'angularMoment',
    'datatables',
    'datatables.factory',
    'datatables.bootstrap',
    'datatables.colreorder',
    'uiCropper',
    'ngFileUpload',
    'pdfjsViewer',
    'ui.mask',
    'jsonFormatter',
    'colorpicker'
  ])
  .config(configFunction)
  .value('version', '3.6.5')
  .run(function (/*editableOptions */) {
    // editableOptions.theme = 'bs3';
  });

configFunction.$inject = ['$rootScopeProvider', '$localStorageProvider'];

function configFunction($rootScopeProvider, $localStorageProvider) {

  //We add this due to a limitation of AngularJS to avoid infinite recursion
  // or infinite loop when dirty checking the model. In our case is because template recursion.
  $rootScopeProvider.digestTtl(15);
  $localStorageProvider.setKeyPrefix('ods-');
}

'use strict';
angular.module('ods-lib').run(['$templateCache', function($templateCache) {$templateCache.put('file-upload/udt-attach-file.html','<div class="box-footer"><ul class="mailbox-attachments clearfix"><li ng-repeat="item in files track by item.id" data-id="{{item.id}}" ng-hide="item.hide"><span class="pull-right" style="margin-right: 5px; cursor: hand" ng-click="deleteFile(item.id)" ng-if="!disableAttach" uib-tooltip="Delete file"><i class="fa fa-remove" style="color: #a20000"></i> </span><!--<span class="pull-right" style="margin-right: 5px;">--><!--<button class="btn-circle btn-danger btn-circle-xxs"><i class="fa fa-remove"></i></button>--><!--</span>--><!----> <span class="mailbox-attachment-icon"><i ng-if="(item.type.split(\'/\')[0] == applicationType)" class="fa fa-file-pdf-o" ng-click="getFileAttached(item.type, item.id)"></i><!--<i ng-if="(item.type.split(\'/\')[0] == imageType)" class="fa fa-picture-o"></i>--> <a ng-if="(item.type.split(\'/\')[0] == imageType)" ng-click="imageDetail(item.id, item.type);" uib-tooltip="Click to view the image"><i class="fa fa-picture-o"></i> </a><i ng-if="!item.type" class="fa fa-file-pdf-o" ng-click="getFileAttached(item.type, item.id)"></i></span><div class="mailbox-attachment-info"><p class="mailbox-attachment-name"><i class="fa fa-paperclip"></i> {{item.name?item.name.split(\'\')[0]:\'default\'}}</p><span class="mailbox-attachment-size">{{item.size}}</span></div></li><li ng-show="!isSigned && !disableAttach"><span class="mailbox-attachment-icon"><button type="button" ngf-select style="background-color: white; border: aliceblue;" uib-tooltip="Add attachment" ngf-change="attachFile($file, attachFileData)" accept="image/*,pdf,csv"><i class="fa fa-paperclip"></i></button></span><div class="mailbox-attachment-info"><p class="mailbox-attachment-name">Add New Attachment</p></div></li><li ng-if="files.length == 0 && disableAttach"><div class="col-xs-12 block-mt5"><p>No attachments.</p></div></li></ul></div>');
$templateCache.put('address/address-dialog.html','<form name="addressForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myAddressLabel">Create or edit a Address</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': addressForm.street.$invalid}"><label class="control-label" for="field_street">Street</label><input type="text" class="form-control" name="street" id="field_street" ng-required="true" ng-model="vm.address.street" placeholder="Street..." tabindex="1" autocomplete="street-address"><div ng-show="addressForm.street.$invalid"><p class="help-block" ng-show="addressForm.street.$error.required">This field is required.</p></div></div></div><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': addressForm.mobile.$invalid}"><label class="control-label" for="field_mobile">Mobile</label><input type="text" class="form-control" name="mobile" id="field_mobile" ng-model="vm.address.mobile" placeholder="Mobile..." tabindex="7" autocomplete="tel-national" ng-required="true"><div ng-show="addressForm.mobile.$invalid"><p class="help-block" ng-show="addressForm.mobile.$error.required">This field is required.</p></div></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_street2">Street2</label><input type="text" class="form-control" name="street2" id="field_street2" ng-model="vm.address.street2" placeholder="Street 2..." tabindex="2" autocomplete="address-line2"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_phone">Phone</label><input type="text" class="form-control" name="phone" id="field_phone" placeholder="Phone..." tabindex="8" ng-model="vm.address.phone" autocomplete="tel-national"></div></div></div><div class="row"><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.city.$invalid}"><label class="control-label" for="field_city">City</label><input type="text" class="form-control" name="city" id="field_city" ng-required="true" ng-model="vm.address.city" placeholder="City..." tabindex="3" autocomplete="address-level2"><div ng-show="addressForm.city.$invalid"><p class="help-block" ng-show="addressForm.city.$error.required">This field is required.</p></div></div></div><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.country.$invalid}"><label class="control-label" for="field_country">Country</label><select class="form-control" id="field_country" name="country" ng-model="vm.address.state.country" tabindex="4" ng-required="true" ng-options="country as country.name for country in vm.countries track by country.code" autocomplete="country-name"><option value="" disabled="disabled" hidden>Country...</option></select><div ng-show="addressForm.country.$invalid"><p class="help-block" ng-show="addressForm.country.$error.required">This field is required.</p></div></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_fax">Fax</label><input type="text" class="form-control" name="fax" id="field_fax" ng-model="vm.address.fax" placeholder="Fax..." tabindex="9" autocomplete="fax"></div></div></div><div class="row"><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.zipCode.$invalid}"><label class="control-label" for="field_zipCode">Zip</label><input type="text" class="form-control" name="zipCode" id="field_zipCode" ng-model="vm.address.zip" placeholder="ZIP" tabindex="5" ng-required="true" autocomplete="postal-code"><div ng-show="addressForm.zipCode.$invalid"><p class="help-block" ng-show="addressForm.zipCode.$error.required">This field is required.</p></div></div></div><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.state.$invalid}"><label class="control-label" for="field_state">State</label><select class="form-control" id="field_state" name="state" ng-model="vm.address.state" tabindex="6" ng-required="true" ng-options="state as state.name for state in vm.states | filter:{country:vm.address.state.country} track by state.code" autocomplete="state"><option value="" disabled="disabled" hidden>State...</option></select><div ng-show="addressForm.state.$invalid"><p class="help-block" ng-show="addressForm.state.$error.required">This field is required.</p></div></div></div><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': addressForm.email.$invalid}"><label class="control-label" for="field_email">Email</label><div class="input-group"><span class="input-group-addon" uib-tooltip="Mark it if you don\'t have email"><input type="checkbox" id="field_nonEmail" name="field_nonEmail" ng-model="vm.nonEmail" ng-click="vm.toggleEmail()" style="position: relative;margin-top: 4px;"><!--<label for="field_nonEmail" style="padding-left: 20px;height: 13px;"></label>--> </span><input type="email" class="form-control" name="email" id="field_email" ng-required="true" ng-model="vm.address.email" placeholder="Email..." tabindex="10" autocomplete="email" ng-change="vm.emailChanged()"></div><div ng-show="addressForm.email.$invalid"><p class="help-block" ng-show="addressForm.email.$error.required">This field is required.</p><p class="help-block" ng-show="addressForm.email.$error.email">Email not valid.</p></div></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_notes">Notes</label><textarea rows="3" class="form-control" name="notes" id="field_notes" ng-model="vm.address.notes" placeholder="Notes..." tabindex="11">\n                    </textarea></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button type="button" ng-click="vm.save()" ng-disabled="addressForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span></button></div></form>');
$templateCache.put('address/address.html','<label ng-show="label" class="control-label" for="ods-address">{{label}}</label><div class="input-group"><input type="text" class="form-control" name="ods-address" id="ods-address" readonly="readonly" value="{{printName(ngModel)}}"> <span class="input-group-addon" ng-click="openModal()"><i class="fa fa-external-link"></i></span></div>');
$templateCache.put('hide-value/input-hide-value.html','<div class="form-group has-feedback"><label ng-show="label" class="control-label" for="{{name}}">{{label}}</label><input name="{{name}}" type="{{type}}" class="form-control" placeholder="{{placeholder}}" ng-model="ngModel" ng-focus="onFocus()" ng-blur="onBlur()" ui-mask="{{mask}}" ng-disabled="ngDisabled" ng-required="ngRequired"> <span class="{{icon}} form-control-feedback" style="cursor: {{cursor}}; pointer-events: all;" ng-click="toggleFn()"></span></div>');
$templateCache.put('hide-value/text-hide-value.html','<span>{{value}}</span> <span class="{{icon}}" style="cursor: {{cursor}}; pointer-events: all;" ng-click="toggleFn()"></span>');
$templateCache.put('forms/form-builder.html','<!--<div class="row">--><!--<div class="col-lg-12">--><!--<button type="button" class="btn btn-success" ng-click="toggleStyle()">--><!--<span class="fa fa-refresh"></span>&nbsp;<span>Toggle style</span>--><!--</button>--><!--</div>--><!--</div>--><div class="row"><div class="col-md-3"><ods-form-toolbar></ods-form-toolbar></div><div class="col-md-9"><uib-tabset><uib-tab index="0" heading="Form information"><ods-form-info schema="schema"></ods-form-info></uib-tab><uib-tab index="1" heading="Form Schema"><ods-schema schema="schema" config="config" debug-mode="debugMode"></ods-schema></uib-tab><uib-tab index="2" heading="Form Preview"><ods-form schema="schema" config="runTimeConfig" on-save="saveForm(schema)"></ods-form></uib-tab><uib-tab index="3" heading="Form Print View"><ods-viewer schema="schema" config="runTimeConfig" css-class="cssClass"></ods-viewer></uib-tab><uib-tab index="4" heading="Form Model" ng-show="debugMode"><ods-model model="schema" css-class="fixed-height"></ods-model></uib-tab></uib-tabset></div></div>');
$templateCache.put('img-upload/img-upload-dialog.html','<form name="editForm" role="form" novalidate ng-submit="vm.save()"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myImageLabel">Change/Edit Image</h4></div><div class="modal-body"><div class="row"><div class="col-lg-6" style="text-align: center;"><div class="img-responsive img-thumbnail"><ui-cropper image="vm.original" area-type="{{vm.areaType}}" chargement="\'Loading\'" result-image-size="vm.croppedImageSize" result-image="vm.model" canvas-scalemode="true" change-on-fly="true"></ui-cropper></div></div><div class="col-lg-6" style="text-align: center;"><img class="img-responsive img-thumbnail" ng-src="{{vm.model}}"></div></div><br><div class="row"><div class="col-lg-6"><button type="button" class="btn btn-warning btn-block" ngf-select ngf-change="vm.handleFileSelect($event, $file)" accept="image/*"><i class="fa fa-image" aria-hidden="true"></i> Browse...</button></div></div></div><div class="modal-footer"><button type="button" class="btn btn-info" ng-click="vm.setDefault()"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Restore default</button> <button type="submit" class="btn btn-success"><i class="fa fa-save" aria-hidden="true"></i> Save</button> <button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="vm.clear()"><i class="fa fa-ban" aria-hidden="true"></i> Cancel</button></div></form>');
$templateCache.put('img-upload/img-upload.html','<div ng-if="displayImage"><img class="img-responsive {{cssClass}}" id="imgPicture" ng-src="{{ngModel}}" ng-if="ngModel" ng-click="openModal()" style="cursor: pointer;min-height: 100px"></div><a href="" class="footer-link" ng-if="!displayImage" ng-click="openModal()">{{uploadText}}&nbsp; <i class="fa fa-plus-circle" aria-hidden="true" ng-if="mode === \'insert\'"></i> <i class="fa fa-edit" aria-hidden="true" ng-if="mode === \'edit\'"></i></a>');
$templateCache.put('reports/param.html','<form name="paramsForm" novalidate show-validation><div class="form-group" ng-class="{\'has-error\': paramsForm.{{param.name}}.$invalid}"><div ng-switch="param.type"><label class="control-label" for="{{param.name}}" ng-hide="hideTitle(param)">{{param.title}}</label><input ng-switch-when="NUMBER" class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-required="getRequired(param)" type="number"> <input ng-switch-when="TEXT" class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-required="getRequired(param)"><div ng-switch-when="DATE" class="input-group" ng-hide="hideParam(param)"><input id="{{param.name}}" class="form-control" name="{{param.name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="getRequired(param)" ng-model="param.value" is-open="param.datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openCalendar(param)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-switch-when="SINGLE_SELECT" ng-hide="hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" ng-model="param.value" ui-select-required="vm.getRequired(param)" close-on-select="true" title="{{param.title}}"><ui-select-match placeholder="{{param.placeholder}}">{{getSelectTitleField(param, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search | limitTo: 500"><div ng-bind-html="getSelectTitleField(param, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div><select ng-switch-when="LIST" class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-options="item.id as item.name for item in param.list" ng-required="getRequired(param)"></select><div ng-switch-when="MULTI_SELECT" ng-hide="hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" multiple="multiple" ng-model="param.value" close-on-select="false" title="{{param.title}}" ui-select-required="getRequired(param)"><ui-select-match placeholder="{{param.placeholder}}">{{getSelectTitleField(param, $item)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search">{{getSelectTitleField(param, element)}}</ui-select-choices></ui-select></div><div ng-switch-when="TABLE_SELECT" ng-hide="hideParam(param)"><div class="navbar-form navbar-right"><div class="text-right"><div class="has-feedback input-group-sm"><input class="form-control" ng-model="param.searchQuery" id="searchQueryrpt-metadata" placeholder="{{param.placeholder}}" ng-change="search(param)"> <span class="glyphicon glyphicon-search form-control-feedback"></span></div></div></div><br><br><table datatable="" dt-options="getDtOptions(param)" dt-columns="getDtColumns(param)" dt-instance="param.dtInstance" class="table table-striped table-bordered table-condensed"></table></div><div ng-switch-when="DRAG_AND_DROP" ng-hide="hideParam(param)"><div class="row"><div class="col-md-6"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title ng-binding">{{param.sourceTitle}}</h3></div><div class="panel-body source-sections"><ul dnd-list="param.list"><li ng-repeat="item in param.list" dnd-draggable="item" dnd-moved="param.list.splice($index, 1)" dnd-effect-allowed="move">{{getSelectTitleField(param, item)}}</li></ul></div></div></div><div class="col-md-6"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title ng-binding">{{param.targetTitle}}</h3></div><div class="panel-body selected-sections"><ul dnd-list="param.value"><li ng-repeat="item in param.value" dnd-draggable="item" dnd-moved="param.value.splice($index, 1)" dnd-effect-allowed="move">{{getSelectTitleField(param, item)}}</li></ul></div></div></div></div></div><div ng-switch-when="CHECK_LIST" ng-hide="hideParam(param)"><ods-check-list list="param.list" ng-model="param.value" height="param.height"></ods-check-list><!--ng-if="hideParam(param)"--><!--ng-required="getRequired(param)"--></div><input ng-switch-default class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-required="getRequired(param)"><div ng-show="paramsForm.{{param.name}}.$invalid"><p class="help-block" ng-show="paramsForm.{{param.name}}.$error.required">This field is required.</p></div></div></div></form>');
$templateCache.put('reports/params.html','<form name="paramsForm" novalidate ng-submit="vm.openReport()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myCityLabel">Report Params for:</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><h4>{{vm.report.title}}</h4><ng-include src="\'reports/tpl/one-col.tpl.html\'" ng-if="!vm.report.multiCols"></ng-include><ng-include src="\'reports/tpl/two-col.tpl.html\'" ng-if="vm.report.multiCols"></ng-include></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button ng-disabled="paramsForm.$invalid" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Open</span></button></div></form>');
$templateCache.put('reports/reports.html','<div class="row" ng-show="infoMessage" ng-class="ng-hide"><div class="col-lg-12"><div uib-alert class="alert alert-info alert-dismissible" close="hideInfoMessage()"><h4><i class="icon fa fa-info"></i> Reports info!</h4>If don\'t have a PDF viewer plugin in the browser. No biggie... you can download it. Please select the report and download it from report preview.</div></div></div><div class="row"><div class="col-md-3"><div class="box box-solid"><div class="box-header with-border"><h3 class="box-title">{{reportsGroup.title}}</h3></div><!-- /.box-header --><div class="box-body"><uib-accordion close-others="true"><div uib-accordion-group class="panel-default" heading="{{group.title}}" is-open="group.open" is-disabled="group.disabled" ng-repeat="group in reportsGroup.groups" ng-init="groupIndex = $index"><ul class="list-group list-group-unbordered"><li class="list-group-item" ng-repeat="report in group.reports" ng-init="reportIndex = $index"><a href="" ng-click="openReport(groupIndex, reportIndex)"><b>{{report.title}}</b></a></li></ul></div></uib-accordion></div><!-- /.box-body --></div><!-- /.box --></div><div class="col-md-9"><div class="box box-primary"><div class="box-header with-border"><h3 class="box-title">Report Preview</h3></div><!-- /.box-header --><div class="box-body" style="height: 100vh;"><div ng-show="selectReport" class="ng-hide"><p>Download report: <a ng-click="downloadReport()">{{selectReport.title}}</a></p></div><pdfjs-viewer data="reportFile"></pdfjs-viewer><!--<object embed-src="{{vm.reportFile}}" width="100%" height="100%">--><!--</object>--><!--<object style="height: 90vh;" type="application/pdf" data="{{reportFile}}" width="100%"--><!--height="100%"/>--></div></div></div></div>');
$templateCache.put('select-filtered/select-filtered.html','<!--<div class="form-group">--><label for="{{name}}" ng-if="!hideLabel">{{label}}</label><div class="input-group"><ui-select name="{{name}}" id="{{name}}" ng-model="selected.value" ng-disabled="ngDisabled" ui-select-required="ngRequired" close-on-select="true" title="{{tooltip}}" on-select="onSelectFn()"><ui-select-match placeholder="{{placeholder}}"><div ng-class="renderClass($select.selected)" ng-bind-html="getSelectTitleValue($select.selected)"></div></ui-select-match><ui-select-choices repeat="item in filtered | filter:$select.search"><div ng-class="renderClass(item)" ng-bind-html="getSelectTitleValue(item) | highlight: $select.search"></div></ui-select-choices></ui-select><div class="input-group-btn"><div class="btn-group" uib-dropdown is-open="isOpen"><button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled"><span class="fa fa-filter"></span></button><ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button"><li role="menuitem" ng-repeat="filter in filters" ng-click="toggleFilter(filter)"><a href=""><span ng-class="filter.active ? \'fa fa-check-circle\' : \'fa fa-times-circle\'"></span> {{filter.title}}</a></li><!--<li class="divider"></li>--><!--<li role="menuitem"><a href="#">Separated link</a></li>--></ul></div></div></div><!--</div>-->');
$templateCache.put('signature/signature.html','<div id="signature" class="{{options.cssClass}}"><style type="text/css" scoped>.sig-box {\n            border-radius: 4px;padding: 5px 5px 0;margin-bottom: 5px;\n        }\n        .sig-box-default {\n            border: 1px solid #ccc;"\n        }\n        .sig-box-error {\n            border: 1px solid #a94442;"\n        }</style><div id="{{name}}" class="sig-box {{requiredClass}}"><!--style=">--></div><button type="button" class="btn btn-danger" ng-click="reset()" ng-disabled="disabled"><span class="glyphicon glyphicon-erase"></span> <span>Clear</span></button><!--<button ng-click="getData()">getData</button>--><!--<button ng-click="setData()">setData</button>--></div>');
$templateCache.put('wizard-steps/wizard-steps.html','<div class="ods-wizard-content"><div class="ods-wizard-circle ods-wizard clearfix"><div class="steps clearfix"><ul><li class="{{step.status}}" ng-repeat="step in ngModel" ng-class="{ \'first\': $index === 0, \'done\': step.done, \'last\': $index === ngModel.length -1}" ng-show="step.visible"><a href="" ng-click="step.callback()"><span class="step">{{step.label}}</span></a></li><!--<li class="first done">--><!--<a href=""><span class="step">Select template</span></a>--><!--</li>--><!--<li class="current">--><!--<a href="" ui-sref="{{vm.parentName}}.info"><span class="step">Information</span></a>--><!--</li>--><!--<li class="">--><!--<a href="" ui-sref="{{vm.parentName}}.form"><span class="step">Form</span></a>--><!--</li>--><!--<li class="disabled" ng-show="vm.doc.billable"><a href="" ui-sref="{{vm.parentName}}.services">--><!--<span class="step">Services</span></a>--><!--</li>--><!--<li class="disabled">--><!--<a href="" ui-sref="{{vm.parentName}}.attachment"><span class="step">Attachments</span></a>--><!--</li>--><!--<li class="disabled">--><!--<a href="" ui-sref="{{vm.parentName}}.signature"><span class="step">Signature</span></a>--><!--</li>--><!--<li class="disabled last">--><!--<a href="" ui-sref="{{vm.parentName}}.finish"><span class="step">Finish</span></a>--><!--</li>--></ul></div></div></div><!--<div class="ods-breadcrumb {{class}}">--><!--<a class="{{step.status}} {{step.disabled ? \'disabled\': \'\'}}" ng-repeat="step in ngModel" ng-click="changeStatus(step)">{{step.label}}</a>--><!--</div>-->');
$templateCache.put('steps-indicator/template.html','<div class="btn-group {{class}}"><button type="button" class="btn btn-primary {{step.status}}" ng-disabled="step.disabled" ng-repeat="step in ngModel" ng-click="onClick(step, $index)">{{step.label}}</button><!--<a class="{{step.status}} {{step.disabled ? \'disabled\': \'\'}}" ng-repeat="step in ngModel" ng-click="changeStatus(step)">{{step.label}}</a>--></div>');
$templateCache.put('forms/form/form.html','<div ng-if="schema"><div class="form-header with-border"><h3 class="box-title" ng-hide="schema.hideLabel" ng-bind-html="schema.label"></h3></div><!-- form start --><div ng-if="schema.layout.length !== 0"><ng-form name="{{schema.name}}" role="form" novalidate><div class="box-body padding-top"><div class="alert alert-success" ng-show="success"><strong>Success! </strong>{{message}}</div><div class="alert alert-danger" ng-show="error"><strong>Error! </strong>{{message}}</div><div class="alert alert-info" ng-show="info"><strong>Information! </strong>{{message}}</div><div ng-repeat="section in schema.layout"><div class="row"><div class="col-lg-8"><h4 ng-bind-html="section.title" ng-hide="hideTitle(section)"></h4></div><div class="col-lg-4"><div class="box-tools pull-right"><button class="btn btn-warning" type="button" title="Clone Section" ng-if="section.canClone" ng-click="cloneSection(section)"><i class="fa fa-clone"></i></button> <button class="btn btn-danger" type="button" title="Remove Section" ng-if="section.canClone" ng-click="removeSection($index)"><i class="fa fa-trash"></i></button></div></div></div><div class="{{row.cssClass}}" ng-repeat="row in section.rows"><div class="{{col.cssClass}}" ng-repeat="col in row.cols"><div class="" ng-repeat="field in col.fields"><div ng-if="field"><div class="form-group" ng-class="{\'has-error\': {{schema.name}}.{{field.name}}.$invalid}"><label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)">{{field.label}}&nbsp;</label><ng-include src="getFormFieldTemplate(field.type)"></ng-include><div ng-show="{{schema.name}}.{{field.name}}.$invalid"><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.datetime">{{field.validation.messages.datetime}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.required">{{field.validation.messages.required}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.minlength">{{field.validation.messages.minlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.maxlength">{{field.validation.messages.maxlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.pattern">{{field.validation.messages.pattern}}</p></div></div></div></div></div></div></div></div><div class="box-footer" ng-show="schema.handleSubmit"><button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="clear()"><span class="fa fa-trash-o"></span>&nbsp;<span>Clear</span></button> <button type="submit" ng-disabled="{{name}}.$invalid" class="btn btn-primary"><span class="fa fa-save"></span>&nbsp;<span>Save</span></button></div></ng-form></div></div>');
$templateCache.put('forms/schema/schema.html','<div class="box-schema"><div class="alert alert-danger" ng-show="vm.error"><strong>An error has occurred!</strong> Error in schema.</div><div class="container" ng-if="schema.layout.length === 0" style="width: 100%;"><div class="col-lg-12 alert alert-info text-center"><p class="box-schema-area-empty-x"><span class="fa fa-arrow-down"></span></p><p class="lead hidden-phone">To start <strong>Drag</strong> a <strong>section</strong> from the <strong>toolbar</strong> down to this <strong>canvas</strong>.</p></div></div><ul dnd-list="schema.layout" dnd-allowed-types="schema.allowedTypes" dnd-inserted="onAdd(item, type)"><li class="box-schema-section" ng-repeat="section in schema.layout" dnd-draggable="section" dnd-disable-if="section.componentType == undefined" dnd-effect-allowed="move" dnd-moved="schema.layout.splice($index, 1)"><ods-section schema="schema" section="section" config="config" index="$index" debug-mode="debugMode"></ods-section></li></ul></div>');
$templateCache.put('forms/form-info/form-info.html','<form name="formInfo" role="form" novalidate ng-submit="save()" show-validation><div class="box-body padding-top"><div class="row"><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formInfo.formName.$invalid}"><label class="control-label" for="formName">Form name</label><input class="form-control" name="formName" id="formName" ng-model="schema.name" ng-required="true"></div></div><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formInfo.formLabel.$invalid}"><label class="control-label" for="formLabel">Form label</label><input class="form-control" name="formLabel" id="formLabel" ng-model="schema.label" ng-required="true"></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{\'has-error\': formInfo.description.$invalid}"><label class="control-label" for="description">Form description</label><textarea class="form-control" name="description" id="description" ng-model="schema.description" ng-required="false" rows="3" placeholder="Type form description...">\n                    </textarea></div></div></div><div class="row"><div class="col-lg-3"><div class="form-group" ng-class="{\'has-error\': formInfo.handleSubmit.$invalid}"><label class="control-label" for="handleSubmit">Handle submit internally: &nbsp;</label><input type="checkbox" name="handleSubmit" id="handleSubmit" ng-model="schema.handleSubmit" ng-required="false" title="Specify if submit is handle by form (in this case you must to specify submit callback) or externally"></div></div><div class="col-lg-9"><div class="form-group" ng-class="{\'has-error\': formInfo.handleSubmit.$invalid}"><label class="control-label" for="hideLabel">Hide form label: &nbsp;</label><input type="checkbox" name="hideLabel" id="hideLabel" ng-model="schema.hideLabel" ng-required="false" title="This allow to hide the form title."></div></div></div></div></form>');
$templateCache.put('forms/toolbar/field-to-delete.html','<div class="box-draggable"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs btn-primary" type="button" ng-click="vm.addField(field)" title="Add this field."><span class="fa fa-hand-pointer-o"></span></button></div></div><label class="control-label" for="{{field.name}}">{{field.title}}</label><input class="form-control" name="{{field.name}}" id="{{field.name}}">');
$templateCache.put('forms/toolbar/toolbar.html','<div class="toolbar-container box-solid" bs-affix data-offset-top="10" data-offset-bottom="0"><div class="form-header with-border"><div class="row" style="margin: 0"><div class="col-lg-8"><h3 class="box-title">{{toolbar.title}}</h3></div><div class="col-lg-4 accordion-button-right"><label class="btn btn-success"><i class="fa fa-upload"></i> <input type="file" style="display: none;" ng-model="importFile" accept=".json" ods-file-upload></label><!--<button class="btn btn-success"  title="Import Form">--><!--<i class="fa fa-upload"></i>--><!--<input type="file" ng-model="importFile" accept=".json" ods-file-upload>--><!--</button>--> <button class="btn btn-primary" title="Export Form" ng-click="export()"><i class="fa fa-download"></i></button></div></div></div><!-- /.box-header --><div class="box-body"><uib-accordion close-others="true"><div uib-accordion-group class="panel-default" panel-class="panel-toolbar" heading="{{group.title}}" is-open="group.open" is-disabled="group.disabled" ng-repeat="group in toolbar.groups" ng-init="groupIndex = $index"><ul class="toolbar-list list-group no-margin-bottom"><li class="toolbar-component padding-bottom no-padding-top" ng-repeat="component in group.components"><div class="box-toolbar" dnd-draggable="component" dnd-type="component.componentType" dnd-effect-allowed="copy" ng-include="\'forms/toolbar/components/component.html\'"></div></li></ul></div></uib-accordion></div><!-- /.box-body --></div><!-- /.box -->');
$templateCache.put('forms/viewer/viewer.html','<div class="{{cssClass}}"><div class="form-header with-border"><h3 class="box-title" ng-hide="schema.hideLabel" ng-bind-html="schema.label"></h3></div><!-- /.box-header --><!-- form start --><div ng-if="schema.layout.length !== 0"><div class="box-body padding-top"><div ng-repeat="section in schema.layout"><h4 ng-bind-html="section.title" ng-hide="hideTitle(section)"></h4><div class="{{row.cssClass}}" ng-repeat="row in section.rows"><div class="{{col.cssClass}}" ng-repeat="col in row.cols"><div class="" ng-repeat="field in col.fields"><div ng-if="field"><div class="form-group" ng-class="{\'has-error\': {{schema.name}}.{{field.name}}.$invalid}"><label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)">{{field.label}}&nbsp;</label><!--ng-if="field.value"--><ng-include src="getFormViewerTemplate(field.type)"></ng-include></div></div></div></div></div></div></div><!--<div class="box-footer" ng-show="schema.handleSubmit">--><!--<button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="clear()">--><!--<span class="fa fa-trash-o"></span>&nbsp;<span>Clear</span>--><!--</button>--><!--<button type="submit" ng-disabled="{{schema.name}}.$invalid" class="btn btn-primary">--><!--<span class="fa fa-save"></span>&nbsp;<span>Save</span>--><!--</button>--><!--</div>--></div></div>');
$templateCache.put('reports/directives/checklist.html','<style>#checkbox-list {\n        display: block;\n    }\n\n    #checkbox-list-container {\n        height: {{height}}px;\n        overflow-y: scroll;\n    }</style><div id="checkbox-list-component"><label>{{label}}</label><div style="display: block"><input type="checkbox" ng-click="toggleAll()" ng-model="allSelected">Select all</div><hr style="margin-top: -2px; margin-bottom: 5px"><div id="checkbox-list-container"><label id="checkbox-list" ng-repeat="element in list"><input type="checkbox" ng-model="element.selected" ng-change="toggleOne(element)">{{element.text}}</label></div></div>');
$templateCache.put('reports/tpl/one-col.tpl.html','<div ng-repeat="param in vm.report.params"><ods-param param="param"></ods-param></div>');
$templateCache.put('reports/tpl/two-col.tpl.html','<div class="row" ng-repeat="(indexp, param) in vm.report.params" ng-if="$index % 2 == 0"><div class="col-lg-6"><ods-param param="vm.report.params[$index]"></ods-param></div><div class="col-lg-6" ng-if="$index + 1 < vm.report.params.length"><ods-param param="vm.report.params[$index + 1]"></ods-param></div></div>');
$templateCache.put('reports/tpl/two-col.tpl1.html','<div class="row" ng-repeat="(indexp, param) in vm.report.params" ng-if="$index % 2 == 0"><div class="col-lg-6"><div class="form-group" ng-switch="param.type" ng-class="{\'has-error\': paramsForm.{{param.name}}.$invalid}"><label class="control-label" for="{{param.name}}" ng-hide="vm.hideTitle(param)">{{param.title}}</label><input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-when="NUMBER" type="number"> <input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-when="TEXT"><div class="input-group" ng-switch-when="DATE" ng-hide="vm.hideParam(param)"><input id="{{param.name}}" class="form-control" name="{{param.name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="vm.getRequired(param)" ng-model="param.value" is-open="param.datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.openCalendar($index)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-switch-when="SINGLE_SELECT" ng-hide="vm.hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" ng-model="param.value" ui-select-required="vm.getRequired(param)" close-on-select="true" title="{{param.title}}"><ui-select-match placeholder="{{param.placeholder}}">{{vm.getSelectTitleField(param, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search | limitTo: 500"><div ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div><select class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-switch-when="LIST" ng-model="param.value" ng-options="item.id as item.name for item in param.list" ng-required="vm.getRequired(param)"></select><div ng-switch-when="MULTI_SELECT" ng-hide="vm.hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" multiple="multiple" ng-model="param.value" close-on-select="false" title="{{param.title}}" ui-select-required="vm.getRequired(param)"><ui-select-match placeholder="{{param.placeholder}}">{{vm.getSelectTitleField(param, $item)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search">{{vm.getSelectTitleField(param, element)}}</ui-select-choices></ui-select></div><div ng-switch-when="TABLE_SELECT" ng-hide="vm.hideParam(param)"><div class="navbar-form navbar-right"><div class="text-right"><div class="has-feedback input-group-sm"><input class="form-control" ng-model="param.searchQuery" id="searchQueryrpt-metadata" placeholder="{{param.placeholder}}" ng-change="vm.search($index)"> <span class="glyphicon glyphicon-search form-control-feedback"></span></div></div></div><br><br><table datatable="" dt-options="vm.getDtOptions(param, $index)" dt-columns="vm.getDtColumns(param, $index)" dt-instance="param.dtInstance" class="table table-striped table-bordered table-condensed"></table></div><div ng-switch-when="DRAG_AND_DROP" ng-hide="vm.hideParam(param)"><div class="row"><div class="col-md-6"><label class="control-label">Items Sections</label><br><div class="report-sections"><ul dnd-list="param.list"><li ng-repeat="item in param.list" dnd-draggable="item" dnd-moved="param.list.splice($index, 1)" dnd-effect-allowed="move">{{item.name}}</li><!--dnd-selected="vm.reportSectionsModels.selected = item"--></ul></div></div><div class="col-md-6"><label class="control-label">Items Selected</label><br><div class="report-selected-sections"><ul dnd-list="param.value"><li ng-repeat="item in param.value" dnd-draggable="item" dnd-moved="param.value.splice($index, 1)" dnd-effect-allowed="move">{{item.name}}</li><!--dnd-selected="vm.reportSectionsModels.selected = item"--></ul></div></div></div></div><input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-default><div ng-show="paramsForm.{{param.name}}.$invalid"><p class="help-block" ng-show="paramsForm.{{param.name}}.$error.required">This field is required.</p></div></div></div><div class="col-lg-6" ng-if="$index + 1 < vm.report.params.length"><div class="form-group" ng-switch="vm.report.params[$index + 1].type" ng-class="{\'has-error\': paramsForm.{{vm.report.params[$index + 1].name}}.$invalid}"><label class="control-label" for="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideTitle(vm.report.params[$index + 1])">{{vm.report.params[$index + 1].title}}</label><input class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-switch-when="NUMBER" type="number"> <input class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-switch-when="TEXT"><div class="input-group" ng-switch-when="DATE" ng-hide="vm.hideParam(vm.report.params[$index + 1])"><input id="{{vm.report.params[$index + 1].name}}" class="form-control" name="{{vm.report.params[$index + 1].name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" is-open="vm.report.params[$index + 1].datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.openCalendar($index + 1)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-switch-when="SINGLE_SELECT" ng-hide="vm.hideParam(vm.report.params[$index + 1])"><ui-select name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-model="vm.report.params[$index + 1].value" ui-select-required="vm.getRequired(vm.report.params[$index + 1])" close-on-select="true" title="{{vm.report.params[$index + 1].title}}"><ui-select-match placeholder="{{vm.report.params[$index + 1].placeholder}}">{{vm.getSelectTitleField(vm.report.params[$index + 1], $select.selected)}}</ui-select-match><ui-select-choices repeat="element in vm.report.params[$index + 1].list | filter:$select.search | limitTo: 500"><div ng-bind-html="vm.getSelectTitleField(vm.report.params[$index + 1], element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div><select class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-switch-when="LIST" ng-model="vm.report.params[$index + 1].value" ng-options="item.id as item.name for item in vm.report.params[$index + 1].list" ng-required="vm.getRequired(vm.report.params[$index + 1])"></select><div ng-switch-when="MULTI_SELECT" ng-hide="vm.hideParam(vm.report.params[indexp + 1])"><ui-select name="{{vm.report.params[indexp + 1].name}}" id="{{vm.report.params[indexp + 1].name}}" multiple="multiple" ng-model="vm.report.params[indexp + 1].value" close-on-select="false" title="{{vm.report.params[indexp + 1].title}}" ui-select-required="vm.getRequired(vm.report.params[indexp + 1])"><ui-select-match placeholder="{{vm.report.params[indexp + 1].placeholder}}">{{vm.getSelectTitleField(vm.report.params[indexp + 1], $item)}}</ui-select-match><ui-select-choices repeat="element in vm.report.params[indexp + 1].list | filter:$select.search">{{vm.getSelectTitleField(vm.report.params[indexp + 1], element)}}</ui-select-choices></ui-select></div><div ng-switch-when="TABLE_SELECT" ng-hide="vm.hideParam(vm.report.params[$index + 1])"><div class="navbar-form navbar-right"><div class="text-right"><div class="has-feedback input-group-sm"><input class="form-control" ng-model="vm.report.params[$index + 1].searchQuery" id="searchQueryrpt-metadata" placeholder="{{vm.report.params[$index + 1].placeholder}}" ng-change="vm.search($index)"> <span class="glyphicon glyphicon-search form-control-feedback"></span></div></div></div><br><br><table datatable="" dt-options="vm.getDtOptions(vm.report.params[$index + 1], $index)" dt-columns="vm.getDtColumns(vm.report.params[$index + 1], $index)" dt-instance="vm.report.params[$index + 1].dtInstance" class="table table-striped table-bordered table-condensed"></table></div><input class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-switch-default><div ng-show="paramsForm.{{vm.report.params[$index + 1].name}}.$invalid"><p class="help-block" ng-show="paramsForm.{{vm.report.params[$index + 1].name}}.$error.required">This field is required.</p></div></div></div></div>');
$templateCache.put('forms/common/model/model.html','<div class="jsonify padding"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" title="Copy the json data." ng-click="copy()"><span class="fa fa-clipboard"></span></button><!--<button class="btn btn-default btn-xs" type="button" title="Display hidden properties."--><!--ng-click="displayHidden = !displayHidden" ng-class="{ \'active\': displayHidden }"><span--><!--class="fa fa-eye"></span></button>--></div><pre class="{{cssClass}}">\n        <json-formatter open="1" json="model"></json-formatter>\n    </pre></div>');
$templateCache.put('forms/common/fields/checkbox-list.html','<br ng-if="field.inline"><div ng-class="field.inline === true ? \'checkbox-inline\' : \'checkbox\'" ng-repeat="option in field.options"><label><input type="checkbox" value="{{option.id}}" ng-model="field.value[option.id]" ng-model-options="{ debounce: 1000 }" ng-disabled="field.readonly"> {{option.name}}</label></div>');
$templateCache.put('forms/common/fields/checkbox.html','<div class="checkbox"><br ng-show="field.ln"><label><input ods-dynamic-name="getUniqueName(field)" id="{{getUniqueName(field)}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" type="{{field.type}}" placeholder="{{field.placeholder}}" ng-required="{{field.required}}" title="{{field.tooltip}}" ng-disabled="field.readonly"> <span class="ng-binding ng-scope">{{field.label}}</span></label></div>');
$templateCache.put('forms/common/fields/datetime.html','<div class="input-group"><input id="{{getUniqueName(field)}}" class="form-control" ods-dynamic-name="getUniqueName(field)" type="text" enable-time="field.enableTime" datetime-picker="{{field.format}}" ng-required="getRequired(field)" ng-model="field.value" is-open="field.open" model-options="field.modelOptions" ng-disabled="field.readonly" datepicker-append-to-body="true"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openCalendar(field)" ng-disabled="field.readonly"><i class="fa fa-calendar"></i></button></span></div>');
$templateCache.put('forms/common/fields/input.html','<input class="form-control" ods-dynamic-name="getUniqueName(field)" id="{{getUniqueName(field)}}" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" ng-required="getRequired(field)" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" ng-pattern="getPattern(field)" ng-readonly="field.readonly">');
$templateCache.put('forms/common/fields/label-empty.html','<!--This template is empty because form directive handle label component internally,\nbut in service must to specify a default template--><div class="{{field.cssClass}}"><span ng-bind-html="field.label"></span></div>');
$templateCache.put('forms/common/fields/multi-select.html','<ui-select name="{{getUniqueName(field)}}" id="{{getUniqueName(field)}}" multiple="multiple" ng-model="field.value" ng-disabled="field.readonly" ui-select-required="getRequired(field)" close-on-select="true" title="{{field.title}}"><ui-select-match placeholder="{{field.placeholder}}">{{getSelectFieldTitleValue(field, $item)}}</ui-select-match><ui-select-choices repeat="element in field.options | filter:$select.search | limitTo: field.limitTo"><div ng-bind-html="getSelectFieldTitleValue(field, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select>');
$templateCache.put('forms/common/fields/no-field.html','<div><h4>Field error</h4><div style="padding: 5px;">Please fix this field: {{field.name}}, Type: {{field.type}}</div></div>');
$templateCache.put('forms/common/fields/radio-list.html','<br ng-if="field.inline"><div ng-class="field.inline === true ? \'radio-inline\' : \'radio\'" ng-repeat="option in field.options | limitTo: field.limitTo"><label><input type="radio" ng-value="option.value ? option.value : option.id" ng-model="field.value" ng-disabled="field.readonly"> {{option.name}}</label></div>');
$templateCache.put('forms/common/fields/select.html','<select class="form-control" ods-dynamic-name="getUniqueName(field)" id="{{getUniqueName(field)}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" title="{{field.tooltip}}" ng-required="getRequired(field)" ng-disabled="field.readonly" ng-style="{\'background-color\': field.value.color ? field.value.color : \'#FFF\'}" ng-options="element as element.name for element in field.options | limitTo: field.limitTo track by element.value ? element.value : element.id"><option value="">{{field.placeholder}}</option><!--    <option ng-repeat="option in field.options | limitTo: field.limitTo track by option.id"--><!--            ng-selected="field.value == option">{{option.name}}</option>--></select>');
$templateCache.put('forms/common/fields/select2.html','<ui-select ods-dynamic-name="getUniqueName(field)" id="{{getUniqueName(field)}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" close-on-select="true" ng-disabled="field.readonly" ui-select-required="getRequired(field)" title="{{field.tooltip}}"><ui-select-match placeholder="{{field.placeholder}}">{{getSelectFieldTitleValue(field, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in field.options | filter:$select.search | limitTo: field.limitTo"><div ng-bind-html="getSelectFieldTitleValue(field, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select>');
$templateCache.put('forms/common/fields/textarea.html','<textarea autoheight class="form-control" ods-dynamic-name="getUniqueName(field)" id="{{getUniqueName(field)}}" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" ng-required="getRequired(field)" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" rows="{{field.rows}}" data-resize="disabled" ng-readonly="field.readonly">\n</textarea>');
$templateCache.put('forms/common/fields/toggle.html','<br ng-if="field.ln"><toggle name="{{getUniqueName(field)}}" id="{{getUniqueName(field)}}" on="{{field.on}}" off="{{field.off}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" ng-disabled="field.readonly"></toggle>');
$templateCache.put('forms/common/viewer/checkbox-list.html','<div><div class="" ng-repeat="option in getFieldChecklistFromValues(field, field.value)" ng-class="{\'checkbox-inline\' : field.inline, \'checkbox\' : !field.inline}"><i class="fa fa-check-square-o"></i> <span class="form-check-label" ng-bind-html="option"></span></div></div>');
$templateCache.put('forms/common/viewer/checkbox.html','<div><br ng-show="field.ln"><div class="form-check"><i class="form-check-input fa fa-square-o" ng-if="!field.value"></i> <i class="form-check-input fa fa-check-square-o" ng-if="field.value"></i> <span class="form-check-label" ng-bind-html="field.label"></span></div></div>');
$templateCache.put('forms/common/viewer/datetime.html','<div ng-bind-html="dateTimeRender(field)"></div>');
$templateCache.put('forms/common/viewer/input.html','<div ng-bind-html="field.value" style="white-space:pre-wrap;"></div>');
$templateCache.put('forms/common/viewer/multi-select.html','<div><div class="checkbox-inline" ng-repeat="option in getFieldTextsFromValues(field)"><i class="fa fa-check-square-o"></i> <span class="form-check-label" ng-bind-html="option"></span></div></div>');
$templateCache.put('forms/common/viewer/no-template.html','<div><h4>Template error</h4><div style="padding: 5px;">Template not found with type: {{field.type}}</div></div>');
$templateCache.put('forms/common/viewer/radio-list.html','<div><div class="form-check" ng-if="getRadioTextFromValue(field)"><i class="form-check-input fa fa-check-square-o"></i> <span class="form-check-label" ng-bind-html="getRadioTextFromValue(field)"></span></div></div>');
$templateCache.put('forms/common/viewer/select.html','<div><div class="form-check" ng-if="getSelectTextFromValue(field)"><i class="form-check-input fa fa-check-square-o"></i> <span class="form-check-label" ng-bind-html="getSelectTextFromValue(field)"></span></div></div>');
$templateCache.put('forms/common/viewer/toggle.html','<div ng-bind-html="field.value ? field.on : field.off"></div><!--<br ng-if="field.ln">--><!--<toggle name="{{field.name}}" id="{{field.name}}" on="{{field.on}}" off="{{field.off}}"--><!--ng-model="field.value"></toggle>-->');
$templateCache.put('forms/schema/components/input.html','<div ng-include="\'forms/schema/components/label.html\'"></div><input class="form-control" name="{{field.name}}-dev" id="{{field.name}}-dev" ng-model="field.value" ng-model-options="{ debounce: 1000 }" type="{{field.type}}" placeholder="{{field.placeholder}}" ng-required="{{field.required}}" title="{{field.tooltip}}" ng-readonly="field.readonly">');
$templateCache.put('forms/schema/components/label.html','<label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)" ng-bind-html="field.label"></label>');
$templateCache.put('forms/schema/components/no-field-properties.html','<div><h4>Field properties error</h4><div style="padding: 5px;">Field properties template not found, please fix the path, type: {{field.type}}</div></div>');
$templateCache.put('forms/schema/components/no-field.html','<div><h4>Field error</h4><div style="padding: 5px;">Schema template not found, please fix the path, type: {{field.type}}</div></div>');
$templateCache.put('forms/toolbar/components/checkbox-list.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="checkbox" ng-repeat="option in component.options"><label><input type="checkbox" value="{{option.id}}"> {{option.name}}</label></div>');
$templateCache.put('forms/toolbar/components/checkbox.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="checkbox"><label><input type="checkbox" value=""> Option</label></div>');
$templateCache.put('forms/toolbar/components/ckeditor.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><img width="100%" src="data:image/png;base64,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"><!--<textarea id="{{component.name}}" name="{{component.name}}" ng-model="content" ck="ck" options="options"--><!--ods-ckeditor></textarea>-->');
$templateCache.put('forms/toolbar/components/component.html','<div class="" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-xs btn-primary" type="button" title="Add this field."><span class="fa fa-hand-pointer-o"></span></button> <button class="btn btn-xs btn-danger" type="button" title="Delete from Clipboard." ng-if="group.allowDelete" ng-click="removeFromClipboard($index)"><span class="fa fa-trash"></span></button></div></div><div class="box-body"><div ng-include="getToolbarComponent(component)"></div></div></div>');
$templateCache.put('forms/toolbar/components/datetime.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="input-group input-group-sm"><input id="{{component.name}}" type="text" class="form-control" name="{{component.name}}" ng-required="getRequired(field)" datetime-picker="{{field.format}}" ng-model="field.value" is-open="field.open" ng-disabled="true"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click=""><i class="fa fa-calendar"></i></button></span></div>');
$templateCache.put('forms/toolbar/components/input.html','<form><div ng-include="\'forms/toolbar/components/label.html\'"></div><input class="form-control" type="{{component.type}}" name="{{component.name}}" id="{{component.name}}"></form>');
$templateCache.put('forms/toolbar/components/label.html','<label class="control-label" for="{{component.name}}">{{component.label}}</label>');
$templateCache.put('forms/toolbar/components/multi-select.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><select name="{{component.name}}" id="{{component.name}}" class="form-control"><option value="1">Option 1, 2, 3...</option></select>');
$templateCache.put('forms/toolbar/components/no-component.html','<div><h3>Component error</h3><div style="padding: 5px;">Component template not found, please fix the path, type: {{component.componentType}}</div></div>');
$templateCache.put('forms/toolbar/components/radio-list.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="radio" ng-repeat="option in component.options"><label><input type="{{component.type}}" value="{{option.id}}"> {{option.name}}</label></div>');
$templateCache.put('forms/toolbar/components/section.html','<div class=""><h3>Section Component</h3><!--<div style="padding: 5px;">This add a Section</div>--></div>');
$templateCache.put('forms/toolbar/components/select.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><select name="{{component.name}}" id="{{component.name}}" class="form-control"><option value="1">Option 1...</option></select>');
$templateCache.put('forms/toolbar/components/textarea.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><textarea class="form-control" name="{{component.name}}" id="{{component.name}}" rows="{{component.rows}}" placeholder="{{component.placeholder}}">\n</textarea>');
$templateCache.put('forms/toolbar/components/toggle.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><br ng-if="component.ln"><toggle name="{{component.name}}" id="{{component.name}}" on="{{component.on}}" off="{{component.off}}" ng-model="component.value"></toggle>');
$templateCache.put('forms/toolbar/plugins/canvas-painter.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div><h3>Canvas Painter Plugin</h3></div>');
$templateCache.put('forms/toolbar/plugins/grid-render.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><table class="table table-bordered table-responsive" id="{{component.name}}"><tbody><tr><td ng-repeat="column in component.descriptor.header">{{ column }}</td></tr></tbody></table>');
$templateCache.put('forms/toolbar/plugins/if-yes-checkbox.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-4"><br ng-if="component.ln"><toggle name="{{component.name}}" id="{{component.name}}" on="{{component.on}}" off="{{component.off}}" ng-model="component.value"></toggle></div><div class="col-lg-8"><div class="checkbox"><label><input type="checkbox" value=""> Option</label></div></div></div>');
$templateCache.put('forms/toolbar/plugins/if-yes-radio.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-3"><br ng-if="component.ln"><label class="radio-inline"><input type="radio" name="{{component.name}}" id="{{component.name}}"> Yes</label><label class="radio-inline"><input type="radio" name="{{component.name}}" id="{{component.name}}"> No</label></div><div class="col-lg-9"><input class="form-control" name="{{component.name}}" id="{{component.name}}"></div></div>');
$templateCache.put('forms/toolbar/plugins/if-yes.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-2"><br ng-if="component.ln"><toggle name="{{component.name}}" id="{{component.name}}" on="{{component.on}}" off="{{component.off}}" ng-model="component.value"></toggle></div><div class="col-lg-10"><input class="form-control" name="{{component.name}}" id="{{component.name}}"></div></div>');
$templateCache.put('forms/toolbar/plugins/options-textarea.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-2"><div class="checkbox"><label><input type="checkbox" value=""></label></div></div><div class="col-lg-10"><input class="form-control" name="{{component.name}}" id="{{component.name}}"></div></div>');
$templateCache.put('forms/toolbar/plugins/table.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><table class="table table-bordered table-responsive" id="{{component.name}}"><!--<thead>--><!--<tr>--><!--<td>#</td>--><!--<td ng-repeat="column in component.columns">{{column.title}}</td>--><!--</tr>--><!--</thead>--><tbody><tr ng-repeat="row in component.matrix"><td ng-repeat="col in row">{{col.name}}</td></tr></tbody></table>');
$templateCache.put('forms/common/fields/plugins/ckeditor.html','<div ng-if="field.printView" ng-bind-html="valueSubtitutor(field)"></div><div ng-if="!field.printView" class="position-relative"><textarea id="{{getUniqueName(field)}}" name="{{getUniqueName(field)}}" placeholder="{{field.placeholder}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" title="{{field.tooltip}}" options="field.options" ods-ckeditor ng-disabled="field.readonly"></textarea></div>');
$templateCache.put('forms/common/fields/plugins/grid-render.html','<div class="table-responsive position-relative"><table class="{{field.cssClass}}" id="{{getUniqueName(field)}}"><thead><tr><th ng-repeat="col in field.descriptor.header" scope="col">{{ col }}</th><th ng-show="field.manageRows" scope="col">Actions</th></tr></thead><tbody><tr ng-repeat="row in field.descriptor.data"><td ng-repeat="col in row" class="table-td {{col.cssClass}}" width="{{col.width}}" style="min-width: 100px">{{ col }}</td><td ng-show="field.manageRows" width="20px"><button type="button" title="Remove row" class="btn btn-danger pull-right" ng-click="removeRow(field.descriptor.data, $index)"><span class="fa fa-trash"></span></button></td></tr></tbody></table></div>');
$templateCache.put('forms/common/fields/plugins/if-yes-checkbox.html','<br ng-if="field.ln"><toggle name="{{getUniqueName(field)}}-toogle" id="{{getUniqueName(field)}}-toogle" on="{{field.on}}" off="{{field.off}}" ng-model="field.value.toggle" ng-disabled="field.readonly"></toggle><br><br><div ng-class="field.inline === true ? \'checkbox-inline\' : \'checkbox\'" ng-repeat="option in field.options" ng-show="field.value.toggle"><label><input type="checkbox" value="{{option.id}}" ng-model="field.value.checkbox[option.id]" ng-disabled="field.readonly"> {{option.name}}</label></div>');
$templateCache.put('forms/common/fields/plugins/if-yes-radio.html','<br ng-if="field.ln"><label class="radio-inline"><input type="radio" name="{{getUniqueName(field)}}-radio" id="{{getUniqueName(field)}}-radio" ng-value="true" ng-model="field.value.toggle" ng-disabled="field.readonly"> {{field.on}}</label><label class="radio-inline"><input type="radio" name="{{getUniqueName(field)}}-radio" id="{{getUniqueName(field)}}-radio" ng-value="false" ng-model="field.value.toggle" ng-disabled="field.readonly"> {{field.off}}</label><textarea class="form-control" name="{{getUniqueName(field)}}-text" id="{{getUniqueName(field)}}-text" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" style="margin-top: 10px;" ng-model="field.value.textarea" ng-model-options="{ debounce: 1000 }" ng-required="field.value.toggle" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" rows="{{field.rows}}" ng-show="field.value.toggle" ng-disabled="field.readonly"></textarea>');
$templateCache.put('forms/common/fields/plugins/if-yes.html','<br ng-if="field.ln"><toggle name="{{getUniqueName(field)}}-toogle" id="{{getUniqueName(field)}}-toogle" on="{{field.on}}" off="{{field.off}}" ng-model="field.value.toggle" ng-disabled="field.readonly"></toggle><textarea class="form-control" name="{{getUniqueName(field)}}-text" id="{{getUniqueName(field)}}-text" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" style="margin-top: 10px;" ng-model="field.value.textarea" ng-model-options="{ debounce: 1000 }" ng-required="field.value.toggle" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" rows="{{field.rows}}" ng-show="field.value.toggle" ng-disabled="field.readonly"></textarea>');
$templateCache.put('forms/common/fields/plugins/table.html','<div class="table-responsive position-relative"><table class="{{field.cssClass}}" id="{{getUniqueName(field)}}"><tbody><tr ng-repeat="row in field.matrix"><td ng-repeat="col in row" class="table-td {{col.cssClass}}" width="{{col.width}}" style="min-width: 100px"><div ng-repeat="field in col.fields"><ng-include src="getFormFieldTemplate(field.type)"></ng-include></div></td><td ng-show="field.manageRows" width="20px"><button type="button" ng-click="removeRow(field.matrix, $index)" title="Remove row" ng-show="field.manageRows && !(field.manageRows && $index === 0)" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.manageColumns"><td ng-repeat="col in field.matrix[0]"><button type="button" ng-click="removeColumn(field, $index)" title="Remove column" ng-hide="field.colHeader && $index === 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.totals"><td ng-repeat="col in field.matrix[0]"><div ng-show="col.total" class="pull-right"><ods-table-total field="field" col-index="$index" label="col.totalLabel"></ods-table-total></div></td></tr></tbody></table></div><div class="btn-edit position-relative" ng-show="field.canCloneRow"><button type="button" class="btn btn-primary pull-right" ng-click="cloneRow(field)">Clone row</button></div>');
$templateCache.put('forms/common/viewer/plugins/canvas-painter.html','<figure class="figure"><img id="ods-canvas-paint-viewer-result" src="{{ field.value }}" width="field.width" height="field.height"></figure>');
$templateCache.put('forms/common/viewer/plugins/ckeditor.html','<div ng-bind-html="valueSubtitutor(field)"></div>');
$templateCache.put('forms/common/viewer/plugins/grid-render.html','<div class="table-responsive position-relative"><table class="{{field.cssClass}}" id="{{field.name}}"><thead><tr><th ng-repeat="col in field.descriptor.header" scope="col">{{ col }}</th></tr></thead><tbody><tr ng-repeat="row in field.descriptor.data"><td ng-repeat="col in row" class="table-td {{col.cssClass}}" width="{{col.width}}" style="min-width: 100px">{{ col }}</td></tr></tbody></table></div>');
$templateCache.put('forms/common/viewer/plugins/if-yes-checkbox.html','<!--<br ng-if="field.ln">--><div ng-bind-html="field.value.toggle ? field.on : field.off"></div><div ng-if="field.value.toggle"><div class="" ng-repeat="option in getFieldChecklistFromValues(field, field.value.checkbox)" ng-class="{\'checkbox-inline\' : field.inline, \'checkbox\' : !field.inline}"><i class="fa fa-check-square-o"></i> <span class="form-check-label" ng-bind-html="option"></span></div></div>');
$templateCache.put('forms/common/viewer/plugins/if-yes-radio.html','<!--<br ng-if="field.ln">--><div ng-bind-html="field.value.toggle ? field.on : field.off"></div><div ng-bind-html="field.value.textarea" ng-if="field.value.toggle"></div>');
$templateCache.put('forms/common/viewer/plugins/if-yes.html','<!--<br ng-if="field.ln">--><div ng-bind-html="field.value.toggle ? field.on : field.off"></div><div ng-bind-html="field.value.textarea" ng-if="field.value.toggle"></div>');
$templateCache.put('forms/common/viewer/plugins/options-textarea.html','<div ng-bind-html="field.value" style="white-space:pre-wrap;"></div>');
$templateCache.put('forms/common/viewer/plugins/table.html','<div class="table-responsive position-relative"><table class="{{field.cssClass}}" id="{{field.name}}"><tbody><tr ng-repeat="row in field.matrix"><td ng-repeat="col in row" class="table-td {{col.cssClass}}" width="{{col.width}}"><div class="col-lg-12" ng-repeat="field in col.fields"><ng-include src="getFormViewerTemplate(field.type)"></ng-include></div></td><td ng-show="field.manageRows" width="20px"><button type="button" ng-click="removeRow(field.matrix, $index)" title="Remove row" ng-show="field.rowHeader && $index != 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.manageColumns"><td ng-repeat="col in field.matrix[0]"><button type="button" ng-click="removeColumn(field, $index)" title="Remove column" ng-hide="field.colHeader && $index === 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.totals"><td ng-repeat="col in field.matrix[0]"><div ng-show="col.total" class="pull-right"><ods-table-total field="field" col-index="$index" label="col.totalLabel"></ods-table-total></div></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/components/checkbox/checkbox-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/tooltip-properties.html\'"></div><div ng-include="\'forms/schema/components/checkbox/ln-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><!--<uib-tab index="1" heading="Validation">--><!--<form name="fieldValidationForm" class="form-horizontal">--><!--<div class="box-body padding-top">--><!--<div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div>--><!--</div>--><!--</form>--><!--</uib-tab>--><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/checkbox/checkbox.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/checkbox.html\'"></div>');
$templateCache.put('forms/schema/components/checkbox/ln-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.ln.$invalid}"><label for="ln" class="col-sm-4 control-label" title="Print a new line between label and field.">New line:</label><div class="col-sm-8"><input type="checkbox" id="ln" name="ln" ng-model="field.ln" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/common-properties.html','<div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/exportable-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/linkedTo-properties.html\'"></div>');
$templateCache.put('forms/schema/components/base-properties/exportable-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-exportable.$invalid}"><label for="{{field.name}}-exportable" class="col-sm-4 control-label" title="Indicates if a value is required for this field.">Exportable:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-exportable" name="{{field.name}}-exportable" ng-model="field.exportable" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/inline-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.inline.$invalid}"><label for="{{field.name}}-inline" class="col-sm-4 control-label" title="Indicates if will show inline or not.">Inline:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-inline" name="{{field.name}}-inline" ng-model="field.inline"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/label-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-label.$invalid}"><label for="{{field.name}}-label" class="col-sm-4 control-label">Label:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-label" name="{{field.name}}-label" placeholder="Label..." ng-model="field.label" ng-required="false"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-hideLabel.$invalid}"><label for="{{field.name}}-hideLabel" class="col-sm-4 control-label" title="Indicates if will show label or not.">Hide Label:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-hideLabel" name="{{field.name}}-hideLabel" ng-model="field.hideLabel"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/linkedTo-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-linkedTo.$invalid}"><label for="{{field.name}}-linkedTo" class="col-sm-4 control-label">Linked to:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-linkedTo" name="{{field.name}}-linkedTo" placeholder="Linked to..." ng-model="field.linkedTo" ng-required="true"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/maxlength-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-maxLength.$invalid}"><label for="{{field.name}}-maxLength" class="col-sm-4 control-label">Max Length:</label><div class="col-sm-8"><input type="number" class="form-control" id="{{field.name}}-maxLength" name="{{field.name}}-maxLength" placeholder="Max Length..." ng-model="field.validation.maxlength" ng-required="false" ng-change="onChangeMaxLength()"></div></div></div><div class="row no-vertical-margin" ng-show="field.validation.maxlength"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-minLengthMessage.$invalid}"><label for="{{field.name}}-maxLengthMessage" class="col-sm-4 control-label">Message</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-maxLengthMessage" name="{{field.name}}-maxLengthMessage" placeholder="Max length message..." ng-model="field.validation.messages.maxlength" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/minlength-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.minLength.$invalid}"><label for="{{field.name}}-minLength" class="col-sm-4 control-label">Min Length:</label><div class="col-sm-8"><input type="number" class="form-control" id="{{field.name}}-minLength" name="{{field.name}}-minLength" placeholder="Min Length..." ng-model="field.validation.minlength" ng-required="false" ng-change="onChangeMinLength()"></div></div></div><div class="row no-vertical-margin" ng-show="field.validation.minlength"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-minLengthMessage.$invalid}"><label for="{{field.name}}-minLengthMessage" class="col-sm-4 control-label">Message</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-minLengthMessage" name="{{field.name}}-minLengthMessage" placeholder="Min length message..." ng-model="field.validation.messages.minlength" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/model-properties.html','<ods-model model="field" css-class="fixed-height"></ods-model>');
$templateCache.put('forms/schema/components/base-properties/name-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-name.$invalid}"><label for="{{field.name}}-name" class="col-sm-4 control-label">Name:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-name" name="{{field.name}}-name" placeholder="Name..." ng-model="field.name" ng-required="true"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/pattern-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-patternSelect.$invalid}"><label for="{{field.name}}-patternSelect" class="col-sm-4 control-label">Pattern Selection</label><div class="col-sm-8"><select name="{{field.name}}-patternSelect" id="{{field.name}}-patternSelect" ng-model="field.patternSelect" class="form-control" ng-change="onSelectPattern()"><option value="">Select Pattern...</option><option ng-repeat="option in patterns" value="{{option.value}}">{{option.title}}</option></select></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-pattern.$invalid}"><label for="{{field.name}}-pattern" class="col-sm-4 control-label">Pattern</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-pattern" name="{{field.name}}-pattern" ng-model="field.validation.pattern" ng-required="false" readonly="readonly"></div></div></div><div class="row no-vertical-margin" ng-show="field.patternSelect"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-patternMessage.$invalid}"><label for="{{field.name}}-patternMessage" class="col-sm-4 control-label">Message</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-patternMessage" name="{{field.name}}-patternMessage" placeholder="Pattern Message..." ng-model="field.validation.messages.pattern" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/placeholder-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-placeholder.$invalid}"><label for="{{field.name}}-placeholder" class="col-sm-4 control-label">Placeholder:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-placeholder" name="{{field.name}}-placeholder" placeholder="Placeholder..." ng-model="field.placeholder" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/readonly-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-readonly.$invalid}"><label for="{{field.name}}-readonly" class="col-sm-4 control-label" title="Indicates if is readonly this field.">Readonly:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-readonly" name="{{field.name}}-readonly" ng-model="field.readonly" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/required-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-required.$invalid}"><label for="{{field.name}}-required" class="col-sm-4 control-label" title="Indicates if a value is required for this field.">Required:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-required" name="{{field.name}}-required" ng-model="field.validation.required" class="ng-pristine ng-valid" ng-change="onChangeRequired()"></div></div></div><div class="row no-vertical-margin" ng-show="field.validation.required"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.{{field.name}}-requiredMessage.$invalid}"><label for="{{field.name}}-requiredMessage" class="col-sm-4 control-label">Required Message</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-requiredMessage" name="{{field.name}}-requiredMessage" placeholder="Required Message..." ng-model="field.validation.messages.required" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/text-properties.html','<div ng-include="\'forms/schema/components/base-properties/placeholder-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/tooltip-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div>');
$templateCache.put('forms/schema/components/base-properties/tooltip-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-tooltip.$invalid}"><label for="{{field.name}}-tooltip" class="col-sm-4 control-label">Tooltip:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-tooltip" name="{{field.name}}-tooltip" placeholder="Tooltip..." ng-model="field.tooltip" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/value-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-value.$invalid}"><label for="{{field.name}}-value" class="col-sm-4 control-label">Value:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-value" name="{{field.name}}-value" placeholder="Value..." ng-model="field.value" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/datetime/datetime-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.formatSelector.$invalid}"><label for="formatSelector" class="col-sm-4 control-label">Format</label><div class="col-sm-8"><select name="formatSelector" id="formatSelector" ng-model="field.selectedFormat" class="form-control" ng-change="onSelectFormat(field.selectedFormat)"><option value="">Select format...</option><option ng-repeat="format in formats" value="{{format.value}}">{{format.option}}</option></select></div></div></div><div class="row no-vertical-margin" ng-show="showCustomFormat"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.format.$invalid}"><label for="format" class="col-sm-4 control-label">Custom Format</label><div class="col-sm-8"><input type="text" class="form-control" id="format" name="format" ng-model="field.format" ng-required="false" ng-value="selectedFormat"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.enableTime.$invalid}"><label for="enableTime" class="col-sm-4 control-label" title="Indicates if component time is enabled for this field.">Time enable:</label><div class="col-sm-8"><input type="checkbox" id="enableTime" name="enableTime" ng-model="field.enableTime" class="ng-pristine ng-valid"></div></div></div><!--<div class="row no-vertical-margin">--><!--<div class="form-group margin-bottom"--><!--ng-class="{\'has-error\': fieldPropertiesForm.utc.$invalid}">--><!--<label for="utc" class="col-sm-4 control-label"--><!--title="Indicates Time in UTC or not for this field.">UTC:</label>--><!--<div class="col-sm-8">--><!--<input type="checkbox" id="utc" name="utc" ng-model="field.utc"--><!--class="ng-pristine ng-valid" ng-change="onChangeUTCOption()">--><!--</div>--><!--</div>--><!--</div>--><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/datetime/datetime.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div class="input-group"><input id="{{getUniqueName(field)}}" ods-dynamic-name="getUniqueName(field)" class="form-control" type="text" enable-time="field.enableTime" datetime-picker="{{field.format}}" ng-required="getRequired(field)" ng-model="field.value" is-open="field.openInEditMode" model-options="field.modelOptions" ng-disabled="field.readonly" datepicker-append-to-body="true"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openCalendar(field)" ng-disabled="field.readonly"><i class="fa fa-calendar"></i></button></span></div>');
$templateCache.put('forms/schema/components/checkbox-list/checkbox-list-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.inline.$invalid}"><label for="{{field.name}}-inline" class="col-sm-4 control-label" title="Indicates if will show inline or not.">Inline:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-inline" name="{{field.name}}-inline" ng-model="field.inline"></div></div></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-checkboxlist-options field="field"></ods-field-checkboxlist-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/checkbox-list/checkbox-list.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/checkbox-list.html\'"></div>');
$templateCache.put('forms/schema/components/checkbox-list/checkboxlist-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="{{field.name}}-limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="{{field.name}}-limitTo" name="{{field.name}}-limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><div class="table-responsive" style="max-height: 250px"><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'has-error\': fieldOptionForm.$invalid }"><td><input type="checkbox" name="{{field.name}}Selected[]" ng-model="field.value[option.id]"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" ng-required="true"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/components/field/field-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="sectionPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.name.$invalid}"><label for="name" class="col-sm-2 control-label">Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="name" name="name" placeholder="Name..." ng-model="row.name" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.cssClass.$invalid}"><label for="cssClass" class="col-sm-2 control-label">Class Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="cssClass" name="cssClass" placeholder="Css Class..." ng-model="row.cssClass" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.cols.$invalid}"><label for="cols" class="col-sm-2 control-label">Cols:</label><div class="col-sm-4"><input type="number" class="form-control" id="cols" name="cols" placeholder="Cols..." ng-model="row.cols.length" ng-required="false" ng-disabled="true"></div><div class="col-lg-6"><!--<button type="button" class="btn btn-primary" ng-click="addRow()">Add row</button>--></div></div></div></div></form><div class="row no-vertical-margin"><div class="col-lg-6"><table ng-table="tableParams" class="table table-bordered table-hover table-condensed editable-table demoTable" ng-form="tableForm" disable-filter="isAdding"><colgroup><col width="50%"></colgroup><tr ng-repeat="row in $data" ng-form="rowForm"><td title="\'Class Name\'" ng-switch="row.isEditing" ng-form="cssClass" class="align-middle"><span ng-switch-default class="editable-text">{{row.cssClass}}</span><div class="controls" ng-switch-when="true"><input type="text" name="cssClass" ng-model="row.cssClass" class="editable-input form-control input-sm" required></div></td><td><button type="button" class="btn btn-primary btn-sm" ng-click="saveColumnEdited(row, rowForm)" ng-if="row.isEditing" ng-disabled="rowForm.$pristine || rowForm.$invalid"><span class="glyphicon glyphicon-ok"></span></button> <button type="button" class="btn btn-default btn-sm" ng-click="cancelColumnEdited(row, rowForm)" ng-if="row.isEditing"><span class="glyphicon glyphicon-remove"></span></button> <button type="button" class="btn btn-default btn-sm" ng-click="row.isEditing = true" ng-if="!row.isEditing"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn btn-danger btn-sm" ng-click="removeColumn($data, $index)" ng-if="!row.isEditing"><span class="glyphicon glyphicon-trash"></span></button></td></tr></table></div><div class="col-lg-6"><button type="button" class="btn btn-primary" ng-click="addColumn(row)">Add column</button></div></div></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div><!--<ods-model model="row" css-class="fixed-height"></ods-model>--></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/field/field.html','<div class="box-draggable" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" title="Copy component to Clipboard." ng-click="addToClipboard(field)"><span class="fa fa-clipboard"></span></button> <button class="btn btn-default btn-xs" type="button" ng-class="{ \'active\': field.showProperties }" ng-click="toggleFieldProperties(field)" title="Configure this field." uib-popover-template="\'forms/schema/components/field/properties.html\'" popover-append-to-body="true" popover-placement="auto bottom" popover-trigger="none" popover-title="Field config" popover-is-open="field.popoverProps"><span class="fa fa-wrench"></span></button><!--<button class="btn btn-default btn-xs" type="button"--><!--ng-show="field.popoverProps"--><!--title="Configure this field."--><!--uib-popover-template="\'forms/schema/components/field/properties.html\'"--><!--popover-append-to-body=\'true\' popover-placement=\'auto bottom\'--><!--popover-trigger="outsideClick" popover-title="Field config">--><!--<span class="fa fa-wrench"></span>--><!--</button>--><!--<button class="btn btn-default btn-xs" type="button"--><!--ng-click="swap(index - 1, index)"--><!--ng-disabled="index === 0" title="Move up">--><!--<span class="fa fa-arrow-left"></span>--><!--</button>--><!--<button class="btn btn-default btn-xs" type="button"--><!--ng-click="swap(index, index + 1)"--><!--ng-disabled="$index === schema.fields.length - 1" title="Move down">--><!--<span class="fa fa-arrow-right"></span>--><!--</button>--> <button class="btn btn-xs btn-danger" type="button" title="Remove" ng-click="removeField(index)"><span class="fa fa-trash"></span></button></div></div><div class="box-field-container padding"><div class="box-body no-padding"><div ng-include="getSchemaField(field)"></div></div></div><div class="box-properties-container" ng-class="{ visible: field.showProperties }"><div class="padding" ng-if="field.showProperties"><div ng-include="\'forms/schema/components/field/properties.html\'"></div></div></div></div>');
$templateCache.put('forms/schema/components/field/properties.html','<div ng-include="getSchemaFieldProperties(field)"></div>');
$templateCache.put('forms/schema/components/label/label-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-cssClass.$invalid}"><label for="{{field.name}}-cssClass" class="col-sm-2 control-label">Css class:</label><div class="col-sm-9"><input type="text" class="form-control" id="{{field.name}}-cssClass" name="{{field.name}}-cssClass" placeholder="Css class..." ng-model="field.cssClass" ng-required="false"></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/multi-select/multi-select-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="{{field.name}}-limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="{{field.name}}-limitTo" name="{{field.name}}-limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><div class="table-responsive" style="max-height: 250px"><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'has-error\': fieldOptionForm.$invalid }"><td><input type="checkbox" name="{{field.name}}Selected[]" ng-value="field.options[$index]" ng-checked="field.value.indexOf(field.options[$index]) > -1" ng-click="toggleSelection(field.options[$index])"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" ng-required="true"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/components/multi-select/multi-select-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-multi-select-options field="field"></ods-field-multi-select-options></div></form></uib-tab><uib-tab index="2" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/multi-select/multi-select.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/multi-select.html\'"></div>');
$templateCache.put('forms/schema/components/number/number-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/pattern-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/password/password-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/pattern-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/radio-list/radio-list-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.inline.$invalid}"><label for="inline" class="col-sm-4 control-label" title="Indicates if will show inline or not.">Inline:</label><div class="col-sm-8"><input type="checkbox" id="inline" name="inline" ng-model="field.inline"></div></div></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-radio-options field="field"></ods-field-radio-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/radio-list/radio-list.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/radio-list.html\'"></div>');
$templateCache.put('forms/schema/components/radio-list/radio-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="{{field.name}}-limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="{{field.name}}-limitTo" name="{{field.name}}-limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><div class="table-responsive" style="max-height: 250px"><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'has-error\': fieldOptionForm.$invalid }"><td><input type="radio" name="{{field.name}}Selected[]" ng-value="field.options[$index].value" ng-model="field.value"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" required="required"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/components/row/row-properties.html','<uib-tabset><uib-tab index="0" heading="Properties"><div class="pad form-horizontal"><div class="col-md-4 col-sm-4 col-xs-12"><div class="form-group" ng-class="{\'has-error\': rowPropertiesForm.{{name}}-rowName.$invalid}"><label for="{{name}}-rowName" class="col-sm-5 control-label">Name:</label><div class="col-sm-7"><input type="text" class="form-control" id="{{name}}-rowName" name="{{name}}-rowName" placeholder="Name..." ng-model="row.name" ng-required="true"></div></div><div class="form-group" ng-class="{\'has-error\': rowPropertiesForm.{{name}}-cssClass.$invalid}"><label for="{{name}}-cssClass" class="col-sm-5 control-label">Class Name:</label><div class="col-sm-7"><input type="text" class="form-control" id="{{name}}-cssClass" name="{{name}}-cssClass" placeholder="Css Class..." ng-model="row.cssClass" ng-required="true"></div></div><div class="form-group" ng-class="{\'has-error\': rowPropertiesForm.{{name}}-cols.$invalid}"><label for="{{name}}-cols" class="col-sm-5 control-label">Cols:</label><div class="col-sm-7"><input type="number" class="form-control" id="{{name}}-cols" name="{{name}}-cols" placeholder="Cols..." ng-model="row.cols.length" ng-required="false" ng-disabled="true"></div></div></div><div class="col-md-8 col-sm-8 col-xs-12"><div class="table-responsive" style="max-height: 200px"><table class="table table-condensed table-striped"><thead><tr><th>Columns #</th><th>CSS class</th><th width="20px">Width</th><th>Actions</th></tr></thead><tbody><tr ng-repeat="col in row.cols"><td>{{$index + 1}}</td><td><input type="text" name="cssClass" ng-model="col.cssClass" class="form-control input-sm" required readonly="readonly"></td><td><input type="number" name="width" class="form-control input-sm" max="12" min="1" ng-model="col.width" ng-change="onChangeColWith(col)"></td><td><button type="button" class="btn btn-danger btn-sm" ng-click="removeColumn($index)" ng-if="!row.isEditing"><span class="glyphicon glyphicon-trash"></span></button></td></tr><tr><td></td><td></td><td><button type="button" class="btn btn-primary" ng-click="addColumn(row)">Add column</button></td></tr></tbody></table></div></div></div></uib-tab><uib-tab index="1" heading="Debug" ng-show="debugMode"><ods-model model="row" css-class="fixed-height"></ods-model></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/row/row.html','<div class="box-draggable" ng-class="{ \'error\': row.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" ng-disabled="section.showProperties && section.invalid" ng-class="{ \'active\': section.showProperties }" title="Configure this Section." ng-click="toggleRowProperties(row)"><span class="fa fa-wrench"></span></button> <button class="btn btn-xs btn-danger" type="button" title="Remove" ng-click="removeRow(index)"><span class="fa fa-trash"></span></button></div></div><div class="box-field-container padding"><div class="box-body no-padding"><div class="box-row {{col.cssClass}}" ng-repeat="col in row.cols"><ul dnd-list="col.fields" dnd-disable-if="col.fields.length >= 1" dnd-drop="dropCallback(index, item, external, type)" dnd-allowed-types="col.allowedTypes" dnd-inserted="onAdd(item, type)"><li class="box-field" ng-repeat="field in col.fields" dnd-draggable="field" dnd-type="field.componentType" dnd-effect-allowed="move" dnd-selected="models.selected = field" dnd-moved="col.fields.splice($index, 1)" ng-class="{selected: models.selected === col.fields}"><ods-field row="row" col="col" config="config" index="$index" field="field" debug-mode="debugMode"></ods-field></li></ul></div></div><!-- /.box-body --></div><div class="box-properties-container" ng-class="{ visible: row.showProperties }"><div class="pad no-padding-top"><div ng-include="\'forms/schema/components/row/row-properties.html\'"></div></div></div></div>');
$templateCache.put('forms/schema/components/section/section-properties.html','<uib-tabset><uib-tab index="0" heading="Properties"><div class="pad form-horizontal"><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.{{name}}-sectionName.$invalid}"><label for="{{name}}-sectionName" class="col-sm-2 control-label">Name:</label><div class="col-sm-10"><input type="text" class="form-control" id="{{name}}-sectionName" name="{{name}}-sectionName" placeholder="Name..." ng-model="section.name" ng-required="true"></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.{{name}}-title.$invalid}"><label for="{{name}}-title" class="col-sm-2 control-label">Title:</label><div class="col-sm-10"><input type="text" class="form-control" id="{{name}}-title" name="{{name}}-title" placeholder="Title..." ng-model="section.title" ng-required="false"></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.{{name}}-rows.$invalid}"><label for="{{name}}-rows" class="col-sm-2 control-label">Rows:</label><div class="col-sm-3"><input type="number" class="form-control" id="{{name}}-rows" name="{{name}}-rows" placeholder="Rows..." ng-model="section.rows.length" ng-required="false" ng-disabled="true"></div><div class="col-lg-4"><button type="button" class="btn btn-primary" ng-click="addRow()">Add row</button></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.{{name}}-hideLabel.$invalid}"><label for="{{name}}-hideLabel" class="col-sm-2 control-label" title="Indicates if will show title or not.">Hide Title:</label><div class="col-sm-10"><input type="checkbox" id="{{name}}-hideLabel" name="{{name}}-hideLabel" ng-model="section.hideLabel"></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.{{name}}-canClone.$invalid}"><label for="{{name}}-canClone" class="control-label col-sm-2">Can be Cloned:</label><div class="col-sm-10"><input type="checkbox" id="{{name}}-canClone" name="{{name}}-canClone" ng-model="section.canClone"></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.{{name}}-clonedCanCloned.$invalid}"><label for="{{name}}-clonedCanCloned" class="control-label col-sm-2">Cloned can clone?</label><div class="col-sm-10"><input type="checkbox" id="{{name}}-clonedCanCloned" name="{{name}}-clonedCanCloned" ng-model="section.clonedCanCloned"></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.{{name}}-exportable.$invalid}"><label for="{{name}}-exportable" class="col-sm-2 control-label" title="Indicates if will show title or not.">Exportable:</label><div class="col-sm-10"><input type="checkbox" id="{{name}}-exportable" name="{{name}}-exportable" ng-model="section.exportable"></div></div></div></uib-tab><uib-tab index="1" heading="Debug" ng-show="debugMode"><ods-model model="section" css-class="fixed-height"></ods-model></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/section/section.html','<div class="box-draggable" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" ng-disabled="section.showProperties && section.invalid" ng-class="{ \'active\': section.showProperties }" ng-click="toggleProperties(section)" title="Configure this Section."><span class="fa fa-wrench"></span></button> <button class="btn btn-default btn-xs" type="button" ng-click="swap(index - 1, index)" ng-disabled="index === 0" title="Move up"><span class="fa fa-arrow-up"></span></button> <button class="btn btn-default btn-xs" type="button" ng-click="swap(index, index + 1)" title="Move down" ng-disabled="index === schema.layout.length - 1"><span class="fa fa-arrow-down"></span></button> <button class="btn btn-warning btn-xs" type="button" ng-click="clone()" title="Clone Section"><span class="fa fa-clone"></span></button> <button class="btn btn-xs btn-danger" type="button" ng-click="remove(index)" title="Remove"><span class="fa fa-trash"></span></button></div></div><div class="box-header with-border"><h4 class="box-title" ng-bind-html="section.title"></h4></div><div class="box-body"><ul dnd-list="section.rows" dnd-allowed-types="section.allowedTypes"><li class="{{row.cssClass}} padding-top" ng-repeat="row in section.rows" dnd-draggable="row" dnd-type="row.componentType" dnd-disable-if="row.componentType == undefined" dnd-effect-allowed="move" dnd-moved="section.rows.splice($index, 1)"><ods-row section="section" row="row" config="config" index="$index" debug-mode="debugMode"></ods-row></li></ul></div><div class="box-properties-container" ng-class="{ visible: section.showProperties }"><div class="pad no-padding-top"><div ng-include="\'forms/schema/components/section/section-properties.html\'"></div></div></div></div>');
$templateCache.put('forms/schema/components/select/select-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="{{field.name}}-limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="{{field.name}}-limitTo" name="{{field.name}}-limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><div class="table-responsive" style="max-height: 250px"><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in field.options" ng-class="{ \'has-error\': fieldOptionForm.$invalid }"><td><input type="radio" name="{{field.name}}Selected[]" ng-value="field.options[$index]" ng-model="field.value"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" ng-required="true"></td><td><input color-picker color-picker-model="option.color" color-picker-position="bottom" class="form-control" ng-required="true"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/components/select/select-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-select-options field="field"></ods-field-select-options></div></form></uib-tab><uib-tab index="2" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/select/select.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/select.html\'"></div>');
$templateCache.put('forms/schema/components/select2/select-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-select-options field="field"></ods-field-select-options></div></form></uib-tab><uib-tab index="2" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/select2/select2.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/select2.html\'"></div>');
$templateCache.put('forms/schema/components/text/text-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/pattern-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/minlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/maxlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/textarea/textarea-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/minlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/maxlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/textarea/textarea.html','<div ng-include="\'forms/schema/components/label.html\'"></div><textarea class="form-control" name="{{getUniqueName(field)}}" id="{{getUniqueName(field)}}" ng-required="{{field.required}}" title="{{field.tooltip}}" rows="{{field.rows}}" placeholder="{{field.placeholder}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" data-resize="disabled" ng-readonly="field.readonly">\n</textarea>');
$templateCache.put('forms/schema/components/toggle/ln-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.ln.$invalid}"><label for="ln" class="col-sm-4 control-label" title="Print a new line between label and field.">New line:</label><div class="col-sm-8"><input type="checkbox" id="ln" name="ln" ng-model="field.ln" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/toggle/toggle-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/toggle/toggle.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/toggle.html\'"></div>');
$templateCache.put('forms/schema/plugins/canvas-painter/container.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/canvas-painter/container.html\'"></div>');
$templateCache.put('forms/schema/plugins/ckeditor/ckeditor-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.locked.$invalid}"><label for="locked" class="col-sm-4 control-label" title="Indicates if suggestions are locked in this field.">Suggestions locked:</label><div class="col-sm-8"><input type="checkbox" id="locked" name="locked" ng-model="field.options.locked" class="ng-pristine ng-valid"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.printView.$invalid}"><label for="printView" class="col-sm-4 control-label" title="Indicates if CKEditor will show as print view.">Print View:</label><div class="col-sm-8"><input type="checkbox" id="printView" name="printView" ng-model="field.printView" class="ng-pristine ng-valid"></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.prefix.$invalid}"><label for="prefix" class="col-sm-2 control-label">Prefix:</label><div class="col-sm-2"><input type="text" class="form-control" id="prefix" name="prefix" placeholder="Prefix..." ng-model="field.options.prefix" ng-required="true"></div></div></div></div><div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.suffix.$invalid}"><label for="suffix" class="col-sm-2 control-label">Suffix:</label><div class="col-sm-2"><input type="text" class="form-control" id="suffix" name="suffix" placeholder="Suffix..." ng-model="field.options.suffix" ng-required="true"></div></div></div></div><ods-suggestion-options field="field" config="config" profile="dev"></ods-suggestion-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/ckeditor/ckeditor.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div class="position-relative"><textarea id="{{field.name + dev}}" name="{{field.name + dev}}" placeholder="{{field.placeholder}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" title="{{field.tooltip}}" options="field.options" ods-ckeditor ng-disabled="field.readonly">\n</textarea></div>');
$templateCache.put('forms/schema/plugins/ckeditor/suggestion-options-properties.html','<div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.suggestionsUrl.$invalid}"><label for="suggestionsUrl" class="col-sm-2 control-label">Suggestions Url:</label><div class="input-group col-sm-10" style="padding-left: 15px;"><input type="text" class="form-control" name="suggestionsUrl" id="suggestionsUrl" placeholder="Suggestion Url..." ng-model="field.options.suggestionsUrl"> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="loadSuggestions(field.options.suggestionsUrl)">Load Suggestions</button></span></div></div></div></div><div class="row no-vertical-margin"><div class="col-lg-1"><button class="btn btn-info" type="button" ng-click="refreshOption()" title="Update options in CKEditor">Update <span class="fa fa-refresh"></span></button></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.tokensUrl.$invalid}"><label for="tokensUrl" class="col-sm-2 control-label">Tokens Url:</label><div class="input-group col-sm-10" style="padding-left: 15px;"><input type="text" class="form-control" name="tokensUrl" id="tokensUrl" placeholder="Tokens Url..." ng-model="field.options.tokensUrl"> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="loadTokens(field.options.tokensUrl)">Load Tokens</button></span></div></div></div></div><div class="table-responsive" style="max-height: 300px;overflow-y: auto;margin-top: 20px;"><table class="table table-condensed position-relative"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option" ng-disabled="field.options.locked"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'error\': fieldOptionForm.$invalid }"><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required" ng-disabled="field.options.locked"></td><td><input type="text" ng-model="option.label" class="form-control" ng-required="true"></td><td><button class="btn btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/plugins/if-yes/if-yes-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-toggleValue.$invalid}"><label for="{{field.name}}-toggleValue" class="col-sm-4 control-label">Toggle value:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-toggleValue" name="{{field.name}}-toggleValue" ng-model="field.value.toggle" class="ng-pristine ng-valid"></div></div></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-textValue.$invalid}"><label for="{{field.name}}-textValue" class="col-sm-4 control-label">Text value:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-textValue" name="{{field.name}}-textValue" placeholder="Text value..." ng-model="field.value.textarea" ng-required="false"></div></div></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/if-yes/if-yes.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/if-yes.html\'"></div>');
$templateCache.put('forms/schema/plugins/grid-render/container.html','<div ng-include="\'forms/schema/components/label.html\'"></div><ods-grid-render field="field" config="config" mode="edit"></ods-grid-render>');
$templateCache.put('forms/schema/plugins/grid-render/grid-render-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.{{field.name}}-cssClass.$invalid}"><label for="{{field.name}}-cssClass" class="col-sm-4 control-label">Class Name:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-cssClass" name="{{field.name}}-cssClass" placeholder="Css Class..." ng-model="field.cssClass" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.{{field.name}}-code.$invalid}"><label for="{{field.name}}-code" class="col-sm-4 control-label">Component code:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-code" name="{{field.name}}-code" placeholder="Code..." ng-model="field.code" ng-required="false"> <span class="help-block">Code is like a identification or type in this form. useful for a component classification.</span></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Layout"><ods-grid-render-props field="field"></ods-grid-render-props></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/grid-render/grid-render-props.html','<div class="padding-top"><form name="fieldPropsForm" class="form-horizontal"><div class="row"><div class="col-md-4 col-sm-4 col-xs-12"><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-manageRows.$invalid}"><label for="{{field.name}}-manageRows" class="control-label col-sm-4">Manage rows:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-manageRows" name="{{field.name}}-manageRows" ng-model="field.manageRows"></div></div></div></form></div>');
$templateCache.put('forms/schema/plugins/grid-render/grid-render.html','<form name="{{field.name}}" class="position-relative"><table class="{{field.cssClass}}" id="{{field.name}}"><thead><tr><th ng-repeat="col in field.descriptor.header" scope="col">{{ col }}</th><th ng-show="field.manageRows" scope="col">Actions</th></tr></thead><tbody><tr ng-repeat="row in field.descriptor.data"><td ng-repeat="col in row" width="{{col.width}}">{{ col }}</td><td ng-show="field.manageRows" width="20px" style="position: relative"><button type="button" ng-click="removeRow(field.descriptor.data, $index)" title="Remove row" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button> <button type="button" ng-click="swapRow($index - 1, $index)" title="Swap row up" class="btn btn-info pull-right" ng-disabled="$index === 0"><span class="fa fa-arrow-up"></span></button> <button type="button" ng-click="swapRow($index, $index + 1)" title="Swap row down" class="btn btn-info pull-right" ng-disabled="$index === field.matrix.length - 1"><span class="fa fa-arrow-down"></span></button></td></tr></tbody></table></form>');
$templateCache.put('forms/schema/plugins/if-yes-radio/if-yes-radio-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-toggleValue.$invalid}"><label for="{{field.name}}-toggleValue" class="col-sm-4 control-label">Toggle value:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-toggleValue" name="{{field.name}}-toggleValue" ng-model="field.value.toggle" class="ng-pristine ng-valid"></div></div></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-textValue.$invalid}"><label for="{{field.name}}-textValue" class="col-sm-4 control-label">Text value:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-textValue" name="{{field.name}}-textValue" placeholder="Text value..." ng-model="field.value.textarea" ng-required="false"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-on.$invalid}"><label for="{{field.name}}-on" class="col-sm-4 control-label">On label:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-on" name="{{field.name}}-on" placeholder="On label..." ng-model="field.on" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-off.$invalid}"><label for="{{field.name}}-off" class="col-sm-4 control-label">Off label:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-off" name="{{field.name}}-off" placeholder="Off label..." ng-model="field.off" ng-required="true"></div></div></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/if-yes-radio/if-yes-radio.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/if-yes-radio.html\'"></div>');
$templateCache.put('forms/schema/plugins/options-textarea/accordion-properties.html','<div class="row"><div class="col-lg-12 margin-bottom"><button type="button" class="btn btn-success" ng-click="addGroup(field)">Add Group</button></div></div><div class="row"><div class="col-lg-12"><uib-accordion><div uib-accordion-group class="panel-default" ng-repeat="group in field.groups" is-open="group.isOpen"><uib-accordion-heading>{{ group.label }} <em class="pull-right glyphicon" ng-class="{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}"></em></uib-accordion-heading><div class="form-group margin-bottom"><div class="col-sm-12 text-right"><button type="button" class="btn btn-danger" ng-click="removeGroup($index)">Remove Group</button></div></div><div class="form-group margin-bottom"><label for="label-{{group.name}}" class="col-sm-2 control-label">Label:</label><div class="col-sm-10"><input type="text" class="form-control" id="label-{{group.name}}" name="label-{{group.name}}" placeholder="Group Label..." ng-model="group.label" ng-required="false"></div></div><div class="form-group margin-bottom"><label for="value-{{group.name}}" class="col-sm-2 control-label">Value:</label><div class="col-sm-10"><input type="text" class="form-control" id="value-{{group.name}}" name="value-{{group.name}}" placeholder="Group Value..." ng-model="group.groupValue" ng-required="false"></div></div><ods-field-checkboxlist-options field="group"></ods-field-checkboxlist-options></div></uib-accordion></div></div>');
$templateCache.put('forms/schema/plugins/options-textarea/options-textarea-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/inline-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Modal"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/plugins/options-textarea/modal/title-property.html\'"></div><div ng-include="\'forms/schema/plugins/options-textarea/modal/placeholder-property.html\'"></div><div ng-include="\'forms/schema/plugins/options-textarea/modal/tooltip-property.html\'"></div><div ng-include="\'forms/schema/plugins/options-textarea/modal/value-property.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Options Groups"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-accordion-properties field="field"></ods-accordion-properties></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/options-textarea/options-textarea.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/options-textarea/textarea.html\'"></div>');
$templateCache.put('forms/schema/plugins/if-yes-checkbox/if-yes-checkbox-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-toggleValue.$invalid}"><label for="{{field.name}}-toggleValue" class="col-sm-4 control-label">Toggle value:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-toggleValue" name="{{field.name}}-toggleValue" ng-model="field.value.toggle" class="ng-pristine ng-valid"></div></div></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/inline-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-checkboxlist-options field="field"></ods-field-checkboxlist-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/if-yes-checkbox/if-yes-checkbox.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/if-yes-checkbox.html\'"></div>');
$templateCache.put('forms/schema/plugins/table/container.html','<div ng-include="\'forms/schema/components/label.html\'"></div><ods-table field="field" mode="edit"></ods-table>');
$templateCache.put('forms/schema/plugins/table/table-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.{{field.name}}-cssClass.$invalid}"><label for="{{field.name}}-cssClass" class="col-sm-4 control-label">Class Name:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-cssClass" name="{{field.name}}-cssClass" placeholder="Css Class..." ng-model="field.cssClass" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.{{field.name}}-code.$invalid}"><label for="{{field.name}}-code" class="col-sm-4 control-label">Component code:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-code" name="{{field.name}}-code" placeholder="Code..." ng-model="field.code" ng-required="false"> <span class="help-block">Code is like a identification or type in this form. useful for a component classification.</span></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Layout"><ods-table-props field="field"></ods-table-props></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/table/table-props.html','<div class="padding-top"><div class="row"><form name="fieldPropsForm" class="form-horizontal"><div class="col-md-4 col-sm-4 col-xs-12"><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-rows.$invalid}"><label for="{{field.name}}-rows" class="control-label col-sm-5">Rows:</label><div class="col-sm-3"><input type="number" class="form-control" id="{{field.name}}-rows" name="{{field.name}}-rows" placeholder="Rows..." ng-model="field.matrix.length" ng-required="false" ng-disabled="true"></div><div class="col-sm-3"><button type="button" class="btn btn-primary" ng-click="addRow()" title="Add row">Add</button></div></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-cols.$invalid}"><label for="{{field.name}}-cols" class="control-label col-sm-5">Cols:</label><div class="col-sm-3"><input type="number" class="form-control" id="{{field.name}}-cols" name="{{field.name}}-cols" placeholder="Cols..." ng-model="field.matrix[0].length" ng-required="false" ng-disabled="true"></div><div class="col-sm-3"><button type="button" class="btn btn-primary" ng-click="addColumn()" title="Add column">Add</button></div></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-totals.$invalid}"><label for="{{field.name}}-rowHeader" class="control-label col-sm-5">Row Header:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-rowHeader" name="{{field.name}}-rowHeader" ng-model="field.rowHeader"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-canClone.$invalid}"><label for="{{field.name}}-colHeader" class="control-label col-sm-5">Col Header:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-colHeader" name="{{field.name}}-colHeader" ng-model="field.colHeader"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-totals.$invalid}"><label for="{{field.name}}-totals" class="control-label col-sm-5">Show Totals:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-totals" name="{{field.name}}-totals" ng-model="field.totals"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-canClone.$invalid}"><label for="{{field.name}}-canClone" class="control-label col-sm-5">Can clone row:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-canClone" name="{{field.name}}-canClone" ng-model="field.canCloneRow"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-manageRows.$invalid}"><label for="{{field.name}}-manageRows" class="control-label col-sm-5">Manage rows:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-manageRows" name="{{field.name}}-manageRows" ng-model="field.manageRows"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-manageColumns.$invalid}"><label for="{{field.name}}-manageColumns" class="control-label col-sm-5">Manage columns:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-manageColumns" name="{{field.name}}-manageColumns" ng-model="field.manageColumns"></div></div><div class="col-md-8 col-sm-8 col-xs-12"><h3>Columns configuration</h3><div class="table-responsive" style="max-height: 300px"><table class="table table-bordered"><thead><tr><th>#</th><th>CSS class</th><th>Width</th><th>Total</th><th>Total Label</th></tr></thead><tbody><tr ng-repeat="col in field.matrix[0]"><td>{{$index + 1}}</td><td><input type="text" class="form-control" id="{{field.name}}-col{{$index}}" name="{{field.name}}-col{{$index}}" placeholder="Css class..." ng-model="field.matrix[0][$index].cssClass"></td><td><input type="text" class="form-control" id="{{field.name}}-width{{$index}}" name="{{field.name}}-width{{$index}}" placeholder="width..." ng-model="col.width"></td><td><input type="checkbox" id="{{field.name}}-total{{$index}}" name="{{field.name}}-total{{$index}}" title="Add total to this column" ng-model="col.total"></td><td><input type="text" class="form-control" id="{{field.name}}-totalLabel{{$index}}" name="{{field.name}}-totalLabel{{$index}}" placeholder="Total label..." ng-model="field.matrix[0][$index].totalLabel"></td></tr></tbody></table></div></div></form></div></div>');
$templateCache.put('forms/schema/plugins/table/table.html','<form name="{{field.name}}" class="position-relative"><table class="{{field.cssClass}}" id="{{field.name}}"><tbody><tr ng-repeat="row in field.matrix"><td ng-repeat="col in row" width="{{col.width}}"><div class="box-row col-lg-12"><ul dnd-list="col.fields" dnd-disable-if="col.fields.length >= 1" style="min-width: 10px;" dnd-allowed-types="col.allowedTypes" dnd-inserted="onAdd(item, type)" dnd-drop="checkItem(index, item, external, type)"><li class="box-field" ng-repeat="field in col.fields" dnd-draggable="field" dnd-type="field.componentType" dnd-effect-allowed="move" dnd-selected="models.selected = field" dnd-moved="col.fields.splice($index, 1)" dnd-callback="onDrop(list, $index, targetList, targetIndex)" ng-class="{selected: models.selected === col.fields}"><ods-field row="row" col="col" index="$index" field="field" popover-props="true" debug-mode="debugMode"></ods-field></li></ul></div></td><td ng-show="field.manageRows" width="20px" style="position: relative"><button type="button" ng-click="removeRow(field.matrix, $index)" title="Remove row" ng-show="field.manageRows && !(field.manageRows && $index === 0)" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button> <button type="button" ng-click="swapRow($index - 1, $index)" title="Swap row up" class="btn btn-info pull-right" ng-disabled="$index === 0"><span class="fa fa-arrow-up"></span></button> <button type="button" ng-click="swapRow($index, $index + 1)" title="Swap row down" class="btn btn-info pull-right" ng-disabled="$index === field.matrix.length - 1"><span class="fa fa-arrow-down"></span></button></td></tr><tr ng-show="field.totals"><td ng-repeat="col in field.matrix[0]"><div ng-show="col.total" class="pull-right"><ods-table-total field="field" col-index="$index" label="col.totalLabel"></ods-table-total></div></td></tr><tr ng-show="field.manageColumns"><td ng-repeat="col in field.matrix[0]" style="position: relative"><button type="button" ng-click="removeColumn(field, $index)" title="Remove column" ng-hide="field.colHeader && $index === 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button> <button type="button" ng-click="swapColumn($index, $index + 1)" title="Swap column right" class="btn btn-info pull-right" ng-disabled="$index === field.matrix.length - 1"><span class="fa fa-arrow-right"></span></button> <button type="button" ng-click="swapColumn($index - 1, $index)" title="Swap column left" class="btn btn-info pull-right" ng-disabled="$index === 0"><span class="fa fa-arrow-left"></span></button></td></tr></tbody></table><div class="btn-edit position-relative" ng-show="field.canCloneRow"><button type="button" class="btn btn-primary pull-right" ng-click="cloneRow(field)">Clone row</button></div></form>');
$templateCache.put('forms/schema/plugins/table/total.html','<div><b>{{label}}: {{total}}</b></div>');
$templateCache.put('forms/common/fields/plugins/canvas-painter/canvas-painter-color-selector.html','<ul class="odsCanvasSelector"><li ng-repeat="color in colorList track by $index" class="odsCanvasColor" ng-class="{\'active\': (selectedColor === color)}" ng-style="{\'background-color\':color}" ng-click="setColor(color)"></li></ul>');
$templateCache.put('forms/common/fields/plugins/canvas-painter/canvas-painter-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-background.$invalid}"><label for="{{field.name}}-background" class="col-sm-4 control-label">Background:</label><div class="col-sm-8"><textarea rows="3" class="form-control" id="{{field.name}}-background" name="{{field.name}}-background" ng-model="field.options.imageSrc" placeholder="Paste background base64 code image here..." tabindex="11">\n                            </textarea></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Colors"><form name="fieldColorsForm" class="form-horizontal"><div class="box-body padding-top"><ods-canvas-painter-colors colors="field.options.lineColors"></ods-canvas-painter-colors></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/common/fields/plugins/canvas-painter/canvas-painter.html','<div ng-if="!fieldCopy.readonly" ods-canvas-painter-color-selector="fieldCopy.options.lineColors" selected-color="fieldCopy.options.color" ng-style="{ width: fieldCopy.options.width }"></div><input type="range" min="1" max="50" class="lineWidthSelector" ng-model="fieldCopy.options.lineWidth" ng-if="!fieldCopy.readonly" ng-style="{ width: fieldCopy.options.width }"><div class="row" ng-if="!fieldCopy.readonly"><div class="col-md-12">{{ fieldCopy.options.lineWidth }}</div></div><canvas ng-show="!fieldCopy.readonly" id="ods-canvas" class="odsCanvasPaint" style="position:absolute"></canvas><canvas ng-show="!fieldCopy.readonly" id="ods-canvas-tmp" class="odsCanvasPaint" style="position:relative;top: 0;left: 0"></canvas><figure ng-if="fieldCopy.readonly" class="figure"><img id="ods-canvas-paint-viewer-result" ng-src="{{ fieldCopy.value ? fieldCopy.value : fieldCopy.options.imageSrc }}" width="fieldCopy.width" height="fieldCopy.height"></figure><div class="row"><div class="col-md-12"><button class="btn" title="{{ fieldCopy.readonly ? \'Enable Edit\' : \'Save Changes\' }}" ng-class="{\'btn-warning\': fieldCopy.readonly, \'btn-success\': !fieldCopy.readonly}" ng-click="toggleEdit()"><i class="fa fa-pencil" ng-if="fieldCopy.readonly"></i> <i class="glyphicon glyphicon-ok" ng-if="!fieldCopy.readonly"></i></button> <button ng-if="!fieldCopy.readonly" class="btn btn-primary" title="Undo" ng-click="undoCanvas()" ng-disabled="version === 0"><i class="fa fa-undo"></i></button> <button ng-if="!fieldCopy.readonly" class="btn btn-danger" title="Clear" ng-click="clearCanvas()" ng-disabled="version === 0"><i class="fa fa-trash"></i></button></div></div>');
$templateCache.put('forms/common/fields/plugins/canvas-painter/container.html','<ods-canvas-painter field="field">');
$templateCache.put('forms/common/fields/plugins/canvas-painter/line-colors.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="{{field.name}}-limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="{{field.name}}-limitTo" name="{{field.name}}-limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><div class="table-responsive" style="max-height: 250px"><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th>Color</th><th>Value</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addColor()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldColorsForm" ng-repeat="color in colors track by $index" ng-class="{ \'has-error\': fieldColorsForm.$invalid }"><td><div class="odsCanvasColor" ng-style="{\'background-color\':color}"></div></td><td><input type="text" ng-model="color" class="form-control" required="required"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeColor($index)" title="Remove this color"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/common/fields/plugins/options-textarea/modal.html','<script type="text/ng-template" id="options-modal.html"><div class="modal-header">\n        <h3 class="modal-title" id="modal-title">{{ field.modal.title }}</h3>\n    </div>\n    <div class="modal-body" id="modal-body">\n        <form>\n            <div ng-repeat="group in field.groups">\n                <div ng-if="$index % 3 === 0"\n                     ng-init="groups = field.groups.slice($index, $index + 3)">\n                    <div class="row">\n                        <div class="col-lg-4" ng-repeat="group in groups">\n                            <uib-accordion>\n                                <div uib-accordion-group class="panel-default" is-open="group.isOpen">\n                                    <uib-accordion-heading>\n                                        {{ group.label }}\n                                        <i class="pull-right glyphicon"\n                                           ng-class="{\'glyphicon-chevron-down\': status.open, \'glyphicon-chevron-right\': !status.open}"></i>\n                                    </uib-accordion-heading>\n                                    <div ng-class="field.inline === true ? \'checkbox-inline\' : \'checkbox\'"\n                                         ng-repeat="option in group.options">\n                                        <label>\n                                            <input type="checkbox" value="{{option.id}}"\n                                                   ng-model="group.optionValue[option.id]"/>\n                                            {{option.name}}\n                                        </label>\n                                    </div>\n                                </div>\n                            </uib-accordion>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="form-group">\n                <label>Free text</label>\n                <textarea autoheight class="form-control" ods-dynamic-name="getUniqueName(field)"\n                          id="{{getUniqueName(field)}}" placeholder="{{field.modal.placeholder}}"\n                          title="{{field.modal.tooltip}}" ng-model="field.modal.value" type="textarea"\n                          ng-model-options="{ debounce: 1000 }" rows="3" data-resize="disabled">\n                </textarea>\n            </div>\n        </form>\n    </div>\n    <div class="modal-footer">\n        <div class="row">\n            <div class="col-sm-6 text-left">\n                <button class="btn btn-danger left" type="button" ng-click="clear(field)">Clear Data</button>\n            </div>\n            <div class="col-sm-6 text-right">\n                <button class="btn btn-primary" type="button" ng-click="save(field)">Save</button>\n                <button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>\n            </div>\n        </div>\n    </div></script><br><button type="button" class="btn btn-primary" ng-click="openModal(field, \'lg\')">Open</button><br><br>');
$templateCache.put('forms/common/fields/plugins/options-textarea/options-textarea.html','<div ng-include="\'forms/common/fields/plugins/options-textarea/modal.html\'"></div><div ng-include="\'forms/common/fields/plugins/options-textarea/textarea.html\'"></div>');
$templateCache.put('forms/common/fields/plugins/options-textarea/textarea.html','<textarea autoheight class="form-control" ods-dynamic-name="getUniqueName(field)" id="{{getUniqueName(field)}}" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" ng-required="getRequired(field)" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" rows="{{field.rows}}" data-resize="disabled" ng-readonly="field.readonly">\n</textarea>');
$templateCache.put('forms/schema/plugins/options-textarea/modal/placeholder-property.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-placeholder.$invalid}"><label for="{{field.name}}-placeholder" class="col-sm-4 control-label">Placeholder:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-placeholder" name="{{field.name}}-placeholder" placeholder="Modal title..." ng-model="field.modal.placeholder" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/plugins/options-textarea/modal/title-property.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-title.$invalid}"><label for="{{field.name}}-title" class="col-sm-4 control-label">Title:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-title" name="{{field.name}}-title" placeholder="Modal title..." ng-model="field.modal.title" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/plugins/options-textarea/modal/tooltip-property.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-tooltip.$invalid}"><label for="{{field.name}}-tooltip" class="col-sm-4 control-label">Title:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-tooltip" name="{{field.name}}-tooltip" placeholder="Modal tooltip..." ng-model="field.modal.tooltip" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/plugins/options-textarea/modal/value-property.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-value.$invalid}"><label for="{{field.name}}-value" class="col-sm-4 control-label">Free text value:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-value" name="{{field.name}}-value" placeholder="Value..." ng-model="field.modal.value" ng-required="false"></div></div></div>');}]);
'use strict';

angular
    .module('ods-lib')
    .controller('AddressDialogController', AddressDialogController);

AddressDialogController.$inject = ['$uibModalInstance', 'address', 'countries', 'states'];

function AddressDialogController($uibModalInstance, address, countries, states) {

    var vm = this;

    var nonEmail = "non-email@domain.com";

    vm.address = address;
    vm.countries = countries;
    vm.states = states;
    vm.nonEmail = false;

    vm.clear = clear;
    vm.save = save;
    vm.toggleEmail = toggleEmail;
    vm.emailChanged = emailChanged;

    function clear() {

        $uibModalInstance.dismiss('cancel');
    }

    function save() {

        $uibModalInstance.close(vm.address);
        vm.isSaving = false;
    }

    function toggleEmail() {

        if (vm.nonEmail) {
            if (vm.address) {
                vm.address.email = nonEmail;
            } else {
                vm.address = {
                    email: nonEmail
                }
            }
        } else {
            if (vm.address) {
                vm.address.email = '';
            }
        }
    }

    function emailChanged() {

        if (!vm.address.email) {
            vm.nonEmail = false;
        }
    }
}

'use strict';

angular
    .module('ods-lib')
    .directive('odsAddress', Address);

Address.$inject = ['$uibModal'];

function Address($uibModal) {

    return {
        restrict: 'E',
        templateUrl: 'address/address.html',
        scope: {
            label: '@',
            address: '=',
            countries: '=',
            states: '=',
            ngModel: '='
        },
        link: linkFunc
    };

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.openModal = function () {
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
            }, function () {
                //$state.go($state.current.name);
            });
        };

        $scope.printName = printName;

        function printName(address) {
            if (address) {
                return address.street + ' ' +
                    address.street2 + ' ' +
                    address.city + ',' +
                    address.state.name + ' ' +
                    address.zip;
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
    .filter('DateFilter', DateFilter);

DateFilter.$inject = ['moment'];

function DateFilter(moment) {
    return function (input, momentFn /*, param1, param2, ...param n */) {
        var args = Array.prototype.slice.call(arguments, 2),
            momentObj = moment(input);
        return momentObj[momentFn].apply(momentObj, args);
    };
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
            country = '';
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + ' (' + city + ') ' + number).trim();
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
'use strict';

angular
    .module('ods-lib')
    .directive('odsCkeditor', CKEditor);

CKEditor.$inject = ['$timeout', 'OdsCkeditor'];

function CKEditor($timeout, OdsCkeditor) {

    var directive = {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            name: '@',
            ngModel: '=',
            options: '=',
            disabled: '=?ngDisabled'
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope, elm, attr) {

        if (typeof($scope.ngModel) === 'undefined') {
            $scope.ngModel = '';
        }

        if (typeof(CKEDITOR) === 'undefined') {
            console.error('Please include CKEditor js in your html.');
            return;
        }

        if (!attr.id && !attr.name) {
            $scope.name = OdsCkeditor.generateName();
        } else {
            $scope.name = attr.name;
        }

        //We check if an instance exists.
        $scope.ck = OdsCkeditor.getInstance($scope.name);

        if (!$scope.ck) {
            elm[0].name = $scope.name;
            elm[0].id = $scope.name;
            $scope.ck = CKEDITOR.replace(elm[0]);
            OdsCkeditor.register($scope.name, $scope.ck);
        }

        $scope.disabled = $scope.disabled ? $scope.disabled : false;

        $scope.ck.on('instanceReady', function () {

            OdsCkeditor.setData($scope.name, $scope.ngModel);
            OdsCkeditor.setOptions($scope.name, OdsCkeditor.initOptions($scope.options));
        });

        $scope.ck.on('change', function () {
            $timeout(function () {
                $scope.ngModel = OdsCkeditor.getData($scope.name);
            }, 0, false);
        });

        // ['dataReady', 'change', 'blur', 'saveSnapshot'].forEach(function (event) {
        //     controller.onCKEvent(event, function syncView() {
        //         ngModelController.$setViewValue(controller.instance.getData() || '');
        //     });
        // });

        $scope.$watch('disabled', function (newValue, oldValue) {

            $timeout(function () {
                if (newValue !== oldValue) {
                    newValue = newValue ? newValue : false;
                    OdsCkeditor.setReadOnly($scope.name, newValue);
                }
            }, 0, false);
            return;
        });

        $scope.$watch('options', function (options) {

            $timeout(function () {
                OdsCkeditor.setOptions($scope.name, OdsCkeditor.initOptions(options));
            }, 0, false);
            return;
        });

        $scope.$watch('ngModel', function (model, oldModel) {

            $timeout(function () {
                if(model !== oldModel){
                    OdsCkeditor.setData($scope.name, model);
                }
            }, 0, false);
            return;
        });

        $scope.$on('$destroy', function () {
            OdsCkeditor.unregister($scope.name);
        });
    }
}
'use strict';

angular
    .module('ods-lib')
    .factory('OdsCkeditor', OdsCkeditor);

function OdsCkeditor() {

    var uniqueCounter = (+new Date()) % 10000;

    var keyCode = CKEDITOR.CTRL + 32;

    var instanceMap = {};

    var service = {
        register: register,
        getInstance: getInstance,
        unregister: unregister,
        generateName: generateName,
        getData: getData,
        setData: setData,
        setOptions: setOptions,
        setReadOnly: setReadOnly,
        initOptions: initOptions
    };

    function register(name, instance) {

        instanceMap[name] = instance;
    }

    function getInstance(name) {

        if (instanceMap[name]) {
            return instanceMap[name];
        } else {
            return false;
        }
    }

    function unregister(name) {

        instanceMap[name] = null;
    }

    function generateName() {

        uniqueCounter++;
        return 'ckeditor' + uniqueCounter;
    }

    function getData(name) {

        var ck = getInstance(name);
        if (ck) {
            return ck.getData();
        } else {
            return '';
        }
    }

    function setData(name, model) {

        var ck = getInstance(name);
        if (ck) {
            ck.setData(model);

            // ck.focus();
            // var selection = ck.getSelection();
            // if (selection) {
            //     var range = selection.getRanges()[0];
            //     var pCon = range.startContainer.getAscendant({p: 2}, true); //getAscendant('p',true);
            //     var newRange = new CKEDITOR.dom.range(range.document);
            //     newRange.moveToPosition(pCon, CKEDITOR.POSITION_BEFORE_START);
            //     newRange.select();
            // }
        }
    }

    function setOptions(name, options) {

        var ck = getInstance(name);
        if (ck) {
            ck.execCommand('reloadOptions', initOptions(options));
        }
    }

    function setReadOnly(name, isReadOnly) {

        var ck = getInstance(name);
        if (ck) {
            ck.setReadOnly(isReadOnly);
        }
    }

    function initOptions(options) {

        var tmp = {};
        if (options) {
            tmp = {
                triggerKeyCode: !options.triggerKeyCode ? keyCode : options.triggerKeyCode,
                prefix: !options.prefix ? '${' : options.prefix,
                suffix: !options.suffix ? '}' : options.suffix,
                suggestions: options.suggestions
            };
            return tmp;
        } else {
            tmp = {
                triggerKeyCode: keyCode,
                prefix: '${',
                suffix: '}',
                suggestions: []
            };
            return tmp;
        }
    }

    return service;
}
/**
 * Created by PpTMUnited on 5/23/2017.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .directive('udtAttach1', Attach);

    Attach.$inject = ['$state', 'File', '$sessionStorage', 'CoreService', 'toastr', 'fancyboxService'];

    function Attach($state, File, $sessionStorage, CoreService, toastr, fancyboxService) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/udt/udt-attach-file/udt-attach-file.html',
            scope: {//all this scope value defined, are attr for the directive. Can be used like is explained below
                formId: '@',//id of the form you wanna find the attachments
                isSigned: '=',//if is already signed, don't add more files
                disableAttach: '=',//if we dont want to attach anything, just view the files
                redirect: '=',//if we want to redirect to an state
                attach: '&', //You must define attach method
                delete: '&', //You must define delete method
                list: '&'
            },
            link: linkFunc
        };

        return directive;

        /* private helper methods*/

        function linkFunc($scope, element) {
            $scope.imageType = 'image';
            $scope.applicationType = 'application';
            $scope.attachFileData = {};

            // loadAllFiles();
            //
            // function loadAllFiles() {
            //     if ($scope.formId && $scope.formId !== "") {
            //         File.byOwner({id: $scope.formId}, function (result) {
            //             $scope.files = result;
            //         });
            //     } else {
            //         console.log('Not Form Id ');
            //     }
            // }

            $scope.list()().then(function (data) {
                $scope.files = data;
            });

            $scope.imageDetail = function (id, type) {
                File.findFileById({id: id}).$promise
                    .then(function (data) {
                        if (data && data.file) {
                            fancyboxService.fancyboxPlus()({
                                // 'padding': 0,
                                'href': 'data:' + type + ';base64,' + data.file,
                                'title': data.name,
                                // 'titlePosition'  : 'over',
                                'transitionIn': 'elastic',
                                'transitionOut': 'elastic'
                            });
                        } else {
                            toastr.warning("The file was not found.");
                        }
                    });
            }


            $scope.getFileAttached = function (fileType, id) {
                $sessionStorage.typeFile = fileType;
                File.findFile({id: id});
            };

            /**
             * Attach a file
             * @param file
             * @param data
             */
            $scope.attachFile = function (file, data) {
                CoreService.attachment(file, data).then(function (result) {
                    result.id = $scope.formId;
                    $scope.attach()(result, successResult, errorResult);
                    // SystemService.attachConsent(result, successResult, errorResult);
                });
            };

            /**
             * Delete a file
             * @param fileId
             */
            $scope.deleteFile = function (fileId) {
                $scope.delete()(fileId).then(function (data) {
                    $scope.files.map(function (file) {
                        if (file.id == fileId) {
                            file.hide = true;
                        }
                    })
                    // $('li[data-id="' + fileId + '"]').detach();
                });
            };

            var successResult = function (result) {
                if ($scope.redirect) {
                    $state.go($state.current, {}, {reload: true});
                } else {
                    // loadAllFiles();
                    $scope.list()().then(function (data) {
                        $scope.files = data;
                    });
                }
            };

            var errorResult = function (error) {
                console.log(error)
            };

        }
    }
})();

/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
  'use strict';

  angular
    .module('ods-lib')
    .controller('OdsFormBuilderController', OdsFormBuilderController);

  OdsFormBuilderController.$inject = ['$scope', 'OdsFormService'];

  function OdsFormBuilderController($scope, OdsFormService) {

    function generateHeader() {
      return _.times(5, function (n) {
        return "Column " + n;
      });
    }

    function generateMatrix() {
      return _.times(10, function (row) {
        return _.times(5, function (column) {
          return "Row " + row + ",Column " + column;
        });
      });
    }

    var gridRenderConf = {
      descriptor: {
        header: generateHeader(),
        data: generateMatrix()
      }
    }

    $scope.config = {
      ckeditor: {
        suggestionsUrl: 'http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/suggestions.json',
        tokensUrl: 'http://localhost:63342/ods-lib/angular-component-seed/examples/forms/resources/tokens.json',
        suggestions: [
          {
            'id': 'patientName',
            'label': 'Patient Name'
          },
          {
            'id': 'patientDob',
            'label': 'Patient DOB'
          },
          {
            'id': 'patientGender',
            'label': 'Patient Gender'
          },
          {
            'id': 'patientMaritalStatus',
            'label': 'Patient Marital Status'
          }
        ]
      },
      gridRender: [gridRenderConf]
    };

    $scope.runTimeConfig = {
      ckeditor: {
        tokens: {
          'patientName': 'Hermes Lorenzo',
          'patientDob': '01/24/1980',
          'patientGender': 'Male',
          'patientMaritalStatus': 'Single'
        }
      },
      gridRender: [gridRenderConf]
    };

    $scope.saveForm = function (schema) {

      var data = OdsFormService.saveFormData(schema);
      console.log('The form data is: ' + JSON.stringify(data, null, 4));
    };

    $scope.toggleStyle = function () {

      $scope.cssClass = $scope.cssClass === 'form-print' ? 'form-print1' : 'form-print';
    };
  }
})();
/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormBuilder', OdsFormBuilder);

OdsFormBuilder.$inject = [];

function OdsFormBuilder() {

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

    function linkFunc() {

    }
}

'use strict';

angular
    .module('ods-lib')
    .directive('odsInputHideValue', odsInputHideValue);

odsInputHideValue.$inject = ['OdsUtils'];

function odsInputHideValue(OdsUtils) {

    return {
        restrict: 'E',
        templateUrl: 'hide-value/input-hide-value.html',
        scope: {
            label: '@',
            name: '@',
            ngModel: '=',
            ngDisabled: '=',
            ngRequired: '=',
            mask: '@'
        },
        link: linkFunc
    };

    function linkFunc($scope) {

        $scope.toggleFn = toggleFn;
        $scope.onBlur = onBlur;
        $scope.onFocus = onFocus;

        init();

        function init() {

            $scope.name = $scope.name ? $scope.name : OdsUtils.generateName('odsInputHideValue');
            $scope.toggle = $scope.toggle ? $scope.toggle : false;
            $scope.ngRequired = $scope.ngRequired ? $scope.ngRequired : false;
            updateComponent();
        }

        function toggleIcon() {
            $scope.icon = $scope.toggle ? 'fa fa-eye' : 'fa fa-eye-slash';
        }

        function toggleType() {
            $scope.type = $scope.toggle ? 'text' : 'password';
        }

        function toggleCursor() {
            $scope.cursor = $scope.ngDisabled ? 'not-allowed' : 'pointer';
        }

        function updateComponent() {
            toggleIcon();
            toggleType();
            toggleCursor();
        }

        function toggleFn() {
            $scope.toggle = !$scope.ngDisabled ? !$scope.toggle : $scope.toggle;
            updateComponent();
        }

        function onBlur() {
            $scope.toggle = false;
            updateComponent();
        }

        function onFocus() {
            $scope.toggle = true;
            updateComponent();
        }

        $scope.$watch('ngDisabled', function () {
            toggleCursor();
        });
    }
}
'use strict';

angular
    .module('ods-lib')
    .directive('odsTextHideValue', odsTextHideValue);

odsTextHideValue.$inject = [];

function odsTextHideValue() {

    return {
        restrict: 'E',
        templateUrl: 'hide-value/text-hide-value.html',
        scope: {
            ngValue: '@',
            chart: '@'
        },
        link: linkFunc
    };

    function linkFunc($scope) {

        $scope.toggleFn = toggleFn;

        init();

        function init() {

            $scope.toggle = $scope.toggle ? $scope.toggle : false;
            $scope.chart = $scope.chart ? $scope.chart : 'x';
            updateComponent();
        }

        function toggleIcon() {
            $scope.icon = $scope.toggle ? 'fa fa-eye' : 'fa fa-eye-slash';
        }

        function toggleCursor() {
            $scope.cursor = $scope.ngDisabled ? 'not-allowed' : 'pointer';
        }

        function toggleValue() {
            $scope.value = '';
            for (var i = 0; i < $scope.ngValue.length; i++) {
                $scope.value += $scope.chart;
            }
            $scope.value = $scope.toggle ? $scope.ngValue : $scope.value;
        }

        function updateComponent() {
            toggleIcon();
            toggleCursor();
            toggleValue();
        }

        function toggleFn() {
            $scope.toggle = !$scope.toggle;
            updateComponent();
        }
    }
}
/**
 * Created by PpTMUnited on 2/21/2017.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsImgUploadDialogController', OdsImgUploadDialogController);

    OdsImgUploadDialogController.$inject = ['$scope', '$uibModalInstance', 'areaType', 'ngModel',
        'croppedImageSize', 'original', 'defaultImage'];

    function OdsImgUploadDialogController($scope, $uibModalInstance, areaType, ngModel,
                                       croppedImageSize, original, defaultImage) {

        var vm = this;

        vm.original = original;
        vm.model = ngModel;
        vm.croppedImageSize = croppedImageSize ? Number(croppedImageSize) : 300;
        vm.areaType = areaType;

        vm.file = {
            image: null
        };

        vm.save = save;
        vm.clear = clear;
        vm.handleFileSelect = handleFileSelect;
        vm.setDefault = setDefault;

        function handleFileSelect(evt, file) {

            vm.file = file;
            // var fileUp = file;
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function () {
                    vm.original = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        }

        function clear() {
            $uibModalInstance.dismiss(null);
        }

        function save() {
            var file = {
                original: vm.original,
                file: vm.model
            };
            $uibModalInstance.close(file);
        }

        function setDefault() {
            var file = {
                original: defaultImage,
                file: defaultImage
            };
            $uibModalInstance.close(file);
        }
    }
})();


(function () {
  'use strict';

  angular
    .module('ods-lib')
    .directive('odsImgUpload', OdsImgUpload);

  OdsImgUpload.$inject = ['$uibModal'];

  function OdsImgUpload($uibModal) {

    var directive = {
      restrict: 'E',
      templateUrl: 'img-upload/img-upload.html',
      scope: {//all this scope value defined, are attr for the directive. There use are explained below
        original: '=',//original image not modified.
        ngModel: '=',//model where to put result image.
        mode: '@', //Mode insert/edit
        image: '=',//modal field for the image value
        displayImage: '=',//boolean if you want to show the image result in directive view
        size: '@',//size for the modal, can be: sm or lg[e.g: modalSize="sm"]. This attr modified the size of the modal
        cssClass: '@',
        areaType: '@',//form for the image component. Can be square or circle[e.g: class="circle/square/rectangle"]
        onSave: '&', // function to execute after of
        croppedImageSize: '@', //size of the crop image
        defaultImage: '=?',
        uploadText: '@' //Text by default in case you dont have a default or image yet
      },
      link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

      //Init vars.
      $scope.defaultImage = $scope.defaultImage ? $scope.defaultImage : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QHGRXhpZgAATU0AKgAAAAgABFEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAGAAAAAPlEDAAEAAAABAAAAAAAAAADn5+fBwcHAwMC/v7+5ubm8vLzm5ubo6Oi+vr64uLi9vb27u7u6urq3t7fCwsLAwsHCwMHk5OTl5eW2trbf39/V1dXOzs7h4eHj4+Pi4uLa2trFxcXPz8/S0tLc3NzHx8fLy8vW1tbIyMjDw8PKysrExMTX19fMzMzZ2dnR0dHe3t7d3d3Nzc3Q0NDg4ODU1NTGxsbY2NjT09PBwb/b29vBwcPJycnCwb/BwL7Bv8DAwcPCwMPAwr+/wcDCwsDBw8LCwsTBw8C6uLng3t/DwcTBwMXEwL+/wb7AwcXAwMLCwb3b293i4+Xd3tnf4eDBwsTZ3d7AwL68vLrZ3dy7vbzo6Oq9uLzDwcLb29nn5+W5t7i8urvj4eK4ure/w8LFwMS+w7/c2tu5ubvBv8Tn5+nDwsDp5+jp6em7u726vLkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAF/AX8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorH8aeOdP8C6W1zfTBWIPlRKcyTH0A/r0FeT6X+0drU2rxNcQ2K2TTDzAI23LHu5wc9QO+KAPcKKRHWRAykMrDII7iloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiqer+ItP0CPdfXlraLjP72UJn6Z60AXKK4PXf2ivD+lblt2udRkHQQx7Vz7s2P0BriPEP7RutauGTT7eDTY243f62T8z8v6UAe06xrtn4etDcX11Dawj+KR9ufYep9hXmHjb9pRFDW+gweY3T7TOuFH+6vU/U4+hrzC+kvfEF59ovrme6mb+KVyx/DPT6VNb6csYoAjvri88S6i13f3E1zcSdXkbP4D0HsOKsQ2ixLipVUJ0paAPZvgn4q/t7wqLWVs3GmkRHJ5KfwH8hj/gNdlmvAfh94qbwd4pt7ot/o7nypx6oep/Dg/hXvwbeNw5B5B9aACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqG/v4NLs5Li5mjt4Yhl5JGCqo9ya8r8b/tJBXa30CASEcfaplO3/gKf1P5UAer3FzHaQtJNJHFGoyzOwVR+JrmtV+M3hnR2ZZNWglZe0Aab9VBH614HrGr6p4tuvO1G8uLps5AdvlX6L0H4CmRaQAOeaAPXtT/ab0e24tbK/um7Fgsan8ck/pXN6t+0tq95kWOn2dqvrIWlYfjwP0ri005F7VKtsq0AW9U+JfifXwwm1a6jVv4YSIR9PlA/WsT+zZLiQySM0jtyWY5JrSEajtTqAKcWlKvarCWqp2qSigAAxRRRQAUUUUABG4Yr6A+Ht0954I0uSTlvs6qSe+Bj+lfP+M17r8J9Rj1DwHY+WwLQqYnH91ge/wCGD+NAHR0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVj+NfG9j4E0dry+kx/DFEv35m9FH9egrSv76LTLGa4ncRw26GR2PRVAyTXzX418W3PxF8TyXsxZYQdkERPESdh9T1J9aAJPG3xA1P4lahuuW8q0RsxWyH5I/c/3m9z+nSqNppyxjkVNbWywp0qagBqoFHFOoooAKKKKACiiigAooooAKKKKACiiigArofhv49fwNrm6Qs2n3RCzqP4fRx7j9R+Fc9Qw3DFAH0rbXEd3bxyxOskcihkZTlWB6EU+vJPgn8Q20u8XRb1z9mnbFs5/wCWTn+H6Ht6H68et0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwf7RWsyaZ8P/JjyPt9wkDEf3cFj+e0D8TXi+m2wSKvXP2mRnwjp/8A1/L/AOgPXldsMRCgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooADkEMpKspyCOxr6G8Ias2u+F7C8b/AFk8Cs/+9jn9c18817x8LTnwBpn/AFzP/oRoA6CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA83/AGmP+RR0/wD6/l/9AevK7b/UrXq/7S0e7wXYt/dv0z7fI9eUW3+pWgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK96+GS7PAWl/8AXHP6mvBa+g/A1ubXwZpaH732WMkemVBoA1aKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDn/inp0OpfD7VlmjWRYbZ5lz/CyKWBH4ivAbKTfEPpX0R48XzPA+sr/esZx/5DavnLSz+5WgC3RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOij82VVHViBX0pBCttCka/djUKPoK+b9PG6/gHrIv86+kqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAzvGCeZ4S1Rf71pKP8Axw182aUf3Qr6Y8Rr5nh6/X+9byD/AMdNfM2knMdAF2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAktZPJuo37KwP619KCvmc8ivffhxqr614I064kJaRotjE9WKkrn8cUAbdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRQaAMPx/4w0/whoEr303l/aEaOJANzyNjsPxHPQV876T/q61Pih4jm8aePbyR2P2e1kNvAvZUUkfqcn8faqdtB5KUASUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXuvwlRY/h7poVg3yuSR6l2J/nXhVeifs/wCvzJql3pbNut2jNwgP8DAgHH1yPyoA9UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPmnxFZfYfGurQ/8APO8lA+m84ptbHxcsP7O+KOpDHyzlJl98oM/qDWPQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXYfA1tvjtf8AagkH16GuPrtPgRAZfG7N/wA8rZ2P5qP60AeyUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHjv7R2l/Z/E+m3wHy3MBhJHqjZ/k/6VxKnKivcPi34Jbxt4UaOAZvLV/OgH94gEFfxH6gV4cEaFmjkVo5IztZWGCp7gigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0b9nqwLX+pXWPlSNIgfUkkn+Q/OvO0UuwVQWZjgADqa91+GPhZvCfhSGGVdtzOfOmHox7fgAB9c0AdDRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFcJ8b/B9vd+GZtUht41vbUq7yKMM6dCD64znJ54ru6hv7KPUrGa3mXdDcI0bj1UjB/nQB81xyeYuadTtQ0uTw/rN1YTf6y1laMn+8AeD+I5/Gm0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFbfw70D/hJPGFnbsu6JX8yX02ryfz6fjQB6n8Ofh3ZeH9Hs7ia1jbUmQSPI4y0ZPOB6Y6cV1XSiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACjrRRQB5D+0J4b+w67a6tGv7u8XyZiP769D+K8f8AAa4UNuFe+/ETwx/wl3hC8swuZivmQ+0i8j8+n0Jr5+tn3Jg8MvBHpQBJRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXqX7P2geVZ3mpOvzSnyIz/sjlvzOP++a8vhia4mWONSzuQqqOpJ6V9DeFNDXw14cs7FcZgjAYjux5Y/iSaANCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAzXg/xd8N/8Ix47naNdtvqH+kx+gJPzD/vrJ+hFe8V5z+0nCg8L6dPtHmR3gjVu4VkYkfjtH5UAeW0U2Jt0Yp1ABRRRQAUUUUAFFFFABRRRQAUE4oooA7n4K+Cm1fWF1OZf9FsmzHn/AJaSdv8Avnr9ce9ev5rB+GMax+AtMCKFHlZOPUk5/Wt6gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK85/aY/5Emx/6/wBP/RclejV5Z+0/qTJp2j2ahdk00kzHuCgAH/oZ/KgDza2/1Y+lSVHbjEQqSgAooooAKKKKACiiigAooooAKKKKAPd/hVJ5vw+00/7DD8nYV0Ncd8DL17rwIsbY221xJGmPThv5sa7GgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAr3+rWukoGurq3tlbODLIEB/M147+0N4isfEGq6StjeWt4IEl3mGUSBSSvUg+1c78Yb+41/wCJWorLIzpav5ES9o1XsPxyfxrGttM8o570AW4hhKdSKNopaACiiigAooooAKKKKACiiigAooooA9a+AWowr4XurdpI1mW6ZtpYZ2lFwcfga75WDDI5HqK+Y7mHzkxXoH7N19NaapqGnmRmgaITqhPCMGAOPruH5UAeuUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUM4RSzHao5JPaiuB/aA8b/8I34TNjA2281TMYweUi/jP4/d/E+lAHkniDUY9Z8aapdwtvhuLqR42x1UscH8sUtUtKt/KSrtABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXTfCPWl0Tx1alztjus27H/AHun/jwFczQGZGDKxVlIKkdQaAPpjpRWP4F8UR+L/DVveKy+ZjZMo/gkHUf1+hFbFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUVzPjP4uaJ4JDR3Fz9oul/5doPnkz79l/EivKfF3x61zxQWiscaXatxiJszMPd+3/AcUAeveL/iVo/ghD9uvF87GRbx/PK3/AAHt9TgV4L428Vy/ELxfPqDK0cPEcEbH/VxjoPqeSfcmsuLTWmkZ5GZmY5YnksavW9qsIoAkiTYlOoooAKKKKACiiigAooooAKKKKACiiigAooooAKBRRQBueAfH03gHVzJtaazm4nhB5Pow/wBofrXtPhrxhpvi618ywuo5sDLJnEif7y9RXz0RkVCIpLW4Wa3lkhmQ5V42Ksp9iKAPp6ivEfC/x71nw/tj1BE1S3XjcfkmA/3hwfxGfevSvCXxZ0TxftjguhBcN/ywn/dyZ9uzfgTQB0lFHeigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiihnCKzMdqgZJJ4FABRXC+M/j9ovhndDasdUul42wN+7U+79PyzXlfi34q6946LRzXBtbRuPs9vlEI/2j1b8Tj2oA9e8Z/G/Q/CJeJZv7QvF48m3Ibaf9pug/U+1eVeLvjTr3jNmijk/s20bjyrckMw/2n6n8MD2rmrXSMfeq9FbLGKAKFtpOeWq7FaLEKmooAAMUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAIyB+tQT2CyirFFAGt4Z+KeveDtscdyby1X/AJYXOXAHseo/A49q9J8J/HvR9eKxXm7S7luMTHMRPs//AMVivICM1DLaLIKAPpyKZbiJXRldGGVZTkEfWnV83+G/Fur+Cpd2nXkkcecmFvmib/gJ4/EYNej+FP2irO8Kw6xbtYy9POjy8JPuPvL+v1oA9JoqHTtTt9XtFuLWeG4hf7rxuGU/iKmoAKKKKACiiigAooooAKKKKACiio7u8hsLZ5p5Y4YYxlnkYKqj3JoAkps06W0TSSOscaDLMxwqj3NeceMv2j9O0nfDpER1K4HHmHKQqf5t+GB715d4n8aa147mzqF3I8OcrAnyxL/wH+pyaAPWPGX7ROk6Duh01TqlyOModsKn3bv+Ax715X4q+ImuePXK3l0y2xORbxfJEPqOrf8AAs1n2ulKg5q4kKoOlAFG10kL1q5HbrGKkooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqOS3WQVJRQAaRquoeFrvz9Nu5rWTvsPyv9QeD+Ir0Twn+0Xt2w65a7e32m3HB/wB5P8M/SvO6a8KuKAPo7RPEFj4ksxcWN1DdQnqY2ztPoR1B9jVyvmOwnutCvRc2NxNazr0eNiufr6j2NegeE/2iZ7Vlh1y281en2mBcN9WTofwx9KAPXKKo6D4msPFNn9o0+6iuo++w8ofQjqD7Gr1ABRRRQAVFe3sOnWrzXE0cEMYy7yMFVR7k1znxL+KNn8OtPUyD7RfTA+TbqcZ/2m9F/n2rwrxR4w1b4gXvnahcM0YOUhX5Yo/ov9Tk+9AHqHjT9pGx00tBo0P9oTDjznysKn27t+g968u8ReKNY8dXPmajdyzKpysedscf0Ucfj1qG10xYxzVpYwtAFS20tU61bSJYxxTqKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmvErinUUAMsZrnRL1bqxuJrW4Xo8bbT9D6j2Nej+B/wBoNt8drr0e3sLuJeP+BqP5r+Ved014VcdKAPpa2uo723SaGRJYpFDK6HKsD3BqSvBfh38S7v4f3Ihbdc6ZI2Xh7x/7Se/t0P617jpGr2+u6bDd2sqzW8y7kYf56jpj1oA+dPiNdTa58SNYkmcyeVdPAuf4VRioA/AVXht1hWpPEJ8zxtrLf3r6Y/8AkQ0UAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUBcKKKKAuFFFFAXCiiigLhRRRQFwooooC4UUUUBcKKKKAuIwDDmvQP2fNamtdZutNZma3mjM6r/dcEA4+oP6CuArtPgR/yPJ/69n/AJrQB//Z';
      $scope.original = $scope.original ? $scope.original : angular.copy($scope.defaultImage);
      $scope.mode = $scope.mode ? $scope.mode : 'insert';
      $scope.display = $scope.display ? $scope.display : true;
      $scope.ngModel = $scope.ngModel && $scope.ngModel !== '' ? $scope.ngModel : $scope.defaultImage;

      $scope.openModal = function () {
        $uibModal.open({
          templateUrl: 'img-upload/img-upload-dialog.html',
          controller: 'OdsImgUploadDialogController',
          controllerAs: 'vm',
          backdrop: 'static',
          size: $scope.size ? $scope.size : 'lg',
          windowTopClass: 'custom-dialog-styles',
          resolve: {
            original: function () {
              return $scope.original;
            },
            ngModel: function () {
              return $scope.ngModel;
            },
            areaType: function () {
              return $scope.areaType ? $scope.areaType : 'square';
            },
            croppedImageSize: function () {
              return $scope.croppedImageSize ? $scope.croppedImageSize : 300;
            },
            defaultImage: function () {
              return $scope.defaultImage;
            }
          }
        }).result.then(function (result) {
          if (result && (typeof (result) === 'object')) {
            if ($scope.ngModel === null) {
              $scope.ngModel = {};
            }
            $scope.ngModel = result.model;
            $scope.original = result.original;
            $scope.onSave({result: result});
          }
        });
      };
    }
  }
})();

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

/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsParamsController', OdsParamsController);

    OdsParamsController.$inject = ['OdsReportsService', 'OdsParamType', 'report', '$uibModalInstance'];

    function OdsParamsController(OdsReportsService, OdsParamType, report, $uibModalInstance) {

        var vm = this;

        vm.clear = clear;
        vm.openReport = openReport;
        vm.paramType = OdsParamType;
        vm.report = report;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function openReport() {
            $uibModalInstance.close(vm.report);
        }
        
    }
})();

(function () {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsParamType', {
            'DATE': 'DATE',
            'TEXT': 'TEXT',
            'NUMBER': 'NUMBER',
            'LIST': 'LIST',
            'SINGLE_SELECT': 'SINGLE_SELECT',
            'MULTI_SELECT': 'MULTI_SELECT',
            'TABLE_SELECT': 'TABLE_SELECT',
            'DRAG_AND_DROP': 'DRAG_AND_DROP',
            'CHECK_LIST': 'CHECK_LIST'
        })
        .constant('OdsPageOrientation', {
            'PORTRAIT': 'Portrait',
            'LANDSCAPE': 'Landscape'
        });

})();

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
            forceDownloadAndOpenPDFObject: forceDownloadAndOpenPDFObject,
            forceDownloadFromData: forceDownloadFromData,
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
            var newBlob = new Blob([arrBuffer], {type: "application/pdf"});

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

        function forceDownloadFromData(data, title) {

            pdfMake.createPdf(data).download(title);
        }
    }

})();

'use strict';

angular
    .module('ods-lib')
    .directive('selectFiltered', selectFiltered);

selectFiltered.$inject = ['$filter'];

function selectFiltered($filter) {

    return {
        restrict: 'E',
        templateUrl: 'select-filtered/select-filtered.html',
        scope: {
            label: '@',
            name: '@',
            hideLabel: '=',
            placeholder: '@',
            ngModel: '=',
            titleProperty: '=?',
            ngDisabled: '=?',
            ngRequired: '=?',
            tooltip: '@',
            list: '=',
            filters: '=',
            onSelect: '&',
            renderStyle: '&?',
            render: '&?'
        },
        link: linkFunc

    };

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.toggleFilter = toggleFilter;
        $scope.getSelectTitleValue = getSelectTitleValue;
        $scope.onSelectFn = onSelectFn;
        $scope.renderClass = renderClass;

        init();

        function init() {

            var tmpModel = angular.copy($scope.ngModel);
            $scope.selected = {
                value : tmpModel ? tmpModel : null
            };
            $scope.ngDisabled = !!$scope.ngDisabled;
            $scope.ngRequired = !!$scope.ngRequired;
            $scope.titleProperty = $scope.titleProperty ? $scope.titleProperty : 'name';
            doFilter();
        }

        function doFilter() {

            $scope.filtered = angular.copy($scope.list);
            if ($scope.filters && $scope.filters.length > 0) {
                for (var i = 0; i < $scope.filters.length; i++) {
                    if ($scope.filters[i].active) {
                        // $scope.selected.value = null;
                        $scope.filtered = $filter('filter')($scope.filtered, $scope.filters[i].pattern, undefined);
                    }
                }
            }
        }

        function toggleFilter(filter) {

            filter.active = !filter.active;
            doFilter();
        }

        function getSelectTitleValue(element) {

            if (element && element.constructor !== Array) {
                if($scope.render){
                    return $scope.render()(element, $scope.titleProperty);
                }else {
                    return element[$scope.titleProperty];
                }
            } else {
                return $scope.placeholder;
            }
        }

        function onSelectFn() {

            if ($scope.onSelect) {
                $scope.onSelect();
            } else {
                console.log('You must to to define onSelect() function.');
            }
        }

        function renderClass(element) {

            if(element && $scope.renderStyle){
                return $scope.renderStyle()(element);
            }else {
                return '';
            }
        }

        $scope.$watch('selected', function (newValue) {

            $scope.ngModel = newValue.value;
        }, true);

        $scope.$watch('list', function () {

            doFilter();
        }, true);

    }
}

'use strict';

angular
    .module('ods-lib')
    .directive('odsSignature', odsSignature);

odsSignature.$inject = ['$timeout', 'OdsSignature'];

function odsSignature($timeout, OdsSignature) {

    var directive = {
        restrict: 'E',
        require: '?ngModel',
        templateUrl: 'signature/signature.html',
        scope: {
            model: '=ngModel',
            name: '@',
            options: '=?',
            disabled: '=ngDisabled',
            required: '=?ngRequired',
            onChange: '&'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element, attrs, controller) {

        var hideRequiredClass = 'sig-box-default';
        var showRequiredClass = 'sig-box-error';

        //If model not present we will exit.
        if ($scope.model === null) {
            console.error('Please define a model using "ng-model" attribute!!!');
            return;
        }

        $scope.reset = reset;

        init();

        function initOptions() {

            $scope.options = {
                width: 'ratio',
                height: 'ratio',
                color: '#00008B',
                'background-color': '#EEEEEE',
                lineWidth: 0,
                cssClass: ''
            };
        }

        function initElement() {

            $scope.element = $element.children('div').children('div').jSignature($scope.options);
            // $element.find('#sig').jSignature($scope.options);
            $scope.element.initialized = true;
            OdsSignature.register($scope.name, $scope.element);
        }

        function init() {

            //Init options
            if (!$scope.options) {
                initOptions();
            }

            //Init name
            if (!$scope.name) {
                $scope.name = OdsSignature.generateName();
            } else {
                if (OdsSignature.getInstance($scope.name)) {
                    console.error('Name already defined in another Signature instance, please pick another name!!!');
                    return;
                }
            }

            //Init required field
            $scope.requiredClass = hideRequiredClass;
            $scope.required = !!$scope.required;

            //Init Element
            initElement();
            //Set value
            // setValue();

            if ($scope.options.disabled) {
                OdsSignature.disable($scope.name, $scope.options);
            }

            //Init on change event
            $scope.element.bind('change', function () {

                    // $timeout, 100, true because event happens outside angular's digest cycle
                    // and change is called on setData
                    $timeout(function () {
                        var valid = isValid($scope.name);
                        if (valid) {
                            $scope.model = 'data:' +
                                OdsSignature.getData($scope.name, OdsSignature.exportTypes.IMAGE).join(',');
                        }
                    }, 100, true);
                    if ($scope.onChange) {
                        $scope.onChange();
                    }
                }
            );
        }

        function setValue() {

            if ($scope.model && $scope.model !== '') {
                // We set signature if it is present
                OdsSignature.setData($scope.name, $scope.model);
                hideRequired(true);
            }
        }

        function reset() {

            $scope.model = '';
            OdsSignature.reset($scope.name);
        }

        function isValid() {

            return OdsSignature.isValid($scope.name);
        }

        function hideRequired(state) {

            if (state) {
                $scope.requiredClass = hideRequiredClass;
            } else {
                $scope.requiredClass = showRequiredClass;
            }
            controller.$setValidity('required', state);
        }

        $scope.$watch('model', function (model, oldModel) {

            if ($scope.required && !isValid()) {
                hideRequired(false);
            } else {
                hideRequired(true);
            }
            setValue();
            return;
        });

        $scope.$watch('disabled', function (disabled) {

            if (disabled) {
                OdsSignature.disable($scope.name);
            } else {
                OdsSignature.enable($scope.name);
            }
            return;
        });

        $scope.$watch('required', function (required) {

            var valid = isValid($scope.name);
            if (required && !valid) {
                //We set this patch in case required option change and model is valid too
                if ($scope.model && $scope.model !== '') {
                    // We set signature if it is present
                    hideRequired(true);
                } else {
                    hideRequired(false);
                }
            } else {
                hideRequired(true);
            }
            return;
        });

        $scope.$on('$destroy', function () {
            OdsSignature.unregister($scope.name);
        });
    }
}
'use strict';

angular
    .module('ods-lib')
    .factory('OdsSignature', OdsSignature);

function OdsSignature() {

    // var apinamespace = 'jSignature';

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
    };

    var importTypes = {
        NATIVE: 'native',
        IMAGE: 'image',
        IMAGE_PNG_BASE64: 'image/png;base64',
        IMAGE_JPEG_BASE64: 'image/jpeg;base64',
        IMAGE_JPG_BASE64: 'image/jpg;base64'
    };

    var uniqueCounter = (+new Date()) % 10000;

    var instanceMap = {};

    var service = {
        exportTypes: exportTypes,
        importTypes: importTypes,
        register: register,
        getInstance: getInstance,
        unregister: unregister,
        reset: reset,
        isValid: isValid,
        getData: getData,
        setData: setData,
        disable: disable,
        enable: enable,
        generateName: generateName
        // setOptions: setOptions,
        // setReadOnly: setReadOnly,
        // initOptions: initOptions
    };

    return service;

    function register(name, instance) {

        instanceMap[name] = instance;
    }

    function getInstance(name) {

        if (instanceMap[name]) {
            return instanceMap[name];
        } else {
            return false;
        }
    }

    function unregister(name) {

        instanceMap[name] = null;
    }

    function generateName() {

        uniqueCounter++;
        return 'signature' + uniqueCounter;
    }

    function reset(name) {

        var element = getInstance(name);
        if (element) {
            element.jSignature('reset');
        }
    }

    function isValid(name) {

        var d = getData(name, exportTypes.NATIVE);
        if (d.length >= 1) {
            return true;
        } else {
            return false;
        }
    }

    function getData(name, type) {

        var element = getInstance(name);
        if (element) {
            return element.jSignature('getData', type);
        } else {
            return false;
        }
    }

    // function getDataAsSVG(name) {
    //
    //     var element = getInstance(name);
    //     var svg = element.jSignature('getData', 'svg');
    //     return svg;
    // }
    //
    // function getDataAsBase30(name) {
    //
    //     var element = getInstance(name);
    //     if (element) {
    //         var svg = element.jSignature('getData', 'svg');
    //         return svg;
    //     } else {
    //         return false;
    //     }
    // }

    function setData(name, model) {

        reset(name, model);
        var element = getInstance(name);
        if (element && model && model !== '') {
            element.jSignature('setData', model);
        }
    }

    function disable(name) {

        var element = getInstance(name);
        if (element) {
            element.jSignature('disable');
        }
    }

    function enable(name) {

        var element = getInstance(name);
        if (element) {
            element.jSignature('enable');
        }
    }

    // function undo(name) {
    //
    //     var eventName = apinamespace + '.undo';
    //     var element = getInstance(name);
    //     if (element) {
    //         element.jSignature('events');
    //     }
    // }
}
(function() {
    'use strict';

    angular
        .module('ods-lib')
        .factory('OdsDateUtils', OdsDateUtils);

    OdsDateUtils.$inject = ['$filter'];

    function OdsDateUtils ($filter) {

        var service = {
            convertDateTimeFromServer : convertDateTimeFromServer,
            convertLocalDateFromServer : convertLocalDateFromServer,
            convertLocalDateToServer : convertLocalDateToServer,
            dateformat : dateformat,
            formatter: formatter
        };

        return service;

        function convertDateTimeFromServer (date) {
            if (date) {
                return new Date(date);
            } else {
                return null;
            }
        }

        function convertLocalDateFromServer (date) {
            if (date) {
                var dateString = date.split('-');
                return new Date(dateString[0], dateString[1] - 1, dateString[2]);
            }
            return null;
        }

        function convertLocalDateToServer (date) {
            if (date) {
                return $filter('date')(date, 'yyyy-MM-dd');
            } else {
                return null;
            }
        }

        function formatter(date, format) {
            if (date) {
                return $filter('date')(date, format);
            } else {
                return null;
            }
        }

        function dateformat () {
            return 'yyyy-MM-dd';
        }
    }

})();

'use strict';

angular
    .module('ods-lib')
    .factory('odsDymo', OdsDymo);

OdsDymo.$inject = ['XMLConfig', 'Base64', 'moment'];

function OdsDymo(XMLConfig, Base64, moment) {

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

    var printersSelect = '';
    var orderTemplate;
    var envOrdertemplate;

    loadPrinters();

    return service;

    function loadPrinters() {
        var printers = dymo.label.framework.getLabelWriterPrinters();
        if (printers.length === 0) {
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
        orderTemplate.setObjectText('dob', moment(data.dob).format('MM/DD/Y'));
        orderTemplate.setObjectText('collectedDate', moment(data.collectedDate).format('MM/DD/Y'));
        orderTemplate.setObjectText('tube', data.tube);

        orderTemplate.print(printersSelect);
    }

    function printEnvOrderLabel(data) {
        if (!envOrdertemplate) {
            loadDefaultDYMOEnvOrderTemplate();
        }

        envOrdertemplate.setObjectText('barcode', data.barcode);
        envOrdertemplate.setObjectText('name', data.machine);
        envOrdertemplate.setObjectText('collectedDate', moment(data.collectedDate).format('MM/DD/Y'));
        envOrdertemplate.setObjectText('tube', data.tube);

        envOrdertemplate.print(printersSelect);
    }

    function loadDefaultDYMOOrderTemplate() {
        XMLConfig.patient().$promise.then(function (data) {
            orderTemplate = dymo.label.framework.openLabelXml(Base64.decode(data.file.replace('77u/', '')));
        }, function () {
            orderTemplate = dymo.label.framework.openLabelXml('<?xml version="1.0" encoding="utf-8"?><DieCutLabel Version="8.0" Units="twips"><PaperOrientation>Landscape</PaperOrientation><Id>Address</Id><IsOutlined>false</IsOutlined><PaperName>30252 Address</PaperName><DrawCommands><RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" /></DrawCommands><ObjectInfo><BarcodeObject><Name>barcode</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>True</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><Text>1234567890</Text><Type>Code128Auto</Type><Size>Medium</Size><TextPosition>Bottom</TextPosition><TextFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><CheckSumFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><TextEmbedding>None</TextEmbedding><ECLevel>0</ECLevel><HorizontalAlignment>Center</HorizontalAlignment><QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" /></BarcodeObject><Bounds X="331" Y="150.600006103516" Width="2672" Height="750" /></ObjectInfo><ObjectInfo><TextObject><Name>name</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Jhon Doe</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1601" Y="953" Width="1940" Height="230" /></ObjectInfo><ObjectInfo><TextObject><Name>dob</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="751" Y="1178" Width="870" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>collectedDate</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="738.000000000001" Y="953" Width="870.000000000002" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>compendium</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">test te test</String><Attributes><Font Family="Tahoma" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1998" Y="1163" Width="2250" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">COL:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="953" Width="445.000000000001" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO_____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Test:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1606" Y="1178" Width="435.000000000001" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO__2</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">DOB:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="1178" Width="584.999999999999" Height="270" /></ObjectInfo></DieCutLabel>');
        });
    }

    function loadDefaultDYMOEnvOrderTemplate() {
        XMLConfig.environmental().$promise.then(function (data) {
            envOrdertemplate = dymo.label.framework.openLabelXml(Base64.decode(data.file.replace('77u/', '')));
        }, function () {
            envOrdertemplate = dymo.label.framework.openLabelXml('<?xml version="1.0" encoding="utf-8"?><DieCutLabel Version="8.0" Units="twips"><PaperOrientation>Landscape</PaperOrientation><Id>Address</Id><IsOutlined>false</IsOutlined><PaperName>30252 Address</PaperName><DrawCommands><RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" /></DrawCommands><ObjectInfo><BarcodeObject><Name>barcode</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>True</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><Text>1234567890</Text><Type>Code128Auto</Type><Size>Medium</Size><TextPosition>Bottom</TextPosition><TextFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><CheckSumFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><TextEmbedding>None</TextEmbedding><ECLevel>0</ECLevel><HorizontalAlignment>Center</HorizontalAlignment><QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" /></BarcodeObject><Bounds X="331" Y="150.600006103516" Width="2672" Height="580" /></ObjectInfo><ObjectInfo><TextObject><Name>name</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Jhon Doe</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="798" Width="1740" Height="220" /></ObjectInfo><ObjectInfo><TextObject><Name>collectedDate</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="753.000000000001" Y="998" Width="1290" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>tube</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">test te test</String><Attributes><Font Family="Tahoma" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="332.999999999999" Y="1223" Width="2250" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">COL:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="1013" Width="945" Height="270" /></ObjectInfo></DieCutLabel>');
        });
    }

    function testPatientLabel(xml) {
        var template;
        if (xml) {
            template = dymo.label.framework.openLabelXml(Base64.decode(xml.replace('77u/', '')));
        } else {
            template = orderTemplate;
        }

        template.setObjectText('barcode', 'P000001');
        template.setObjectText('name', 'Jhon Doe');
        template.setObjectText('dob', moment(new Date()).format('MM/DD/Y'));
        template.setObjectText('collectedDate', moment(new Date()).format('MM/DD/Y'));
        template.setObjectText('tube', 'Some tube name');

        template.print(printersSelect);
    }

    function testEnvironmentalLabel(xml) {
        var template;
        if (xml) {
            template = dymo.label.framework.openLabelXml(Base64.decode(xml.replace('77u/', '')));
        } else {
            template = envOrdertemplate;
        }

        template.setObjectText('barcode', 'E000001');
        template.setObjectText('name', 'TheMachinen');
        template.setObjectText('collectedDate', moment(new Date()).format('MM/DD/Y'));
        template.setObjectText('tube', 'Some tube name');

        template.print(printersSelect);
    }
}
'use strict';

angular
    .module('ods-lib')
    .service('EventDataFactory', EventDataFactory);

EventDataFactory.$inject = [];

function EventDataFactory() {

    var observersMap = {};
    var dataMap = {};

    var registerObserver = function (name, observer) {

        if (!Array.isArray(observersMap[name])) {
            observersMap[name] = [];
        }
        observersMap[name].push(observer);
    };

    var unRegisterObserver = function (name, observer, key) {

        if (Array.isArray(observersMap[name])) {
            var index = search(key, observer[key], observersMap[name]);
            observersMap[name].splice(index, 1);
        }
    };

    function search(key, value, list) {

        for (var i = 0; i < list.length; i++) {
            if (list[i][key] === value) {
                return i;
            }
        }
    }

    var notifyObservers = function (name) {

        for (var index = 0; index < observersMap[name].length; ++index)
            observersMap[name][index]["on" + name.replace(/^./, function (str) {
                return str.toUpperCase();
            })](dataMap[name]);
    };

    var setData = function (name, data) {

        dataMap[name] = data;
        notifyObservers(name);
    };

    var getData = function (name) {

        if (dataMap[name]) {
            return dataMap[name];
        } else {
            return null;
        }
    };

    return {

        registerObserver: registerObserver,
        unRegisterObserver: unRegisterObserver,
        setData: setData,
        getData: getData
    };
}

'use strict';

angular
    .module('ods-lib')
    .factory('ModalEntity', ModalEntity);

ModalEntity.$inject = ['$uibModal'];

function ModalEntity($uibModal) {

    var service = {
        openModalEntity: openModalEntity
    };

    return service;

    /**
     * Return a Action Template for grid bootstrap based
     * @param templateUrl Template URL
     * @param controller Controller name
     * @param controllerAs Controller as name.
     * @param size Modal size.
     * @param entity Entity Resolver.
     * @param translateNames Array of Translates Names to include
     * @returns
     */
    function openModalEntity(templateUrl, controller, controllerAs, size, entity, translateNames) {

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
                    translatePartialLoader: ['$translate', '$translatePartialLoader',
                        function ($translate, $translatePartialLoader) {

                            if (translateNames && translateNames.length > 0) {
                                for (var i = 0; i < translateNames; i++) {
                                    $translatePartialLoader.addPart(translateNames[i]);
                                    $translatePartialLoader.addPart(translateNames[i]);
                                }
                            }
                            return $translate.refresh();
                        }]
                }
            }
        ).result;
    }
}
'use strict';

angular
    .module('ods-lib')
    .service('OdsUtils', OdsUtils);

function OdsUtils() {

    var statusTypes = ['default', 'danger', 'primary', 'success', 'info', 'warning'];
    var uniqueCounter = (+new Date()) % 10000;

    var service = {
        generateName: generateName,
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
     * Generate object name.
     * @param baseName Object base name.
     * @returns {String}
     */
    function generateName(baseName) {

        uniqueCounter++;
        return baseName + uniqueCounter;
    }

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
                    stButtons += '<a class="btn-sm btn-primary" ui-sref="' + entity + '-detail({id:' + data.id + '})" href="#/' + entity + '/' + data.id + '">' +
                        '   <i class="glyphicon glyphicon-eye-open"></i></a>&nbsp;';
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
                    if (stButtons.length !== 0) {
                        stButtons += '&nbsp;';
                    }

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
        if (index !== -1) {
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
            if (weekCode[i] !== '0') {
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
            if (weekCode.charAt(i) === '1') {
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
            code = code.split('');

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

            return code.join('');
        }

        return code;
    }

    function getMonths() {
        return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    }

    function monthsCodeStringToMonths(monthCode) {
        var days = [];
        for (var i = 0; i < monthCode.length; i++) {
            if (monthCode.charAt(i) === '1') {
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
            code = code.split('');

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

            return code.join('');
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
            params.push(key.toLowerCase() + '=' + window.encodeURIComponent(value));
        });
        if (params.length > 0) {
            link += '?' + params.join('&');
        }
        link += '">' + recepient + '</a>';
        return link;
    }

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
        return '/9j/4AAQSkZJRgABAQEAYABgAAD/4QHGRXhpZgAATU0AKgAAAAgABFEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAGAAAAAPlEDAAEAAAABAAAAAAAAAADn5+fBwcHAwMC/v7+5ubm8vLzm5ubo6Oi+vr64uLi9vb27u7u6urq3t7fCwsLAwsHCwMHk5OTl5eW2trbf39/V1dXOzs7h4eHj4+Pi4uLa2trFxcXPz8/S0tLc3NzHx8fLy8vW1tbIyMjDw8PKysrExMTX19fMzMzZ2dnR0dHe3t7d3d3Nzc3Q0NDg4ODU1NTGxsbY2NjT09PBwb/b29vBwcPJycnCwb/BwL7Bv8DAwcPCwMPAwr+/wcDCwsDBw8LCwsTBw8C6uLng3t/DwcTBwMXEwL+/wb7AwcXAwMLCwb3b293i4+Xd3tnf4eDBwsTZ3d7AwL68vLrZ3dy7vbzo6Oq9uLzDwcLb29nn5+W5t7i8urvj4eK4ure/w8LFwMS+w7/c2tu5ubvBv8Tn5+nDwsDp5+jp6em7u726vLkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAF/AX8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorH8aeOdP8C6W1zfTBWIPlRKcyTH0A/r0FeT6X+0drU2rxNcQ2K2TTDzAI23LHu5wc9QO+KAPcKKRHWRAykMrDII7iloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiqer+ItP0CPdfXlraLjP72UJn6Z60AXKK4PXf2ivD+lblt2udRkHQQx7Vz7s2P0BriPEP7RutauGTT7eDTY243f62T8z8v6UAe06xrtn4etDcX11Dawj+KR9ufYep9hXmHjb9pRFDW+gweY3T7TOuFH+6vU/U4+hrzC+kvfEF59ovrme6mb+KVyx/DPT6VNb6csYoAjvri88S6i13f3E1zcSdXkbP4D0HsOKsQ2ixLipVUJ0paAPZvgn4q/t7wqLWVs3GmkRHJ5KfwH8hj/gNdlmvAfh94qbwd4pt7ot/o7nypx6oep/Dg/hXvwbeNw5B5B9aACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqG/v4NLs5Li5mjt4Yhl5JGCqo9ya8r8b/tJBXa30CASEcfaplO3/gKf1P5UAer3FzHaQtJNJHFGoyzOwVR+JrmtV+M3hnR2ZZNWglZe0Aab9VBH614HrGr6p4tuvO1G8uLps5AdvlX6L0H4CmRaQAOeaAPXtT/ab0e24tbK/um7Fgsan8ck/pXN6t+0tq95kWOn2dqvrIWlYfjwP0ri005F7VKtsq0AW9U+JfifXwwm1a6jVv4YSIR9PlA/WsT+zZLiQySM0jtyWY5JrSEajtTqAKcWlKvarCWqp2qSigAAxRRRQAUUUUABG4Yr6A+Ht0954I0uSTlvs6qSe+Bj+lfP+M17r8J9Rj1DwHY+WwLQqYnH91ge/wCGD+NAHR0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVj+NfG9j4E0dry+kx/DFEv35m9FH9egrSv76LTLGa4ncRw26GR2PRVAyTXzX418W3PxF8TyXsxZYQdkERPESdh9T1J9aAJPG3xA1P4lahuuW8q0RsxWyH5I/c/3m9z+nSqNppyxjkVNbWywp0qagBqoFHFOoooAKKKKACiiigAooooAKKKKACiiigArofhv49fwNrm6Qs2n3RCzqP4fRx7j9R+Fc9Qw3DFAH0rbXEd3bxyxOskcihkZTlWB6EU+vJPgn8Q20u8XRb1z9mnbFs5/wCWTn+H6Ht6H68et0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwf7RWsyaZ8P/JjyPt9wkDEf3cFj+e0D8TXi+m2wSKvXP2mRnwjp/8A1/L/AOgPXldsMRCgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooADkEMpKspyCOxr6G8Ias2u+F7C8b/AFk8Cs/+9jn9c18817x8LTnwBpn/AFzP/oRoA6CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA83/AGmP+RR0/wD6/l/9AevK7b/UrXq/7S0e7wXYt/dv0z7fI9eUW3+pWgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK96+GS7PAWl/8AXHP6mvBa+g/A1ubXwZpaH732WMkemVBoA1aKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDn/inp0OpfD7VlmjWRYbZ5lz/CyKWBH4ivAbKTfEPpX0R48XzPA+sr/esZx/5DavnLSz+5WgC3RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOij82VVHViBX0pBCttCka/djUKPoK+b9PG6/gHrIv86+kqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAzvGCeZ4S1Rf71pKP8Axw182aUf3Qr6Y8Rr5nh6/X+9byD/AMdNfM2knMdAF2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAktZPJuo37KwP619KCvmc8ivffhxqr614I064kJaRotjE9WKkrn8cUAbdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRQaAMPx/4w0/whoEr303l/aEaOJANzyNjsPxHPQV876T/q61Pih4jm8aePbyR2P2e1kNvAvZUUkfqcn8faqdtB5KUASUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXuvwlRY/h7poVg3yuSR6l2J/nXhVeifs/wCvzJql3pbNut2jNwgP8DAgHH1yPyoA9UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPmnxFZfYfGurQ/8APO8lA+m84ptbHxcsP7O+KOpDHyzlJl98oM/qDWPQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXYfA1tvjtf8AagkH16GuPrtPgRAZfG7N/wA8rZ2P5qP60AeyUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHjv7R2l/Z/E+m3wHy3MBhJHqjZ/k/6VxKnKivcPi34Jbxt4UaOAZvLV/OgH94gEFfxH6gV4cEaFmjkVo5IztZWGCp7gigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0b9nqwLX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';
    }

    function getDefaultUserPictureContentType() {
        return 'image/jpeg';
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
    .directive('stepsIndicator', StepsIndicator);

StepsIndicator.$inject = [];

/**
 *  steps = [
 *    {
 *        name: 'DRAFT',
 *        label: 'Draft',
 *        status: 'active',
 *        disabled: false,
 *        callback: function (elem, index) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'READY',
 *        label: 'Ready',
 *        status: '',
 *        disabled: true,
 *        callback: function (elem, index) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'JOINED',
 *        label: 'Joined',
 *        status: '',
 *        disabled: false,
 *        callback: function (elem, index) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'DISCHARGED',
 *        label: 'Discharged',
 *        status: '',
 *        callback: function (elem, index) {
 *            // Prompt for status change
 *        }
 *    }];
 *
 *
 *
 * @returns {{restrict: string, templateUrl: string, scope: {ngModel: string, class: string, type: string}, link: linkFunc}}
 * @constructor
 */

function StepsIndicator() {

    var directive = {
        restrict: 'E',
        templateUrl: 'steps-indicator/template.html',
        scope: {
            ngModel: '=',
            class: '@',
            type: '@'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.onClick = onClick;

        function onClick(elem, index) {

            if (elem.callback) {
                elem.callback(elem, index);
            }

            // if ($scope.type === 'multiselect') {
            //     if (elem.callback) {
            //         elem.callback(elem);
            //     }
            // } else {
            //     if (elem.callback) {
            //         for (var i = 0; i < $scope.ngModel.length; i++) {
            //             $scope.ngModel[i].status = '';
            //         }
            //         elem.callback(elem);
            //     }
            // }
            // var elementPos = $scope.ngModel.map(function(x) {return x.name; }).indexOf(elem.name);
            // $scope.ngModel[elementPos].status = 'active';
        }
    }
}
//
// Copyright Kamil Pękala http://github.com/kamilkp
// autoheight v0.0.1
//
(function (window, document, angular) {

    'use strict';
    /* jshint eqnull:true */
    /* jshint -W041 */

    if (angular == null) throw new Error('Angular is not defined!');
    angular
        .module('ods-lib')
        .directive('autoheight', Autoheight);

    Autoheight.$inject = ['$sniffer'];

    function Autoheight($sniffer) {

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attr, ctrl) {
                var node = element[0];
                var lineHeight = getLineHeight(node);

                // user input, copy, paste, cut occurrences
                element.on('input', adjust);
                element.on('change', adjust);

                if (ctrl) {
                    // view value changed from ngModelController - textarea content changed via javascript
                    scope.$watch(function () {
                        return ctrl.$viewValue;
                    }, adjust);
                }

                // element became visible
                scope.$watch(function () {
                    // element is visible if at least one of those values is not 0
                    return node.offsetHeight || node.offsetWidth;
                }, function (newVal, oldVal) {
                    if (newVal && !oldVal)
                        adjust();
                });

                // initial adjust
                adjust();

                // forced adjustment
                scope.$on('autoheight-adjust', adjust);

                function adjust() {
                    if (isNaN(lineHeight)) lineHeight = getLineHeight(node);
                    if (!(node.offsetHeight || node.offsetWidth)) return;
                    if (node.scrollHeight <= node.clientHeight)
                        node.style.height = '0px';
                    var h = node.scrollHeight + // actual height defined by content
                        node.offsetHeight - // border size compensation
                        node.clientHeight; //       -- || --
                    node.style.height = Math.max(h, lineHeight) +
                        ($sniffer.msie && lineHeight ? lineHeight : 0) + // ie extra row
                        'px';
                }
            }
        };
    }

    function getLineHeight(node) {
        var computedStyle = window.getComputedStyle(node);
        var lineHeightStyle = computedStyle.lineHeight;
        if (lineHeightStyle === 'normal') return +computedStyle.fontSize.slice(0, -2);
        else return +lineHeightStyle.slice(0, -2);
    }

    angular.element(document.head).append(
        '<style>[autoheight]{overflow: hidden; resize: none; box-sizing: border-box;}</style>'
    );

})(window, document, window.angular);

(function () {
    'use strict';

    angular
        .module('ods-lib')
        .directive('odsFileUpload', odsFileUpload);

    odsFileUpload.$inject = ['$q'];

    function odsFileUpload($q) {

        var slice = Array.prototype.slice;

        var directive = {
            restrict: 'A',
            require: '?ngModel',
            onLoad: '&',
            link: linkFunc
        };

        return directive;

        /* private helper methods*/

        function linkFunc($scope, element, attrs, ngModel) {

            if (!ngModel) return;

            // ngModel.$render = function () {
            // };
            element.bind('change', function (e) {
                var element = e.target;

                $q.all(slice.call(element.files, 0).map(readFile))
                    .then(function (values) {
                        if (element.multiple) ngModel.$setViewValue(values);
                        else ngModel.$setViewValue(values.length ? values[0] : null);
                    });

                function readFile(file) {
                    var deferred = $q.defer();

                    var reader = new FileReader();

                    reader.onload = function (e) {
                        if ($scope.onLoad) {
                            $scope.onLoad(e.target.result);
                        }
                        deferred.resolve(e.target.result);
                    };

                    reader.onerror = function (e) {
                        deferred.reject(e);
                    };

                    reader.readAsDataURL(file);

                    return deferred.promise;
                }
            }); //change
        } //link
    }
})();

(function() {
    'use strict';

    angular
        .module('ods-lib')
        .filter('ssn', ssn);

    function ssn() {

        return ssnFilter;

        function ssnFilter(ssn) {
            if (!ssn) { return ''; }
            var value = ssn.toString().trim().replace(/^\+/, '');
            if (value.match(/[^0-9]/)) { return ssn; }
            var three = value.slice(0, 3);
            var six = value.slice(3);
            if (six) {
                if(six.length > 2) { six = six.slice(0, 2) + '-' + six.slice(2,6); }
                return (three + '-' + six).trim();
            } else {
                return three;
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('ods-lib')
        .directive('uiSelectRequired', UiSelectRequired);

    UiSelectRequired.$inject = ['$parse'];

    function UiSelectRequired($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                //console.log($scope.required);
                scope.required = $parse(attrs.uiSelectRequired)(scope);//JSON.parse(attrs.ngRequired);

                ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {

                    if (scope.required) {
                        var determineVal;
                        if (angular.isArray(modelValue)) {
                            determineVal = modelValue;
                        } else if (angular.isArray(viewValue)) {
                            determineVal = viewValue;
                        } else return !isEmpty(modelValue);
                        return determineVal.length > 0;
                    } else {
                        return true;
                    }
                };
            }
        };
    }

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
})();

(function () {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsWizardState', {
            CURRENT: 'current',
            DONE: 'done',
            ERROR: 'error',
            DISABLED: 'disabled'
        });

})();

'use strict';

angular
    .module('ods-lib')
    .directive('wizardSteps', wizardSteps);

wizardSteps.$inject = [];

/**
 *  steps = [
 *    {
 *        name: 'DRAFT',
 *        label: 'Draft',
 *        status: 'active',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'READY',
 *        label: 'Ready',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'JOINED',
 *        label: 'Joined',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    },
 *    {
 *        name: 'DISCHARGED',
 *        label: 'Discharged',
 *        status: '',
 *        callback: function (elem) {
 *            // Prompt for status change
 *        }
 *    }];
 *
 *
 *
 * @returns {{restrict: string, templateUrl: string, scope: {ngModel: string, class: string, type: string}, link: linkFunc}}
 * @constructor
 */

function wizardSteps() {

    var directive = {
        restrict: 'E',
        templateUrl: 'wizard-steps/wizard-steps.html',
        scope: {
            ngModel: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.nextStep = nextStep;


        function nextStep() {



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
        .factory('OdsWizardService', OdsWizardService);

    OdsWizardService.$inject = ['OdsWizardState'];

    function OdsWizardService(OdsWizardState) {

        var service = {

            setEnable: setEnable,
            setDisable: setDisable,
            setDone: setDone,
            setCurrent: setCurrent,
            setError: setError,
            goToStep: goToStep

        };

        function goToStep(steps, index) {

            if (steps.length > index) {
                if (steps[index].status !== OdsWizardState.DISABLED) {
                    setDone(steps[index - 1]);
                    setCurrent(steps[index]);
                    keepDone(steps, index);
                }
            }
        }

        function setEnable(step) {

            if (step) {
                step.status = "";
            }
        }

        function setDisable(step) {

            if (step) {
                step.status = OdsWizardState.DISABLED;
            }
        }

        function setDone(step) {

            if (step) {
                step.status = OdsWizardState.DONE;
            }
        }

        function setCurrent(step) {

            if (step) {
                step.status = OdsWizardState.CURRENT;
            }
        }

        function setError(step) {

            if (step) {
                step.status = OdsWizardState.ERROR;
            }
        }

        function keepDone(steps, index) {

            for (var i = index; i < steps.length; i++) {
                if(steps[index].status === OdsWizardState.DONE){
                    setDone(steps[index]);
                }
            }
        }

        return service;
    }
})();

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFormInfo', OdsFormInfoDirective);

OdsFormInfoDirective.$inject = [];

function OdsFormInfoDirective() {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form-info/form-info.html',
        scope: {
            schema: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.view = '-schema';

        $scope.getUniqueName = getUniqueName;

        /**
         * Return an unique name to avoid fields name collisions.
         * @returns {boolean}
         */
        function getUniqueName(field) {
            return field.name ? field.name + $scope.view : $scope.view;
        }
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsDynamicName', DynamicNameDirective);

DynamicNameDirective.$inject = ['$compile', '$parse'];

function DynamicNameDirective($compile, $parse) {

    return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function (scope, elem) {
            var name = $parse(elem.attr('ods-dynamic-name'))(scope);
            // $interpolate() will support things like 'skill'+skill.id where parse will not
            elem.removeAttr('ods-dynamic-name');
            elem.attr('name', name);
            $compile(elem)(scope);
        }
    };
}

(function () {
  'use strict';

  angular
    .module('ods-lib')
    .constant('OdsFieldType', {
      DATETIME: 'datetime',
      TEXT: 'text',
      NUMBER: 'number',
      PASSWORD: 'password',
      TEXTAREA: 'textarea',
      TOGGLE: 'toggle',
      SELECT: 'select',
      SELECT2: 'select2',
      MULTI_SELECT: 'multiselect',
      IF_YES: 'if_yes',
      IF_YES_CHECKBOX: 'if_yes_checkbox',
      IF_YES_RADIO: 'if_yes_radio',
      TABLE: 'table',
      LABEL: 'label',
      GRID_RENDER: 'grid_render',
      CHECKBOX: 'checkbox',
      CHECKBOX_LIST: 'checkboxlist',
      RADIO: 'radio',
      CKEDITOR: 'ckeditor',
      CANVAS_PAINTER: 'canvas_painter',
      OPTIONS_TEXTAREA: 'options_textarea'
      // You can add your new field types
    })
    .constant('OdsComponentType', {
      FORM: 'form', // Do not edit this type
      SECTION: 'section', // Do not edit this type
      ROW: 'row', // Do not edit this type
      COLUMN: 'column', // Do not edit this type
      FIELD: 'field', // Do not edit this type
      PLUGIN: 'plugin', // Do not edit this type
      ITEM: 'ITEM' // Do not edit this type
    })
    .constant('OdsDateTimeFormat', {
      FullDate: 'fullDate',
      LongDate: 'longDate',
      Medium: 'medium',
      MediumDate: 'mediumDate',
      MediumTime: 'mediumTime',
      Short: 'short',
      ShortDate: 'shortDate',
      ShortTime: 'shortTime',
      ISO8601Long: 'MM/dd/yyyy HH:mm:ss',
      // ISO8601Short:'Y-m-d',
      ShortDateLongYear: 'MM/dd/yyyy'
      // FullDateTime: 'l, F d, Y g:i:s A',
      // MonthDay: 'F d',
      // LongTime: 'g:i:s A',
      // UniversalSortableDateTime: 'Y-m-d H:i:sO',
      // YearMonth: 'F, Y'
    })
    .constant('OdsEvent', {
      IMPORT_FORM: 'importForm',
      EXPORT_FORM: 'exportForm',
      LOAD_SUB_FORM: 'loadSubForm'
    })
    .constant('OdsPosition', {
      TOP: 'top',
      DOWN: 'down'
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

    OdsFormService.$inject = ['OdsFieldType', 'OdsComponentType', 'OdsDateTimeFormat', '$window', 'dialogs',
      '$resource', 'OdsPosition', 'EventDataFactory', 'OdsEvent'];

    function OdsFormService(OdsFieldType, OdsComponentType, OdsDateTimeFormat, $window, dialogs,
                            $resource, OdsPosition, EventDataFactory, OdsEvent) {

      var uniqueCounter = (+new Date()) % 10000;
      var version = '1.0';
      var formats = {
        JSON: 'json'
      };

      var clipBoard = [];
      var callbacks = [];

      var service = {

        //Utils methods
        newSchema: newSchema,
        newSchemaEmpty: newSchemaEmpty,
        initSchema: initSchema,
        generateName: generateName,
        onAdd: onAdd,
        getFieldValueAsNumber: getFieldValueAsNumber,
        copyToClipboard: copyToClipboard,
        strSubtitutor: strSubtitutor,
        restResource: restResource,
        getClipBoard: getClipBoard,
        setClipBoard: setClipBoard,
        addToClipBoard: addToClipBoard,
        onAddToClipBoard: onAddToClipBoard,
        renameComponent: renameComponent,
        importForm: importForm,
        exportForm: exportForm,
        importSubForm: importSubForm,
        downloadObjectAsJson: downloadObjectAsJson,
        loadSubForm: loadSubForm,
        checkUpload: checkUpload,
        getExportables: getExportables,

        //Section specific
        cloneSection: cloneSection,

        //Templates management
        getToolbarComponent: getToolbarComponent,
        getSchemaField: getSchemaField,
        getSchemaFieldProperties: getSchemaFieldProperties,
        getFormFieldTemplate: getFormFieldTemplate,
        getFormViewerTemplate: getFormViewerTemplate,

        getValidationPatterns: getValidationPatterns,
        getDateTimeFormats: getDateTimeFormats,
        newSectionObject: newSectionObject,
        newRowObject: newRowObject,
        newColumnObject: newColumnObject,

        //Fields creation methods
        newFieldTextObject: newFieldTextObject,
        newFieldNumberObject: newFieldNumberObject,
        newFieldPasswordObject: newFieldPasswordObject,
        newFieldTextareaObject: newFieldTextareaObject,
        newFieldSelectObject: newFieldSelectObject,
        newFieldSelect2Object: newFieldSelect2Object,
        newFieldMultiSelectObject: newFieldMultiSelectObject,
        newFieldToggleObject: newFieldToggleObject,
        newDateTimeObject: newDateTimeObject,
        newFieldLabelObject: newFieldLabelObject,
        newFieldCheckBoxObject: newFieldCheckBoxObject,
        newFieldCheckBoxListObject: newFieldCheckBoxListObject,
        newFieldRadioListObject: newFieldRadioListObject,

        //Fields plugins creation methods
        newYesNoObject: newYesNoObject,
        newYesNoCheckboxObject: newYesNoCheckboxObject,
        newYesNoRadioObject: newYesNoRadioObject,
        newOptionsTextAreaObject: newOptionsTextAreaObject,
        newTableObject: newTableObject,
        newItemObject: newItemObject,
        newGridRenderObject: newGridRenderObject,
        newCKEditorObject: newCKEditorObject,
        newCanvasPainterObject: newCanvasPainterObject,

        //Select utils methods
        getSelectFieldId: getSelectFieldId,
        getSelectFieldTitle: getSelectFieldTitle,
        getSelectFieldTitleValue: getSelectFieldTitleValue,
        getSelectFieldIdValue: getSelectFieldIdValue,

        //Table field specific
        removeRow: removeRow,
        removeColumn: removeColumn,
        cloneRow: cloneRow,

        //CKEditor field specific
        setConfigToCKEditorComponent: setConfigToCKEditorComponent,
        defaultCKEditorPrefix: defaultCKEditorPrefix,
        defaultCKEditorSuffix: defaultCKEditorSuffix,

        //Options-textarea
        createOptionsGroup: createOptionsGroup,

        getTimeZoneUTC: getTimeZoneUTC,
        convertFormSchema: convertFormSchema,
        convertFormSchemaFromServer: convertFormSchemaFromServer,
        setReadOnlyStatus: setReadOnlyStatus,
        copyJson: copyJson,
        getDataFromComponentCode: getDataFromComponentCode,
        saveFormData: saveFormData,
        saveFormSchema: saveFormSchema
      };

      /**
       * Create a new Schema.
       */
      function newSchema() {
        return {
          name: generateName(OdsComponentType.FORM),
          label: 'New Form',
          hideLabel: true,
          description: 'New Form Description',
          layout: [newSectionObject()],
          allowedTypes: [OdsComponentType.SECTION]
        };
      }

      /**
       * Create a new Schema.
       */
      function newSchemaEmpty() {
        return {
          name: generateName(OdsComponentType.FORM),
          label: 'New Form',
          hideLabel: true,
          description: 'New Form Description',
          layout: [],
          allowedTypes: [OdsComponentType.SECTION]
        };
      }

      /**
       * Import Schema.
       */
      function importForm(file) {

        var base64result = file.substr(file.indexOf(',') + 1);
        var decodedString = atob(base64result);
        if (decodedString && decodedString !== '') {
          var loadedFile = angular.fromJson(decodedString);
          loadedFile.form = convertFormSchema(loadedFile.form);
          return loadedFile;
        } else {
          console.error('Not valid JSON file!!!');
        }
      }

      /**
       * Export Schema.
       */
      function exportForm(schema) {

        var exportObject = {
          format: formats.JSON,
          version: version,
          form: schema
        };

        var now = new Date();

        downloadObjectAsJson(exportObject, schema.label + ' ' + now.getFullYear() + '-' +
          now.getMonth() + '-' + now.getDate());
      }

      /**
       * Download schema as JSON
       * @param exportObj
       * @param exportName
       */
      function downloadObjectAsJson(exportObj, exportName) {

        var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', exportName + '.json');
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }

      function checkUpload() {

        // Check for the various File API support.
        if ($window.File && $window.FileReader && $window.FileList && $window.Blob) {
          // Great success! All the File APIs are supported.
          return true;
        } else {
          alert('The File APIs are not fully supported in this browser.');
          return false;
        }
      }

      /**
       * This method allows to import a subform into th schema
       * @param subForm
       */
      function importSubForm(subForm) {

        //TODO check subform syntax.
        EventDataFactory.setData(OdsEvent.LOAD_SUB_FORM, subForm);
      }

      /**
       * Generate object name by type.
       * @param type Object type.
       * @returns
       */
      function generateName(type) {

        uniqueCounter++;

        switch (type) {
          case OdsComponentType.FORM:
            return 'form' + uniqueCounter;
          case OdsComponentType.SECTION:
            return 'section' + uniqueCounter;
          case OdsComponentType.ROW:
            return 'row' + uniqueCounter;
          case OdsComponentType.COLUMN:
            return 'column' + uniqueCounter;
          case OdsComponentType.FIELD:
            return 'field' + uniqueCounter;
          case OdsComponentType.ITEM:
            return 'item' + uniqueCounter;
          case OdsComponentType.PLUGIN:
            return 'plugin' + uniqueCounter;
          default :
            return uniqueCounter;
        }
      }

      /**
       * Catch onAdd event in drag and drop for setting field properties,
       * we only set field name and datetime for now.
       *
       * @param item Field
       * @param type Field type.
       */
      function onAdd(item, type) {

        if (type === OdsComponentType.FIELD) {
          item.name = generateName(OdsComponentType.FIELD);
          if (item.type === OdsFieldType.DATETIME) {
            // var today = new Date();
            // var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
            item.value = new Date();
          }
          return item;
        }
      }

      /**
       * @deprecated
       * Init the schema
       * @param schema
       * @returns {*}
       */
      function initSchema(schema) {

        if (schema) {
          schema.allowedTypes = [OdsComponentType.SECTION];

          for (var i = 0; i < schema.layout.length; i++) {
            schema.layout[i].displayProperties = false;
            schema.layout[i].allowedTypes = [OdsComponentType.ROW];
            for (var j = 0; j < schema.layout[i].rows.length; j++) {
              schema.layout[i].rows[j].displayProperties = false;
              for (var k = 0; k < schema.layout[i].rows[j].cols.length; k++) {
                schema.layout[i].rows[j].cols[k].allowedTypes = [OdsComponentType.FIELD];
                schema.layout[i].rows[j].cols[k].displayProperties = false;
              }
            }
          }
          // this.schema = schema;
        } else {
          console.error('Please specify a schema!!!');
        }
        return schema;
      }

      /**
       * Return a toolbar component template from type.
       * @param component Component type.
       * @returns {*} Component template.
       */
      function getToolbarComponent(component) {

        switch (component.componentType) {
          case OdsComponentType.SECTION:
            return 'forms/toolbar/components/section.html';
          case OdsComponentType.FIELD:
            switch (component.type) {
              case OdsFieldType.TEXT:
                return 'forms/toolbar/components/input.html';
              case OdsFieldType.NUMBER:
                return 'forms/toolbar/components/input.html';
              case OdsFieldType.PASSWORD:
                return 'forms/toolbar/components/input.html';
              case OdsFieldType.TEXTAREA:
                return 'forms/toolbar/components/textarea.html';
              case OdsFieldType.SELECT:
                return 'forms/toolbar/components/select.html';
              case OdsFieldType.SELECT2:
                return 'forms/toolbar/components/select.html';
              case OdsFieldType.MULTI_SELECT:
                return 'forms/toolbar/components/multi-select.html';
              case OdsFieldType.TOGGLE:
                return 'forms/toolbar/components/toggle.html';
              case OdsFieldType.DATETIME:
                return 'forms/toolbar/components/datetime.html';
              case OdsFieldType.IF_YES:
                return 'forms/toolbar/plugins/if-yes.html';
              case OdsFieldType.IF_YES_CHECKBOX:
                return 'forms/toolbar/plugins/if-yes-checkbox.html';
              case OdsFieldType.IF_YES_RADIO:
                return 'forms/toolbar/plugins/if-yes-radio.html';
              case OdsFieldType.TABLE:
                return 'forms/toolbar/plugins/table.html';
              case OdsFieldType.LABEL:
                return 'forms/toolbar/components/label.html';
              case OdsFieldType.GRID_RENDER:
                return 'forms/toolbar/plugins/grid-render.html';
              case OdsFieldType.CHECKBOX:
                return 'forms/toolbar/components/checkbox.html';
              case OdsFieldType.CHECKBOX_LIST:
                return 'forms/toolbar/components/checkbox-list.html';
              case OdsFieldType.RADIO:
                return 'forms/toolbar/components/radio-list.html';
              case OdsFieldType.CKEDITOR:
                return 'forms/toolbar/components/ckeditor.html';
              case OdsFieldType.OPTIONS_TEXTAREA:
                return 'forms/toolbar/plugins/options-textarea.html';
              case OdsFieldType.CANVAS_PAINTER:
                return 'forms/toolbar/plugins/canvas-painter.html';
              default :
                return 'forms/toolbar/components/no-component.html';
            }
          default :
            return 'forms/toolbar/components/no-component.html';
        }
      }

      /**
       * Return field template for Schema View
       * @param field Field
       * @returns {*}
       */
      function getSchemaField(field) {

        switch (field.type) {
          case OdsFieldType.TEXT:
            return 'forms/schema/components/input.html';
          case OdsFieldType.NUMBER:
            return 'forms/schema/components/input.html';
          case OdsFieldType.PASSWORD:
            return 'forms/schema/components/input.html';
          case OdsFieldType.TEXTAREA:
            return 'forms/schema/components/textarea/textarea.html';
          case OdsFieldType.SELECT:
            return 'forms/schema/components/select/select.html';
          case OdsFieldType.SELECT2:
            return 'forms/schema/components/select2/select2.html';
          case OdsFieldType.MULTI_SELECT:
            return 'forms/schema/components/multi-select/multi-select.html';
          case OdsFieldType.TOGGLE:
            return 'forms/schema/components/toggle/toggle.html';
          case OdsFieldType.DATETIME:
            return 'forms/schema/components/datetime/datetime.html';
          case OdsFieldType.IF_YES:
            return 'forms/schema/plugins/if-yes/if-yes.html';
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/schema/plugins/if-yes-checkbox/if-yes-checkbox.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/schema/plugins/if-yes-radio/if-yes-radio.html';
          case OdsFieldType.TABLE:
            return 'forms/schema/plugins/table/container.html';
          case OdsFieldType.LABEL:
            return 'forms/schema/components/label.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/schema/plugins/grid-render/container.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/schema/components/checkbox/checkbox.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/schema/components/checkbox-list/checkbox-list.html';
          case OdsFieldType.RADIO:
            return 'forms/schema/components/radio-list/radio-list.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/schema/plugins/ckeditor/ckeditor.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/schema/plugins/options-textarea/options-textarea.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/schema/plugins/canvas-painter/container.html';
          default :
            return 'forms/schema/components/no-field.html';
        }
      }


      /**
       * Return field properties template for Schema View
       * @param field Field
       * @returns {*}
       */
      function getSchemaFieldProperties(field) {
        switch (field.type) {
          case OdsFieldType.TEXT:
            return 'forms/schema/components/text/text-properties.html';
          case OdsFieldType.NUMBER:
            return 'forms/schema/components/number/number-properties.html';
          case OdsFieldType.PASSWORD:
            return 'forms/schema/components/password/password-properties.html';
          case OdsFieldType.TEXTAREA:
            return 'forms/schema/components/textarea/textarea-properties.html';
          case OdsFieldType.SELECT:
            return 'forms/schema/components/select/select-properties.html';
          case OdsFieldType.SELECT2:
            return 'forms/schema/components/select/select-properties.html';
          case OdsFieldType.MULTI_SELECT:
            return 'forms/schema/components/multi-select/multi-select-properties.html';
          case OdsFieldType.TOGGLE:
            return 'forms/schema/components/toggle/toggle-properties.html';
          case OdsFieldType.DATETIME:
            return 'forms/schema/components/datetime/datetime-properties.html';
          case OdsFieldType.IF_YES:
            return 'forms/schema/plugins/if-yes/if-yes-properties.html';
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/schema/plugins/if-yes-checkbox/if-yes-checkbox-properties.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/schema/plugins/if-yes-radio/if-yes-radio-properties.html';
          case OdsFieldType.TABLE:
            return 'forms/schema/plugins/table/table-properties.html';
          case OdsFieldType.LABEL:
            return 'forms/schema/components/label/label-properties.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/schema/plugins/grid-render/grid-render-properties.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/schema/components/checkbox/checkbox-properties.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/schema/components/checkbox-list/checkbox-list-properties.html';
          case OdsFieldType.RADIO:
            return 'forms/schema/components/radio-list/radio-list-properties.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/schema/plugins/ckeditor/ckeditor-properties.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/schema/plugins/options-textarea/options-textarea-properties.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/common/fields/plugins/canvas-painter/canvas-painter-properties.html';
          default :
            return 'forms/schema/components/no-field-properties.html';
        }
      }

      /**
       * Return field template for each field type in Form View
       * @param fieldType Field type
       * @returns {*}
       */
      function getFormFieldTemplate(fieldType) {
        switch (fieldType) {
          case OdsFieldType.TEXT:
            return 'forms/common/fields/input.html';
          case OdsFieldType.NUMBER:
            return 'forms/common/fields/input.html';
          case OdsFieldType.PASSWORD:
            return 'forms/common/fields/input.html';
          case OdsFieldType.DATE:
            return 'forms/common/fields/date.html';
          case OdsFieldType.TEXTAREA:
            return 'forms/common/fields/textarea.html';
          case OdsFieldType.TOGGLE:
            return 'forms/common/fields/toggle.html';
          case OdsFieldType.SELECT:
            return 'forms/common/fields/select.html';
          case OdsFieldType.SELECT2:
            return 'forms/common/fields/select2.html';
          case OdsFieldType.MULTI_SELECT:
            return 'forms/common/fields/multi-select.html';
          case OdsFieldType.DATETIME:
            return 'forms/common/fields/datetime.html';
          case OdsFieldType.IF_YES:
            return 'forms/common/fields/plugins/if-yes.html';
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/common/fields/plugins/if-yes-checkbox.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/common/fields/plugins/if-yes-radio.html';
          case OdsFieldType.TABLE:
            return 'forms/common/fields/plugins/table.html';
          case OdsFieldType.LABEL:
            return 'forms/common/fields/label-empty.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/common/fields/plugins/grid-render.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/common/fields/checkbox.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/common/fields/checkbox-list.html';
          case OdsFieldType.RADIO:
            return 'forms/common/fields/radio-list.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/common/fields/plugins/ckeditor.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/common/fields/plugins/options-textarea/options-textarea.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/common/fields/plugins/canvas-painter/container.html';
          default :
            return 'forms/common/fields/no-field.html';
        }
      }

      /**
       * Return field template for each field type in Form Viewer
       * @param fieldType Field type
       * @returns {*}
       */
      function getFormViewerTemplate(fieldType) {

        switch (fieldType) {
          case OdsFieldType.TEXT:
            return 'forms/common/viewer/input.html';
          case OdsFieldType.NUMBER:
            return 'forms/common/viewer/input.html';
          case OdsFieldType.PASSWORD:
            return 'forms/common/viewer/input.html';
          case OdsFieldType.DATE:
            return 'forms/common/viewer/input.html';
          case OdsFieldType.TEXTAREA:
            return 'forms/common/viewer/input.html';
          case OdsFieldType.TOGGLE:
            return 'forms/common/viewer/toggle.html';
          case OdsFieldType.SELECT:
            return 'forms/common/viewer/select.html';
          case OdsFieldType.SELECT2:
            return 'forms/common/viewer/select.html';
          case OdsFieldType.MULTI_SELECT:
            return 'forms/common/viewer/multi-select.html';
          case OdsFieldType.DATETIME:
            return 'forms/common/viewer/datetime.html';
          case OdsFieldType.IF_YES:
            return 'forms/common/viewer/plugins/if-yes.html';
          case OdsFieldType.IF_YES_CHECKBOX:
            return 'forms/common/viewer/plugins/if-yes-checkbox.html';
          case OdsFieldType.IF_YES_RADIO:
            return 'forms/common/viewer/plugins/if-yes-radio.html';
          case OdsFieldType.TABLE:
            return 'forms/common/viewer/plugins/table.html';
          case OdsFieldType.LABEL:
            return 'forms/common/fields/label-empty.html';
          case OdsFieldType.GRID_RENDER:
            return 'forms/common/viewer/plugins/grid-render.html';
          case OdsFieldType.CHECKBOX:
            return 'forms/common/viewer/checkbox.html';
          case OdsFieldType.CHECKBOX_LIST:
            return 'forms/common/viewer/checkbox-list.html';
          case OdsFieldType.RADIO:
            return 'forms/common/viewer/radio-list.html';
          case OdsFieldType.CKEDITOR:
            return 'forms/common/viewer/plugins/ckeditor.html';
          case OdsFieldType.OPTIONS_TEXTAREA:
            return 'forms/common/viewer/plugins/options-textarea.html';
          case OdsFieldType.CANVAS_PAINTER:
            return 'forms/common/viewer/plugins/canvas-painter.html';
          default :
            return 'forms/common/viewer/no-template.html';
        }
      }

      /**
       * Return pattern list.
       * @returns [null,null,null,null,null,null,null,null,null,null,null,null] list.
       */
      function getValidationPatterns() {

        return [
          {
            value: 0,
            pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$',
            title: 'Url',
            group: 'url'
          }, {
            value: 1,
            pattern: '^([a-z][a-z0-9\\-]+(\\.|\\-*\\.))+[a-z]{2,6}$',
            title: 'Domain',
            group: 'domain'
          }, {
            value: 2,
            pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
            title: 'IPv4 Address',
            group: 'ip'
          }, {
            value: 3,
            pattern: '^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$',
            title: 'Email Address',
            group: 'email'
          }, {
            value: 4,
            pattern: '^-{0,1}\\d+$',
            title: 'Integer',
            group: 'numeric'
          }, {
            value: 5,
            pattern: '^\\d+$',
            title: 'Positive Integer',
            group: 'numeric'
          }, {
            value: 6,
            pattern: '^-\\d+$',
            title: 'Negative Integer',
            group: 'numeric'
          }, {
            value: 7,
            pattern: '^-{0,1}\\d*\\.{0,1}\\d+$',
            title: 'Number',
            group: 'numeric'
          }, {
            value: 8,
            pattern: '^\\d*\\.{0,1}\\d+$',
            title: 'Positive Number',
            group: 'numeric'
          }, {
            value: 9,
            pattern: '^-\\d*\\.{0,1}\\d+$',
            title: 'Negative Number',
            group: 'numeric'
          }, {
            value: 10,
            pattern: '^(19|20)[\\d]{2,2}$',
            title: 'Year (1920-2099)',
            group: 'numeric'
          }, {
            value: 11,
            pattern: '(?=.*\\d)(?=.*[!@#$%^&*\\-=()|?."\';:]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$',
            title: 'Password',
            group: 'password'
          }
        ];
      }

      function getDateTimeFormats() {

        var object = OdsDateTimeFormat;
        var formats = [];
        for (var property in object) {
          if (object.hasOwnProperty(property)) {
            // do stuff
            var format = {
              value: object[property],
              option: property
            };
            formats.push(format);
          }
        }
        return formats;
      }

      /**
       * Create a new Section Object.
       * @returns {{isExportable: boolean, displayProperties: boolean, allowedTypes: string[],
       * componentType: string, name: (*|number), title: string, rows: {displayProperties: boolean,
       * componentType: string, cssClass: string, name: (*|number), cols: {allowedTypes: string[],
       * cssClass: string, name: (*|number), fields: Array}[]}[], hideLabel: boolean}}
       */
      function newSectionObject() {

        return {
          name: generateName(OdsComponentType.SECTION),
          componentType: OdsComponentType.SECTION,
          title: 'Section',
          isExportable: false,
          displayProperties: false,
          hideLabel: false,
          allowedTypes: [
            OdsComponentType.ROW
          ],
          rows: [newRowObject()]
        };
      }

      /**
       * Create a new Row Object.
       * @returns {{displayProperties: boolean, componentType: string, cssClass: string,
       * name: (*|number), cols: {allowedTypes: string[], cssClass: string, name: (*|number), fields: Array}[]}}
       */
      function newRowObject() {

        return {
          name: generateName(OdsComponentType.ROW),
          componentType: OdsComponentType.ROW,
          cssClass: 'row',
          displayProperties: false,
          cols: [newColumnObject(12)]
        };
      }

      /**
       * Create a new Column Object.
       * @param colWidth Width of column.
       * @returns {{allowedTypes: string[], cssClass: string, name: (*|number), fields: Array}}
       */
      function newColumnObject(colWidth) {

        return {
          name: generateName(OdsComponentType.COLUMN),
          cssClass: ' col-xs-' + colWidth + ' col-sm-' + colWidth + ' col-md-' + colWidth + ' col-lg-' + colWidth,
          allowedTypes: [
            OdsComponentType.FIELD
          ],
          fields: []
        };
      }

      /**
       * Create a new base Field Object.
       * @returns
       */
      function newBaseFieldObject() {

        return {
          componentType: OdsComponentType.FIELD,
          name: generateName(OdsComponentType.FIELD),
          required: false,
          exportable: false,
          linkedTo: null
        };
      }

      /**
       * Create a new Field Text Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldTextObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'TextBox',
          placeholder: '',
          type: OdsFieldType.TEXT,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Number Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldNumberObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Number',
          placeholder: '',
          type: OdsFieldType.NUMBER,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Password Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldPasswordObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Password',
          placeholder: '',
          type: OdsFieldType.PASSWORD,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Textarea Object.
       * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
       */
      function newFieldTextareaObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Textarea',
          placeholder: '',
          type: OdsFieldType.TEXTAREA,
          rows: 3,
          value: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Select Object
       * @returns {componentType: string, titleField: string, name: (*|number), options: *[],
       * limitTo: number, label: string, placeholder: string, type: (number|string),
       * valueField: string, value: null, required: boolean, validation: {messages: {}}} Select Object
       */
      function newFieldSelectObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Select',
          placeholder: '...Select an option',
          type: OdsFieldType.SELECT,
          valueField: 'id',
          titleField: 'name',
          limitTo: 10,
          value: null,
          options: [{
            value: 1,
            id: 1,
            name: 'Option 1',
            color: '#FFFFFF'
          }, {
            value: 2,
            id: 2,
            name: 'Option 2',
            color: '#FFFFFF'
          }, {
            value: 3,
            id: 3,
            name: 'Option 3',
            color: '#FFFFFF'
          }],
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Select2 Object
       * @returns
       */
      function newFieldSelect2Object() {

        return _.merge(newBaseFieldObject(), {
          label: 'Select2',
          placeholder: '',
          type: OdsFieldType.SELECT2,
          multiSelect: false,
          valueField: 'id',
          titleField: 'name',
          limitTo: 10,
          value: null,
          options: [{
            id: 1,
            name: 'Option 1'
          }, {
            id: 2,
            name: 'Option 2'
          }, {
            id: 3,
            name: 'Option 3'
          }],
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Multiselect Object
       * @returns
       */
      function newFieldMultiSelectObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Multi select',
          placeholder: '',
          type: OdsFieldType.MULTI_SELECT,
          multiSelect: true,
          valueField: 'id',
          titleField: 'name',
          limitTo: 10,
          value: [],
          options: [{
            id: 1,
            name: 'Option 1'
          }, {
            id: 2,
            name: 'Option 2'
          }, {
            id: 3,
            name: 'Option 3'
          }],
          render: null,
          validation: {
            messages: {}
          }
        });
      }

      /**
       * Create a new Field Toggle Object
       * @returns
       */
      function newFieldToggleObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Toggle',
          type: OdsFieldType.TOGGLE,
          ln: false,
          on: 'Yes',
          off: 'No',
          value: false
        });
      }

      function newDateTimeObject() {

        var today = new Date();
        var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(),
          today.getDate(), 9, 0, 0));
        return _.merge(newBaseFieldObject(), {
          label: 'DateTime',
          type: OdsFieldType.DATETIME,
          enableTime: false,
          format: OdsDateTimeFormat.ShortDateLongYear,
          selectedFormat: OdsDateTimeFormat.ShortDateLongYear,
          modelOptions: {
            timezone: getTimeZoneUTC()
          },
          openInEditMode: false,
          // utc: true,
          value: date,
          validation: {
            datetime: false,
            messages: {
              datetime: 'Invalid Date or Time.'
            }
          }
        });
      }

      function newFieldLabelObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Label',
          cssClass: 'text-left',
          type: OdsFieldType.LABEL,
          value: 'Label'
        });
      }

      function newFieldCheckBoxObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'CheckBox',
          hideLabel: true,
          ln: false,
          type: OdsFieldType.CHECKBOX,
          value: false
        });
      }

      function newFieldCheckBoxListObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'CheckBox List',
          type: OdsFieldType.CHECKBOX_LIST,
          inline: false,
          options: [{
            id: 1,
            name: 'Option 1'
          }, {
            id: 2,
            name: 'Option 2'
          }, {
            id: 3,
            name: 'Option 3'
          }],
          value: {}
        });
      }

      function newFieldRadioListObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Radiobutton List',
          type: OdsFieldType.RADIO,
          options: [{
            value: 1,
            id: 1,
            name: 'Option 1'
          }, {
            value: 2,
            id: 2,
            name: 'Option 2'
          }, {
            value: 3,
            id: 3,
            name: 'Option 3'
          }],
          value: {}
        });
      }

      function newYesNoObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'If yes:',
          type: OdsFieldType.IF_YES,
          ln: false,
          on: 'Yes',
          off: 'No',
          value: {
            toggle: false,
            textarea: null
          },
          placeholder: '',
          validation: {
            messages: {}
          }
        });
      }

      function newYesNoRadioObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'If yes Radio:',
          type: OdsFieldType.IF_YES_RADIO,
          ln: true,
          on: 'Yes',
          off: 'No',
          value: {
            toggle: false,
            textarea: null
          },
          placeholder: '',
          validation: {
            messages: {}
          }
        });
      }

      function newYesNoCheckboxObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'If yes options:',
          type: OdsFieldType.IF_YES_CHECKBOX,
          ln: false,
          on: 'Yes',
          off: 'No',
          options: [{
            id: 1,
            name: 'Option 1'
          }, {
            id: 2,
            name: 'Option 2'
          }, {
            id: 3,
            name: 'Option 3'
          }],
          value: {
            toggle: false,
            checkbox: {}
          },
          placeholder: '',
          validation: {
            messages: {}
          }
        });
      }

      function newOptionsTextAreaObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Options Textarea:',
          type: OdsFieldType.OPTIONS_TEXTAREA,
          modal: {
            title: 'Modal Title',
            placeholder: '',
            tooltip: '',
            value: ''
          },
          groups: [
            createOptionsGroup()
          ],
          value: '',
          placeholder: '',
          validation: {
            messages: {}
          }
        });
      }

      function createOptionsGroup() {
        const options = [];
        for (var i = 1; i <= 3; i++) {
          options.push({
            id: 'Option ' + i,
            name: 'Option ' + i
          });
        }
        return {
          name: generateName(),
          label: 'Group label',
          groupValue: 'Group value',
          isOpen: false,
          inline: false,
          options: options,
          optionValue: null
        };
      }

      function newTableObject() {

        return _.merge(newBaseFieldObject(), {
          label: 'Table',
          type: OdsFieldType.TABLE,
          cssClass: 'table table-bordered',
          matrix: [
            [newItemObject(), newItemObject()]
          ],
          validation: {
            messages: {}
          }
        });
      }

      function newItemObject() {

        return {
          name: generateName(OdsComponentType.ITEM),
          fields: [],
          // width: '10px',
          allowedTypes: [OdsComponentType.FIELD]
        };
      }

      function newGridRenderObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Grid Render',
          type: OdsFieldType.GRID_RENDER,
          cssClass: 'table table-bordered',
          manageRows: true,
          descriptor: {
            header: ['Column 1', 'Column 2'],
            data: []
          }
        });
      }

      var defaultBackground = 'data:image/png;base64,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';

      function newCanvasPainterObject() {
        return _.merge(newBaseFieldObject(), {
          label: 'Canvas Painter',
          type: OdsFieldType.CANVAS_PAINTER,
          readonly: true,
          options: {
            canvasId: 'odsCanvasMain',
            tmpCanvasId: 'odsCanvasMain',
            width: 600,
            height: 367,
            backgroundColor: '#fff',
            undoEnabled: true,
            opacity: 0.9,
            undo: true,
            imageSrc: defaultBackground,
            color: '#000',
            lineWidth: 10,
            lineColors: ['#F9FF33', '#000', '#9CB199', '#CF3759', '#485247', '#E77547', '#D38E47', '#0A6A74', '#153974']
          },
          value: defaultBackground
        });
      }

      function newCKEditorObject() {

        //Default key combination. (CTRL + SPACE)
        var CTRL = 1114112;

        return _.merge(newBaseFieldObject(), {
          label: 'CKEditor',
          type: OdsFieldType.CKEDITOR,
          readonly: false,
          printView: false,
          options: {
            triggerKeyCode: CTRL + 32,
            prefix: defaultCKEditorPrefix(),
            suffix: defaultCKEditorSuffix(),
            suggestionsUrl: '',
            tokensUrl: '',
            locked: true,
            suggestions: [{
              id: 'suggestion1',
              label: 'Suggestion1'
            }, {
              id: 'suggestion2',
              label: 'Suggestion2'
            }, {
              id: 'suggestion3',
              label: 'Suggestion3'
            }],
            tokens: null
          },
          value: null
        });
      }

      function defaultCKEditorPrefix() {

        return '${';
      }

      function defaultCKEditorSuffix() {

        return '}';
      }

      /**
       * Remove row from grid.
       * @param grid Table
       * @param index Row index to remove.
       */
      function removeRow(grid, index) {
        if (grid.length > 1) {
          dialogs.confirm('Confirm!!!', 'Do you want to remove this row?',
            {
              size: 'sm',
              windowClass: 'ods-dialog'
            })
            .result
            .then(function () {
              grid.splice(index, 1);
            });
          return;
        }
        dialogs.notify('Information', 'At least one row must exist.',
          {
            size: 'sm',
            windowClass: 'ods-dialog'
          })
          .result
          .then(function () {
          });
      }

      /**
       * remove column to from table.
       * @param table Table
       * @param index Column index to remove.
       */
      function removeColumn(table, index) {

        if (table.matrix[0].length > 1) {
          dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
            {
              size: 'sm',
              windowClass: 'ods-dialog'
            })
            .result
            .then(function () {

              for (var i = 0; i < table.matrix.length; i++) {
                table.matrix[i].splice(index, 1);
              }
            });
        } else {
          dialogs.notify('Information', 'At least one column must exist.',
            {
              size: 'sm',
              windowClass: 'ods-dialog'
            })
            .result
            .then(function () {
            });
        }
      }

      /**
       * Clone the last row in table and add it as a new row.
       * @param table Table
       */
      function cloneRow(table) {

        //copy last row in table
        var row = angular.copy(table.matrix[table.matrix.length - 1]);
        //set new name for every field in row.
        for (var i = 0; i < row.length; i++) {
          row[i].name = generateName(OdsComponentType.ITEM);
          for (var j = 0; j < row[i].fields.length; j++) {
            row[i].fields[j].name = generateName(OdsComponentType.FIELD);
            //We clean the field linked value.
            row[i].fields[j].linkedTo = '';
          }
        }
        table.matrix.push(row);
      }

      function getTimeZoneUTC() {

        return 'UTC/GMT';
      }

      function getFieldValueAsNumber(field) {

        var value = 0;
        var id;
        switch (field.type) {
          case OdsFieldType.SELECT:
            if (field.value) {
              id = getSelectFieldId(field);
              value += Number(field.value[id]);
            }
            break;
          case OdsFieldType.SELECT2:
            if (field.value) {
              id = getSelectFieldId(field);
              value += Number(field.value[id]);
            }
            break;
          case OdsFieldType.MULTI_SELECT:
            if (field.value) {
              id = getSelectFieldId(field);
              for (var i = 0; i < field.value.length; i++) {
                value += Number(field.value[i][id]);
              }
            }
            break;
          case OdsFieldType.LABEL:
            if (field.value) {
              value += 0;
            }
            break;
          default:
            if (field.value) {
              value += Number(field.value);
            }
            break;
        }

        return value;
      }

      function getSelectFieldId(field) {

        var defaultId = 'id';
        if (field) {
          return field.valueField !== undefined ? field.valueField : defaultId;
        } else {
          return defaultId;
        }
      }

      function getSelectFieldTitle(field) {

        var defaultName = 'name';
        if (field) {
          return field.titleField !== undefined ? field.titleField : defaultName;
        } else {
          return defaultName;
        }
      }

      function getSelectFieldTitleValue(field, element) {

        if (field) {
          if (field.render && element && element.constructor !== Array) {
            return field.render(element);
          } else {
            if (element && element.constructor !== Array) {
              return field.titleField !== undefined ? element[field.titleField] : element.name;
            } else {
              return field.placeholder;
            }
          }
        } else {
          return field.placeholder;
        }
      }

      function getSelectFieldIdValue(field, element) {

        if (field) {
          if (element && element.constructor !== Array) {
            return field.valueField !== undefined ? element[field.valueField] : element.id;
          }
        } else {
          return field.placeholder;
        }
      }

      function copyToClipboard(text) {
        if (window.clipboardData && window.clipboardData.setData) {
          // IE specific code path to prevent textarea being shown while dialog is visible.
          return window.clipboardData.setData('Text', text);

        } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
          var textarea = document.createElement('textarea');
          textarea.textContent = text;
          textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
          document.body.appendChild(textarea);
          textarea.select();
          try {
            return document.execCommand('copy');  // Security exception may be thrown by some browsers.
          } catch (ex) {
            console.warn('Copy to clipboard failed.', ex);
            return false;
          } finally {
            document.body.removeChild(textarea);
          }
        }
      }

      /**
       * Substitute object value in a string template using pattern with prefix and suffix.
       * @param str String to substitute.
       * @param valuesMap Object with values.
       * @param prefix Pattern prefix.
       * @param suffix Pattern suffix.
       * @returns {*} String pattern replaced with it object values.
       */
      function strSubtitutor(str, valuesMap, prefix, suffix) {

        var strResult = '';

        if (str) {
          strResult = str;

          for (var property in valuesMap) {
            if (valuesMap.hasOwnProperty(property)) {
              // do stuff
              var re = new RegExp(escapeRegExp(prefix + property + suffix), 'gi');
              strResult = strResult.replace(re, valuesMap[property]);
            }
          }
        }

        return strResult;
      }

      function restResource(resourceUrl) {

        return $resource(resourceUrl, {}, {
          'query': {
            method: 'GET',
            isArray: true
          },
          'get': {
            method: 'GET',
            transformResponse: function (data) {
              if (data) {
                data = angular.fromJson(data);
              }
              return data;
            }
          }
        });
      }

      function getClipBoard() {

        return clipBoard;
      }

      function setClipBoard(cb) {

        clipBoard = cb;
        //notify if there are any listeners
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i](clipBoard);
        }
      }

      function addToClipBoard(item) {

        var comp = renameComponent(item);
        clipBoard.push(comp);
        //notify if there are any listeners
        for (var i = 0; i < callbacks.length; i++) {
          callbacks[i](clipBoard);
        }
      }

      function onAddToClipBoard(callback) {

        callbacks.push(callback);
      }

      function escapeRegExp(str) {

        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
      }

      function copyJson(json) {

        // $window.prompt('Copy to clipboard: Ctrl+C, Enter', json);
        copyToClipboard(json);
        $window.alert('Code copied to clipboard!!!');
      }

      function renameComponent(component) {

        var comp = angular.copy(component);

        if (comp.componentType === OdsComponentType.FIELD) {
          comp.name = generateName(comp.componentType);
          if (comp.type === OdsFieldType.TABLE) {
            _.forEach(comp.matrix, function (rows) {
              _.forEach(rows, function (column) {
                column.name = generateName(column.componentType);
              });
            });
          }
          return comp;
        } else {
          return uniqueCounter;
        }
      }

      function saveFormData(schema) {

        var formData = {
          formName: schema.name,
          formLabel: schema.label,
          formDescription: schema.description,
          fields: []
        };

        formData.fields.concat(getDataFromComponentCode(schema, false, null));
        return formData;
      }

      function saveFormSchema(schema) {

        return schema;
      }

      // /**
      //  * Return all exportable elements as array.
      //  */
      // function getExportables(schema) {
      //
      //     var exportables = [];
      //     var layout = schema.layout;
      //     for (var i = 0; i < layout.length; i++) {
      //         var content = layout[i];
      //         if (content && content.exportable) {
      //             exportables.push(content);
      //         }
      //     }
      //
      //     return exportables;
      // }

      /**
       * Return all exportable elements embedded in a form.
       */
      function getExportables(schema) {

        var form = newSchemaEmpty();
        _.forEach(schema.layout, function (item) {
          if (item && item.exportable) {
            form.layout.push(item);
          }
        });

        return form;
      }

      /**
       * Load a subform into the schema
       *
       * @return Boolean Return True if the operation is successful or False if an error occur.
       */
      function loadSubForm(schema, subForm, position) {

        var layout = schema.layout;
        if (Array.isArray(layout)) {
          if (position === OdsPosition.TOP) {
            layout.unshift(subForm);
          } else {
            layout.push(subForm);
          }
          return true;
        } else {
          return false;
        }
      }

      /**
       * Get fields data from schema by code.
       * @param schema Form schema.
       * @param code Code to fin in the schema.
       * @param filter Boolean to specify if filter or not.
       * @returns {Array}
       */
      function getDataFromComponentCode(schema, filter, code) {

        var fields = [];

        _.forEach(schema.layout, function (item) {
          var rows = item.rows;
          _.forEach(rows, function (row) {
            var cols = row.cols;
            _.forEach(cols, function (columnRow) {
              _.forEach(columnRow.fields, function (field) {
                if (field.type === OdsFieldType.TABLE) {
                  getDataFromTablePlugin(fields, field, filter, code);
                } else {
                  getDataFromField(fields, field, filter, code);
                }
              });
            });
          });
        });

        return fields;
      }

      function getDataFromTablePlugin(result, field, filter, code) {

        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0) {
              getDataFromField(result, matrixColumn.fields[0], filter, code);
            }
          });
        });
      }

      function getDataFromField(result, field, filter, code) {

        field = {
          name: field.name,
          type: field.type,
          code: field.code,
          value: field.value
        };
        if (filter) {
          if (field.code === code) {
            result.push(field);
          }
        } else {
          result.push(field);
        }
      }

      /**
       * Deserialize the json schema into schema object and parse
       * the datetime field value from string into a Date valid object.
       * @param json The json form schema.
       * @returns {Object|Array|string|number}
       */
      function convertFormSchema(schema) {

        if (schema) {
          _.forEach(schema.layout, function (item) {
            var rows = item.rows;
            _.forEach(rows, function (row) {
              var cols = row.cols;
              _.forEach(cols, function (columnRow) {
                _.forEach(columnRow.fields, function (field) {
                  if (field.type === OdsFieldType.TABLE) {
                    convertTablePlugin(field);
                  } else {
                    initDateTimeField(field);
                  }
                });
              });
            });
          });
        }

        return schema;
      }

      /**
       * Deserialize the json schema into schema object and parse
       * the datetime field value from string into a Date valid object.
       * @param json The json form schema.
       * @returns {Object|Array|string|number}
       */
      function convertFormSchemaFromServer(json) {

        var schema = angular.fromJson(json);
        return convertFormSchema(schema);
      }

      /**
       * Initialize the DateTime field from text using Date parsing.
       * @param field DateTime field.
       */
      function initDateTimeField(field) {

        //If field is datetime we set Date object from string
        if (field.type === OdsFieldType.DATETIME) {
          if (field.value !== null) {
            field.value = new Date(Date.parse(field.value));
          }
        }
      }

      /**
       * Util function that serialize schema matrix plugin
       * @param field Field of type OdsFieldType.TABLE
       */
      function convertTablePlugin(field) {

        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0) {
              initDateTimeField(matrixColumn.fields[0]);
            }
          });
        });
      }

      /**
       * This method make all fields in the schema read only or not.
       * @param json
       * @param status
       * @return {Object|Array|string|number}
       */
      function setReadOnlyStatus(json, status) {

        var schema = angular.fromJson(json);
        _.forEach(schema.layout, function (item) {
          var rows = item.rows;
          _.forEach(rows, function (row) {
            var cols = row.cols;
            _.forEach(cols, function (columnRow) {
              _.forEach(columnRow.fields, function (field) {
                if (field.type === OdsFieldType.TABLE) {
                  setStatusToTablePlugin(field, status);
                } else {
                  setStatusToField(field, status);
                }
              });
            });
          });
        });

        return schema;
      }

      function setStatusToTablePlugin(field, status) {

        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0) {
              setStatusToField(matrixColumn.fields[0], status);
            }
          });
        });
      }

      function setStatusToField(field, status) {

        field.readonly = status;
      }

      /**
       * Inject config to CKEditor in the Schema.
       * @param schema The Schema object.
       * @param config The CKEditor configuration.
       */
      function setConfigToCKEditorComponent(schema, config) {

        if (schema && schema.layout && config) {
          _.forEach(schema.layout, function (item) {
            var rows = item.rows;
            _.forEach(rows, function (row) {
              var cols = row.cols;
              _.forEach(cols, function (columnRow) {
                _.forEach(columnRow.fields, function (field) {
                  if (field.type === OdsFieldType.TABLE) {
                    setConfigToCKEditorInTablePlugin(field, config);
                  } else {
                    setConfigToCKEditorField(field, config);
                  }
                });
              });
            });
          });
        }
      }

      /**
       * Inject config to CKEditor in the Table plugin field.
       * @param field The field object.
       * @param config The CKEditor configuration.
       */
      function setConfigToCKEditorInTablePlugin(field, config) {
        //We must to repeat the process because is a table.
        _.forEach(field.matrix, function (matrixRow) {
          _.forEach(matrixRow, function (matrixColumn) {
            if (matrixColumn.fields.length > 0 &&
              matrixColumn.fields[0].type === OdsFieldType.CKEDITOR) {
              setConfigToCKEditorField(matrixColumn.fields[0], config);
            }
          });
        });
      }

      /**
       * Inject config to CKEditor into the field.
       * @param field The field object.
       * @param config The CKEditor configuration.
       */
      function setConfigToCKEditorField(field, config) {

        if (config.ckeditor) {
          if (field.type === OdsFieldType.CKEDITOR) {
            field.options.prefix = config.ckeditor.prefix ?
              config.ckeditor.prefix : defaultCKEditorPrefix();
            field.options.suffix = config.ckeditor.suffix ?
              config.ckeditor.suffix : defaultCKEditorSuffix();
            if (config.ckeditor.suggestions) {
              field.options.suggestions = config.ckeditor.suggestions;
            }
            if (config.ckeditor.suggestionsUrl) {
              field.options.suggestionsUrl = config.ckeditor.suggestionsUrl;
            }
            if (config.ckeditor.tokens) {
              field.options.tokens = config.ckeditor.tokens;
            }
          }
        }
      }

      /**
       * This method clone Section.
       * @param schema
       * @param section
       * @param position
       * @param clonedCanClone
       * @return {Object|Array|string|number}
       */
      function cloneSection(schema, section, clonedCanClone, position) {

        var cloneSection = angular.copy(section);
        cloneSection.name = generateName(cloneSection.componentType);
        cloneSection.canClone = clonedCanClone;
        cloneSection.clonedCanClone = clonedCanClone;
        _.forEach(cloneSection.rows, function (row) {
          row.name = generateName(row.componentType);
          _.forEach(row.cols, function (columnRow) {
            columnRow.name = generateName(columnRow.componentType);
            _.forEach(columnRow.fields, function (field) {
              if (field.type === OdsFieldType.TABLE) {
                //We must to repeat the process because is a table.
                _.forEach(field.matrix, function (matrixRow) {
                  matrixRow.name = generateName(OdsComponentType.ITEM);
                  _.forEach(matrixRow, function (matrixColumn) {
                    if (matrixColumn.fields.length > 0) {
                      matrixColumn.fields[0].name =
                        generateName(matrixColumn.fields[0].componentType);
                    }
                  });
                });
              } else {
                field.name = generateName(field.componentType);
              }
            });
          });
        });

        position = position ? position : OdsPosition.DOWN;
        if (position === OdsPosition.UP) {
          //We put over the new section
          schema.layout.unshift(cloneSection);
        } else {
          //Put above the new section
          schema.layout.push(cloneSection);
        }
        return schema;
      }

      return service;
    }
  }

)
();

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsForm', FormDirective);

FormDirective.$inject = ['OdsFormService', '$timeout', 'dialogs', '$uibModal'];

function FormDirective(OdsFormService, $timeout, dialogs, $uibModal) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/form/form.html',
        scope: {
            schema: '=',
            config: '=',
            onSave: '&'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        // var nbDigest = 0;
        //
        // $rootScope.$watch(function() {
        //     nbDigest++;
        //     console.log('digest number:' + nbDigest);
        // });

        $scope.view = '-form';

        if(!$scope.schema){
            $scope.name = OdsFormService.generateName();
        }else {
            $scope.name = $scope.schema.name;
        }

        if ($scope.config) {
            //CKEditor config load.
            if ($scope.config.ckeditor) {

                OdsFormService.setConfigToCKEditorComponent($scope.schema, $scope.config);
            }
        }

        $scope.getUniqueName = getUniqueName;
        $scope.getEditMode = getEditMode;

        $scope.clear = clear;
        $scope.save = save;

        $scope.hideTitle = hideTitle;

        //Section specific
        $scope.cloneSection = cloneSection;
        $scope.removeSection = removeSection;

        //Common field validation
        $scope.getRequired = getRequired;
        $scope.getMinLength = getMinLength;
        $scope.getMaxLength = getMaxLength;
        $scope.getPattern = getPattern;

        $scope.getFormFieldTemplate = getFormFieldTemplate;

        //Select field specific
        $scope.getSelectFieldTitleValue = getSelectFieldTitleValue;

        //Calendar field specific
        $scope.openCalendar = openCalendar;

        //Table field specific
        $scope.removeRow = removeRow;
        $scope.removeColumn = removeColumn;
        $scope.cloneRow = cloneRow;

        //CKEditor specific
        $scope.valueSubtitutor = valueSubtitutor;

        //Options-textarea specific
        $scope.openModal = openModal;

        /**
         * Return an unique name to avoid fields name collisions.
         * @returns {boolean}
         */
        function getUniqueName(field) {
            return field.name ? field.name + $scope.view : $scope.view;
        }

        /**
         * Return if it is in edit mode.
         * @returns {boolean}
         */
        function getEditMode() {
            return false;
        }

        /**
         * Hide title or label from component
         * @param field Component
         * @returns {boolean}
         */
        function hideTitle(field) {

            return !!field.hideLabel;
        }

        /**
         * Clone Section
         * @param section Component
         * @returns {boolean}
         */
        function cloneSection(section) {

            dialogs.confirm('Confirm!!!', 'Do you want to clone this Section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                $scope.schema = OdsFormService.cloneSection($scope.schema, section,
                    section.clonedCanCloned);
            });
        }

        /**
         * Remove Section
         * @param section Component
         * @returns {boolean}
         */
        function removeSection(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                $scope.schema.layout.splice(index, 1);
            });
        }

        /**
         * Return if field is required.
         * @param field Field
         * @returns {boolean}
         */
        function getRequired(field) {

            return field &&
            field.validation &&
            field.validation.required ? field.validation.required : false;
        }

        /**
         * Return if field has min length.
         * @param field Field
         * @returns {boolean}
         */
        function getMinLength(field) {

            return field &&
            field.validation &&
            field.validation.minlength ? field.validation.minlength : null;
        }

        /**
         * Return if field has a pattern.
         * @param field Field
         * @returns {boolean}
         */
        function getPattern(field) {

            return field &&
            field.validation &&
            field.validation.pattern ? field.validation.pattern : null;
        }

        /**
         * Return if field has max length.
         * @param field Field
         * @returns {boolean}
         */
        function getMaxLength(field) {

            return field &&
            field.validation &&
            field.validation.maxlength ? field.validation.maxlength : null;
        }

        function getFormFieldTemplate(fieldType) {

            return OdsFormService.getFormFieldTemplate(fieldType);
        }

        function getSelectFieldTitleValue(field, element) {

            return OdsFormService.getSelectFieldTitleValue(field, element);
        }

        function clear() {
            //TODO confirm if you want to clear al fields.
            showInfo('Form cleared!!!');
        }

        /**
         * Call to external callback if it is specified, show error message if not defined.
         */
        function save() {

            if ($scope.schema.handleSubmit) {
                if ($scope.onSave) {
                    $scope.onSave();
                } else {
                    showError('You must to to define onSave() function.');
                }
            }
        }

        function showError(message) {

            $scope.error = true;
            $scope.message = message;
            $timeout(function () {
                $scope.error = false;
                $scope.message = '';
            }, 5000);
        }

        // function showSuccess(message) {
        //
        //     $scope.success = true;
        //     $scope.message = message;
        //     $timeout(function () {
        //         $scope.success = false;
        //         $scope.message = '';
        //     }, 5000);
        // }

        function showInfo(message) {

            $scope.info = true;
            $scope.message = message;
            $timeout(function () {
                $scope.info = false;
                $scope.message = '';
            }, 5000);
        }

        /**
         * Open and close Calendar popup
         * @param field
         * @returns {boolean|*}
         */
        function openCalendar(field) {
            field.open = !field.open;
            return field.open;
        }

        /**
         * Remove row from section.
         * @param table Table to remove row
         * @param index Row index to remove.
         */
        function removeRow(table, index) {
            OdsFormService.removeRow(table, index);
        }

        /**
         * Add column to current row.
         * @param table Table to remove column
         * @param row Row to add column.
         */
        function removeColumn(table, index) {

            OdsFormService.removeColumn(table, index);
        }

        /**
         * Clone the last row in table and add it as a new row.
         * @param table Table
         */
        function cloneRow(table) {

            OdsFormService.cloneRow(table);
        }

        function valueSubtitutor(field) {

            if (field.options.tokens && field.printView) {
                return OdsFormService.strSubtitutor(field.value, field.options.tokens,
                    field.options.prefix, field.options.suffix);
            } else {
                return field.value;
            }
        }

        function openModal(field, size) {
            $uibModal.open({
                animation: true,
                templateUrl: 'options-modal.html',
                controller: 'OdsOptionsModalController',
                controllerAs: 'vm',
                size: size,
                resolve: {
                    field: field
                }
            });
        }
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSchema', SchemaDirective);

SchemaDirective.$inject = ['OdsFormService', 'EventDataFactory', 'OdsEvent'];

function SchemaDirective(OdsFormService, EventDataFactory, OdsEvent) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/schema.html',
        scope: {
            schema: '=',
            config: '=',
            debugMode: '='
        },
        link: linkFunc,
        controller: ['$scope', 'EventDataFactory', 'OdsEvent', function ($scope, EventDataFactory, OdsEvent) {

            EventDataFactory.registerObserver(OdsEvent.IMPORT_FORM, $scope);
            EventDataFactory.registerObserver(OdsEvent.EXPORT_FORM, $scope);
            EventDataFactory.registerObserver(OdsEvent.LOAD_SUB_FORM, $scope);

        }]
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.getEditMode = getEditMode;
        $scope.onAdd = onAdd;
        $scope.onImportForm = onImportForm;
        $scope.onExportForm = onExportForm;
        $scope.onLoadSubForm = onLoadSubForm;

        if (!$scope.schema) {
            $scope.schema = OdsFormService.newSchema();
            // $scope.schema = OdsFormService.initSchema($scope.schema);
        }

        //CKEditor config load.
        if ($scope.config) {
            if ($scope.config.ckeditor) {
                OdsFormService.setConfigToCKEditorComponent($scope.schema, $scope.config);
            }
        }

        /**
         * Return if it is in edit mode.
         * @returns {boolean}
         */
        function getEditMode() {
            return true;
        }

        /**
         * Catch onAdd event in drag and drop for setting field properties
         */
        function onAdd() {

            $scope.schema.layout.push(OdsFormService.newSectionObject());
        }

        /**
         * Event change schema notify
         * @param data New Form
         */
        function onImportForm(data) {

            $scope.schema = data.form;
        }

        function onExportForm() {

            OdsFormService.exportForm($scope.schema);
        }

        function onLoadSubForm(subForm, position) {

            OdsFormService.loadSubForm($scope.schema, subForm, position);
        }

        $scope.$on('$destroy', function () {

            EventDataFactory.unRegisterObserver(OdsEvent.IMPORT_FORM, $scope, '$id');
            EventDataFactory.unRegisterObserver(OdsEvent.EXPORT_FORM, $scope, '$id');
            EventDataFactory.unRegisterObserver(OdsEvent.LOAD_SUB_FORM, $scope, '$id');
        });

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsViewer', ViewerDirective);

ViewerDirective.$inject = ['OdsFormService', 'uibDateParser'];

function ViewerDirective(OdsFormService, uibDateParser) {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/viewer/viewer.html',
    scope: {
      schema: '=',
      config: '=',
      cssClass: '='
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {

    if ($scope.config) {
      //CKEditor config load.
      if ($scope.config.ckeditor) {

        OdsFormService.setConfigToCKEditorComponent($scope.schema, $scope.config);
      }
    }

    //CKEditor specific
    $scope.valueSubtitutor = valueSubtitutor;
    $scope.getFormViewerTemplate = getFormViewerTemplate;

    $scope.getRadioTextFromValue = getRadioTextFromValue;
    $scope.getSelectTextFromValue = getSelectTextFromValue;
    $scope.getFieldTextsFromValues = getFieldTextsFromValues;
    $scope.getFieldChecklistFromValues = getFieldChecklistFromValues;

    $scope.dateTimeRender = dateTimeRender;
    $scope.hideTitle = hideTitle;

    /**
     * Hide title or label from component
     * @param field Component
     * @returns {boolean}
     */
    function hideTitle(field) {

      return !!field.hideLabel;
    }

    /**
     * Return Form Viewer template for every field.
     * @param fieldType Field type.
     * @returns {*} Field Viewer template.
     */
    function getFormViewerTemplate(fieldType) {

      return OdsFormService.getFormViewerTemplate(fieldType);
    }

    function valueSubtitutor(field) {

      if (field.options.tokens && field.printView) {
        return OdsFormService.strSubtitutor(field.value, field.options.tokens, field.options.prefix,
          field.options.suffix);
      } else {
        return field.value;
      }
    }

    /**
     * Get option text from radio list
     * @param field
     * @returns {string}
     */
    function getRadioTextFromValue(field) {

      for (var i = 0; i < field.options.length; i++) {
        var value = field.options[i][OdsFormService.getSelectFieldId(field)];
        if (value == field.value) {
          return field.options[i][OdsFormService.getSelectFieldTitle(field)];
        }
      }

      return '';
    }

    /**
     * Get option text from select list
     * @param field
     * @returns {string}
     */
    function getSelectTextFromValue(field) {

      for (var i = 0; i < field.options.length; i++) {
        var value = field.options[i][OdsFormService.getSelectFieldId(field)];
        if (field.value) {
          if (value === field.value[OdsFormService.getSelectFieldId(field)]) {
            return field.options[i][OdsFormService.getSelectFieldTitle(field)];
          }
        }
      }

      return '';
    }

    function getFieldTextsFromValues(field) {

      var result = [];
      if (field.value) {
        for (var i = 0; i < field.value.length; i++) {
          var value = field.value[i][OdsFormService.getSelectFieldId(field)];
          for (var j = 0; j < field.options.length; j++) {
            var current = field.options[j][OdsFormService.getSelectFieldId(field)];
            if (value === current) {
              result.push(field.options[j][OdsFormService.getSelectFieldTitle(field)]);
            }
          }
        }
      }

      if (result.length > 0) {
        return result;
      } else {
        return '';
      }
    }

    function dateTimeRender(field) {

      if (field.format) {
        return uibDateParser.filter(field.value, field.format);
      } else {
        return field.value;
      }
    }

    function getFieldChecklistFromValues(field, value) {

      var result = [];
      if (value) {
        field.options.forEach(function (option, i) {
          var id = value[i + 1];
          if (id) {
            result.push(field.options[i].name);
          }
        });
      }

      if (result.length > 0) {
        return result;
      } else {
        return '';
      }
    }
  }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsFormToolbar', OdsFormToolbar);

OdsFormToolbar.$inject = ['OdsFormService', '$sessionStorage', 'dialogs', 'EventDataFactory', 'OdsEvent'];

function OdsFormToolbar(OdsFormService, $sessionStorage, dialogs, EventDataFactory, OdsEvent) {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/toolbar/toolbar.html',
    link: linkFunc
  };

  return directive;

  /* private helper methods*/

  function linkFunc($scope) {

    $scope.getToolbarComponent = getToolbarComponent;
    $scope.removeFromClipboard = removeFromClipboard;

    $scope.export = exportSchema;

    $scope.onLoad = onLoad;

    $scope.importFile = null;

    var clipboardIndex = 6;

    $scope.toolbar = {
      title: 'Fields Toolbar',
      groups: [{
        id: 0,
        open: false,
        disabled: false,
        title: 'Layout',
        icon: 'fa fa-dashboard',
        allowDelete: false,
        components: [
          OdsFormService.newSectionObject()
        ]
      }, {
        id: 1,
        open: false,
        disabled: false,
        title: 'Text input fields',
        icon: 'fa fa-dashboard',
        allowDelete: false,
        components: [
          OdsFormService.newFieldTextObject(),
          OdsFormService.newFieldNumberObject(),
          OdsFormService.newFieldPasswordObject(),
          OdsFormService.newFieldTextareaObject()
        ]
      }, {
        id: 2,
        open: false,
        disabled: false,
        title: 'Select input fields',
        icon: 'fa fa-dashboard',
        allowDelete: false,
        components: [
          OdsFormService.newFieldRadioListObject(),
          OdsFormService.newFieldSelectObject(),
          OdsFormService.newFieldSelect2Object(),
          OdsFormService.newFieldMultiSelectObject()

        ]
      }, {
        id: 3,
        open: false,
        disabled: false,
        title: 'Check input fields',
        icon: 'fa fa-dashboard',
        allowDelete: false,
        components: [
          OdsFormService.newFieldCheckBoxObject(),
          OdsFormService.newFieldCheckBoxListObject(),
          OdsFormService.newFieldToggleObject()
        ]
      }, {
        id: 4,
        open: false,
        disabled: false,
        title: 'DateTime fields',
        icon: 'fa fa-dashboard',
        allowDelete: false,
        components: [
          OdsFormService.newDateTimeObject()
        ]
      }, {
        id: 5,
        open: false,
        disabled: false,
        title: 'Plugins',
        icon: 'fa fa-dashboard',
        allowDelete: false,
        components: [
          OdsFormService.newYesNoObject(),
          OdsFormService.newYesNoCheckboxObject(),
          OdsFormService.newYesNoRadioObject(),
          OdsFormService.newTableObject(),
          OdsFormService.newFieldLabelObject(),
          OdsFormService.newGridRenderObject(),
          OdsFormService.newCKEditorObject(),
          OdsFormService.newOptionsTextAreaObject(),
          OdsFormService.newCanvasPainterObject()
        ]
      }, {
        id: 6,
        open: false,
        disabled: false,
        title: 'Clipboard',
        icon: 'fa fa-dashboard',
        allowDelete: true,
        components: []
      }]
    };

    //We register the update clipboard callback
    OdsFormService.onAddToClipBoard(function (items) {

      $scope.toolbar.groups[clipboardIndex].components = items;
      $sessionStorage.clipBoard = items;
    });

    if ($sessionStorage.clipBoard) {
      OdsFormService.setClipBoard($sessionStorage.clipBoard);
    } else {
      $scope.toolbar.groups[clipboardIndex].components = [];
      $sessionStorage.clipBoard = [];
    }

    function removeFromClipboard(index) {

      dialogs.confirm('Confirm!!!', 'Do you want to remove the component from clipboard?',
        {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

        $scope.toolbar.groups[clipboardIndex].components.splice(index, 1);
        $sessionStorage.clipBoard = $scope.toolbar.groups[clipboardIndex].components;
      });
    }

    function getToolbarComponent(componentType) {

      return OdsFormService.getToolbarComponent(componentType);
    }

    function onLoad(file) {

      EventDataFactory.setData(OdsEvent.IMPORT_FORM, OdsFormService.importForm(file));
    }

    function exportSchema() {

      EventDataFactory.setData(OdsEvent.EXPORT_FORM, '');
    }
  }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsCheckList', odsCheckListDirective);

odsCheckListDirective.$inject = [];

function odsCheckListDirective() {

    var directive = {
        restrict: 'E',
        templateUrl: 'reports/directives/checklist.html',
        scope: {
            list: '=',
            model: '=ngModel',
            height: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.toggleAll = toggleAll;
        $scope.toggleOne = toggleOne;

        init();

        function init() {

            $scope.allSelected = true;
            for (var i = 0; i < $scope.list.length; i++) {
                if (!$scope.list[i].selected) {
                    $scope.allSelected = false;
                }
            }
        }

        function toggleAll() {

            $scope.model = [];
            for (var i = 0; i < $scope.list.length; i++) {
                $scope.list[i].selected = $scope.allSelected;
                if($scope.allSelected) {
                    $scope.model.push($scope.list[i]);
                }
            }
        }

        function toggleOne(element) {

            if (!element.selected) {
                $scope.allSelected = false;
                //remove from model
                var index = findInModel(element);
                if (index !== -1) {
                    $scope.model.splice(index, 1);
                }
            } else {
                $scope.model.push(element);
            }
        }

        function findInModel(element) {

            var index = -1;
            for (var i = 0; i < $scope.model.length; i++) {
                if ($scope.model[i].value === element.value) {
                    index = i;
                }
            }
            return index;
        }

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
  const directive = {
    restrict: 'E',
    templateUrl: 'forms/common/model/model.html',
    scope: {
      model: '=',
      cssClass: '@'
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {
    $scope.copy = copy;

    function copy() {
      OdsFormService.copyJson(angular.toJson($scope.model, true));
    }
  }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSuggestionOptions', SuggestionOptionsDirective);

SuggestionOptionsDirective.$inject = ['OdsFormService', 'OdsCkeditor'];

function SuggestionOptionsDirective(OdsFormService, OdsCkeditor) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/ckeditor/suggestion-options-properties.html',
        scope: {
            field: '=',
            config: '=',
            profile: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        if ($scope.config && $scope.config.ckeditor) {
            $scope.field.options.prefix = $scope.config.ckeditor.prefix ?
                $scope.config.ckeditor.prefix : OdsFormService.defaultCKEditorPrefix();
            $scope.field.options.suffix = $scope.config.ckeditor.suffix ?
                $scope.config.ckeditor.suffix : OdsFormService.defaultCKEditorSuffix();
            $scope.field.options.tokensUrl = $scope.config.ckeditor.tokensUrl ?
                $scope.config.ckeditor.tokensUrl : '';
            $scope.field.options.suggestions = $scope.config.ckeditor.suggestions ?
                $scope.config.ckeditor.suggestions : [];
        }

        $scope.options = initOptions();
        $scope.addOption = addOption;
        $scope.removeOption = removeOption;
        $scope.refreshOption = refreshOption;
        $scope.loadSuggestions = loadSuggestions;
        $scope.loadTokens = loadTokens;

        function initOptions() {

            var options = [];
            for (var i = 0; i < $scope.field.options.suggestions.length; i++) {
                var option = {
                    id: $scope.field.options.suggestions[i].id,
                    label: $scope.field.options.suggestions[i].label
                };
                options.push(option);
            }
            return options;
        }

        function addOption() {

            var option = {
                id: '',
                label: ''
            };

            $scope.options.push(option);
        }

        function removeOption(index) {

            $scope.options.suggestions.splice(index, 1);
        }

        function refreshOption() {

            OdsCkeditor.setOptions($scope.field.name, OdsCkeditor.initOptions($scope.field.options));
            OdsCkeditor.setOptions($scope.field.name + $scope.profile, OdsCkeditor.initOptions($scope.field.options));
        }

        function loadSuggestions(url) {

            OdsFormService.restResource(url).query(function (result) {
                $scope.options = result;
            });
        }

        function loadTokens(url) {

            OdsFormService.restResource(url).get(function (result) {
                $scope.field.options.tokens = result;
            });
        }

        $scope.$watch('options', function (model) {

            var options = [];
            for (var i = 0; i < model.length; i++) {
                var option = {};
                option.id = model[i].id;
                option.label = model[i].label;
                options.push(option);
            }
            $scope.field.options.suggestions = options;
        }, true);
    }
}
/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsGridRenderProps', GridRenderProps);

GridRenderProps.$inject = ['OdsFormService'];

function GridRenderProps(OdsFormService) {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/schema/plugins/grid-render/grid-render-props.html',
    scope: {
      field: '='
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {
  }
}

/**
 * Created by hermeslm on 11/3/2021.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsGridRender', GridRenderDirective);

GridRenderDirective.$inject = ['OdsFormService', 'dialogs'];

function GridRenderDirective(OdsFormService, dialogs) {

  return {
    restrict: 'E',
    templateUrl: 'forms/schema/plugins/grid-render/grid-render.html',
    scope: {
      field: '=',
      config: '='
    },
    link: linkFunc
  };

  /* private helper methods*/

  function linkFunc($scope) {

    $scope.removeRow = removeRow;
    $scope.swapRow = swapRow;

    injectConfig($scope.config.gridRender);

    function injectConfig(gridRenderConfig) {
      if (gridRenderConfig && gridRenderConfig.length > 0) {
        $scope.field.descriptor = gridRenderConfig[0].descriptor
      }
    }

    /**
     * Remove row from section.
     * @param table Table to remove row
     * @param index Row index to remove.
     */
    function removeRow(table, index) {
      OdsFormService.removeRow(table, index);
    }

    /**
     * Swap Row order.
     * @param idx1
     * @param idx2
     */
    function swapRow(idx1, idx2) {
      dialogs.confirm('Confirm!!!', 'Do you want swap this row?',
        {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
        // var _previousValue = [];
        // angular.copy($scope.field.matrix, _previousValue);
        if (idx1 <= -1 || idx2 <= -1 ||
          idx1 >= $scope.field.matrix.length ||
          idx2 >= $scope.field.matrix.length) {
          return;
        }
        $scope.field.matrix[idx1] = $scope.field.matrix.splice(idx2, 1, $scope.field.matrix[idx1])[0];
      });
    }
  }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsAccordionProperties', OdsAccordionProperties);

OdsAccordionProperties.$inject = ['OdsFormService', 'dialogs'];

function OdsAccordionProperties(OdsFormService, dialogs) {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/schema/plugins/options-textarea/accordion-properties.html',
    scope: {
      field: '='
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {

    $scope.addGroup = addGroup;
    $scope.removeGroup = removeGroup;

    function addGroup(field) {
      field.groups.push(OdsFormService.createOptionsGroup());
    }

    function removeGroup(index) {
      dialogs.confirm('Confirm!!!', 'Do you want to remove this group?',
        {
          size: 'sm',
          windowClass: 'ods-dialog'
        })
        .result
        .then(function () {
          $scope.field.groups.splice(index, 1);
        });
    }
  }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsTableProps', TablePropsDirective);

TablePropsDirective.$inject = ['OdsFormService'];

function TablePropsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/table/table-props.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.addRow = addRow;
        $scope.addColumn = addColumn;

        /**
         * Add row to the table
         */
        function addRow() {
            var columnLength = $scope.field.matrix[0].length;
            var row = [];
            for (var i = 0; i < columnLength; i++) {
                row.push(OdsFormService.newItemObject());
            }
            $scope.field.matrix.push(row);
        }

        /**
         * Add column to the table.
         * @param row Row to add column.
         */
        function addColumn() {
            for (var i = 0; i < $scope.field.matrix.length; i++) {
                $scope.field.matrix[i].push(OdsFormService.newItemObject());
            }
        }

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsTable', TableDirective);

TableDirective.$inject = ['OdsFormService', 'dialogs', 'OdsComponentType', 'OdsFieldType'];

function TableDirective(OdsFormService, dialogs, OdsComponentType, OdsFieldType) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/table/table.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.removeRow = removeRow;
        $scope.removeColumn = removeColumn;
        $scope.onAdd = onAdd;
        $scope.cloneRow = cloneRow;
        $scope.swapRow = swapRow;
        $scope.swapColumn = swapColumn;
        $scope.checkItem = checkItem;

        function checkItem(index, item, external, type) {

            //We prevent add recursively a table inside other.
            if (type === OdsComponentType.FIELD && item.type === OdsFieldType.TABLE) {
                dialogs.notify('Information!!!', 'Insert a table into a table cell is not allowed.', {size: 'sm', windowClass: 'ods-dialog'});
                return false;
            } else {
                return item;
            }

        }

        function onAdd(item, type) {

            OdsFormService.onAdd(item, type);
        }

        /**
         * Remove row from section.
         * @param table Table to remove row
         * @param index Row index to remove.
         */
        function removeRow(table, index) {
            OdsFormService.removeRow(table, index);
        }

        /**
         * Add column to current row.
         * @param table Table to remove column
         * @param row Row to add column.
         */
        function removeColumn(table, index) {

            OdsFormService.removeColumn(table, index);
        }

        function cloneRow(table) {

            OdsFormService.cloneRow(table);
        }

        /**
         * Swap Row order.
         * @param index New Row index.
         */
        function swapRow(idx1, idx2) {

            dialogs.confirm('Confirm!!!', 'Do you want swap this row?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                // var _previousValue = [];
                // angular.copy($scope.field.matrix, _previousValue);

                if (idx1 <= -1 || idx2 <= -1 ||
                    idx1 >= $scope.field.matrix.length ||
                    idx2 >= $scope.field.matrix.length) {

                    return;
                }
                $scope.field.matrix[idx1] = $scope.field.matrix.splice(idx2, 1, $scope.field.matrix[idx1])[0];

            });
        }

        /**
         * Swap Row order.
         * @param index New Row index.
         */
        function swapColumn(idx1, idx2) {

            dialogs.confirm('Confirm!!!', 'Do you want swap this column?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                if (idx1 <= -1 || idx2 <= -1 ||
                    idx1 >= $scope.field.matrix[idx1].length ||
                    idx2 >= $scope.field.matrix[idx2].length) {

                    return;
                }
                for (var i = 0; i < $scope.field.matrix.length; i++) {
                    var tmp = angular.copy($scope.field.matrix[i][idx2]);
                    $scope.field.matrix[i][idx2] = angular.copy($scope.field.matrix[i][idx1]);
                    $scope.field.matrix[i][idx1] = tmp;
                }
            });
        }
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsTableTotal', TableTotalDirective);

TableTotalDirective.$inject = ['OdsFormService'];

function TableTotalDirective(OdsFormService) {

    return {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/table/total.html',
        scope: {
            field: '=',
            label: '=',
            colIndex: '='
        },
        link: linkFunc
    };

    /* private helper methods*/

    function linkFunc($scope) {

        $scope.total = 0;
        $scope.label = $scope.label && $scope.label !== '' ? $scope.label : 'Total';

        $scope.$watch('field', function (model) {
            $scope.total = total(model);
        }, true);

        function total(model) {
            var index = $scope.colIndex;
            var total = 0;
            for (var i = 0; i < model.matrix.length; i++) {

                if (model.matrix[i][index].fields.length > 0) {
                    total += OdsFormService.getFieldValueAsNumber(model.matrix[i][index].fields[0]);
                }
            }
            return total;
        }
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFieldCheckboxlistOptions', FieldCheckboxlistOptionsDirective);

FieldCheckboxlistOptionsDirective.$inject = ['OdsFormService'];

function FieldCheckboxlistOptionsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/checkbox-list/checkboxlist-options-properties.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.options = initOptions();
        $scope.addOption = addOption;
        $scope.removeOption = removeOption;

        function initOptions() {

            var options = [];
            for (var i = 0; i < $scope.field.options.length; i++) {
                var option = {
                    id: OdsFormService.getSelectFieldIdValue($scope.field, $scope.field.options[i]),
                    name: OdsFormService.getSelectFieldTitleValue($scope.field, $scope.field.options[i])
                };
                options.push(option);
            }
            return options;
        }

        function addOption() {

            var option = {
                id: '',
                name: ''
            };

            $scope.options.push(option);
        }

        function removeOption(index) {

            $scope.options.splice(index, 1);
        }

        $scope.$watch('options', function (model) {

            var options = [];
            for (var i = 0; i < model.length; i++) {
                var option = {};
                option[OdsFormService.getSelectFieldId($scope.field)] = model[i].id;
                option[OdsFormService.getSelectFieldTitle($scope.field)] = model[i].name;
                options.push(option);
            }
            $scope.field.options = options;
        }, true);
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFieldMultiSelectOptions', FieldMultiSelectOptionsDirective);

FieldMultiSelectOptionsDirective.$inject = ['OdsFormService'];

function FieldMultiSelectOptionsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/multi-select/multi-select-options-properties.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.options = initOptions();
        $scope.addOption = addOption;
        $scope.removeOption = removeOption;
        $scope.toggleSelection = toggleSelection;

        function initOptions() {

            var options = [];
            for (var i = 0; i < $scope.field.options.length; i++) {
                var option = {
                    id: OdsFormService.getSelectFieldIdValue($scope.field, $scope.field.options[i]),
                    name: OdsFormService.getSelectFieldTitleValue($scope.field, $scope.field.options[i])
                };
                options.push(option);
            }
            return options;
        }

        function addOption() {

            var option = {
                id: '',
                name: ''
            };

            $scope.options.push(option);
        }

        function removeOption(index) {

            $scope.options.splice(index, 1);
        }

        function toggleSelection(option) {

            var idx = $scope.field.value.indexOf(option);

            // is currently selected
            if (idx > -1) {
                $scope.field.value.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.field.value.push(option);
            }
        }

        $scope.$watch('options', function (model) {

            var options = [];
            for (var i = 0; i < model.length; i++) {
                var option = {};
                option[OdsFormService.getSelectFieldId($scope.field)] = model[i].id;
                option[OdsFormService.getSelectFieldTitle($scope.field)] = model[i].name;
                options.push(option);
            }
            $scope.field.options = options;
        }, true);
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';
angular
    .module('ods-lib')
    .directive('odsField', FieldDirective);

FieldDirective.$inject = ['OdsFormService', 'dialogs'];

function FieldDirective(OdsFormService, dialogs) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/field/field.html',
        scope: {
            row: '=',
            col: '=',
            config: '=',
            field: '=',
            popoverProps: '@',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        /**
         * This set the field in Schema view disabled.
         * @type {boolean}
         */
        // $scope.fieldDisabled = true;
        $scope.view = '-schema';

        $scope.getUniqueName = getUniqueName;

        $scope.toggleFieldProperties = toggleFieldProperties;
        $scope.getSchemaField = getSchemaField;
        $scope.getSchemaFieldProperties = getSchemaFieldProperties;
        $scope.removeField = removeField;

        $scope.getSelectFieldId = getSelectFieldId;
        $scope.getSelectFieldTitle = getSelectFieldTitle;
        $scope.getSelectFieldTitleValue = getSelectFieldTitleValue;

        $scope.patterns = OdsFormService.getValidationPatterns();
        $scope.onSelectPattern = onSelectPattern;
        $scope.onChangeMinLength = onChangeMinLength;
        $scope.onChangeMaxLength = onChangeMaxLength;
        $scope.onChangeRequired = onChangeRequired;

        $scope.openCalendar = openCalendar;
        $scope.formats = OdsFormService.getDateTimeFormats();
        $scope.formats.push({value: 'custom', option: 'Custom format'});
        $scope.showCustomFormat = $scope.field.selectedFormat === 'custom';
        $scope.onSelectFormat = onSelectFormat;

        $scope.addToClipboard = OdsFormService.addToClipBoard;

        /**
         * Return an unique name to avoid fields name collisions.
         * @returns {boolean}
         */
        function getUniqueName(field) {
            return field.name ? field.name + $scope.view : $scope.view;
        }

        /**
         * Toggle Row properties options.
         * @param field Current field to show properties options.
         */
        function toggleFieldProperties(field) {

            //We check if field width < 300, then properties will sow as popover
            if ($element[0].children[0].clientWidth < 300) {
                $scope.field.popoverProps = !$scope.field.popoverProps;
                field.showProperties = false;
            } else {
                $scope.field.popoverProps = false;
                field.showProperties = !field.showProperties;
            }
        }

        function getSchemaField(field) {

            return OdsFormService.getSchemaField(field);
        }

        function getSchemaFieldProperties(field) {

            return OdsFormService.getSchemaFieldProperties(field);
        }

        function getSelectFieldId(field) {

            return OdsFormService.getSelectFieldId(field);
        }

        function getSelectFieldTitle(field) {

            return OdsFormService.getSelectFieldTitle(field);
        }

        function getSelectFieldTitleValue(field, element) {

            return OdsFormService.getSelectFieldTitleValue(field, element);
        }

        /**
         * Remove field from schema.
         * @param index Field index to remove.
         */
        function removeField(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this field?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                $scope.col.fields.splice(index, 1);
            });

        }

        function onSelectPattern() {

            if ($scope.field.validation) {
                if ($scope.field.patternSelect === '') {
                    delete $scope.field.validation.pattern;
                    delete $scope.field.validation.messages.pattern;
                } else {
                    $scope.field.validation.pattern = $scope.patterns[$scope.field.patternSelect].pattern;
                }
            } else {
                $scope.field.validation = {
                    pattern: $scope.patterns[$scope.field.patternSelect].pattern
                };
            }
        }

        function onChangeMinLength() {

            if ($scope.field.validation) {
                if ($scope.field.validation.minlength === null) {
                    delete $scope.field.validation.minlength;
                    delete $scope.field.validation.messages.minlength;
                }
            }
        }

        function onChangeMaxLength() {

            if ($scope.field.validation) {
                if ($scope.field.validation.minlength === null) {
                    delete $scope.field.validation.minlength;
                    delete $scope.field.validation.messages.minlength;
                }
            }
        }

        function onChangeRequired() {

            if ($scope.field.validation) {
                if (!$scope.field.validation.required) {
                    delete $scope.field.validation.required;
                    delete $scope.field.validation.messages.required;
                }
            }
        }

        /**
         * Open and close Calendar popup
         * @param field
         * @returns {boolean|*}
         */
        function openCalendar(field) {

            field.openInEditMode = !field.openInEditMode;
            return field.openInEditMode;
        }

        /**
         * On select format event in Calendar field.
         */
        function onSelectFormat(selectedFormat) {

            if (selectedFormat === 'custom') {
                $scope.showCustomFormat = true;
                $scope.field.format = 'MM/dd/yyyy';
            } else {
                $scope.showCustomFormat = false;
                $scope.field.format = selectedFormat;
            }
        }

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsRow', RowDirective);

RowDirective.$inject = ['OdsFormService', 'dialogs'];

function RowDirective(OdsFormService, dialogs) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/row/row.html',
        scope: {
            section: '=',
            row: '=',
            config: '=',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        //We get the component name, it i used in form and fields ids and names.
        $scope.name = $scope.row.name;
        $scope.toggleRowProperties = toggleRowProperties;
        $scope.removeRow = removeRow;
        $scope.addColumn = addColumn;
        $scope.removeColumn = removeColumn;
        $scope.onAdd = onAdd;
        $scope.dropCallback = dropCallback;
        $scope.onChangeColWith = onChangeColWith;

        function dropCallback(index, item, external, type) {

            var newObject = OdsFormService.onAdd(item, type);
            return newObject;
        }

        /**
         * Catch onAdd event in drag and drop for setting field properties
         * @param item Field
         * @param type Field type.
         */
        function onAdd() {

            var tmp = $scope.section.rows[$scope.section.rows.length - 1];
            if (tmp.cols.length > 0) {
                if (tmp.cols[0].fields.length > 0) {
                    $scope.section.rows.push(OdsFormService.newRowObject());
                }
            }
        }

        /**
         * Toggle Row properties options.
         * @param row Current row to show properties options.
         */
        function toggleRowProperties(row) {

            row.showProperties = !row.showProperties;
        }

        /**
         * Remove row from section.
         * @param index Row index to remove.
         */
        function removeRow(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this row?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                $scope.section.rows.splice(index, 1);
            });
        }

        /**
         * Add column to current row.
         * @param row Row to add column.
         */
        function addColumn(row) {

            var gridSize = 0;
            for (var i = 0; i < row.cols.length; i++) {

                var size = row.cols[i].cssClass.substr(row.cols[i].cssClass.length - 2);
                size = parseInt(size.replace(/-/g, ''));
                gridSize = gridSize + size;
            }
            if (gridSize < 12) {
                row.cols.push(OdsFormService.newColumnObject(12 - gridSize));
            } else {
                dialogs.notify('Notification', 'Columns can\'t be greater than 12 columns, please fix it!!!',
                    {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                });
            }
        }

        /**
         * Add column to current row.
         * @param row Row to add column.
         */
        function removeColumn(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                $scope.row.cols.splice(index, 1);
            });
        }

        /**
         * Change col width.
         * @param col Column to change width.
         */
        function onChangeColWith(col) {

            col.cssClass = ' col-xs-' + col.width + ' col-sm-' + col.width +
                ' col-md-' + col.width + ' col-lg-' + col.width;
        }
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsSection', SectionDirective);

SectionDirective.$inject = ['OdsFormService', 'dialogs'];

function SectionDirective(OdsFormService, dialogs) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/section/section.html',
        scope: {
            schema: '=',
            section: '=',
            config: '=',
            index: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        //We get the component name, it i used in form and fields ids and names.
        $scope.name = $scope.section.name;
        $scope.toggleProperties = toggleProperties;
        $scope.remove = remove;
        $scope.swap = swap;
        $scope.addRow = addRow;
        $scope.clone = clone;

        /**
         * Toggle Section properties options.
         * @param section Current section to show properties options.
         */
        function toggleProperties(section) {

            section.showProperties = !section.showProperties;
        }

        /**
         * Remove section from schema.
         * @param index Section index to remove.
         */
        function remove(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                $scope.schema.layout.splice(index, 1);
            });
        }

        /**
         * Swap Section order.
         * @param index New Section index.
         */
        function swap(idx1, idx2) {

            dialogs.confirm('Confirm!!!', 'Do you want swap this section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {

                var _previousValue = [];
                angular.copy($scope.schema.layout, _previousValue);

                if (idx1 <= -1 || idx2 <= -1 ||
                    idx1 >= $scope.schema.layout.length ||
                    idx2 >= $scope.schema.layout.length) {

                    return;
                }
                $scope.schema.layout[idx1] = $scope.schema.layout.splice(idx2, 1, $scope.schema.layout[idx1])[0];

            });
        }

        /**
         * Add a new row to the current Section.
         */
        function addRow() {

            $scope.section.rows.push(OdsFormService.newRowObject());
        }

        /**
         * To clone the section down.
         */
        function clone() {

            dialogs.confirm('Confirm!!!', 'Do you want to clone this Section?',
                {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
                $scope.schema = OdsFormService.cloneSection($scope.schema, $scope.section,
                    $scope.section.clonedCanCloned);
            });
        }

    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFieldSelectOptions', FieldSelectOptionsDirective);

FieldSelectOptionsDirective.$inject = ['OdsFormService'];

function FieldSelectOptionsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/select/select-options-properties.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.addOption = addOption;
        $scope.removeOption = removeOption;

        function addOption() {
            var option = {
                value: $scope.field.options.length + 1,
                id: '',
                name: '',
                color: '#FFF'
            };
            $scope.field.options.push(option);
        }

        function removeOption(index) {
            $scope.field.options.splice(index, 1);
        }
    }
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
    .module('ods-lib')
    .directive('odsFieldRadioOptions', FieldRadioOptionsDirective);

FieldRadioOptionsDirective.$inject = ['OdsFormService'];

function FieldRadioOptionsDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/components/radio-list/radio-options-properties.html',
        scope: {
            field: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        $scope.options = initOptions();
        $scope.addOption = addOption;
        $scope.removeOption = removeOption;

        function initOptions() {

            var options = [];
            for (var i = 0; i < $scope.field.options.length; i++) {
                var option = {
                    value: $scope.field.options[i].value,
                    id: OdsFormService.getSelectFieldIdValue($scope.field, $scope.field.options[i]),
                    name: OdsFormService.getSelectFieldTitleValue($scope.field, $scope.field.options[i])
                };
                options.push(option);
            }
            return options;
        }

        function addOption() {

            var option = {
                value: $scope.options.length + 1,
                id: '',
                name: ''
            };

            $scope.options.push(option);
        }

        function removeOption(index) {

            $scope.options.splice(index, 1);
        }

        $scope.$watch('options', function (model) {

            var options = [];
            for (var i = 0; i < model.length; i++) {
                var option = {};
                option.value = model[i].value;
                option[OdsFormService.getSelectFieldId($scope.field)] = model[i].id;
                option[OdsFormService.getSelectFieldTitle($scope.field)] = model[i].name;
                options.push(option);
            }
            $scope.field.options = options;
        }, true);
    }
}

'use strict';

angular
  .module('ods-lib')
  .directive('odsCanvasPainterColorSelector', CanvasPainterColorSelector);

CanvasPainterColorSelector.$inject = ['OdsFormService'];

function CanvasPainterColorSelector(OdsFormService) {

  return {
    restrict: 'AE',
    scope: {
      colorList: '=odsCanvasPainterColorSelector',
      selectedColor: '='
    },
    templateUrl: 'forms/common/fields/plugins/canvas-painter/canvas-painter-color-selector.html',
    link: function (scope) {
      scope.selectedColor = '#ff0';

      scope.setColor = function (col) {
        scope.selectedColor = col;
      };
    }
  };
}

'use strict';

angular
  .module('ods-lib')
  .directive('odsCanvasPainter', CanvasPainterDirective);

CanvasPainterDirective.$inject = ['dialogs'];

function CanvasPainterDirective(dialogs) {

  return {
    restrict: 'E',
    templateUrl: 'forms/common/fields/plugins/canvas-painter/canvas-painter.html',
    scope: {
      field: '='
    },
    link: function postLink(scope, elm) {
      var isTouch = !!('ontouchstart' in window);
      var PAINT_START = isTouch ? 'touchstart' : 'mousedown';
      var PAINT_MOVE = isTouch ? 'touchmove' : 'mousemove';
      var PAINT_END = isTouch ? 'touchend' : 'mouseup';

      scope.version = 0;
      scope.fieldCopy = {}
      angular.copy(scope.field, scope.fieldCopy);

      // background image
      if (scope.fieldCopy.options.imageSrc) {
        var image = new Image();
        image.onload = function () {
          ctx.drawImage(this, 0, 0);
          scope.fieldCopy.options.width = image.width
          scope.fieldCopy.options.height = image.height
        };
        image.src = scope.fieldCopy.options.imageSrc;
      }

      //undo
      if (scope.fieldCopy.options.undo) {
        var undoCache = [];
        scope.$watch(function () {
          return undoCache.length;
        }, function (newVal) {
          scope.version = newVal;
        });

        scope.$watch('version', function (newVal) {
          if (newVal < 0) {
            scope.version = 0;
            return;
          }
          if (newVal >= undoCache.length) {
            scope.version = undoCache.length;
            return;
          }
          undo(newVal);
        });
      }

      //create canvas and context
      var canvas = document.getElementById('ods-canvas');
      canvas.id = scope.fieldCopy.options.canvasId;
      var canvasTmp = document.getElementById('ods-canvas-tmp');
      canvasTmp.id = scope.fieldCopy.options.tmpCanvasId;
      var ctx = canvas.getContext('2d');
      var ctxTmp = canvasTmp.getContext('2d');

      //init variables
      var point = {
        x: 0,
        y: 0
      };
      var ppts = [];

      //set canvas size
      canvas.width = canvasTmp.width = scope.fieldCopy.options.width;
      canvas.height = canvasTmp.height = scope.fieldCopy.options.height;

      //set context style
      ctx.fillStyle = scope.fieldCopy.options.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctxTmp.globalAlpha = scope.fieldCopy.options.opacity;
      ctxTmp.lineJoin = ctxTmp.lineCap = 'round';
      ctxTmp.lineWidth = 10;
      ctxTmp.strokeStyle = scope.fieldCopy.options.color;


      //Watch options
      scope.$watch('field.options.lineWidth', function (newValue) {
        if (typeof newValue === 'string') {
          newValue = parseInt(newValue, 10);
        }
        if (newValue && typeof newValue === 'number') {
          ctxTmp.lineWidth = scope.fieldCopy.options.lineWidth = newValue;
        }
      });

      scope.$watch('field.options.color', function (newValue) {
        if (newValue) {
          //ctx.fillStyle = newValue;
          ctxTmp.strokeStyle = ctxTmp.fillStyle = newValue;
        }
      });

      scope.$watch('field.options.opacity', function (newValue) {
        if (newValue) {
          ctxTmp.globalAlpha = newValue;
        }
      });

      scope.$watch('field.options', function (newValue) {
        if (newValue) {
          scope.fieldCopy.options = newValue;
        }
      });

      var getOffset = function (elem) {
        var bbox = elem.getBoundingClientRect();
        return {
          left: bbox.left,
          top: bbox.top
        };
      };

      var setPointFromEvent = function (point, e) {
        if (isTouch) {
          point.x = e.changedTouches[0].pageX - getOffset(e.target).left;
          point.y = e.changedTouches[0].pageY - getOffset(e.target).top;
        } else {
          point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
          point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
        }
      };


      var paint = function (e) {
        if (e) {
          e.preventDefault();
          setPointFromEvent(point, e);
        }

        // Saving all the points in an array
        ppts.push({
          x: point.x,
          y: point.y
        });

        if (ppts.length === 3) {
          var b = ppts[0];
          ctxTmp.beginPath();
          ctxTmp.arc(b.x, b.y, ctxTmp.lineWidth / 2, 0, Math.PI * 2, !0);
          ctxTmp.fill();
          ctxTmp.closePath();
          return;
        }

        // Tmp canvas is always cleared up before drawing.
        ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);

        ctxTmp.beginPath();
        ctxTmp.moveTo(ppts[0].x, ppts[0].y);

        for (var i = 1; i < ppts.length - 2; i++) {
          var c = (ppts[i].x + ppts[i + 1].x) / 2;
          var d = (ppts[i].y + ppts[i + 1].y) / 2;
          ctxTmp.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
        }

        // For the last 2 points
        ctxTmp.quadraticCurveTo(
          ppts[i].x,
          ppts[i].y,
          ppts[i + 1].x,
          ppts[i + 1].y
        );
        ctxTmp.stroke();
      };

      var copyTmpImage = function () {
        if (scope.fieldCopy.options.undo) {
          scope.$apply(function () {
            undoCache.push(ctx.getImageData(0, 0, canvasTmp.width, canvasTmp.height));
            if (angular.isNumber(scope.fieldCopy.options.undo) && scope.fieldCopy.options.undo > 0) {
              undoCache = undoCache.slice(-1 * scope.fieldCopy.options.undo);
            }
          });
        }
        canvasTmp.removeEventListener(PAINT_MOVE, paint, false);
        ctx.drawImage(canvasTmp, 0, 0);
        ctxTmp.clearRect(0, 0, canvasTmp.width, canvasTmp.height);
        ppts = [];
        scope.fieldCopy.value = canvas.toDataURL();
      };

      var startTmpImage = function (e) {
        e.preventDefault();
        canvasTmp.addEventListener(PAINT_MOVE, paint, false);

        setPointFromEvent(point, e);
        ppts.push({
          x: point.x,
          y: point.y
        });
        ppts.push({
          x: point.x,
          y: point.y
        });

        paint();
      };

      var initListeners = function () {
        canvasTmp.addEventListener(PAINT_START, startTmpImage, false);
        canvasTmp.addEventListener(PAINT_END, copyTmpImage, false);

        if (!isTouch) {
          var MOUSE_DOWN;

          document.body.addEventListener('mousedown', mousedown);
          document.body.addEventListener('mouseup', mouseup);

          scope.$on('$destroy', removeEventListeners);

          canvasTmp.addEventListener('mouseenter', mouseenter);
          canvasTmp.addEventListener('mouseleave', mouseleave);
        }

        function mousedown() {
          MOUSE_DOWN = true;
        }

        function mouseup() {
          MOUSE_DOWN = false;
        }

        function removeEventListeners() {
          document.body.removeEventListener('mousedown', mousedown);
          document.body.removeEventListener('mouseup', mouseup);
        }

        function mouseenter(e) {
          // If the mouse is down when it enters the canvas, start a path
          if (MOUSE_DOWN) {
            startTmpImage(e);
          }
        }

        function mouseleave(e) {
          // If the mouse is down when it leaves the canvas, end the path
          if (MOUSE_DOWN) {
            copyTmpImage(e);
          }
        }
      };

      var undo = function (version) {
        if (undoCache.length > 0) {
          ctx.putImageData(undoCache[version], 0, 0);
          undoCache = undoCache.slice(0, version);
          scope.fieldCopy.value = canvas.toDataURL();
        }
      };

      scope.undoCanvas = function () {
        scope.version--;
      };

      scope.clearCanvas = function () {
        dialogs.confirm('Confirm!!!', 'This operation will erase all draw you did, do you want to proceed?',
          {size: 'sm', windowClass: 'ods-dialog'}).result.then(function () {
          scope.version = 0;
          scope.fieldCopy.value = scope.fieldCopy.options.imageSrc;
        });
      };

      scope.toggleEdit = function () {
        scope.fieldCopy.readonly = !scope.fieldCopy.readonly;
        if(scope.fieldCopy.readonly){
          scope.field.value = canvas.toDataURL();
        }
      };


      initListeners();
    }
  };
}

/**
 * Created by hermeslm on 3/28/17.
 */
'use strict';

angular
  .module('ods-lib')
  .directive('odsCanvasPainterColors', CanvasPainterColors);

CanvasPainterColors.$inject = [];

function CanvasPainterColors() {

  var directive = {
    restrict: 'E',
    templateUrl: 'forms/common/fields/plugins/canvas-painter/line-colors.html',
    scope: {
      colors: '='
    },
    link: linkFunc
  };

  return directive;

  function linkFunc($scope) {
    $scope.addColor = addColor;
    $scope.removeColor = removeColor;

    function addColor() {
      $scope.colors.push('#F9FF33');
    }

    function removeColor(index) {
      $scope.colors.splice(index, 1);
    }

    $scope.$watch('colors', function (model) {
      if (model) {
        var colors = [];
        for (var i = 0; i < model.length; i++) {
          colors.push(model[i]);
        }
        $scope.colors = colors;
      }
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
    .controller('OdsOptionsModalController', OdsOptionsModalController);

  OdsOptionsModalController.$inject = ['$scope', 'OdsFormService', 'field', '$uibModalInstance'];

  function OdsOptionsModalController($scope, OdsFormService, field, $uibModalInstance) {

    const DOT_SEPARATOR = '. ';
    const COMMA_SEPARATOR = ', ';
    $scope.field = field;

    function concatOptionsGroup(group, separator) {
      var value = '';
      if (group && group.optionValue) {
        var optionsValue = concatOptions(group.optionValue);
        if (optionsValue !== '') {
          value += group.groupValue;
          value += optionsValue;
        }
      }
      var result = separator + value;
      return result !== separator ? result : '';
    }

    function concatOptions(optionValue) {
      var result = '';
      Object.entries(optionValue)
        .forEach(function (entry, index) {
          if(entry[1]){
            if(index === 0) {
              result += ' ' + entry[0]
            } else {
              result += COMMA_SEPARATOR + entry[0]
            }
          }
        });
      return result;
    }

    $scope.save = function (field) {
      if (field && field.groups) {
        field.value = '';
        field.groups.forEach(function (group, index) {
            if (index === 0) {
              field.value += concatOptionsGroup(group, '');
            } else {
              field.value += concatOptionsGroup(group, DOT_SEPARATOR);
            }
          }
        );
        field.value += field.value === '' ? field.modal.value : DOT_SEPARATOR + field.modal.value;
      }
      $uibModalInstance.close();
    };

    $scope.clear = function (field) {
      field.value = '';
      field.modal.value = '';
      field.groups.forEach(function (group) {
        group.optionValue = '';
        }
      );
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();

})();