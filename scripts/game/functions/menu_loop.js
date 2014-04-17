define(["RAF", "Game", "Menu"], function (RAF, Game, menu){

    function menuLoop (){
        if(Game.state == "menu") {
            RAF(menuLoop);
        }
        menu.pages[menu.activePage].draw();
        menu.control();
        console.log(menu.pages[menu.activePage]);
        debugger;
    }

    Game.states["menu"] = menuLoop;

    return menuLoop;
})