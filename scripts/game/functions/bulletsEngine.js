define(["game/functions/basicObject", "game/functions/renderEngine", "collisionEngine", 
        "game/functions/bullets_collision"], function (basicObject, renderEngine, CollisionEngine, bulletsCollision){

	var BulletsEngine = function(){
		this.content = [];
		this.radius = 10;
	}
	BulletsEngine.prototype.init = function(canvas){
		this.renderEngine = new renderEngine();
		this.renderEngine.addCanvas("bullets", canvas);
		this.renderEngine.addGroup("bullets", "bullets");
		CollisionEngine.addGroup("bullets", ["players", "fittingOut"], null);
	}
	BulletsEngine.prototype.create = function(x, y, radius, direction, speed, color,vel){
		var bullet = {};
		bullet.tag = "bullet";
		basicObject.image(bullet, "bullet_"+color, x, y, radius*2, radius*2)
		bullet.vel.x = Math.cos(direction)*speed
		bullet.vel.y = Math.sin(direction)*speed
		bullet.color = color || "black";
		bullet.transformationTime = 10;	//10 frame avant que la bullet ne puisse reinteragir avec un joueur
		this.content.push(bullet);
		this.renderEngine.addElement("bullets", bullet);
		CollisionEngine.addHitbox(bullet, "circle", 0, 0, bullet.width, bullet.height);
		CollisionEngine.addElement(bullet, "bullets");
		var that = this;
		bullet.on("collisionEnter", bulletsCollision, bullet);
	}
	BulletsEngine.prototype.calcul = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
			this.content[i].transformationTime--;
			this.content[i].pos.add(this.content[i].vel);
 		};
	}
	return BulletsEngine;

	//ctx.translate(Math.random()*2*strengh-strengh,Math.random()*2*strengh-strengh)
});
