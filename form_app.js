var form_app = angular.module('form_app', []);

            form_app.controller('form_controller', function($scope, $http) {

                getData=()=>{
                $http.get('getProducts.php')
                .then(function (response) {
                    // Success callback
                    $scope.products = response.data.data; // Assuming your data structure has a 'data' property
                    
                })
                .catch(function (error) {
                    // Error callback
                    console.error('Error:', error);
                });}
                
                getData();

                $scope.onSubmit = function() {
                    var product = {
                        name: $scope.productname,
                        quantity: $scope.quantity,
                        price: $scope.price,
                        sold: $scope.sold
                    };
                    if (!product.name || !product.quantity || !product.price || !product.sold) {
                        $scope.warning = true;
                        $scope.success = false;
                    } else {
                        $scope.submitProduct(product);
                    }
                };

                $scope.resetError = function() {
                    $scope.warning = false;
                    $scope.success = false;
                };

                $scope.submitProduct = function(product) {
                    $.ajax({
                        url: 'submitProduct.php',
                        type: 'POST',
                        data: JSON.stringify(product),
                        contentType: "application/json",
                        success: function() {
                            $scope.$apply(function() {
                                $scope.warning = false;
                                $scope.success = true;
                                $scope.productname = '';
                                $scope.quantity = '';
                                $scope.price = '';
                                $scope.sold = '';
                            });
                            getData();
                        },
                        error: function(error) {
                            console.log(error.message);
                        }
                    });
                };
            });
