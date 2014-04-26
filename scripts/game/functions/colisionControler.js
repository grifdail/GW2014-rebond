define(["collisionEngine"], function(collisionEngine){
    "use strict";
    
    return function(type) {
        return function() {
            var walls = collisionEngine.getCollidersFor(type);
            for (var i = walls.length - 1; i >= 0; i--) {
                if (!walls[i] || !walls[i].actife || walls[i] == this) {
                    continue;
                }
                if (this.shape==="circle" && walls[i].shape==="circle") {
                    if (collisionEngine.circleCollision(this,this.hitbox[0],walls[i],walls[i].hitbox[0])) {
                        return walls[i];
                    }
                } else {
                    //console.log(walls[i].hitbox[0],"----");
                    if (collisionEngine.rectCollision(this,this.hitbox[0],walls[i],walls[i].hitbox[0])) {
                        return walls[i];
                    }
                }
            };
        }
    }


});