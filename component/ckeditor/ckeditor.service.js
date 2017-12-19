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
        generateName: generateName,
        getData: getData,
        setData: setData,
        setOptions: setOptions,
        setReadOnly: setReadOnly,
        initOptions: initOptions
    };

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
        return 'ckeditor' + uniqueCounter;
    }

    function getData(name) {

        var ck = getInstance(name);
        if (ck) {
            return ck.getData();
        }else {
            return '';
        }
    }

    function setData(name, model) {

        var ck = getInstance(name);
        if (ck) {
            ck.setData(model);
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