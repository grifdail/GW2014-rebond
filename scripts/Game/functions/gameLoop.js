define(["RAF", "Game"], function (RAF, Game){
    
    function gameLoop (){
        if(Game.state == "game")
            RAF(gameLoop);
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})