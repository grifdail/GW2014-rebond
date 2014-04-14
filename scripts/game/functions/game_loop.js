define(["RAF", "Game","game/functions/gamepad_controller"], function (RAF, Game, gamepad){

    function gameLoop (){
        if(Game.state == "game"){
            RAF(gameLoop);
        }
        Game.canvas.background.context.fillRect(0, 0, Game.canvas.background.width, Game.canvas.background.height);
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})