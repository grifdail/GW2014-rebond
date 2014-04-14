define(["libs/gamepad"], function(){
    "use strict";
    var gamepad = new Gamepad();
    console.log(gamepad);


    if (!gamepad.init()) {
        // Your browser does not support gamepads, get the latest Google Chrome or Firefox
    }

    function GamepadController(entity,id) {
        this.entity = entity;
        this.id = id || 0;
    }

    GamepadController.prototype.update = function(e) {
        if (gamepad.gamepad[this.id].) {

        }
    };


    return GamepadController;
});