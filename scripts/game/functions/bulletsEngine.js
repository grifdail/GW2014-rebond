define(["game/functions/basicObject",
       	"game/functions/renderEngine", 
       	"collisionEngine", 
        "game/functions/bullets_collision",
        "game/functions/colisionControler"
], function (
        basicObject, 
        renderEngine, 
        CollisionEngine, 
        bulletsCollision,
        collisionControler
){

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

	BulletsEngine.prototype.clean = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
            var player = this.content[i];
            this.renderEngine.removeElement("bullets", player);
            collisionEngine.removeElement(player,"bullets");
            this.content.splice(i,1);
        };
	}

	BulletsEngine.prototype.create = function(x, y, radius, direction, speed, color,vel){
		var bullet = {};
		bullet.tag = "bullet";
		basicObject.image(bullet, "bullet_white", x, y, radius*2, radius*2)
		bullet.vel.x = Math.cos(direction)*speed
		bullet.vel.y = Math.sin(direction)*speed
		bullet.color = "white";
		bullet.hurtfull = 3;
		bullet.parentColor = color;
		bullet.transformationTime = 10;	//10 frame avant que la bullet ne puisse reinteragir avec un joueur
		this.content.push(bullet);
		bullet.lifetime = 300;
		this.renderEngine.addElement("bullets", bullet);
		CollisionEngine.addHitbox(bullet, "circle", 0, 0, bullet.width, bullet.height);
		CollisionEngine.addElement(bullet, "bullets");
		bullet.hitbox[0].radius=10;
		bullet.isColiding = collisionControler("bullets");
		bullet.on("collisionEnter", bulletsCollision, bullet);
	}
	BulletsEngine.prototype.calcul = function(dt){
		for (var i = this.content.length - 1; i >= 0; i--) {
			var self = this.content[i];
			self.lifetime-=dt;
			self.hurtfull-=dt;
			if (self.lifetime<=0) {
				self.actife = false;
				this.renderEngine.removeElement("bullets", self);
				collisionEngine.group.bullets.content.splice(i, 1)
				this.content.splice(i,1);
 				continue;
			}
			self.transformationTime-=dt;
			self.pos.x += self.vel.x*dt;
			var col = self.isColiding();
			if (col) {
				self.pos.x -= self.vel.x*dt;
				self.emit("collisionEnter", col,null,"x");
				
			}
			self.pos.y += self.vel.y*dt;
			col = self.isColiding();
			if (col) {
				self.pos.y -= self.vel.y*dt;
				self.emit("collisionEnter", col,null,"y");
				
			}
 		};
	}
	return BulletsEngine;

	//ctx.translate(Math.random()*2*strengh-strengh,Math.random()*2*strengh-strengh)
});
