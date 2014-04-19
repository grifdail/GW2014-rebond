define(["libs/gamepad",""], function(){
    "use strict";

    var gamepad = new Gamepad();

    if (!gamepad.init()) {
        alert("Nope ! Pas pour toi ! Vas t'achetez un browser !")
    }
/*
'FACE_1', 'FACE_2', 'FACE_3', 'FACE_4',
        'LEFT_TOP_SHOULDER', 'RIGHT_TOP_SHOULDER', 'LEFT_BOTTOM_SHOULDER', 'RIGHT_BOTTOM_SHOULDER',
        'SELECT_BACK', 'START_FORWARD', 'LEFT_STICK', 'RIGHT_STICK',
        'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT',
        'HOME'
'LEFT_STICK_X', 'LEFT_STICK_Y', 'RIGHT_STICK_X', 'RIGHT_STICK_Y'
*/

    

    return gamepad;
    
});