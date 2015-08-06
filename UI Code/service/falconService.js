var falconService = angular.module('falconService', [])
.service('falconService', function () {
    alert("service called");
    this.square = function (a) { return a*a};

});