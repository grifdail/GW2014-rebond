define(["RAF", "Game"], function (RAF, Game){

    function menuLoop (){
        console.log("titi");

        if(Game.state == "menu")
        RAF(menuLoop);
    }

    Game.states["menu"] = menuLoop;

    return menuLoop;
})