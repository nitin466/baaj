// declare a module
var myAppModule = angular.module('falcon', [ ]);

myAppModule.controller('MainCtrl', [
  '$scope',
  '$rootScope',
  '$filter',
  '$http',
  '$q',
  'orderAuctionService',
  function($scope, $rootScope, $filter, $http, $q, orderAuctionService) {

      $scope.startDate = '19/03/2015';
      $scope.endDate = '12/7/2015'

     $rootScope.globalData = {};
    $rootScope.globalData.Idx = 0;
    $scope.GlobalConstantsUrl = "http://10.10.102.66:1200/poms/admin/panel/";

    $scope.identifier = [ {
      'lookupCode' : 'supc',
      'description' : 'SUPC'
    }, {
      'lookupCode' : 'vendor_code',
      'description' : 'Vendor Code'
    }, {
      'lookupCode' : 'category_url',
      'description' : 'SubCategory'
    }, ];

    $scope.exceptionReasonList = [ 'sample reason1', 'sample reason2', 'sample reason3', 'sample reason4', 'sample reason5', 'sample reason6',

    ];

    $scope.getReasonList = function() {
      orderAuctionService.getReasons().success(function(res) {
        $scope.reasonList = res.exceptionReasonList;
      }).error(function(err) {
        console.log(err)
      })
    }

    var init = function() {
      $scope.getReasonList();
    }

    init()

    $scope.checkAll = function() {
      if ($scope.selectedAll) {
        $scope.selectedAll = true;
      } else {
        $scope.selectedAll = false;
      }
      angular.forEach($scope.items, function(item) {
        item.name = true;
      });

    };

    $scope.selected = {};

    $scope.selectCode = function() {
      if ($scope.selectedItem === 'category_url') {
        $scope.subCatExist = true;

        getListOfSubCategory();
      } else if ($scope.selectedItem === 'supc' || $scope.selectedItem === "vendor_code" || $scope.selectedItem === undefined) {

        $scope.subCatExist = false;
      } else {
        $scope.subCatExist = false;
      }
    }

    var getListOfSubCategory = function() {
      orderAuctionService.getSubCatList().success(function(res) {
        $scope.subCatList = res.subCategoryList;
      }).error(function(err) {
        console.log(err);
      })
    }

    $scope.add = function() {
      $scope.addSuccess = undefined;
      $scope.resp = false;
      var dataToAdd = {};
      dataToAdd.attrName = $scope.selectedItem,
       dataToAdd.attrValue = $scope.subCatVal,
       dataToAdd.exceptionReason = $scope.selectedReason,
       dataToAdd.responseProtocol = "PROTOCOL_JSON", 
       dataToAdd.requestProtocol = "PROTOCOL_JSON",

      orderAuctionService.addItem(dataToAdd).success(function(res) {

        $scope.resp = true;
        $scope.addSuccess = true;
        $scope.message = 'successfully Added';
      }).error(function(err) {
        console.log(err);
        $scope.resp = true;
        $scope.addSuccess = false;
        $scope.message = "Some error occured, please try again later."
      })
    }
    $scope.clearData = function() {
      $scope.selectedItem = '';
      $scope.subCatVal = '';
      $scope.selectedReason = '';
    }

    $scope.deleteItem = function() {
      $scope.resp = false;
      $scope.loading = true;
      var dataToDelete = {};
      dataToDelete.attrName = $scope.selectedItem;
      dataToDelete.attrValue = $scope.subCatVal, dataToDelete.responseProtocol = "PROTOCOL_JSON", dataToDelete.requestProtocol = "PROTOCOL_JSON",


      orderAuctionService.deleteItem(dataToDelete).success(function(res) {
        $scope.resp = true;
        $scope.delSuccess = true;
        
      }).error(function(err) {
        $scope.resp = true;
        $scope.delSuccess = false;
        console.log(err);
        $scope.success = true;
        // $scope.message = "Deleted successfully";
        $scope.message = "Some error occured, please try again later";
        $scope.loading = false;

      })
    }

    $scope.clearDeleteData = function() {
      $scope.selectedItem = '';
      $scope.subCatVal = '';

    }

    $scope.fileDownload = function() {
      var item = {};
      item.attrName = $scope.selectedItem, 
      item.responseProtocol = "PROTOCOL_JSON", 
      item.requestProtocol = "PROTOCOL_JSON",

      orderAuctionService.getFile(item).success(function(res) {
        $scope.downloadSuccess = true;
        $scope.fileName = res.filePath;
      }).error(function(err){
        console.log(err);
      })
    }

    // Get data for Auction

    $scope.getAuctionData = function() {

      //var stDate = (JSON.stringify($scope.startDate)).slice(1, 11)
      //var endDt = (JSON.stringify($scope.endDate)).slice(1, 11)
      var data = {};
       $rootScope. globalData.Idx = 0;
      data.attrName = $scope.selectedItem, 
      data.exceptionReason = $scope.selectedReason, 
      data.startIndex = $rootScope.globalData.Idx, 
      data.startDate = $scope.startDate,
        data.endDate = $scope.endDate, 
        data.responseProtocol = "PROTOCOL_JSON", 
        data.requestProtocol = "PROTOCOL_JSON", 

      orderAuctionService.getData(data).success(function(res) {
        // var res = orderAuctionService.getData(data);
        $scope.dataForAuction = {};
        $scope.dataForAuction = res;
        $scope.items = $scope.dataForAuction.orderAuctionDisplaySROList;
        $scope.successful = true;
        // $scope.items = res.list;
        $scope.categoryNames = res.orderAuctionDisplaySROList;

        $rootScope.globalData.Idx = $scope.dataForAuction.nextVersion;

      }).error(function(err) {
        console.log(err);
      })

    }

    $scope.getNextData = function() {
      var stDate = (JSON.stringify($scope.startDate)).slice(1, 11)
      var endDt = (JSON.stringify($scope.endDate)).slice(1, 11)
      var data = {};
      data.attrName = $scope.selectedItem,
       data.exceptionReason = $scope.selectedReason, 
       data.startIndex = 0,// $rootScope.
      data.startDate = stDate, 
      data.endDate = endDt, 
      data.responseProtocol = "PROTOCOL_JSON", 
      data.requestProtocol = "PROTOCOL_JSON", 

      orderAuctionService.getNext(data).success(function(res) {
      }).error(function(err) {
        console.log(err);
      })
    }

    $scope.selection = [];
    // toggle selection for a given employee by name
    $scope.toggleSelection = function toggleSelection(id) {
      var idx = $scope.selection.indexOf(id);

      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.selection.push(id);
      }

      $scope.sendForAuction = function() {
        $scope.resp = false
        $rootScope.globalData.Idx = 0;
        data = {};// '{"requestIDs":[2,19,20],"responseProtocol":"PROTOCOL_JSON","requestProtocol":"PROTOCOL_JSON"}'
        data.requestIDs = $scope.selection;
        data.responseProtocol = "PROTOCOL_JSON", 
        data.requestProtocol = "PROTOCOL_JSON",

        orderAuctionService.auction(data).success(function(res) {
          $scope.resp = true;
          $scope.auctionSuceess = true
          $scope.successful = false;
          $scope.message = res.message;

        }).error(function(err) {
          $scope.resp = true;
          $scope.auctionSuceess = false;
          console.log(err);
        })
      }

    };
    /*
     * var init = function() { $scope.getReasonList(); }
     */

    // Date picker code

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear : 'yy',
      startingDay : 1
    };

    $scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate' ];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events = [ {
      date : tomorrow,
      status : 'full'
    }, {
      date : afterTomorrow,
      status : 'partially'
    } ];

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };
  } ]);

// Services

myAppModule.service('orderAuctionService', [ '$http', function($http) {

  this.addItem = function(data) {
    var req = {
      method : 'POST',
      url : $scope.GlobalConstantsUrl + 'addOrderAuctionParameter',// GlobalConstants.sampleReviewApi.fetchProductLabels
      data : data,
    };

    return $http(req);
  };

  this.deleteItem = function(data) {

    var req = {
      method : 'POST',
      url : 'http://10.10.102.66:1200/poms/admin/panel/deleteOrderAuctionParameter',
      data : data,
    };
    return $http(req);
  };

  this.getData = function(data) {

    var req = {
      method : 'POST',
      url : 'http://10.10.102.66:1200/poms/admin/panel/manualAuction',
      data : data,

    };
    return $http(req);
   
  };

  // **Download file

  this.getFile = function(data) {

    var req = {
      method : 'POST',
      url : ' http://10.10.102.66:1200/poms/admin/panel/downloadOrderAuctionFile',
      data : data,
    };

    return $http(req);
  };

  // Get Reason lists

  this.getReasons = function() {

    var req = {
      method : 'POST',
      url : 'http://10.10.102.66:1200/poms/admin/panel/getExceptionReasonList',
      data : {
        "responseProtocol" : "PROTOCOL_JSON",
        "requestProtocol" : "PROTOCOL_JSON",
        "type" : "type"
      },
    };

    return $http(req);
  };

  this.auction = function(data) {

    var req = {
      method : 'POST',
      url : 'http://10.10.102.66:1200/poms/admin/panel/processManualEntries',
      data : data,
    };

    return $http(req);

  };

  this.getSubCatList = function() {
    var req = {
      method : 'POST',
      url : 'http://10.10.102.66:1200/poms/admin/panel/getSubCategories',
      data : {
        "responseProtocol" : "PROTOCOL_JSON",
        "requestProtocol" : "PROTOCOL_JSON",
        "type" : "type"
      },
    };

    return $http(req);
  };

  this.getNext = function(data) {

    var req = {
      method : 'POST',
      url : 'http://10.10.102.66:1200/poms/admin/panel/processManualEntries',
      data : data,
    };

    return $http(req);

  };

}]);


myAppModule.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'yy/mm/dd',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});



