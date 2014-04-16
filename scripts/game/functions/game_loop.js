define(["RAF", "Game","game/functions/gamepad_controller", "collisionEngine"], function (RAF, Game, gamepad, collisionEngine){

    function gameLoop (){
        if(Game.state == "game"){
            RAF(gameLoop);
        }
        Game.frame++;
        Game.back1.pos.x = (Game.back1.pos.x+1+Game.back1.width)%(Game.back1.width*2)-Game.back1.width;
        Game.back2.pos.x = (Game.back2.pos.x+1+Game.back1.width)%(Game.back1.width*2)-Game.back1.width;

        if (Game.frame % 60 == 0){
            //Game.particleEngine.choc(200,200);
        }

        collisionEngine.calcul();
        Game.bulletsEngine.calcul();
        Game.playersEngine.calcul();
        Game.particleEngine.calcul();
        Game.renderEngine.render();
        //collisionEngine.render(Game.canvas.debug.context);
        // Game.canvas.debug.context.fillRect(0, 0, 1920, 1080);
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})