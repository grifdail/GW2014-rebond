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
    });

    function getMousePos (e) {
        var mouseX, mouseY;
        var factorX = 1/(window.mainCanvas.clientWidth/window.mainCanvas.width);
        var factorY = 1/(window.mainCanvas.clientHeight/window.mainCanvas.height);
        if(e.offsetX) {
            mouseX = e.offsetX*factorX;
            mouseY = e.offsetY*factorY;
        }
        else if(e.layerX) {
            mouseX = e.layerX*factorX;
            mouseY = e.layerY*factorY;
        }
        console.log(factorX)
        return {x:mouseX || 0,y:mouseY || 0}
        
    };

    var mouse = {x:0,y:0};

    function GamepadController (id,speed) {
        console.log("aajajajaja",window.mainCanvas)
        window.mainCanvas.addEventListener("mousemove",function (e) {
            console.log("hehe")
            mouse = getMousePos(e);
        });

        window.mainCanvas.addEventListener("mousedown",function (e) {
            keyboardGamepad.RIGHT_BOTTOM_SHOULDER = 1;
        });

        window.mainCanvas.addEventListener("mouseup",function (e) {
            keyboardGamepad.RIGHT_BOTTOM_SHOULDER = 0;
        });

        return function(dt) {
            var pad = keyboardGamepad;
            
            if (Math.abs(pad.LEFT_STICK_X)>0.3 || Math.abs(pad.LEFT_STICK_Y) >0.3) {
                this.vel.add({x:pad.LEFT_STICK_X*speed*dt,y:pad.LEFT_STICK_Y*speed*dt});
            }
            var dir = this.pos.to(mouse);
            this.shoot.rotation = Math.atan2(dir.y,dir.x);
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