define(["RAF", "Game","game/functions/gamepad_controller", "collisionEngine"], function (RAF, Game, gamepad, collisionEngine){

    function gameLoop (){
        if(Game.state == "game"){
            RAF(gameLoop);
        }
        Game.frame++;
        Game.canvas.background.context.fillRect(0, 0, Game.canvas.background.width, Game.canvas.background.height);


        collisionEngine.calcul();
        Game.bulletsEngine.calcul();
        Game.playersEngine.calcul();
        Game.renderEngine.render();
        //collisionEngine.render(Game.canvas.debug.context);
        // Game.canvas.debug.context.fillRect(0, 0, 1920, 1080);
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})