define(["RAF", "Game","game/functions/gamepad_controller"], function (RAF, Game, gamepad){

    function gameLoop (){
        if(Game.state == "game"){
            RAF(gameLoop);
        }
        Game.frame++;
        Game.canvas.background.context.fillRect(0, 0, Game.canvas.background.width, Game.canvas.background.height);
        if (Game.frame % 60 == 0){
        	Game.bulletsEngine.create(200,200,0);
        }
        Game.renderEngine.render();
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})