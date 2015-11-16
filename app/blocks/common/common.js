(function() {	
'use strict';

	angular
		.module('blocks.common')
		.factory('common', common);
		
	function common() {
		var service = {
			randomize: randomize	
		};
		
		return service;
		
		function randomize(arr) {
			var currentIndex = arr.length, temporaryValue, randomIndex ;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {
			
				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
			
				// And swap it with the current element.
				temporaryValue = arr[currentIndex];
				arr[currentIndex] = arr[randomIndex];
				arr[randomIndex] = temporaryValue;
			}
			
			return arr;
		}
	}
})();