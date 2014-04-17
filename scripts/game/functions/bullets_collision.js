define(["game/functions/particleEngine"], function(ParticleEngine){

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
        if (wall.tag == "magneti"){
            var speed = (this.vel.x != 0) ? this.vel.x / Math.cos(Math.atan2(this.vel.y, this.vel.x)) : this.vel.y;
            var angleBullet = Math.atan2(this.vel.y, this.vel.x);
            angleBullet = (angleBullet < 0) ? (Math.PI + angleBullet) + Math.PI : angleBullet;
            var angleToGravity = Math.atan2(wall.pos.y - this.pos.y, wall.pos.x - this.pos.x);
            angleToGravity = (angleToGravity < 0) ? (Math.PI + angleToGravity) + Math.PI : angleToGravity;

            var difference = angleBullet - angleToGravity; 
            if (Math.abs(difference) > Math.PI){
                if (angleBullet < Math.PI)
                    difference = angleBullet - (Math.atan2(wall.pos.y - this.y, wall.pos.x - this.x));
                else
                    difference  =angleBullet - (angleToGravity+Math.PI*2);          
            }   
            var newDirection = angleBullet - (difference/20);

            this.vel.x = Math.cos(newDirection) * speed;
            this.vel.y = Math.sin(newDirection) * speed;
        }
        else if(collisionPoint.x === wall.pos.x || collisionPoint.x === wall.pos.x + wall.width){
            this.vel.x = -this.vel.x;
        }
        else if(collisionPoint.y === wall.pos.y || collisionPoint.y === wall.pos.y + wall.height){
            this.vel.y = -this.vel.y;
        }
        else{
            this.vel.y = -this.vel.y;
            this.vel.x = -this.vel.x;
            this.lifetime = -20;
        }
        if (this.color == "white"){
            this.color = this.parentColor;
            this.image = "bullet_"+this.color;
        }
    }

    function bulletbulletCollision (bullet, collisionPoint){
        var m2 = {
            x : bullet.pos.x + bullet.hitbox[0].offsetX,
            y : bullet.pos.y + bullet.hitbox[0].offsetY
        };
        var m1 = {
            x : this.pos.x + this.hitbox[0].offsetX,
            y : this.pos.y + this.hitbox[0].offsetY
        };
        
        var n = {
            x : (m2.x - m1.x)/(2*this.hitbox[0].radius),
            y : (m2.y - m1.y)/(2*this.hitbox[0].radius)
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
    }

    function bulletPlayerCollision (player){
        if ((this.color == player.color || this.color == "white") && this.hurtfull<0) {
            this.emit("die", player);
            player.emit("die", this);
        }
        else{
            var getParticleEngine = new ParticleEngine();
            getParticleEngine.evoli(this.pos.x + this.width/2, this.pos.y+this.height/2, player.color);

            this.image = "bullet_" + player.color;
            this.color = player.color;
            this.hurtfull = 3;

            var vitesseBullets = (this.vel.x != 0)  ? this.vel.x / Math.cos(Math.atan2(this.vel.y, this.vel.x)) : this.vel.y;

            var angle = Math.atan2( (this.pos.y + this.height/2) - (player.pos.y + player.height/2), 
                                    (this.pos.x + this.width/2) - (player.pos.x + player.width/2) );    
            this.vel.y = Math.sin(angle) * vitesseBullets;
            this.vel.x = Math.cos(angle) * vitesseBullets;
        }
    }

    return bulletCollision;
})