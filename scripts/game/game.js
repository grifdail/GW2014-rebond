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
    Game.prototype.init = function(){

        this.playersEngine.init(this.canvas.players);
        this.playersEngine.create(this,200,200,"yellow");
        this.playersEngine.create(this,1000,200,"green");
        this.playersEngine.create(this,1000,800,"red");
        this.playersEngine.create(this,200,800,"blue");

        this.renderEngine.addCanvas("debug", this.canvas.debug);
        this.renderEngine.addCanvas("background", this.canvas.background);
        this.renderEngine.addCanvas("players", this.canvas.players);
        this.renderEngine.addCanvas("particles", this.canvas.particle);

        // thid.renderEngine.addCanvas("bu")
        this.renderEngine.addGroup("test", "debug");

        this.renderEngine.addGroup("background", "background");
        addBackground(this.renderEngine,"background1");
        addBackground(this.renderEngine,"background2");
        this.back1 = addBackground(this.renderEngine,"background3");
        this.back2 = addBackground(this.renderEngine,"background3");
        
        this.back2.pos.x = this.back1.width;
        
        var carre = {};
        var truc = {};

       // this.renderEngine.addSprite(truc, "tank");
       // this.renderEngine.addElement("test", carre);
        collisionEngine.addGroup("bullet", ["bullet", "wall", "fittingOut"]);
        collisionEngine.addGroup("wall", ["bullet"]);

        this.fittingOutEngine = new FittingOutEngine();
        this.fittingOutEngine.init(this.canvas.bullets

        this.menu = new Menu(); 
        this.particleEngine = new ParticleEngine();
        this.particleEngine.init();
        // this.menu.getStartMenu(game.canvas.debug);

        // this.startState("menu");
    }

    function addBackground(render,file) {
        var background = {};
        basicObject.rect(background, 0,0, 1920, 1080);
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