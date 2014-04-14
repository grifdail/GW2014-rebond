require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'socketio': {
      exports: 'io'
    }
  },
  paths: {
    socketio: '../socket.io/socket.io',
  }
});
 
define(["game/Game"], function(Game) {
    Game.init();
    Game.StartState("game");
});