angular.module('selectDemo')
    .controller('selectSingleEmptyController', function ($scope, ShopObj) {

        $scope.shopObjShort = ShopObj.get();

        $scope.shopObjShort.$promise.then(function(data) {
            $scope.bundle = {a:1}; //data[3];
        })
    });
