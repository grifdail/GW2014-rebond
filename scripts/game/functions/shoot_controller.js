define([], function(){
    "use strict";
    
    return function(manager,freq) {
        var timer = 0;
        var fn = function(vx,vy) {
            if (timer<0) {
                timer = freq;
                var nx = this.pos.x+this.radius+Math.cos(this.rotation)*45-5;
                var ny = this.pos.y+this.radius+Math.sin(this.rotation)*45-5;
                manager.create(nx, ny, 10, this.rotation, 10, this.color,this.vel);
            }
            
        }
        fn.update = function() {
            timer--;
        }
        return fn;
    }
});