define(["game/functions/add_event_capabilities", 
        "game/functions/renderEngine", 
        "game/functions/basicObject", 
        "game/functions/bulletsEngine", 
        "game/functions/player_manager",
        "collisionEngine", 
        "game/functions/bullets_collision",
        "game/functions/fittingOutEngine", 
        "game/functions/startMenu",
        "game/functions/particleEngine",
        "eventBus"],
    function (addEventCapabilities, 
              RenderEngine, 
              basicObject, 
              BulletsEngine, 
              PlayerEngine, 
              collisionEngine, 
              bullet_collision, 
              FittingOutEngine, 
              Menu, 
              ParticleEngine, 
              eventBus
              ){
    var Game = function Game (){
        this.states = {};
        this.state = "";
        this.gameObjects = {};

        this.instance = this;
        
    }

    Game.prototype.startState = function (state){
        if(this.states[state] !== undefined){
            console.log(state)       
            this.state = state;
            this.states[state]();
            if (state === "menu") {
                console.log("aaaaaaa");
                eventBus.emit("play music",{sound:"musicMenu"});
                console.log("bbbbbb");
            }
            if (state === "game") {
                eventBus.emit("play music",{sound:"musicGame"});
            }
        }
        //Bleu vert
    }

    Game.prototype.startGame = function (players){
        game.playersEngine.clean();
        game.particleEngine.clean();
        game.bulletsEngine.clean();
        game.renderEngine.clean();
        if(players[0])
            game.playersEngine.create(game,200,200,"blue");
        if(players[1])
            game.playersEngine.create(game,1500,200,"red");
        if(players[2])
            game.playersEngine.create(game,1500,800,"yellow");
        if(players[3])
            game.playersEngine.create(game,200,800,"green");
        game.backFront.image = Math.random() < 0.5 ? "background2_alternate" : "background2";
        game.startState("game");
    }
    Game.prototype.startGameNo = function(){
        this.startGame([true, true, true , true]);
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

    window.pGame = game;

    return game.instance;

});