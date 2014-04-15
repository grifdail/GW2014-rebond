define(["game/functions/add_event_capabilities", 
        "game/functions/renderEngine", 
        "game/functions/basicObject", 
        "game/functions/bulletsEngine", 
        "game/functions/loadRessource",
        "game/functions/player_manager",
        "collisionEngine", 
        "game/functions/bullets_collision"], 
    function (addEventCapabilities, RenderEngine, basicObject, BulletsEngine, loadRessource, PlayerEngine, collisionEngine, bullet_collision){
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
            this.canvas[key].width = 1400;
            this.canvas[key].height = 1000;
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
        this.playersEngine.create(this,25,25,"red");
        this.playersEngine.create(this,1000,25,"blue");


        this.renderEngine.addCanvas("debug", this.canvas.debug);
        this.renderEngine.addGroup("test", "debug");
        var carre = {};
        var truc = {};
       // this.renderEngine.addSprite(truc, "tank");
       // this.renderEngine.addElement("test", carre);
        collisionEngine.addGroup("bullet", ["bullet", "wall"]);
        collisionEngine.addGroup("wall", ["bullet"]);
        this.boules = [];
        new Wall(0,0,60,1000);
        new Wall(0,0,1350,60);
        new Wall(0,950,1350,60);
        new Wall(1350,0,60,1000);
        for(var i = 0; i < 4; i++){
            this.boules.push(new Projectile(100 + Math.random()* 500, 200 + Math.random() * 500,Math.random() * 10,Math.random() * 10));
        }
    }


    var game = new Game();  
    loadRessource(game); 

    addEventCapabilities(game);
    window.pGame = game;

    var Projectile = function(x, y, velx, vely){
        this.id = Math.random() * 8000;
        basicObject.circle(this,x,y,null,null,16);
        this.radius = 32
        this.vel.add(new Vector(velx,vely));
        this.move = function(){
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }
        collisionEngine.addHitbox(this, "circle", null, null, 32, 32);
        collisionEngine.addElement(this, "bullet");
        this.on("collisionEnter", bullet_collision, this);
        game.renderEngine.addElement("test", this);
    }
    var Wall = function (x, y, width, height){
        basicObject.rect(this,x,y,width,height);
        collisionEngine.addHitbox(this, "rect");
        collisionEngine.addElement(this, "wall");
        game.renderEngine.addElement("test", this);
    }

    return game.instance;

});