function Stock($scope, $http, $q, $interval) {

	var Stocks= require('alphavantage')({ key: config.stock.key });
	// request info on each stock, 1 at a time
	var getStockQuotes = function () {
		var promises = [];
		angular.forEach(config.stock.names, function (symbol ) {
			promises.push(Stocks.data.quote(symbol))
		});    
		return $q.all(promises)
	}
  
	var getStocks = function () {
		getStockQuotes().then(function (result) {
			var stock = [];
			if (result instanceof Array) {
				stock = stock.concat(result);
			} else {
				stock.push(result);
			}

			//A for loop to remove the % sign from the "10. change percent" so I can reduce it to 2 decimal point in the .html
			for(var v of stock){
				var x = v['Global Quote']['10. change percent'];
				x = x.substring(0,x.length-1);
				//console.log("x:", x);
				v['Global Quote']['10. change percent']=x;
			}

			//console.log("stock:", stock);
			
			$scope.stock = stock;
		}, function (error) {
			console.log(error);
		});
	}

	getStocks();

	// TODO: Add custom interval.
	//$interval(function name, delay in ms) --> [ms / 60,000 = min]
	//It appears that the "free" API key only provides up to 5 API calls per minute.

	$interval(getStocks, config.stock.refreshInterval * 60000)
	//console.log("Stock Refresh Interval:", config.stock.refreshInterval); //Just to check if the stock Refresh Interval actually works


}

angular.module('SmartMirror')
	.controller('Stock', Stock);