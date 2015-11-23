var app = angular.module('flapperNews',[]);

app.factory('posts',[function(){
	var o = {
		posts:[]
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
			upvotes:0
		});
		$scope.post.link = "";
		$scope.post.title = "";
	}

	$scope.incrementUpvote = function(post){
		post.upvotes += 1;
	}

}]);