define(["game/functions/particleEngine"], function(ParticleEngine){
    "use strict";
    
    return function(game,freq) {
        var timer = 0;
        var fn = function(dt) {
            if (timer<0) {
                var getParticuleEngine = new ParticleEngine();
                timer = freq;
                var nx = this.pos.x+this.radius+Math.cos(fn.rotation)*75-5;
                var ny = this.pos.y+this.radius+Math.sin(fn.rotation)*75-5;
                game.bulletsEngine.create(nx, ny, 20, fn.rotation, 20, this.color);
                this.canon.sprite.changeAnimation("shoot");
                getParticuleEngine.douille(this.pos.x + this.width/2, this.pos.y + this.height/2, fn.rotation, this.width/2);
            }
        }

        fn.update = function(dt) {
            timer-=dt;
        }
        fn.rotation = 1;
        return fn;
    }
});