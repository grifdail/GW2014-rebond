define(["libs/requestAnimFrame"], function (RAF){
    
    function gameLoop (){
        console.log("toto");
        RAF(gameLoop);
    }

    return gameLoop;
})