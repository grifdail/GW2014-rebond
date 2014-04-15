require.config({
	urlArgs: "bust=" +  Date.now(),
	paths: {
		"socketio" 				: '../socket.io/socket.io',
		"RAF"	    			: "libs/requestAnimFrame",
		"collisionEngine"		: "libs/collisionEngine"
		"Game"					: "game/game",
		"gameLoop"				: "game/functions/game_loop",
		"menuLoop"				: "game/functions/menu_loop",
	},
	shim: {
	    'socketio': {
	    	exports: 'io'
    	}
  	},
});
require(["main"]);