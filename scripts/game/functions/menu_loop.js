define(["RAF", "Game"], function (RAF, Game){

    function menuLoop (){
        if(Game.state == "menu") {
            RAF(menuLoop);
        }
        for (var i = 0; i < Game.menu.buttons.length; i++) {
            Game.menu.buttons[i]
        };
    }

    Game.states["menu"] = menuLoop;

    return menuLoop;
})