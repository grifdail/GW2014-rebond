define(["game/functions/add_event_capabilities", 
        "game/functions/renderEngine", 
        "game/functions/basicObject", 
        "game/functions/bulletsEngine", 
        "game/functions/loadRessource"],
        "game/functions/player_manager"], 
    function (addEventCapabilities, RenderEngine, basicObject, bulletsEngine, loadRessource, PlayerEngine){
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
        this.canvas.bullets = document.createElement("canvas");
        this.canvas.debug = document.createElement("canvas");
        
        for (var key in this.canvas){
            this.canvas[key].context = this.canvas[key].getContext("2d");
            this.canvas[key].width = 960;
            this.canvas[key].height = 540;
            this.canvas[key].setAttribute("class", "canvas");
            document.body.appendChild(this.canvas[key]);
        }
        this.canvas.background.context.fillStyle = "rgba(220,220,220,1)";
        this.canvas.background.context.globalAlpha = 0.5;

        this.renderEngine = new RenderEngine();
        this.bulletsEngine = new BulletsEngine();
        this.playersEngine = new PlayerEngine();
        this.bulletsEngine.init(this.canvas.bullets);
        this.playersEngine.init(this.canvas.bullets);
        this.playersEngine.create(25,25,"red");


        this.renderEngine.addCanvas("debug", this.canvas.debug);
        this.renderEngine.addGroup("test", "debug");
        var carre = {};
        basicObject.rect(carre, 10, 5, 100, 50);
       // this.renderEngine.addElement("test", carre);
    }

    addEventCapabilities(Game);

    var game = new Game();  
    loadRessource(game); 

    window.pGame = game;

    return game.instance;

});