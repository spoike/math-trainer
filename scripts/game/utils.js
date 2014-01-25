define([], function() {
	
	var min = Math.min, 
	max = Math.max,
	pow = Math.pow,
	sqrt = Math.sqrt;
	
	Number.prototype.clamp = function(a, b) {
		return min(max(this, a), b);
	};
	
	Math.distance = function(x0, x1, y0, y1) {
		return sqrt(pow(x0-(x1+8), 2)+pow(y0-(y1+8), 2));
	};

});