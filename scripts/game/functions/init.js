define(["Game", "Menu", "game/functions/menu_page", "game/functions/menuSprite", "game/functions/button", "game/functions/renderEngine",
        "game/functions/bulletsEngine", "game/functions/player_manager","game/functions/basicObject", "game/functions/fittingOutEngine", "game/functions/player_manager",
        "game/functions/particleEngine", "eventBus"],
 function (game, menu, Page, Sprite, Button, RenderEngine, BulletsEngine, PlayerEngine, basicObject, FittingOutEngine,
 	playersEngine, ParticleEngine, eventBus){

	function init (){
        game.frame = 0;
        game.canvas = {};
        game.canvas.background = document.createElement("canvas");
        game.canvas.players = document.createElement("canvas");
        game.canvas.bullets = document.createElement("canvas");
        game.canvas.debug = document.createElement("canvas");
        game.canvas.particles = document.createElement("canvas");
        
        for (var key in game.canvas){
            game.canvas[key].context = game.canvas[key].getContext("2d");
            game.canvas[key].width = 1920;
            game.canvas[key].height = 1080;
            game.canvas[key].setAttribute("class", "canvas");
            document.body.appendChild(game.canvas[key]);
        }
        game.canvas.background.context.fillStyle = "rgba(220,220,220,1)";
        game.canvas.background.context.globalAlpha = 1;
        game.canvas.bullets.context.globalAlpha = 1;

        game.renderEngine = new RenderEngine();
        game.bulletsEngine = new BulletsEngine();
        game.playersEngine = new PlayerEngine();
        game.bulletsEngine.init(game.canvas.bullets);
        game.playersEngine.init(game.canvas.players);

        game.renderEngine.addCanvas("debug", game.canvas.debug);
        game.renderEngine.addCanvas("background", game.canvas.background);
        game.renderEngine.addCanvas("players", game.canvas.players);
        game.renderEngine.addCanvas("particles", game.canvas.particles);

        game.renderEngine.addGroup("test", "debug");

        game.renderEngine.addGroup("background", "background");
        // game.addBackground(game.renderEngine,"background1", 0, 0, 1920, 1080);
        game.addBackground(game.renderEngine,"background2", 0, 0, 1920, 1080);
        game.back1 = game.addBackground(game.renderEngine,"background3", 0, 351, 2200, 377);
        game.back2 = game.addBackground(game.renderEngine,"background3", 0, 351, 2200, 377);
        
        game.back2.pos.x = game.back1.width;
        
        var carre = {};
        var truc = {};

        collisionEngine.addGroup("bullet", ["bullet", "wall", "fittingOut"]);
        collisionEngine.addGroup("wall", ["bullet"]);

        game.fittingOutEngine = new FittingOutEngine();
        game.fittingOutEngine.init(game.canvas.bullets);

        game.particleEngine = new ParticleEngine();
        game.particleEngine.init();

		var pressStartPage = new Page("pressStartPage");
		var bg = new Sprite({name : "bg",x : 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["rampage_rooster"], context : game.canvas.background.context});
		var pressStart = new Button({name : "pressStart",x : 750, y : 800, width : 400, height : 200, image : game.renderEngine.images["press_start"], overImage : game.renderEngine.images["press_start_over"], context : game.canvas.background.context})
		pressStartPage.addElement(bg);
		pressStartPage.addElement(pressStart);
		pressStart.callback = function(){menu.activePage = "playerSelect";};
		pressStartPage.SetActiveElement(pressStart);
		menu.addPage(pressStartPage);
		
		var playerSelectPage = new Page("playerSelect");
		var bgSelect = new Sprite({name : "bg",x: 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["noir"], context : game.canvas.background.context});
        var perso1 = new Sprite({name : "perso1", x : 0, y : 200, width : 480, height : 600, image : game.renderEngine.images["bicCoc"], context : game.canvas.background.context});
        var perso1btn = new Button({name : "perso1btn", x : 200, y : 600, width : 200, height : 100, image : game.renderEngine.images["start_to_play"], overImage : game.renderEngine.images["start_to_play"], context : game.canvas.background.context, callback : function(){menu.bulbizarre();}});
        var perso2 = new Button({name : "perso2", x : 480, y : 200, width : 480, height : 600, image : game.renderEngine.images["coqLonelBlack"], overImage : game.renderEngine.images["coqLonel"], context : game.canvas.background.context});
		var perso2btn = new Button({name : "perso2btn", x : 640, y : 600, width : 200, height : 100, image : game.renderEngine.images["start_to_join"], overImage : game.renderEngine.images["start_to_leave"], context : game.canvas.background.context});
        var perso3 = new Button({name : "perso3", x : 960, y : 200, width : 480, height : 600, image : game.renderEngine.images["coqLonelBlack"], overImage : game.renderEngine.images["coqLonel"], context : game.canvas.background.context});
        var perso3btn = new Button({name : "perso3btn", x : 1150, y : 600, width : 200, height : 100, image : game.renderEngine.images["start_to_join"], overImage : game.renderEngine.images["start_to_leave"], context : game.canvas.background.context});
        var perso4 = new Button({name : "perso4", x : 1440, y : 200, width : 480, height : 600, image : game.renderEngine.images["coqLonelBlack"], overImage : game.renderEngine.images["coqLonel"], context : game.canvas.background.context});
        var perso4btn = new Button({name : "perso4btn", x : 1600, y : 600, width : 200, height : 100, image : game.renderEngine.images["start_to_join"], overImage : game.renderEngine.images["start_to_leave"], context : game.canvas.background.context});
        playerSelectPage.addElement(bgSelect)
        playerSelectPage.addElement(perso1);
        playerSelectPage.addElement(perso1btn);
        playerSelectPage.addElement(perso2);
        playerSelectPage.addElement(perso2btn);
        playerSelectPage.addElement(perso3);
        playerSelectPage.addElement(perso3btn);
        playerSelectPage.addElement(perso4);
        playerSelectPage.addElement(perso4btn);
        playerSelectPage.SetActiveElement(perso1btn);
		menu.addPage(playerSelectPage);

        var winPage = new Page("winPage");
        var bgWin = new Sprite({name : "bgWin", x : 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["noir"], context : game.canvas.background.context})
        var winnerTxt = new Sprite({name : "winnerTxt", x : 500, y : 100, width : 900, height : 150, image : game.renderEngine.images["rampage_rooster"], context : game.canvas.background.context});
        var winnerImage = new Sprite({name : "winnerImage", x : 750, y : 300, width : 300, height : 400, image : game.renderEngine.images["bicCoc"], context : game.canvas.background.context});
        var replay = new Button({name : "replay", x : 700, y : 750, width : 450, height : 100, image : game.renderEngine.images["rampage_rooster"], overImage : game.renderEngine.images["coqLonel"], callback : function(){menu.mimeJr();}, context : game.canvas.background.context});
        var returnToMenu = new Button({name : "returnToMenu", x : 700, y : 900, width : 450, height : 100, image : game.renderEngine.images["rampage_rooster"], overImage : game.renderEngine.images["coqLonel"], callback : function(){menu.abra();}, context : game.canvas.background.context});
        replay.down = returnToMenu;
        returnToMenu.up = replay;
        winPage.addElement(bgWin);
        winPage.addElement(winnerTxt);
        winPage.addElement(winnerImage);
        winPage.addElement(replay);
        winPage.addElement(returnToMenu);
        winPage.SetActiveElement(replay);
        menu.addPage(winPage);

		menu.activePage = "pressStartPage";
		game.startState("menu");
	}
	return init;
})