define(["libs/utils"], function (utils){
	var Renderer = function(){
	}
	Renderer.prototype.content = {};
	Renderer.prototype.canvas = {};
	Renderer.prototype.screenShakeStrength = 0;
	Renderer.prototype.screenShakeDuration = 0;
	Renderer.prototype.images = {};
	Renderer.prototype.sprites = {};
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
	Renderer.prototype.addSprite = function(name, image, config){
		config = utils.httpGetData(config);
		console.log(config);
		var target = {};
		for (var list in config){
			target[list] = {};
			for (var key in config[list])
				target[list][key] = config[list][key];
		}

		var object = {"image" : name, "animation" : target};
		if (!this.images[name])
			this.addImage(name, image);

		this.sprites[name] = object;
	}
	Renderer.prototype.getSprite = function(target, name){

	}
	// Renderer.prototype.addSprite = function(name, image, config){
	// 	target.currentFrame = 0;
	// 	if (!this.images[name])
	// 		this.addImage(name, image);
	// 	target.image = image;
	// 	target.imageWidth = this.images[image].width;
	// 	target.imageHeight = this.images[image].height;
	// 	target.animation = {};
	// 	for (var name in config){
	// 		target.animation[name] = {};
	// 		for (var element in config[name])
	// 			target.animation[name][key] = config[name][key];
	// 	}
	// }
	Renderer.prototype.sprite = function(){

	}
	Renderer.prototype.sprite.prototype.changeAnimation = function(animation){
		if (this.animation[animation]){
			this.currentFrame = 0;
			this.animationWidth = this
		}
		else
			console.warn("Attention, tentative de jouer l'animation " + animation + ". Innexistant sur l'objet");
	}

	Renderer.prototype.addCanvas = function(name, canvas){
		if (!this.canvas[name])
			this.canvas[name] = canvas;
		else
			console.warn("Le canvas name " + name + " existe déjà");
	}
	Renderer.prototype.addElement = function(group, target){
		if (!this.content[group]){
			console.warn("Attention, push dans un groupe innexistant !");
			return false;
		}
		this.content[group].elements.push(target);
	}
	Renderer.prototype.addImage = function(name, image){
		if (!this.images[name]){
			this.images[name] = new Image();
			this.images[name].src = image;
		}
	}
	Renderer.prototype.screenShake = function(timing, strength){
		this.screenShakeDuration = timing;
		this.screenShakeStrength = strength;
	};

	Renderer.prototype.getSprite = function(name) {
		var sprite = {};
		sprite.name=n;
		sprite.anim = 0;
		sprite.index = 0;
		sprite.config = //....;
		sprite.speed = speed;
		return sprite
	};

	Renderer.prototype.render = function(){

		for (var key in this.canvas){
			this.canvas[key].context.save();
			if (this.screenShakeDuration > 0){
				if (!vecX){
					var strength = Math.random() * 2 * this.screenShakeStrength - this.screenShakeStrength;
					var angle = Math.random() * Math.PI*2;
					var vecX = Math.cos(angle) * strength;
					var vecY = Math.sin(angle)  * strength;
					this.screenShakeDuration--;
				}
				this.canvas[key].context.translate(vecX, vecY);	
			}
			this.canvas[key].context.clearRect(0,0,this.canvas[key].width,this.canvas[key].width);
		}
		for (var key in this.content){
			for (var i = this.content[key].elements.length - 1; i >= 0; i--) {
				var target = this.content[key].elements[i];
				if (target.color) {
					this.content[key].context.fillStyle = target.color;
				}
				this.content[key].context.save();
				if (target.sprite){	//Si c'est une image
					var rotation = target.rotationAsVec ? Math.atan2(target.vel.y,target.vel.x) : target.rotation || 0;
					this.content[key].context.translate(target.pos.x + target.width*0.5, target.pos.y + target.height*0.5);
					this.content[key].context.rotate((rotation || 0) +Math.PI*0.5);
					var config = target.sprite.config;
					this.content[key].context.drawImage(
					                    this.images[target.sprite.image],
					                    target.sprite.index*config.width, 
										config.animation[target.sprite.anim].row*config.height,
					                    config.width, 
										config.height,
					                    -target.width*0.5, 
					                    -target.height*0.5, 
					                    target.width, 
					                    target.height
					);
				}
				else if (target.image){	//Si c'est une image
					var rotation = target.rotationAsVec ? Math.atan2(target.vel.y,target.vel.x) : target.rotation || 0;
					this.content[key].context.translate(target.pos.x + target.width*0.5, target.pos.y + target.height*0.5);
					this.content[key].context.rotate((rotation || 0) +Math.PI*0.5);
					this.content[key].context.drawImage(this.images[target.image], -target.width*0.5, -target.height*0.5, target.width, target.height);
				}
				else if (target.radius){		//Si c'est un cercle
					this.content[key].context.beginPath();
					this.content[key].context.arc(target.pos.x+target.radius, target.pos.y+target.radius, target.radius, 0, 2 * Math.PI);
					this.content[key].context.fill();
				}
				else{	//Sinon c'est un carre
					
					this.content[key].context.fillRect(target.pos.x, target.pos.y, target.width, target.height);
				}
				this.content[key].context.restore();
			};
			this.content[key].context.restore();	
		}
	}
	return Renderer;
});