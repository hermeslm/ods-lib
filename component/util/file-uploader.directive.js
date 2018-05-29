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

            ngModel.$render = function () {
            };

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
