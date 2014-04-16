define(["game/functions/renderEngine", "game/functions/basicObject"], function (renderEngine, basicObject){
	var ParticleEngine = function(canvas){
		this.content = [];
		this.canvas = canvas;
		this.renderer = new renderEngine();
	}
	ParticleEngine.prototype.init = function(){
		this.renderer.addGroup("particles", "particles");
	}
	ParticleEngine.prototype.addParticle = function(lifeTime, x, y, width, height, direction, speed, what, color){
		var particle = {};
		particle.lifeTime = lifeTime || 0;
		if (what == "circle"){
			basicObject.movableCircle(particle, x, y, width/2, direction, speed);
		}
		else if (what == "image"){
			basicObject.movableImage(particle, color, x, y, width, height,  direction, speed);
			particle.color = color;
		}
		else{
			basicObject.movableRect(particle, x, y, width, height, direction, speed);
			particle.color = color;
		}

		this.content.push(particle);
		this.renderer.addElement("particles", particle);
	}
	ParticleEngine.prototype.basicExplode = function(x, y){
		var index = this.content.length-1;
		this.addParticle(index, 30, x, y, 100, 100, 0,0,null);
	}
	ParticleEngine.prototype.choc = function(x, y){
		for (var i = 100; i > 0; i--) {
			var direction = Math.random() * Math.PI*2;
			var lifeTime = Math.random() * 10 + 10;
			var color = "rgba(200,100,0,1)";
			var speed = Math.random() * 5 + 10;
			this.addParticle(lifeTime, x, y, 4, 4, direction, speed,"rect", color);
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