define([
       "game/functions/basicObject",
       "game/functions/gamepad_controller",
       "game/functions/physic_controller",
       "game/functions/shoot_controller",
       "game/functions/player_collision",
       "game/functions/player_out_of_bound",
       "collisionEngine",
       "eventBus",
       "game/functions/queryString",
       "game/functions/iaControler"
       ], function(basicObject,GamepadController,PhysicControler,ShootController, player_collision, playerOutOfBound, collisionEngine,eventBus,queryString,keyboardControler) {
    "use strict";
    
        var border = {x: 0, y : 0, width : 1920, height : 1020, name : "border"}
        collisionEngine.addBox("border", border);
        collisionEngine.addGroup("players", ["bullets", "wall", "players", "fittingOut"], ["border"]);


    function Player(game,pad,color,x,y,manager) {
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
        this.respawTime=-1;
        if (pad===1 && queryString.forceKeyboard) {
            this.gamepadController = keyboardControler(manager.content[0],4);
        } else {
            this.gamepadController = GamepadController(pad || 0,4);
        }
        this.physicControler = PhysicControler(0.70);
        this.shoot = ShootController(game,20,15);
        this.canDie = 0;

        this.sprite = game.renderEngine.getSprite("tank_"+color,"stay");

        this.canon = basicObject.basic({}, 0, 0, 96, 96, 32);
        this.canon.sprite = game.renderEngine.getSprite("tank_"+color,"canon");
        collisionEngine.addHitbox(this, "circle", 0,0,this.width, this.height);
        collisionEngine.addElement(this, "players");
        this.on("collisionEnter", player_collision, this);
        this.on("inboxOut", playerOutOfBound, this);

        this.on("die", function() {
            if (this.canDie>0) {
                return;
            }
            eventBus.emit("play explosion",{
                x:this.pos.x+this.width*0.5,
                y:this.pos.y+this.height*0.5
            });
             eventBus.emit("play death commentary");
            this.pos.x = this.spawn.x;
            this.pos.y = this.spawn.y;
            this.actife = false;
            this.life--;
            if (this.life>0) {
                this.respawTime = 150;
            } else {
                this.respawTime = NaN; //Ok this is bad !
                this.emit("out of life",this);  
            }
        
            
        });
    }

    Player.prototype.update = function(dt) {
        this.respawTime-=dt;
        this.canDie -= dt;
        if (this.respawTime<0) {
            if (this.actife) {
                if (this.canDie > 0 ){
                    if (this.canDie % 10 >= 5){
                        this.invertDisplay = true;
                    }
                    else 
                        this.invertDisplay = false;
                }
                this.bumped = false;
                this.physicControler(dt);
                this.gamepadController(dt);
                this.shoot.update(dt);
                if (this.vel.squarelength()>1) {
                    this.sprite.changeAnimation("drive")
                } else {
                    this.sprite.changeAnimation("stay")
                }
                this.canon.pos.x = this.pos.x
                this.canon.pos.y = this.pos.y
                this.canon.rotation = this.shoot.rotation;
            } else {
                this.actife = true;
                this.canDie = 60
                eventBus.emit("play particle plume",{x:this.pos.x+this.width*0.5,y:this.pos.y+this.height*0.5})
            }
        }
        
    };
    return Player;
});