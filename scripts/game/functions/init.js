define([
        "Game", 
        "Menu", 
        "game/functions/menu_page", 
        "game/functions/menuSprite", 
        "game/functions/button", 
        "game/functions/renderEngine",
        "game/functions/bulletsEngine", 
        "game/functions/player_manager",
        "game/functions/basicObject", 
        "game/functions/fittingOutEngine", 
        "game/functions/player_manager",
        "game/functions/particleEngine",
        "eventBus", "game/functions/drawGUI"
    ],
 function (
            game, 
            menu, 
            Page, 
            Sprite, 
            Button, 
            RenderEngine, 
            BulletsEngine, 
            PlayerEngine, 
            basicObject, 
            FittingOutEngine,
 	        playersEngine, 
            ParticleEngine, 
            eventBus, 
            drawGUI){

	function init (){
        game.frame = 0;
        game.canvas = {};
        game.canvas.background = document.createElement("canvas");
        game.canvas.floor = document.createElement("canvas");
        game.canvas.players = document.createElement("canvas");
        game.canvas.bullets = document.createElement("canvas");
        game.canvas.debug = document.createElement("canvas");
        game.canvas.particles = document.createElement("canvas");
        window.mainCanvas =game.canvas.menu = document.createElement("canvas");
        /*window.mainCanvas = */game.main = document.createElement("canvas");
        
        for (var key in game.canvas){
            game.canvas[key].context = game.canvas[key].getContext("2d");
            game.canvas[key].width = 1920;
            game.canvas[key].height = 1080;
            //game.canvas[key].setAttribute("class", "canvas");
            //document.body.appendChild(game.canvas[key]);
        }

        game.main.context = game.canvas[key].getContext("2d");
        game.main.width = 1920;
        game.main.height = 1080;
        game.main.setAttribute("class", "canvas");
        document.body.appendChild(game.main);
        document.body.appendChild(game.canvas.menu);

        game.canvas.background.context.fillStyle = "rgba(220,220,220,1)";
        game.canvas.background.context.globalAlpha = 1;
        game.canvas.bullets.context.globalAlpha = 1;

        game.renderEngine = new RenderEngine(game.main);
        game.bulletsEngine = new BulletsEngine();
        game.playersEngine = new PlayerEngine();
        game.bulletsEngine.init(game.canvas.bullets);
        game.playersEngine.init(game.canvas.players);

        game.renderEngine.addCanvas("debug", game.canvas.debug);
        game.renderEngine.addCanvas("background", game.canvas.background);
        game.renderEngine.addCanvas("floor", game.canvas.floor);
        game.renderEngine.addCanvas("players", game.canvas.players);
        game.renderEngine.addCanvas("particles", game.canvas.particles);
        game.renderEngine.addCanvas("menu", game.canvas.menu);

        game.renderEngine.addGroup("test", "debug");

        game.renderEngine.addGroup("background", "background");
        game.renderEngine.addGroup("floor", "floor");
        // game.addBackground(game.renderEngine,"background1", 0, 0, 1920, 1080);
        game.backFront = game.addBackground(game.renderEngine,"background2", 0, 0, 1920, 1080);
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
		var bg = new Sprite({name : "bg",x : 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["rampage_rooster"], context : game.canvas.menu.context});
        var pressStart = new Button({name : "pressStart",x : 72, y : 800, width : 1776, height : 207, image : game.renderEngine.images["playTitle_0"], overImage : game.renderEngine.images["playTitle_1"], context : game.canvas.menu.context});
		var credits = new Button({name : "credits",x : 72, y : 900, width : 1776, height : 207, image : game.renderEngine.images["credits_0"], overImage : game.renderEngine.images["credits_1"], context : game.canvas.menu.context, callback : function(){menu.activePage = "credits";}});
        credits.up = pressStart;
        pressStart.down = credits;
        pressStartPage.addElement(bg);
		pressStartPage.addElement(credits);
		pressStartPage.addElement(pressStart);
		pressStart.callback = function(){menu.activePage = "playerSelect";};
		pressStartPage.SetActiveElement(pressStart);
		menu.addPage(pressStartPage);
		
		var playerSelectPage = new Page("playerSelect");
		var bgSelect = new Sprite({name : "bg",x: 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["selectBg"], context : game.canvas.menu.context});
        var perso1 = new Button({name : "perso1", x : 120, y : 200, width : 400, height : 550, image : game.renderEngine.images["blue_0"], overImage : game.renderEngine.images["blue_1"], context : game.canvas.menu.context});
        var perso2 = new Button({name : "perso2", x : 500, y : 200, width : 400, height : 550, image : game.renderEngine.images["red_0"], overImage : game.renderEngine.images["red_1"], context : game.canvas.menu.context});
		var perso3 = new Button({name : "perso3", x : 900, y : 200, width : 400, height : 550, image : game.renderEngine.images["yellow_0"], overImage : game.renderEngine.images["yellow_1"], context : game.canvas.menu.context});
        var perso4 = new Button({name : "perso4", x : 1300, y : 200, width : 400, height : 550, image : game.renderEngine.images["green_0"], overImage : game.renderEngine.images["green_1"], context : game.canvas.menu.context});
        var playGame = new Button({name : "Game", x : 750, y : 800, width : 400, height : 120, image : game.renderEngine.images["play_0"], overImage : game.renderEngine.images["play_1"], context : game.canvas.menu.context, callback : function (){menu.start();}});
        var backToTitle = new Button({name : "backToTitle", x : 750, y : 920, width : 400, height : 120, image : game.renderEngine.images["back_0"], overImage : game.renderEngine.images["back_1"], context : game.canvas.menu.context, callback : function (){menu.back()}});
        backToTitle.up = playGame;
        playGame.down = backToTitle;
        playerSelectPage.addElement(bgSelect);
        playerSelectPage.addElement(perso1);
        playerSelectPage.addElement(perso2);
        playerSelectPage.addElement(perso3);
        playerSelectPage.addElement(perso4);
        playerSelectPage.addElement(backToTitle);
        playerSelectPage.addElement(playGame);
        playerSelectPage.SetActiveElement(playGame);
		menu.addPage(playerSelectPage);

        var winPage = new Page("winPage");
        var winnerImage = new Sprite({name : "winnerImage", x : 0, y : 225, width : 1920, height : 543, image : undefined, context : game.canvas.menu.context});
        var replay = new Button({name : "Game", x : 750, y : 800, width : 400, height : 120, image : game.renderEngine.images["play_0"], overImage : game.renderEngine.images["play_1"], context : game.canvas.menu.context, callback : function (){menu.start();}});
        var returnToMenu = new Button({name : "backToTitle", x : 750, y : 920, width : 400, height : 120, image : game.renderEngine.images["back_0"], overImage : game.renderEngine.images["back_1"], context : game.canvas.menu.context, callback : function (){menu.back()}});
        replay.down = returnToMenu;
        returnToMenu.up = replay;
        winPage.addElement(winnerImage);
        winPage.addElement(replay);
        winPage.addElement(returnToMenu);
        winPage.SetActiveElement(replay);
        menu.addPage(winPage);

        var creditsPage = new Page("credits");
        var creditsBg = new Sprite({name : "creditsBg", x : 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["menu_credits"], context : game.canvas.menu.context});
        var returnToMenu2 = new Button({name : "backToTitle", x : 750, y : 920, width : 400, height : 120, image : game.renderEngine.images["back_0"], overImage : game.renderEngine.images["back_1"], context : game.canvas.menu.context, callback : function (){menu.back()}});
        creditsPage.addElement(creditsBg);
        creditsPage.addElement(returnToMenu2);
        creditsPage.SetActiveElement(returnToMenu2);
        menu.addPage(creditsPage);

        var pausePage = new Page("pause");
        var pauseBg = new Sprite({name : "pauseBg", x : 0, y: 0, width : 1920, height : 1080, image : game.renderEngine.images["menu_pause"], context : game.canvas.menu.context});
        pausePage.addElement(pauseBg);
        pausePage.SetActiveElement(pauseBg);
        menu.addPage(pausePage);

        eventBus.on("gameOver", function (color){ menu.pages["winPage"].elements.winnerImage.image = game.renderEngine.images["victory_"+ color];menu.activePage = "winPage"; game.startState("menu");}, this)

		menu.activePage = "pressStartPage";
		game.startState("menu");
	}
	return init;
})