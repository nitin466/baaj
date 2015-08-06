"use strict";

angular.module('falcon', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider.
      when('/', {
	templateUrl: 'view/contactYBL.html',
	controller: 'mainController'
      }).
      when('/failureRetry', {
	templateUrl: 'view/failureRetry.html',
	controller: 'failureRetryCtrl'
      }).
       when('/highRisk', {
	templateUrl: 'view/highRisk.html',
	controller: 'highRiskController'
      }).
      otherwise({
	redirectTo: '/'
      });
})


//Define Routing for app
//Uri /AddNewOrder -> template AddOrder.html and Controller AddOrderController
//Uri /ShowOrders -> template ShowOrders.html and Controller AddOrderController


	/*falcon.controller('failureRetryCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  'falconService',
  function($scope, $rootScope, $http, $q, falconService) {

console.log("falcon js working");
console.log("Ctrl called");

//Sending NEFT Failed Email/SMS, Update NEFT details, Try IMPS/NEFT.
$scope.items = ['Send Email/SMS', 'Update NEFT', 'Try IMPS/NEFT'];


$scope.data = [{
	"Ticekt ID": "xxxxxx",
	"Issue Category": "YYYY",
	"CCA": "111",
	"Order Details": "AAAAA",
	"Customer Details": {"name": "Nitin", "Email": "abc@xyz.com", "Address": "zzzzzzzzzzzzzzz"},
	"Bank Details": {"IFSC": "xxxx", "Account Number": "111111111", "Bank Name": "HDFC"},
	"Amount": 1000,
	"Mode": "AAAAA",
	"Time": "timestamp",
	"URN": "xxxx",
	"UTR": "zzzzz"
},
{
	"Ticekt ID": "xxxxxx",
	"Issue Category": "YYYY",
	"CCA": "111",
	"Order Details": "AAAAA",
	"Customer Details": {"name": "Nitin", "Email": "abc@xyz.com", "Address": "zzzzzzzzzzzzzzz"},
	"Bank Details": {"IFSC": "xxxx", "Account Number": "111111111", "Bank Name": "HDFC"},
	"Amount": 1000,
	"Mode": "AAAAA",
	"Time": "timestamp",
	"URN": "xxxx",
	"UTR": "zzzzz"
},
{
	"Ticekt ID": "xxxxxx",
	"Issue Category": "YYYY",
	"CCA": "111",
	"Order Details": "AAAAA",
	"Customer Details": {"name": "Nitin", "Email": "abc@xyz.com", "Address": "zzzzzzzzzzzzzzz"},
	"Bank Details": {"IFSC": "xxxx", "Account Number": "111111111", "Bank Name": "HDFC"},
	"Amount": 1000,
	"Mode": "AAAAA",
	"Time": "timestamp",
	"URN": "xxxx",
	"UTR": "zzzzz"
},
{
	"Ticekt ID": "xxxxxx",
	"Issue Category": "YYYY",
	"CCA": "111",
	"Order Details": "AAAAA",
	"Customer Details": {"name": "Nitin", "Email": "abc@xyz.com", "Address": "zzzzzzzzzzzzzzz"},
	"Bank Details": {"IFSC": "xxxx", "Account Number": "111111111", "Bank Name": "HDFC"},
	"Amount": 1000,
	"Mode": "AAAAA",
	"Time": "timestamp",
	"URN": "xxxx",
	"UTR": "zzzzz"
}];

}]);
*/



.directive('jqdatepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'yy/mm/dd',
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
})

.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick1 || "Are you sure?";
                    var clickAction = attr.ngConfirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])


.service('falconService', [ '$http', function($http) {
    console.log("service called");
      // Get Data lists				

  this.getPendingRecords = function(data) {
  	//alert("hi");
  	console.log(data);
  	//return data;

    var req = {
      method : 'POST',
      url : ' http://10.10.102.182:1200/poms/admin/panel/displayPendingRecords',
      data : data,
    };

    return $http(req);
  };


  this.updateStatus = function(data) {
  	console.log(data);

  	var req = {
  		method : 'POST',
  		url : 'http://10.10.102.182:1200/poms/admin/panel/processPendingEntries',
  		data : data,
  	};

  	return $http(req);
  };

  this.getFailedRecords = function(data) {
  	console.log(data);

  	var req = {
  		method : 'POST',
  		url : 'http://10.10.102.182:1200/poms/admin/panel/displayFailedRecords',
  		data : data,
  	};

  	return $http(req);
  }
  //processNeftDetailsBank

  this.updateFailedStatus = function(data) {
  	console.log(data);

  	var req = {
  		method : 'POST',
  		url : 'http://10.10.102.182:1200/poms/admin/panel/processFailedEntries',
  		data : data,
  	};

  	return $http(req);
  };

  this.updateNeftDetail = function(data) {
  	console.log(data);

  	var req = {
  		method : 'POST',
  		url : 'http://10.10.102.182:1200/poms/admin/panel/processNeftDetailsBank',
  		data : data,
  	};

  	return $http(req);getPendingRecords
  };

    this.getHighRiskPendiingList = function(data) {
  	console.log(data);

  	var req = {
  		method : 'POST',
  		url : 'http://10.10.102.182:1200/poms/admin/panel/displayHighRiskRecords',
  		data : data,
  	};

  	return $http(req);
  };


//High Risk page 

this.updateStatus = function(data) {
  	console.log(data);

  	var req = {
  		method : 'POST',
  		url : 'http://10.10.102.182:1200/poms/admin/panel/processHighRiskRecords',
  		data : data,
  	};

  	return $http(req);
  };

}]);
