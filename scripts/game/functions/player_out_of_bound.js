define([], function(){

    function playerOutOfBound (box, direction){
        console.log("outOfBox");
        if(direction == "left"){
            this.pos.x = box.x;
            // this.pos.x -= this.vel.x * 1.5;
            // this.pos.y -= this.vel.y * 1.5;
            // this.vel.x = - this.vel.x * 0.5;
        }
        if(direction == "right"){
            this.pos.x = box.width + box.x - this.width;
            // this.pos.x -= this.vel.x * 1.5;
            // this.pos.y -= this.vel.y * 1.5;
            // this.vel.x = - this.vel.x * 0.5;
        }
        if(direction == "up"){
            this.pos.y = box.y;
            // this.vel.x = 0;
            // this.vel.y = 0;
            // this.pos.x -= this.vel.x * 1.5;
            // this.pos.y -= this.vel.y * 1.5;
        }
        if(direction == "down"){
            this.pos.y = box.height + box.y - this.height;
            // this.pos.x -= this.vel.x * 1.5;
            // this.pos.y -= this.vel.y * 1.5;
            // this.vel.y = -this.vel.y * 0.5;
        }
    }

    return playerOutOfBound;
})