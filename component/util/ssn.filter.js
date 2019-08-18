(function() {
    'use strict';

    angular
        .module('ods-lib')
        .filter('ssn', ssn);

    function ssn() {

        return ssnFilter;

        function ssnFilter(ssn) {
            if (!ssn) { return ''; }
            var value = ssn.toString().trim().replace(/^\+/, '');
            if (value.match(/[^0-9]/)) { return ssn; }
            var three = value.slice(0, 3);
            var six = value.slice(3);
            if (six) {
                if(six.length > 2) { six = six.slice(0, 2) + '-' + six.slice(2,6); }
                return (three + '-' + six).trim();
            } else {
                return three;
            }
        }
    }
})();
