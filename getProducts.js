var products = angular.module('products', []);

products.controller('getProducts', function($scope, $http) {
    $http.get("getProducts.php").success(function(data) {
        console.log(data);
    });

    $scope.test = "test";

});