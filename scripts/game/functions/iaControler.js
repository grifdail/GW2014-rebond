define(["vector"], function(Vector){
    "use strict";
    console.log("ddddddddd")
    return function(player,speed) {

        var wanderingPoint = new Vector(Math.random()*1700+100,Math.random()*800+100);
        var timershoot = 0;
        var rotation = Math.random()*2*Math.PI;
        return function(dt) { 
            timershoot-=dt;
            rotation += (Math.random()*2-1)*0.3
            //this.vel.add({x:Math.cos(rotation)*speed*dt,y:Math.sin(rotation)*speed*dt});

            if (player.actife) {
                var disPlayer = this.pos.to(player.pos);
                this.shoot.rotation = Math.atan2(disPlayer.y,disPlayer.x);
                this.vel.add({x:Math.cos(this.shoot.rotation)*speed*dt,y:Math.sin(this.shoot.rotation)*speed*dt});
                if (timershoot<=0) {
                    timershoot = 40+Math.random()*50;
                    this.shoot();
                }
            }
        };
    }

});