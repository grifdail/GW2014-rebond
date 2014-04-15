define([
       "game/functions/basicObject",
       "game/functions/gamepad_controller",
       "game/functions/physic_controller",
       "game/functions/shoot_controller",
       ], function(basicObject,GamepadController,PhysicControler,ShootController) {
    "use strict";
    
    function Player(game,pad) {
        //basicObject.circle(this,0,0,null,null,32);
        basicObject.image(this, "tank1", 0,0, 64, 64, null);
        this.canon = {};
        basicObject.image(this.canon, "canon1", 0,0, 64, 64, null);
        this.radius = 32;
        this.rotation = 0;
        this.rotationAsVec = true;
        this.gamepadController = GamepadController(pad || 0);
        this.physicControler = PhysicControler(0.95);
        this.shoot = ShootController(game.bulletsEngine,20);
    }

    Player.prototype.update = function() {
        this.physicControler();
        this.gamepadController();
        this.shoot.update();
    };
    return Player;
});