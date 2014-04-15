define([], function(){
    "use strict";
    
    function PhysicControler(inertie) {
        var inertie= inertie || 1;
        return function() {
            this.pos.add(this.vel); //A delta timer !!!
            this.vel.scale(inertie); //Same Thing Here  !!!
        }
    }

    return PhysicControler
});