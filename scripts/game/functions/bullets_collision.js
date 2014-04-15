define([], function (){

    function bulletCollision (other, collisionPoint){
        if(other.radius !== undefined){
            if(other.tag == "player"){
                bulletPlayerCollision.apply(this, arguments);
            }else{
                bulletbulletCollision.apply(this, arguments);
            }
        }else{
            bulletWallCollision.apply(this, arguments);
        }
    }

    function bulletWallCollision (wall, collisionPoint){
        if(collisionPoint.x === wall.pos.x || collisionPoint.x === wall.pos.x + wall.width){
            this.vel.x = -this.vel.x;
        }
        if(collisionPoint.y === wall.pos.y || collisionPoint.y === wall.pos.y + wall.height){
            this.vel.y = -this.vel.y;
        }
    }

    function bulletbulletCollision (bullet, collisionPoint){
        console.log("toto");
        var m2 = {
            x : bullet.pos.x + bullet.hitbox.offsetX,
            y : bullet.pos.y + bullet.hitbox.offsetY
        };
        var m1 = {
            x : this.pos.x + this.hitbox.offsetX,
            y : this.pos.y + this.hitbox.offsetY
        };
        var n = {
            x : (m2.x - m1.x)/(2*this.hitbox.radius),
            y : (m2.y - m1.y)/(2*this.hitbox.radius)
        };
        var g = {
            x : -n.y,
            y : n.x
        };
        var v1n = n.x*this.vel.x + n.y*this.vel.y;
        var v1g = g.x*this.vel.x + g.y*this.vel.y;
        var v2n = n.x*bullet.vel.x + n.y*bullet.vel.y;
        var v2g = g.x*bullet.vel.x + g.y*bullet.vel.y;

        this.vel.x = n.x*v2n + g.x*v1g;
        this.vel.y = n.y*v2n +  g.y*v1g;
        // console.log(m2, v2n, g.x, v1g);
    }

    function bulletPlayerCollision (player){

    }

    return bulletCollision;
})