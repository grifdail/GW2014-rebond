require.config({
	urlArgs: "bust=" +  Date.now(),
	paths: {
		"socketio"				: '../socket.io/socket.io',
		"RAF"					: "libs/requestAnimFrame",
		"vector"				: "libs/vector",
		"collisionEngine"		: "libs/collision_engine",
		"Game"					: "game/game",
		"Menu"					: "game/functions/menu_controller",
		"init"					: "game/functions/init",
		"gameLoop"				: "game/functions/game_loop",
		"menuLoop"				: "game/functions/menu_loop",
		"eventBus"				: "game/functions/eventbus"
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