define(["RAF", "Game","game/functions/gamepad_controller", "collisionEngine","game/functions/deltatime", "game/functions/drawGUI"], function (RAF, Game, gamepad, collisionEngine,deltatime, drawGUI){

    function gameLoop (){
        if(Game.state == "game"){
            RAF(gameLoop);
        }
        var dt =deltatime();
        Game.frame++;
        Game.back1.pos.x = (Game.back1.pos.x+dt+Game.back1.width)%(Game.back1.width*2)-Game.back1.width;
        Game.back2.pos.x = (Game.back2.pos.x+dt+Game.back1.width)%(Game.back1.width*2)-Game.back1.width;

        if (Game.frame % 60 == 0){
            //Game.particleEngine.choc(200,200);
        }

        collisionEngine.calcul(dt);
        Game.bulletsEngine.calcul(dt);
        Game.playersEngine.calcul(dt);
        Game.renderEngine.render(dt);
        Game.particleEngine.calcul(dt);
        drawGUI();

        //collisionEngine.render(Game.canvas.debug.context);
        // Game.canvas.debug.context.fillRect(0, 0, 1920, 1080);
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})