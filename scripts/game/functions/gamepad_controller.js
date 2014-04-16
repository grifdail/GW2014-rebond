define(["game/functions/gamepad"], function(gamepad){
    "use strict";
    

    var controleType = false;
    function GamepadController (id,speed) {
        return function() {
            if (gamepad.gamepads[id]) {
                var pad = gamepad.gamepads[id].state;
                if (Math.abs(pad.LEFT_STICK_X)>0.3 || Math.abs(pad.LEFT_STICK_Y) >0.3) {
                    this.vel.add({x:pad.LEFT_STICK_X*speed,y:pad.LEFT_STICK_Y*speed});
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