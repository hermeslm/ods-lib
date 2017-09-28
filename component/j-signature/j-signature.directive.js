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