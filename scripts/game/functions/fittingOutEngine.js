define(["game/functions/basicObject", "collisionEngine", "game/functions/renderEngine"], function (basicObject, collisionEngine, RenderEngine){
	var FittingOutEngine = function(){

	}
	FittingOutEngine.prototype.init = function(){
		collisionEngine.addGroup("fittingOut", ["bullets"], null); 

		this.renderEngine = new RenderEngine();
		this.renderEngine.addGroup("fittingOut", "bullets");

		// this.create(400, 400, "bumper");
	}
	FittingOutEngine.prototype.create = function(x, y, type){
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
		else
			console.warn("Attentio tentative d'ajout d'un type de fittingOut inexistant");
	}

	return FittingOutEngine;
});