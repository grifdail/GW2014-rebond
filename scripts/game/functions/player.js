define([
       "game/functions/basicObject",
       "game/functions/gamepad_controller",
       "game/functions/physic_controller"
       ], function(basicObject,GamepadController,PhysicControler) {
    "use strict";
    
    function Player() {
        basicObject.circle(this,0,0,null,null,32);
        this.radius = 32
        this.gamepadController = GamepadController(0);
        this.physicControler = PhysicControler(0.95);
    }

    Player.prototype.update = function() {
        this.physicControler();
        this.gamepadController();
      };

    return Player;
});