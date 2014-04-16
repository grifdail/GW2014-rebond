define(["game/functions/menuSprite"], function (Sprite){

    var Button = function (args){
        this.tag = "button";
        this.overImage = args.overImage;
        this.normalImage = args.image;
        this.sprite = new Sprite({x : args.x, y : args.y, width : args.width, height : args.height, image : args.image, context : args.context});
        this.callback = args.callback;
        this.left = args.left;
        this.right = args.right;
        this.up = args.up;
        this.down = args.down;
    }

    Button.prototype.draw = function draw (){
        this.sprite.draw();
    }

    return Button;
})