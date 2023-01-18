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
angular.module('ods-lib').run(['$templateCache', function($templateCache) {$templateCache.put('address/address-dialog.html','<form name="addressForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myAddressLabel">Create or edit a Address</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': addressForm.street.$invalid}"><label class="control-label" for="field_street">Street</label><input type="text" class="form-control" name="street" id="field_street" ng-required="true" ng-model="vm.address.street" placeholder="Street..." tabindex="1" autocomplete="street-address"><div ng-show="addressForm.street.$invalid"><p class="help-block" ng-show="addressForm.street.$error.required">This field is required.</p></div></div></div><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': addressForm.mobile.$invalid}"><label class="control-label" for="field_mobile">Mobile</label><input type="text" class="form-control" name="mobile" id="field_mobile" ng-model="vm.address.mobile" placeholder="Mobile..." tabindex="7" autocomplete="tel-national" ng-required="true"><div ng-show="addressForm.mobile.$invalid"><p class="help-block" ng-show="addressForm.mobile.$error.required">This field is required.</p></div></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_street2">Street2</label><input type="text" class="form-control" name="street2" id="field_street2" ng-model="vm.address.street2" placeholder="Street 2..." tabindex="2" autocomplete="address-line2"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_phone">Phone</label><input type="text" class="form-control" name="phone" id="field_phone" placeholder="Phone..." tabindex="8" ng-model="vm.address.phone" autocomplete="tel-national"></div></div></div><div class="row"><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.city.$invalid}"><label class="control-label" for="field_city">City</label><input type="text" class="form-control" name="city" id="field_city" ng-required="true" ng-model="vm.address.city" placeholder="City..." tabindex="3" autocomplete="address-level2"><div ng-show="addressForm.city.$invalid"><p class="help-block" ng-show="addressForm.city.$error.required">This field is required.</p></div></div></div><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.country.$invalid}"><label class="control-label" for="field_country">Country</label><select class="form-control" id="field_country" name="country" ng-model="vm.address.state.country" tabindex="4" ng-required="true" ng-options="country as country.name for country in vm.countries track by country.code" autocomplete="country-name"><option value="" disabled="disabled" hidden>Country...</option></select><div ng-show="addressForm.country.$invalid"><p class="help-block" ng-show="addressForm.country.$error.required">This field is required.</p></div></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_fax">Fax</label><input type="text" class="form-control" name="fax" id="field_fax" ng-model="vm.address.fax" placeholder="Fax..." tabindex="9" autocomplete="fax"></div></div></div><div class="row"><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.zipCode.$invalid}"><label class="control-label" for="field_zipCode">Zip</label><input type="text" class="form-control" name="zipCode" id="field_zipCode" ng-model="vm.address.zip" placeholder="ZIP" tabindex="5" ng-required="true" autocomplete="postal-code"><div ng-show="addressForm.zipCode.$invalid"><p class="help-block" ng-show="addressForm.zipCode.$error.required">This field is required.</p></div></div></div><div class="col-md-3"><div class="form-group" ng-class="{\'has-error\': addressForm.state.$invalid}"><label class="control-label" for="field_state">State</label><select class="form-control" id="field_state" name="state" ng-model="vm.address.state" tabindex="6" ng-required="true" ng-options="state as state.name for state in vm.states | filter:{country:vm.address.state.country} track by state.code" autocomplete="state"><option value="" disabled="disabled" hidden>State...</option></select><div ng-show="addressForm.state.$invalid"><p class="help-block" ng-show="addressForm.state.$error.required">This field is required.</p></div></div></div><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': addressForm.email.$invalid}"><label class="control-label" for="field_email">Email</label><div class="input-group"><span class="input-group-addon" uib-tooltip="Mark it if you don\'t have email"><input type="checkbox" id="field_nonEmail" name="field_nonEmail" ng-model="vm.nonEmail" ng-click="vm.toggleEmail()" style="position: relative;margin-top: 4px;"><!--<label for="field_nonEmail" style="padding-left: 20px;height: 13px;"></label>--> </span><input type="email" class="form-control" name="email" id="field_email" ng-required="true" ng-model="vm.address.email" placeholder="Email..." tabindex="10" autocomplete="email" ng-change="vm.emailChanged()"></div><div ng-show="addressForm.email.$invalid"><p class="help-block" ng-show="addressForm.email.$error.required">This field is required.</p><p class="help-block" ng-show="addressForm.email.$error.email">Email not valid.</p></div></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_notes">Notes</label><textarea rows="3" class="form-control" name="notes" id="field_notes" ng-model="vm.address.notes" placeholder="Notes..." tabindex="11">\n                    </textarea></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button type="button" ng-click="vm.save()" ng-disabled="addressForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span></button></div></form>');
$templateCache.put('address/address.html','<label ng-show="label" class="control-label" for="ods-address">{{label}}</label><div class="input-group"><input type="text" class="form-control" name="ods-address" id="ods-address" readonly="readonly" value="{{printName(ngModel)}}"> <span class="input-group-addon" ng-click="openModal()"><i class="fa fa-external-link"></i></span></div>');
$templateCache.put('file-upload/udt-attach-file.html','<div class="box-footer"><ul class="mailbox-attachments clearfix"><li ng-repeat="item in files track by item.id" data-id="{{item.id}}" ng-hide="item.hide"><span class="pull-right" style="margin-right: 5px; cursor: hand" ng-click="deleteFile(item.id)" ng-if="!disableAttach" uib-tooltip="Delete file"><i class="fa fa-remove" style="color: #a20000"></i> </span><!--<span class="pull-right" style="margin-right: 5px;">--><!--<button class="btn-circle btn-danger btn-circle-xxs"><i class="fa fa-remove"></i></button>--><!--</span>--><!----> <span class="mailbox-attachment-icon"><i ng-if="(item.type.split(\'/\')[0] == applicationType)" class="fa fa-file-pdf-o" ng-click="getFileAttached(item.type, item.id)"></i><!--<i ng-if="(item.type.split(\'/\')[0] == imageType)" class="fa fa-picture-o"></i>--> <a ng-if="(item.type.split(\'/\')[0] == imageType)" ng-click="imageDetail(item.id, item.type);" uib-tooltip="Click to view the image"><i class="fa fa-picture-o"></i> </a><i ng-if="!item.type" class="fa fa-file-pdf-o" ng-click="getFileAttached(item.type, item.id)"></i></span><div class="mailbox-attachment-info"><p class="mailbox-attachment-name"><i class="fa fa-paperclip"></i> {{item.name?item.name.split(\'\')[0]:\'default\'}}</p><span class="mailbox-attachment-size">{{item.size}}</span></div></li><li ng-show="!isSigned && !disableAttach"><span class="mailbox-attachment-icon"><button type="button" ngf-select style="background-color: white; border: aliceblue;" uib-tooltip="Add attachment" ngf-change="attachFile($file, attachFileData)" accept="image/*,pdf,csv"><i class="fa fa-paperclip"></i></button></span><div class="mailbox-attachment-info"><p class="mailbox-attachment-name">Add New Attachment</p></div></li><li ng-if="files.length == 0 && disableAttach"><div class="col-xs-12 block-mt5"><p>No attachments.</p></div></li></ul></div>');
$templateCache.put('forms/form-builder.html','<!--<div class="row">--><!--<div class="col-lg-12">--><!--<button type="button" class="btn btn-success" ng-click="toggleStyle()">--><!--<span class="fa fa-refresh"></span>&nbsp;<span>Toggle style</span>--><!--</button>--><!--</div>--><!--</div>--><div class="row"><div class="col-md-3"><ods-form-toolbar></ods-form-toolbar></div><div class="col-md-9"><uib-tabset><uib-tab index="0" heading="Form information"><ods-form-info schema="schema"></ods-form-info></uib-tab><uib-tab index="1" heading="Form Schema"><ods-schema schema="schema" config="config" debug-mode="debugMode"></ods-schema></uib-tab><uib-tab index="2" heading="Form Preview"><ods-form schema="schema" config="runTimeConfig" on-save="saveForm(schema)"></ods-form></uib-tab><uib-tab index="3" heading="Form Print View"><ods-viewer schema="schema" config="runTimeConfig" css-class="cssClass"></ods-viewer></uib-tab><uib-tab index="4" heading="Form Model" ng-show="debugMode"><ods-model model="schema" css-class="fixed-height"></ods-model></uib-tab></uib-tabset></div></div>');
$templateCache.put('hide-value/input-hide-value.html','<div class="form-group has-feedback"><label ng-show="label" class="control-label" for="{{name}}">{{label}}</label><input name="{{name}}" type="{{type}}" class="form-control" placeholder="{{placeholder}}" ng-model="ngModel" ng-focus="onFocus()" ng-blur="onBlur()" ui-mask="{{mask}}" ng-disabled="ngDisabled" ng-required="ngRequired"> <span class="{{icon}} form-control-feedback" style="cursor: {{cursor}}; pointer-events: all;" ng-click="toggleFn()"></span></div>');
$templateCache.put('hide-value/text-hide-value.html','<span>{{value}}</span> <span class="{{icon}}" style="cursor: {{cursor}}; pointer-events: all;" ng-click="toggleFn()"></span>');
$templateCache.put('img-upload/img-upload-dialog.html','<form name="editForm" role="form" novalidate ng-submit="vm.save()"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myImageLabel">Change/Edit Image</h4></div><div class="modal-body"><div class="row"><div class="col-lg-6" style="text-align: center;"><div class="img-responsive img-thumbnail"><ui-cropper image="vm.original" area-type="{{vm.areaType}}" chargement="\'Loading\'" result-image-size="vm.croppedImageSize" result-image="vm.model" canvas-scalemode="true" change-on-fly="true"></ui-cropper></div></div><div class="col-lg-6" style="text-align: center;"><img class="img-responsive img-thumbnail" ng-src="{{vm.model}}"></div></div><br><div class="row"><div class="col-lg-6"><button type="button" class="btn btn-warning btn-block" ngf-select ngf-change="vm.handleFileSelect($event, $file)" accept="image/*"><i class="fa fa-image" aria-hidden="true"></i> Browse...</button></div></div></div><div class="modal-footer"><button type="button" class="btn btn-info" ng-click="vm.setDefault()"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Restore default</button> <button type="submit" class="btn btn-success"><i class="fa fa-save" aria-hidden="true"></i> Save</button> <button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="vm.clear()"><i class="fa fa-ban" aria-hidden="true"></i> Cancel</button></div></form>');
$templateCache.put('img-upload/img-upload.html','<div ng-if="displayImage"><img class="img-responsive {{cssClass}}" id="imgPicture" ng-src="{{ngModel}}" ng-if="ngModel" ng-click="openModal()" style="cursor: pointer;min-height: 100px"></div><a href="" class="footer-link" ng-if="!displayImage" ng-click="openModal()">{{uploadText}}&nbsp; <i class="fa fa-plus-circle" aria-hidden="true" ng-if="mode === \'insert\'"></i> <i class="fa fa-edit" aria-hidden="true" ng-if="mode === \'edit\'"></i></a>');
$templateCache.put('select-filtered/select-filtered.html','<!--<div class="form-group">--><label for="{{name}}" ng-if="!hideLabel">{{label}}</label><div class="input-group"><ui-select name="{{name}}" id="{{name}}" ng-model="selected.value" ng-disabled="ngDisabled" ui-select-required="ngRequired" close-on-select="true" title="{{tooltip}}" on-select="onSelectFn()"><ui-select-match placeholder="{{placeholder}}"><div ng-class="renderClass($select.selected)" ng-bind-html="getSelectTitleValue($select.selected)"></div></ui-select-match><ui-select-choices repeat="item in filtered | filter:$select.search"><div ng-class="renderClass(item)" ng-bind-html="getSelectTitleValue(item) | highlight: $select.search"></div></ui-select-choices></ui-select><div class="input-group-btn"><div class="btn-group" uib-dropdown is-open="isOpen"><button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled"><span class="fa fa-filter"></span></button><ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu role="menu" aria-labelledby="single-button"><li role="menuitem" ng-repeat="filter in filters" ng-click="toggleFilter(filter)"><a href=""><span ng-class="filter.active ? \'fa fa-check-circle\' : \'fa fa-times-circle\'"></span> {{filter.title}}</a></li><!--<li class="divider"></li>--><!--<li role="menuitem"><a href="#">Separated link</a></li>--></ul></div></div></div><!--</div>-->');
$templateCache.put('reports/param.html','<form name="paramsForm" novalidate show-validation><div class="form-group" ng-class="{\'has-error\': paramsForm.{{param.name}}.$invalid}"><div ng-switch="param.type"><label class="control-label" for="{{param.name}}" ng-hide="hideTitle(param)">{{param.title}}</label><input ng-switch-when="NUMBER" class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-required="getRequired(param)" type="number"> <input ng-switch-when="TEXT" class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-required="getRequired(param)"><div ng-switch-when="DATE" class="input-group" ng-hide="hideParam(param)"><input id="{{param.name}}" class="form-control" name="{{param.name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="getRequired(param)" ng-model="param.value" is-open="param.datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openCalendar(param)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-switch-when="SINGLE_SELECT" ng-hide="hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" ng-model="param.value" ui-select-required="vm.getRequired(param)" close-on-select="true" title="{{param.title}}"><ui-select-match placeholder="{{param.placeholder}}">{{getSelectTitleField(param, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search | limitTo: 500"><div ng-bind-html="getSelectTitleField(param, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div><select ng-switch-when="LIST" class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-options="item.id as item.name for item in param.list" ng-required="getRequired(param)"></select><div ng-switch-when="MULTI_SELECT" ng-hide="hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" multiple="multiple" ng-model="param.value" close-on-select="false" title="{{param.title}}" ui-select-required="getRequired(param)"><ui-select-match placeholder="{{param.placeholder}}">{{getSelectTitleField(param, $item)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search">{{getSelectTitleField(param, element)}}</ui-select-choices></ui-select></div><div ng-switch-when="TABLE_SELECT" ng-hide="hideParam(param)"><div class="navbar-form navbar-right"><div class="text-right"><div class="has-feedback input-group-sm"><input class="form-control" ng-model="param.searchQuery" id="searchQueryrpt-metadata" placeholder="{{param.placeholder}}" ng-change="search(param)"> <span class="glyphicon glyphicon-search form-control-feedback"></span></div></div></div><br><br><table datatable="" dt-options="getDtOptions(param)" dt-columns="getDtColumns(param)" dt-instance="param.dtInstance" class="table table-striped table-bordered table-condensed"></table></div><div ng-switch-when="DRAG_AND_DROP" ng-hide="hideParam(param)"><div class="row"><div class="col-md-6"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title ng-binding">{{param.sourceTitle}}</h3></div><div class="panel-body source-sections"><ul dnd-list="param.list"><li ng-repeat="item in param.list" dnd-draggable="item" dnd-moved="param.list.splice($index, 1)" dnd-effect-allowed="move">{{getSelectTitleField(param, item)}}</li></ul></div></div></div><div class="col-md-6"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title ng-binding">{{param.targetTitle}}</h3></div><div class="panel-body selected-sections"><ul dnd-list="param.value"><li ng-repeat="item in param.value" dnd-draggable="item" dnd-moved="param.value.splice($index, 1)" dnd-effect-allowed="move">{{getSelectTitleField(param, item)}}</li></ul></div></div></div></div></div><div ng-switch-when="CHECK_LIST" ng-hide="hideParam(param)"><ods-check-list list="param.list" ng-model="param.value" height="param.height"></ods-check-list><!--ng-if="hideParam(param)"--><!--ng-required="getRequired(param)"--></div><input ng-switch-default class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="hideParam(param)" ng-model="param.value" ng-required="getRequired(param)"><div ng-show="paramsForm.{{param.name}}.$invalid"><p class="help-block" ng-show="paramsForm.{{param.name}}.$error.required">This field is required.</p></div></div></div></form>');
$templateCache.put('reports/params.html','<form name="paramsForm" novalidate ng-submit="vm.openReport()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myCityLabel">Report Params for:</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><h4>{{vm.report.title}}</h4><ng-include src="\'reports/tpl/one-col.tpl.html\'" ng-if="!vm.report.multiCols"></ng-include><ng-include src="\'reports/tpl/two-col.tpl.html\'" ng-if="vm.report.multiCols"></ng-include></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button ng-disabled="paramsForm.$invalid" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Open</span></button></div></form>');
$templateCache.put('reports/reports.html','<div class="row" ng-show="infoMessage" ng-class="ng-hide"><div class="col-lg-12"><div uib-alert class="alert alert-info alert-dismissible" close="hideInfoMessage()"><h4><i class="icon fa fa-info"></i> Reports info!</h4>If don\'t have a PDF viewer plugin in the browser. No biggie... you can download it. Please select the report and download it from report preview.</div></div></div><div class="row"><div class="col-md-3"><div class="box box-solid"><div class="box-header with-border"><h3 class="box-title">{{reportsGroup.title}}</h3></div><!-- /.box-header --><div class="box-body"><uib-accordion close-others="true"><div uib-accordion-group class="panel-default" heading="{{group.title}}" is-open="group.open" is-disabled="group.disabled" ng-repeat="group in reportsGroup.groups" ng-init="groupIndex = $index"><ul class="list-group list-group-unbordered"><li class="list-group-item" ng-repeat="report in group.reports" ng-init="reportIndex = $index"><a href="" ng-click="openReport(groupIndex, reportIndex)"><b>{{report.title}}</b></a></li></ul></div></uib-accordion></div><!-- /.box-body --></div><!-- /.box --></div><div class="col-md-9"><div class="box box-primary"><div class="box-header with-border"><h3 class="box-title">Report Preview</h3></div><!-- /.box-header --><div class="box-body" style="height: 100vh;"><div ng-show="selectReport" class="ng-hide"><p>Download report: <a ng-click="downloadReport()">{{selectReport.title}}</a></p></div><pdfjs-viewer data="reportFile"></pdfjs-viewer><!--<object embed-src="{{vm.reportFile}}" width="100%" height="100%">--><!--</object>--><!--<object style="height: 90vh;" type="application/pdf" data="{{reportFile}}" width="100%"--><!--height="100%"/>--></div></div></div></div>');
$templateCache.put('signature/signature.html','<div id="signature" class="{{options.cssClass}}"><style type="text/css" scoped>.sig-box {\n            border-radius: 4px;padding: 5px 5px 0;margin-bottom: 5px;\n        }\n        .sig-box-default {\n            border: 1px solid #ccc;"\n        }\n        .sig-box-error {\n            border: 1px solid #a94442;"\n        }</style><div id="{{name}}" class="sig-box {{requiredClass}}"><!--style=">--></div><button type="button" class="btn btn-danger" ng-click="reset()" ng-disabled="disabled"><span class="glyphicon glyphicon-erase"></span> <span>Clear</span></button><!--<button ng-click="getData()">getData</button>--><!--<button ng-click="setData()">setData</button>--></div>');
$templateCache.put('steps-indicator/template.html','<div class="btn-group {{class}}"><button type="button" class="btn btn-primary {{step.status}}" ng-disabled="step.disabled" ng-repeat="step in ngModel" ng-click="onClick(step, $index)">{{step.label}}</button><!--<a class="{{step.status}} {{step.disabled ? \'disabled\': \'\'}}" ng-repeat="step in ngModel" ng-click="changeStatus(step)">{{step.label}}</a>--></div>');
$templateCache.put('wizard-steps/wizard-steps.html','<div class="ods-wizard-content"><div class="ods-wizard-circle ods-wizard clearfix"><div class="steps clearfix"><ul><li class="{{step.status}}" ng-repeat="step in ngModel" ng-class="{ \'first\': $index === 0, \'done\': step.done, \'last\': $index === ngModel.length -1}" ng-show="step.visible"><a href="" ng-click="step.callback()"><span class="step">{{step.label}}</span></a></li><!--<li class="first done">--><!--<a href=""><span class="step">Select template</span></a>--><!--</li>--><!--<li class="current">--><!--<a href="" ui-sref="{{vm.parentName}}.info"><span class="step">Information</span></a>--><!--</li>--><!--<li class="">--><!--<a href="" ui-sref="{{vm.parentName}}.form"><span class="step">Form</span></a>--><!--</li>--><!--<li class="disabled" ng-show="vm.doc.billable"><a href="" ui-sref="{{vm.parentName}}.services">--><!--<span class="step">Services</span></a>--><!--</li>--><!--<li class="disabled">--><!--<a href="" ui-sref="{{vm.parentName}}.attachment"><span class="step">Attachments</span></a>--><!--</li>--><!--<li class="disabled">--><!--<a href="" ui-sref="{{vm.parentName}}.signature"><span class="step">Signature</span></a>--><!--</li>--><!--<li class="disabled last">--><!--<a href="" ui-sref="{{vm.parentName}}.finish"><span class="step">Finish</span></a>--><!--</li>--></ul></div></div></div><!--<div class="ods-breadcrumb {{class}}">--><!--<a class="{{step.status}} {{step.disabled ? \'disabled\': \'\'}}" ng-repeat="step in ngModel" ng-click="changeStatus(step)">{{step.label}}</a>--><!--</div>-->');
$templateCache.put('forms/form/form.html','<div ng-if="schema"><div class="form-header with-border"><h3 class="box-title" ng-hide="schema.hideLabel" ng-bind-html="schema.label"></h3></div><!-- form start --><div ng-if="schema.layout.length !== 0"><ng-form name="{{schema.name}}" role="form" novalidate><div class="box-body padding-top"><div class="alert alert-success" ng-show="success"><strong>Success! </strong>{{message}}</div><div class="alert alert-danger" ng-show="error"><strong>Error! </strong>{{message}}</div><div class="alert alert-info" ng-show="info"><strong>Information! </strong>{{message}}</div><div ng-repeat="section in schema.layout"><div class="row"><div class="col-lg-8"><h4 ng-bind-html="section.title" ng-hide="hideTitle(section)"></h4></div><div class="col-lg-4"><div class="box-tools pull-right"><button class="btn btn-warning" type="button" title="Clone Section" ng-if="section.canClone" ng-click="cloneSection(section)"><i class="fa fa-clone"></i></button> <button class="btn btn-danger" type="button" title="Remove Section" ng-if="section.canClone" ng-click="removeSection($index)"><i class="fa fa-trash"></i></button></div></div></div><div class="{{row.cssClass}}" ng-repeat="row in section.rows"><div class="{{col.cssClass}}" ng-repeat="col in row.cols"><div class="" ng-repeat="field in col.fields"><div ng-if="field"><div class="form-group" ng-class="{\'has-error\': {{schema.name}}.{{field.name}}.$invalid}"><label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)">{{field.label}}&nbsp;</label><ng-include src="getFormFieldTemplate(field.type)"></ng-include><div ng-show="{{schema.name}}.{{field.name}}.$invalid"><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.datetime">{{field.validation.messages.datetime}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.required">{{field.validation.messages.required}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.minlength">{{field.validation.messages.minlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.maxlength">{{field.validation.messages.maxlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.pattern">{{field.validation.messages.pattern}}</p></div></div></div></div></div></div></div></div><div class="box-footer" ng-show="schema.handleSubmit"><button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="clear()"><span class="fa fa-trash-o"></span>&nbsp;<span>Clear</span></button> <button type="submit" ng-disabled="{{name}}.$invalid" class="btn btn-primary"><span class="fa fa-save"></span>&nbsp;<span>Save</span></button></div></ng-form></div></div>');
$templateCache.put('forms/form-info/form-info.html','<form name="formInfo" role="form" novalidate ng-submit="save()" show-validation><div class="box-body padding-top"><div class="row"><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formInfo.formName.$invalid}"><label class="control-label" for="formName">Form name</label><input class="form-control" name="formName" id="formName" ng-model="schema.name" ng-required="true"></div></div><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formInfo.formLabel.$invalid}"><label class="control-label" for="formLabel">Form label</label><input class="form-control" name="formLabel" id="formLabel" ng-model="schema.label" ng-required="true"></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{\'has-error\': formInfo.description.$invalid}"><label class="control-label" for="description">Form description</label><textarea class="form-control" name="description" id="description" ng-model="schema.description" ng-required="false" rows="3" placeholder="Type form description...">\n                    </textarea></div></div></div><div class="row"><div class="col-lg-3"><div class="form-group" ng-class="{\'has-error\': formInfo.handleSubmit.$invalid}"><label class="control-label" for="handleSubmit">Handle submit internally: &nbsp;</label><input type="checkbox" name="handleSubmit" id="handleSubmit" ng-model="schema.handleSubmit" ng-required="false" title="Specify if submit is handle by form (in this case you must to specify submit callback) or externally"></div></div><div class="col-lg-9"><div class="form-group" ng-class="{\'has-error\': formInfo.handleSubmit.$invalid}"><label class="control-label" for="hideLabel">Hide form label: &nbsp;</label><input type="checkbox" name="hideLabel" id="hideLabel" ng-model="schema.hideLabel" ng-required="false" title="This allow to hide the form title."></div></div></div></div></form>');
$templateCache.put('forms/schema/schema.html','<div class="box-schema"><div class="alert alert-danger" ng-show="vm.error"><strong>An error has occurred!</strong> Error in schema.</div><div class="container" ng-if="schema.layout.length === 0" style="width: 100%;"><div class="col-lg-12 alert alert-info text-center"><p class="box-schema-area-empty-x"><span class="fa fa-arrow-down"></span></p><p class="lead hidden-phone">To start <strong>Drag</strong> a <strong>section</strong> from the <strong>toolbar</strong> down to this <strong>canvas</strong>.</p></div></div><ul dnd-list="schema.layout" dnd-allowed-types="schema.allowedTypes" dnd-inserted="onAdd(item, type)"><li class="box-schema-section" ng-repeat="section in schema.layout" dnd-draggable="section" dnd-disable-if="section.componentType == undefined" dnd-effect-allowed="move" dnd-moved="schema.layout.splice($index, 1)"><ods-section schema="schema" section="section" config="config" index="$index" debug-mode="debugMode"></ods-section></li></ul></div>');
$templateCache.put('forms/viewer/viewer.html','<div class="{{cssClass}}"><div class="form-header with-border"><h3 class="box-title" ng-hide="schema.hideLabel" ng-bind-html="schema.label"></h3></div><!-- /.box-header --><!-- form start --><div ng-if="schema.layout.length !== 0"><div class="box-body padding-top"><div ng-repeat="section in schema.layout"><h4 ng-bind-html="section.title" ng-hide="hideTitle(section)"></h4><div class="{{row.cssClass}}" ng-repeat="row in section.rows"><div class="{{col.cssClass}}" ng-repeat="col in row.cols"><div class="" ng-repeat="field in col.fields"><div ng-if="field"><div class="form-group" ng-class="{\'has-error\': {{schema.name}}.{{field.name}}.$invalid}"><label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)">{{field.label}}&nbsp;</label><!--ng-if="field.value"--><ng-include src="getFormViewerTemplate(field.type)"></ng-include></div></div></div></div></div></div></div><!--<div class="box-footer" ng-show="schema.handleSubmit">--><!--<button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="clear()">--><!--<span class="fa fa-trash-o"></span>&nbsp;<span>Clear</span>--><!--</button>--><!--<button type="submit" ng-disabled="{{schema.name}}.$invalid" class="btn btn-primary">--><!--<span class="fa fa-save"></span>&nbsp;<span>Save</span>--><!--</button>--><!--</div>--></div></div>');
$templateCache.put('forms/toolbar/field-to-delete.html','<div class="box-draggable"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs btn-primary" type="button" ng-click="vm.addField(field)" title="Add this field."><span class="fa fa-hand-pointer-o"></span></button></div></div><label class="control-label" for="{{field.name}}">{{field.title}}</label><input class="form-control" name="{{field.name}}" id="{{field.name}}">');
$templateCache.put('forms/toolbar/toolbar.html','<div class="toolbar-container box-solid" bs-affix data-offset-top="10" data-offset-bottom="0"><div class="form-header with-border"><div class="row" style="margin: 0"><div class="col-lg-8"><h3 class="box-title">{{toolbar.title}}</h3></div><div class="col-lg-4 accordion-button-right"><label class="btn btn-success"><i class="fa fa-upload"></i> <input type="file" style="display: none;" ng-model="importFile" accept=".json" ods-file-upload></label><!--<button class="btn btn-success"  title="Import Form">--><!--<i class="fa fa-upload"></i>--><!--<input type="file" ng-model="importFile" accept=".json" ods-file-upload>--><!--</button>--> <button class="btn btn-primary" title="Export Form" ng-click="export()"><i class="fa fa-download"></i></button></div></div></div><!-- /.box-header --><div class="box-body"><uib-accordion close-others="true"><div uib-accordion-group class="panel-default" panel-class="panel-toolbar" heading="{{group.title}}" is-open="group.open" is-disabled="group.disabled" ng-repeat="group in toolbar.groups" ng-init="groupIndex = $index"><ul class="toolbar-list list-group no-margin-bottom"><li class="toolbar-component padding-bottom no-padding-top" ng-repeat="component in group.components"><div class="box-toolbar" dnd-draggable="component" dnd-type="component.componentType" dnd-effect-allowed="copy" ng-include="\'forms/toolbar/components/component.html\'"></div></li></ul></div></uib-accordion></div><!-- /.box-body --></div><!-- /.box -->');
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
$templateCache.put('forms/toolbar/plugins/canvas-painter.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div><h3>Canvas Painter Plugin</h3></div>');
$templateCache.put('forms/toolbar/plugins/grid-render.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><table class="table table-bordered table-responsive" id="{{component.name}}"><tbody><tr><td ng-repeat="column in component.descriptor.header">{{ column }}</td></tr></tbody></table>');
$templateCache.put('forms/toolbar/plugins/if-yes-checkbox.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-4"><br ng-if="component.ln"><toggle name="{{component.name}}" id="{{component.name}}" on="{{component.on}}" off="{{component.off}}" ng-model="component.value"></toggle></div><div class="col-lg-8"><div class="checkbox"><label><input type="checkbox" value=""> Option</label></div></div></div>');
$templateCache.put('forms/toolbar/plugins/if-yes-radio.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-3"><br ng-if="component.ln"><label class="radio-inline"><input type="radio" name="{{component.name}}" id="{{component.name}}"> Yes</label><label class="radio-inline"><input type="radio" name="{{component.name}}" id="{{component.name}}"> No</label></div><div class="col-lg-9"><input class="form-control" name="{{component.name}}" id="{{component.name}}"></div></div>');
$templateCache.put('forms/toolbar/plugins/if-yes.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-2"><br ng-if="component.ln"><toggle name="{{component.name}}" id="{{component.name}}" on="{{component.on}}" off="{{component.off}}" ng-model="component.value"></toggle></div><div class="col-lg-10"><input class="form-control" name="{{component.name}}" id="{{component.name}}"></div></div>');
$templateCache.put('forms/toolbar/plugins/options-textarea.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-2"><div class="checkbox"><label><input type="checkbox" value=""></label></div></div><div class="col-lg-10"><input class="form-control" name="{{component.name}}" id="{{component.name}}"></div></div>');
$templateCache.put('forms/toolbar/plugins/table.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><table class="table table-bordered table-responsive" id="{{component.name}}"><!--<thead>--><!--<tr>--><!--<td>#</td>--><!--<td ng-repeat="column in component.columns">{{column.title}}</td>--><!--</tr>--><!--</thead>--><tbody><tr ng-repeat="row in component.matrix"><td ng-repeat="col in row">{{col.name}}</td></tr></tbody></table>');
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
$templateCache.put('forms/schema/plugins/canvas-painter/container.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/canvas-painter/container.html\'"></div>');
$templateCache.put('forms/schema/plugins/ckeditor/ckeditor-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.locked.$invalid}"><label for="locked" class="col-sm-4 control-label" title="Indicates if suggestions are locked in this field.">Suggestions locked:</label><div class="col-sm-8"><input type="checkbox" id="locked" name="locked" ng-model="field.options.locked" class="ng-pristine ng-valid"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.printView.$invalid}"><label for="printView" class="col-sm-4 control-label" title="Indicates if CKEditor will show as print view.">Print View:</label><div class="col-sm-8"><input type="checkbox" id="printView" name="printView" ng-model="field.printView" class="ng-pristine ng-valid"></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.prefix.$invalid}"><label for="prefix" class="col-sm-2 control-label">Prefix:</label><div class="col-sm-2"><input type="text" class="form-control" id="prefix" name="prefix" placeholder="Prefix..." ng-model="field.options.prefix" ng-required="true"></div></div></div></div><div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.suffix.$invalid}"><label for="suffix" class="col-sm-2 control-label">Suffix:</label><div class="col-sm-2"><input type="text" class="form-control" id="suffix" name="suffix" placeholder="Suffix..." ng-model="field.options.suffix" ng-required="true"></div></div></div></div><ods-suggestion-options field="field" config="config" profile="dev"></ods-suggestion-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/ckeditor/ckeditor.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div class="position-relative"><textarea id="{{field.name + dev}}" name="{{field.name + dev}}" placeholder="{{field.placeholder}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" title="{{field.tooltip}}" options="field.options" ods-ckeditor ng-disabled="field.readonly">\n</textarea></div>');
$templateCache.put('forms/schema/plugins/ckeditor/suggestion-options-properties.html','<div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.suggestionsUrl.$invalid}"><label for="suggestionsUrl" class="col-sm-2 control-label">Suggestions Url:</label><div class="input-group col-sm-10" style="padding-left: 15px;"><input type="text" class="form-control" name="suggestionsUrl" id="suggestionsUrl" placeholder="Suggestion Url..." ng-model="field.options.suggestionsUrl"> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="loadSuggestions(field.options.suggestionsUrl)">Load Suggestions</button></span></div></div></div></div><div class="row no-vertical-margin"><div class="col-lg-1"><button class="btn btn-info" type="button" ng-click="refreshOption()" title="Update options in CKEditor">Update <span class="fa fa-refresh"></span></button></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.tokensUrl.$invalid}"><label for="tokensUrl" class="col-sm-2 control-label">Tokens Url:</label><div class="input-group col-sm-10" style="padding-left: 15px;"><input type="text" class="form-control" name="tokensUrl" id="tokensUrl" placeholder="Tokens Url..." ng-model="field.options.tokensUrl"> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="loadTokens(field.options.tokensUrl)">Load Tokens</button></span></div></div></div></div><div class="table-responsive" style="max-height: 300px;overflow-y: auto;margin-top: 20px;"><table class="table table-condensed position-relative"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option" ng-disabled="field.options.locked"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'error\': fieldOptionForm.$invalid }"><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required" ng-disabled="field.options.locked"></td><td><input type="text" ng-model="option.label" class="form-control" ng-required="true"></td><td><button class="btn btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/plugins/grid-render/container.html','<div ng-include="\'forms/schema/components/label.html\'"></div><ods-grid-render field="field" config="config" mode="edit"></ods-grid-render>');
$templateCache.put('forms/schema/plugins/grid-render/grid-render-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.{{field.name}}-cssClass.$invalid}"><label for="{{field.name}}-cssClass" class="col-sm-4 control-label">Class Name:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-cssClass" name="{{field.name}}-cssClass" placeholder="Css Class..." ng-model="field.cssClass" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.{{field.name}}-code.$invalid}"><label for="{{field.name}}-code" class="col-sm-4 control-label">Component code:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-code" name="{{field.name}}-code" placeholder="Code..." ng-model="field.code" ng-required="false"> <span class="help-block">Code is like a identification or type in this form. useful for a component classification.</span></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Layout"><ods-grid-render-props field="field"></ods-grid-render-props></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/grid-render/grid-render-props.html','<div class="padding-top"><form name="fieldPropsForm" class="form-horizontal"><div class="row"><div class="col-md-4 col-sm-4 col-xs-12"><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.{{field.name}}-manageRows.$invalid}"><label for="{{field.name}}-manageRows" class="control-label col-sm-4">Manage rows:</label><input class="col-sm-1" type="checkbox" id="{{field.name}}-manageRows" name="{{field.name}}-manageRows" ng-model="field.manageRows"></div></div></div></form></div>');
$templateCache.put('forms/schema/plugins/grid-render/grid-render.html','<form name="{{field.name}}" class="position-relative"><table class="{{field.cssClass}}" id="{{field.name}}"><thead><tr><th ng-repeat="col in field.descriptor.header" scope="col">{{ col }}</th><th ng-show="field.manageRows" scope="col">Actions</th></tr></thead><tbody><tr ng-repeat="row in field.descriptor.data"><td ng-repeat="col in row" width="{{col.width}}">{{ col }}</td><td ng-show="field.manageRows" width="20px" style="position: relative"><button type="button" ng-click="removeRow(field.descriptor.data, $index)" title="Remove row" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button> <button type="button" ng-click="swapRow($index - 1, $index)" title="Swap row up" class="btn btn-info pull-right" ng-disabled="$index === 0"><span class="fa fa-arrow-up"></span></button> <button type="button" ng-click="swapRow($index, $index + 1)" title="Swap row down" class="btn btn-info pull-right" ng-disabled="$index === field.matrix.length - 1"><span class="fa fa-arrow-down"></span></button></td></tr></tbody></table></form>');
$templateCache.put('forms/schema/plugins/if-yes/if-yes-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-toggleValue.$invalid}"><label for="{{field.name}}-toggleValue" class="col-sm-4 control-label">Toggle value:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-toggleValue" name="{{field.name}}-toggleValue" ng-model="field.value.toggle" class="ng-pristine ng-valid"></div></div></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-textValue.$invalid}"><label for="{{field.name}}-textValue" class="col-sm-4 control-label">Text value:</label><div class="col-sm-8"><input type="text" class="form-control" id="{{field.name}}-textValue" name="{{field.name}}-textValue" placeholder="Text value..." ng-model="field.value.textarea" ng-required="false"></div></div></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/if-yes/if-yes.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/if-yes.html\'"></div>');
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
$templateCache.put('forms/schema/components/checkbox-list/checkbox-list-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.inline.$invalid}"><label for="{{field.name}}-inline" class="col-sm-4 control-label" title="Indicates if will show inline or not.">Inline:</label><div class="col-sm-8"><input type="checkbox" id="{{field.name}}-inline" name="{{field.name}}-inline" ng-model="field.inline"></div></div></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-checkboxlist-options field="field"></ods-field-checkboxlist-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/checkbox-list/checkbox-list.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/checkbox-list.html\'"></div>');
$templateCache.put('forms/schema/components/checkbox-list/checkboxlist-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="{{field.name}}-limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="{{field.name}}-limitTo" name="{{field.name}}-limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><div class="table-responsive" style="max-height: 250px"><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'has-error\': fieldOptionForm.$invalid }"><td><input type="checkbox" name="{{field.name}}Selected[]" ng-model="field.value[option.id]"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" ng-required="true"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table></div>');
$templateCache.put('forms/schema/components/datetime/datetime-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.formatSelector.$invalid}"><label for="formatSelector" class="col-sm-4 control-label">Format</label><div class="col-sm-8"><select name="formatSelector" id="formatSelector" ng-model="field.selectedFormat" class="form-control" ng-change="onSelectFormat(field.selectedFormat)"><option value="">Select format...</option><option ng-repeat="format in formats" value="{{format.value}}">{{format.option}}</option></select></div></div></div><div class="row no-vertical-margin" ng-show="showCustomFormat"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.format.$invalid}"><label for="format" class="col-sm-4 control-label">Custom Format</label><div class="col-sm-8"><input type="text" class="form-control" id="format" name="format" ng-model="field.format" ng-required="false" ng-value="selectedFormat"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.enableTime.$invalid}"><label for="enableTime" class="col-sm-4 control-label" title="Indicates if component time is enabled for this field.">Time enable:</label><div class="col-sm-8"><input type="checkbox" id="enableTime" name="enableTime" ng-model="field.enableTime" class="ng-pristine ng-valid"></div></div></div><!--<div class="row no-vertical-margin">--><!--<div class="form-group margin-bottom"--><!--ng-class="{\'has-error\': fieldPropertiesForm.utc.$invalid}">--><!--<label for="utc" class="col-sm-4 control-label"--><!--title="Indicates Time in UTC or not for this field.">UTC:</label>--><!--<div class="col-sm-8">--><!--<input type="checkbox" id="utc" name="utc" ng-model="field.utc"--><!--class="ng-pristine ng-valid" ng-change="onChangeUTCOption()">--><!--</div>--><!--</div>--><!--</div>--><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/datetime/datetime.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div class="input-group"><input id="{{getUniqueName(field)}}" ods-dynamic-name="getUniqueName(field)" class="form-control" type="text" enable-time="field.enableTime" datetime-picker="{{field.format}}" ng-required="getRequired(field)" ng-model="field.value" is-open="field.openInEditMode" model-options="field.modelOptions" ng-disabled="field.readonly" datepicker-append-to-body="true"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openCalendar(field)" ng-disabled="field.readonly"><i class="fa fa-calendar"></i></button></span></div>');
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
$templateCache.put('forms/schema/components/text/text-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/pattern-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/minlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/maxlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/textarea/textarea-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/minlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/maxlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/textarea/textarea.html','<div ng-include="\'forms/schema/components/label.html\'"></div><textarea class="form-control" name="{{getUniqueName(field)}}" id="{{getUniqueName(field)}}" ng-required="{{field.required}}" title="{{field.tooltip}}" rows="{{field.rows}}" placeholder="{{field.placeholder}}" ng-model="field.value" ng-model-options="{ debounce: 1000 }" data-resize="disabled" ng-readonly="field.readonly">\n</textarea>');
$templateCache.put('forms/schema/components/toggle/ln-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.ln.$invalid}"><label for="ln" class="col-sm-4 control-label" title="Print a new line between label and field.">New line:</label><div class="col-sm-8"><input type="checkbox" id="ln" name="ln" ng-model="field.ln" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/toggle/toggle-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/toggle/toggle.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/toggle.html\'"></div>');
$templateCache.put('forms/schema/components/select2/select-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-select-options field="field"></ods-field-select-options></div></form></uib-tab><uib-tab index="2" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/select2/select2.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/select2.html\'"></div>');
$templateCache.put('forms/common/fields/plugins/canvas-painter/canvas-painter-color-selector.html','<ul class="odsCanvasSelector"><li ng-repeat="color in colorList track by $index" class="odsCanvasColor" ng-class="{\'active\': (selectedColor === color)}" ng-style="{\'background-color\':color}" ng-click="setColor(color)"></li></ul>');
$templateCache.put('forms/common/fields/plugins/canvas-painter/canvas-painter-properties.html','<uib-tabset class="nav-tabs"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/text-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.{{field.name}}-background.$invalid}"><label for="{{field.name}}-background" class="col-sm-4 control-label">Background:</label><div class="col-sm-8"><textarea rows="3" class="form-control" id="{{field.name}}-background" name="{{field.name}}-background" ng-model="field.options.imageSrc" placeholder="Paste background base64 code image here..." tabindex="11">\n                            </textarea></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Colors"><form name="fieldColorsForm" class="form-horizontal"><div class="box-body padding-top"><ods-canvas-painter-colors colors="field.options.lineColors"></ods-canvas-painter-colors></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/common/fields/plugins/canvas-painter/canvas-painter.html','<div ng-if="!fieldCopy.readonly" ods-canvas-painter-color-selector="fieldCopy.options.lineColors" selected-color="fieldCopy.options.color" ng-style="{ width: fieldCopy.options.width }"></div><input type="range" min="1" max="50" class="lineWidthSelector" ng-model="fieldCopy.options.lineWidth" ng-if="!fieldCopy.readonly" ng-style="{ width: fieldCopy.options.width }"><div class="row" ng-if="!fieldCopy.readonly"><div class="col-md-12">{{ fieldCopy.options.lineWidth }}</div></div><canvas ng-show="!fieldCopy.readonly" id="ods-canvas" class="odsCanvasPaint" style="position:absolute"></canvas><canvas ng-show="!fieldCopy.readonly" id="ods-canvas-tmp" class="odsCanvasPaint" style="position:relative;top: 0;left: 0"></canvas><figure ng-if="fieldCopy.readonly" class="figure"><img id="ods-canvas-paint-viewer-result" ng-src="{{ fieldCopy.value ? fieldCopy.value : fieldCopy.options.imageSrc }}" width="fieldCopy.width" height="fieldCopy.height"></figure><div class="row"><div class="col-md-12"><button class="btn btn-warning" title="Enable Edit" ng-if="fieldCopy.readonly" ng-click="enableEdit()"><i class="fa fa-pencil"></i></button> <button class="btn btn-success" title="Save Changes" ng-if="!fieldCopy.readonly" ng-click="saveEdit()"><i class="glyphicon glyphicon-ok"></i></button> <button ng-if="!fieldCopy.readonly" class="btn btn-primary" title="Undo" ng-click="undoCanvas()" ng-disabled="version === 0"><i class="fa fa-undo"></i></button> <button ng-if="!fieldCopy.readonly" class="btn btn-danger" title="Clear" ng-click="clearCanvas()" ng-disabled="version === 0"><i class="fa fa-trash"></i></button></div></div>');
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
      $scope.defaultImage = $scope.defaultImage ? $scope.defaultImage : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QHGRXhpZgAATU0AKgAAAAgABFEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAGAAAAAPlEDAAEAAAABAAAAAAAAAADn5+fBwcHAwMC/v7+5ubm8vLzm5ubo6Oi+vr64uLi9vb27u7u6urq3t7fCwsLAwsHCwMHk5OTl5eW2trbf39/V1dXOzs7h4eHj4+Pi4uLa2trFxcXPz8/S0tLc3NzHx8fLy8vW1tbIyMjDw8PKysrExMTX19fMzMzZ2dnR0dHe3t7d3d3Nzc3Q0NDg4ODU1NTGxsbY2NjT09PBwb/b29vBwcPJycnCwb/BwL7Bv8DAwcPCwMPAwr+/wcDCwsDBw8LCwsTBw8C6uLng3t/DwcTBwMXEwL+/wb7AwcXAwMLCwb3b293i4+Xd3tnf4eDBwsTZ3d7AwL68vLrZ3dy7vbzo6Oq9uLzDwcLb29nn5+W5t7i8urvj4eK4ure/w8LFwMS+w7/c2tu5ubvBv8Tn5+nDwsDp5+jp6em7u726vLkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAF/AX8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorH8aeOdP8C6W1zfTBWIPlRKcyTH0A/r0FeT6X+0drU2rxNcQ2K2TTDzAI23LHu5wc9QO+KAPcKKRHWRAykMrDII7iloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiqer+ItP0CPdfXlraLjP72UJn6Z60AXKK4PXf2ivD+lblt2udRkHQQx7Vz7s2P0BriPEP7RutauGTT7eDTY243f62T8z8v6UAe06xrtn4etDcX11Dawj+KR9ufYep9hXmHjb9pRFDW+gweY3T7TOuFH+6vU/U4+hrzC+kvfEF59ovrme6mb+KVyx/DPT6VNb6csYoAjvri88S6i13f3E1zcSdXkbP4D0HsOKsQ2ixLipVUJ0paAPZvgn4q/t7wqLWVs3GmkRHJ5KfwH8hj/gNdlmvAfh94qbwd4pt7ot/o7nypx6oep/Dg/hXvwbeNw5B5B9aACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqG/v4NLs5Li5mjt4Yhl5JGCqo9ya8r8b/tJBXa30CASEcfaplO3/gKf1P5UAer3FzHaQtJNJHFGoyzOwVR+JrmtV+M3hnR2ZZNWglZe0Aab9VBH614HrGr6p4tuvO1G8uLps5AdvlX6L0H4CmRaQAOeaAPXtT/ab0e24tbK/um7Fgsan8ck/pXN6t+0tq95kWOn2dqvrIWlYfjwP0ri005F7VKtsq0AW9U+JfifXwwm1a6jVv4YSIR9PlA/WsT+zZLiQySM0jtyWY5JrSEajtTqAKcWlKvarCWqp2qSigAAxRRRQAUUUUABG4Yr6A+Ht0954I0uSTlvs6qSe+Bj+lfP+M17r8J9Rj1DwHY+WwLQqYnH91ge/wCGD+NAHR0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVj+NfG9j4E0dry+kx/DFEv35m9FH9egrSv76LTLGa4ncRw26GR2PRVAyTXzX418W3PxF8TyXsxZYQdkERPESdh9T1J9aAJPG3xA1P4lahuuW8q0RsxWyH5I/c/3m9z+nSqNppyxjkVNbWywp0qagBqoFHFOoooAKKKKACiiigAooooAKKKKACiiigArofhv49fwNrm6Qs2n3RCzqP4fRx7j9R+Fc9Qw3DFAH0rbXEd3bxyxOskcihkZTlWB6EU+vJPgn8Q20u8XRb1z9mnbFs5/wCWTn+H6Ht6H68et0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwf7RWsyaZ8P/JjyPt9wkDEf3cFj+e0D8TXi+m2wSKvXP2mRnwjp/8A1/L/AOgPXldsMRCgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooADkEMpKspyCOxr6G8Ias2u+F7C8b/AFk8Cs/+9jn9c18817x8LTnwBpn/AFzP/oRoA6CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA83/AGmP+RR0/wD6/l/9AevK7b/UrXq/7S0e7wXYt/dv0z7fI9eUW3+pWgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK96+GS7PAWl/8AXHP6mvBa+g/A1ubXwZpaH732WMkemVBoA1aKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDn/inp0OpfD7VlmjWRYbZ5lz/CyKWBH4ivAbKTfEPpX0R48XzPA+sr/esZx/5DavnLSz+5WgC3RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOij82VVHViBX0pBCttCka/djUKPoK+b9PG6/gHrIv86+kqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAzvGCeZ4S1Rf71pKP8Axw182aUf3Qr6Y8Rr5nh6/X+9byD/AMdNfM2knMdAF2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAktZPJuo37KwP619KCvmc8ivffhxqr614I064kJaRotjE9WKkrn8cUAbdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRQaAMPx/4w0/whoEr303l/aEaOJANzyNjsPxHPQV876T/q61Pih4jm8aePbyR2P2e1kNvAvZUUkfqcn8faqdtB5KUASUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXuvwlRY/h7poVg3yuSR6l2J/nXhVeifs/wCvzJql3pbNut2jNwgP8DAgHH1yPyoA9UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPmnxFZfYfGurQ/8APO8lA+m84ptbHxcsP7O+KOpDHyzlJl98oM/qDWPQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXYfA1tvjtf8AagkH16GuPrtPgRAZfG7N/wA8rZ2P5qP60AeyUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHjv7R2l/Z/E+m3wHy3MBhJHqjZ/k/6VxKnKivcPi34Jbxt4UaOAZvLV/OgH94gEFfxH6gV4cEaFmjkVo5IztZWGCp7gigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0b9nqwLX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';
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
            color: '#ff0',
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
      scope.fieldCopy = angular.copy(scope.field);

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
      var ctxOptions = {
        alpha: true,
        desynchronized: false,
        colorSpace: 'srgb',
        willReadFrequently: true
      }
      var ctx = canvas.getContext('2d', ctxOptions);
      var ctxTmp = canvasTmp.getContext('2d', ctxOptions);

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
      scope.$watch('fieldCopy.options.lineWidth', function (newValue) {
        if (typeof newValue === 'string') {
          newValue = parseInt(newValue, 10);
        }
        if (newValue && typeof newValue === 'number') {
          ctxTmp.lineWidth = scope.fieldCopy.options.lineWidth = newValue;
        }
      });

      scope.$watch('fieldCopy.options.color', function (newValue) {
        if (newValue) {
          //ctx.fillStyle = newValue;
          ctxTmp.strokeStyle = ctxTmp.fillStyle = angular.copy(newValue);
        }
      });

      scope.$watch('fieldCopy.options.opacity', function (newValue) {
        if (newValue) {
          ctxTmp.globalAlpha = angular.copy(newValue);
        }
      });

      scope.$watch('field.options', function (newValue) {
        if (newValue) {
          scope.fieldCopy.options = angular.copy(newValue);
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

      scope.enableEdit = function () {
        scope.fieldCopy.readonly = false;
      };

      scope.saveEdit = function () {
        scope.fieldCopy.readonly = true;
        scope.field.value = canvas.toDataURL();
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