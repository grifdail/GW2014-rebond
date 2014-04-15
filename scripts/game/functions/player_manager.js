define(["game/functions/player", "game/functions/renderEngine"], function(Player, renderEngine){
    "use strict";
    
    var PlayerEngine = function(){
        this.content = [];
    }
    PlayerEngine.prototype.init = function(canvas){
        this.renderEngine = new renderEngine();
        this.renderEngine.addCanvas("players", canvas);
        this.renderEngine.addGroup("players", "players");
    }
    PlayerEngine.prototype.create = function(game,x, y,color){
        var player = new Player(game);
        player.pos.x = x;
        player.pos.y = y;
        player.color = color || "red";
        this.content.push(player);
        this.renderEngine.addElement("players", player);
    }
    PlayerEngine.prototype.calcul = function(){
        for (var i = this.content.length - 1; i >= 0; i--) {
            this.content[i].update();
        };
    }
    return PlayerEngine;
});