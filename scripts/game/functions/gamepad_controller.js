define(["libs/gamepad"], function(){
    "use strict";
    var gamepad = new Gamepad();
    var pads = [{},{},{},{}];

    if (!gamepad.init()) {
        alert("Nope ! Pas pour toi ! Vas t'achetez un browser !")
    }

    function GamepadController (id) {
        return function() {
            if (gamepad.gamepads[id]) {
                var pad = gamepad.gamepads[id].state;
                this.vel.add({x:pad.LEFT_STICK_X,y:pad.LEFT_STICK_Y});
                //Rotation du canon automatique ?
                if (Math.abs(pad.RIGHT_STICK_X)>0.5 || Math.abs(pad.RIGHT_STICK_Y) >0.5) {
                    this.rotation = Math.atan2(pad.RIGHT_STICK_Y,pad.RIGHT_STICK_X)
                }
                if (pad.RIGHT_BOTTOM_SHOULDER || pad.LEFT_BOTTOM_SHOULDER){
                    this.shoot();
                }
            }
        };
    }


    return GamepadController;
});