define(["libs/utils","eventBus"], function (utils,eventBus){
	var Renderer = function(){
		this.frameIndex = 0;
		var that = this;
		eventBus.on("screenShake",function(e) {
			that.screenShake(e.timing, e.strength)
		});
		eventBus.on("play explosion",function(e) {
			that.screenShake(10,10);
			that.drawOnce("floor","cratere",e.x,e.y,true)
		});

		this.bufferFloor = document.createElement("canvas");
		this.bufferFloor.context = this.bufferFloor.getContext("2d");
		this.bufferFloor.width = 1920;
		this.bufferFloor.height = 1080;

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
	Renderer.prototype.sprite = function(){

	}
	
	Renderer.prototype.drawOnce = function(key,img,x,y,center,rotation) {
		
		var img = this.images[img];
		var offsetX = 0;
		var offsetY = 0;
		if (center) {
			offsetX = img.width*0.5;
			offsetY = img.height*0.5;
		}
		this.content[key].context.save();
		this.content[key].context.drawImage(img, x-offsetX, y-offsetY);
		this.content[key].context.restore();
		
	};
	
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
	Renderer.prototype.removeElement = function(group, target){
		if (!this.content[group]){
			console.warn("Attention, push dans un groupe innexistant !");
			return false;
		}
		this.content[group].elements.splice(this.content[group].elements.indexOf(target),1);
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

	Renderer.prototype.getSprite = function(name,anim) {
		//console.log(this.sprites,this.sprites[name],name);
		var sprite = {};
		sprite.image=name;
		sprite.anim = anim || "idle";
		sprite.index = 0;
		sprite.config = this.sprites[name];
		sprite.changeAnimation = function(a) {
			if (sprite.anim !== a) {
				sprite.anim = a;
				sprite.index = 0;
			}
		}
		return sprite
	};

	Renderer.prototype.renderSprite = function(target,ctx,goal) {
		ctx.save()
		var rotation = target.rotationAsVec ? Math.atan2(target.vel.y,target.vel.x) : target.rotation || 0;
		ctx.translate(target.pos.x + target.width*0.5, target.pos.y + target.height*0.5);
		ctx.rotate((rotation || 0) +Math.PI*0.5);
		var config = target.sprite.config.animation[target.sprite.anim];
		ctx.drawImage(
			this.images[target.sprite.image],
			target.sprite.index*config.width,
			config.row*config.height,
			config.width,
			config.height,
			-target.width*0.5,
			-target.height*0.5,
			target.width,
			target.height
		);
		if (goal) {
			ctx.drawImage(
				this.images[goal],
				-20,
				-216,
				40,
				216
			);
		}
		if (!(this.frameIndex%config.fps)) {
			target.sprite.index++;
			if(target.sprite.index>=config.nbAnimation) {
				if (config.finish) {
					target.sprite.changeAnimation(config.finish);
				} else {
					target.sprite.index = 0;
				}
			}
		}
		ctx.restore();
	};

	Renderer.prototype.render = function(){
		this.frameIndex++;
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

			if (key == "bullets"){
				this.canvas[key].context.globalCompositeOperation = "destination-in";
				this.canvas[key].context.fillStyle = "rgba(255,0,0,0.6)";
				this.canvas[key].context.fillRect(0,0,this.canvas[key].width,this.canvas[key].width);

				this.canvas[key].context.globalCompositeOperation = "source-over";
			}
			else if (key == "players"){
				this.canvas[key].context.globalAlpha = 0.6;
				this.canvas[key].context.globalCompositeOperation = "source-in";
				this.canvas[key].context.fillStyle = "rgba(0,0,0,0.3)";
				this.canvas[key].context.fillRect(0,0,this.canvas[key].width,this.canvas[key].width);

				this.canvas[key].context.globalCompositeOperation = "source-over";
				this.canvas[key].context.globalAlpha = 1;
			}
			else if (key == "floor"){
				/*
				this.bufferFloor.context.clearRect(0,0,this.bufferFloor.width,this.bufferFloor.height);
				this.bufferFloor.context.drawImage(this.canvas[key],0,0);
				this.canvas[key].context.globalAlpha = 0.999;
				this.canvas[key].context.clearRect(0,0,this.bufferFloor.width,this.bufferFloor.height);
				this.bufferFloor.context.drawImage(this.bufferFloor,0,0);
				this.canvas[key].context.globalAlpha = 1;
				*/
				this.canvas[key].context.globalCompositeOperation = "destination-in";
				this.canvas[key].context.fillStyle = "rgba(255,0,0,0.99)";
				this.canvas[key].context.fillRect(0,0,this.canvas[key].width,this.canvas[key].width);

				this.canvas[key].context.globalCompositeOperation = "source-over";
				
				//this.canvas[key].context.globalAlpha = 1;
			}
			else{
				this.canvas[key].context.clearRect(0,0,this.canvas[key].width,this.canvas[key].width);
			}
			// this.canvas[key].context.globalAlpha = 1;

		}
		for (var key in this.content){
			for (var i = this.content[key].elements.length - 1; i >= 0; i--) {
				if (this.content[key].elements[i].invertDisplay)
					continue;
				var target = this.content[key].elements[i];
				if (!target.actife) {
					continue;
				}
				if (target.color) {
					this.content[key].context.fillStyle = target.color;
				}
				if (target.sprite){	//Si c'est une image
					this.renderSprite(target,this.content[key].context);
				}
				else if (target.image){	//Si c'est une image
					this.content[key].context.save();
					var rotation = target.rotationAsVec ? Math.atan2(target.vel.y,target.vel.x) : target.rotation || 0;
					this.content[key].context.translate(target.pos.x + target.width*0.5, target.pos.y + target.height*0.5);
					this.content[key].context.rotate((rotation || 0) +Math.PI*0.5);
					this.content[key].context.drawImage(this.images[target.image], -target.width*0.5, -target.height*0.5, target.width, target.height);
					this.content[key].context.restore();
				}
				else if (target.radius){		//Si c'est un cercle
					this.content[key].context.beginPath();
					this.content[key].context.arc(target.pos.x+target.radius, target.pos.y+target.radius, target.radius, 0, 2 * Math.PI);
					this.content[key].context.fill();
				}
				else{	//Sinon c'est un carre
					
					this.content[key].context.fillRect(target.pos.x, target.pos.y, target.width, target.height);
				}
				if (target.canon){	//Si c'est une image
					this.renderSprite(target.canon,this.content[key].context,"aim_"+target.color);
				}
			};
			this.content[key].context.restore();
		}
	}
	return Renderer;
});