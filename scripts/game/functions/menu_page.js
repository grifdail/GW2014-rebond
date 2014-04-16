define([], function (){

    var MenuPage = function (name){
        this.name = name;
        this.elements = [];
        this.activeElement;
    }

    MenuPage.prototype.draw = function draw(){
        for(var i = 0; i < this.elements.length; i++){
            this.elements[i].draw();
        }
    }

    MenuPage.prototype.addElement = function (elem){
        this.elements.push(elem);
    }

    MenuPage.prototype.SetActiveElement = function(elem){
        if(this.activeElement && this.activeElement.overImage)
            this.activeElement.sprite.image = this.activeElement.normalImage;
        this.activeElement = elem;
        if(elem.overImage)
            elem.sprite.image = elem.overImage;
    }

    return MenuPage;
})