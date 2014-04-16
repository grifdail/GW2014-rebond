define([], function(){
    "use strict";
    
    function PhysicControler(inertie) {
        var inertie= inertie || 1;
        return function(dt) {
            //this.pos.add(this.vel); //A delta timer !!!
            this.pos.x += this.vel.x*dt;
            this.pos.y += this.vel.y*dt;
            this.vel.scale(Math.pow(inertie,dt)); //Same Thing Here  !!!
        }
    }

    return PhysicControler
});