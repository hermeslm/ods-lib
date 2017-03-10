'use strict';

angular
    .module('ods-lib')
    .directive('address', Address);

Address.$inject = ['$uibModal', '$state'];

function Address($uibModal, $state) {

    var directive = {
        restrict: 'E',
        templateUrl: 'address.html',
        scope: {
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
                templateUrl: 'address-dialog.html',
                controller: 'AddressDialogController',
                controllerAs: 'vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    address: function () {
                        if ($scope.ngModel !== null) {
                            return {
                                address: $scope.ngModel.address,
                                address2: $scope.ngModel.address2,
                                city: $scope.ngModel.city,
                                state: $scope.ngModel.state,
                                zip: $scope.ngModel.zip,
                                country: $scope.ngModel.country,
                                phone: $scope.ngModel.phone,
                                mobile: $scope.ngModel.mobile,
                                fax: $scope.ngModel.fax,
                                email: $scope.ngModel.email,
                                notes: $scope.ngModel.notes
                            }
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
                return address.address + ' ' +
                    address.address2 + ' ' +
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