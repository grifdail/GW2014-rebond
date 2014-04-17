define(["game/functions/menuSprite"], function (Sprite){

    var Button = function (args){
        this.name = args.name;
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

    Button.prototype.metamorph = function metamorph (bool){
        if(bool)
            this.sprite.image = this.overImage;
        else
            this.sprite.image = this.normalImage;

    }

    return Button;
})