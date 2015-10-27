var app = angular.module('meanReddit', ['ui.router', 'MainCtrl', 'posts', 'PostsCtrl']);

	app.config(function($stateProvider, $urlRouteProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/homeTmpl.html',
				controller: 'MainCtrl'
			});
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsCtrl'
			});

		$urlRouteProvider.otherwise('home');
	});

	app.factory('posts', function() {
		var o = {
			posts: []
		};
		return o;
	});

	app.controller('MainCtrl', function($scope, posts){
		$scope.posts = posts.posts;
		$scope.addPost = function(){
			if (!$scope.title || $scope.title === '') { return; }
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 0,
				comments: [
					{author: 'Joe', body: 'Cool post!', upvotes: 0},
					{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
					]
				});
			$scope.title = '';
			$scope.link = '';
		};
		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		};
	});

	app.controller('PostsCtrl', function($scope, $stateParams, posts) {
		$scope.post = posts.post[$stateParams.id];
		$scope.addComment = function() {
			if ($scope.body === '') { return; }
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = '';
		};
	});