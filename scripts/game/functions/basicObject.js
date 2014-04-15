define(["vector"], function (Vector){

	var BasicObject = function(){

	};

	BasicObject.prototype.basic = function(target, x, y, width, height, radius) {
		target.x = x || 0;
		target.y = y || 0;
		target.pos = new Vector(x,y);
		target.vel = new Vector(0,0);
		if (width || height) {
			target.width = width;
			target.height = height;
		} else if (radius) {
			target.width = 2*radius;
			target.height = 2*radius;
		}
		target.radius = radius;
		
	}

	BasicObject.prototype.rect = function(target, x, y, width, height){
		this.basic(target, x, y, width,height);
		target.shape = "rect";
		
	}
	BasicObject.prototype.circle = function(target, x, y, radius){
		this.basic(target, x, y, null,null, radius);
		target.shape = "circle";
	}

	BasicObject.prototype.movableCircle = function(target, x, y, radius, direction, speed){
		this.circle(target, x, y, radius);
		target.vel.x = Math.cos(direction)*speed || 0;
		target.vel.y = Math.sin(direction)*speed || 0;
		target.direction = direction || 0;
		target.speed = speed || 10;
	}

	return new BasicObject();
});
