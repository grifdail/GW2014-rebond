define(["game/functions/renderEngine", "game/functions/basicObject", "eventBus"], function (renderEngine, basicObject, eventBus){
	var ParticleEngine = function(canvas,game){
		this.renderer = new renderEngine();
		var that = this;
		eventBus.on("play explosion", function(e) {
			that.choc(e.x,e.y);
		});
		eventBus.on("play collision particle", function(e) {
			that.reptincel(e.x,e.y);
		});
		eventBus.on("play collision player-bullet", function(e) {
			that.evoli(e.x,e.y,e.color);
		});
		eventBus.on("play particle douille", function(e) {
			that.douille(e.x,e.y,e.rotation,e.offset);
		});
		eventBus.on("play particle plume", function(e) {
			that.plume(e.x,e.y);
		});
	}
	ParticleEngine.prototype.content = [];
	ParticleEngine.prototype.canvas;
	ParticleEngine.prototype.init = function(){
		this.renderer.addGroup("particles", "particles");
	}
	ParticleEngine.prototype.addParticle = function(lifeTime, x, y, width, height, direction, speed, what, color, animation, rollback){
		var particle = {};
		if (what == "sprite"){
			basicObject.basic(particle, x, y, width, height);
			particle.sprite = this.renderer.getSprite(color, animation);
			particle.pos.x -= particle.sprite.config.animation[particle.sprite.anim].width*0.5;
			particle.pos.y -= particle.sprite.config.animation[particle.sprite.anim].height*0.5;
		}
		else if (what == "circle"){
			basicObject.movableCircle(particle, x, y, width/2, direction, speed);
			particle.color = color;
		}
		else if (what == "image"){
			basicObject.movableImage2(particle, color, x, y, width, height,  direction, speed);
			particle.color = color;
			particle.image = color;
			particle.rotation = direction;
		}
		else{
			basicObject.movableRect(particle, x, y, width, height, direction, speed);
			particle.color = color;
		}
		particle.lifeTime = lifeTime || 0;
		if (rollback)
		particle.rollback = rollback;
		this.content.push(particle);
		this.renderer.addElement("particles", particle);
		return particle;
	}
	ParticleEngine.prototype.clean = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
            var player = this.content[i];
            this.renderer.removeElement("particles", player);
            this.content.splice(i,1);
        };
	}

	ParticleEngine.prototype.basicExplode = function(x, y){
		var index = this.content.length-1;
		this.addParticle(index, 30, x, y, 100, 100, 0,0,null);
	}
	ParticleEngine.prototype.choc = function(x, y){
		this.addParticle(36, x, y, 256, 256, 0, 0, "sprite", "explosion", "l1");
		this.addParticle(36, x, y, 512, 512, 0, 0, "sprite", "shockwave", "l1");
	}
	ParticleEngine.prototype.reptincel = function(x, y){
		if (this.content.length > 500)
			return false;
		for (var i = 100; i > 0; i--) {
			var direction = Math.random() * Math.PI*2;
			var lifeTime = Math.random() * 2 + 4;
			var vert = (Math.random()*150)|0;
			var rouge = (Math.random()*100 + 155)|0;
			var color = "rgba("+rouge+","+vert+",0,0.7)";
			var speed = Math.random() * 10 + 10;
			this.addParticle(lifeTime, x, y, 4, 4, direction, speed,"circle", color);
		};
	} 
	ParticleEngine.prototype.evoli = function(x, y, color){
		for (var i = 100; i > 0; i--) {
			var direction = Math.random() * Math.PI*2;
			var lifeTime = Math.random() * 3 +2;
			var color = color;
			var speed = Math.random() * 10 + 10;
			this.addParticle(lifeTime, x, y, 4, 4, direction, speed,"circle", color);
		};
	}
	ParticleEngine.prototype.douille = function(x, y, rotate, offset){
		var rotateInvert = rotate+ (Math.random()*0.4 + Math.PI/2.4);
		var offsetX = Math.cos(rotateInvert) * offset;
		var offsetY = Math.sin(rotateInvert) * offset;
		var rollback = function(){
			this.rotation += (Math.random() * 2 - 1)*this.lifeTime*0.1; 
			this.vel.x *= 0.7;
			this.vel.y *= 0.7;
		}
		this.addParticle(20, x-10 + offsetX, y-10 + offsetY, 20, 20, rotateInvert, 35,"image", "douille", null, rollback);
	}

	ParticleEngine.prototype.plume = function(x, y){
		for (var i = 10; i > 0; i--) {
			var rollback = function(){
				this.rotation += this.axe || 2 ; 
				this.vel.x *= 0.7;
				this.vel.y *= 0.7;
			}
			var p = this.addParticle(20,x, y, 32, 32, Math.random()*Math.PI*2, 35,"image", "plume", null, rollback);
			p.axe = Math.random()*0.5-0.25;

		}
		
	}
	ParticleEngine.prototype.calcul = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
			this.content[i].lifeTime--;	
			if (this.content[i].rollback)
				this.content[i].rollback();
			this.content[i].pos.x += this.content[i].vel.x;
			this.content[i].pos.y += this.content[i].vel.y;
			if (this.content[i].lifeTime <= 0){
				this.renderer.removeElement("particles", this)
				this.content.splice(i,1);
			}
		};
	}

	return ParticleEngine;
});