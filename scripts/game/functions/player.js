define([
       "game/functions/basicObject",
       "game/functions/gamepad_controller",
       "game/functions/physic_controller",
       "game/functions/shoot_controller",
       ], function(basicObject,GamepadController,PhysicControler,ShootController) {
    "use strict";
    
    function Player(game) {
        basicObject.circle(this,0,0,null,null,32);
        this.radius = 32;
        this.rotation = 0;
        this.gamepadController = GamepadController(0);
        this.physicControler = PhysicControler(0.8);
        this.shoot = ShootController(game.bulletsEngine,20);
    }

    Player.prototype.update = function() {
        this.physicControler();
        this.gamepadController();
        this.shoot.update();
    };

    return Player;
});