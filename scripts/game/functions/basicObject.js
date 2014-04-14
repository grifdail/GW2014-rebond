define([], function (){

	var BasicObject = function(){

	}
	BasicObject.prototype.position = function(target, x, y){
		target.x = x || 0;
		target.y = y || 0;
	}
	BasicObject.prototype.rect = function(target, x, y, width, height){
		target.width = width || 64;
		target.height = height || 64;
		target.shape = "rect";
		this.position(target, x, y);
	}
	BasicObject.prototype.circle = function(target, x, y, radius){
		this.position(target, x, y);
		target.radius = radius || 20;
		target.shape = "circle";
	} 
	return new BasicObject();
});
