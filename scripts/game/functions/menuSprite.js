define([], function (){

    var MenuSprite = function(args){
        this.name = args.name;
        this.tag = "sprite";
        this.x = args.x;
        this.y = args.y;
        this.width = args.width;
        this.height = args.height;
        this.context = args.context;
        this.image = args.image;
    }

    MenuSprite.prototype.draw = function draw (){
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    return MenuSprite;
})