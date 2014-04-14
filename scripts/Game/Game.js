define(["game/functions/gameLoop", "game/functions/menuLoop"], function (gameLoop, menuLoop){

    var Game = function Game (){
        this.states = {
            "game" : gameLoop,
            "menu" : menuLoop
        }
        this.state = "";

        this.instance = this;
    }

    Game.prototype.StartState = function (state){
        if(this.states[state] !== undefined){
            this.states[state]();
            this.state = state
        }
    }

    var game = new Game();   

    return game.instance ;
});