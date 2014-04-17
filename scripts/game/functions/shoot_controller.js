define(["eventBus"], function(eventBus){
    "use strict";
    
    return function(game,freq,speed) {
        var timer = 0;
        var fn = function(dt) {
            if (timer<0) {
                timer = freq;
                var nx = this.pos.x+this.radius+Math.cos(fn.rotation)*75-5;
                var ny = this.pos.y+this.radius+Math.sin(fn.rotation)*75-5;
                game.bulletsEngine.create(nx, ny, 20, fn.rotation, speed, this.color);
                this.canon.sprite.changeAnimation("shoot");
                eventBus.emit("play sound",{sound:"tir"});
                eventBus.emit("play particle douille", {
                    x:this.pos.x + this.width/2,
                    y:this.pos.y + this.height/2,
                    rotation:fn.rotation,
                    offset:this.width/2
                });
            }
        }

        fn.update = function(dt) {
            timer-=dt;
        }
        fn.rotation = 1;
        return fn;
    }
});