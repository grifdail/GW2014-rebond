define(["game/functions/renderEngine", "game/functions/basicObject"], function (renderEngine, basicObject){
	var ParticleEngine = function(canvas){
		this.renderer = new renderEngine();
	}
	ParticleEngine.prototype.content = [];
	ParticleEngine.prototype.canvas;
	ParticleEngine.prototype.init = function(){
		this.renderer.addGroup("particles", "particles");
	}
	ParticleEngine.prototype.addParticle = function(lifeTime, x, y, width, height, direction, speed, what, color, animation){
		var particle = {};
		if (what == "sprite"){
			particle.sprite = this.renderer.getSprite(color, animation);
			particle.pos = {};
			particle.pos.x = x;
			particle.pos.y = y;
			particle.vel = {};
			particle.vel.x = 10;
			particle.vel.y = 10;
			// console.log(particle.sprite);
			// console.log(particle);
			// basicObject.movableRect(particle, x, y, width, height, direction, speed);
		}
		else if (what == "circle"){
			basicObject.movableCircle(particle, x, y, width/2, direction, speed);
			particle.color = color;
		}
		else if (what == "image"){
			basicObject.movableImage2(particle, color, x, y, width, height,  direction, speed);
			particle.color = color;
			particle.image = color;
		}
		else{
			basicObject.movableRect(particle, x, y, width, height, direction, speed);
			particle.color = color;
		}
		particle.lifeTime = lifeTime || 0;
		this.content.push(particle);
		this.renderer.addElement("particles", particle);
	}
	ParticleEngine.prototype.basicExplode = function(x, y){
		var index = this.content.length-1;
		this.addParticle(index, 30, x, y, 100, 100, 0,0,null);
	}
	ParticleEngine.prototype.choc = function(x, y){
		console.log("Hi");

		for (var i = 100; i > 0; i--) {
			var direction = Math.random() * Math.PI*2;
			var lifeTime = Math.random() * 10 + 10;
			// var color = "rgba(200,100,0,1)";
			var color = "bullet_green";
			var speed = Math.random() * 5 + 10;
			this.addParticle(lifeTime, x, y, 20, 20, direction, speed,"image", color, "drive");
		};
	}
	ParticleEngine.prototype.reptincel = function(x, y){
		for (var i = 300; i > 0; i--) {
			var direction = Math.random() * Math.PI*2;
			var lifeTime = Math.random() * 2 + 4;
			var vert = (Math.random()*150)|0;
			var rouge = (Math.random()*100 + 155)|0;
			var color = "rgba("+rouge+","+vert+",0,0.7)";
			var speed = Math.random() * 10 + 10;
			this.addParticle(lifeTime, x, y, 4, 3, direction, speed,"circle", color);
		};
	} 
	ParticleEngine.prototype.evoli = function(x, y, color){
		for (var i = 300; i > 0; i--) {
			var direction = Math.random() * Math.PI*2;
			var lifeTime = Math.random() * 3 +2;
			var color = color;
			var speed = Math.random() * 10 + 10;
			this.addParticle(lifeTime, x, y, 4, 3, direction, speed,"circle", color);
		};
	}
	ParticleEngine.prototype.calcul = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
			this.content[i].lifeTime--;	
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