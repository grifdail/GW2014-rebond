define(["game/functions/player", "game/functions/renderEngine", "collisionEngine"], function(Player, renderEngine, collisionEngine){
    "use strict";
    
    var PlayerEngine = function(){
        this.content = [];
    }
    PlayerEngine.prototype.init = function(canvas){
        this.renderEngine = new renderEngine();
        this.renderEngine.addCanvas("players", canvas);
        this.renderEngine.addGroup("players", "players");
        collisionEngine.addGroup("players", ["fittingOut"], null);
        window.collisionEngine = collisionEngine;
    }
    PlayerEngine.prototype.create = function(game,x, y,color){
        var player = new Player(game,this.content.length,color);
        player.pos.x = x;
        player.pos.y = y;
        this.content.push(player);
        this.renderEngine.addElement("players", player);
        collisionEngine.addHitbox(player, "circle", 0,0,player.width, player.height);
        collisionEngine.addElement(player, "players");
        var that = this;
        player.on("collisionEnter", that.collision, player);
    }
    PlayerEngine.prototype.collision = function(opponent, position){
        // if (opponent.reaction)
        //     opponent.reaction(this);
        // else
        //     console.log("COllision entre fittingOut et opponent failed");
    }
    PlayerEngine.prototype.calcul = function(){
        for (var i = this.content.length - 1; i >= 0; i--) {
            this.content[i].update();
        };
    }
    return PlayerEngine;
});