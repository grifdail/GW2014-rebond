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
    Game.prototype.init = function(){
        this.canvas = {};
        this.canvas.background = document.createElement("canvas");
        this.canvas.background.context = this.canvas.background.getContext("2d");

        this.canvas.players = document.createElement("canvas");
        this.canvas.players.context = this.canvas.players.getContext("2d");

        this.canvas.bullets = document.createElement("canvas");
        this.canvas.bullets.context = this.canvas.bullets.getContext("2d");
        
        for (var key in this.canvas){
            this.canvas[key].width = 1920;
            this.canvas[key].height = 1080;
            this.canvas[key].setAttribute("class", "canvas");
        }
    }

    var game = new Game();   

    return game.instance;

});