define(["game/functions/gamepad"], function(gamepad){
    "use strict";
    

    var controleType = false;
    function GamepadController (id,speed) {
        return function(dt) {
            if (gamepad.gamepads[id]) {
                var pad = gamepad.gamepads[id].state;
                var xSquare = pad.LEFT_STICK_X
                var ySquare = pad.LEFT_STICK_Y
                var nx = xSquare * Math.sqrt(1 - 0.5*ySquare*ySquare)
                var ny = ySquare * Math.sqrt(1 - 0.5*xSquare*xSquare)

                if (Math.abs(nx)>0.3 || Math.abs(ny) >0.3) {
                    this.vel.add({x:nx*speed*dt,y:ny*speed*dt});
                }
                //Rotation du canon automatique ?
                if (Math.abs(pad.RIGHT_STICK_X)>0.5 || Math.abs(pad.RIGHT_STICK_Y) >0.5) {
                    this.shoot.rotation = Math.atan2(pad.RIGHT_STICK_Y,pad.RIGHT_STICK_X);
                }

                if (pad.RIGHT_BOTTOM_SHOULDER ||
                    pad.LEFT_BOTTOM_SHOULDER || 
                    pad.RIGHT_TOP_SHOULDER || 
                    pad.LEFT_TOP_SHOULDER
                ){
                    this.shoot();
                }
            }
        }
        
    }


    return GamepadController;
});