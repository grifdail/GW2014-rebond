define([], function (){

    var Game = function Game (){
        this.states = {};
        this.state = "";

        this.instance = this;
    }

    Game.prototype.StartState = function (state){
        if(this.states[state] !== undefined){            
            this.state = state
            this.states[state]();
        }
    }

    var game = new Game();   

    return game.instance ;
});