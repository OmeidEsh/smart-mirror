function Xkcd($scope, $http, SpeechService, Focus) {

	var min = 1;
	var max = 2151;

    // Show xkcd comic
	SpeechService.addCommand('image_comic', function () {

		var random = Math.floor((Math.random() * max) + min); 
		console.log("random #:", random);	

		$http.jsonp("http://dynamic.xkcd.com/api-0/jsonp/comic/" + random + "?callback=JSON_CALLBACK")
            .then(function (response) {
	$scope.xkcd = response.data.img;
	Focus.change("xkcd");
});
	});

}

angular.module('SmartMirror')
	.controller('Xkcd', Xkcd);
	

	//Sample URL with comic #142: http://dynamic.xkcd.com/api-0/jsonp/comic/142?callback=JSON_CALLBACK