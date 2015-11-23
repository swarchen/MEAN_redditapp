var app = angular.module('flapperNews',['ui.router']);

app.factory('posts',[function(){
	var o = {
		posts:[{
			title:'Taiwan',
			link :'http://www.Taiwan.com',
			comments:[],
			upvotes:23
		}]
	};
	return o;
}]);


app.controller('MainCtrl', ['$scope','posts',function($scope,posts){

	
	$scope.posts = posts.posts;
	$scope.addPost = function(){
		if(!$scope.post.title || $scope.post.title === '') {return;}
		$scope.posts.push({
			title:$scope.post.title,
			link :$scope.post.link,
			upvotes:0,
			comments: [
		    	{author: 'Joe', body: 'Cool post!', upvotes: 0},
			    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
		    ]
		});
		$scope.post.link = "";
		$scope.post.title = "";
	}

	$scope.incrementUpvote = function(post){
		post.upvotes += 1;
	}

}]);

app.controller('PostsCtrl', ['$scope','$stateParams','posts', //順序很重要 = =
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];
		$scope.addComment = function(){
			if($scope.body === '') {return ;}
			$scope.post.comments.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = ""
		};

		$scope.incrementUpvote = function(comment){
			comment.upvotes += 1;
		}
	}

	
])


app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		
		$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: 'home.html',
			controller: 'MainCtrl'
		})
		.state('posts',{
			url:'/posts/:id',
			templateUrl:'posts.html',
			controller: 'PostsCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}
]);





