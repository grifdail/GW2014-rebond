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
			for (var i = this.content[key].elements.length - 1; i >= 0; i--) {
				var target = this.content[key].elements[i];
				if (this.image)			//Si c'est une image
					this.content[key].context.drawImage(this.image, this.x, this.y, this.width, this.height);
				else if (target.radius){ 	//Si c'est un cercle
					this.content[key].context.arc(target.x+target.radius/2, target.y+target.radius/2, target.radius, 0, 2 * Math.PI);
					this.content[key].context.fill();
				}
				else{	//Sinon c'est un carre
					if (target.color)
						this.content[key].context.fillStyle = target.color;
					this.content[key].context.fillRect(target.x, target.y, target.width, target.height);
				}

			};
		}	
	}
	return Renderer;
});