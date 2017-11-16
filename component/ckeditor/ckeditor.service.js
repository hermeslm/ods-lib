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
        isReady: isReady,
        generateName: generateName,
        setOptions: setOptions,
        setReadOnly: setReadOnly,
        initOptions: initOptions
    };

    function register(name, instance) {

        var tmpInstance = {
            ready: true,
            instance: instance
        }
        instance_map[name] = tmpInstance;
    }

    function getInstance(name) {

        return instance_map[name].instance;
    }

    function unregister(name) {

        instance_map[name] = null;
    }

    function isReady(name) {

        if(instance_map[name] && instance_map[name].ready) {
            return instance_map[name].ready;
        }else
            return false;
    }

    function generateName() {

        uniqueCounter++;
        return 'ckeditor' + uniqueCounter;
    }

    function setOptions(name, options) {

        if(isReady(name)) {
            var ck = getInstance(name);
            ck.execCommand('reloadOptions', initOptions(options));
        }
    }

    function setReadOnly(name, isReadOnly) {

        if(isReady(name)) {
            var ck = getInstance(name);
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