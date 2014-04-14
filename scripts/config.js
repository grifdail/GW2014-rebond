require.config({
		urlArgs: "bust=" +  Date.now(),
		paths: {
			"RAF"	    			: "libs/requestAnimFrame",
			"Game"					: "game/Game",
			"gameLoop"				: "game/functions/gameLoop",
			"menuLoop"				: "game/functions/menuLoop",
		}
});
require(["main"]);