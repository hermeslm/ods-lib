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
    }

    var importTypes = {
        NATIVE: 'native',
        IMAGE: 'image',
        IMAGE_PNG_BASE64: 'image/png;base64',
        IMAGE_JPEG_BASE64: 'image/jpeg;base64',
        IMAGE_JPG_BASE64: 'image/jpg;base64'
    }

    var service = {
        getObject: getObject,
        exportTypes: exportTypes,
        importTypes: importTypes,
        reset: reset,
        isValid: isValid,
        getData: getData,
        setData: setData,
        disable: disable,
        enable: enable
    };

    return service;

    function reset(model) {

        model.element.jSignature('reset');
    }

    function isValid(model) {

        var d = getData(model, exportTypes.NATIVE);
        if (d.length >= 1) {
            return true;
        }
        return false;
    }

    function getData(model, type) {
        // console.log('getData!!!');
        return model.element.jSignature('getData', type);
    }

    function getDataAsSVG(model) {

        var svg = model.element.jSignature('getData', 'svg');
        return svg;
    }

    function getDataAsBase30(model) {

        var svg = model.element.jSignature('getData', 'svg');
        return svg;
    }

    function setData(model, sig) {

        reset(model);
        model.element.jSignature('setData', sig);
    }

    function disable(model) {

        model.element.jSignature('disable');
    }

    function enable(model) {

        model.element.jSignature('enable');
    }

    function undo(element) {

        var eventName = apinamespace + '.undo';
        element.jSignature('events');
    }

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