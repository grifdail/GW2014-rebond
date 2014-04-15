define(["game/functions/basicObject", "game/functions/renderEngine"], function (basicObject, renderEngine){

	var BulletsEngine = function(){
		this.content = [];
		this.radius = 10;
	}
	BulletsEngine.prototype.init = function(context){
		this.renderEngine = new renderEngine();
		this.renderEngine.addContext("bullets", context);
		this.renderEngine.addGroup("bullets", "bullets");
	}
	BulletsEngine.prototype.create = function(x, y, radius, direction, speed){
		var bullet = {};
		basicObject.movableCircle(bullet, x, y, radius, direction, speed);

		this.content.push(bullet);
		this.renderEngine.addElement("bullets", bullet);
	}
	BulletsEngine.prototype.calcul = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
			this.content[i].x += Math.cos(this.content[i].direction) * this.content[i].speed;
			this.content[i].y += Math.sin(this.content[i].direction) * this.content[i].speed;
 		};
	}
	return BulletsEngine;
});
