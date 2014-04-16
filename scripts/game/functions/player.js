define([
       "game/functions/basicObject",
       "game/functions/gamepad_controller",
       "game/functions/physic_controller",
       "game/functions/shoot_controller",
       "game/functions/player_collision",
       "game/functions/player_out_of_bound",
       "collisionEngine"
       ], function(basicObject,GamepadController,PhysicControler,ShootController, player_collision, playerOutOfBound, collisionEngine) {
    "use strict";
    
        var border = {x: 80, y : 80, width : 1760, height : 920, name : "border"}
        collisionEngine.addBox("border", border);
        collisionEngine.addGroup("players", ["bullets", "wall", "players", "fittingOut"], ["border"]);


    function Player(game,pad,color) {
        //basicObject.circle(this,0,0,null,null,32);
        basicObject.basic(this, 0,0, 96, 96, null);
        this.game = game;
        this.tag = "player";
        this.bumped = false;
        this.radius = 32;
        this.rotation = 0;
        this.color = color;
        this.rotationAsVec = true;
        this.gamepadController = GamepadController(pad || 0,4);
        this.physicControler = PhysicControler(0.70);
        this.shoot = ShootController(game,0);
        this.sprite = game.renderEngine.getSprite("tank_"+color,"stay");
        this.canon = basicObject.basic({}, 0, 0, 96, 96, 32);
        this.canon.sprite = game.renderEngine.getSprite("tank_"+color,"canon");
        collisionEngine.addElement(this, "players");
        this.on("collisionEnter", player_collision, this);
        this.on("inboxOut", playerOutOfBound, this);
    }

    Player.prototype.update = function() {
        this.bumped = false;
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