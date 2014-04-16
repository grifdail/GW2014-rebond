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
    
        var border = {x: 0, y : 0, width : 1920, height : 1020, name : "border"}
        collisionEngine.addBox("border", border);
        collisionEngine.addGroup("players", ["bullets", "wall", "players", "fittingOut"], ["border"]);


    function Player(game,pad,color,x,y) {
        //basicObject.circle(this,0,0,null,null,32);
        basicObject.basic(this, x||0,y||0, 96, 96, null);
        this.spawn = {x:x||0,y:y||0};
        this.game = game;
        this.tag = "player";
        this.bumped = false;
        this.radius = 32;
        this.rotation = 0;
        this.color = color;
        this.rotationAsVec = true;
        this.life = 9;
        this.gamepadController = GamepadController(pad || 0,4);
        this.physicControler = PhysicControler(0.70);
        this.shoot = ShootController(game,20);

        this.sprite = game.renderEngine.getSprite("tank_"+color,"stay");

        this.canon = basicObject.basic({}, 0, 0, 96, 96, 32);
        this.canon.sprite = game.renderEngine.getSprite("tank_"+color,"canon");
        collisionEngine.addHitbox(this, "circle", 0,0,this.width, this.height);
        collisionEngine.addElement(this, "players");
        this.on("collisionEnter", player_collision, this);
        this.on("inboxOut", playerOutOfBound, this);

        this.on("die", function() {
            //D'apres une idée de Baptiste....
            //Louis et Julien nie toute responsabilité dans le code suivant !
            //Nous somme vraiment désolé...
            //J'espere que vous pourrez nous le pardonner.
            //L'idée etait trop stupide pour ne pas qu'on l'utilise.
            this.pos.x = NaN;
            this.pos.y = NaN;
            this.life--;
            if (this.life>0) {
                this.respawTime = 150;
            } else {
                game.emit("player out of life",this);
            }
            
            var that = this;
            
        });
    }

    Player.prototype.update = function() {
        this.respawTime--
        if (this.respawTime===0) {
            this.pos.x = this.spawn.x;
            this.pos.y = this.spawn.y;
        }
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
        this.canon.rotation = this.shoot.rotation;
    };
    return Player;
});