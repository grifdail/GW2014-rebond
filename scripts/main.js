define(["Game", "gameLoop", "menuLoop", "init", "game/functions/loadRessource",], function(Game, gameLoop, menuLoop, init,load) {
    load(function() {
        init();
    });
    
});