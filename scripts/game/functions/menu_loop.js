define(["RAF", "Game", "Menu"], function (RAF, Game, menu){

    function menuLoop (){
        if(Game.state == "menu") {
            RAF(menuLoop);
        }
        Game.renderEngine.canvas.menu.context.clearRect(0,0,1920,1080);
        menu.pages[menu.activePage].draw();
        menu.control();
    }

    Game.states["menu"] = menuLoop;

    return menuLoop;
})