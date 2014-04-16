define(["game/functions/gamepad"], function(gamepad){
    "use strict";
    

    var controleType = false;
    function GamepadController (id,speed) {
        var time = 0;
        if (controleType) {
            var shooting = false;
            return function() {
                if (gamepad.gamepads[id]) {
                    var pad = gamepad.gamepads[id].state;
                    this.vel.add({x:pad.LEFT_STICK_X*speed,y:pad.LEFT_STICK_Y*speed});
                    //Rotation du canon automatique ?
                    if (Math.abs(pad.RIGHT_STICK_X)>0.5 || Math.abs(pad.RIGHT_STICK_Y) >0.5) {
                        this.shoot.rotation = Math.atan2(pad.RIGHT_STICK_Y,pad.RIGHT_STICK_X);
                        if (!shooting) {
                            this.shoot(); 
                        }
                        shooting = true;
                    } else {
                        shooting = false;
                    }
                    if (pad.RIGHT_BOTTOM_SHOULDER || pad.LEFT_BOTTOM_SHOULDER){
                        //this.shoot();
                    }
                }
            }
        } else {
            return function() {
                time--;
                if (gamepad.gamepads[id]) {
                    var pad = gamepad.gamepads[id].state;
                    this.vel.add({x:pad.LEFT_STICK_X*speed,y:pad.LEFT_STICK_Y*speed});
                    //Rotation du canon automatique ?
                    if (Math.abs(pad.RIGHT_STICK_X)>0.5 || Math.abs(pad.RIGHT_STICK_Y) >0.5) {
                        this.shoot.rotation = Math.atan2(pad.RIGHT_STICK_Y,pad.RIGHT_STICK_X);
                        if (!shooting) {
                            //this.shoot(); 
                        }
                        shooting = true;
                    } else {
                        shooting = false;
                    }
                    if (time<0 && (pad.RIGHT_BOTTOM_SHOULDER || pad.LEFT_BOTTOM_SHOULDER || pad.RIGHT_TOP_SHOULDER || pad.LEFT_TOP_SHOULDER) ){
                        this.shoot();
                        time = 20;
                    }
                }
            }
        }
        
    }


    return GamepadController;
});