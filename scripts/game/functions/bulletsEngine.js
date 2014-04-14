define(["game/functions/basicObject", "game/functions/renderEngine"], function (basicObject, renderEngine){

	var BulletsEngine = function(){
		this.content = [];
		this.radius = 10;
	}
	BulletsEngine.prototype.init = function(context){
		this.renderEngine = new renderEngine();
		this.renderEngine.addGroup("bullets", context);
	}
	BulletsEngine.prototype.create = function(x, y, direction){
		var bullet = {};
		basicObject.circle(bullet, x, y);
		this.renderEngine.addElement("bullets", bullet);
	}
	return BulletsEngine;
});
