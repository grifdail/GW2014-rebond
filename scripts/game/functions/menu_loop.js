define(["RAF", "Game", "Menu", "game/functions/deltatime", "game/functions/drawGUI"], function (RAF, Game, menu, deltaTime, drawGUI){

    function menuLoop (){
        if(Game.state == "menu") {
            RAF(menuLoop);
        }
        var dt =deltaTime();
        Game.renderEngine.canvas.menu.context.clearRect(0,0,1920,1080);
        Game.renderEngine.render(dt);
        menu.pages[menu.activePage].draw();
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj")
        menu.control();

        //renderEngine.render();
    }

    Game.states["menu"] = menuLoop;

    return menuLoop;
})