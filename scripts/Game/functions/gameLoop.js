define(["libs/requestAnimFrame"], function (RAF){
    
    function gameLoop (){
        RAF(gameLoop);

        Game.canvas.background.fillRect(0, 0, game.canvas.background.width, game.canvas.background.height);
    }

    return gameLoop;
})