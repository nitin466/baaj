
angular.module('falcon')
.controller('highRiskController', [
  '$scope',
  '$rootScope',
  '$http',
  '$q',
  'falconService',
  function($scope, $rootScope, $http, $q, falconService) {

console.log("falcon highrisk` working");
console.log("Ctrl called");
 $rootScope.globalData = {};
 $rootScope.globalData.Idx = 0;

$scope.items = ['SUCCESS', 'FAILED'];

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
    $scope.getHighRiskPendingRecords();
		//do sth
	}).error(function(err){
		$scope.responseExist = true;
		console.log(err)
		$scope.updateSuccess = false;
	})
};
		$scope.searchItem = {};
    $scope.getHighRiskPendingRecords = function() {
      $scope.loading = true;
    	$scope.searchItem.requestProtocol = "PROTOCOL_JSON",
    	$scope.searchItem.responseProtocol = "PROTOCOL_JSON",
    	$scope.searchItem.startIndex = 20000000000,//$rootScope. globalData.Idx,
    	console.log("inputPayload is ", $scope.searchItem);
    	
      console.log("inputPayload is: ",$scope.searchItem);

      falconService.getHighRiskPendiingList($scope.searchItem).success(function(res) {
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
      $scope.getHighRiskPendingRecords();
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

$scope.filter = function() {

	$scope.getPendingRecords();
	console.log($scope.searchItem)
	//$scope.searchItem = "";
}
}]);
