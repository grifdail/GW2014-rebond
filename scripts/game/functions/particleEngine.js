define(["game/functions/renderEngine", "game/functions/basicObject"], function (renderEngine, basicObject){
	var ParticleEngine = function(canvas){
		this.content = [];
		this.canvas = canvas;
		this.renderer = new renderEngine();
	}
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
		for (var i = 1; i > 0; i--) {
			var direction = Math.random() * Math.PI*2;
			var lifeTime = Math.random() * 10 + 10;
			// var color = "rgba(200,100,0,1)";
			var color = "tank_green";
			var speed = Math.random() * 5 + 10;
			this.addParticle(lifeTime, x, y, 60, 60, direction, speed,"sprite", color, "drive");
		};
	}
	ParticleEngine.prototype.calcul = function(){
		for (var i = this.content.length - 1; i >= 0; i--) {
			console.log(this.content[i].sprite.config);
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