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