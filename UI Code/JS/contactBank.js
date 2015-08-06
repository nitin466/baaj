
angular.module('falcon')
.controller('mainController', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  'falconService',
  function($scope, $rootScope, $http, $q, falconService) {

console.log("falcon js working");
console.log("Ctrl called");
 $rootScope.globalData = {};
 $rootScope.globalData.Idx = 0;

$scope.items = ['SUCCESS', 'FAILED'];
//console.log('Selected Status is', $scope.selectedStatus);

//function to be called on ng-change
$scope.updateStatus = function(id1, id2, id3) {
	alert(id2);
	console.log(id1, id2, id3);
	$scope.responseExist = false;
	console.log("update requestID", id1);
	itemToUpdate = {};
	itemToUpdate.requestProtocol = "PROTOCOL_JSON",
	itemToUpdate.responseProtocol = "PROTOCOL_JSON",
	itemToUpdate.requestID = id1,//data.requestID,
  itemToUpdate.suborderRequestID = id2,//data.suborderID,
  itemToUpdate.status = id3,
	console.log("itemToUpdate is", itemToUpdate);

	falconService.updateStatus(itemToUpdate).success(function(res) {
		$scope.responseExist = true;
		$scope.updateSuccess = true;
		console.log(res);
    $scope.getPendingRecords();
		//do sth
	}).error(function(err){
		$scope.responseExist = true;
		console.log(err)
		$scope.updateSuccess = false;
	})
};
		$scope.searchItem = {};
    $scope.getPendingRecords = function() {
      $scope.loading = true;
    	//$rootScope.globalData.Idx = 200000;
    	$scope.searchItem.requestProtocol = "PROTOCOL_JSON",
    	$scope.searchItem.responseProtocol = "PROTOCOL_JSON",
    	$scope.searchItem.startIndex = 200000,//$rootScope. globalData.Idx,
    	console.log("inputPayload is ", $scope.searchItem);
    	/*var inputPayload = {};
    	inputPayload.tickedID = '',
    	inputPayload.orderCode = '',
    	inputPayload.accNo = ' ',
    	inputPayload.subOrderCode = '',
    	inputPayload.URN = '',*/
    	//inputPayload.emailAddress  = '',
    	//inputPayload = angular.copy($scope.searchItem);
    	//console.log(inputPayload);
    	//inputPayload = $scope.searchItem;
      //inputPayload.attrName = $scope.selectedItem;
      //inputPayload.protocol = "PROTOCOL_JSON",
      //inputPayload.requestProtocol = "PROTOCOL_JSON",
      //inputPayload.responseProtocol = "PROTOCOL_JSON",
      //inputPayload.startDate = " ",
      //inputPayload.endDate = " ",
      //inputPayload.tickedID = $scope.searchItem.ticket,
     /* inputPayload.orderID = $scope.searchItem.order,
      inputPayload.urn = $scope.searchItem.urn,
      inputPayload.emailAddress = $scope.searchItem.email,*/
      
      //inputPayload.startIndex = 0,
      //inputPayload = $scope.searchItem,


      console.log("inputPayload is: ",$scope.searchItem);

      falconService.getPendingRecords($scope.searchItem).success(function(res) {
         console.log("data is", res);
         $scope.count = res.count;
        $scope.data = res.neftTransferDetailsSROList;
        $scope.searchItem.startIndex = res.nextVersion,
        console.log("data is", $scope.data);
        $rootScope.globalData.Idx = res.nextVersion;
        $scope.loading = false;
      }).error(function(err) {
        console.log("err is", err);
        $scope.loading = false;
      })
    }

    var init = function() {
    	//alert("init called");
      $scope.getPendingRecords();
    }

    init();

    $scope.getNext = function() {

      $scope.searchItem.startIndex = $rootScope.globalData.Idx;
      console.log($scope.searchItem.startIndex);
      console.log($scope.searchItem);

       falconService.getPendingRecords($scope.searchItem).success(function(res) {
         console.log("data is", res);
        $scope.data = res.neftTransferDetailsSROList;
        $scope.searchItem.startIndex = res.nextVersion,
        console.log("data is", $scope.data);
        $rootScope.globalData.Idx = res.nextVersion;
      }).error(function(err) {
        console.log("err is", err);
      })

    }



$scope.printDate = function() {

alert("Date");
console.log($scope.startDate);
}
$scope.filter = function() {

	$scope.getPendingRecords();
	console.log($scope.searchItem)
	//$scope.searchItem = "";
}
}]);
