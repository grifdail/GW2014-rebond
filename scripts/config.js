require.config({
	urlArgs: "bust=" +  Date.now(),
	paths: {
		"socketio"				: '../socket.io/socket.io',
		"RAF"					: "libs/requestAnimFrame",
		"vector"				: "libs/vector",
		"collisionEngine"		: "libs/collisionEngine",
		"Game"					: "game/game",
		"gameLoop"				: "game/functions/game_loop",
		"menuLoop"				: "game/functions/menu_loop",
	},
	shim: {
		'socketio': {
			exports: 'io'
		},
		'vector': {
			exports: 'Vector'
		}
	},
});
require(["main"]);