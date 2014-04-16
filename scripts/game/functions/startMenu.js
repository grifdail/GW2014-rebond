define([], function(){
	var Menu = function(){
		this.content = {};
		this.currentIndex = 0;
		this.currentMenu = "";
		this.currentContext;
	}
	Menu.prototype.startMenu = function	(context){
		this.content = {};
		this.content.basic = [];
		this.content.basic.push("Bienvenu", 50, 100, 100);
		this.currentContext = context;

		context.font = '85px Impact';
		context.textAlign = 'center';
		context.fillStyle = '#000';
		context.fillText('Summer',250,100);
		context.fillText('is magic',250,180);


	}
	Menu.prototype.basicElement = function(text, size, x, y){
		var target = {};
		target.text = text;
		target.size
		target.x = x;
		target.y = y;
	}	
	Menu.prototype.render = function(){
		for (var elements in this.content[this.currentMenu]){

		}
	}
	return Menu;
});