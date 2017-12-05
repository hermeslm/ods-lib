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
        'webcam',
        'nzToggle',
        'dndLists',
        'ngSanitize',
        'cp.ngConfirm',
        'dialogs.main',
        'dialogs.default-translations',
        'ngMessages',
        'mgcrea.bootstrap.affix',
        'ngResource'
    ])
    .config(configFunction)
    .value('version', '1.0')
    .run(function (/*editableOptions */) {
        // editableOptions.theme = 'bs3';
    });

configFunction.$inject = ['$rootScopeProvider'];

function configFunction($rootScopeProvider) {

    //We add this due to a limitation of AngularJS to avoid infinite recursion
    // or infinite loop when dirty checking the model. In our case is because template recursion.
    $rootScopeProvider.digestTtl(15);
}

'use strict';
angular.module('ods-lib').run(['$templateCache', function($templateCache) {$templateCache.put('address/address-dialog.html','<form name="addressForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myAddressLabel">Create or edit a Address</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_street">Street</label><input type="text" class="form-control" name="street" id="field_street" ng-required="true" ng-model="vm.address.street" placeholder="Street..." tabindex="2"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_phone">Phone</label><input type="text" class="form-control" name="phone" id="field_phone" ng-model="vm.address.phone" placeholder="Phone..." tabindex="8"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_street2">Street2</label><input type="text" class="form-control" name="street2" id="field_street2" ng-model="vm.address.street2" placeholder="Street 2..." tabindex="3"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_mobile">Mobile</label><input type="text" class="form-control" name="mobile" id="field_mobile" ng-model="vm.address.mobile" placeholder="Mobile..." tabindex="9"></div></div></div><div class="row"><div class="col-md-6"><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_city">City</label><input type="text" class="form-control" name="city" id="field_city" ng-required="true" ng-model="vm.address.city" placeholder="City..." tabindex="4"></div></div><div class="col-md-6"><div class="form-group"><div class="form-group"><label class="control-label" for="field_country">Country</label><select class="form-control" id="field_country" name="country" ng-model="vm.address.state.country" tabindex="7" ng-required="true" ng-options="country as country.name for country in vm.countries track by country.code"><option value="" disabled="disabled" hidden>Country...</option></select></div></div></div></div></div><div class="col-md-6"><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_fax">Fax</label><input type="text" class="form-control" name="fax" id="field_fax" ng-model="vm.address.fax" placeholder="Fax..." tabindex="10"></div></div></div></div></div><div class="row"><div class="col-md-6"><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label" for="field_zipCode">Zip</label><input type="text" class="form-control" name="zipCode" id="field_zipCode" ng-model="vm.address.zip" placeholder="ZIP" tabindex="6" ng-required="true"></div></div><div class="col-md-6"><label class="control-label" for="field_state">State</label><select class="form-control" id="field_state" name="state" ng-model="vm.address.state" tabindex="5" ng-required="true" ng-options="state as state.name for state in vm.states | filter:{country:vm.address.state.country} track by state.code"><option value="" disabled="disabled" hidden>State...</option></select></div></div></div><div class="col-md-6"><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_email">Email</label><input type="text" class="form-control" name="email" id="field_email" ng-required="true" ng-model="vm.address.email" placeholder="Email..." tabindex="11"></div></div></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label" for="field_notes">Notes</label><textarea rows="3" class="form-control" name="notes" id="field_notes" ng-model="vm.address.notes" placeholder="Notes..." tabindex="12">\n                    </textarea></div></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button type="button" ng-click="vm.save()" ng-disabled="addressForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span></button></div></form>');
$templateCache.put('address/address.html','<label ng-show="label" class="control-label" for="udt-address">{{label}}</label><div class="input-group"><input type="text" class="form-control" name="udt-address" id="udt-address" readonly="readonly" value="{{printName(ngModel)}}"> <span class="input-group-addon" ng-click="openModal()"><i class="fa fa-external-link"></i></span></div>');
$templateCache.put('forms/form-builder.html','<!--<div class="row">--><!--<div class="col-lg-12">--><!--<button type="button" class="btn btn-success" ng-click="toggleStyle()">--><!--<span class="fa fa-refresh"></span>&nbsp;<span>Toggle style</span>--><!--</button>--><!--</div>--><!--</div>--><div class="row"><div class="col-md-3"><ods-form-toolbar></ods-form-toolbar></div><div class="col-md-9"><uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Form information"><ods-form-info schema="schema"></ods-form-info></uib-tab><uib-tab index="1" heading="Form Schema"><ods-schema schema="schema" config="config" debug-mode="debugMode"></ods-schema></uib-tab><uib-tab index="2" heading="Form Preview"><ods-form schema="schema" config="runTimeConfig" on-save="saveForm(schema)"></ods-form></uib-tab><uib-tab index="3" heading="Form Print View"><ods-viewer schema="schema" css-class="cssClass"></ods-viewer></uib-tab><uib-tab index="4" heading="Form Model" ng-show="debugMode"><ods-model model="schema"></ods-model></uib-tab></uib-tabset></div></div>');
$templateCache.put('image-upload/image-upload-dialog.html','<form name="editForm" role="form" novalidate ng-submit="vm.save()"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myImageLabel">Create or edit a Picture</h4></div><div class="modal-body"><div class="row"><div class="col-lg-5"><img data-ng-src="{{\'data:\' + vm.image.pictureContentType + \';base64,\' + vm.image.picture}}" class="img-responsive" ng-if="vm.image.picture"><div ng-if="vm.image.picture" class="help-block clearfix"><span class="pull-left">{{vm.image.pictureContentType}}, {{vm.byteSize(vm.image.picture)}}</span> <button type="button" ng-click="vm.resetUserPicture()" class="btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></div><button type="button" ngf-select class="btn btn-default btn-block" ngf-change="vm.setPicture($file, vm.patient)" accept="image/*">Browse...</button></div><div class="col-lg-5"><div id="webcam"><webcam channel="vm.channel" on-streaming="vm.onSuccess()" on-error="vm.onError(err)" on-stream="vm.onStream(stream)"></webcam><div ng-if="vm.image.picture" class="help-block clearfix"><span class="pull-left"><button class="btn btn-default btn-xs pull-right" type="button" ng-click="vm.makeSnapshot()"><span class="glyphicon glyphicon-camera"></span></button></span></div><canvas ng-hide="true" id="snapshot" width="383" height="383"></canvas></div></div></div><!--<div class="row">--><!--<div class="col-lg-12">--><!--<img data-ng-src="{{\'data:\' + vm.image.pictureContentType + \';base64,\' + vm.image.picture}}"--><!--class="img-responsive" ng-if="vm.image.picture"/>--><!--<div ng-if="vm.image.picture" class="help-block clearfix">--><!--<span--><!--class="pull-left">{{vm.image.pictureContentType}}, {{vm.byteSize(vm.image.picture)}}</span>--><!--<button type="button" ng-click="vm.resetUserPicture()"--><!--class="btn btn-default btn-xs pull-right">--><!--<span class="glyphicon glyphicon-remove"></span>--><!--</button>--><!--</div>--><!--<button type="button" ngf-select class="btn btn-default btn-block"--><!--ngf-change="vm.setPicture($file, vm.image)" accept="image/*">--><!--Browse...--><!--</button>--><!--</div>--><!--</div>--></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button type="submit" ng-disabled="editForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Accept</span></button></div></form>');
$templateCache.put('image-upload/image-upload.html','<img class="img-responsive {{class}}" id="imgPicture" style="{{css}}" data-ng-src="{{\'data:\' + imageType + \';base64,\' + image}}" ng-click="openModal()" style="cursor: pointer;min-height: 100px" alt="User profile picture">');
$templateCache.put('j-signature/j-signature.html','<div id="signature"><div id="jSignature"></div><button type="button" class="btn btn-danger" ng-click="reset()"><span class="glyphicon glyphicon-erase"></span> <span>Clear</span></button><!--<button ng-click="getData()">getData</button>--><!--<button ng-click="setData()">setData</button>--></div>');
$templateCache.put('reports/params.html','<form name="paramsForm" novalidate ng-submit="vm.openReport()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myCityLabel">Report Params for:</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><h4>{{vm.report.title}}</h4><ng-include src="\'app/components/ods-lib/reports/tpl/one-col.tpl.html\'" ng-if="!vm.report.cols"></ng-include><ng-include src="\'app/components/ods-lib/reports/tpl/two-col.tpl.html\'" ng-if="vm.report.cols"></ng-include></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Cancel</span></button> <button ng-disabled="paramsForm.$invalid" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span>Open</span></button></div></form>');
$templateCache.put('reports/reports.html','<div class="row" ng-show="infoMessage" ng-class="ng-hide"><div class="col-lg-12"><div uib-alert class="alert alert-info alert-dismissible" close="hideInfoMessage()"><h4><i class="icon fa fa-info"></i> Reports info!</h4>If don\'t have a PDF viewer plugin in the browser. No biggie... you can download it. Please select the report and download it from report preview.</div></div></div><div class="row"><div class="col-md-3"><div class="box box-solid"><div class="box-header with-border"><h3 class="box-title">{{reportsGroup.title}}</h3></div><!-- /.box-header --><div class="box-body"><uib-accordion close-others="true"><div uib-accordion-group class="panel-default" heading="{{group.title}}" is-open="group.open" is-disabled="group.disabled" ng-repeat="group in reportsGroup.groups" ng-init="groupIndex = $index"><ul class="list-group list-group-unbordered"><li class="list-group-item" ng-repeat="report in group.reports" ng-init="reportIndex = $index"><a ng-click="openReport(groupIndex, reportIndex)"><b>{{report.title}}</b></a></li></ul></div></uib-accordion></div><!-- /.box-body --></div><!-- /.box --></div><div class="col-md-9"><div class="box box-primary"><div class="box-header with-border"><h3 class="box-title">Report Preview</h3></div><!-- /.box-header --><div class="box-body" style="height: 100vh;"><div ng-show="selectReport" class="ng-hide"><p>Download report: <a ng-click="downloadReport()">{{selectReport.title}}</a></p></div><!--<object embed-src="{{vm.reportFile}}" width="100%" height="100%">--><!--</object>--><object style="height: 90vh;" type="application/pdf" data="{{reportFile}}" width="100%" height="100%"></div></div></div></div>');
$templateCache.put('signature/signature.html','<div id="signature" class="{{options.cssClass}}"><style type="text/css" scoped>.sig-box {\n            border-radius: 4px;padding: 5px 5px 0;margin-bottom: 5px;\n        }\n        .sig-box-default {\n            border: 1px solid #ccc;"\n        }\n        .sig-box-error {\n            border: 1px solid #a94442;"\n        }</style><div id="{{name}}" class="sig-box {{requiredClass}}"><!--style=">--></div><button type="button" class="btn btn-danger" ng-click="reset()" ng-disabled="disabled"><span class="glyphicon glyphicon-erase"></span> <span>Clear</span></button><!--<button ng-click="getData()">getData</button>--><!--<button ng-click="setData()">setData</button>--></div>');
$templateCache.put('steps-indicator/template.html','<div class="ods-breadcrumb {{class}}"><a class="{{step.status}}" ng-repeat="step in ngModel" ng-click="changeStatus(step)">{{step.label}}</a></div>');
$templateCache.put('forms/form/form.html','<div class=""><div class="form-header with-border"><h3 class="box-title" ng-bind-html="schema.label"></h3></div><!-- /.box-header --><!-- form start --><div ng-if="schema.layout.length !== 0"><form name="{{schema.name}}" role="form" novalidate show-validation ng-submit="save()"><div class="box-body padding-top"><div class="alert alert-success" ng-show="success"><strong>Success! </strong>{{message}}</div><div class="alert alert-danger" ng-show="error"><strong>Error! </strong>{{message}}</div><div class="alert alert-info" ng-show="info"><strong>Information! </strong>{{message}}</div><div ng-repeat="section in schema.layout"><h4 ng-bind-html="section.title"></h4><div class="{{row.cssClass}}" ng-repeat="row in section.rows"><div class="{{col.cssClass}}" ng-repeat="col in row.cols"><div class="" ng-repeat="field in col.fields"><div ng-if="field"><div class="form-group" ng-class="{\'has-error\': {{schema.name}}.{{field.name}}.$invalid}"><label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)">{{field.label}}&nbsp;</label><ng-include src="getFormFieldTemplate(field.type)"></ng-include><div ng-show="{{schema.name}}.{{field.name}}.$invalid"><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.required">{{field.validation.messages.required}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.minlength">{{field.validation.messages.minlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.maxlength">{{field.validation.messages.maxlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.pattern">{{field.validation.messages.pattern}}</p></div></div></div></div></div></div></div></div><div class="box-footer" ng-show="schema.handleSubmit"><button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="clear()"><span class="fa fa-trash-o"></span>&nbsp;<span>Clear</span></button> <button type="submit" ng-disabled="{{schema.name}}.$invalid" class="btn btn-primary"><span class="fa fa-save"></span>&nbsp;<span>Save</span></button></div></form></div></div>');
$templateCache.put('forms/form-info/form-info.html','<form name="formInfo" role="form" novalidate ng-submit="save()" show-validation><div class="box-body padding-top"><div class="row"><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formSchema.formName.$invalid}"><label class="control-label" for="formName">Form name</label><input class="form-control" name="formName" id="formName" ng-model="schema.name" ng-required="true"></div></div><div class="col-lg-6"><div class="form-group" ng-class="{\'has-error\': formSchema.formLabel.$invalid}"><label class="control-label" for="formLabel">Form label</label><input class="form-control" name="formLabel" id="formLabel" ng-model="schema.label" ng-required="true"></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{\'has-error\': formSchema.description.$invalid}"><label class="control-label" for="description">Form description</label><textarea class="form-control" name="description" id="description" ng-model="schema.description" ng-required="false" rows="3" placeholder="Type form description...">\n                    </textarea></div></div></div><div class="row"><div class="col-lg-12"><div class="form-group" ng-class="{\'has-error\': formSchema.handleSubmit.$invalid}"><label class="control-label" for="handleSubmit">Handle submit internally: &nbsp;</label><input type="checkbox" name="handleSubmit" id="handleSubmit" ng-model="schema.handleSubmit" ng-required="false" title="Specify if submit is handle by form (in this case you must to specify submit callback) or externally"></div></div></div></div></form>');
$templateCache.put('forms/schema/schema.html','<div class="box-schema"><div class="alert alert-danger" ng-show="vm.error"><strong>An error has occurred!</strong> Error in schema.</div><div class="container" ng-if="schema.layout.length === 0" style="width: 100%;"><div class="col-lg-12 alert alert-info text-center"><p class="box-schema-area-empty-x"><span class="fa fa-arrow-down"></span></p><p class="lead hidden-phone">To start <strong>Drag</strong> a <strong>section</strong> from the <strong>toolbar</strong> down to this <strong>canvas</strong>.</p></div></div><ul dnd-list="schema.layout" dnd-allowed-types="schema.allowedTypes"><li class="box-schema-section" ng-repeat="section in schema.layout" dnd-draggable="section" dnd-disable-if="section.componentType == undefined" dnd-effect-allowed="move" dnd-moved="schema.layout.splice($index, 1)"><ods-section schema="schema" section="section" config="config" index="$index" debug-mode="debugMode"></ods-section></li></ul></div>');
$templateCache.put('forms/toolbar/field-to-delete.html','<div class="box-draggable"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs btn-primary" type="button" ng-click="vm.addField(field)" title="Add this field."><span class="fa fa-hand-pointer-o"></span></button></div></div><label class="control-label" for="{{field.name}}">{{field.title}}</label><input class="form-control" name="{{field.name}}" id="{{field.name}}">');
$templateCache.put('forms/toolbar/toolbar.html','<div class="toolbar-container box-solid" bs-affix data-offset-top="10" data-offset-bottom="0"><div class="form-header with-border"><h3 class="box-title">{{toolbar.title}}</h3></div><!-- /.box-header --><div class="box-body"><uib-accordion close-others="true"><div uib-accordion-group class="panel-default" panel-class="panel-toolbar" heading="{{group.title}}" is-open="group.open" is-disabled="group.disabled" ng-repeat="group in toolbar.groups" ng-init="groupIndex = $index"><ul class="list-group no-margin-bottom"><li class="toolbar-component padding-bottom no-padding-top" ng-repeat="component in group.components"><div class="box-toolbar" dnd-draggable="component" dnd-type="component.componentType" dnd-effect-allowed="copy" ng-include="\'forms/toolbar/components/component.html\'"></div></li></ul></div></uib-accordion></div><!-- /.box-body --></div><!-- /.box -->');
$templateCache.put('forms/viewer/viewer.html','<div class="{{cssClass}}"><div class="form-header with-border"><h3 class="box-title" ng-bind-html="schema.label"></h3></div><!-- /.box-header --><!-- form start --><div ng-if="schema.layout.length !== 0"><div class="box-body padding-top"><div ng-repeat="section in schema.layout"><h4 ng-bind-html="section.title"></h4><div class="{{row.cssClass}}" ng-repeat="row in section.rows"><div class="{{col.cssClass}}" ng-repeat="col in row.cols"><div class="" ng-repeat="field in col.fields"><div ng-if="field"><div class="form-group" ng-class="{\'has-error\': {{schema.name}}.{{field.name}}.$invalid}"><label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)">{{field.label}}&nbsp;</label><!--ng-if="field.value"--><ng-include src="getFormViewerTemplate(field.type)"></ng-include><div ng-show="{{schema.name}}.{{field.name}}.$invalid"><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.required">{{field.validation.messages.required}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.minlength">{{field.validation.messages.minlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.maxlength">{{field.validation.messages.maxlength}}</p><p class="help-block" ng-show="{{schema.name}}.{{field.name}}.$error.pattern">{{field.validation.messages.pattern}}</p></div></div></div></div></div></div></div></div><!--<div class="box-footer" ng-show="schema.handleSubmit">--><!--<button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="clear()">--><!--<span class="fa fa-trash-o"></span>&nbsp;<span>Clear</span>--><!--</button>--><!--<button type="submit" ng-disabled="{{schema.name}}.$invalid" class="btn btn-primary">--><!--<span class="fa fa-save"></span>&nbsp;<span>Save</span>--><!--</button>--><!--</div>--></div></div>');
$templateCache.put('reports/tpl/one-col.tpl.html','<div class="form-group" ng-repeat="param in vm.report.params" ng-switch="param.type" ng-class="{\'has-error\': paramsForm.{{param.name}}.$invalid}"><label class="control-label" for="{{param.name}}" ng-hide="vm.hideTitle(param)">{{param.title}}</label><input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-when="NUMBER" type="number"> <input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-when="TEXT"><div class="input-group" ng-switch-when="DATE" ng-hide="vm.hideParam(param)"><input id="{{param.name}}" class="form-control" name="{{param.name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="vm.getRequired(param)" ng-model="param.value" is-open="param.datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.openCalendar($index)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-switch-when="SINGLE_SELECT" ng-hide="vm.hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" ng-model="param.value" ui-select-required="vm.getRequired(param)" close-on-select="true" title="{{param.title}}"><ui-select-match placeholder="{{param.placeholder}}">{{vm.getSelectTitleField(param, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search | limitTo: 500"><div ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div><select class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-switch-when="LIST" ng-model="param.value" ng-options="item.id as item.name for item in param.list" ng-required="vm.getRequired(param)"></select><div ng-switch-when="MULTI_SELECT" ng-hide="vm.hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" multiple="multiple" ng-model="param.value" close-on-select="false" title="{{param.title}}" ui-select-required="vm.getRequired(param)"><ui-select-match placeholder="{{param.placeholder}}">{{vm.getSelectTitleField(param, $item)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search">{{vm.getSelectTitleField(param, element)}}</ui-select-choices></ui-select></div><div ng-switch-when="TABLE_SELECT" ng-hide="vm.hideParam(param)"><div class="navbar-form navbar-right"><div class="text-right"><div class="has-feedback input-group-sm"><input class="form-control" ng-model="param.searchQuery" id="searchQueryrpt-metadata" placeholder="{{param.placeholder}}" ng-change="vm.search($index)"> <span class="glyphicon glyphicon-search form-control-feedback"></span></div></div></div><br><br><table datatable="" dt-options="vm.getDtOptions(param, $index)" dt-columns="vm.getDtColumns(param, $index)" dt-instance="param.dtInstance" class="table table-striped table-bordered table-condensed"></table></div><input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-default><div ng-show="paramsForm.{{param.name}}.$invalid"><p class="help-block" ng-show="paramsForm.{{param.name}}.$error.required">This field is required.</p></div></div>');
$templateCache.put('reports/tpl/two-col.tpl.html','<div class="row" ng-repeat="(indexp, param) in vm.report.params" ng-if="$index % 2 == 0"><div class="col-lg-6"><div class="form-group" ng-switch="param.type" ng-class="{\'has-error\': paramsForm.{{param.name}}.$invalid}"><label class="control-label" for="{{param.name}}" ng-hide="vm.hideTitle(param)">{{param.title}}</label><input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-when="NUMBER" type="number"> <input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-when="TEXT"><div class="input-group" ng-switch-when="DATE" ng-hide="vm.hideParam(param)"><input id="{{param.name}}" class="form-control" name="{{param.name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="vm.getRequired(param)" ng-model="param.value" is-open="param.datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.openCalendar($index)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-switch-when="SINGLE_SELECT" ng-hide="vm.hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" ng-model="param.value" ui-select-required="vm.getRequired(param)" close-on-select="true" title="{{param.title}}"><ui-select-match placeholder="{{param.placeholder}}">{{vm.getSelectTitleField(param, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search | limitTo: 500"><div ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div><select class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-switch-when="LIST" ng-model="param.value" ng-options="item.id as item.name for item in param.list" ng-required="vm.getRequired(param)"></select><div ng-switch-when="MULTI_SELECT" ng-hide="vm.hideParam(param)"><ui-select name="{{param.name}}" id="{{param.name}}" multiple="multiple" ng-model="param.value" close-on-select="false" title="{{param.title}}" ui-select-required="vm.getRequired(param)"><ui-select-match placeholder="{{param.placeholder}}">{{vm.getSelectTitleField(param, $item)}}</ui-select-match><ui-select-choices repeat="element in param.list | filter:$select.search">{{vm.getSelectTitleField(param, element)}}</ui-select-choices></ui-select></div><div ng-switch-when="TABLE_SELECT" ng-hide="vm.hideParam(param)"><div class="navbar-form navbar-right"><div class="text-right"><div class="has-feedback input-group-sm"><input class="form-control" ng-model="param.searchQuery" id="searchQueryrpt-metadata" placeholder="{{param.placeholder}}" ng-change="vm.search($index)"> <span class="glyphicon glyphicon-search form-control-feedback"></span></div></div></div><br><br><table datatable="" dt-options="vm.getDtOptions(param, $index)" dt-columns="vm.getDtColumns(param, $index)" dt-instance="param.dtInstance" class="table table-striped table-bordered table-condensed"></table></div><input class="form-control" name="{{param.name}}" id="{{param.name}}" ng-hide="vm.hideParam(param)" ng-model="param.value" ng-required="vm.getRequired(param)" ng-switch-default><div ng-show="paramsForm.{{param.name}}.$invalid"><p class="help-block" ng-show="paramsForm.{{param.name}}.$error.required">This field is required.</p></div></div></div><div class="col-lg-6" ng-if="$index + 1 < vm.report.params.length"><div class="form-group" ng-switch="vm.report.params[$index + 1].type" ng-class="{\'has-error\': paramsForm.{{vm.report.params[$index + 1].name}}.$invalid}"><label class="control-label" for="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideTitle(vm.report.params[$index + 1])">{{vm.report.params[$index + 1].title}}</label><input class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-switch-when="NUMBER" type="number"> <input class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-switch-when="TEXT"><div class="input-group" ng-switch-when="DATE" ng-hide="vm.hideParam(vm.report.params[$index + 1])"><input id="{{vm.report.params[$index + 1].name}}" class="form-control" name="{{vm.report.params[$index + 1].name}}" uib-datepicker-popup="MM/dd/yyyy" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" is-open="vm.report.params[$index + 1].datePickerOpenStatus"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="vm.openCalendar($index + 1)"><i class="glyphicon glyphicon-calendar"></i></button></span></div><div ng-switch-when="SINGLE_SELECT" ng-hide="vm.hideParam(vm.report.params[$index + 1])"><ui-select name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-model="vm.report.params[$index + 1].value" ui-select-required="vm.getRequired(vm.report.params[$index + 1])" close-on-select="true" title="{{vm.report.params[$index + 1].title}}"><ui-select-match placeholder="{{vm.report.params[$index + 1].placeholder}}">{{vm.getSelectTitleField(vm.report.params[$index + 1], $select.selected)}}</ui-select-match><ui-select-choices repeat="element in vm.report.params[$index + 1].list | filter:$select.search | limitTo: 500"><div ng-bind-html="vm.getSelectTitleField(vm.report.params[$index + 1], element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select></div><select class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-switch-when="LIST" ng-model="vm.report.params[$index + 1].value" ng-options="item.id as item.name for item in vm.report.params[$index + 1].list" ng-required="vm.getRequired(vm.report.params[$index + 1])"></select><div ng-switch-when="MULTI_SELECT" ng-hide="vm.hideParam(vm.report.params[indexp + 1])"><ui-select name="{{vm.report.params[indexp + 1].name}}" id="{{vm.report.params[indexp + 1].name}}" multiple="multiple" ng-model="vm.report.params[indexp + 1].value" close-on-select="false" title="{{vm.report.params[indexp + 1].title}}" ui-select-required="vm.getRequired(vm.report.params[indexp + 1])"><ui-select-match placeholder="{{vm.report.params[indexp + 1].placeholder}}">{{vm.getSelectTitleField(vm.report.params[indexp + 1], $item)}}</ui-select-match><ui-select-choices repeat="element in vm.report.params[indexp + 1].list | filter:$select.search">{{vm.getSelectTitleField(vm.report.params[indexp + 1], element)}}</ui-select-choices></ui-select></div><div ng-switch-when="TABLE_SELECT" ng-hide="vm.hideParam(vm.report.params[$index + 1])"><div class="navbar-form navbar-right"><div class="text-right"><div class="has-feedback input-group-sm"><input class="form-control" ng-model="vm.report.params[$index + 1].searchQuery" id="searchQueryrpt-metadata" placeholder="{{vm.report.params[$index + 1].placeholder}}" ng-change="vm.search($index)"> <span class="glyphicon glyphicon-search form-control-feedback"></span></div></div></div><br><br><table datatable="" dt-options="vm.getDtOptions(vm.report.params[$index + 1], $index)" dt-columns="vm.getDtColumns(vm.report.params[$index + 1], $index)" dt-instance="vm.report.params[$index + 1].dtInstance" class="table table-striped table-bordered table-condensed"></table></div><input class="form-control" name="{{vm.report.params[$index + 1].name}}" id="{{vm.report.params[$index + 1].name}}" ng-hide="vm.hideParam(vm.report.params[$index + 1])" ng-model="vm.report.params[$index + 1].value" ng-required="vm.getRequired(vm.report.params[$index + 1])" ng-switch-default><div ng-show="paramsForm.{{vm.report.params[$index + 1].name}}.$invalid"><p class="help-block" ng-show="paramsForm.{{vm.report.params[$index + 1].name}}.$error.required">This field is required.</p></div></div></div></div>');
$templateCache.put('forms/common/fields/checkbox-list.html','<br ng-if="field.inline"><div ng-class="field.inline === true ? \'checkbox-inline\' : \'checkbox\'" ng-repeat="option in field.options"><label><input type="checkbox" value="{{option.id}}" ng-model="field.value[option.id]"> {{option.name}}</label></div>');
$templateCache.put('forms/common/fields/checkbox.html','<div class="checkbox"><br ng-show="field.ln"><label><input ods-dynamic-name="field.name" id="{{field.name}}" ng-model="field.value" type="{{field.type}}" placeholder="{{field.placeholder}}" ng-required="{{field.required}}" title="{{field.tooltip}}"> <span class="ng-binding ng-scope">{{field.label}}</span></label></div>');
$templateCache.put('forms/common/fields/datetime.html','<div class="input-group input-group-sm"><input id="{{field.name}}" class="form-control" ods-dynamic-name="field.name" type="text" enable-time="field.enableTime" datetime-picker="{{field.format}}" ng-required="getRequired(field)" ng-model="field.value" is-open="field.open" model-options="field.options"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openCalendar(field)"><i class="fa fa-calendar"></i></button></span></div>');
$templateCache.put('forms/common/fields/input.html','<input class="form-control" ods-dynamic-name="field.name" id="{{field.name}}" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" ng-model="field.value" ng-required="getRequired(field)" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" ng-pattern="getPattern(field)">');
$templateCache.put('forms/common/fields/label-empty.html','<!--This template is empty because form directive handle label component internally,\nbut in service must to specify a default template--><div class="{{field.cssClass}}"><span ng-bind-html="field.label"></span></div>');
$templateCache.put('forms/common/fields/multi-select.html','<ui-select name="{{field.name}}" id="{{field.name}}" multiple="multiple" ng-model="field.value" ng-disabled="{{fieldDisabled}}" ui-select-required="getRequired(field)" close-on-select="true" title="{{field.title}}"><ui-select-match placeholder="{{field.placeholder}}">{{getSelectFieldTitleValue(field, $item)}}</ui-select-match><ui-select-choices repeat="element in field.options | filter:$select.search | limitTo: field.limitTo"><div ng-bind-html="getSelectFieldTitleValue(field, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select>');
$templateCache.put('forms/common/fields/no-field.html','<div><h4>Field error</h4><div style="padding: 5px;">Please fix this field: {{field.name}}, Type: {{field.type}}</div></div>');
$templateCache.put('forms/common/fields/radio-list.html','<br ng-if="field.inline"><div ng-class="field.inline === true ? \'radio-inline\' : \'radio\'" ng-repeat="option in field.options | limitTo: field.limitTo"><label><input type="radio" value="{{option.id}}" ng-model="field.value"> {{option.name}}</label></div>');
$templateCache.put('forms/common/fields/select.html','<ui-select ods-dynamic-name="field.name" name="{{field.name}}" id="{{field.name}}" ng-model="field.value" ng-disabled="{{fieldDisabled}}" ui-select-required="getRequired(field)" close-on-select="true" title="{{field.tooltip}}"><ui-select-match placeholder="{{field.placeholder}}">{{getSelectFieldTitleValue(field, $select.selected)}}</ui-select-match><ui-select-choices repeat="element in field.options | filter:$select.search | limitTo: field.limitTo"><div ng-bind-html="getSelectFieldTitleValue(field, element) | highlight: $select.search"></div><!--<small ng-bind-html="vm.getSelectTitleField(param, element) | highlight: $select.search"></small>--><!--{{vm.getSelectTitleField(param, element)}}--></ui-select-choices></ui-select>');
$templateCache.put('forms/common/fields/textarea.html','<textarea class="form-control" ods-dynamic-name="field.name" id="{{field.name}}" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" ng-model="field.value" ng-required="getRequired(field)" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" rows="{{field.rows}}">\n</textarea>');
$templateCache.put('forms/common/fields/toggle.html','<br ng-if="field.ln"><toggle name="{{field.name}}" id="{{field.name}}" on="{{field.on}}" off="{{field.off}}" ng-model="field.value"></toggle>');
$templateCache.put('forms/common/model/model.html','<div class="jsonify padding"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" title="Copy the json data." ng-click="copy()"><span class="fa fa-clipboard"></span></button><!--<button class="btn btn-default btn-xs" type="button" title="Display hidden properties."--><!--ng-click="displayHidden = !displayHidden" ng-class="{ \'active\': displayHidden }"><span--><!--class="fa fa-eye"></span></button>--></div><pre class="{{cssClass}}">{{modelAsJson}}</pre></div>');
$templateCache.put('forms/common/viewer/checkbox-list.html','<div>{{getFieldChecklistFromValues(field)}}</div>');
$templateCache.put('forms/common/viewer/checkbox.html','<div class="checkbox"><br ng-show="field.ln"><label><input ods-dynamic-name="field.name" disabled="disabled" id="{{field.name}}" ng-model="field.value" type="{{field.type}}" placeholder="{{field.placeholder}}" ng-required="{{field.required}}" title="{{field.tooltip}}"> <span class="ng-binding ng-scope">{{field.label}}</span></label></div>');
$templateCache.put('forms/common/viewer/datetime.html','<div ng-bind-html="dateTimeRender(field)"></div>');
$templateCache.put('forms/common/viewer/input.html','<div ng-bind-html="field.value"></div><!--<input class="form-control" ods-dynamic-name="field.name" id="{{field.name}}" placeholder="{{field.placeholder}}"--><!--title="{{field.tooltip}}" ng-model="field.value" ng-required="getRequired(field)" type="{{field.type}}"--><!--ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" ng-pattern="getPattern(field)"/>-->');
$templateCache.put('forms/common/viewer/multi-select.html','<div>{{getFieldTextsFromValues(field)}}</div>');
$templateCache.put('forms/common/viewer/no-template.html','<div><h4>Template error</h4><div style="padding: 5px;">Template not found with type: {{field.type}}</div></div>');
$templateCache.put('forms/common/viewer/radio-list.html','<div ng-bind-html="getRadioTextFromValue(field)"></div>');
$templateCache.put('forms/common/viewer/select.html','<div ng-bind-html="getSelectTextFromValue(field)"></div>');
$templateCache.put('forms/common/viewer/toggle.html','<div ng-bind-html="field.value ? field.on : field.off"></div><!--<br ng-if="field.ln">--><!--<toggle name="{{field.name}}" id="{{field.name}}" on="{{field.on}}" off="{{field.off}}"--><!--ng-model="field.value"></toggle>-->');
$templateCache.put('forms/schema/components/input.html','<div ng-include="\'forms/schema/components/label.html\'"></div><input class="form-control" name="{{field.name}}" id="{{field.name}}" ng-model="field.value" type="{{field.type}}" placeholder="{{field.placeholder}}" ng-required="{{field.required}}" title="{{field.tooltip}}">');
$templateCache.put('forms/schema/components/label.html','<label class="control-label" for="{{field.name}}" ng-hide="hideTitle(field)" ng-bind-html="field.label"></label>');
$templateCache.put('forms/schema/components/no-field-properties.html','<div><h4>Field properties error</h4><div style="padding: 5px;">Field properties template not found, please fix the path, type: {{field.type}}</div></div>');
$templateCache.put('forms/schema/components/no-field.html','<div><h4>Field error</h4><div style="padding: 5px;">Schema template not found, please fix the path, type: {{field.type}}</div></div>');
$templateCache.put('forms/toolbar/components/checkbox-list.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="checkbox" ng-repeat="option in component.options"><label><input type="checkbox" value="{{option.id}}"> {{option.name}}</label></div>');
$templateCache.put('forms/toolbar/components/checkbox.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="checkbox"><label><input type="checkbox" value=""> Option</label></div>');
$templateCache.put('forms/toolbar/components/ckeditor.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><img width="100%" src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SEBAPExIQFhUSFxURFxIVFRYSFhgXFxUXFhcWExUYJiogGBolJxgWITEhJikwLi4uFyAzODMtNyguLisBCgoKDQ0NGhAPFS0lHR8tKzYrMS03LSswLS0rLS4wLS0rKy03Ky03NysrLS0tKy0rKy0tLS0tLSstKy0rLSstLf/AABEIAH4BkAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAgMFBAYBB//EAD8QAAIBAgIGBggFBAICAwEAAAECAAMREiEEExQxUpEiQVFh0dIFMlNxorGy4gYzYnKSI0KBocHCc5M0gvAW/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A/XKaqEToKSQoGQ3kDeZbs7ezo8/tnPTbo0v/AKfKW6dpBUAg9IHJeLqw2/zAns7ezo8/tjZ29lR5/bIaBpBZSS12JNxw9WG3+J806oLBioYKGNiMQvhyv2e+BZs7ezo8/tjZ29nR5/bPlFypwGxyLAi4tYgEWN8sxaVemdIK6NpLKSCtKqwIyIIRiCO+Bds7eyo8/tjZ29nR5/bPJ1SlDSqz0qFUFnxPWOl1TiCPjYGk9x/aVAGQVrAjq9lrIFOzt7Kjz+2Nnb2dHn9s8npiqayaRqatarTd0DbXUo4Q+l1qSKqXw2PqnuKg5DL1HovSC1CkWJvgUEk4iSBYkmwve2+w90CzZ29lR5/bGzt7Ojz+2eb/ABatGpjSuGZL0rDaKujIp1ddi7NT6rKersPVNP8ADXpEVadRgQVWoyqwqtXBAVc1dgCRe/8A+yAaOzt7Ojz+2Nnb2dHn9sklUhbgEnpG2QJzOVzlznjPRv430nXVxpGh10p02VWKriNAG+dbjB34lysMr7yHsdnb2dHn9sbO3s6PP7ZdrJwaZ6TZfVUmxw4iMieEdsC96eHNqdK1wMrE5mwyKjtjACSq06ZsASTZd97WyPZFeqTTBIIJKZb7dNeyKD9N/cv/AGgS2dvZ0ef2xs7ezo8/tnkv/wCj9JY1GoABVmIwG9wVA6V7LvPQPSPVuM9dotdmp02YYWZVLLwsQCR/g5QPmzt7Ojz+2Nnb2dHn9s59J0yqGIAFhnc3OW87s50aJpJZQxt/jdAbO3s6PP7Y2dvZUef2zzf47TS6iJR0bWF2VzhSpqrhauj3JYsoyBO89ZHXacf4BX0mtWsNLGkBFRVTWvjGLFnha5xG391z74HrRgIFqaXJK2sozF73PZkeUns7ezo8/tnPTfNP/LU+dSY/pb0qlPShrtKWlS6S4C9RGYikjgoUOEAEtfEM7qBA9Bs7ezo8/tjZ29nR5/bMf8K+m6Wkiq9J6jIMAtUJZlbpYgb7rjCf8zg/HNA1CpGkabR1VGrUA0c1gGN1trdV1ZZE9pgen2dvZUef2xs7ezo8/tnivQGgGlpqHbPSdULWajgrnSNWVOiGrdxU6OIE5A9gPfPYeltIK0KpCNUOE9AFFJByOdRlUWFzmw3QLdmb2VHn9sbO3s6PP7Z5H0Z6QfXUhsdUXYDFrtBNrmxayVyxtvyBOW6e01kCnZ29nR5/bItTsVxU6fSNrixzsTmCB2GeUb0k70PSOk1NIq0qujPWVKYbCtMIL0gae6prMj0r3xZWnotE0p6lDRalRcLuqOy7rM1Ikix3Zk5QOladycNOnkbXNlzsDkAD2yWzt7Kjz+2cenDFo+lprTRxLUXXA4TTvSA1gbKxX1r36p5KvXx6NR0Q+k8CCrpCDTFOkLUqalQVTXEhCwxHEcRDashRcNgD2+ABgrU6YuCRazbiAeodohKeIXWnStmBcgHI23BTPtd/6iftf5pOPTattGObDpAHCSGsaoBAK53tcZQO3Z29nR5/bGzt7Ojz+2ef9C+mVesgprXUOLMtR2qrYrUZc2J1dYYLMl9zC97ZaGlelqlOo5OE01uLCxJIo6zCTe6vkd62tbO+UDQ2dvZ0ef2xs7ezo8/tnAPTuZBQAgops+IXaqKfRNhcC4O7u75Wvp9tXrDTUdFGw6wk3qAMoAw3YWIuRmM7A2gaL08Ni1Ola4FxY7zYZEDrIk9WnCn8ROcaXrKKuRa7Jdc8iKqg7wDbLrAPcN0uxQJatOFP4iNWnCn8RI4oxQJatOFP4iNWnCn8RI4oxQJatOFP4iV6RTTA/RX1W/tHYZLFK9IboP8AtPygc4JwIQL2wm3LdPr1AbEo2W7d457hykKGYprnY4QbZZW7Zd6QqaHQUNWcoGOEFqlTM2JsM+4wIJUAuQj5793jlvPOSetcEFHscju3H/Mu0RNGqotWm2NG3MtRyD1b7y7YqX6/5v4wOBXAN8NS+YzYtvtfe3cJN61wQUYg5EEKQQd4IvPvo+todfFqamPAbNhqObHsOfcZ17FS/X/N/GBht6K0Utj1D3FrWd1AAysFDWA7rW39s0doPC/+vGVaNp3o+pVNBKytUXECi1XJ6OTdfV1zvOiUsvXzy9d+wnt7oGTU0SiSW1VQEm5KO1K5viu2rYYjfO5nRQYIqoqOFUWAvfL3k3PvMt9IVNEoLjrOUXiZ6lv8m+W8S3RqWj1FDoWKnccdQfMwM/StHpVDd6TE8QOBsgRbEpBt0myv1mT0SmlIMESoMRxm7FyTYC93YnqEnSzZUJNi7qTexsoe2Y/aJ1VqejJ67hci3SqsvRBALZncCyi/6h2wKFrkC2F/9dt+2Nf+huzq3dm/vPOdGj0tHqDEjYxuxLVZhfsuDPtWho6WLNhuQoxVWW7HcBc5k9kDn2g8L/68Y2g8L/68ZZSGiMxRaisy3ui1izCxsbqGuJcNDpXI6eVj679d+/ugcVSqWAGFt6nO3UwJ6+6fcZDE2JBA3W6r+M7G0SiLXxZ5fmP2X7e4z6NCpfq/9j+MDk2k8L/68Y2g8L/68Z01dGoKCzFgFBYk1HyAzJ3z6uiUTuLH3VHP/MDketcEFHscrZeM+JVsLBGA32y6/wDM7F0Okb+vll67+Mjs9CxNzYZE61rD3m+UDkLgsHwNiUMoOWQYqWG/rwryk9oPC/8Arxlml0EQKy4syBmzMLEHtnzRKCviLYsmsLMy5YVPUe8wOcYgFNjkzPbK9mLf4v0px6d6J0Ou+sraHQqvYLjqUaVRrDcMTZ2m3sdHd0v/AGP4z7sVL9f838YGT6O0TR9HBWhoyUgxxFaVNKYJta5C2uZ90zR6dX10qnolOjUendW3hsDC4y65q7FS/X/N/GNipfr/AJv4wMelodJXFQJWxBsd2q1XGLBq8RV3IJw9G9t066lXECpV8wR/b1/5nbsVL9f838Y2Kl+v+b+MDJpUFUhgtS4z/snXtB4X/wBeM+aSoRiFvbCGzJbO7Dec+oTppaJTKqTiuQCTjYdXcbQMU+idFOO9B+mVZjrHvdHNRMJx3SzEkBbb52UUCrSpojKtPIXN7AKQBckk7xvmjsVL9f8AN/GNipfr/m/jAzdIpq6VqVRCyVQysOplZArKcwR1ictf0Voz0F0VqDmilsNMu9ha9s8VyBc5Ezc2Kl+v+b+MbFS/X/N/GBxawlwbEWDDO28lfAypwGQ03RiCTuNv7sQIYEEHccs5pbFS/X/N/GNipfr/AJv4wMqlo9NWDhK5K3IxValQAkEEgO5F7Ei9uuX4xixas4rWxWW9uy972nynmwQk2xsl752Ut1/4El6W0jQ9GQVKzOoJCgA1ajMT1KiXZj7hAiCnR/per6vRXL9vZBZfZ9WD1V9Xh37u6dGgjRq9NatJmZHF1YO/u3E5EdhE5aNQlVJ6wDzECTPcBApABXsAAVgdw90vxSnFGKBdijFKcUYoF2KMUpxRigXYpXXboN7j8pHFIVm6Le4/KBXo7fle9flM/wDG+jaRVXRDRSu5p1w7al6SVVXA4xIaxC3uRznRTcWXO1rHql20txfT4QK/wdo9ajoi06q4WxOwUlWfCzEqazL0WqZ5kZXmtpOksqM6ozlQSEXCGY9gLkLf3kCZu0txfT4RtLcf0+ECv8HU6yaGgr02p1WapUqIzK5xvUZiQyFgRmLZ8ptM9wRcjvFrjvF7i/vEydpbj+nwjaW4/p8IHnfQHovTqOlBVOm09HxVXqCtV0OrTOIkrswppjS533AyJ6857Z6mae8/S0y9pbi+nwjaW4vp8IFH4u0SrpFKno6LdGq02rZjOmhxFAL5kkDfl3zs9Fel6lZ6yvSamKbWUnF/UF2GNLgdA2t23BythLVbS3F9PhG0tx/T4QJ0H/qJ/wCSp8qk+adUdq+EUcYWgxDsOgWeol6eZCk2phiCQRYWvc2pDAWN8wb3y3m9/mecs2luL6fCB2ejSVSxppTNz0VCge+ykj/c4/xHTLrQtotPSMNemxV3CasZg1lJ3lb7uu5jaW4/p8I2luP6fCBdoYYVnY0aaA4v6gCBmz6yGJz37p3LU6Te5f8AtMvaW4/p8I2luL6fCB16UjHrY3P6RYYCMjv5y/RmsoGeXba/+spm7S3F9PhG0tx/T4QJ+naLvTcq9TJKg1aimVclGABxLjvcg9Ej1RPnoLRWpa3EKgxNfpmm3b6pTpf4Y+7rkdpbj+nwjaW4vp8IGpSqb/3f8CePX8JKNF06gF/+TUDpTLmyYbYGqN/cb3c78rDO03Npbi+nwjaW4/p8IFqUBS0fR6AJIpCnTDHeQiYbnlOjQHyf93/VZwPWJtdr2z6oSsRezWvn1dlv+BAq9IejXdqhVfWJJOIC4ythYWcNkAQThy90+PouksC4Zr2Ki5dWwCqthmVYFlUneMzvnRtLcf0+EbS3H9PhAs0KnXWqC7ErgCkliRiCqOioNt4JN1vn62dhpayZO0tx/T4RtLcf0+EDW1k5tLpM7U2WtUQI2JlXDZxb1WxAkD3WM4tpbj+nwjaW4vp8IF+nP0z+wfN5bpSl9HemLXemVF91ylhecDVLkkm9xbq3Z9nvMkukEADHuy/t8IJVT6FXVnwnoYaSLhco5VRWOEsLWCl068wtvfJtD0gg3qVMX9Q3FV1F7pgsAbAZNla2e6WbS3H9PhG0tx/T4QijSdF0o2RSSv8AUFzUdrozPYNds8imZDH3Wz2qDWVQeoAchMzaW4/p8I2luL6fCFa2snNSpMKr1DWqFWAApHDgUjeVIGI37zOLaW4/p8I2luP6fCBOk39Qf+R/m8l+IHYaPUqU1LVaas1IrSWtUViLXpoxF2sTlcTmDDLPMHFfLeb3P+zLNpbj+nwgdHoLQl0eglFWdrXdme2Jndi7s1sgSSchunNo7dBP2r8hPu0tx/T4StWAAAtllAvxRilOsHaI1g7RCLsUYpTrB2iNYO0QLsUYpTrB2iNYO0QLsUjVbot7j8pXrB2iRqOLHMbj8oHotEpLq0yHqr1DsEt1S8K8hIaJ+XT/AGr8hLoVDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvIRql4V5CTiBDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvIRql4V5CTiBDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvIRql4V5CTiBDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvIRql4V5CTiBDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvIRql4V5CTiBDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvIRql4V5CTiBDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvIRql4V5CTiBDVLwryEapeFeQk4gQ1S8K8hGqXhXkJOIENUvCvISrS6a6t8h6rdQ7DOiVaX+W/wC1vkYHzRPy6f7V+Ql0p0T8un+1fkJdAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBKtL/Lf9rfIy2VaX+W/7W+RgfNE/Lp/tX5CXSnRPy6f7V+Ql0BERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEq0v8t/2t8jLZVpf5b/tb5GB80T8un+1fkJdMrR67YE6TeqOHs90s2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0YmdtDcTfD5Y2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0YmdtDcTfD5Y2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0YmdtDcTfD5Y2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0YmdtDcTfD5Y2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0YmdtDcTfD5Y2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0YmdtDcTfD5Y2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0YmdtDcTfD5Y2huJvh8sDRiZ20NxN8PljaG4m+HywNGJnbQ3E3w+WNobib4fLA0ZTpf5b/ALW+RnJtDcTfD5ZXpFc4H6TeqeHs90Dkov0V9w+UyKNXTBcENhxvdjgLhS9TDq87EW1e/cCfcOhNLAAGe4SW2DvgZ+kaXpq2qsPURmKLhKMf6RCLncsf6gHfb/O5o7tgXGQWsMRGQvbOwnGNMHfPm1jvhD0RpVdwWqDIqCCQFOK7YgAP7bBN+eZmjrJn7YO+fNrHfA0dZGsmdtY742sd8DR1kayZ21jvjax3wNHWRrJnbWO+NrHfA0dZGsmdtY742sd8DR1kayZ21jvjax3wNHWRrJnbWO+NrHfA0dZGsmdtY742sd8DR1kayZ21jvjax3wNHWRrJnbWO+NrHfA0dZGsmdtY742sd8DR1kayZ21jvjax3wNHWRrJnbWO+NrHfA0dZGsmdtY742sd8DR1kayZ21jvjax3wNHWRrJnbWO+NrHfA0dZGsmdtY742sd8DR1kayZ21jvjax3wNHWRrJnbWO+NrHfA0dZGsmdtY742sd8DR1kayZ21jvjax3wNHWRrJnbWO+NrHfA0dZIVn6Le4/KcO1jvnx9LFiM9xhX/2Q=="><!--<textarea id="{{component.name}}" name="{{component.name}}" ng-model="content" ck="ck" options="options"--><!--ods-ckeditor></textarea>-->');
$templateCache.put('forms/toolbar/components/component.html','<div class="" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-xs btn-primary" type="button" title="Add this field."><span class="fa fa-hand-pointer-o"></span></button></div></div><div class="box-body"><div ng-include="getToolbarComponent(component)"></div></div></div>');
$templateCache.put('forms/toolbar/components/datetime.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="input-group input-group-sm"><input id="{{component.name}}" type="text" class="form-control" name="{{component.name}}" ng-required="getRequired(field)" datetime-picker="{{field.format}}" ng-model="field.value" is-open="field.open" ng-disabled="true"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click=""><i class="fa fa-calendar"></i></button></span></div>');
$templateCache.put('forms/toolbar/components/input.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><input class="form-control" type="{{component.type}}" name="{{component.name}}" id="{{component.name}}">');
$templateCache.put('forms/toolbar/components/label.html','<label class="control-label" for="{{component.name}}">{{component.label}}</label>');
$templateCache.put('forms/toolbar/components/multi-select.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><select name="{{component.name}}" id="{{component.name}}" class="form-control"><option value="1">Option 1, 2, 3...</option></select>');
$templateCache.put('forms/toolbar/components/no-component.html','<div><h3>Component error</h3><div style="padding: 5px;">Component template not found, please fix the path, type: {{component.componentType}}</div></div>');
$templateCache.put('forms/toolbar/components/radio-list.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><div class="radio" ng-repeat="option in component.options"><label><input type="{{component.type}}" value="{{option.id}}"> {{option.name}}</label></div>');
$templateCache.put('forms/toolbar/components/section.html','<div class=""><h3>Section Component</h3><!--<div style="padding: 5px;">This add a Section</div>--></div>');
$templateCache.put('forms/toolbar/components/select.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><select name="{{component.name}}" id="{{component.name}}" class="form-control"><option value="1">Option 1...</option></select>');
$templateCache.put('forms/toolbar/components/textarea.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><textarea class="form-control" name="{{component.name}}" id="{{component.name}}" rows="{{component.rows}}" placeholder="{{component.placeholder}}">\n</textarea>');
$templateCache.put('forms/toolbar/components/toggle.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><br ng-if="component.ln"><toggle name="{{component.name}}" id="{{component.name}}" on="{{component.on}}" off="{{component.off}}" ng-model="component.value"></toggle>');
$templateCache.put('forms/toolbar/plugins/if-yes.html','<div class="row"><div class="col-lg-12"><div ng-include="\'forms/toolbar/components/label.html\'"></div></div></div><div class="row"><div class="col-lg-2"><br ng-if="component.ln"><toggle name="{{component.name}}" id="{{component.name}}" on="{{component.on}}" off="{{component.off}}" ng-model="component.value"></toggle></div><div class="col-lg-10"><input class="form-control" name="{{component.name}}" id="{{component.name}}"></div></div>');
$templateCache.put('forms/toolbar/plugins/table.html','<div ng-include="\'forms/toolbar/components/label.html\'"></div><table class="table table-bordered table-responsive" id="{{component.name}}"><!--<thead>--><!--<tr>--><!--<td>#</td>--><!--<td ng-repeat="column in component.columns">{{column.title}}</td>--><!--</tr>--><!--</thead>--><tbody><tr ng-repeat="row in component.matrix"><td ng-repeat="col in row">{{col.name}}</td></tr></tbody></table>');
$templateCache.put('forms/common/fields/plugins/ckeditor.html','<div ng-if="field.printView" ng-bind-html="valueSubtitutor(field.value, field.options.tokens, field.options.prefix, field.options.suffix)"></div><div ng-if="!field.printView" class="position-relative"><textarea id="{{field.name}}" name="{{field.name}}" placeholder="{{field.placeholder}}" ng-model="field.value" title="{{field.tooltip}}" ck="ck" options="field.options" ods-ckeditor ng-disabled="field.readonly"></textarea></div>');
$templateCache.put('forms/common/fields/plugins/if-yes.html','<br ng-if="field.ln"><toggle name="{{field.name}}" id="{{field.name}}" on="{{field.on}}" off="{{field.off}}" ng-model="field.value.toggle"></toggle><textarea class="form-control" name="{{field.name}}" id="{{field.name}}" placeholder="{{field.placeholder}}" title="{{field.tooltip}}" style="margin-top: 10px;" ng-model="field.value.textarea" ng-required="field.value.toggle" type="{{field.type}}" ng-minlength="getMinLength(field)" ng-maxlength="getMaxLength(field)" rows="{{field.rows}}" ng-show="field.value.toggle"></textarea>');
$templateCache.put('forms/common/fields/plugins/table.html','<table class="{{field.cssClass}}" id="{{field.name}}"><tbody><tr ng-repeat="row in field.matrix"><td ng-repeat="col in row" class="table-td {{col.cssClass}}" width="{{col.width}}"><div class="col-lg-12" ng-repeat="field in col.fields"><ng-include src="getFormFieldTemplate(field.type)"></ng-include></div></td><td ng-show="field.manageRows" width="20px"><button type="button" ng-click="removeRow(field, $index)" title="Remove row" ng-show="field.rowHeader && $index != 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.manageColumns"><td ng-repeat="col in field.matrix[0]"><button type="button" ng-click="removeColumn(field, $index)" title="Remove column" ng-hide="field.colHeader && $index === 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.totals"><td ng-repeat="col in field.matrix[0]"><div ng-show="col.total" class="pull-right"><ods-table-total field="field" col-index="$index" label="col.totalLabel"></ods-table-total></div></td></tr></tbody></table><div class="btn-edit position-relative"><button type="button" class="btn btn-primary pull-right" ng-click="cloneRow(field)">Clone row</button></div>');
$templateCache.put('forms/common/viewer/plugins/ckeditor.html','<div ng-bind-html="valueSubtitutor(field.value, field.options.tokens, field.options.prefix, field.options.suffix)"></div>');
$templateCache.put('forms/common/viewer/plugins/if-yes.html','<!--<br ng-if="field.ln">--><div ng-bind-html="field.value.toggle ? field.on : field.off"></div><div ng-bind-html="field.value.textarea" ng-if="field.value.toggle"></div>');
$templateCache.put('forms/common/viewer/plugins/table.html','<table class="{{field.cssClass}}" id="{{field.name}}"><tbody><tr ng-repeat="row in field.matrix"><td ng-repeat="col in row" class="table-td {{col.cssClass}}" width="{{col.width}}"><div class="col-lg-12" ng-repeat="field in col.fields"><ng-include src="getFormViewerTemplate(field.type)"></ng-include></div></td><td ng-show="field.manageRows" width="20px"><button type="button" ng-click="removeRow(field, $index)" title="Remove row" ng-show="field.rowHeader && $index != 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.manageColumns"><td ng-repeat="col in field.matrix[0]"><button type="button" ng-click="removeColumn(field, $index)" title="Remove column" ng-hide="field.colHeader && $index === 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button></td></tr><tr ng-show="field.totals"><td ng-repeat="col in field.matrix[0]"><div ng-show="col.total" class="pull-right"><ods-table-total field="field" col-index="$index" label="col.totalLabel"></ods-table-total></div></td></tr></tbody></table>');
$templateCache.put('forms/schema/components/base-properties/common-properties.html','<div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/placeholder-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/tooltip-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div>');
$templateCache.put('forms/schema/components/base-properties/label-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.label.$invalid}"><label for="label" class="col-sm-4 control-label">Label:</label><div class="col-sm-8"><input type="text" class="form-control" id="label" name="label" placeholder="Label..." ng-model="field.label" ng-required="false"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.hideLabel.$invalid}"><label for="hideLabel" class="col-sm-4 control-label" title="Indicates if will show label or not.">Hide Label:</label><div class="col-sm-8"><input type="checkbox" id="hideLabel" name="hideLabel" ng-model="field.hideLabel"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/maxlength-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.maxLength.$invalid}"><label for="maxLength" class="col-sm-4 control-label">Max Length:</label><div class="col-sm-8"><input type="number" class="form-control" id="maxLength" name="maxLength" placeholder="Max Length..." ng-model="field.validation.maxlength" ng-required="false" ng-change="onChangeMaxLength()"></div></div></div><div class="row no-vertical-margin" ng-show="field.validation.maxlength"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.minLengthMessage.$invalid}"><label for="maxLengthMessage" class="col-sm-4 control-label">Message</label><div class="col-sm-8"><input type="text" class="form-control" id="maxLengthMessage" name="maxLengthMessage" placeholder="Max length message..." ng-model="field.validation.messages.maxlength" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/minlength-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.minLength.$invalid}"><label for="minLength" class="col-sm-4 control-label">Min Length:</label><div class="col-sm-8"><input type="number" class="form-control" id="minLength" name="minLength" placeholder="Min Length..." ng-model="field.validation.minlength" ng-required="false" ng-change="onChangeMinLength()"></div></div></div><div class="row no-vertical-margin" ng-show="field.validation.minlength"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.minLengthMessage.$invalid}"><label for="minLengthMessage" class="col-sm-4 control-label">Message</label><div class="col-sm-8"><input type="text" class="form-control" id="minLengthMessage" name="minLengthMessage" placeholder="Min length message..." ng-model="field.validation.messages.minlength" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/model-properties.html','<ods-model model="field"></ods-model>');
$templateCache.put('forms/schema/components/base-properties/name-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.name.$invalid}"><label for="name" class="col-sm-4 control-label">Name:</label><div class="col-sm-8"><input type="text" class="form-control" id="name" name="name" placeholder="Name..." ng-model="field.name" ng-required="true"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/pattern-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.patternSelect.$invalid}"><label for="patternSelect" class="col-sm-4 control-label">Pattern Selection</label><div class="col-sm-8"><select name="patternSelect" id="patternSelect" ng-model="field.patternSelect" class="form-control" ng-change="onSelectPattern()"><option value="">Select Pattern...</option><option ng-repeat="option in patterns" value="{{option.value}}">{{option.title}}</option></select></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.pattern.$invalid}"><label for="pattern" class="col-sm-4 control-label">Pattern</label><div class="col-sm-8"><input type="text" class="form-control" id="pattern" name="pattern" ng-model="field.validation.pattern" ng-required="false" readonly="readonly"></div></div></div><div class="row no-vertical-margin" ng-show="field.patternSelect"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.patternMessage.$invalid}"><label for="patternMessage" class="col-sm-4 control-label">Message</label><div class="col-sm-8"><input type="text" class="form-control" id="patternMessage" name="patternMessage" placeholder="Pattern Message..." ng-model="field.validation.messages.pattern" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/placeholder-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.placeholder.$invalid}"><label for="placeholder" class="col-sm-4 control-label">Placeholder:</label><div class="col-sm-8"><input type="text" class="form-control" id="placeholder" name="placeholder" placeholder="Label..." ng-model="field.placeholder" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/readonly-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.readonly.$invalid}"><label for="readonly" class="col-sm-4 control-label" title="Indicates if is readonly this field.">Readonly:</label><div class="col-sm-8"><input type="checkbox" id="readonly" name="readonly" ng-model="field.readonly" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/required-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.required.$invalid}"><label for="required" class="col-sm-4 control-label" title="Indicates if a value is required for this field.">Required:</label><div class="col-sm-8"><input type="checkbox" id="required" name="required" ng-model="field.validation.required" class="ng-pristine ng-valid" ng-change="onChangeRequired()"></div></div></div><div class="row no-vertical-margin" ng-show="field.validation.required"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.requiredMessage.$invalid}"><label for="requiredMessage" class="col-sm-4 control-label">Required Message</label><div class="col-sm-8"><input type="text" class="form-control" id="requiredMessage" name="requiredMessage" placeholder="Required Message..." ng-model="field.validation.messages.required" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/tooltip-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.tooltip.$invalid}"><label for="tooltip" class="col-sm-4 control-label">Tooltip:</label><div class="col-sm-8"><input type="text" class="form-control" id="tooltip" name="tooltip" placeholder="Tooltip..." ng-model="field.tooltip" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/base-properties/value-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.value.$invalid}"><label for="value" class="col-sm-4 control-label">Value:</label><div class="col-sm-8"><input type="text" class="form-control" id="value" name="value" placeholder="Value..." ng-model="field.value" ng-required="false"></div></div></div>');
$templateCache.put('forms/schema/components/checkbox/checkbox-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/tooltip-properties.html\'"></div><div ng-include="\'forms/schema/components/checkbox/ln-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div></div></form></uib-tab><!--<uib-tab index="1" heading="Validation">--><!--<form name="fieldValidationForm" class="form-horizontal">--><!--<div class="box-body padding-top">--><!--<div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div>--><!--</div>--><!--</form>--><!--</uib-tab>--><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/checkbox/checkbox.html','<label class="control-label" for="{{field.name}}">Checkbox</label><div ng-include="\'forms/common/fields/checkbox.html\'"></div>');
$templateCache.put('forms/schema/components/checkbox/ln-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.ln.$invalid}"><label for="ln" class="col-sm-4 control-label" title="Print a new line between label and field.">New line:</label><div class="col-sm-8"><input type="checkbox" id="ln" name="ln" ng-model="field.ln" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/checkbox-list/checkbox-list-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.inline.$invalid}"><label for="inline" class="col-sm-4 control-label" title="Indicates if will show inline or not.">Inline:</label><div class="col-sm-8"><input type="checkbox" id="inline" name="inline" ng-model="field.inline"></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-checkboxlist-options field="field"></ods-field-checkboxlist-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/checkbox-list/checkbox-list.html','<label class="control-label" for="{{field.name}}">{{field.label}}</label><div ng-include="\'forms/common/fields/checkbox-list.html\'"></div>');
$templateCache.put('forms/schema/components/checkbox-list/checkboxlist-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="limitTo" name="limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'error\': fieldOptionForm.$invalid }"><td><input type="checkbox" name="{{field.name}}Selected[]" ng-model="field.value[option.id]"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" ng-required="true"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table>');
$templateCache.put('forms/schema/components/datetime/datetime-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.formatSelector.$invalid}"><label for="formatSelector" class="col-sm-4 control-label">Format</label><div class="col-sm-8"><select name="formatSelector" id="formatSelector" ng-model="field.selectedFormat" class="form-control" ng-change="onSelectFormat(field.selectedFormat)"><option value="">Select format...</option><option ng-repeat="format in formats" value="{{format.value}}">{{format.option}}</option></select></div></div></div><div class="row no-vertical-margin" ng-show="showCustomFormat"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.format.$invalid}"><label for="format" class="col-sm-4 control-label">Custom Format</label><div class="col-sm-8"><input type="text" class="form-control" id="format" name="format" ng-model="field.format" ng-required="false" ng-value="selectedFormat"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.enableTime.$invalid}"><label for="enableTime" class="col-sm-4 control-label" title="Indicates if component time is enabled for this field.">Time enable:</label><div class="col-sm-8"><input type="checkbox" id="enableTime" name="enableTime" ng-model="field.enableTime" class="ng-pristine ng-valid"></div></div></div><!--<div class="row no-vertical-margin">--><!--<div class="form-group margin-bottom"--><!--ng-class="{\'has-error\': fieldPropertiesForm.utc.$invalid}">--><!--<label for="utc" class="col-sm-4 control-label"--><!--title="Indicates Time in UTC or not for this field.">UTC:</label>--><!--<div class="col-sm-8">--><!--<input type="checkbox" id="utc" name="utc" ng-model="field.utc"--><!--class="ng-pristine ng-valid" ng-change="onChangeUTCOption()">--><!--</div>--><!--</div>--><!--</div>--></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/datetime/datetime.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/datetime.html\'"></div>');
$templateCache.put('forms/schema/components/field/field-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="sectionPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.name.$invalid}"><label for="name" class="col-sm-2 control-label">Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="name" name="name" placeholder="Name..." ng-model="row.name" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.cssClass.$invalid}"><label for="cssClass" class="col-sm-2 control-label">Class Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="cssClass" name="cssClass" placeholder="Css Class..." ng-model="row.cssClass" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.cols.$invalid}"><label for="cols" class="col-sm-2 control-label">Cols:</label><div class="col-sm-4"><input type="number" class="form-control" id="cols" name="cols" placeholder="Cols..." ng-model="row.cols.length" ng-required="false" ng-disabled="true"></div><div class="col-lg-6"><!--<button type="button" class="btn btn-primary" ng-click="addRow()">Add row</button>--></div></div></div></div></form><div class="row no-vertical-margin"><div class="col-lg-6"><table ng-table="tableParams" class="table table-bordered table-hover table-condensed editable-table demoTable" ng-form="tableForm" disable-filter="isAdding"><colgroup><col width="50%"></colgroup><tr ng-repeat="row in $data" ng-form="rowForm"><td title="\'Class Name\'" ng-switch="row.isEditing" ng-form="cssClass" class="align-middle"><span ng-switch-default class="editable-text">{{row.cssClass}}</span><div class="controls" ng-switch-when="true"><input type="text" name="cssClass" ng-model="row.cssClass" class="editable-input form-control input-sm" required></div></td><td><button type="button" class="btn btn-primary btn-sm" ng-click="saveColumnEdited(row, rowForm)" ng-if="row.isEditing" ng-disabled="rowForm.$pristine || rowForm.$invalid"><span class="glyphicon glyphicon-ok"></span></button> <button type="button" class="btn btn-default btn-sm" ng-click="cancelColumnEdited(row, rowForm)" ng-if="row.isEditing"><span class="glyphicon glyphicon-remove"></span></button> <button type="button" class="btn btn-default btn-sm" ng-click="row.isEditing = true" ng-if="!row.isEditing"><span class="glyphicon glyphicon-pencil"></span></button> <button type="button" class="btn btn-danger btn-sm" ng-click="removeColumn($data, $index)" ng-if="!row.isEditing"><span class="glyphicon glyphicon-trash"></span></button></td></tr></table></div><div class="col-lg-6"><button type="button" class="btn btn-primary" ng-click="addColumn(row)">Add column</button></div></div></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div><!--<ods-model model="row" css-class="fixed-height"></ods-model>--></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/field/field.html','<div class="box-draggable" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><!--We have two settings button if it is popover or not--> <button class="btn btn-default btn-xs" type="button" ng-class="{ \'active\': field.showProperties }" ng-click="toggleFieldProperties(field)" title="Configure this field." uib-popover-template="\'forms/schema/components/field/properties.html\'" popover-append-to-body="true" popover-placement="auto bottom" popover-trigger="none" popover-title="Field config" popover-is-open="field.popoverProps"><span class="fa fa-wrench"></span></button><!--<button class="btn btn-default btn-xs" type="button"--><!--ng-show="field.popoverProps"--><!--title="Configure this field."--><!--uib-popover-template="\'forms/schema/components/field/properties.html\'"--><!--popover-append-to-body=\'true\' popover-placement=\'auto bottom\'--><!--popover-trigger="outsideClick" popover-title="Field config">--><!--<span class="fa fa-wrench"></span>--><!--</button>--><!--<button class="btn btn-default btn-xs" type="button"--><!--ng-click="swap(index - 1, index)"--><!--ng-disabled="index === 0" title="Move up">--><!--<span class="fa fa-arrow-left"></span>--><!--</button>--><!--<button class="btn btn-default btn-xs" type="button"--><!--ng-click="swap(index, index + 1)"--><!--ng-disabled="$index === schema.fields.length - 1" title="Move down">--><!--<span class="fa fa-arrow-right"></span>--><!--</button>--> <button class="btn btn-xs btn-danger" type="button" title="Remove" ng-click="removeField(index)"><span class="fa fa-trash"></span></button></div></div><div class="box-field-container padding"><div class="box-body no-padding"><div ng-include="getSchemaField(field)"></div></div></div><div class="box-properties-container" ng-class="{ visible: field.showProperties }"><div class="padding"><div ng-include="\'forms/schema/components/field/properties.html\'"></div></div></div></div>');
$templateCache.put('forms/schema/components/field/properties.html','<div ng-include="getSchemaFieldProperties(field)"></div>');
$templateCache.put('forms/schema/components/label/label-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.cssClass.$invalid}"><label for="cssClass" class="col-sm-2 control-label">Css class:</label><div class="col-sm-9"><input type="text" class="form-control" id="cssClass" name="cssClass" placeholder="Css class..." ng-model="field.cssClass" ng-required="false"></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/multi-select/multi-select-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="limitTo" name="limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'error\': fieldOptionForm.$invalid }"><td><input type="checkbox" name="{{field.name}}Selected[]" ng-value="field.options[$index]" ng-checked="field.value.indexOf(field.options[$index]) > -1" ng-click="toggleSelection(field.options[$index])"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" ng-required="true"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table>');
$templateCache.put('forms/schema/components/multi-select/multi-select-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-multi-select-options field="field"></ods-field-multi-select-options></div></form></uib-tab><uib-tab index="2" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/multi-select/multi-select.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/multi-select.html\'"></div>');
$templateCache.put('forms/schema/components/number/number-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/pattern-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/password/password-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/pattern-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/radio-list/radio-list-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.inline.$invalid}"><label for="inline" class="col-sm-4 control-label" title="Indicates if will show inline or not.">Inline:</label><div class="col-sm-8"><input type="checkbox" id="inline" name="inline" ng-model="field.inline"></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-radio-options field="field"></ods-field-radio-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/radio-list/radio-list.html','<label class="control-label" for="{{field.name}}">{{field.label}}</label><div ng-include="\'forms/common/fields/radio-list.html\'"></div>');
$templateCache.put('forms/schema/components/radio-list/radio-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="limitTo" name="limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'error\': fieldOptionForm.$invalid }"><td><input type="radio" name="{{field.name}}Selected[]" ng-value="option.id" ng-model="field.value"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" required="required"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table>');
$templateCache.put('forms/schema/components/row/row-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="sectionPropertiesForm" class="form-horizontal"><div class="container padding-top"><div class="row"><div class="col-md-4 col-sm-4 col-xs-12"><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.name.$invalid}"><label for="name" class="col-sm-5 control-label">Name:</label><div class="col-sm-7"><input type="text" class="form-control" id="name" name="name" placeholder="Name..." ng-model="row.name" ng-required="true"></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.cssClass.$invalid}"><label for="cssClass" class="col-sm-5 control-label">Class Name:</label><div class="col-sm-7"><input type="text" class="form-control" id="cssClass" name="cssClass" placeholder="Css Class..." ng-model="row.cssClass" ng-required="true"></div></div><div class="form-group" ng-class="{\'has-error\': sectionPropertiesForm.cols.$invalid}"><label for="cols" class="col-sm-5 control-label">Cols:</label><div class="col-sm-7"><input type="number" class="form-control" id="cols" name="cols" placeholder="Cols..." ng-model="row.cols.length" ng-required="false" ng-disabled="true"></div><!--<div class="col-lg-3">--><!--<button type="button" class="btn btn-primary" ng-click="addRow()">Add row</button>--><!--</div>--></div></div><div class="col-md-8 col-sm-8 col-xs-12"><!--<h3>Columns configuration</h3>--><table class="table table-condensed table-responsive table-striped"><thead><tr><th>Columns #</th><th>CSS class</th><th>Actions</th></tr></thead><tbody><tr ng-repeat="col in row.cols"><td>{{$index + 1}}</td><td><input type="text" name="cssClass" ng-model="col.cssClass" class="form-control input-sm" required></td><td><button type="button" class="btn btn-danger btn-sm" ng-click="removeColumn($index)" ng-if="!row.isEditing"><span class="glyphicon glyphicon-trash"></span></button></td></tr><tr><td></td><td></td><td><button type="button" class="btn btn-primary" ng-click="addColumn(row)">Add column</button></td></tr></tbody></table></div></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><ods-model model="row"></ods-model></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/row/row.html','<div class="box-draggable" ng-class="{ \'error\': row.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" ng-disabled="section.showProperties && section.invalid" ng-class="{ \'active\': section.showProperties }" title="Configure this Section." ng-click="toggleRowProperties(row)"><span class="fa fa-wrench"></span></button> <button class="btn btn-xs btn-danger" type="button" title="Remove" ng-click="removeRow(index)"><span class="fa fa-trash"></span></button></div></div><div class="box-field-container padding"><div class="box-body no-padding"><div class="box-row {{col.cssClass}}" ng-repeat="col in row.cols"><ul dnd-list="col.fields" dnd-disable-if="col.fields.length >= 1" dnd-allowed-types="col.allowedTypes" dnd-inserted="onAdd(item, type)"><li class="box-field" ng-repeat="field in col.fields" dnd-draggable="field" dnd-type="field.componentType" dnd-effect-allowed="move" dnd-selected="models.selected = field" dnd-moved="col.fields.splice($index, 1)" ng-class="{selected: models.selected === col.fields}"><ods-field row="row" col="col" config="config" index="$index" field="field" debug-mode="debugMode"></ods-field></li></ul></div></div><!-- /.box-body --></div><div class="box-properties-container" ng-class="{ visible: row.showProperties }"><div class="padding"><div ng-include="\'forms/schema/components/row/row-properties.html\'"></div></div></div></div>');
$templateCache.put('forms/schema/components/section/section-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="sectionPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.name.$invalid}"><label for="name" class="col-sm-2 control-label">Name:</label><div class="col-sm-4"><input type="text" class="form-control" id="name" name="name" placeholder="Name..." ng-model="section.name" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.rows.$invalid}"><label for="rows" class="col-sm-2 control-label">Rows:</label><div class="col-sm-4"><input type="number" class="form-control" id="rows" name="rows" placeholder="Rows..." ng-model="section.rows.length" ng-required="false" ng-disabled="true"></div><div class="col-lg-6"><button type="button" class="btn btn-primary" ng-click="addRow()">Add row</button></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.title.$invalid}"><label for="title" class="col-sm-2 control-label">Title:</label><div class="col-sm-9"><input type="text" class="form-control" id="title" name="title" placeholder="Title..." ng-model="section.title" ng-required="false"></div></div></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><ods-model model="section"></ods-model></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/section/section.html','<div class="box-draggable" ng-class="{ \'error\': object.invalid}"><div class="box-overlay"><div class="btn-toolbar btn-toolbar-right"><button class="btn btn-default btn-xs" type="button" ng-disabled="section.showProperties && section.invalid" ng-class="{ \'active\': section.showProperties }" ng-click="toggleProperties(section)" title="Configure this Section."><span class="fa fa-wrench"></span></button> <button class="btn btn-default btn-xs" type="button" ng-click="swap(index - 1, index)" ng-disabled="index === 0" title="Move up"><span class="fa fa-arrow-up"></span></button> <button class="btn btn-default btn-xs" type="button" ng-click="swap(index, index + 1)" title="Move down" ng-disabled="index === schema.layout.length - 1"><span class="fa fa-arrow-down"></span></button> <button class="btn btn-xs btn-danger" type="button" ng-click="remove(index)" title="Remove"><span class="fa fa-trash"></span></button></div></div><div class="box-header with-border"><h4 class="box-title" ng-bind-html="section.title"></h4></div><div class="box-body"><ul dnd-list="section.rows" dnd-allowed-types="section.allowedTypes"><li class="{{row.cssClass}} padding-top" ng-repeat="row in section.rows" dnd-draggable="row" dnd-type="row.componentType" dnd-disable-if="row.componentType == undefined" dnd-effect-allowed="move" dnd-moved="section.rows.splice($index, 1)"><ods-row section="section" row="row" config="config" index="$index" debug-mode="debugMode"></ods-row></li></ul></div><div class="box-properties-container" ng-class="{ visible: section.showProperties }"><div class="padding"><div ng-include="\'forms/schema/components/section/section-properties.html\'"></div></div></div></div>');
$templateCache.put('forms/schema/components/select/select-options-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom"><label for="limitTo" class="col-sm-2 control-label">Limit to:</label><div class="col-sm-10"><input type="number" class="form-control" id="limitTo" name="limitTo" placeholder="Limit list to..." ng-model="field.limitTo" ng-required="false"></div></div></div><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-default btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'error\': fieldOptionForm.$invalid }"><td><input type="radio" name="{{field.name}}Selected[]" ng-value="field.options[$index]" ng-model="field.value"></td><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required"></td><td><input type="text" ng-model="option.name" class="form-control" ng-required="true"></td><td><button class="btn btn-default btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table>');
$templateCache.put('forms/schema/components/select/select-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><ods-field-select-options field="field"></ods-field-select-options></div></form></uib-tab><uib-tab index="2" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="3" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/select/select.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/select.html\'"></div>');
$templateCache.put('forms/schema/components/text/text-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/pattern-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/minlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/maxlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/textarea/textarea-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/common-properties.html\'"></div></div></form></uib-tab><uib-tab index="1" heading="Validation"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/minlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/maxlength-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/required-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/textarea/textarea.html','<div ng-include="\'forms/schema/components/label.html\'"></div><textarea class="form-control" name="{{field.name}}" id="{{field.name}}" ng-required="{{field.required}}" title="{{field.tooltip}}" rows="{{field.rows}}" placeholder="{{field.placeholder}}" ng-model="field.value">\n</textarea>');
$templateCache.put('forms/schema/components/toggle/ln-properties.html','<div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.ln.$invalid}"><label for="ln" class="col-sm-4 control-label" title="Print a new line between label and field.">New line:</label><div class="col-sm-8"><input type="checkbox" id="ln" name="ln" ng-model="field.ln" class="ng-pristine ng-valid"></div></div></div>');
$templateCache.put('forms/schema/components/toggle/toggle-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/value-properties.html\'"></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/components/toggle/toggle.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/toggle.html\'"></div>');
$templateCache.put('forms/schema/plugins/ckeditor/ckeditor-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/readonly-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.locked.$invalid}"><label for="locked" class="col-sm-4 control-label" title="Indicates if suggestions are locked in this field.">Suggestions locked:</label><div class="col-sm-8"><input type="checkbox" id="locked" name="locked" ng-model="field.options.locked" class="ng-pristine ng-valid"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldValidationForm.printView.$invalid}"><label for="printView" class="col-sm-4 control-label" title="Indicates if CKEditor will show as print view.">Print View:</label><div class="col-sm-8"><input type="checkbox" id="printView" name="printView" ng-model="field.printView" class="ng-pristine ng-valid"></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Options"><form name="fieldValidationForm" class="form-horizontal"><div class="box-body padding-top"><div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.prefix.$invalid}"><label for="prefix" class="col-sm-2 control-label">Prefix:</label><div class="col-sm-2"><input type="text" class="form-control" id="prefix" name="prefix" placeholder="Prefix..." ng-model="field.options.prefix" ng-required="true"></div></div></div></div><div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.suffix.$invalid}"><label for="suffix" class="col-sm-2 control-label">Suffix:</label><div class="col-sm-2"><input type="text" class="form-control" id="suffix" name="suffix" placeholder="Suffix..." ng-model="field.options.suffix" ng-required="true"></div></div></div></div><ods-suggestion-options field="field" config="config"></ods-suggestion-options></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><div ng-include="\'forms/schema/components/base-properties/model-properties.html\'"></div></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/ckeditor/ckeditor.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div class="position-relative"><textarea id="{{field.name}}" name="{{field.name}}" placeholder="{{field.placeholder}}" ng-model="field.value" title="{{field.tooltip}}" ck="ck" options="field.options" ods-ckeditor ng-disabled="field.readonly">\n</textarea></div>');
$templateCache.put('forms/schema/plugins/ckeditor/suggestion-options-properties.html','<div class="row no-vertical-margin"><div class="col-lg-1"></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.suggestionsUrl.$invalid}"><label for="suggestionsUrl" class="col-sm-2 control-label">Suggestions Url:</label><div class="input-group col-sm-10" style="padding-left: 15px;"><input type="text" class="form-control" name="suggestionsUrl" id="suggestionsUrl" placeholder="Suggestion Url..." ng-model="field.options.suggestionsUrl"> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="loadSuggestions(field.options.suggestionsUrl)">Load Suggestions</button></span></div></div></div></div><div class="row no-vertical-margin"><div class="col-lg-1"><button class="btn btn-info" type="button" ng-click="refreshOption()" title="Update options in CKEditor">Update <span class="fa fa-refresh"></span></button></div><div class="col-lg-11"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.tokensUrl.$invalid}"><label for="tokensUrl" class="col-sm-2 control-label">Tokens Url:</label><div class="input-group col-sm-10" style="padding-left: 15px;"><input type="text" class="form-control" name="tokensUrl" id="tokensUrl" placeholder="Tokens Url..." ng-model="field.options.tokensUrl"> <span class="input-group-btn"><button class="btn btn-primary" type="button" ng-click="loadTokens(field.options.tokensUrl)">Load Tokens</button></span></div></div></div></div><table class="table table-condensed position-relative" style="position: relative;"><thead><tr><th></th><th>Value</th><th>Text</th><th><button class="btn btn-xs btn-success" type="button" ng-click="addOption()" title="Add a new option" ng-disabled="field.options.locked"><span class="fa fa-plus"></span></button></th><th></th></tr></thead><tbody><tr ng-form="fieldOptionForm" ng-repeat="option in options" ng-class="{ \'error\': fieldOptionForm.$invalid }"><td><input type="text" name="optionValue" ng-model="option.id" ng-required="true" class="form-control" required="required" ng-disabled="field.options.locked"></td><td><input type="text" ng-model="option.label" class="form-control" ng-required="true"></td><td><button class="btn btn-xs btn-danger" type="button" ng-click="removeOption($index)" title="Remove this option"><span class="fa fa-trash"></span></button></td><td></td></tr></tbody></table>');
$templateCache.put('forms/schema/plugins/if-yes/if-yes-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.toggleValue.$invalid}"><label for="toggleValue" class="col-sm-4 control-label">Toggle value:</label><div class="col-sm-8"><input type="checkbox" id="toggleValue" name="toggleValue" ng-model="field.value.toggle" class="ng-pristine ng-valid"></div></div></div><div ng-include="\'forms/schema/components/toggle/ln-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': fieldPropertiesForm.textValue.$invalid}"><label for="textValue" class="col-sm-4 control-label">Text value:</label><div class="col-sm-8"><input type="text" class="form-control" id="textValue" name="textValue" placeholder="Text value..." ng-model="field.value.textarea" ng-required="false"></div></div></div></div></form></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><ods-model model="field"></ods-model></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/if-yes/if-yes.html','<div ng-include="\'forms/schema/components/label.html\'"></div><div ng-include="\'forms/common/fields/plugins/if-yes.html\'"></div>');
$templateCache.put('forms/schema/plugins/table/container.html','<div ng-include="\'forms/schema/components/label.html\'"></div><ods-table field="field" mode="edit"></ods-table>');
$templateCache.put('forms/schema/plugins/table/table-properties.html','<uib-tabset class="nav-tabs-custom"><uib-tab index="0" heading="Properties"><form name="fieldPropertiesForm" class="form-horizontal"><div class="box-body padding-top"><div ng-include="\'forms/schema/components/base-properties/name-properties.html\'"></div><div ng-include="\'forms/schema/components/base-properties/label-properties.html\'"></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.cssClass.$invalid}"><label for="cssClass" class="col-sm-4 control-label">Class Name:</label><div class="col-sm-8"><input type="text" class="form-control" id="cssClass" name="cssClass" placeholder="Css Class..." ng-model="field.cssClass" ng-required="true"></div></div></div><div class="row no-vertical-margin"><div class="form-group margin-bottom" ng-class="{\'has-error\': sectionPropertiesForm.code.$invalid}"><label for="code" class="col-sm-4 control-label">Component code:</label><div class="col-sm-8"><input type="text" class="form-control" id="code" name="code" placeholder="Code..." ng-model="field.code" ng-required="false"> <span class="help-block">Code is like a identification or type in this form. useful for a component classification.</span></div></div></div></div></form></uib-tab><uib-tab index="1" heading="Layout"><ods-table-props field="field"></ods-table-props></uib-tab><uib-tab index="2" heading="Debug" ng-show="debugMode"><ods-model model="field" css-class="fixed-height"></ods-model></uib-tab></uib-tabset>');
$templateCache.put('forms/schema/plugins/table/table-props.html','<div class="container padding-top"><div class="row"><form name="fieldPropsForm" class="form-horizontal"><div class="col-md-4 col-sm-4 col-xs-12"><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.rows.$invalid}"><label for="rows" class="control-label col-sm-5">Rows:</label><div class="col-sm-3"><input type="number" class="form-control" id="rows" name="rows" placeholder="Rows..." ng-model="field.matrix.length" ng-required="false" ng-disabled="true"></div><div class="col-sm-3"><button type="button" class="btn btn-primary" ng-click="addRow()" title="Add row">Add</button></div></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.cols.$invalid}"><label for="cols" class="control-label col-sm-5">Cols:</label><div class="col-lg-3"><input type="number" class="form-control" id="cols" name="cols" placeholder="Cols..." ng-model="field.matrix[0].length" ng-required="false" ng-disabled="true"></div><div class="col-lg-3"><button type="button" class="btn btn-primary" ng-click="addColumn()" title="Add column">Add</button></div></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.totals.$invalid}"><label for="rowHeader" class="control-label col-sm-5">Row Header:</label><input class="col-sm-1" type="checkbox" id="rowHeader" name="rowHeader" ng-model="field.rowHeader"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.canClone.$invalid}"><label for="colHeader" class="control-label col-sm-5">Col Header:</label><input class="col-sm-1" type="checkbox" id="colHeader" name="colHeader" ng-model="field.colHeader"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.totals.$invalid}"><label for="totals" class="control-label col-sm-5">Show Totals:</label><input class="col-sm-1" type="checkbox" id="totals" name="totals" ng-model="field.totals"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.canClone.$invalid}"><label for="canClone" class="control-label col-sm-5">Can clone row:</label><input class="col-sm-1" type="checkbox" id="canClone" name="canClone" ng-model="field.canCloneRow"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.manageRows.$invalid}"><label for="manageRows" class="control-label col-sm-5">Manage rows:</label><input class="col-sm-1" type="checkbox" id="manageRows" name="manageRows" ng-model="field.manageRows"></div><div class="form-group" ng-class="{\'has-error\': fieldPropsForm.manageColumns.$invalid}"><label for="manageColumns" class="control-label col-sm-5">Manage columns:</label><input class="col-sm-1" type="checkbox" id="manageColumns" name="manageColumns" ng-model="field.manageColumns"></div></div><div class="col-md-8 col-sm-8 col-xs-12"><h3>Columns configuration</h3><table class="table table-bordered"><thead><tr><th>#</th><th>CSS class</th><th>Width</th><th>Total</th><th>Total Label</th></tr></thead><tbody><tr ng-repeat="col in field.matrix[0]"><td>{{$index + 1}}</td><td><input type="text" class="form-control" id="col{{$index}}" name="col{{$index}}" placeholder="Css class..." ng-model="field.matrix[0][$index].cssClass"></td><td><input type="text" class="form-control" id="width{{$index}}" name="width{{$index}}" placeholder="width..." ng-model="col.width"></td><td><input type="checkbox" id="total{{$index}}" name="total{{$index}}" title="Add total to this column" ng-model="col.total"></td><td><input type="text" class="form-control" id="totalLabel{{$index}}" name="totalLabel{{$index}}" placeholder="Total label..." ng-model="field.matrix[0][$index].totalLabel"></td></tr></tbody></table></div></form></div></div>');
$templateCache.put('forms/schema/plugins/table/table.html','<form name="{{field.name}}" class="position-relative"><table class="{{field.cssClass}}" id="{{field.name}}"><tbody><tr ng-repeat="row in field.matrix"><td ng-repeat="col in row" width="{{col.width}}"><div class="box-row col-lg-12"><ul dnd-list="col.fields" dnd-disable-if="col.fields.length >= 1" style="min-width: 10px;" dnd-allowed-types="col.allowedTypes" dnd-inserted="onAdd(item, type)" dnd-drop="checkItem(index, item, external, type)"><li class="box-field" ng-repeat="field in col.fields" dnd-draggable="field" dnd-type="field.componentType" dnd-effect-allowed="move" dnd-selected="models.selected = field" dnd-moved="col.fields.splice($index, 1)" dnd-callback="onDrop(list, $index, targetList, targetIndex)" ng-class="{selected: models.selected === col.fields}"><ods-field row="row" col="col" index="$index" field="field" popover-props="true" debug-mode="debugMode"></ods-field></li></ul></div></td><td ng-show="field.manageRows" width="20px"><button type="button" ng-click="removeRow(field, $index)" title="Remove row" ng-show="field.rowHeader && $index !== 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button> <button type="button" ng-click="swapRow($index - 1, $index)" title="Swap row up" class="btn btn-info pull-right" ng-disabled="$index === 0"><span class="fa fa-arrow-up"></span></button> <button type="button" ng-click="swapRow($index, $index + 1)" title="Swap row down" class="btn btn-info pull-right" ng-disabled="$index === field.matrix.length - 1"><span class="fa fa-arrow-down"></span></button></td></tr><tr ng-show="field.totals"><td ng-repeat="col in field.matrix[0]"><div ng-show="col.total" class="pull-right"><ods-table-total field="field" col-index="$index" label="col.totalLabel"></ods-table-total></div></td></tr><tr ng-show="field.manageColumns"><td ng-repeat="col in field.matrix[0]"><button type="button" ng-click="removeColumn(field, $index)" title="Remove column" ng-hide="field.colHeader && $index === 0" class="btn btn-danger pull-right"><span class="fa fa-trash"></span></button> <button type="button" ng-click="swapColumn($index, $index + 1)" title="Swap column right" class="btn btn-info pull-right" ng-disabled="$index === field.matrix.length - 1"><span class="fa fa-arrow-right"></span></button> <button type="button" ng-click="swapColumn($index - 1, $index)" title="Swap column left" class="btn btn-info pull-right" ng-disabled="$index === 0"><span class="fa fa-arrow-left"></span></button></td></tr></tbody></table><div class="btn-edit position-relative" ng-show="field.canCloneRow"><button type="button" class="btn btn-primary pull-right" ng-click="cloneRow(field)">Clone row</button></div></form>');
$templateCache.put('forms/schema/plugins/table/total.html','<div><b>{{label}}: {{total}}</b></div>');}]);
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
            label: '@',
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
    .directive('odsCkeditor', CKEditor);

CKEditor.$inject = ['$timeout', 'OdsCkeditor'];

function CKEditor($timeout, OdsCkeditor) {

    var directive = {
        restrict: 'A',
        require: '?ngModel',
        scope: {
            name: '@',
            ck: '=',
            options: '=',
            disabled: '=?ngDisabled'
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope, elm, attr, ngModel) {

        if (!ngModel) {
            console.error('Please define ng-model.');
            return;
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

        $scope.disabled = $scope.disabled ? $scope.disabled : false;

        $scope.ck = CKEDITOR.replace(elm[0]);

        $scope.ck.on('instanceReady', function () {

            $scope.ck.setData(ngModel.$viewValue);
            OdsCkeditor.register($scope.name, $scope.ck);
            OdsCkeditor.setOptions($scope.name, OdsCkeditor.initOptions($scope.options));
            OdsCkeditor.setReadOnly($scope.name, $scope.disabled);
        });

        function updateModel() {

            $timeout(function () {
                ngModel.$setViewValue($scope.ck.getData());
            }, 0, false);
        }

        $scope.ck.on('change', updateModel);
        $scope.ck.on('key', updateModel);
        $scope.ck.on('dataReady', updateModel);

        ngModel.$render = function () {
            $scope.ck.setData(ngModel.$viewValue);
        };

        $scope.$watch('disabled', function (disabled) {

            $timeout(function () {
                disabled = disabled ? disabled : false;
                OdsCkeditor.setReadOnly($scope.name, disabled);
            }, 100, false);
            return;
        });

        $scope.$watch('options', function (options) {

            $timeout(function () {
                OdsCkeditor.setOptions($scope.name, OdsCkeditor.initOptions($scope.options));
            }, 100, false);
            return;
        });

        $scope.$on('$destroy', function() {
            OdsCkeditor.unregister($scope.name);
        });

    }

}
'use strict';

angular
    .module('ods-lib')
    .factory('OdsCkeditor', OdsCkeditor);

function OdsCkeditor() {

    var uniqueCounter = (+new Date) % 10000;

    var keyCode = CKEDITOR.CTRL + 32;

    var instance_map = {};

    var service = {
        register: register,
        getInstance: getInstance,
        unregister: unregister,
        isReady: isReady,
        generateName: generateName,
        setOptions: setOptions,
        setReadOnly: setReadOnly,
        initOptions: initOptions
    };

    function register(name, instance) {

        var tmpInstance = {
            ready: true,
            instance: instance
        }
        instance_map[name] = tmpInstance;
    }

    function getInstance(name) {

        return instance_map[name].instance;
    }

    function unregister(name) {

        instance_map[name] = null;
    }

    function isReady(name) {

        if(instance_map[name] && instance_map[name].ready) {
            return instance_map[name].ready;
        }else
            return false;
    }

    function generateName() {

        uniqueCounter++;
        return 'ckeditor' + uniqueCounter;
    }

    function setOptions(name, options) {

        if(isReady(name)) {
            var ck = getInstance(name);
            ck.execCommand('reloadOptions', initOptions(options));
        }
    }

    function setReadOnly(name, isReadOnly) {

        if(isReady(name)) {
            var ck = getInstance(name);
            ck.setReadOnly(isReadOnly);
        }
    }

    function initOptions(options) {

        if (options) {
            var tmp = {
                triggerKeyCode: !options.triggerKeyCode ? keyCode : options.triggerKeyCode,
                prefix: !options.prefix ? '${' : options.prefix,
                suffix: !options.suffix ? '}' : options.suffix,
                suggestions: options.suggestions
            }
            return tmp;
        } else {
            var tmp = {
                triggerKeyCode: keyCode,
                prefix: '${',
                suffix: '}',
                suggestions: []
            }
            return tmp;
        }
    }

    return service;
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

    OdsFormBuilderController.$inject = ['$scope', 'OdsFormService'];

    function OdsFormBuilderController($scope, OdsFormService) {

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
            }
        };

        $scope.runTimeConfig = {
            ckeditor: {
                tokens: {
                    'patientName': 'Hermes Lorenzo',
                    'patientDob': '01/24/1980',
                    'patientGender': 'Male',
                    'patientMaritalStatus': 'Single'
                }
            }
        };

        $scope.saveForm = function(schema){

            var data = OdsFormService.saveFormData(schema);
            console.log('The form data is: ' + JSON.stringify(data, null, 4));
        }

        $scope.toggleStyle = function(){

            $scope.cssClass = $scope.cssClass === 'form-print' ? 'form-print1' : 'form-print';
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

    }
}

/**
 * Created by PpTMUnited on 2/21/2017.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('ImageUploadDialogController', ImageUploadDialogController);

    ImageUploadDialogController.$inject = ['$timeout', '$uibModalInstance', 'DataUtils', '$scope',
        'OdsUtils', 'image', 'typeImage'];

    function ImageUploadDialogController($timeout, $uibModalInstance, DataUtils, $scope,
                                         OdsUtils, image, typeImage) {
        var vm = this;

        vm.image = {};
        vm.image.picture = image;
        vm.image.pictureContentType = typeImage
        vm.imageTmp = {};
        angular.copy(vm.image, vm.imageTmp);
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            stopWebCam();
            $uibModalInstance.dismiss(vm.image);
            angular.copy(vm.imageTmp, vm.image);
        }

        function save() {
            stopWebCam();
            $uibModalInstance.dismiss(vm.image);
        }

        vm.setPicture = function ($file, image) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function (base64Data) {
                    $scope.$apply(function () {
                        vm.image.picture = base64Data;
                        vm.image.pictureContentType = $file.type;
                    });
                });
            }
        };

        vm.resetUserPicture = function () {
            OdsUtils.resetUserPicture(vm.image);
        };

        var _video = null,
            patData = null;

        vm.patOpts = {x: 0, y: 0, w: 25, h: 25};

        // Setup a channel to receive a video property
        // with a reference to the video element
        // See the HTML binding in main.html
        vm.channel = {};

        vm.webcamError = false;
        vm.onError = function (err) {
            $scope.$apply(
                function () {
                    $scope.webcamError = err;
                }
            );
        };

        vm.onSuccess = function () {
            // The video element contains the captured camera data
            _video = vm.channel.video;
            $scope.$apply(function () {
                vm.patOpts.w = _video.width;
                vm.patOpts.h = _video.height;
                //$scope.showDemos = true;
            });
        };

        vm.onStream = function (stream) {
            // You could do something manually with the stream.
        };

        vm.makeSnapshot = function () {
            if (_video) {
                var patCanvas = document.querySelector('#snapshot');
                if (!patCanvas) return;

                patCanvas.width = _video.width;
                patCanvas.height = _video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = getVideoData(vm.patOpts.x, vm.patOpts.y, vm.patOpts.w, vm.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                sendSnapshotToServer(patCanvas.toDataURL().split("base64,")[1]);

                patData = idata;
            }
        };

        /**
         * Redirect the browser to the URL given.
         * Used to download the image by passing a dataURL string
         */
        vm.downloadSnapshot = function downloadSnapshot(dataURL) {
            window.location.href = dataURL;
        };

        var getVideoData = function getVideoData(x, y, w, h) {
            var hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = _video.width;
            hiddenCanvas.height = _video.height;
            var ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(_video, 0, 0, _video.width, _video.height);
            return ctx.getImageData(x, y, w, h);
        };

        /**
         * This function could be used to send the image data
         * to a backend server that expects base64 encoded images.
         *
         * In this example, we simply store it in the scope for display.
         */
        var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
            vm.image.picture = imgBase64;
        };

        function stopWebCam() {
            var MediaStream = window.MediaStream;

            if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
                MediaStream = webkitMediaStream;
            }

            if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
                MediaStream.prototype.stop = function() {
                    this.getAudioTracks().forEach(function(track) {
                        track.stop();
                    });

                    this.getVideoTracks().forEach(function(track) {
                        track.stop();
                    });
                };
            }
        }
    }
})();


(function () {
    'use strict';

    angular
        .module('ods-lib')
        .directive('imageUpload', imageUpload);

    imageUpload.$inject = ['$uibModal', '$state'];

    function imageUpload($uibModal, $state) {

        var directive = {
            restrict: 'E',
            templateUrl: 'image-upload/image-upload.html',
            scope: {//all this scope value defined, are attr for the directive. Can be used like is explained below
                image: '=',//modal field for the image value
                typeImage: '=',//modal field form the image type
                class: '@',//form for the image component. Can be square or circle[e.g: class="img-circle/img-square"]
                css: '@',
                ngModel: '='
            },
            link: linkFunc
        };

        return directive;

        /* private helper methods*/

        function linkFunc($scope, element) {
            $scope.openModal = function (element) {
                $uibModal.open({
                    templateUrl: 'image-upload/image-upload-dialog.html',
                    controller: 'ImageUploadDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: $scope.size,
                    resolve: {
                        entity: function () {
                            return $scope.ngModel ? $scope.ngModel : null;
                        },
                        image: function () {
                            return $scope.image;
                        },
                        typeImage: function () {
                            return $scope.typeImage;
                        }
                    }
                }).result.then(function (result) {}, function (result) {
                    updateValue(result);
                });
            };

            function updateValue(value) {
                $scope.image = value.picture;
                $scope.typeImage = value.pictureContentType;
            }

        }
    }
})();

'use strict';

angular
    .module('ods-lib')
    .factory('ImageUploadService', ImageUploadService);

function ImageUploadService() {

    var service = {
        getDefaultUserPicture: getDefaultUserPicture,
        getDefaultUserPictureContentType: getDefaultUserPictureContentType,
        resetUserPicture: resetUserPicture
    };

    return service;

    function getDefaultUserPicture() {
        return "/9j/4AAQSkZJRgABAQEAYABgAAD/4QHGRXhpZgAATU0AKgAAAAgABFEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAGAAAAAPlEDAAEAAAABAAAAAAAAAADn5+fBwcHAwMC/v7+5ubm8vLzm5ubo6Oi+vr64uLi9vb27u7u6urq3t7fCwsLAwsHCwMHk5OTl5eW2trbf39/V1dXOzs7h4eHj4+Pi4uLa2trFxcXPz8/S0tLc3NzHx8fLy8vW1tbIyMjDw8PKysrExMTX19fMzMzZ2dnR0dHe3t7d3d3Nzc3Q0NDg4ODU1NTGxsbY2NjT09PBwb/b29vBwcPJycnCwb/BwL7Bv8DAwcPCwMPAwr+/wcDCwsDBw8LCwsTBw8C6uLng3t/DwcTBwMXEwL+/wb7AwcXAwMLCwb3b293i4+Xd3tnf4eDBwsTZ3d7AwL68vLrZ3dy7vbzo6Oq9uLzDwcLb29nn5+W5t7i8urvj4eK4ure/w8LFwMS+w7/c2tu5ubvBv8Tn5+nDwsDp5+jp6em7u726vLkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAF/AX8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorH8aeOdP8C6W1zfTBWIPlRKcyTH0A/r0FeT6X+0drU2rxNcQ2K2TTDzAI23LHu5wc9QO+KAPcKKRHWRAykMrDII7iloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiqer+ItP0CPdfXlraLjP72UJn6Z60AXKK4PXf2ivD+lblt2udRkHQQx7Vz7s2P0BriPEP7RutauGTT7eDTY243f62T8z8v6UAe06xrtn4etDcX11Dawj+KR9ufYep9hXmHjb9pRFDW+gweY3T7TOuFH+6vU/U4+hrzC+kvfEF59ovrme6mb+KVyx/DPT6VNb6csYoAjvri88S6i13f3E1zcSdXkbP4D0HsOKsQ2ixLipVUJ0paAPZvgn4q/t7wqLWVs3GmkRHJ5KfwH8hj/gNdlmvAfh94qbwd4pt7ot/o7nypx6oep/Dg/hXvwbeNw5B5B9aACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqG/v4NLs5Li5mjt4Yhl5JGCqo9ya8r8b/tJBXa30CASEcfaplO3/gKf1P5UAer3FzHaQtJNJHFGoyzOwVR+JrmtV+M3hnR2ZZNWglZe0Aab9VBH614HrGr6p4tuvO1G8uLps5AdvlX6L0H4CmRaQAOeaAPXtT/ab0e24tbK/um7Fgsan8ck/pXN6t+0tq95kWOn2dqvrIWlYfjwP0ri005F7VKtsq0AW9U+JfifXwwm1a6jVv4YSIR9PlA/WsT+zZLiQySM0jtyWY5JrSEajtTqAKcWlKvarCWqp2qSigAAxRRRQAUUUUABG4Yr6A+Ht0954I0uSTlvs6qSe+Bj+lfP+M17r8J9Rj1DwHY+WwLQqYnH91ge/wCGD+NAHR0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVj+NfG9j4E0dry+kx/DFEv35m9FH9egrSv76LTLGa4ncRw26GR2PRVAyTXzX418W3PxF8TyXsxZYQdkERPESdh9T1J9aAJPG3xA1P4lahuuW8q0RsxWyH5I/c/3m9z+nSqNppyxjkVNbWywp0qagBqoFHFOoooAKKKKACiiigAooooAKKKKACiiigArofhv49fwNrm6Qs2n3RCzqP4fRx7j9R+Fc9Qw3DFAH0rbXEd3bxyxOskcihkZTlWB6EU+vJPgn8Q20u8XRb1z9mnbFs5/wCWTn+H6Ht6H68et0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwf7RWsyaZ8P/JjyPt9wkDEf3cFj+e0D8TXi+m2wSKvXP2mRnwjp/8A1/L/AOgPXldsMRCgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooADkEMpKspyCOxr6G8Ias2u+F7C8b/AFk8Cs/+9jn9c18817x8LTnwBpn/AFzP/oRoA6CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA83/AGmP+RR0/wD6/l/9AevK7b/UrXq/7S0e7wXYt/dv0z7fI9eUW3+pWgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK96+GS7PAWl/8AXHP6mvBa+g/A1ubXwZpaH732WMkemVBoA1aKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDn/inp0OpfD7VlmjWRYbZ5lz/CyKWBH4ivAbKTfEPpX0R48XzPA+sr/esZx/5DavnLSz+5WgC3RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOij82VVHViBX0pBCttCka/djUKPoK+b9PG6/gHrIv86+kqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAzvGCeZ4S1Rf71pKP8Axw182aUf3Qr6Y8Rr5nh6/X+9byD/AMdNfM2knMdAF2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAktZPJuo37KwP619KCvmc8ivffhxqr614I064kJaRotjE9WKkrn8cUAbdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRQaAMPx/4w0/whoEr303l/aEaOJANzyNjsPxHPQV876T/q61Pih4jm8aePbyR2P2e1kNvAvZUUkfqcn8faqdtB5KUASUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXuvwlRY/h7poVg3yuSR6l2J/nXhVeifs/wCvzJql3pbNut2jNwgP8DAgHH1yPyoA9UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPmnxFZfYfGurQ/8APO8lA+m84ptbHxcsP7O+KOpDHyzlJl98oM/qDWPQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXYfA1tvjtf8AagkH16GuPrtPgRAZfG7N/wA8rZ2P5qP60AeyUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHjv7R2l/Z/E+m3wHy3MBhJHqjZ/k/6VxKnKivcPi34Jbxt4UaOAZvLV/OgH94gEFfxH6gV4cEaFmjkVo5IztZWGCp7gigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0b9nqwLX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";
    }

    function getDefaultUserPictureContentType() {
        return "image/jpeg";
    }

    function resetUserPicture(object){
        object.image = getDefaultUserPicture();
        object.imageContentType = getDefaultUserPictureContentType();
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
/**
 * Created by hermeslm on 3/28/17.
 */
(function () {
    'use strict';

    angular
        .module('ods-lib')
        .controller('OdsParamsController', OdsParamsController);

    OdsParamsController.$inject = ['OdsParamType', 'report', '$uibModalInstance', '$q',
        'DTOptionsBuilder', 'DTColumnBuilder', '$filter', '$compile', 'moment', '$scope'];

    function OdsParamsController(OdsParamType, report, $uibModalInstance, $q,
                                 DTOptionsBuilder, DTColumnBuilder, $filter, $compile, moment, $scope) {

        var vm = this;

        vm.clear = clear;
        vm.openReport = openReport;
        vm.openCalendar = openCalendar;
        vm.paramType = OdsParamType;
        vm.report = report;
        vm.getSelectTitleField = getSelectTitleField;
        vm.getRequired = getRequired;
        vm.hideParam = hideParam;
        vm.hideTitle = hideTitle;

        //TABLE_SELECT
        // vm.selected = {};
        // vm.selectAll = false;
        vm.toggleAll = toggleAll;
        vm.toggleOne = toggleOne;
        vm.getDtOptions = getDtOptions;
        vm.getDtColumns = getDtColumns;
        vm.search = search;
        initTables();

        function initTables() {
            for (var i = 0; i < vm.report.params.length; i++) {
                if (vm.report.params[i].type === OdsParamType.TABLE_SELECT) {
                    vm.report.params[i].dtInstance = {};
                    vm.report.params[i].dtOptions = undefined;
                    vm.report.params[i].dtColumns = undefined;
                    vm.report.params[i].isFilter = false;
                    vm.report.params[i].selected = [];
                    vm.report.params[i].selectedAll = false;
                    //init pre-selections
                    var valueField = vm.report.params[i].valueField;
                    var gridOptions = vm.report.params[i].gridOptions;
                    for (var j = 0; j < gridOptions.preSelected.length; j++) {
                        var preSelectedId = gridOptions.preSelected[j][valueField];
                        vm.report.params[i].selected[preSelectedId] = true;
                    }
                }
            }
        }

        function getDtOptions(param, index) {

            if (param.dtOptions === undefined) {
                //We set the new dtOptions into array
                vm.report.params[index].dtOptions = DTOptionsBuilder.fromFnPromise(function () {
                    var defer = $q.defer();
                    if (param.isFilter) {
                        defer.resolve(param.gridOptions.data);
                        vm.report.params[index].isFilter = false;
                    } else if (!vm.report.params[index].searchQuery || vm.report.params[index].searchQuery === '') {
                        defer.resolve(param.gridOptions.data);
                    } else {
                        defer.resolve($filter('filter')(param.gridOptions.data, vm.report.params[index].searchQuery, undefined));
                    }
                    return defer.promise;
                }).withPaginationType('full_numbers').withBootstrap().withDOM('tip').withOption('aaSorting', [[1, 'asc']])
                    .withOption('createdRow', function (row, data, dataIndex) {
                        $compile(angular.element(row).contents())($scope);
                    })
                    .withOption('headerCallback', function (header) {
                        if (!vm.headerCompiled) {
                            vm.headerCompiled = true;
                            $compile(angular.element(header).contents())($scope);
                        }
                    });
                return vm.report.params[index].dtOptions;
            } else {
                return vm.report.params[index].dtOptions;
            }
        }

        function getDtColumns(param, index) {

            if (param.dtColumns === undefined) {
                //We build all columns
                var gridOptions = param.gridOptions;
                var columns = [];
                for (var i = 0; i < gridOptions.columnDef.length; i++) {
                    var columnDef = gridOptions.columnDef[i];
                    if (columnDef.id) {
                        columns.push(DTColumnBuilder.newColumn(null).withTitle(
                            '<input type="checkbox" ng-model="vm.report.params[' + index + '].selectedAll" ng-change="vm.toggleAll(' + index + ')">')
                            .notSortable()
                            .renderWith(function (data, type, full, meta) {
                                return '<input type="checkbox" ng-model="vm.report.params[' + index + '].selected[' + data[param.valueField] + ']" ng-click="vm.toggleOne(' + index + ')">';
                            }));
                    } else {
                        if (columnDef.render === undefined) {
                            var column = DTColumnBuilder.newColumn(columnDef.field).withTitle(columnDef.title);
                            columns.push(column);
                        } else {
                            var column = DTColumnBuilder.newColumn(columnDef.field).withTitle(columnDef.title)
                                .renderWith(columnDef.render);
                            columns.push(column);
                        }
                    }
                }

                vm.report.params[index].dtColumns = columns;
                return vm.report.params[index].dtColumns;
            } else {
                return vm.report.params[index].dtColumns;
            }
        }

        function search(index) {
            vm.report.params[index].dtInstance.reloadData();
        }

        function toggleAll(index) {

            var param = vm.report.params[index];

            for (var i = 0; i < param.gridOptions.data.length; i++) {
                var valueField = param.valueField;
                var value = param.gridOptions.data[i][valueField];
                vm.report.params[index].selected[value] = vm.report.params[index].selectedAll;
            }

            vm.report.params[index].value = vm.report.params[index].selected;
        }

        function toggleOne(index) {
            for (var id in vm.report.params[index].selected) {
                if (vm.report.params[index].selected.hasOwnProperty(id)) {
                    if (!vm.report.params[index].selected[id]) {
                        vm.report.params[index].selectedAll = false;
                        return;
                    }
                }
            }
            vm.report.params[index].selectedAll = true;
            vm.report.params[index].value = vm.report.params[index].selected;
        }

        initDateParams(vm.report);

        function initDateParams(report) {
            for (var i = 0; i < report.params.length; i++) {
                if (vm.report.params[i].type === OdsParamType.DATE) {
                    vm.report.params[i].datePickerOpenStatus = false;
                }
            }
        }

        function openCalendar(index) {
            vm.report.params[index].datePickerOpenStatus = true;
        }

        function hideParam(param) {

            return param.hidden ? true : false;
        }

        function hideTitle(param) {

            return param.hidden || param.hideTitle ? true : false;
        }

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function openReport() {
            $uibModalInstance.close(vm.report);
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

        function getRequired(param) {

            return param.required !== undefined ? param.required : false;
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('ods-lib')
        .constant('OdsParamType', {
            "DATE": "DATE",
            "TEXT": "TEXT",
            "NUMBER": "NUMBER",
            "LIST": "LIST",
            "SINGLE_SELECT": "SINGLE_SELECT",
            "MULTI_SELECT": "MULTI_SELECT",
            "TABLE_SELECT": "TABLE_SELECT"
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
        templateUrl: 'app/components/ods-lib/reports/reports.html',
        scope: {
            reportsGroup: '=',
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

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
                $.grep(report.params, function (param, i) {
                    if (param.hidden) {
                        return param.hidden === false;
                    } else {
                        return true;
                    }
                }).length > 0) {
                $uibModal.open({
                    templateUrl: 'app/components/ods-lib/reports/params.html',
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
                    $scope.reportFile = getUrlReport(outReport);
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

    OdsReportsService.$inject = ['$q', '$http', 'moment', 'OdsParamType', 'DateUtils', '$window'];

    function OdsReportsService($q, $http, moment, OdsParamType, DateUtils, $window) {

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
                                    DateUtils.formatter(report.params[i].value, 'MM/dd/yyyy') + '\n';
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
                        value = DateUtils.convertLocalDateToServer(report.params[i].value);
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
                        param.value = [DateUtils.convertLocalDateToServer(report.params[i].value)];
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
'use strict';

angular
    .module('ods-lib')
    .service('OdsUtils', OdsUtils);

function OdsUtils() {

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
        return "/9j/4AAQSkZJRgABAQEAYABgAAD/4QHGRXhpZgAATU0AKgAAAAgABFEAAAQAAAABAAAAAFEBAAMAAAABAAEAAFECAAEAAAGAAAAAPlEDAAEAAAABAAAAAAAAAADn5+fBwcHAwMC/v7+5ubm8vLzm5ubo6Oi+vr64uLi9vb27u7u6urq3t7fCwsLAwsHCwMHk5OTl5eW2trbf39/V1dXOzs7h4eHj4+Pi4uLa2trFxcXPz8/S0tLc3NzHx8fLy8vW1tbIyMjDw8PKysrExMTX19fMzMzZ2dnR0dHe3t7d3d3Nzc3Q0NDg4ODU1NTGxsbY2NjT09PBwb/b29vBwcPJycnCwb/BwL7Bv8DAwcPCwMPAwr+/wcDCwsDBw8LCwsTBw8C6uLng3t/DwcTBwMXEwL+/wb7AwcXAwMLCwb3b293i4+Xd3tnf4eDBwsTZ3d7AwL68vLrZ3dy7vbzo6Oq9uLzDwcLb29nn5+W5t7i8urvj4eK4ure/w8LFwMS+w7/c2tu5ubvBv8Tn5+nDwsDp5+jp6em7u726vLkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAF/AX8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAorH8aeOdP8C6W1zfTBWIPlRKcyTH0A/r0FeT6X+0drU2rxNcQ2K2TTDzAI23LHu5wc9QO+KAPcKKRHWRAykMrDII7iloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiqer+ItP0CPdfXlraLjP72UJn6Z60AXKK4PXf2ivD+lblt2udRkHQQx7Vz7s2P0BriPEP7RutauGTT7eDTY243f62T8z8v6UAe06xrtn4etDcX11Dawj+KR9ufYep9hXmHjb9pRFDW+gweY3T7TOuFH+6vU/U4+hrzC+kvfEF59ovrme6mb+KVyx/DPT6VNb6csYoAjvri88S6i13f3E1zcSdXkbP4D0HsOKsQ2ixLipVUJ0paAPZvgn4q/t7wqLWVs3GmkRHJ5KfwH8hj/gNdlmvAfh94qbwd4pt7ot/o7nypx6oep/Dg/hXvwbeNw5B5B9aACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoqG/v4NLs5Li5mjt4Yhl5JGCqo9ya8r8b/tJBXa30CASEcfaplO3/gKf1P5UAer3FzHaQtJNJHFGoyzOwVR+JrmtV+M3hnR2ZZNWglZe0Aab9VBH614HrGr6p4tuvO1G8uLps5AdvlX6L0H4CmRaQAOeaAPXtT/ab0e24tbK/um7Fgsan8ck/pXN6t+0tq95kWOn2dqvrIWlYfjwP0ri005F7VKtsq0AW9U+JfifXwwm1a6jVv4YSIR9PlA/WsT+zZLiQySM0jtyWY5JrSEajtTqAKcWlKvarCWqp2qSigAAxRRRQAUUUUABG4Yr6A+Ht0954I0uSTlvs6qSe+Bj+lfP+M17r8J9Rj1DwHY+WwLQqYnH91ge/wCGD+NAHR0UUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVj+NfG9j4E0dry+kx/DFEv35m9FH9egrSv76LTLGa4ncRw26GR2PRVAyTXzX418W3PxF8TyXsxZYQdkERPESdh9T1J9aAJPG3xA1P4lahuuW8q0RsxWyH5I/c/3m9z+nSqNppyxjkVNbWywp0qagBqoFHFOoooAKKKKACiiigAooooAKKKKACiiigArofhv49fwNrm6Qs2n3RCzqP4fRx7j9R+Fc9Qw3DFAH0rbXEd3bxyxOskcihkZTlWB6EU+vJPgn8Q20u8XRb1z9mnbFs5/wCWTn+H6Ht6H68et0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBwf7RWsyaZ8P/JjyPt9wkDEf3cFj+e0D8TXi+m2wSKvXP2mRnwjp/8A1/L/AOgPXldsMRCgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooADkEMpKspyCOxr6G8Ias2u+F7C8b/AFk8Cs/+9jn9c18817x8LTnwBpn/AFzP/oRoA6CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA83/AGmP+RR0/wD6/l/9AevK7b/UrXq/7S0e7wXYt/dv0z7fI9eUW3+pWgCSiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK96+GS7PAWl/8AXHP6mvBa+g/A1ubXwZpaH732WMkemVBoA1aKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDn/inp0OpfD7VlmjWRYbZ5lz/CyKWBH4ivAbKTfEPpX0R48XzPA+sr/esZx/5DavnLSz+5WgC3RRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAOij82VVHViBX0pBCttCka/djUKPoK+b9PG6/gHrIv86+kqACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAzvGCeZ4S1Rf71pKP8Axw182aUf3Qr6Y8Rr5nh6/X+9byD/AMdNfM2knMdAF2iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAktZPJuo37KwP619KCvmc8ivffhxqr614I064kJaRotjE9WKkrn8cUAbdFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRQaAMPx/4w0/whoEr303l/aEaOJANzyNjsPxHPQV876T/q61Pih4jm8aePbyR2P2e1kNvAvZUUkfqcn8faqdtB5KUASUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXuvwlRY/h7poVg3yuSR6l2J/nXhVeifs/wCvzJql3pbNut2jNwgP8DAgHH1yPyoA9UooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPmnxFZfYfGurQ/8APO8lA+m84ptbHxcsP7O+KOpDHyzlJl98oM/qDWPQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXYfA1tvjtf8AagkH16GuPrtPgRAZfG7N/wA8rZ2P5qP60AeyUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHjv7R2l/Z/E+m3wHy3MBhJHqjZ/k/6VxKnKivcPi34Jbxt4UaOAZvLV/OgH94gEFfxH6gV4cEaFmjkVo5IztZWGCp7gigBaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr0b9nqwLX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";
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

        const hideRequiredClass = 'sig-box-default';
        const showRequiredClass = 'sig-box-error';

        //If model not present we will exit.
        if ($scope.model == null) {
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
            if(!$scope.name) {
                $scope.name = OdsSignature.generateName();
            }else {
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
            if ($scope.model && $scope.model !== '') {
                // We set signature if it is present
                OdsSignature.setData($scope.name, $scope.model);
            }
            if ($scope.options.disabled) {
                OdsSignature.disable($scope.name, $scope.options);
            }

            //Init on change event
            $scope.element.bind('change', function (event) {

                    // $timeout, 100, true because event happens outside angular's digest cycle
                    // and change is called on setData
                    $timeout(function () {
                        $scope.model = 'data:' +
                            OdsSignature.getData($scope.name, OdsSignature.exportTypes.IMAGE).join(',');
                    }, 100, true);
                    if ($scope.onChange) {
                        $scope.onChange();
                    }
                }
            );
        }

        function reset() {

            OdsSignature.reset($scope.name, $scope.model);
        }

        function isValid() {

            return OdsSignature.isValid($scope.name);
        }

        function hideRequired(state) {

            if(state){
                $scope.requiredClass = hideRequiredClass;
            }else {
                $scope.requiredClass = showRequiredClass;
            }
            controller.$setValidity('required', state);
        }

        $scope.$watch('model', function (model, oldModel) {

            var valid = isValid($scope.name);
            if ($scope.required && !valid) {
                hideRequired(false);
            } else {
                hideRequired(true);
            }
            if(model !== oldModel){
                OdsSignature.setData($scope.name, model);
            }
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
                hideRequired(false);
            } else {
                hideRequired(true);
            }
            return;
        });

        $scope.$on('$destroy', function() {
            OdsSignature.unregister($scope.name);
        });
    }
}
'use strict';

angular
    .module('ods-lib')
    .factory('OdsSignature', OdsSignature);

function OdsSignature() {

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
    };

    var importTypes = {
        NATIVE: 'native',
        IMAGE: 'image',
        IMAGE_PNG_BASE64: 'image/png;base64',
        IMAGE_JPEG_BASE64: 'image/jpeg;base64',
        IMAGE_JPG_BASE64: 'image/jpg;base64'
    };

    var uniqueCounter = (+new Date) % 10000;

    var instance_map = {};

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

        instance_map[name] = instance;
    }

    function getInstance(name) {

        if (instance_map[name])
            return instance_map[name];
        else
            return false;
    }

    function unregister(name) {

        instance_map[name] = null;
    }

    function generateName() {

        uniqueCounter++;
        return 'signature' + uniqueCounter;
    }

    function reset(name, model) {

        var element = getInstance(name);
        if (element) {
            element.jSignature('reset');
            model = '';
        }
    }

    function isValid(name) {

        var d = getData(name, exportTypes.NATIVE);
        if (d.length >= 1) {
            return true;
        }else {
            return false;
        }
    }

    function getData(name, type) {

        var element = getInstance(name);
        if (element) {
            return element.jSignature('getData', type);
        } else
            return false;
    }

    function getDataAsSVG(name) {

        var element = getInstance(name);
        var svg = element.jSignature('getData', 'svg');
        return svg;
    }

    function getDataAsBase30(name) {

        var element = getInstance(name);
        if (element) {
            var svg = element.jSignature('getData', 'svg');
            return svg;
        } else
            return false;
    }

    function setData(name, model) {

        reset(name, model);
        var element = getInstance(name);
        if (element) {
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

    function undo(name) {

        var eventName = apinamespace + '.undo';
        var element = getInstance(name);
        if (element) {
            element.jSignature('events');
        }
    }

}
'use strict';

angular
    .module('ods-lib')
    .directive('stepsIndicator', StepsIndicator);

StepsIndicator.$inject = [];

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

    function linkFunc($scope, $element) {

        $scope.changeStatus = changeStatus;

        function changeStatus(elem) {

            if ($scope.type === 'multiselect') {
                if (elem.callback) {
                    elem.callback(elem);
                }
            } else {
                if (elem.callback) {
                    for (var i = 0; i < $scope.ngModel.length; i++) {
                        $scope.ngModel[i].status = '';
                    }
                    elem.callback(elem);
                }
            }
            var elementPos = $scope.ngModel.map(function(x) {return x.name; }).indexOf(elem.name);
            $scope.ngModel[elementPos].status = 'active';
        }
    }
}

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
                scope.riquired = $parse(attrs.uiSelectRequired)(scope);//JSON.parse(attrs.ngRequired);

                ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {

                    if (scope.riquired) {
                        var determineVal;
                        if (angular.isArray(modelValue)) {
                            determineVal = modelValue;
                        } else if (angular.isArray(viewValue)) {
                            determineVal = viewValue;
                        } else if (isEmpty(modelValue)) {
                            return false;
                        } else {
                            return true;
                        }
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
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
})();

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
    }
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
            MULTI_SELECT: 'multiselect',
            IF_YES: 'if_yes',
            TABLE: 'table',
            LABEL: 'label',
            CHECKBOX: 'checkbox',
            CHECKBOX_LIST: 'checkboxlist',
            RADIO: 'radio',
            CKEDITOR: 'ckeditor'
            //You can add your new field types
        })
        .constant('OdsComponentType', {
            SECTION: 'section', //Do not edit this type
            ROW: 'row', //Do not edit this type
            COLUMN: 'column', //Do not edit this type
            FIELD: 'field', //Do not edit this type
            PLUGIN: 'plugin' //Do not edit this type
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
        '$resource'];

    function OdsFormService(OdsFieldType, OdsComponentType, OdsDateTimeFormat, $window, dialogs,
                            $resource) {

        var uniqueCounter = (+new Date) % 10000;
        // var schema = null;

        var service = {
            //Utils methods
            newSchema: newSchema,
            initSchema: initSchema,
            generateName: generateName,
            onAdd: onAdd,
            getFieldValueAsNumber: getFieldValueAsNumber,
            copyToClipboard: copyToClipboard,
            strSubtitutor: strSubtitutor,
            restResource: restResource,
            // http: http,

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
            newFieldMultiSelectObject: newFieldMultiSelectObject,
            newFieldToggleObject: newFieldToggleObject,
            newDateTimeObject: newDateTimeObject,
            newFieldLabelObject: newFieldLabelObject,
            newFieldCheckBoxObject: newFieldCheckBoxObject,
            newFieldCheckBoxListObject: newFieldCheckBoxListObject,
            newFieldRadioListObject: newFieldRadioListObject,

            //Fields plugins creation methods
            newYesNoObject: newYesNoObject,
            newTableObject: newTableObject,
            newItemObject: newItemObject,
            newCKEditorObject: newCKEditorObject,

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

            getTimeZoneUTC: getTimeZoneUTC,
            convertFormSchemaFromServer: convertFormSchemaFromServer,
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
                description: 'New Form Description',
                layout: [],
                allowedTypes: [OdsComponentType.SECTION]
            };
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
                this.schema = schema;
            } else {
                alert('Please specify a schema!!!');
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
                        case OdsFieldType.MULTI_SELECT:
                            return 'forms/toolbar/components/multi-select.html';
                        case OdsFieldType.TOGGLE:
                            return 'forms/toolbar/components/toggle.html';
                        case OdsFieldType.DATETIME:
                            return 'forms/toolbar/components/datetime.html';
                        case OdsFieldType.IF_YES:
                            return 'forms/toolbar/plugins/if-yes.html';
                        case OdsFieldType.TABLE:
                            return 'forms/toolbar/plugins/table.html';
                        case OdsFieldType.LABEL:
                            return 'forms/toolbar/components/label.html';
                        case OdsFieldType.CHECKBOX:
                            return 'forms/toolbar/components/checkbox.html';
                        case OdsFieldType.CHECKBOX_LIST:
                            return 'forms/toolbar/components/checkbox-list.html';
                        case OdsFieldType.RADIO:
                            return 'forms/toolbar/components/radio-list.html';
                        case OdsFieldType.CKEDITOR:
                            return 'forms/toolbar/components/ckeditor.html';
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
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/schema/components/multi-select/multi-select.html';
                case OdsFieldType.TOGGLE:
                    return 'forms/schema/components/toggle/toggle.html';
                case OdsFieldType.DATETIME:
                    return 'forms/schema/components/datetime/datetime.html';
                case OdsFieldType.IF_YES:
                    return 'forms/schema/plugins/if-yes/if-yes.html';
                case OdsFieldType.TABLE:
                    return 'forms/schema/plugins/table/container.html';
                case OdsFieldType.LABEL:
                    return 'forms/schema/components/label.html';
                case OdsFieldType.CHECKBOX:
                    return 'forms/schema/components/checkbox/checkbox.html';
                case OdsFieldType.CHECKBOX_LIST:
                    return 'forms/schema/components/checkbox-list/checkbox-list.html';
                case OdsFieldType.RADIO:
                    return 'forms/schema/components/radio-list/radio-list.html';
                case OdsFieldType.CKEDITOR:
                    return 'forms/schema/plugins/ckeditor/ckeditor.html';
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
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/schema/components/multi-select/multi-select-properties.html';
                case OdsFieldType.TOGGLE:
                    return 'forms/schema/components/toggle/toggle-properties.html';
                case OdsFieldType.DATETIME:
                    return 'forms/schema/components/datetime/datetime-properties.html';
                case OdsFieldType.IF_YES:
                    return 'forms/schema/plugins/if-yes/if-yes-properties.html';
                case OdsFieldType.TABLE:
                    return 'forms/schema/plugins/table/table-properties.html';
                case OdsFieldType.LABEL:
                    return 'forms/schema/components/label/label-properties.html';
                case OdsFieldType.CHECKBOX:
                    return 'forms/schema/components/checkbox/checkbox-properties.html';
                case OdsFieldType.CHECKBOX_LIST:
                    return 'forms/schema/components/checkbox-list/checkbox-list-properties.html';
                case OdsFieldType.RADIO:
                    return 'forms/schema/components/radio-list/radio-list-properties.html';
                case OdsFieldType.CKEDITOR:
                    return 'forms/schema/plugins/ckeditor/ckeditor-properties.html';
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
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/common/fields/multi-select.html';
                case OdsFieldType.DATETIME:
                    return 'forms/common/fields/datetime.html';
                case OdsFieldType.IF_YES:
                    return 'forms/common/fields/plugins/if-yes.html';
                case OdsFieldType.TABLE:
                    return 'forms/common/fields/plugins/table.html';
                case OdsFieldType.LABEL:
                    return 'forms/common/fields/label-empty.html';
                case OdsFieldType.CHECKBOX:
                    return 'forms/common/fields/checkbox.html';
                case OdsFieldType.CHECKBOX_LIST:
                    return 'forms/common/fields/checkbox-list.html';
                case OdsFieldType.RADIO:
                    return 'forms/common/fields/radio-list.html';
                case OdsFieldType.CKEDITOR:
                    return 'forms/common/fields/plugins/ckeditor.html';
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
                case OdsFieldType.MULTI_SELECT:
                    return 'forms/common/viewer/multi-select.html';
                case OdsFieldType.DATETIME:
                    return 'forms/common/viewer/datetime.html';
                case OdsFieldType.IF_YES:
                    return 'forms/common/viewer/plugins/if-yes.html';
                case OdsFieldType.TABLE:
                    return 'forms/common/viewer/plugins/table.html';
                case OdsFieldType.LABEL:
                    return 'forms/common/fields/label-empty.html';
                case OdsFieldType.CHECKBOX:
                    return 'forms/common/viewer/checkbox.html';
                case OdsFieldType.CHECKBOX_LIST:
                    return 'forms/common/viewer/checkbox-list.html';
                case OdsFieldType.RADIO:
                    return 'forms/common/viewer/radio-list.html';
                case OdsFieldType.CKEDITOR:
                    return 'forms/common/viewer/plugins/ckeditor.html';
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
         * @returns {{name, componentType: string, title: string, displayProperties: boolean, allowedTypes: [null], rows: [null]}}
         */
        function newSectionObject() {

            return {
                name: generateName(OdsComponentType.SECTION),
                componentType: OdsComponentType.SECTION,
                title: 'Section',
                displayProperties: false,
                allowedTypes: [
                    OdsComponentType.ROW
                ],
                rows: [newRowObject()]
            }
        }

        /**
         * Create a new Row Object.
         * @returns {{name, componentType: string, cssClass: string, displayProperties: boolean, cols: [null]}}
         */
        function newRowObject() {

            return {
                name: generateName(OdsComponentType.ROW),
                componentType: OdsComponentType.ROW,
                cssClass: 'row',
                displayProperties: false,
                cols: [newColumnObject(12)]
            }
        }

        /**
         * Create a new Column Object.
         * @param colWidth Width of column.
         * @returns {{name, cssClass: string, allowedTypes: [null], fields: Array}}
         */
        function newColumnObject(colWidth) {

            return {
                name: generateName(OdsComponentType.COLUMN),
                cssClass: 'col-lg-' + colWidth,
                allowedTypes: [
                    OdsComponentType.FIELD
                ],
                fields: []
            }
        }

        /**
         * Create a new Field Text Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldTextObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'TextBox',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.TEXT,
                required: false,
                value: null,
                validation: {
                    messages: {}
                },
                getValue: function () {
                    return value;
                }
            }
        }

        /**
         * Create a new Field Number Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldNumberObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Number',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.NUMBER,
                required: false,
                value: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Password Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldPasswordObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Password',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.PASSWORD,
                required: false,
                value: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Textarea Object.
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, value: null}}
         */
        function newFieldTextareaObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Textarea',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.TEXTAREA,
                required: false,
                rows: 3,
                value: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Select Object
         * @returns Field Select Object
         */
        function newFieldSelectObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Select',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.SELECT,
                required: false,
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
            }
        }

        /**
         * Create a new Field Multiselect Object
         * @returns {{componentType: string, label: string, name, placeholder: string, type: string, required: boolean, multiSelect: boolean, valueField: string, titleField: string, limitTo: number, value: Array, options: Array, render: null, validation: {messages: {}}}}
         */
        function newFieldMultiSelectObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Multi select',
                name: generateName(OdsComponentType.FIELD),
                placeholder: '',
                type: OdsFieldType.MULTI_SELECT,
                required: false,
                multiSelect: true,
                valueField: 'id',
                titleField: 'name',
                limitTo: 10,
                value: [],
                options: [],
                render: null,
                validation: {
                    messages: {}
                }
            }
        }

        /**
         * Create a new Field Toggle Object
         * @returns Field Toggle Object
         */
        function newFieldToggleObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Toggle',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.TOGGLE,
                ln: false,
                on: 'Yes',
                off: 'No',
                value: false
            }
        }

        function newDateTimeObject() {

            var today = new Date();
            var date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0));
            return {
                componentType: OdsComponentType.FIELD,
                label: 'DateTime',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.DATETIME,
                enableTime: false,
                format: OdsDateTimeFormat.ShortDateLongYear,
                selectedFormat: OdsDateTimeFormat.ShortDateLongYear,
                options: {
                    timezone: getTimeZoneUTC()
                },
                // utc: true,
                required: false,
                value: date
            }
        }

        function newFieldLabelObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Label',
                cssClass: 'text-left',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.LABEL,
                value: 'Label'
            }
        }

        function newFieldCheckBoxObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'CheckBox',
                hideLabel: true,
                ln: false,
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.CHECKBOX,
                value: false
            }
        }

        function newFieldCheckBoxListObject() {
            return {
                componentType: OdsComponentType.FIELD,
                label: 'CheckBox List',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.CHECKBOX_LIST,
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
            }
        }

        function newFieldRadioListObject() {
            return {
                componentType: OdsComponentType.FIELD,
                label: 'Radiobutton List',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.RADIO,
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
            }
        }

        function newYesNoObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'If yes:',
                name: generateName(OdsComponentType.FIELD),
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
            }
        }

        function newTableObject() {

            return {
                componentType: OdsComponentType.FIELD,
                label: 'Table',
                name: generateName(OdsComponentType.FIELD),
                type: OdsFieldType.TABLE,
                cssClass: 'table table-bordered table-responsive position-relative',
                matrix: [
                    [newItemObject(), newItemObject()]
                ],
                validation: {
                    messages: {}
                }
            }
        }

        function newItemObject() {

            return {
                name: generateName(OdsComponentType.ITEM),
                fields: [],
                // width: '10px',
                allowedTypes: [OdsComponentType.FIELD]
            }
        }

        function newCKEditorObject() {

            //Default key combination. (CTRL + SPACE)
            const CTRL = 1114112;

            return {
                componentType: OdsComponentType.FIELD,
                label: 'CKEditor',
                name: generateName(OdsComponentType.FIELD),
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
            }
        }

        function defaultCKEditorPrefix() {

            return '${';
        }

        function defaultCKEditorSuffix() {

            return '}';
        }

        /**
         * Remove row from table.
         * @param table Table
         * @param index Row index to remove.
         */
        function removeRow(table, index) {

            if (table.matrix.length > 1) {
                dialogs.confirm('Confirm!!!', 'Do you want to remove this row?',
                    {size: 'sm'}).result.then(function () {

                    table.matrix.splice(index, 1);
                });
            } else {
                dialogs.notify('Information', 'At least one row must exist.',
                    {size: 'sm'}).result.then(function () {
                });
            }
        }

        /**
         * remove column to from table.
         * @param table Table
         * @param index Column index to remove.
         */
        function removeColumn(table, index) {

            if (table.matrix[0].length > 1) {
                dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
                    {size: 'sm'}).result.then(function () {

                    for (var i = 0; i < table.matrix.length; i++) {
                        table.matrix[i].splice(index, 1);
                    }
                });
            } else {
                dialogs.notify('Information', 'At least one column must exist.',
                    {size: 'sm'}).result.then(function () {
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
                }
            }
            table.matrix.push(row);
        }

        function getTimeZoneUTC() {

            return 'UTC/GMT';
        }

        function getFieldValueAsNumber(field) {

            var value = 0;
            switch (field.type) {
                case OdsFieldType.TEXT:
                    if (field.value) {
                        value += Number(field.value);
                    }
                    break;
                case OdsFieldType.NUMBER:
                    if (field.value) {
                        value += Number(field.value);
                    }
                    break;
                case OdsFieldType.SELECT:
                    if (field.value) {
                        var id = getSelectFieldId(field);
                        value += Number(field.value[id]);
                    }
                    break;
                case OdsFieldType.MULTI_SELECT:
                    if (field.value) {
                        var id = getSelectFieldId(field);
                        for (var i = 0; i < field.value.length; i++) {
                            value += Number(field.value[i][id]);
                        }
                    }
                    break;
                case OdsFieldType.TEXTAREA:
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
                    }
                    else {
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
                return clipboardData.setData("Text", text);

            } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                var textarea = document.createElement("textarea");
                textarea.textContent = text;
                textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                } catch (ex) {
                    console.warn("Copy to clipboard failed.", ex);
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

            var strResult = str;

            for (var property in valuesMap) {
                if (valuesMap.hasOwnProperty(property)) {
                    // do stuff
                    var re = new RegExp(escapeRegExp(prefix + property + suffix), 'gi');
                    strResult = strResult.replace(re, valuesMap[property]);
                }
            }

            return strResult;
        }

        function restResource(resourceUrl) {

            return $resource(resourceUrl, {}, {
                'query': {method: 'GET', isArray: true},
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

        function escapeRegExp(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

        function copyJson(json) {

            // $window.prompt('Copy to clipboard: Ctrl+C, Enter', json);
            copyToClipboard(json);
            $window.alert('Code copied to clipboard!!!');
        }

        //TODO add get values from table field, not implemented at the moment.
        function saveFormData(schema) {

            var formData = {
                formName: schema.name,
                formLabel: schema.label,
                formDescription: schema.description,
                fields: []
            };

            var layout = schema.layout;
            for (var i = 0; i < layout.length; i++) {
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        var fields = cols[k].fields;
                        for (var l = 0; l < fields.length; l++) {
                            if (fields[l].type == OdsFieldType.TABLE) {
                                for (var m = 0; m < fields[l].matrix.length; m++) {
                                    for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                        var field = {
                                            name: cols[k].fields[l].matrix[m][p].fields[0].name,
                                            type: cols[k].fields[l].matrix[m][p].fields[0].type,
                                            code: cols[k].fields[l].matrix[m][p].fields[0].code,
                                            value: cols[k].fields[l].matrix[m][p].fields[0].value
                                        };
                                        formData.fields.push(field);
                                    }
                                }
                            } else {
                                var field = {
                                    name: cols[k].fields[l].name,
                                    type: cols[k].fields[l].type,
                                    code: cols[k].fields[l].code,
                                    value: cols[k].fields[l].value
                                };
                                formData.fields.push(field);
                            }
                        }
                    }
                }
            }
            return formData;
        }

        function saveFormSchema(schema) {

            return schema;
        }

        function getDataFromComponentCode(schema, code) {

            var resultFields = [];

            var layout = schema.layout;
            for (var i = 0; i < layout.length; i++) {
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        var fields = cols[k].fields;
                        for (var l = 0; l < fields.length; l++) {
                            if (fields[l].type == OdsFieldType.TABLE) {
                                for (var m = 0; m < fields[l].matrix.length; m++) {
                                    for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                        if (cols[k].fields[l].matrix[m][p].fields[0].code === code) {
                                            var field = {
                                                name: cols[k].fields[l].matrix[m][p].fields[0].name,
                                                type: cols[k].fields[l].matrix[m][p].fields[0].type,
                                                code: cols[k].fields[l].matrix[m][p].fields[0].code,
                                                value: cols[k].fields[l].matrix[m][p].fields[0].value
                                            };
                                            resultFields.push(field);
                                        }
                                    }
                                }
                            } else {
                                if (cols[k].fields[l].code === code) {
                                    var field = {
                                        name: cols[k].fields[l].name,
                                        type: cols[k].fields[l].type,
                                        code: cols[k].fields[l].code,
                                        value: cols[k].fields[l].value
                                    };
                                    resultFields.push(field);
                                }
                            }
                            // //TODO if component is a table we need to lookup for every field in the table.
                            // if (cols[k].fields[l].code === code) {
                            //     var field = {
                            //         name: cols[k].fields[l].name,
                            //         code: cols[k].fields[l].code,
                            //         value: cols[k].fields[l].value
                            //     };
                            //     resultFields.push(field);
                            // }
                        }
                    }
                }
            }
            return fields;
        }

        function convertFormSchemaFromServer(json) {

            var schema = angular.fromJson(json);

            var layout = schema.layout;
            //For each section
            for (var i = 0; i < layout.length; i++) {
                //For each row
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    //For each column
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        //For each field
                        var fields = cols[k].fields;
                        for (var l = 0; l < fields.length; l++) {
                            //If field is a table we must to loop through each table cell
                            if (fields[l].type == OdsFieldType.TABLE) {
                                for (var m = 0; m < fields[l].matrix.length; m++) {
                                    for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                        //If field is datetime we set Date object from string
                                        if (cols[k].fields[l].matrix[m][p].fields[0].type == OdsFieldType.DATETIME) {
                                            cols[k].fields[l].matrix[m][p].fields[0].value = new Date(Date.parse(cols[k].fields[l].matrix[m][p].fields[0].value));
                                        }
                                    }
                                }
                            }
                            //If field is datetime we set Date object from string
                            else if (fields[l].type == OdsFieldType.DATETIME) {
                                fields[l].value = new Date(Date.parse(fields[l].value));
                            }
                        }
                    }
                }
            }

            return schema;
        }

        function setConfigToCKEditorComponent(schema, config) {

            var layout = schema.layout;
            for (var i = 0; i < layout.length; i++) {
                var rows = layout[i].rows;
                for (var j = 0; j < rows.length; j++) {
                    var cols = rows[j].cols;
                    for (var k = 0; k < cols.length; k++) {
                        var fields = cols[k].fields;
                        for (var l = 0; l < fields.length; l++) {
                            if (fields[l].type == OdsFieldType.TABLE) {
                                for (var m = 0; m < fields[l].matrix.length; m++) {
                                    for (var p = 0; p < fields[l].matrix[m].length; p++) {
                                        if (cols[k].fields[l].matrix[m][p].fields[0].type === OdsFieldType.CKEDITOR) {
                                            cols[k].fields[l].matrix[m][p].fields[0].options.prefix = config.ckeditor.prefix ? config.ckeditor.prefix : defaultCKEditorPrefix();
                                            cols[k].fields[l].matrix[m][p].fields[0].options.suffix = config.ckeditor.suffix ? config.ckeditor.suffix : defaultCKEditorSuffix();
                                            cols[k].fields[l].matrix[m][p].fields[0].options.suggestions = config.ckeditor.suggestions ? config.ckeditor.suggestions : [];
                                            cols[k].fields[l].matrix[m][p].fields[0].options.tokens = config.ckeditor.tokens ? config.ckeditor.tokens : null;
                                        }
                                    }
                                }
                            } else {
                                if (cols[k].fields[l].type === OdsFieldType.CKEDITOR) {
                                    cols[k].fields[l].options.prefix = config.ckeditor.prefix ? config.ckeditor.prefix : defaultCKEditorPrefix();
                                    cols[k].fields[l].options.suffix = config.ckeditor.suffix ? config.ckeditor.suffix : defaultCKEditorSuffix();
                                    cols[k].fields[l].options.suggestions = config.ckeditor.suggestions ? config.ckeditor.suggestions : [];
                                    cols[k].fields[l].options.tokens = config.ckeditor.tokens ? config.ckeditor.tokens : null;
                                }
                            }
                        }
                    }
                }
            }
            return fields;
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

FormDirective.$inject = ['OdsFormService', '$timeout'];

function FormDirective(OdsFormService, $timeout) {

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

        if ($scope.config) {
            //CKEditor config load.
            if ($scope.config.ckeditor) {

                OdsFormService.setConfigToCKEditorComponent($scope.schema, $scope.config);
            }
        }

        $scope.form;

        $scope.clear = clear;
        $scope.save = save;

        $scope.hideTitle = hideTitle;

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

        function hideTitle(field) {

            return field.hideLabel ? true : false;
        }

        /**
         * Return if field is required.
         * @param field Field
         * @returns {boolean}
         */
        function getRequired(field) {

            return field &&
            field.validation &&
            field.validation.required &&
            field.validation.required !== undefined ? field.validation.required : false;
        }

        /**
         * Return if field has min length.
         * @param field Field
         * @returns {boolean}
         */
        function getMinLength(field) {

            return field &&
            field.validation &&
            field.validation.minlength &&
            field.validation.minlength !== undefined ? field.validation.minlength : null;
        }

        /**
         * Return if field has a pattern.
         * @param field Field
         * @returns {boolean}
         */
        function getPattern(field) {

            return field &&
            field.validation &&
            field.validation.pattern &&
            field.validation.pattern !== undefined ? field.validation.pattern : null;
        }

        /**
         * Return if field has max length.
         * @param field Field
         * @returns {boolean}
         */
        function getMaxLength(field) {

            return field &&
            field.validation &&
            field.validation.maxlength &&
            field.validation.maxlength !== undefined ? field.validation.maxlength : null;
        }

        function getFormFieldTemplate(fieldType) {

            return OdsFormService.getFormFieldTemplate(fieldType);
        }

        function getSelectFieldTitleValue(field, element) {

            return OdsFormService.getSelectFieldTitleValue(field, element);
        }

        function clear() {
            //TODO confirm if you want to clear al fields.
            showInfo("Form cleared!!!");
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

        function showSuccess(message) {

            $scope.success = true;
            $scope.message = message;
            $timeout(function () {
                $scope.success = false;
                $scope.message = '';
            }, 5000);
        }

        function showInfo(message) {

            $scope.info = true;
            $scope.message = message;
            $timeout(function () {
                $scope.info = false;
                $scope.message = '';
            }, 5000);
        }

        // $scope.$watch('schema', function(schema) {
        //     console.log('Schema changed.');
        // }, true);

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

        function valueSubtitutor(value, tokens, prefix, suffix) {

            if (tokens) {
                return OdsFormService.strSubtitutor(value, tokens, prefix, suffix);
            } else {
                return value;
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
    .directive('odsSchema', SchemaDirective);

SchemaDirective.$inject = ['OdsFormService'];

function SchemaDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/schema.html',
        scope: {
            schema: '=',
            config: '=',
            debugMode: '='
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope) {

        if(!$scope.schema) {
            $scope.schema = OdsFormService.newSchema();
            // $scope.schema = OdsFormService.initSchema($scope.schema);
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

OdsFormToolbar.$inject = ['OdsFormService'];

function OdsFormToolbar(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/toolbar/toolbar.html',
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.getToolbarComponent = getToolbarComponent;

        $scope.toolbar = {
            title: 'Fields Toolbar',
            groups: [{
                id: 0,
                open: false,
                disabled: false,
                title: 'Layout',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newSectionObject()
                ]
            }, {
                id: 1,
                open: false,
                disabled: false,
                title: 'Text input fields',
                icon: 'fa fa-dashboard',
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
                components: [
                    OdsFormService.newFieldRadioListObject(),
                    OdsFormService.newFieldSelectObject(),
                    OdsFormService.newFieldMultiSelectObject()

                ]
            }, {
                id: 3,
                open: false,
                disabled: false,
                title: 'Check input fields',
                icon: 'fa fa-dashboard',
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
                components: [
                    OdsFormService.newDateTimeObject()
                ]
            }, {
                id: 5,
                open: false,
                disabled: false,
                title: 'Plugins',
                icon: 'fa fa-dashboard',
                components: [
                    OdsFormService.newYesNoObject(),
                    OdsFormService.newTableObject(),
                    OdsFormService.newFieldLabelObject(),
                    OdsFormService.newCKEditorObject()
                ]
            }]
        };

        function getToolbarComponent(componentType) {
            return OdsFormService.getToolbarComponent(componentType);
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
            cssClass: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc($scope) {

        //CKEditor specific
        $scope.valueSubtitutor = valueSubtitutor;
        $scope.getFormViewerTemplate = getFormViewerTemplate;

        $scope.getRadioTextFromValue = getRadioTextFromValue;
        $scope.getSelectTextFromValue = getSelectTextFromValue;
        $scope.getFieldTextsFromValues = getFieldTextsFromValues;
        $scope.getFieldChecklistFromValues = getFieldChecklistFromValues;

        $scope.dateTimeRender = dateTimeRender;

        /**
         * Return Form Viewer template for every field.
         * @param fieldType Field type.
         * @returns {*} Field Viewer template.
         */
        function getFormViewerTemplate(fieldType) {

            return OdsFormService.getFormViewerTemplate(fieldType);
        }

        function valueSubtitutor(value, tokens, prefix, suffix) {

            if (tokens) {
                return OdsFormService.strSubtitutor(value, tokens, prefix, suffix);
            } else {
                return value;
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
                    if (value == field.value[OdsFormService.getSelectFieldId(field)]) {
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
                        if (value == current) {
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

        function getFieldChecklistFromValues(field) {

            var result = [];
            if (field.value) {
                for (var i = 0; i < field.options.length; i++) {
                    var id = field.value[i + 1];
                    if (id) {
                        var value = field.options[i].name;
                        result.push(value);
                    }
                }
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
    .directive('odsModel', ModelDirective);

ModelDirective.$inject = ['OdsFormService'];

function ModelDirective(OdsFormService) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/common/model/model.html',
        scope: {
            model: '=',
            cssClass: '@'
        },
        link: linkFunc
    };

    return directive;

    /* private helper methods*/

    function linkFunc($scope, $element) {

        $scope.copy = copy;

        $scope.$watch('model', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

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

    function linkFunc($scope, $element) {

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
        $scope.fieldDisabled = true;

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
        $scope.showCustomFormat = $scope.field.selectedFormat === 'custom' ? true : false;
        $scope.onSelectFormat = onSelectFormat;

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
                {size: 'sm'}).result.then(function (btn) {

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
                var pattern = {
                    pattern: $scope.patterns[$scope.field.patternSelect].pattern
                }
                $scope.field.validation = pattern;
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

            $scope.field.open = !field.open;
            return $scope.field.open;
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

    function linkFunc($scope, $element) {

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

    function linkFunc($scope, $element) {

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

    function linkFunc($scope, $element) {

        $scope.toggleRowProperties = toggleRowProperties;
        $scope.removeRow = removeRow;
        $scope.addColumn = addColumn;
        $scope.removeColumn = removeColumn;
        $scope.onAdd = onAdd;

        /**
         * Catch onAdd event in drag and drop for setting field properties
         * @param item Field
         * @param type Field type.
         */
        function onAdd(item, type) {

            OdsFormService.onAdd(item, type);
        };

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
                {size: 'sm'}).result.then(function (btn) {

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
                gridSize = eval(gridSize + size);
            }
            if (gridSize < 12) {
                row.cols.push(OdsFormService.newColumnObject(12 - gridSize));
            } else {
                dialogs.notify('Notification', 'Columns can\'t be greater than 12 columns, please fix it!!!',
                    {size: 'sm'}).result.then(function (btn) {
                });
            }
        }

        /**
         * Add column to current row.
         * @param row Row to add column.
         */
        function removeColumn(index) {

            dialogs.confirm('Confirm!!!', 'Do you want to remove this column?',
                {size: 'sm'}).result.then(function (btn) {

                $scope.row.cols.splice(index, 1);
                $scope.tableParams.reload();
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

    function linkFunc($scope, $element) {

        $scope.toggleProperties = toggleProperties;
        $scope.remove = remove;
        $scope.swap = swap;
        $scope.addRow = addRow;

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
                {size: 'sm'}).result.then(function (btn) {
                $scope.schema.layout.splice(index, 1);
            });
        }

        /**
         * Swap Section order.
         * @param index New Section index.
         */
        function swap(idx1, idx2) {

            dialogs.confirm('Confirm!!!', 'Do you want swap this section?',
                {size: 'sm'}).result.then(function (btn) {

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

    function linkFunc($scope, $element) {

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
    .directive('odsSuggestionOptions', SuggestionOptionsDirective);

SuggestionOptionsDirective.$inject = ['OdsFormService', 'OdsCkeditor', '$timeout'];

function SuggestionOptionsDirective(OdsFormService, OdsCkeditor, $timeout) {

    var directive = {
        restrict: 'E',
        templateUrl: 'forms/schema/plugins/ckeditor/suggestion-options-properties.html',
        scope: {
            field: '=',
            config: '='
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

    function linkFunc($scope, $element) {

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

    function linkFunc($scope, $element) {

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
                dialogs.notify('Information!!!', 'Insert a table into a table cell is not allowed.',
                    {size: 'sm'});
                return false;
            } else return item;

        }

        function onAdd(item, type) {

            OdsFormService.onAdd(item, type);
        };

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
                {size: 'sm'}).result.then(function (btn) {

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
                {size: 'sm'}).result.then(function (btn) {

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

})();