/**
 * Created by hermeslm on 3/19/17.
 */
var app = angular.module('example', ['ods-lib']);

app.controller('MainCtrl', function ($scope) {

    // var vm = this;

    $scope.address = {
        "id": 951,
        "address": "1905 NW 82 ave",
        "address2": "",
        "city": "Doral",
        "zip": "33126",
        "phone": "1-(314)638-4688",
        "mobile": "1-(608)542-8230",
        "fax": "1-(414)538-9806",
        "email": "support@hcs.com",
        "notes": null,
        "state": {
            "id": 1,
            "code": "AK",
            "name": "Alaska",
            "country": {
                "id": 1,
                "code": "US",
                "name": "United State"
            }
        }
    };

    $scope.countries = [{
        "id": 1,
        "code": "US",
        "name": "United State"
    }, {
        "id": 2,
        "code": "CU",
        "name": "Cuba"
    }];

    $scope.states = [{
        "id": 1,
        "code": "AK",
        "name": "Alaska",
        "country": {
            "id": 1,
            "code": "US",
            "name": "United State"
        }
    }, {
        "id": 2,
        "code": "AL",
        "name": "Alabama",
        "country": {
            "id": 1,
            "code": "US",
            "name": "United State"
        }
    }, {
        "id": 3,
        "code": "AR",
        "name": "Arkansas",
        "country": {
            "id": 1,
            "code": "US",
            "name": "United State"
        }
    }, {
        "id": 4,
        "code": "SC",
        "name": "Santa Clara",
        "country": {
            "id": 2,
            "code": "CU",
            "name": "Cuba"
        }
    }];

});
