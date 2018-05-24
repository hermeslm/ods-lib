'use strict';

angular
    .module('ods-lib')
    .service('EventDataFactory', EventDataFactory);

EventDataFactory.$inject = [];

function EventDataFactory() {

    var observers = [];
    var data = {};

    var registerObserver = function (observer) {
        observers.push(observer);
    };

    var notifyObservers = function () {
        for (var index = 0; index < observers.length; ++index)
            observers[index].notify();
    };

    var setData = function (data) {
        this.data = data;
        notifyObservers();
    };

    var getData = function () {
        return this.data;
    };

    return {
        registerObserver: registerObserver,
        setData: setData,
        getData: getData
    };
}
