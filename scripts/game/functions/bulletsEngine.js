define(["game/functions/basicObject", "game/functions/renderEngine", "collisionEngine"], function (basicObject, renderEngine, CollisionEngine){

	var BulletsEngine = function(){
		this.content = [];
		this.radius = 10;
	}
	BulletsEngine.prototype.init = function(canvas){
		this.renderEngine = new renderEngine();
		this.renderEngine.addCanvas("bullets", canvas);
		this.renderEngine.addGroup("bullets", "bullets");
		CollisionEngine.addGroup("bullets", ["players"], null);
	}
	BulletsEngine.prototype.create = function(x, y, radius, direction, speed, color,vel){
		var bullet = {};
		basicObject.movableCircle(bullet, x, y, radius, direction, speed);
		bullet.vel.x+= vel ? vel.x : 0;
		bullet.vel.y+= vel ? vel.y : 0;
		bullet.color = color || "black";
		bullet.transformationTime = 10;	//10 frame avant que la bullet ne puisse reinteragir avec un joueur
		this.content.push(bullet);
		this.renderEngine.addElement("bullets", bullet);
		CollisionEngine.addHitbox(bullet, "circle", 0, 0, bullet.width, bullet.height);
		CollisionEngine.addElement(bullet, "bullets");
		var that = this;
		bullet.on("collisionEnter", that.test, bullet);
	}
	BulletsEngine.prototype.calcul = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
			this.content[i].transformationTime--;
			this.content[i].pos.add(this.content[i].vel);
 		};
	}
	BulletsEngine.prototype.test = function(opponent, position){
		if (this.transformationTime <= 0){
			this.color = opponent.color;
			this.transformationTime = 30;
		}
		// console.log("opponent : " + opponent + " postion : " + position);
	}
	return BulletsEngine;

	//ctx.translate(Math.random()*2*strengh-strengh,Math.random()*2*strengh-strengh)
});
