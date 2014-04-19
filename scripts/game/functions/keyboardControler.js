define([], function(){
    "use strict";
    
    var keyboardGamepad={RIGHT_STICK_Y:0,LEFT_STICK_Y:0,RIGHT_STICK_X:0,LEFT_STICK_X:0};

    window.addEventListener("keydown",function(e) {
        if (e.keyCode==38) {keyboardGamepad.RIGHT_STICK_Y        =-1;}
        if (e.keyCode==40) {keyboardGamepad.RIGHT_STICK_Y        =+1;}
        if (e.keyCode==37) {keyboardGamepad.RIGHT_STICK_X        =-1;}
        if (e.keyCode==39) {keyboardGamepad.RIGHT_STICK_X        =+1;}
        if (e.keyCode==90) {keyboardGamepad.LEFT_STICK_Y         =-1;}
        if (e.keyCode==83) {keyboardGamepad.LEFT_STICK_Y         =+1;}
        if (e.keyCode==81) {keyboardGamepad.LEFT_STICK_X         =-1;}
        if (e.keyCode==68) {keyboardGamepad.LEFT_STICK_X         =+1;}
        if (e.keyCode==13) {keyboardGamepad.START_FORWARD         =1;}
        if (e.keyCode==32) {keyboardGamepad.RIGHT_BOTTOM_SHOULDER =1;}
    });

    window.addEventListener("keyup",function(e) {
        if (e.keyCode==38) {keyboardGamepad.RIGHT_STICK_Y         =0;}
        if (e.keyCode==40) {keyboardGamepad.RIGHT_STICK_Y         =0;}
        if (e.keyCode==37) {keyboardGamepad.RIGHT_STICK_X         =0;}
        if (e.keyCode==39) {keyboardGamepad.RIGHT_STICK_X         =0;}
        if (e.keyCode==90) {keyboardGamepad.LEFT_STICK_Y          =0;}
        if (e.keyCode==83) {keyboardGamepad.LEFT_STICK_Y          =0;}
        if (e.keyCode==81) {keyboardGamepad.LEFT_STICK_X          =0;}
        if (e.keyCode==68) {keyboardGamepad.LEFT_STICK_X          =0;}
        if (e.keyCode==13) {keyboardGamepad.START_FORWARD         =0;}
        if (e.keyCode==32) {keyboardGamepad.RIGHT_BOTTOM_SHOULDER =0;}
        console.log(keyboardGamepad)
    });

    function GamepadController (id,speed) {
        return function(dt) {
            var pad = keyboardGamepad;
            console.log(pad);
            if (Math.abs(pad.LEFT_STICK_X)>0.3 || Math.abs(pad.LEFT_STICK_Y) >0.3) {
                this.vel.add({x:pad.LEFT_STICK_X*speed*dt,y:pad.LEFT_STICK_Y*speed*dt});
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

    return GamepadController;
});