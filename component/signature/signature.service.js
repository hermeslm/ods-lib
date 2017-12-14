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

    function reset(name) {

        var element = getInstance(name);
        if (element) {
            element.jSignature('reset');
        }
    }

    function isValid(name) {

        var d = getData(name, exportTypes.NATIVE);
        if (d.length >= 1)
            return true;
        else
            return false;
    }

    function getData(name, type) {

        var element = getInstance(name);
        if (element)
            return element.jSignature('getData', type);
        else
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

    function undo(name) {

        var eventName = apinamespace + '.undo';
        var element = getInstance(name);
        if (element) {
            element.jSignature('events');
        }
    }

}