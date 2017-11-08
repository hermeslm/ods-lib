'use strict';

angular
    .module('ods-lib')
    .factory('OdsCkeditor', OdsCkeditor);

function OdsCkeditor() {

    var uniqueCounter = (+new Date) % 10000;

    var keyCode = CKEDITOR.CTRL + 32;

    var service = {
        generateName: generateName,
        setOptions: setOptions,
        initOptions: initOptions
    };

    function generateName() {

        uniqueCounter++;
        return 'ckeditor' + uniqueCounter;
    }

    function setOptions(ck, options) {

        ck.execCommand('reloadOptions', initOptions(options));
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