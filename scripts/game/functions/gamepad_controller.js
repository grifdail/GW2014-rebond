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
            }
        };
    };


    return GamepadController;
});