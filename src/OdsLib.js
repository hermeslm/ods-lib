import angular from 'angular';

// import demoComponent from './components/forms/demo.component';
import FieldType from './components/forms/constants/FieldType';
import ComponentType from './components/forms/constants/ComponentType';
import DateTimeFormat from './components/forms/constants/DateTimeFormat';

const OdsLib = angular
  .module('ods-lib', [])
  .constant('OdsFieldType', FieldType)
  .constant('OdsComponentType', ComponentType)
  .constant('OdsDateTimeFormat', DateTimeFormat)
  .constant('OdsEvent', Event)
  // .component(...demoComponent);

export default OdsLib;
