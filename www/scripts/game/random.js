define([], function() {

	var exports = {};

	exports.getRandom = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	exports.getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	return exports;

});