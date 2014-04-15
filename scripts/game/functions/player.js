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
        this.shoot = ShootController(game,0);
        this.sprite = game.renderEngine.getSprite("tank","stay");
        this.canon = basicObject.basic({}, 0, 0, 64, 64, 32);
        this.canon.sprite = game.renderEngine.getSprite("tank","canon");
    }

    Player.prototype.update = function() {
        this.physicControler();
        this.gamepadController();
        this.shoot.update();
        if (this.vel.squarelength()>1) {
            this.sprite.changeAnimation("drive")
        } else {
            this.sprite.changeAnimation("stay")
        }
        this.canon.pos.x = this.pos.x
        this.canon.pos.y = this.pos.y
        this.canon.rotation = this.shoot.rotation
    };
    return Player;
});