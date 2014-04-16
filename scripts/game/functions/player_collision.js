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
            this.bumped = true;
            this.game.renderEngine.screenShake(5, 15);
        }
        if(!other.bumped){
            other.vel = tmpvel;
            other.bumped = true;
        }
    }

    return playerColision;
})