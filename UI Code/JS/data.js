"use strict";

angular.module('falcon')
.controller('failureRetryCtrl', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  'falconService',
  function($scope, $rootScope, $http, $q, falconService) {
console.log("falcon js working");
console.log("Ctrl 2 called");

//Sending NEFT Failed Email/SMS, Update NEFT details, Try IMPS/NEFT.
$scope.items = [
		{
      'lookupCode' : 'CUSTOMER',
      'description' : 'Send Email/SMS'
    }, {
      'lookupCode' : 'update',
      'description' : 'Update NEFT'
    }, {
      'lookupCode' : 'RETRY',
      'description' : 'Try IMPS/NEFT'
    }];


$scope.update = function(id) {
	alert(id);
}

$scope.updateStatus = function(id, status) {

switch (status){ //start switch statement
    case "CUSTOMER": fn1(id); //this is the part that I can't get to work properly.
                 break
    case "update": fn2(id);
                  break
   case "RETRY": fn3(id);

    default:  alert("Sorry, please try again.")
              break 
 }

}

var itemToUpdate = {};
var updateFailedStatus = function(suborderRequestID, status) {
	alert("")





/*	console.log(suborderRequestID, status);
	$scope.responseExist = false;
	
	itemToUpdate.requestProtocol = "PROTOCOL_JSON",
	itemToUpdate.responseProtocol = "PROTOCOL_JSON",
  itemToUpdate.suborderRequestID = suborderRequestID,//data.suborderID,
  itemToUpdate.status = status,
	console.log("itemToUpdate is", itemToUpdate);

	falconService.updateFailedStatus(itemToUpdate).success(function(res) {
		$scope.responseExist = true;
		$scope.updateSuccess = true;
		console.log(res);
    //$scope.getFailedRecords();
		//do sth
	}).error(function(err){
		$scope.responseExist = true;
		console.log(err)
		$scope.updateSuccess = false;
	})*/
};

var fn1 = function(id) {
	alert("1");
}
var fn2 = function(id) {
	alert(id);
	$('#myModal').show();
	$('#myModal').addClass('in');

	var neftDetail = {};
$scope.updateNeft = function() {
	alert("updateNeft called");
	console.log($scope.form);
	neftDetail.suborderRequestID = id,
	neftDetail.beneficiaryName = $scope.form.name,
	neftDetail.accNo = $scope.form.accNo,
	neftDetail.ifscCode = $scope.form.ifsc,
	neftDetail.requestProtocol = "PROTOCOL_JSON",
  neftDetail.responseProtocol = "PROTOCOL_JSON",

	console.log(neftDetail);
	falconService.updateNeftDetail(neftDetail).success(function(res) {
		console.log(res);
	}).error(function(err) {
		console.log(err);
	})
}

}
var fn3 = function() {
	alert(id);
}



/*$scope.data = [{
	"Ticekt ID": "xxxxxx",
	"accountNumber": 1111111,
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
	"accountNumber": 1111111,
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
	"accountNumber": 1111111,
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
	"accountNumber": 1111111,
	"Customer Details": {"name": "Nitin", "Email": "abc@xyz.com", "Address": "zzzzzzzzzzzzzzz"},
	"Bank Details": {"IFSC": "xxxx", "Account Number": "111111111", "Bank Name": "HDFC"},
	"Amount": 1000,
	"Mode": "AAAAA",
	"Time": "timestamp",
	"URN": "xxxx",
	"UTR": "zzzzz"
}];
*/


$scope.searchItem = {};
    $scope.getFailedRecords = function() {
    	
    	$scope.searchItem.requestProtocol = "PROTOCOL_JSON",
    	$scope.searchItem.responseProtocol = "PROTOCOL_JSON",
    	$scope.searchItem.startIndex = 200000,

      console.log("inputPayload is: ",$scope.searchItem);



      //curl -v -X POST -HContent-Type:application/json --data-binary 
      //'{"startIndex":146,"responseProtocol":"PROTOCOL_JSON","requestProtocol":"PROTOCOL_JSON"}' http://localhost:1200/poms/admin/panel/displayFailedRecords


      falconService.getFailedRecords($scope.searchItem).success(function(res) {
         console.log("data is", res);
         $scope.count = res.count;
        $scope.data = res.neftTransferDetailsSROList;
        console.log("data is", $scope.data);
      }).error(function(err) {
        console.log("err is", err);
      })
    }

    $scope.save = function() {
    	alert("save called");
    }

    var init = function() {
    	//alert("init called");
      $scope.getFailedRecords();
    }

    init();

    }]);