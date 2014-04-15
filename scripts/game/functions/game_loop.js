define(["RAF", "Game","game/functions/gamepad_controller"], function (RAF, Game, gamepad){

    function gameLoop (){
        if(Game.state == "game"){
            RAF(gameLoop);
        }
        Game.frame++;
        Game.canvas.background.context.fillRect(0, 0, Game.canvas.background.width, Game.canvas.background.height);


        if (Game.frame % 60 == 0){
        	Game.bulletsEngine.create(100, 1,20, 0, 10);
        }

        Game.bulletsEngine.calcul();
        Game.renderEngine.render();
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})