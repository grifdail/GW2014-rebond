define([], function(){
    "use strict";
    
    function PhysicControler(inertie) {
        var inertie= inertie || 1;
        return function(dt) {
            //this.pos.add(this.vel); //A delta timer !!!
            this.pos.x += this.vel.x*dt;
            var col = this.isColiding();
            if (col) {
                this.pos.x -= this.vel.x*dt;
                this.emit("collisionEnter", col,null,"x");
                
            }
            this.pos.y += this.vel.y*dt;
            col = this.isColiding();
            if (col) {
                this.pos.y -= this.vel.y*dt;
                this.emit("collisionEnter", col,null,"y");
                
            }
            this.vel.scale(Math.pow(inertie,dt)); //Same Thing Here  !!!
        }
    }

    return PhysicControler
});