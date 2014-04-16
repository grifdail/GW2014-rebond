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
		this.create(700, 700, "wall", 100, 100);

	}
	FittingOutEngine.prototype.create = function(x, y, type, width, height){
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
			var that = wall;
			// collisionEngine.addHitbox(wall, x, y, width, height);
			collisionEngine.addElement(wall, "fittingOut");

			wall.reaction = function(target, collisionPoint){
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
		else
			console.warn("Attentio tentative d'ajout d'un type de fittingOut inexistant");
	}

	return FittingOutEngine;
});