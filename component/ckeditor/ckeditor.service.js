'use strict';

angular
    .module('ods-lib')
    .factory('OdsCkeditor', OdsCkeditor);

function OdsCkeditor() {

    var uniqueCounter = (+new Date()) % 10000;

    var keyCode = CKEDITOR.CTRL + 32;

    var instanceMap = {};

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

        instanceMap[name] = instance;
    }

    function getInstance(name) {

        if (instanceMap[name]) {
            return instanceMap[name];
        } else {
            return false;
        }
    }

    function unregister(name) {

        instanceMap[name] = null;
    }

    function generateName() {

        uniqueCounter++;
        return 'ckeditor' + uniqueCounter;
    }

    function getData(name) {

        var ck = getInstance(name);
        if (ck) {
            return ck.getData();
        } else {
            return '';
        }
    }

    function setData(name, model) {

        var ck = getInstance(name);
        if (ck) {
            ck.setData(model);

            // ck.focus();
            // var selection = ck.getSelection();
            // if (selection) {
            //     var range = selection.getRanges()[0];
            //     var pCon = range.startContainer.getAscendant({p: 2}, true); //getAscendant('p',true);
            //     var newRange = new CKEDITOR.dom.range(range.document);
            //     newRange.moveToPosition(pCon, CKEDITOR.POSITION_BEFORE_START);
            //     newRange.select();
            // }
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

        var tmp = {};
        if (options) {
            tmp = {
                triggerKeyCode: !options.triggerKeyCode ? keyCode : options.triggerKeyCode,
                prefix: !options.prefix ? '${' : options.prefix,
                suffix: !options.suffix ? '}' : options.suffix,
                suggestions: options.suggestions
            };
            return tmp;
        } else {
            tmp = {
                triggerKeyCode: keyCode,
                prefix: '${',
                suffix: '}',
                suggestions: []
            };
            return tmp;
        }
    }

    return service;
}