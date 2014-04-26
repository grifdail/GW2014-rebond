define(["game/functions/basicObject", "collisionEngine", "game/functions/renderEngine"], function (basicObject, collisionEngine, RenderEngine){
	var FittingOutEngine = function(){

	}
	FittingOutEngine.prototype.init = function(){
		collisionEngine.addGroup("fittingOut", null, null); 

		this.renderEngine = new RenderEngine();
		this.renderEngine.addGroup("fittingOut", "bullets");

		// this.create(400, 400, "bumper");
		this.create(0,0,"wall",1920, 100);
		this.create(0,0,"wall", 100, 1080);
		this.create(0,980, "wall",1920, 100);
		this.create(1820, 0, "wall", 100, 1080);
		this.create(482,257, "wall", 96, 96, "bloc_rebond");
		this.create(482,697, "wall", 96, 96, "bloc_rebond");
		this.create(1342,257, "wall", 96, 96, "bloc_rebond");
		this.create(1342,697, "wall", 96, 96, "bloc_rebond");
		//this.create(960, 540, "magneti", 128, 128, "bullet_red");

		// this.create(700, 700, "wall", 100, 100);

	}
	FittingOutEngine.prototype.gravity;
	FittingOutEngine.prototype.create = function(x, y, type, width, height, image){
		if (type == "bumper"){
			var bumper = {};
			bumper.radius = 20;
			// bumper.on("collisionEnter", function(opponent, pos){
			// 	console.log("Collision avec le fitting out");
			// },this);

			basicObject.circle(bumper, x, y, bumper.radius);
			collisionEngine.addElement(bumper);
			this.renderEngine.addElement("fittingOut", bumper);
		}
		else if (type == "wall"){
			var wall = {};
			basicObject.rect(wall, x, y, width, height);
			wall.color = "rgba(0,0,0,0)";
			var that = wall;
			// collisionEngine.addHitbox(wall, x, y, width, height);
			if (image)
				wall.image = image;
			collisionEngine.addElement(wall, "fittingOut");

			wall.reaction = function(target, collisionPoint, dir){
				if(collisionPoint){
					if(collisionPoint.x == this.pos.x){
						target.pos.x = this.pos.x - target.width;
			            target.vel.x = - target.vel.x * 2;
					}else if(collisionPoint.x == this.pos.x + this.width){
						target.pos.x = this.pos.x + this.width;
			            target.vel.x = -target.vel.x * 2;
					}else if(collisionPoint.y == this.pos.y){
						target.pos.y = this.pos.y - target.height;
			            target.vel.y = -target.vel.y * 2;
					}else if(collisionPoint.y == this.pos.y + this.height){
						target.pos.y = this.pos.y + target.height;
			            target.vel.y = -target.vel.y * 2;
					}else{
						target.vel.x = -target.vel.x;
						target.vel.y = -target.vel.y;
					}
				}
			}
			this.renderEngine.addElement("fittingOut", wall);
		}	
		else if (type == "magneti"){
			var magneti = {};
			magneti.sprite = this.renderEngine.getSprite("gravity", "clignote");
			basicObject.rect(magneti, x-width/2, y-width/2, width, height);
			magneti.color = "rgba(0,255,0,1)";
			magneti.tag = "magnetiAsset";
			collisionEngine.addElement(magneti, "fittingOut");


			// collisionEngine.addHitbox(magneti, x, y, width, height);

			magneti.range = {};
			basicObject.rect(magneti.range, x, y, 0, 0);
			magneti.range.tag = "magnetiRange"

			collisionEngine.addHitbox(magneti.range, "circle", 0, 0, width, height);
			magneti.range.hitbox[0].radius = 0;
			magneti.range.display = {};
			basicObject.circle(magneti.range.display, x, y, 100);
			magneti.range.display.pos = {};
			magneti.range.display.pos.x = x-500;
			magneti.range.display.pos.y = y-500;
			magneti.range.display.radius = 500;
			magneti.range.display.color = "rgba(0,0,0,0.3)";


			this.renderEngine.addElement("bullets", magneti.range.display);
			// magneti.hitbox[0].radius = 500;
			// magneti.hitbox[0].offsetX = x + width/2 - rayon/2
			collisionEngine.addElement(magneti.range, "fittingOut");
			magneti.range.reaction = function(){

			}

			magneti.reaction = function(target, collisionPoint){
				if(collisionPoint){
					if(collisionPoint.x == this.pos.x){
						target.pos.x = this.pos.x - target.width;
			            target.vel.x = - target.vel.x * 2;
					}else if(collisionPoint.x == this.pos.x + this.width){
						target.pos.x = this.pos.x + this.width;
			            target.vel.x = -target.vel.x * 2;
					}else if(collisionPoint.y == this.pos.y){
						target.pos.y = this.pos.y - target.height;
			            target.vel.y = -target.vel.y * 2;
					}else if(collisionPoint.y == this.pos.y + this.height){
						target.pos.y = this.pos.y + target.height;
			            target.vel.y = -target.vel.y * 2;
					}else{
						target.vel.x = -target.vel.x;
						target.vel.y = -target.vel.y;
					}
				}
			}
			this.renderEngine.addElement("fittingOut", magneti);
			magneti.maxSafeTime = 120;
			magneti.safeTime = 120;
			magneti.maxGravityDuration;
			magneti.gravityDuration = 300;
			magneti.gravityOk = false;
			magneti.status = "clignote";
			magneti.haveStart = false;
			magneti.negativeForRange = false;
			magneti.update = function(dt){
				this.safeTime -= dt;
				if (this.sprite.animation != "compte" && this.safeTime < 0 && !this.haveStart){
					this.sprite.changeAnimation("compte");
					this.haveStart = true;
					console.log("Je suis dans la premiere");
				}
				if (this.sprite.animation == "morceaux"){
					console.log("Hi");
					this.range.hitbox[0].radius += dt;
					this.range.display.radius += dt;
					this.range.display.x -= dt;
					this.range.display.y -= dt;

				}
			}

			this.gravity = magneti;
		}
		else
			console.warn("Attentio tentative d'ajout d'un type de fittingOut inexistant");
	}

	return FittingOutEngine;
});