define(["libs/gamepad"], function(){
    "use strict";

    var gamepad = new Gamepad();

    if (!gamepad.init()) {
        alert("Nope ! Pas pour toi ! Vas t'achetez un browser !")
    }

    return gamepad;
    
});