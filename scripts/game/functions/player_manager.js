define(["game/functions/player", "game/functions/renderEngine", "collisionEngine","eventBus"], function(Player, renderEngine, collisionEngine,eventBus){
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
        var player = new Player(game,this.content.length,color,x,y);
        player.maxVel = 12;
        this.content.push(player);
        this.renderEngine.addElement("players", player);
        // collisionEngine.addElement(player, "players");
        var that = this;
        player.on("collisionEnter", that.collision, player);
        player.on("out of life", function(e) {
            var nbAlive = 0, lastAlive = e;
            for (var i = that.content.length - 1; i >= 0; i--) {
                if (that.content[i].life>0) {
            //for (var i = game.playersEngine.content.length - 1; i >= 0; i--) {
            //    if (game.playersEngine.content[i].life>0) {
                    nbAlive++;
                    lastAlive = that.content[i];
                }
            };
            if (nbAlive<=1) {
                eventBus.emit("gameOver",lastAlive.color);
            }
        });
    }
    PlayerEngine.prototype.collision = function(opponent, position){
        // if (opponent.reaction)
        //     opponent.reaction(this);
        // else
        //     console.log("COllision entre fittingOut et opponent failed");
    }
    PlayerEngine.prototype.calcul = function(dt){
        for (var i = this.content.length - 1; i >= 0; i--) {
            this.content[i].update(dt);
        };
    }
    return PlayerEngine;
});