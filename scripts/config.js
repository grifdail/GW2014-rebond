require.config({
	urlArgs: "bust=" +  Date.now(),
	paths: {
		"socketio" 				: '../socket.io/socket.io',
		"RAF"	    			: "libs/requestAnimFrame",
		"Game"					: "game/Game",
		"gameLoop"				: "game/functions/gameLoop",
		"menuLoop"				: "game/functions/menuLoop",
	},
	shim: {
	    'socketio': {
	    	exports: 'io'
    	}
  	},
});
require(["main"]);