define(["Game"], function (game){

    var lightOn = true;

    function drawGUI (){
        var ctx = game.renderEngine.content.background.context;
        if(game.playersEngine.content[0]){
            ctx.drawImage(game.renderEngine.images["interface_" + game.playersEngine.content[0].color], 250, 970);
            ctx.drawImage(game.renderEngine.images["lives_" + game.playersEngine.content[0].color], 585 - game.playersEngine.content[0].life * 65 , 0, 65, 65, 290, 975, 65, 65);
        }
        if(game.playersEngine.content[1]){
            ctx.drawImage(game.renderEngine.images["interface_" + game.playersEngine.content[1].color], 580, 970);
            ctx.drawImage(game.renderEngine.images["lives_" + game.playersEngine.content[1].color], 585 - game.playersEngine.content[1].life * 65 , 0, 65, 65, 620, 975, 65, 65);
        }
        if(game.playersEngine.content[2]){
            ctx.drawImage(game.renderEngine.images["interface_" + game.playersEngine.content[2].color], 1150, 970);
            ctx.drawImage(game.renderEngine.images["lives_" + game.playersEngine.content[2].color], 585 - game.playersEngine.content[2].life * 65 , 0, 65, 65, 1190, 975, 65, 65);
        }
        if(game.playersEngine.content[3]){
            ctx.drawImage(game.renderEngine.images["interface_" + game.playersEngine.content[3].color], 1480, 970);
            ctx.drawImage(game.renderEngine.images["lives_" + game.playersEngine.content[3].color], 585 - game.playersEngine.content[3].life * 65 , 0, 65, 65, 1520, 975, 65, 65);
        }
        if(game.frame % 10 === 0)
            lightOn = !lightOn;
        ctx.drawImage(game.renderEngine.images["center_logo"], lightOn * 138, 0, 138, 138, 892, 930, 138, 138);

    }

    return drawGUI;
})