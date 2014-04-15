define([], function (){
	var Renderer = function(){
	}
	Renderer.prototype.content = {};
	Renderer.prototype.canvas = {};
	Renderer.prototype.screenShakeStrength = 0;
	Renderer.prototype.screenShakeDuration = 0;
	Renderer.prototype.addGroup = function(name, canvas){
		if (!this.content[name]){
			this.content[name] = {};
			if (this.canvas[canvas])
				this.content[name].context = this.canvas[canvas].context;
			else
				console.warn("Tentative dutilisation du canvas " + canvas + "non ajouté. Merci d'utiliser addCanvas");
			this.content[name].elements = [];
		}
	}
	Renderer.prototype.addCanvas = function(name, canvas){
		if (!this.canvas[name])
			this.canvas[name] = canvas;
		else
			console.warn("Le canvas name " + name + " existe déjà");
	}
	Renderer.prototype.addElement = function(group, target){
		if (!this.content[group]){
			console.warn("Attention, push dans un gorupe innexistant !");
			return false;
		}
		this.content[group].elements.push(target);
	}
	Renderer.prototype.screenShake = function(timing, strength){
		this.screenShakeDuration = timing;
		this.screenShakeStrength = strength;
	};
	Renderer.prototype.render = function(){
		for (var key in this.canvas){
			this.canvas[key].context.clearRect(0,0,1000,1000);
		}
		for (var key in this.content){
			for (var i = this.content[key].elements.length - 1; i >= 0; i--) {
				var target = this.content[key].elements[i];
				if (this.image)			//Si c'est une image
					this.content[key].context.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
				else if (target.radius){ 	//Si c'est un cercle
					this.content[key].context.beginPath();
					this.content[key].context.arc(target.pos.x+target.radius/2, target.pos.y+target.radius/2, target.radius, 0, 2 * Math.PI);
					this.content[key].context.fill();
				}
				else{	//Sinon c'est un carre
					if (target.color)
						this.content[key].context.fillStyle = target.color;
					this.content[key].context.fillRect(target.pos.x, target.pos.y, target.width, target.height);
				}

			};
		}	
	}
	return Renderer;
});