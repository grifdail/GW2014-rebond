define(["libs/requestAnimFrame"], function (RAF){

    function menuLoop (){
        console.log("titi");
        RAF(menuLoop);
    }

    return menuLoop;
})