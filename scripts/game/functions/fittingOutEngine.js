define(["game/functions/basicObject", "collisionEngine", "game/functions/renderEngine"], function (basicObject, collisionEngine, RenderEngine){
	var FittingOutEngine = function(){

	}
	FittingOutEngine.prototype.init = function(){
		collisionEngine.addGroup("fittingOut", null, null); 

		this.renderEngine = new RenderEngine();
		this.renderEngine.addGroup("fittingOut", "bullets");

		// this.create(400, 400, "bumper");
		this.create(0,0,"wall",1920, 50);
		this.create(0,0,"wall", 50, 1080);
		this.create(0,1030, "wall",1920, 50);
		this.create(1870, 0, "wall", 50, 1080);
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

			// wall.on("test", wall.collision, wall);

			wall.reaction = function(target){
				// var direction = Math.atan2(target.vel.y, target.vel.x);
				console.log("Hi"); 	
				if (target.pos.x - target.radius <= this.pos.x + this.width && target.pos.x + target.radius > this.pos.x + this.width || //Collision vers la gauche
					target.pos.x + target.radius >= this.pos.x && target.pos.x - target.radius < wall.pos.x)
					target.vel.x *= -1;
				else
					target.vel.y *= -1;
			}
			this.renderEngine.addElement("fittingOut", wall);
		}	
		else
			console.warn("Attentio tentative d'ajout d'un type de fittingOut inexistant");
	}

	return FittingOutEngine;
});