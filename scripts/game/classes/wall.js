define(["collisionEngine", "game/functions/basicObject", "game/functions/renderEngine"],
 function(collisionEngine, basicObject, renderEngine){

    var wall = function (x, y, width, height, game){
        this.tag = "wall";
        basicObject.basic(this, x, y, width, height);
        collisionEngine.addHitbox(this, "rect", 0, 0, width, height);
        collisionEngine.addElement(this, "wall");
        game.renderEngine.addElement("background", this);
    }

    return wall;
})