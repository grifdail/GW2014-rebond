define([], function(){

    function playerColision (other, collisionPoint){
        if(other.tag == "player"){
            playerPlayerColision.apply(this, arguments)
        }else if(other.tag == "bullet"){

        }else{
            other.reaction(this, collisionPoint);
        }
    }

    function playerPlayerColision (other, collisionPoint){
        var tmpvel = this.vel;
        if(!this.bumped){
            this.vel = other.vel;
            this.vel.x *= 2;
            this.vel.y *= 2;
            if (Math.abs(this.vel.x) > this.maxVel){
                var n = (this.vel.x > 0) ? 1 : -1;
                this.vel.x = this.maxVel * n;
            }
            if (this.vel.y > this.maxVel){
                var n = (this.vel.y > 0) ? 1 : -1;
                this.vel.y = this.maxVel * n;
            }

            this.bumped = true;
            this.game.renderEngine.screenShake(5, 15);
            var get = speedCircleCollision(this, other);
            if (get){
                get += 2;
                var direction = Math.atan2(other.pos.y - this.pos.y, other.pos.x - other.pos.y);
                other.pos.x -= Math.cos(direction) * get/2;
                other.pos.y -= Math.sin(direction) * get/2; 
                this.pos.x += Math.cos(direction) * get/2;
                this.pos.y += Math.sin(direction) * get/2; 
            }
        }
        if(!other.bumped){

            other.vel = tmpvel;
            other.vel.x *= 2;
            other.vel.y *= 2;
            other.bumped = true;

            if (Math.abs(other.vel.x) > other.maxVel){
                var n = (other.vel.x > 0) ? 1 : -1;
                other.vel.x = other.maxVel * n;
            }
            if (other.vel.y > other.maxVel){
                var n = (other.vel.y > 0) ? 1 : -1;
                other.vel.y = other.maxVel * n;
            }
        }
    }
    function speedCircleCollision (a,b){
        hitboxA = a.hitbox;
        hitboxB = b.hitbox;
        for (var i = a.hitbox.length - 1; i >= 0; i--) {
            hitboxA = a.hitbox[i];
            for (var i = b.hitbox.length - 1; i >= 0; i--) {
                hitboxB = b.hitbox[i];
                if (hitboxB.shape == "circle" && hitboxA.shape == "circle"){
                    var aRealX = a.pos.x + hitboxA.offsetX;
                    var aRealY = a.pos.y + hitboxA.offsetY;
                    var bRealX = b.pos.x + hitboxB.offsetX;
                    var bRealY = b.pos.y + hitboxB.offsetY;

                    var norme = Math.sqrt(Math.pow(bRealX - aRealX, 2) + Math.pow(bRealY - aRealY, 2));
                    var ecart = hitboxA.radius + hitboxB.radius;
                    if (norme < ecart)
                      return ecart - norme; //On renvoie de combien de pixel il sont l'un dans l'autre
              }
            };
        };
        return false;
    }

    return playerColision;
})