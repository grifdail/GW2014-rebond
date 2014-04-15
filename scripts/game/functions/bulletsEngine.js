define(["game/functions/basicObject", "game/functions/renderEngine"], function (basicObject, renderEngine){

	var BulletsEngine = function(){
		this.content = [];
		this.radius = 10;
	}
	BulletsEngine.prototype.init = function(canvas){
		this.renderEngine = new renderEngine();
		this.renderEngine.addCanvas("bullets", canvas);
		this.renderEngine.addGroup("bullets", "bullets");
	}
	BulletsEngine.prototype.create = function(x, y, radius, direction, speed, color,vel){
		var bullet = {};
		basicObject.movableCircle(bullet, x, y, radius, direction, speed);
		bullet.vel.x+= vel ? vel.x : 0;
		bullet.vel.y+= vel ? vel.y : 0;
		bullet.color = color || "black";
		this.content.push(bullet);
		this.renderEngine.addElement("bullets", bullet);
	}
	BulletsEngine.prototype.calcul = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
			this.content[i].pos.add(this.content[i].vel);
 		};
	}
	return BulletsEngine;

	//ctx.translate(Math.random()*2*strengh-strengh,Math.random()*2*strengh-strengh)
});
