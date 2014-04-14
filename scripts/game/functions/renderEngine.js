define([], function (){
	var Renderer = function(){
	}
	Renderer.prototype.content = {};
	Renderer.prototype.addGroup = function(name, context){
		if (!this.content[name]){
			this.content[name] = {};
			this.content[name].context = context;
			this.content[name].elements = [];
		}
	}
	Renderer.prototype.addElement = function(group, target){
		if (!this.content[group]){
			console.warn("Attention, push dans un gorupe innexistant !");
			return false;
		}

		if (target.x && target.y && (target.width && target.height || target.radius))
			this.content[group].elements.push(target);
		else
			console.warn("Attention, tentative d'ajout d'un element ne contenant pas tout les parametres nescessaire");
	}
	Renderer.prototype.render = function(){
		for (var key in this.content){
			for (var i = this.content[key].length - 1; i >= 0; i--) {
				var target = this.content[key][i];
				if (this.image)			//Si c'est une image
					this.content[key].context.drawImage(this.image, this.x, this.y, this.width, this.height);
				else if (this.radius) 	//Si c'est un cercle
					console.warn("Le moteur de gèere pas encore les cercles");
				else{
					if (target.color)
						this.content[key].context.fillStyle = target.color;

					this.content[key].context.drawRect(target.x, target.y, target.width, target.height);
				}

			};
		}	
	}
	return Renderer;
});