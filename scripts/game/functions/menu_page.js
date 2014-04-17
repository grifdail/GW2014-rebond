define([], function (){

    var MenuPage = function (name){
        this.name = name;
        this.elements = {};
        this.activeElement;
    }

    MenuPage.prototype.draw = function draw(){
        for(elem in this.elements){
           this.elements[elem].draw();
        }
    }

    MenuPage.prototype.addElement = function (elem){
        this.elements[elem.name] = elem;
    }

    MenuPage.prototype.SetActiveElement = function(elem){
        if(this.activeElement && this.activeElement.overImage)
            this.activeElement.sprite.image = this.activeElement.normalImage;
        this.activeElement = elem;
        if(elem.overImage)
            elem.sprite.image = elem.overImage;
    }

    MenuPage.prototype.mimeJr = function (){

    }

    MenuPage.prototype.abra = function (){
        
    }

    return MenuPage;
})