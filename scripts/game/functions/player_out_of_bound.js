define([], function(){

    function playerOutOfBound (box, direction){
        console.log(box, direction)
        if(direction == "left"){
            this.pos.x -= this.vel.x * 1.5;
            this.pos.y -= this.vel.y * 1.5;
            this.vel.x = - this.vel.x * 0.5;
        }
        if(direction == "right"){

            this.pos.x -= this.vel.x * 1.5;
            this.pos.y -= this.vel.y * 1.5;
            this.vel.x = - this.vel.x * 0.5;
        }
        if(direction == "up"){

            this.pos.x -= this.vel.x * 1.5;
            this.pos.y -= this.vel.y * 1.5;
            this.vel.y = -this.vel.y * 0.5;
        }
        if(direction == "down"){

            this.pos.x -= this.vel.x * 1.5;
            this.pos.y -= this.vel.y * 1.5;
            this.vel.y = -this.vel.y * 0.5;
        }
    }

    return playerOutOfBound;
})