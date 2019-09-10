/**
 * Created by hermeslm on 3/28/17.
 */


angular
  .module('ods-lib')
  .directive('odsDynamicName', DynamicNameDirective);

DynamicNameDirective.$inject = ['$compile', '$parse'];

function DynamicNameDirective($compile, $parse) {
  return {
    restrict: 'A',
    terminal: true,
    priority: 100000,
    link(scope, elem) {
      const name = $parse(elem.attr('ods-dynamic-name'))(scope);
      // $interpolate() will support things like 'skill'+skill.id where parse will not
      elem.removeAttr('ods-dynamic-name');
      elem.attr('name', name);
      $compile(elem)(scope);
    },
  };
}
