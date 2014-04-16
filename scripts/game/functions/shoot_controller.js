define([], function(){
    "use strict";
    
    return function(game,freq) {
        var timer = 0;
        var fn = function(dt) {
            if (timer<0) {
                timer = freq;
                var nx = this.pos.x+this.radius+Math.cos(fn.rotation)*75-5;
                var ny = this.pos.y+this.radius+Math.sin(fn.rotation)*75-5;
                game.bulletsEngine.create(nx, ny, 20, fn.rotation, 20, this.color);
                this.canon.sprite.changeAnimation("shoot");
            }
        }

        fn.update = function(dt) {
            timer-=dt;
        }
        fn.rotation = 0;
        return fn;
    }
});