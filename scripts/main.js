define(["Game", "gameLoop", "menuLoop", "init", "game/functions/loadRessource",], function(Game, gameLoop, menuLoop, init,load) {
    load(function() {
        console.log("ok -- playball"+Date.now());
        init();
    });
    
});