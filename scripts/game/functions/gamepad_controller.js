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
                this.rotation.rotate(/*angle*/);
                if (pad.RIGHT_BOTTOM_SHOULDER || pad.LEFT_BOTTOM_SHOULDER){
                    this.shoot();
                }
            }
        };
    }


    return GamepadController;
});