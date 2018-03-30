// script.js
    // create the module and name it firstApp
    var firstApp = angular.module('firstApp', ['ngRoute','ui.bootstrap.modal']);

    // configure our routes
    firstApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the book page
            .when('/book', {
                templateUrl : 'pages/book.html',
                controller  : 'bookController'
            })

            // route for the category page
            .when('/category', {
                templateUrl : 'pages/category.html',
                controller  : 'categoryController'
            });
    });

    // create the controller and inject Angular's $scope
    firstApp.controller('mainController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    firstApp.controller('bookController', function($scope, $http) {
    	
	    $http.get("http://localhost:3000/books.json").then(function(response) {
	        $scope.jBooks = response.data;
	    });

	    $http.get("http://localhost:3000/categories.json").then(function(response) {
	        $scope.jCategories = response.data;
	    });

	    $scope.refresh = function(){
			$http.get("http://localhost:3000/books.json").then(function(response) {
		        $scope.jBooks = response.data;
		    });

		    $http.get("http://localhost:3000/categories.json").then(function(response) {
		        $scope.jCategories = response.data;
		    });
		}

	    $scope.popupAddBook = function() {
		    $scope.showModalpopupAddBook = true;
		};

		$scope.popupAddBook_save = function() {
	    	$scope.showModalpopupAddBook= false;
	    	var DataTask = {
	    					id_categories : $scope.id_category,
	    					name 		  : $scope.name,
	    					remark 		  : $scope.remark
	    				};
			$http.post('http://localhost:3000/books/create', DataTask).success(function(data){
				$scope.messages = 'Insert data success';
				$scope.refresh();
			}).error(function(data){
				alert(data.error);
			});

	  	};

	  	$scope.popupAddBook_close = function() {
	    	$scope.showModalpopupAddBook = false;
	  	};


	  	$scope.popupEditBook = function(id_book) {
		    $scope.showModalpopupEditBook = true;
		    $http.get("http://localhost:3000/books/"+id_book).then(function(response) {
		        $scope.jBooks_edit = {
		        					id 		  	  : response.data.id,
			    					id_category   : response.data.id_categories,
			    					name_category : response.data.category,
			    					name 		  : response.data.name,
			    					remark 		  : response.data.remark
		        					};
		    });

		    $http.get("http://localhost:3000/categories.json").then(function(response) {
		        $scope.jCategories_edit = response.data;
		    });
		};

		$scope.popupEditBook_save = function() {
	    	$scope.showModalpopupEditBook= false;
	    	var DataTask = {
	    					id 		  	  : $scope.jBooks_edit.id,
	    					id_categories : $scope.jBooks_edit.id_category,
	    					name 		  : $scope.jBooks_edit.name,
	    					remark 		  : $scope.jBooks_edit.remark
	    				};

			$http.post('http://localhost:3000/books/update/'+$scope.jBooks_edit.id, DataTask).success(function(data){
				$scope.messages = 'Update data success';
				$scope.refresh();
			}).error(function(data){
				alert(data.error);
			});

	  	};

		$scope.popupEditBook_close = function() {
	    	$scope.showModalpopupEditBook = false;
	  	};

	  	$scope.popupDeleteBook = function(id_book) {
		    $scope.showModalpopupDeleteBook = true;
		    $http.get("http://localhost:3000/books/"+id_book).then(function(response) {
		        $scope.jBooks_delete = {
		        					id 		  	  : response.data.id,
			    					id_category   : response.data.id_categories,
			    					name_category : response.data.category,
			    					name 		  : response.data.name,
			    					remark 		  : response.data.remark
		        					};
		    });
		};

		$scope.popupDeleteBook_action = function() {
	    	$scope.showModalpopupDeleteBook= false;
			$http.get('http://localhost:3000/books/delete/'+$scope.jBooks_delete.id).success(function(data){
				$scope.messages = 'Delete data success';
				$scope.refresh();
			}).error(function(data){
				alert(data.error);
			});

	  	};

		$scope.popupDeleteBook_close = function() {
	    	$scope.showModalpopupDeleteBook = false;
	  	};

	});


    firstApp.controller('categoryController', function($scope, $http) {

        $http.get("http://localhost:3000/categories.json").then(function(response) {
	        $scope.jCategories = response.data;
	    });

	    $scope.refresh_category = function(){
			
		    $http.get("http://localhost:3000/categories.json").then(function(response) {
		        $scope.jCategories = response.data;
		    });
		}

	    $scope.popupAddCategory = function() {
		    $scope.showModalpopupAddCategory = true;
		};

		$scope.popupAddCategory_save = function() {
	    	$scope.showModalpopupAddCategory= false;
	    	var DataTask = {
	    					name 		  : $scope.name
	    					};
			$http.post('http://localhost:3000/categories/create', DataTask).success(function(data){
				$scope.messages = 'Insert data success';
				$scope.refresh_category();
			}).error(function(data){
				alert(data.error);
			});

	  	};

	  	$scope.popupAddCategory_close = function() {
	    	$scope.showModalpopupAddCategory = false;
	  	};


	  	$scope.popupEditCategory = function(id_categories) {
		    $scope.showModalpopupEditCategory = true;
		    $http.get("http://localhost:3000/categories/"+id_categories).then(function(response) {
		        $scope.jCategories_edit = {
		        					id 		  	  : response.data.id,
			    					name 		  : response.data.name
		        					};
		    });
		};

		$scope.popupEditCategory_save = function() {
	    	$scope.showModalpopupEditCategory= false;
	    	var DataTask = {
	    					id 		  	  : $scope.jCategories_edit.id,
	    					name 		  : $scope.jCategories_edit.name
	    				};

			$http.post('http://localhost:3000/categories/update/'+$scope.jCategories_edit.id, DataTask).success(function(data){
				$scope.messages = 'Update data success';
				$scope.refresh_category();
			}).error(function(data){
				alert(data.error);
			});

	  	};

		$scope.popupEditCategory_close = function() {
	    	$scope.showModalpopupEditCategory = false;
	  	};

	  	$scope.popupDeleteCategory = function(id_categories) {
		    $scope.showModalpopupDeleteCategory = true;
		    $http.get("http://localhost:3000/categories/"+id_categories).then(function(response) {
		        $scope.jCategories_delete = {
		        					id 		  	  : response.data.id,
			    					name 		  : response.data.name
		        					};
		    });
		};

		$scope.popupDeleteCategory_action = function() {
	    	$scope.showModalpopupDeleteCategory= false;
			$http.get('http://localhost:3000/categories/delete/'+$scope.jCategories_delete.id).success(function(data){
				$scope.messages = 'Delete data success';
				$scope.refresh_category();
			}).error(function(data){
				alert(data.error);
			});

	  	};

		$scope.popupDeleteCategory_close = function() {
	    	$scope.showModalpopupDeleteCategory = false;
	  	};
    });
