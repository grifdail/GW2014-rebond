define(["RAF", "Game","game/functions/gamepad_controller"], function (RAF, Game, gamepad){

    function gameLoop (){
        if(Game.state == "game"){
            RAF(gameLoop);
        }
        Game.frame++;
        Game.canvas.background.context.fillRect(0, 0, Game.canvas.background.width, Game.canvas.background.height);


        if (Game.frame % 30 == 0){
            Game.renderEngine.screenShake(10, 20);
        	Game.bulletsEngine.create(Math.random() * 500+200, Math.random() * 500+200,20, Math.random() * Math.PI*2, 10);
        }

        Game.bulletsEngine.calcul();
        Game.renderEngine.render();
    }

    Game.states["game"] = gameLoop;

    return gameLoop;
})