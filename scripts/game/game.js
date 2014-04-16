define(["game/functions/add_event_capabilities", 
        "game/functions/renderEngine", 
        "game/functions/basicObject", 
        "game/functions/bulletsEngine", 
        "game/functions/loadRessource",
        "game/functions/player_manager",
        "collisionEngine", 
        "game/functions/bullets_collision",
        "game/functions/fittingOutEngine", 
        "game/functions/startMenu"],
    function (addEventCapabilities, RenderEngine, basicObject, BulletsEngine, loadRessource, PlayerEngine, collisionEngine, bullet_collision, FittingOutEngine, Menu){
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
    Game.prototype.init = function(){
        this.frame = 0;
        this.canvas = {};
        this.canvas.background = document.createElement("canvas");
        this.canvas.players = document.createElement("canvas");
        this.canvas.debug = document.createElement("canvas");
        this.canvas.bullets = document.createElement("canvas");
        
        for (var key in this.canvas){
            this.canvas[key].context = this.canvas[key].getContext("2d");
            this.canvas[key].width = 1920;
            this.canvas[key].height = 1080;
            this.canvas[key].setAttribute("class", "canvas");
            document.body.appendChild(this.canvas[key]);
        }
        this.canvas.background.context.fillStyle = "rgba(220,220,220,1)";
        this.canvas.background.context.globalAlpha = 1;
        this.canvas.bullets.context.globalAlpha = 1;

        this.renderEngine = new RenderEngine();
        this.bulletsEngine = new BulletsEngine();
        this.playersEngine = new PlayerEngine();
        this.bulletsEngine.init(this.canvas.bullets);

        this.playersEngine.init(this.canvas.bullets);
        this.playersEngine.create(this,200,200,"yellow");
        this.playersEngine.create(this,1000,200,"green");
        this.playersEngine.create(this,1000,800,"red");
        this.playersEngine.create(this,200,800,"blue");

        this.renderEngine.addCanvas("debug", this.canvas.debug);
        this.renderEngine.addCanvas("background", this.canvas.background);

        // thid.renderEngine.addCanvas("bu")
        this.renderEngine.addGroup("test", "debug");

        this.renderEngine.addGroup("background", "background");
        var background = {};
        basicObject.rect(background, 0,0, 1920, 1080);
        background.image = "background";
        background.rotation = -Math.PI/2;
        this.renderEngine.addElement("background", background);
        var carre = {};
        var truc = {};

       // this.renderEngine.addSprite(truc, "tank");
       // this.renderEngine.addElement("test", carre);
        collisionEngine.addGroup("bullet", ["bullet", "wall", "fittingOut"]);
        collisionEngine.addGroup("wall", ["bullet"]);

        this.fittingOutEngine = new FittingOutEngine();
        this.fittingOutEngine.init(this.canvas.bullets);

        this.menu = new Menu(); 
        // this.menu.getStartMenu(game.canvas.debug);

        // this.startState("menu");
    }


    var game = new Game();  
    loadRessource(game); 

    addEventCapabilities(game);
    window.pGame = game;

    return game.instance;

});