'use strict';

angular
    .module('ods-lib')
    .filter('DateFilter', DateFilter);

DateFilter.$inject = ['moment'];

function DateFilter(moment) {
    return function (input, momentFn /*, param1, param2, ...param n */) {
        var args = Array.prototype.slice.call(arguments, 2),
            momentObj = moment(input);
        return momentObj[momentFn].apply(momentObj, args);
    };
}
