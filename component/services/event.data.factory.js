'use strict';

angular
    .module('ods-lib')
    .service('EventDataFactory', EventDataFactory);

EventDataFactory.$inject = [];

function EventDataFactory() {

    var observersMap = {};
    var dataMap = {};

    var registerObserver = function (name, observer) {

        if (!Array.isArray(observersMap[name])) {
            observersMap[name] = [];
        }
        observersMap[name].push(observer);
    };

    var unRegisterObserver = function (name, observer, key) {

        if (Array.isArray(observersMap[name])) {
            var index = search(key, observer[key], observersMap[name]);
            observersMap[name].splice(index, 1);
        }
    };

    function search(key, value, list) {

        for (var i = 0; i < list.length; i++) {
            if (list[i][key] === value) {
                return i;
            }
        }
    }

    var notifyObservers = function (name) {

        for (var index = 0; index < observersMap[name].length; ++index)
            observersMap[name][index]["on" + name.replace(/^./, function (str) {
                return str.toUpperCase();
            })](dataMap[name]);
    };

    var setData = function (name, data) {

        dataMap[name] = data;
        notifyObservers(name);
    };

    var getData = function (name) {

        if (dataMap[name]) {
            return dataMap[name];
        } else {
            return null;
        }
    };

    return {

        registerObserver: registerObserver,
        unRegisterObserver: unRegisterObserver,
        setData: setData,
        getData: getData
    };
}
