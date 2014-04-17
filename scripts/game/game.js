define(["game/functions/add_event_capabilities", 
        "game/functions/renderEngine", 
        "game/functions/basicObject", 
        "game/functions/bulletsEngine", 
        "game/functions/loadRessource",
        "game/functions/player_manager",
        "collisionEngine", 
        "game/functions/bullets_collision",
        "game/functions/fittingOutEngine", 
        "game/functions/startMenu",
        "game/functions/particleEngine"],
    function (addEventCapabilities, RenderEngine, basicObject, BulletsEngine, loadRessource, PlayerEngine, collisionEngine, bullet_collision, FittingOutEngine, Menu, ParticleEngine){
    var Game = function Game (){
        this.states = {};
        this.state = "";
        this.gameObjects = {};

        this.instance = this;
    }

    Game.prototype.startState = function (state){
        if(this.states[state] !== undefined){            
            this.state = state;
            this.states[state]();
        }
    }

    Game.prototype.startGame = function (players){
        console.log(players);
        if(players[0])
            game.playersEngine.create(game,200,200,"blue");
        if(players[1])
            game.playersEngine.create(game,1000,200,"green");
        if(players[2])
            game.playersEngine.create(game,1000,800,"red");
        if(players[3])
            game.playersEngine.create(game,200,800,"yellow");
        game.startState("game");
    }

    Game.prototype.addBackground = function(render,file, x, y, width, height) {
        var background = {};
        basicObject.rect(background, x, y, width, height);
        background.image = file;
        background.rotation = -Math.PI/2;
        render.addElement("background", background);
        return background;
    }


    var game = new Game();  
    loadRessource(game); 

    addEventCapabilities(game);

    game.on("players death")



    window.pGame = game;

    return game.instance;

});