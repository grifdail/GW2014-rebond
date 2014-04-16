define(["Game", "Menu", "game/functions/menu_page", "game/functions/menuSprite", "game/functions/button", "game/functions/renderEngine",
        "game/functions/bulletsEngine", "game/functions/player_manager","game/functions/basicObject", "game/functions/fittingOutEngine"],
 function (game, menu, Page, Sprite, Button, RenderEngine, BulletsEngine, PlayerEngine, basicObject, FittingOutEngine){

	function init (){
        game.canvas = {};
        game.canvas.background = document.createElement("canvas");
        game.canvas.players = document.createElement("canvas");
        game.canvas.bullets = document.createElement("canvas");
        game.canvas.debug = document.createElement("canvas");
        
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
        game.playersEngine.init(game.canvas.bullets);
        game.playersEngine.create(game,200,200,"yellow");
        game.playersEngine.create(game,1000,200,"green");
        game.playersEngine.create(game,1000,800,"red");
        game.playersEngine.create(game,200,800,"blue");

        game.renderEngine.addCanvas("debug", game.canvas.debug);
        game.renderEngine.addCanvas("background", game.canvas.background);

        game.renderEngine.addGroup("test", "debug");
        game.renderEngine.addGroup("background", "background");

        var background = {};
        basicObject.rect(background, 0,0, 1920, 1080);
        background.image = "background";
        background.rotation = -Math.PI/2;
        game.renderEngine.addElement("background", background);
        collisionEngine.addGroup("bullet", ["bullet", "wall", "fittingOut"]);
        collisionEngine.addGroup("wall", ["bullet"]);

        game.fittingOutEngine = new FittingOutEngine();
        game.fittingOutEngine.init(game.canvas.bullets);
        


		var pressStartPage = new Page("pressStartPage");
		var bg = new Sprite({x : 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["rampage_rooster"], context : game.canvas.background.context});
		var pressStart = new Button({x : 750, y : 800, width : 400, height : 200, image : game.renderEngine.images["press_start"], overImage : game.renderEngine.images["press_start_over"], context : game.canvas.background.context})
		pressStartPage.addElement(bg);
		pressStartPage.addElement(pressStart);
		pressStart.callback = function(){menu.activePage = "playerSelect";};
		pressStartPage.SetActiveElement(pressStart);
		menu.addPage(pressStartPage);
		
		var playerSelectPage = new Page("playerSelect");
		var bgSelect = new Sprite({x: 0, y : 0, width : 1920, height : 1080, image : game.renderEngine.images["background"], context : game.canvas.background.context});
		playerSelectPage.addElement(bgSelect)
		menu.addPage(playerSelectPage);

		menu.activePage = "pressStartPage";
		game.startState("menu");
	}

	return init;
})