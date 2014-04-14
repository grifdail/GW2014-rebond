define(["libs/requestAnimFrame"], function (RAF){
    
    function gameLoop (){

        RAF(gameLoop);
    }

    return gameLoop;
})